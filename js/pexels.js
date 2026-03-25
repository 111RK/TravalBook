// TravelBook — Pexels API Service
const PEXELS_KEY = 'zRlqOcPcgyM97KFVmw6S8eYaJHAC64ixndBvn7jYI8sVaCc5KtQSN3AT';
const PEXELS_URL = 'https://api.pexels.com/v1/search';
const photoCache = {};

// Fetch photos from Pexels for a query, returns array of {url, thumb, photographer, alt}
async function fetchPhotos(query, count = 6) {
  const key = query.toLowerCase().trim();
  if (photoCache[key]) return photoCache[key];

  try {
    const res = await fetch(`${PEXELS_URL}?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`, {
      headers: { Authorization: PEXELS_KEY }
    });
    const data = await res.json();
    const photos = data.photos.map(p => ({
      url: p.src.large,
      thumb: p.src.medium,
      tiny: p.src.tiny,
      photographer: p.photographer,
      alt: p.alt || query,
      on: 1
    }));
    photoCache[key] = photos;
    return photos;
  } catch (e) {
    console.warn('Pexels fetch failed for:', query, e);
    return [];
  }
}

// Fetch a single cover photo (best quality)
async function fetchCover(query) {
  const photos = await fetchPhotos(query, 1);
  return photos.length ? photos[0].url : '';
}

// Pre-fetch all photos for a voyage's chapters
async function fetchVoyagePhotos(voyage) {
  const promises = voyage.chapters.map(async (ch) => {
    const query = ch.place.name + ' ' + (voyage.country || '');
    const photos = await fetchPhotos(query, 5);
    if (photos.length) {
      ch.photos = photos.map((p, i) => ({ url: p.url, thumb: p.thumb, on: i < 3 ? 1 : 0 }));
    }
  });

  // Also fetch cover
  const coverQuery = voyage.name + ' ' + (voyage.country || '') + ' travel';
  const coverPhotos = await fetchPhotos(coverQuery, 3);
  if (coverPhotos.length) {
    voyage.cover = coverPhotos[0].url;
    // Add remaining cover photos to first chapter
    if (voyage.chapters[0]) {
      const extra = coverPhotos.slice(1).map(p => ({ url: p.url, thumb: p.thumb, on: 0 }));
      voyage.chapters[0].photos = [...(voyage.chapters[0].photos || []), ...extra];
    }
  }

  await Promise.all(promises);
  return voyage;
}

// Fetch all voyages photos
async function fetchAllPhotos() {
  // Splash
  const splashPhotos = await fetchPhotos('travel adventure beautiful landscape', 1);
  if (splashPhotos.length) {
    document.getElementById('splash-photo').style.backgroundImage = `url('${splashPhotos[0].url}')`;
  }

  // All voyages in parallel
  await Promise.all(VOYAGES.map(v => fetchVoyagePhotos(v)));

  // Re-render
  renderTrips();
}

// Search photos (for gallery add)
async function searchPhotos(query) {
  return fetchPhotos(query, 12);
}
