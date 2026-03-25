// TravelBook — Free Place Intelligence
// Wikipedia API (free, no key) + OpenStreetMap Nominatim (free, no key)

const placeCache = {};

// Reverse geocoding: GPS coords → place name, city, country
async function reverseGeocode(lat, lon) {
  const key = `${lat.toFixed(4)},${lon.toFixed(4)}`;
  if (placeCache['geo_' + key]) return placeCache['geo_' + key];
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=fr`, {
      headers: { 'User-Agent': 'TravelBook/1.0' }
    });
    const data = await res.json();
    const result = {
      name: data.name || data.address?.tourism || data.address?.historic || data.address?.building || '',
      city: data.address?.city || data.address?.town || data.address?.village || '',
      country: data.address?.country || '',
      type: data.type || '',
      fullAddress: data.display_name || ''
    };
    placeCache['geo_' + key] = result;
    return result;
  } catch (e) {
    console.warn('Geocoding failed:', e);
    return null;
  }
}

// Get Wikipedia summary for a place (in French)
async function getPlaceHistory(placeName, country) {
  const query = placeName + (country ? ' ' + country : '');
  const cacheKey = 'wiki_' + query.toLowerCase();
  if (placeCache[cacheKey]) return placeCache[cacheKey];

  try {
    // Search for the article
    const searchRes = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=1&format=json&origin=*`);
    const searchData = await searchRes.json();
    const pages = searchData.query?.search;
    if (!pages || !pages.length) return null;

    const pageTitle = pages[0].title;

    // Get the extract (summary)
    const extractRes = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=extracts|pageimages&exintro=1&explaintext=1&pithumbsize=400&format=json&origin=*`);
    const extractData = await extractRes.json();
    const page = Object.values(extractData.query.pages)[0];

    if (!page || page.missing !== undefined) return null;

    // Clean and limit the extract
    let extract = page.extract || '';
    // Take first 3 sentences max
    const sentences = extract.split(/(?<=[.!?])\s+/);
    extract = sentences.slice(0, 3).join(' ');
    if (extract.length > 400) extract = extract.substring(0, 400).replace(/\s+\S*$/, '') + '...';

    const result = {
      title: pageTitle,
      summary: extract,
      thumbnail: page.thumbnail?.source || null,
      wikiUrl: `https://fr.wikipedia.org/wiki/${encodeURIComponent(pageTitle)}`
    };

    placeCache[cacheKey] = result;
    return result;
  } catch (e) {
    console.warn('Wikipedia fetch failed for:', query, e);
    return null;
  }
}

// Get history for all chapters of a voyage
async function enrichVoyageWithHistory(voyage) {
  const promises = voyage.chapters.map(async (ch) => {
    if (ch.history) return; // already enriched
    const wiki = await getPlaceHistory(ch.place.name, voyage.country);
    if (wiki) {
      ch.history = {
        title: wiki.title,
        summary: wiki.summary,
        thumbnail: wiki.thumbnail,
        wikiUrl: wiki.wikiUrl
      };
    }
  });
  await Promise.all(promises);
}

// Enrich all voyages
async function enrichAllVoyages() {
  try {
    await Promise.all(VOYAGES.map(v => enrichVoyageWithHistory(v)));
    console.log('Wikipedia enrichment done');
  } catch (e) {
    console.warn('Enrichment error:', e);
  }
}
