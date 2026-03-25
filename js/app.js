// TravelBook v6 — App Logic
let cur = 'screen-splash', curVoyage = null, swIdx = 0, hist = ['screen-splash'];
let importedPhotos = []; // For photo import step
let selectedTemplate = 'classique';
const NAV_SCREENS = ['screen-home', 'screen-map', 'screen-wallet', 'screen-profile'];

// =============================================
// Theme
// =============================================
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('tb-theme', t);
  const tg = document.getElementById('dark-mode-toggle');
  if (tg) tg.checked = t === 'dark';
}
function toggleTheme() {
  setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

// =============================================
// Navigation
// =============================================
function navigateTo(id, h = true) {
  const a = document.getElementById(cur), b = document.getElementById(id);
  if (!a || !b || id === cur) return;
  a.classList.remove('active'); a.classList.add('slide-out');
  b.classList.add('slide-in');
  setTimeout(() => {
    a.classList.remove('slide-out');
    b.classList.remove('slide-in');
    b.classList.add('active');
  }, 350);
  if (h) hist.push(id);
  cur = id;
  const nav = document.getElementById('nav');
  NAV_SCREENS.includes(id) ? nav.classList.remove('hidden') : nav.classList.add('hidden');
  if (NAV_SCREENS.includes(id)) {
    document.querySelectorAll('.nav-btn').forEach(x =>
      x.classList.toggle('active', x.dataset.screen === id)
    );
  }
  // Lazy-load wallet
  if (id === 'screen-wallet') renderWallet();
}

function navTo(id) {
  if (id === cur) return;
  document.getElementById(cur).classList.remove('active');
  document.getElementById(id).classList.add('active');
  cur = id; hist.push(id);
  document.querySelectorAll('.nav-btn').forEach(x =>
    x.classList.toggle('active', x.dataset.screen === id)
  );
  if (id === 'screen-wallet') renderWallet();
}

// =============================================
// Auth
// =============================================
function doLogin() {
  localStorage.setItem('tb-logged', '1');
  showToast('Connexion reussie');
  setTimeout(() => navigateTo('screen-home'), 400);
}
function doSignup() {
  localStorage.setItem('tb-logged', '1');
  showToast('Compte cree');
  setTimeout(() => navigateTo('screen-home'), 400);
}
function logout() {
  localStorage.removeItem('tb-logged');
  navigateTo('screen-splash');
  hist = ['screen-splash'];
}

// =============================================
// Home — Trip List
// =============================================
function renderTrips() {
  document.getElementById('trip-list').innerHTML = VOYAGES.map(v => {
    const selPhotos = v.chapters[0]?.photos?.filter(p => p.on)?.slice(0, 3) || [];
    return `
    <div class="trip-card" onclick="openVoyage(${v.id})">
      <div class="trip-thumb" style="background-image:url('${v.cover}')">
        <span class="trip-badge ${v.badge === 'ok' ? 'ok' : 'pdf'}">${v.badge === 'ok' ? 'Pret' : 'PDF'}</span>
      </div>
      <div class="trip-info">
        <div class="trip-name">${v.name}</div>
        <div class="trip-meta">${v.country} · ${v.dates}</div>
        <div class="trip-foot">
          <div class="trip-avatars">${v.companions.map(c => `<div class="trip-av">${c[0]}</div>`).join('')}</div>
          <div class="trip-photos-stack">
            ${selPhotos.map(p => `<div class="trip-photos-stack-item" style="background-image:url('${p.url}')"></div>`).join('')}
          </div>
          <div class="trip-arrow"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></div>
        </div>
      </div>
    </div>`;
  }).join('');
}

// =============================================
// New Trip — Multi-Step Flow
// =============================================
function pickChip(el) {
  el.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

// Step 1 -> Step 2 (Wallet Check)
function goToWalletCheck() {
  navigateTo('screen-wallet-check');
}

// Step 2 -> Step 3 (Photo Import)
function goToPhotoImport() {
  importedPhotos = [];
  renderImportedPhotos();
  navigateTo('screen-photo-import');
}

// Trigger file picker for photo import
function triggerPhotoImport() {
  const inp = document.createElement('input');
  inp.type = 'file'; inp.accept = 'image/*'; inp.multiple = true;
  inp.onchange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    showToast('Lecture des photos...');

    for (const f of files) {
      const photo = {
        file: f,
        url: URL.createObjectURL(f),
        name: f.name,
        date: null,
        lat: null,
        lon: null,
        selected: true
      };

      // Try EXIF reading
      try {
        if (window.exifr) {
          const exif = await exifr.parse(f, { gps: true, pick: ['DateTimeOriginal', 'CreateDate', 'GPSLatitude', 'GPSLongitude'] });
          if (exif) {
            if (exif.DateTimeOriginal) photo.date = new Date(exif.DateTimeOriginal);
            else if (exif.CreateDate) photo.date = new Date(exif.CreateDate);
            if (exif.latitude) photo.lat = exif.latitude;
            if (exif.longitude) photo.lon = exif.longitude;
          }
        }
      } catch (err) {
        console.warn('EXIF read failed for', f.name, err);
      }

      // Fallback date from file
      if (!photo.date) photo.date = new Date(f.lastModified);
      importedPhotos.push(photo);
    }

    renderImportedPhotos();
    showToast(files.length + ' photo(s) importee(s)');
  };
  inp.click();
}

function renderImportedPhotos() {
  const empty = document.getElementById('photo-import-empty');
  const grid = document.getElementById('photo-import-grid');
  const footer = document.getElementById('photo-import-footer');

  if (!importedPhotos.length) {
    empty.style.display = 'flex';
    grid.style.display = 'none';
    footer.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  grid.style.display = 'grid';
  footer.style.display = 'flex';

  // Group by date
  const groups = {};
  importedPhotos.forEach((p, i) => {
    const key = p.date ? p.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date inconnue';
    if (!groups[key]) groups[key] = [];
    groups[key].push({ ...p, idx: i });
  });

  let html = '';
  for (const [date, photos] of Object.entries(groups)) {
    html += `<div class="photo-import-date-header">${date}</div>`;
    photos.forEach(p => {
      html += `<div class="photo-import-item ${p.selected ? '' : 'deselected'}"
        style="background-image:url('${p.url}')"
        onclick="toggleImportPhoto(${p.idx})">
        <div class="photo-import-item-check">${p.selected ? '&#10003;' : ''}</div>
      </div>`;
    });
  }
  grid.innerHTML = html;

  const selCount = importedPhotos.filter(p => p.selected).length;
  document.getElementById('photo-count').textContent = selCount + ' photos selectionnees';
}

function toggleImportPhoto(idx) {
  importedPhotos[idx].selected = !importedPhotos[idx].selected;
  renderImportedPhotos();
}

// Step 3 -> Step 4 (Swipe)
function goToSwipe() {
  swIdx = 0;
  renderSwipe();
  navigateTo('screen-swipe');
}

// Step 4 — Swipe validation with drag animation
function renderSwipe() {
  const z = document.getElementById('swipe-zone');
  if (swIdx >= SWIPE_PLACES.length) {
    navigateTo('screen-generating');
    runGen();
    return;
  }
  const p = SWIPE_PLACES[swIdx];
  document.getElementById('swipe-count').textContent = (swIdx + 1) + ' / ' + SWIPE_PLACES.length;
  z.innerHTML = '<div class="sw-card" id="sw-card">' +
    '<div class="sw-label sw-label-yes">OUI</div>' +
    '<div class="sw-label sw-label-no">NON</div>' +
    '<div class="sw-img" style="background-image:url(\'' + p.img + '\')">' +
    '<div class="sw-dur">' + p.duration + '</div></div>' +
    '<div class="sw-body"><div class="sw-name">' + p.name + '</div>' +
    '<div class="sw-addr">' + p.address + '</div>' +
    '<div><span class="sw-stars">*****</span> ' +
    '<span class="sw-rating">' + p.rating + ' (' + p.reviews.toLocaleString() + ')</span></div>' +
    '</div></div>';
  initDrag();
}

function nextSwipe() {
  swIdx++;
  renderSwipe();
}

// Drag logic
function initDrag() {
  const card = document.getElementById('sw-card');
  if (!card) return;
  let startX = 0, currentX = 0, dragging = false;

  function onStart(x) { startX = x; currentX = 0; dragging = true; }
  function onMove(x) {
    if (!dragging) return;
    currentX = x - startX;
    const rot = currentX * 0.08;
    card.style.transform = 'translateX(' + currentX + 'px) rotate(' + rot + 'deg)';
    card.style.transition = 'none';
    // Show labels
    const yesLabel = card.querySelector('.sw-label-yes');
    const noLabel = card.querySelector('.sw-label-no');
    if (yesLabel) yesLabel.style.opacity = Math.min(currentX / 80, 1);
    if (noLabel) noLabel.style.opacity = Math.min(-currentX / 80, 1);
  }
  function onEnd() {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(currentX) > 80) {
      // Fling out
      const dir = currentX > 0 ? 1 : -1;
      card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      card.style.transform = 'translateX(' + (dir * 400) + 'px) rotate(' + (dir * 20) + 'deg)';
      card.style.opacity = '0';
      setTimeout(nextSwipe, 300);
    } else {
      // Snap back
      card.style.transition = 'transform 0.3s ease';
      card.style.transform = 'translateX(0) rotate(0)';
      const yesLabel = card.querySelector('.sw-label-yes');
      const noLabel = card.querySelector('.sw-label-no');
      if (yesLabel) yesLabel.style.opacity = 0;
      if (noLabel) noLabel.style.opacity = 0;
    }
  }

  // Mouse
  card.addEventListener('mousedown', e => { e.preventDefault(); onStart(e.clientX); });
  document.addEventListener('mousemove', e => onMove(e.clientX));
  document.addEventListener('mouseup', onEnd);
  // Touch
  card.addEventListener('touchstart', e => onStart(e.touches[0].clientX), { passive: true });
  document.addEventListener('touchmove', e => onMove(e.touches[0].clientX), { passive: true });
  document.addEventListener('touchend', onEnd);
}

// Buttons (addEventListener, not inline onclick)
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-swipe-yes').addEventListener('click', () => {
    const card = document.getElementById('sw-card');
    if (!card) return;
    card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    card.style.transform = 'translateX(400px) rotate(20deg)';
    card.style.opacity = '0';
    setTimeout(nextSwipe, 300);
  });
  document.getElementById('btn-swipe-no').addEventListener('click', () => {
    const card = document.getElementById('sw-card');
    if (!card) return;
    card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    card.style.transform = 'translateX(-400px) rotate(-20deg)';
    card.style.opacity = '0';
    setTimeout(nextSwipe, 300);
  });
});

// Step 5 — Generating animation
function runGen() {
  const steps = [
    { id: 'gen-step-1', d: 0 }, { id: 'gen-step-2', d: 1200 },
    { id: 'gen-step-3', d: 2400 }, { id: 'gen-step-4', d: 3600 }
  ];
  steps.forEach(s => {
    const e = document.getElementById(s.id);
    e.className = 'gen-step';
    e.querySelector('span').className = 'gen-dot';
  });
  steps.forEach((s, i) => {
    setTimeout(() => {
      const e = document.getElementById(s.id);
      if (i > 0) {
        const p = document.getElementById(steps[i - 1].id);
        p.className = 'gen-step done';
        p.querySelector('span').className = 'gen-check';
        p.querySelector('span').textContent = '\u2713';
      }
      e.className = 'gen-step active';
      e.querySelector('span').className = 'gen-spinner';
      e.querySelector('span').textContent = '';
    }, s.d);
  });
  setTimeout(() => {
    const l = document.getElementById(steps[3].id);
    l.className = 'gen-step done';
    l.querySelector('span').className = 'gen-check';
    l.querySelector('span').textContent = '\u2713';
    setTimeout(() => openVoyage(1), 500);
  }, 4800);
}

// =============================================
// Carnet (traceme_v6 style)
// =============================================
function openVoyage(id) {
  const v = VOYAGES.find(x => x.id === id);
  if (!v) return;
  curVoyage = id;

  document.getElementById('carnet-cover').style.backgroundImage = `url('${v.cover}')`;
  document.getElementById('carnet-h').textContent = v.name;
  document.getElementById('carnet-sub').textContent = `${v.country} - ${v.days} jours`;
  document.getElementById('carnet-style-tag').textContent = v.style || 'Poetique';

  document.getElementById('carnet-stats').innerHTML =
    [{ v: v.stats.photos, l: 'Photos' }, { v: v.stats.lieux, l: 'Lieux' },
     { v: v.stats.mots.toLocaleString(), l: 'Mots' }, { v: v.stats.temp, l: 'Moy.' }]
    .map(s => `<div class="c-stat"><b>${s.v}</b><small>${s.l}</small></div>`).join('');

  // Photo layout patterns (cycle through for variety)
  const LAYOUTS = ['full-bleed','collage','two-col','panoramic','portrait'];

  document.getElementById('carnet-body').innerHTML = v.chapters.map((ch, ci) => {
    const sel = ch.photos ? ch.photos.filter(p => p.on) : [];
    const hero = sel.length ? sel[0].url : '';
    const firstLetter = ch.text.charAt(0);
    const restText = ch.text.slice(1);
    const decoratedText = decorateText(restText, ch.place.name);
    const layout = LAYOUTS[ci % LAYOUTS.length];

    // Build photo layout based on pattern
    let photoHtml = '';
    if (hero) {
      if (layout === 'full-bleed') {
        photoHtml = `<div class="img-full"><img src="${hero}" alt="${ch.place.name}" onclick="viewPhoto('${hero}')"></div>
          <div class="img-cap">${ch.place.name} — ${ch.day}</div>`;
      } else if (layout === 'panoramic') {
        photoHtml = `<div class="img-pano"><img src="${hero}" alt="${ch.place.name}" onclick="viewPhoto('${hero}')"></div>
          <div class="img-cap">${ch.place.name}</div>`;
      } else if (layout === 'portrait' && sel.length >= 1) {
        photoHtml = `<div class="img-portrait"><img src="${hero}" alt="${ch.place.name}" onclick="viewPhoto('${hero}')"></div>`;
      } else {
        photoHtml = `<div class="ch-img" style="background-image:url('${hero}')" onclick="viewPhoto('${hero}')"><div class="ch-img-gradient"></div></div>`;
      }
    }

    // Extra photos: varied layouts
    let extraPhotos = '';
    if (sel.length >= 4 && layout === 'collage') {
      extraPhotos = `<div class="img-coll">
        <div class="ph-m"><img src="${sel[1].url}" onclick="viewPhoto('${sel[1].url}')"></div>
        <div class="ph-s"><img src="${sel[2].url}" onclick="viewPhoto('${sel[2].url}')"></div>
        <div class="ph-s"><img src="${sel[3].url}" onclick="viewPhoto('${sel[3].url}')"></div>
      </div>`;
    } else if (sel.length >= 3 && layout === 'two-col') {
      extraPhotos = `<div class="img-2">
        <div class="ph"><img src="${sel[1].url}" onclick="viewPhoto('${sel[1].url}')"></div>
        <div class="ph"><img src="${sel[2].url}" onclick="viewPhoto('${sel[2].url}')"></div>
      </div>`;
    } else if (sel.length >= 4) {
      extraPhotos = `<div class="img-3">
        <div class="ph"><img src="${sel[1].url}" onclick="viewPhoto('${sel[1].url}')"></div>
        <div class="ph"><img src="${sel[2].url}" onclick="viewPhoto('${sel[2].url}')"></div>
        <div class="ph"><img src="${sel[3].url}" onclick="viewPhoto('${sel[3].url}')"></div>
      </div>`;
    } else if (sel.length >= 2) {
      extraPhotos = `<div class="img-2">
        <div class="ph"><img src="${sel[0].url}" onclick="viewPhoto('${sel[0].url}')"></div>
        <div class="ph"><img src="${sel[1].url}" onclick="viewPhoto('${sel[1].url}')"></div>
      </div>`;
    }

    // Face detection badges
    let facesHtml = '';
    if (ch.faces && ch.faces.length) {
      const avatars = ch.faces.map(f => {
        const c = COMPANIONS[f]; if (!c) return '';
        return `<div class="ch-face-av${c.gender==='F'?' female':''}">${c.name[0]}</div>`;
      }).join('');
      const names = ch.faces.map(f => COMPANIONS[f]?.name || f).join(', ');
      facesHtml = `<div class="ch-faces">${avatars}<span class="ch-faces-text">Visages detectes : ${names}</span></div>`;
    }

    // Quote (add for some chapters for variety)
    let quoteHtml = '';
    if (ci === 1 || ci === 4) {
      const quotes = [
        {text: "Le voyage est la seule chose qu'on achete qui nous rend plus riche.", attr: "Anonyme"},
        {text: "On ne fait pas un voyage, c'est le voyage qui nous fait.", attr: "John Steinbeck"},
        {text: "Voyager, c'est grandir.", attr: "Pierre Desproges"},
        {text: "La vie, c'est ce qui arrive quand on est occupe a faire d'autres projets.", attr: "John Lennon"},
        {text: "L'aventure est dans chaque souffle de vent.", attr: "Anonyme"}
      ];
      const q = quotes[ci % quotes.length];
      quoteHtml = `<div class="quote-block"><p>"${q.text}"</p><div class="quote-attr">— ${q.attr}</div></div>`;
    }

    // Highlight box (for specific chapters)
    let hiHtml = '';
    if (ci === 0) {
      hiHtml = `<div class="hi-box">
        <div class="hi-title">Points forts du jour</div>
        <ul class="hi-list">
          <li><div class="hi-dot"></div>${ch.place.name} (${ch.place.duration})</li>
          <li><div class="hi-dot"></div>Meteo : ${v.stats.temp} en moyenne</li>
          <li><div class="hi-dot"></div>${sel.length} photos prises</li>
        </ul>
      </div>`;
    }

    // Map card (every 3rd chapter)
    let mapHtml = '';
    if (ci % 3 === 2) {
      mapHtml = `<div class="map-card">
        <div class="map-card-top"><span class="map-card-title">Itineraire du jour</span><span style="font:400 10px var(--sans);color:var(--copper)">Voir</span></div>
        <div class="map-card-view"><div class="map-card-pin" style="top:40%;left:45%">📍</div><div class="map-card-pin" style="top:60%;left:65%">📍</div></div>
        <div class="map-card-tags"><span class="map-card-tag">${ch.place.name}</span><span class="map-card-tag">${ch.place.address}</span></div>
      </div>`;
    }

    return `
    ${ci > 0 ? '<div class="chap-sep"><div class="chap-sep-line"></div><div class="chap-sep-dot"></div><div class="chap-sep-dot"></div><div class="chap-sep-dot"></div><div class="chap-sep-line"></div></div>' : ''}
    <div class="ch">
      <div class="ch-day">${ch.day}</div>
      <div class="ch-title">${ch.title}</div>
      ${photoHtml}
      <div class="ch-text"><span class="dropcap">${firstLetter}</span>${decoratedText}</div>
      ${quoteHtml}
      ${extraPhotos}
      ${facesHtml}
      ${hiHtml}
      ${ch.photos && ch.photos.length ? `
        <div class="ch-strip">
          ${ch.photos.map((p, pi) => `<div class="ch-thumb ${p.on ? 'on' : ''}" style="background-image:url('${p.url}')" onclick="togPhoto(${v.id},${ci},${pi})"><div class="ch-thumb-ck">\u2713</div></div>`).join('')}
          <div class="ch-add" onclick="addPhoto(${v.id},${ci})">+</div>
        </div>
        <div class="ch-sel" onclick="openGallery(${v.id},${ci})">${sel.length}/${ch.photos.length} photos - <b>Gerer</b></div>
      ` : ''}
      <div class="ch-place">
        <div style="flex:1"><div class="ch-pname">${ch.place.name}</div><div class="ch-pmeta">${ch.place.address} · ${ch.place.duration}</div></div>
        <div class="ch-prating">${'\u2605'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</div>
      </div>
      ${mapHtml}
      <div class="ornament">· · ·</div>
    </div>`;
  }).join('');

  // PDF preview
  document.getElementById('pdf-mock-title').textContent = v.name;
  document.getElementById('pdf-mock-date').textContent = v.dates;
  document.getElementById('pdf-mock-cover').style.backgroundImage = `url('${v.cover}')`;
  document.getElementById('pdf-mock-cover').style.backgroundSize = 'cover';
  document.getElementById('pdf-mock-cover').style.backgroundPosition = 'center';

  navigateTo('screen-carnet');
}

function decorateText(text, placeName) {
  // Wrap known place name references in italic Playfair
  if (placeName) {
    const escaped = placeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    text = text.replace(new RegExp(escaped, 'g'), `<span class="place-name">${placeName}</span>`);
  }
  return text;
}

function goBackFromPdf() { navigateTo(curVoyage ? 'screen-carnet' : 'screen-home'); }

// =============================================
// Photos — Toggle, Gallery, Viewer
// =============================================
function togPhoto(vid, ci, pi) {
  const v = VOYAGES.find(x => x.id === vid);
  v.chapters[ci].photos[pi].on = v.chapters[ci].photos[pi].on ? 0 : 1;
  openVoyage(vid);
}

function openGallery(vid, ci) {
  const v = VOYAGES.find(x => x.id === vid);
  if (!v) return;
  const ch = v.chapters[ci];
  let g = document.querySelector('.gal');
  if (!g) { g = document.createElement('div'); g.className = 'gal'; document.getElementById('app-content').appendChild(g); }
  const sel = ch.photos.filter(p => p.on).length;
  g.innerHTML = `
    <div class="gal-head"><div><div class="gal-title">${ch.day} - Photos</div><div class="gal-sub">${sel} selectionnees sur ${ch.photos.length}</div></div><button class="gal-ok" onclick="closeGallery(${vid})">OK</button></div>
    <div class="gal-grid" id="gal-grid">${ch.photos.map((p, pi) => `<div class="gal-ph ${p.on ? 'on' : ''}" style="background-image:url('${p.url}')" onclick="togGal(${vid},${ci},${pi})"><div class="gal-ck">${p.on ? '\u2713' : ''}</div></div>`).join('')}</div>
    <div class="gal-add">
      <div style="display:flex;gap:8px;margin-bottom:8px">
        <input type="text" placeholder="Rechercher sur Pexels..." id="gal-search" style="flex:1;padding:12px 16px;background:var(--bg3);border:1px solid var(--border);border-radius:24px;color:var(--ink);font:400 14px var(--sans);outline:none">
        <button onclick="galSearch(${vid},${ci})" style="padding:12px 18px;background:var(--copper);color:#fff;border:none;border-radius:24px;font:500 13px var(--sans);cursor:pointer">Chercher</button>
      </div>
      <button onclick="addPhoto(${vid},${ci})"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>Importer depuis l'appareil</button>
    </div>`;
  requestAnimationFrame(() => g.classList.add('show'));
}

async function galSearch(vid, ci) {
  const q = document.getElementById('gal-search').value.trim();
  if (!q) return;
  showToast('Recherche en cours...');
  const photos = await searchPhotos(q);
  if (!photos.length) { showToast('Aucune photo trouvee'); return; }
  const v = VOYAGES.find(x => x.id === vid);
  photos.forEach(p => { v.chapters[ci].photos.push({ url: p.url, thumb: p.thumb, on: 0 }); });
  showToast(photos.length + ' photos ajoutees');
  openGallery(vid, ci);
}

function togGal(vid, ci, pi) {
  VOYAGES.find(x => x.id === vid).chapters[ci].photos[pi].on ^= 1;
  openGallery(vid, ci);
}

function closeGallery(vid) {
  const g = document.querySelector('.gal');
  if (g) g.classList.remove('show');
  setTimeout(() => openVoyage(vid), 300);
}

function addPhoto(vid, ci) {
  const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.multiple = true;
  inp.onchange = e => {
    Array.from(e.target.files).forEach(f => {
      VOYAGES.find(x => x.id === vid).chapters[ci].photos.push({ url: URL.createObjectURL(f), on: 1 });
    });
    if (e.target.files.length) { showToast(e.target.files.length + ' photo(s) ajoutee(s)'); openGallery(vid, ci); }
  };
  inp.click();
}

function viewPhoto(url) {
  let v = document.querySelector('.pv');
  if (!v) { v = document.createElement('div'); v.className = 'pv'; v.onclick = () => v.classList.remove('show'); document.getElementById('app-content').appendChild(v); }
  v.innerHTML = `<button class="pv-close" onclick="event.stopPropagation();this.parentElement.classList.remove('show')">&#10005;</button><img src="${url}">`;
  requestAnimationFrame(() => v.classList.add('show'));
}

// =============================================
// Wallet Screen
// =============================================
function renderWallet() {
  const list = document.getElementById('wallet-list');
  if (list.children.length) return; // Already rendered
  list.innerHTML = BOARDING_PASSES.map(bp => {
    // Generate fake barcode bars
    const bars = [];
    for (let i = 0; i < 60; i++) {
      const w = Math.random() > .5 ? 2 : 1;
      bars.push(`<div class="bp-barcode-bar" style="width:${w}px"></div>`);
    }
    return `
    <div class="boarding-pass">
      <div class="bp-header">
        <div class="bp-logo" style="background:${bp.color}">${bp.airline}</div>
        <div class="bp-airline-info">
          <div class="bp-airline-name">${bp.airlineFull}</div>
          <div class="bp-flight-num">Vol ${bp.flight} · ${bp.class}</div>
        </div>
        <div class="bp-auto-tag">Dates detectees automatiquement</div>
      </div>
      <div class="bp-route">
        <div class="bp-airport">
          <span class="bp-code">${bp.from}</span>
          <span class="bp-city">${bp.fromCity.split(' ')[0]}</span>
          <span class="bp-time">${bp.time}</span>
        </div>
        <div class="bp-route-line">
          <span class="bp-plane">\u2708</span>
        </div>
        <div class="bp-airport">
          <span class="bp-code">${bp.to}</span>
          <span class="bp-city">${bp.toCity.split(' ')[0]}</span>
          <span class="bp-time">${bp.arrival}</span>
        </div>
      </div>
      <div class="bp-details">
        <div class="bp-detail"><span class="bp-detail-label">Date</span><span class="bp-detail-value">${bp.date}</span></div>
        <div class="bp-detail"><span class="bp-detail-label">Siege</span><span class="bp-detail-value">${bp.seat}</span></div>
        <div class="bp-detail"><span class="bp-detail-label">Porte</span><span class="bp-detail-value">${bp.gate}</span></div>
        <div class="bp-detail"><span class="bp-detail-label">Embarq.</span><span class="bp-detail-value">${bp.boarding}</span></div>
      </div>
      <div class="bp-barcode">${bars.join('')}</div>
    </div>`;
  }).join('');
}

// =============================================
// PDF Template Selector
// =============================================
function renderPdfTemplates() {
  const cont = document.getElementById('pdf-templates');
  if (!cont) return;
  cont.innerHTML = PDF_TEMPLATES.map(t => {
    const isLand = (t.orientation||'landscape') === 'landscape';
    const formatLabel = Array.isArray(t.format) ? '21x21cm' : t.format.toUpperCase() + ' ' + (isLand ? 'Paysage' : 'Portrait');
    return `
    <div class="pdf-tpl ${t.id === selectedTemplate ? 'active' : ''}" onclick="selectTemplate('${t.id}')">
      <div class="pdf-tpl-preview ${isLand?'landscape':''}" style="background:${t.preview}">
        <span class="pdf-tpl-icon">${t.icon||''}</span>
      </div>
      <div class="pdf-tpl-name">${t.name}</div>
      <div class="pdf-tpl-format">${formatLabel}</div>
      <div class="pdf-tpl-price ${t.price ? 'premium' : ''}">${t.priceLabel}</div>
    </div>`;
  }).join('');
}

function selectTemplate(id) {
  selectedTemplate = id;
  renderPdfTemplates();
}

// =============================================
// Map
// =============================================
let mapOk = false;
function loadMap() {
  if (mapOk) return; mapOk = true;
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(r => r.json()).then(t => drawMap(t))
    .catch(() => {
      document.getElementById('map-wrap').innerHTML = '<p style="color:var(--ink3);text-align:center;padding:40px">Carte indisponible</p>';
    });
}

function drawMap(topo) {
  const svg = document.getElementById('world-map'), coll = topoFeat(topo, topo.objects.countries);
  const w = 960, h = 500, px = lon => (lon + 180) / 360 * w, py = lat => (90 - lat) / 180 * h;
  coll.features.forEach(f => {
    const id = f.id, vis = Object.values(COUNTRY_CODES_NUM).includes(id), rec = id === COUNTRY_CODES_NUM.EG;
    geo2path(f.geometry, px, py).forEach(d => {
      const p = ns('path'); p.setAttribute('d', d);
      p.setAttribute('class', 'country' + (vis ? ' visited' : '') + (rec ? ' recent' : ''));
      svg.appendChild(p);
    });
  });
  Object.entries(MAP_COUNTRIES).forEach(([, info]) => {
    const cx = px(info.lon), cy = py(info.lat);
    const c = ns('circle'); c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', '4'); c.setAttribute('class', 'map-point');
    if (info.recent) c.style.fill = 'var(--blue)'; svg.appendChild(c);
    const t = ns('text'); t.setAttribute('x', cx); t.setAttribute('y', cy - 10); t.setAttribute('text-anchor', 'middle');
    t.setAttribute('fill', 'var(--ink2)'); t.setAttribute('font-size', '10'); t.setAttribute('font-family', 'DM Sans, sans-serif');
    t.textContent = info.name; svg.appendChild(t);
  });
  const hx = px(1.44), hy = py(43.6);
  const hc = ns('circle'); hc.setAttribute('cx', hx); hc.setAttribute('cy', hy); hc.setAttribute('r', '3'); hc.setAttribute('class', 'map-point');
  svg.appendChild(hc);
  Object.entries(MAP_ROUTES).forEach(([code, r]) => {
    const x1 = px(r.from[0]), y1 = py(r.from[1]), x2 = px(r.to[0]), y2 = py(r.to[1]);
    const p = ns('path'); p.setAttribute('d', `M${x1},${y1} Q${(x1 + x2) / 2},${Math.min(y1, y2) - 30} ${x2},${y2}`);
    p.setAttribute('class', 'route-line'); if (code === 'EG') p.style.stroke = 'var(--blue)'; svg.appendChild(p);
  });
  document.getElementById('map-btns').innerHTML = VOYAGES.map((v, i) =>
    `<button class="map-btn ${i === 0 ? 'active' : ''}" onclick="this.parentElement.querySelectorAll('.map-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${v.name}</button>`
  ).join('');
}

function ns(tag) { return document.createElementNS('http://www.w3.org/2000/svg', tag); }
function topoFeat(topo, obj) {
  const arcs = topo.arcs, tr = topo.transform;
  function dArc(ai) { const rev = ai < 0, a = arcs[rev ? ~ai : ai], c = []; let x = 0, y = 0; for (const p of a) { x += p[0]; y += p[1]; c.push([x * tr.scale[0] + tr.translate[0], y * tr.scale[1] + tr.translate[1]]); } return rev ? c.reverse() : c; }
  function dRing(r) { const c = []; for (const ai of r) { const ac = dArc(ai); c.push(...(c.length ? ac.slice(1) : ac)); } return c; }
  return { type: 'FeatureCollection', features: obj.geometries.map(g => ({ type: 'Feature', id: g.id, geometry: { type: g.type, coordinates: g.type === 'Polygon' ? g.arcs.map(dRing) : g.type === 'MultiPolygon' ? g.arcs.map(p => p.map(dRing)) : [] } })) };
}
function geo2path(g, px, py) {
  const ps = [];
  function r2p(r) { return r.map((c, i) => (i ? 'L' : 'M') + px(c[0]).toFixed(1) + ',' + py(c[1]).toFixed(1)).join('') + 'Z'; }
  if (g.type === 'Polygon') ps.push(g.coordinates.map(r2p).join(''));
  else if (g.type === 'MultiPolygon') g.coordinates.forEach(p => ps.push(p.map(r2p).join('')));
  return ps;
}

// =============================================
// Chat
// =============================================
function showChat() {
  let o = document.querySelector('.chat-overlay');
  if (!o) {
    o = document.createElement('div'); o.className = 'chat-overlay';
    o.innerHTML = `<div class="chat-panel"><div class="chat-handle"></div><div class="chat-messages"><div class="chat-msg ai">Que souhaitez-vous modifier ?</div></div><div class="chat-input-row"><input placeholder="Ex: Rends le Jour 2 plus drole..." id="chat-input"><button class="chat-send" onclick="sendChat()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg></button></div></div>`;
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('show'); });
    document.getElementById('app-content').appendChild(o);
  }
  requestAnimationFrame(() => o.classList.add('show'));
}

function sendChat() {
  const inp = document.getElementById('chat-input'), msg = inp.value.trim();
  if (!msg) return;
  const m = document.querySelector('.chat-messages');
  m.innerHTML += `<div class="chat-msg user">${msg}</div>`;
  inp.value = '';
  setTimeout(() => { m.innerHTML += `<div class="chat-msg ai">C'est note ! Modification effectuee.</div>`; m.scrollTop = m.scrollHeight; }, 1000);
}

// =============================================
// PDF Generation
// =============================================
async function downloadPdf() {
  const v = VOYAGES.find(x => x.id === curVoyage);
  if (!v) { showToast('Aucun voyage selectionne'); return; }
  const tpl = PDF_TEMPLATES.find(t => t.id === selectedTemplate) || PDF_TEMPLATES[0];
  showToast('Generation du PDF (' + tpl.name + ')...');

  function a(s) {
    return s.replace(/[\u2014]/g,'--').replace(/[\u00b7]/g,'.').replace(/[\u2605]/g,'*')
      .replace(/[\u00e9\u00e8\u00ea\u00eb]/g,'e').replace(/[\u00e0\u00e2\u00e4]/g,'a')
      .replace(/[\u00f4\u00f6]/g,'o').replace(/[\u00ee\u00ef]/g,'i').replace(/[\u00fb\u00fc]/g,'u')
      .replace(/[\u00e7]/g,'c').replace(/[\u00c9\u00c8]/g,'E').replace(/[\u00c0]/g,'A')
      .replace(/[\u00d4]/g,'O').replace(/[\u2019\u2018]/g,"'").replace(/[\u201c\u201d]/g,'"')
      .replace(/[\u014d\u00f3]/g,'o').replace(/[\u016b]/g,'u').replace(/[\u0101]/g,'a')
      .replace(/[^\x00-\x7F]/g,'');
  }

  try {
    const {jsPDF} = window.jspdf;
    const fmt = Array.isArray(tpl.format) ? tpl.format : tpl.format;
    const ori = tpl.orientation || 'landscape';
    const pdf = new jsPDF({orientation:ori, unit:'mm', format:fmt});
    const W = pdf.internal.pageSize.getWidth();
    const H = pdf.internal.pageSize.getHeight();
    const M = ori === 'landscape' ? 15 : 12;
    const isLand = ori === 'landscape';
    const copper=[200,134,74], ink=[26,20,16], dust=[155,142,122], cream=[250,247,242], white=[255,255,255];

    function li(url) {
      return new Promise(r => {
        const img = new Image(); img.crossOrigin='anonymous';
        img.onload=()=>{try{const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext('2d').drawImage(img,0,0);r(c.toDataURL('image/jpeg',.75))}catch(e){r(null)}};
        img.onerror=()=>r(null);
        img.src=url+(url.includes('?')?'&':'?')+'_='+Date.now();
        setTimeout(()=>r(null),6000);
      });
    }

    // Decorative line
    function hline(y,x1,x2,col) {
      pdf.setDrawColor(col[0],col[1],col[2]); pdf.setLineWidth(.3);
      pdf.line(x1,y,x2,y);
    }

    // Write text with page breaks
    function wt(txt,x,y,mw,fs,bold,col) {
      pdf.setFont('helvetica',bold?'bold':'normal'); pdf.setFontSize(fs);
      pdf.setTextColor(col[0],col[1],col[2]);
      const lines=pdf.splitTextToSize(a(txt),mw), lh=fs*.45;
      for(const l of lines){if(y>H-15){pdf.addPage();pBg();y=M}pdf.text(l,x,y);y+=lh}
      return y;
    }

    // Page background (cream)
    function pBg() { pdf.setFillColor(cream[0],cream[1],cream[2]); pdf.rect(0,0,W,H,'F'); }

    // Page number
    function pNum(n) {
      pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(dust[0],dust[1],dust[2]);
      pdf.text(String(n), W/2, H-6, {align:'center'});
      hline(H-10, M, W-M, [232,217,192]);
    }

    // ==========================================
    // COVER
    // ==========================================
    pdf.setFillColor(ink[0],ink[1],ink[2]); pdf.rect(0,0,W,H,'F');
    const coverImg = await li(v.cover);
    if(isLand) {
      // LANDSCAPE: photo left half, info right half
      if(coverImg) { try{pdf.addImage(coverImg,'JPEG',0,0,W*.55,H)}catch(e){} }
      // Right panel
      pdf.setFillColor(ink[0],ink[1],ink[2]); pdf.rect(W*.55,0,W*.45,H,'F');
      const rx = W*.55 + W*.225; // center of right panel
      // Copper line
      hline(H*.35, rx-25, rx+25, copper);
      pdf.setFont('helvetica','bold'); pdf.setFontSize(36); pdf.setTextColor(255,255,255);
      pdf.text(a(v.name), rx, H*.43, {align:'center'});
      pdf.setFont('helvetica','normal'); pdf.setFontSize(11); pdf.setTextColor(232,217,192);
      pdf.text(a(v.country)+' | '+v.days+' jours', rx, H*.43+12, {align:'center'});
      pdf.setFontSize(10); pdf.setTextColor(180,180,180);
      pdf.text(a(v.dates), rx, H*.43+22, {align:'center'});
      if(v.companions&&v.companions.length) {
        pdf.setFontSize(9); pdf.setTextColor(160,160,160);
        pdf.text('Avec '+v.companions.join(', '), rx, H*.43+34, {align:'center'});
      }
      hline(H*.75, rx-25, rx+25, copper);
      pdf.setFont('helvetica','bold'); pdf.setFontSize(8); pdf.setTextColor(copper[0],copper[1],copper[2]);
      pdf.text('TRAVELBOOK', rx, H-15, {align:'center'});
    } else {
      // PORTRAIT: full photo + overlay
      if(coverImg) { try{pdf.addImage(coverImg,'JPEG',0,0,W,H)}catch(e){} }
      pdf.setGState(new pdf.GState({opacity:.6}));
      pdf.setFillColor(0,0,0); pdf.rect(0,H*.45,W,H*.55,'F');
      pdf.setGState(new pdf.GState({opacity:1}));
      hline(H*.55, W/2-25, W/2+25, copper);
      pdf.setFont('helvetica','bold'); pdf.setFontSize(32); pdf.setTextColor(255,255,255);
      pdf.text(a(v.name), W/2, H*.63, {align:'center'});
      pdf.setFont('helvetica','normal'); pdf.setFontSize(11); pdf.setTextColor(232,217,192);
      pdf.text(a(v.country)+' | '+v.days+' jours', W/2, H*.63+10, {align:'center'});
      pdf.setFontSize(10); pdf.setTextColor(180,180,180);
      pdf.text(a(v.dates), W/2, H*.63+20, {align:'center'});
      if(v.companions&&v.companions.length) {
        pdf.setFontSize(9); pdf.text('Avec '+v.companions.join(', '), W/2, H*.63+30, {align:'center'});
      }
      pdf.setFont('helvetica','bold'); pdf.setFontSize(8); pdf.setTextColor(copper[0],copper[1],copper[2]);
      pdf.text('TRAVELBOOK', W/2, H-10, {align:'center'});
    }

    // ==========================================
    // PAGE 2 — SUMMARY / STATS
    // ==========================================
    pdf.addPage(); pBg();
    // Decorative top line
    hline(20, M, W-M, [232,217,192]);
    pdf.setFont('helvetica','bold'); pdf.setFontSize(22); pdf.setTextColor(ink[0],ink[1],ink[2]);
    pdf.text('Sommaire', W/2, 35, {align:'center'});
    hline(40, W/2-20, W/2+20, copper);

    // Stats boxes
    let sy = 55;
    const stats = [
      {val:String(v.stats.photos), lbl:'Photos'},
      {val:String(v.stats.lieux), lbl:'Lieux visites'},
      {val:v.stats.mots.toLocaleString(), lbl:'Mots'},
      {val:v.stats.temp, lbl:'Temperature moy.'}
    ];
    for(const s of stats) {
      pdf.setFont('helvetica','bold'); pdf.setFontSize(20); pdf.setTextColor(copper[0],copper[1],copper[2]);
      pdf.text(s.val, W/2, sy, {align:'center'});
      pdf.setFont('helvetica','normal'); pdf.setFontSize(8); pdf.setTextColor(dust[0],dust[1],dust[2]);
      pdf.text(s.lbl.toUpperCase(), W/2, sy+6, {align:'center'});
      sy += 20;
    }

    // Chapter list
    hline(sy+5, M, W-M, [232,217,192]);
    sy += 15;
    pdf.setFont('helvetica','normal'); pdf.setFontSize(8); pdf.setTextColor(dust[0],dust[1],dust[2]);
    pdf.text('ITINERAIRE', M, sy); sy += 8;
    for(let i=0;i<v.chapters.length;i++) {
      const ch = v.chapters[i];
      pdf.setFont('helvetica','normal'); pdf.setFontSize(9); pdf.setTextColor(copper[0],copper[1],copper[2]);
      pdf.text(a(ch.day), M, sy);
      pdf.setFont('helvetica','bold'); pdf.setFontSize(9); pdf.setTextColor(ink[0],ink[1],ink[2]);
      pdf.text(a(ch.title), M+25, sy);
      pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(dust[0],dust[1],dust[2]);
      pdf.text(a(ch.place.name), W-M, sy, {align:'right'});
      sy += 7;
    }
    pNum(1);

    // ==========================================
    // CHAPTERS
    // ==========================================
    let pageNum = 2;
    for(let i=0;i<v.chapters.length;i++) {
      const ch = v.chapters[i];
      const selP = ch.photos ? ch.photos.filter(p=>p.on) : [];

      if(isLand) {
        // ======= LANDSCAPE: photo left + text right on same page =======
        pdf.addPage(); pBg();
        const half = W * .48;
        // Left: main photo
        if(selP.length) {
          const ib = await li(selP[0].url||'');
          if(ib) { try{pdf.addImage(ib,'JPEG',0,0,half,H)}catch(e){} }
          // Day overlay on photo
          pdf.setGState(new pdf.GState({opacity:.6}));
          pdf.setFillColor(0,0,0); pdf.rect(0,0,half,35,'F');
          pdf.setGState(new pdf.GState({opacity:1}));
          pdf.setFont('helvetica','bold'); pdf.setFontSize(10); pdf.setTextColor(copper[0],copper[1],copper[2]);
          pdf.text(a(ch.day).toUpperCase(), 10, 15);
          pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(220,220,220);
          pdf.text(a(ch.place.name), 10, 23);
        }
        // Right: text
        const rx = half + 12;
        const tw = W - half - 24;
        let y = 18;
        // Title
        hline(y-4, rx, rx+30, copper);
        pdf.setFont('helvetica','bold'); pdf.setFontSize(18); pdf.setTextColor(ink[0],ink[1],ink[2]);
        const ttl = pdf.splitTextToSize(a(ch.title), tw);
        pdf.text(ttl, rx, y+4); y += ttl.length*7+10;
        // Text
        y = wt(ch.text, rx, y, tw, 8.5, false, [60,55,45]);
        y += 5;
        // Face detection
        if(ch.faces&&ch.faces.length) {
          const names = ch.faces.map(f=>COMPANIONS[f]?COMPANIONS[f].name:f).join(', ');
          pdf.setFont('helvetica','normal'); pdf.setFontSize(6.5); pdf.setTextColor(dust[0],dust[1],dust[2]);
          pdf.text('Visages : '+names, rx, y); y += 6;
        }
        // Place card
        if(y < H-25) {
          pdf.setDrawColor(232,217,192); pdf.setFillColor(255,255,255);
          pdf.roundedRect(rx, y, tw, 18, 2, 2, 'FD');
          pdf.setFillColor(copper[0],copper[1],copper[2]); pdf.rect(rx, y, 2.5, 18, 'F');
          pdf.setFont('helvetica','bold'); pdf.setFontSize(8); pdf.setTextColor(ink[0],ink[1],ink[2]);
          pdf.text(a(ch.place.name), rx+7, y+6);
          pdf.setFont('helvetica','normal'); pdf.setFontSize(6.5); pdf.setTextColor(dust[0],dust[1],dust[2]);
          pdf.text(a(ch.place.address)+' . '+ch.place.duration, rx+7, y+12);
          pdf.setTextColor(copper[0],copper[1],copper[2]); pdf.setFontSize(8);
          pdf.text('*'.repeat(Math.round(ch.place.rating))+' '+ch.place.rating, rx+tw-3, y+9, {align:'right'});
        }
        pNum(pageNum); pageNum++;

        // Extra photos page (if available, landscape grid)
        if(selP.length > 1) {
          pdf.addPage(); pBg();
          const extras = selP.slice(1, 7);
          const cols = Math.min(extras.length, 3);
          const gap = 5;
          const pw = (W - M*2 - gap*(cols-1)) / cols;
          const ph = (H - M*2 - gap) / 2;
          for(let idx=0; idx<extras.length && idx<6; idx++) {
            const col = idx % cols, row = Math.floor(idx / cols);
            const ex = M + col * (pw + gap);
            const ey = M + row * (ph + gap);
            const eb = await li(extras[idx].url||'');
            if(eb) { try{pdf.addImage(eb,'JPEG',ex,ey,pw,ph,undefined,'MEDIUM')}catch(e){} }
          }
          // Caption
          pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(dust[0],dust[1],dust[2]);
          pdf.text(a(ch.day)+' - '+a(ch.place.name)+' | '+extras.length+' photos', W/2, H-8, {align:'center'});
          pageNum++;
        }
      } else {
        // ======= PORTRAIT: full photo page + text page =======
        // Photo page
        pdf.addPage();
        pdf.setFillColor(ink[0],ink[1],ink[2]); pdf.rect(0,0,W,H,'F');
        if(selP.length) {
          const ib = await li(selP[0].url||'');
          if(ib) { try{pdf.addImage(ib,'JPEG',0,0,W,H)}catch(e){} }
        }
        pdf.setGState(new pdf.GState({opacity:.55}));
        pdf.setFillColor(0,0,0); pdf.rect(0,0,W,40,'F'); pdf.rect(0,H-55,W,55,'F');
        pdf.setGState(new pdf.GState({opacity:1}));
        pdf.setFont('helvetica','normal'); pdf.setFontSize(8); pdf.setTextColor(copper[0],copper[1],copper[2]);
        pdf.text(a(ch.day).toUpperCase(), M, 16);
        hline(H-44, M, M+30, copper);
        pdf.setFont('helvetica','bold'); pdf.setFontSize(20); pdf.setTextColor(255,255,255);
        const tL = pdf.splitTextToSize(a(ch.title), W-24);
        pdf.text(tL, M, H-32);
        pdf.setFont('helvetica','normal'); pdf.setFontSize(8); pdf.setTextColor(232,217,192);
        pdf.text(a(ch.place.name)+' | '+ch.place.duration, M, H-12);
        pageNum++;

        // Text page
        pdf.addPage(); pBg();
        let y = M+5;
        pdf.setFont('helvetica','normal'); pdf.setFontSize(8); pdf.setTextColor(copper[0],copper[1],copper[2]);
        pdf.text(a(ch.day).toUpperCase(), M, y); hline(y+2, M, M+15, copper); y += 10;
        pdf.setFont('helvetica','bold'); pdf.setFontSize(16); pdf.setTextColor(ink[0],ink[1],ink[2]);
        const ttl = pdf.splitTextToSize(a(ch.title), W-24);
        pdf.text(ttl, M, y); y += ttl.length*7+6;
        hline(y, M, W-M, [232,217,192]); y += 8;
        y = wt(ch.text, M, y, W-24, 9.5, false, [60,55,45]); y += 5;
        if(ch.faces&&ch.faces.length) {
          const names = ch.faces.map(f=>COMPANIONS[f]?COMPANIONS[f].name:f).join(', ');
          pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(dust[0],dust[1],dust[2]);
          pdf.text('VISAGES : '+names.toUpperCase(), M, y); y += 7;
        }
        if(y > H-30) { pdf.addPage(); pBg(); y = M; }
        pdf.setDrawColor(232,217,192); pdf.setFillColor(255,255,255);
        pdf.roundedRect(M, y, W-24, 20, 3, 3, 'FD');
        pdf.setFillColor(copper[0],copper[1],copper[2]); pdf.rect(M, y, 3, 20, 'F');
        pdf.setFont('helvetica','bold'); pdf.setFontSize(9); pdf.setTextColor(ink[0],ink[1],ink[2]);
        pdf.text(a(ch.place.name), M+8, y+7);
        pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(dust[0],dust[1],dust[2]);
        pdf.text(a(ch.place.address)+' . '+ch.place.duration, M+8, y+14);
        pdf.setTextColor(copper[0],copper[1],copper[2]); pdf.setFontSize(8);
        pdf.text('*'.repeat(Math.round(ch.place.rating))+' '+ch.place.rating, W-M-3, y+10, {align:'right'});
        y += 28;
        // Extra photos
        if(selP.length > 1) {
          const extras = selP.slice(1, 5);
          const pw = (W-24-5)/2, ph = 40;
          for(let r=0;r<extras.length;r+=2) {
            if(y > H-50) { pdf.addPage(); pBg(); y = M; }
            for(let c=0;c<2&&(r+c)<extras.length;c++) {
              const eb = await li(extras[r+c].url||'');
              if(eb) { try{pdf.addImage(eb,'JPEG',M+c*(pw+5),y,pw,ph,undefined,'MEDIUM')}catch(e){} }
            }
            y += ph+4;
          }
        }
        pNum(pageNum); pageNum++;
      }
    }

    // ==========================================
    // MAP PAGE — Route overview
    // ==========================================
    pdf.addPage(); pBg();
    const mapX = isLand ? M : M;
    const mapW = isLand ? W*.45 : W-M*2;
    // Title
    hline(18, M, isLand?W-M:W-M, [232,217,192]);
    pdf.setFont('helvetica','bold'); pdf.setFontSize(isLand?20:18); pdf.setTextColor(ink[0],ink[1],ink[2]);
    pdf.text('Carte du voyage', isLand?W/2:W/2, 30, {align:'center'});
    hline(35, W/2-20, W/2+20, copper);

    let my = 50;
    const timeX = isLand ? M : M;

    pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(dust[0],dust[1],dust[2]);
    pdf.text('ITINERAIRE', timeX, my); my += 8;

    // Home
    pdf.setFillColor(copper[0],copper[1],copper[2]); pdf.circle(timeX+5, my, 3, 'F');
    pdf.setFont('helvetica','bold'); pdf.setFontSize(9); pdf.setTextColor(ink[0],ink[1],ink[2]);
    pdf.text('Toulouse (depart)', timeX+14, my+1.5);
    pdf.setDrawColor(copper[0],copper[1],copper[2]); pdf.setLineWidth(.4); pdf.setLineDashPattern([2,2],0);
    my += 10;

    for(let i=0;i<v.chapters.length;i++) {
      const ch = v.chapters[i];
      pdf.line(timeX+5, my-6, timeX+5, my+2);
      const last = i===v.chapters.length-1;
      pdf.setFillColor(last?copper[0]:ink[0], last?copper[1]:ink[1], last?copper[2]:ink[2]);
      pdf.circle(timeX+5, my+2, last?3:2, 'F');
      pdf.setFont('helvetica','normal'); pdf.setFontSize(7); pdf.setTextColor(copper[0],copper[1],copper[2]);
      pdf.text(a(ch.day), timeX+14, my);
      pdf.setFont('helvetica','bold'); pdf.setFontSize(8); pdf.setTextColor(ink[0],ink[1],ink[2]);
      pdf.text(a(ch.place.name), timeX+38, my);
      pdf.setFont('helvetica','normal'); pdf.setFontSize(6.5); pdf.setTextColor(dust[0],dust[1],dust[2]);
      const durX = isLand ? timeX+mapW-5 : W-M;
      pdf.text(ch.place.duration, durX, my, {align:'right'});
      my += isLand ? 10 : 12;
      if(my > H-25) { pdf.addPage(); pBg(); my = M; }
    }
    pdf.setLineDashPattern([],0);
    my += 4;
    pdf.line(timeX+5, my-6, timeX+5, my);
    pdf.setFillColor(copper[0],copper[1],copper[2]); pdf.circle(timeX+5, my, 3, 'F');
    pdf.setFont('helvetica','bold'); pdf.setFontSize(9); pdf.setTextColor(ink[0],ink[1],ink[2]);
    pdf.text('Retour', timeX+14, my+1.5);

    // Stats
    my += 15;
    hline(my, M, isLand?W*.45:W-M, [232,217,192]); my += 7;
    pdf.setFont('helvetica','normal'); pdf.setFontSize(7.5); pdf.setTextColor(dust[0],dust[1],dust[2]);
    pdf.text(v.stats.lieux+' lieux | '+v.stats.photos+' photos | '+v.stats.mots+' mots | '+v.stats.temp, isLand?W*.25:W/2, my, {align:'center'});

    // In landscape: add a photo on the right side of the map page
    if(isLand && v.chapters.length > 0) {
      const mapPhoto = v.chapters[Math.floor(v.chapters.length/2)].photos;
      const bestP = mapPhoto ? mapPhoto.find(p=>p.on) : null;
      if(bestP) {
        const mp = await li(bestP.url||'');
        if(mp) { try{pdf.addImage(mp,'JPEG',W*.5,40,W*.48,H-55,undefined,'MEDIUM')}catch(e){} }
      }
    }
    pNum(pageNum); pageNum++;

    // ==========================================
    // LAST PAGE — Branding
    // ==========================================
    pdf.addPage();
    pdf.setFillColor(ink[0],ink[1],ink[2]); pdf.rect(0,0,W,H,'F');
    // Copper lines
    hline(H/2-30, W/2-25, W/2+25, copper);
    pdf.setFont('helvetica','bold'); pdf.setFontSize(24); pdf.setTextColor(copper[0],copper[1],copper[2]);
    pdf.text('TravelBook', W/2, H/2-10, {align:'center'});
    pdf.setFont('helvetica','normal'); pdf.setFontSize(10); pdf.setTextColor(dust[0],dust[1],dust[2]);
    pdf.text('Votre Livre de Voyage', W/2, H/2+4, {align:'center'});
    hline(H/2+12, W/2-25, W/2+25, copper);
    pdf.setFontSize(8); pdf.setTextColor(100,90,80);
    pdf.text('Genere le '+new Date().toLocaleDateString('fr-FR',{year:'numeric',month:'long',day:'numeric'}), W/2, H/2+28, {align:'center'});
    if(v.companions&&v.companions.length) {
      pdf.text('Voyageurs : Raph, '+v.companions.join(', '), W/2, H/2+36, {align:'center'});
    }
    pdf.setFontSize(7); pdf.setTextColor(80,70,60);
    pdf.text('travelbook.app', W/2, H-15, {align:'center'});

    pdf.save('TravelBook-'+v.name.replace(/[^a-zA-Z0-9]/g,'')+'.pdf');
    showToast('PDF telecharge !');
  } catch(err) {
    console.error('PDF error:',err);
    showToast('Erreur: '+err.message);
  }
}

// =============================================
// Misc
// =============================================
function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function updateClock() {
  const n = new Date();
  document.getElementById('status-time').textContent =
    n.getHours().toString().padStart(2, '0') + ':' + n.getMinutes().toString().padStart(2, '0');
}

// =============================================
// Splash Grid — Load 6 photos from Pexels
// =============================================
async function loadSplashGrid() {
  const grid = document.getElementById('splash-grid');
  const queries = ['travel adventure', 'tokyo temple', 'lisbon sunset', 'egypt pyramids', 'ocean beach', 'mountain landscape'];
  const fallbacks = [IMG.lisbon1, IMG.sensoji, IMG.pyramids, IMG.cascais, IMG.shinjuku, IMG.alfama];

  // Create placeholder grid items first
  for (let i = 0; i < 6; i++) {
    const item = document.createElement('div');
    item.className = 'splash-grid-item';
    item.style.backgroundImage = `url('${fallbacks[i]}')`;
    grid.appendChild(item);
  }

  // Try to load from Pexels
  try {
    const photos = await fetchPhotos('travel beautiful landscape destination', 6);
    if (photos.length >= 6) {
      const items = grid.querySelectorAll('.splash-grid-item');
      photos.forEach((p, i) => {
        if (items[i]) items[i].style.backgroundImage = `url('${p.url}')`;
      });
    }
  } catch (e) {
    console.warn('Splash grid Pexels fetch failed:', e);
  }
}

// =============================================
// Init
// =============================================
document.addEventListener('DOMContentLoaded', () => {
  setTheme(localStorage.getItem('tb-theme') || 'light');
  const dm = document.getElementById('dark-mode-toggle');
  if (dm) dm.addEventListener('change', toggleTheme);
  updateClock(); setInterval(updateClock, 30000);
  renderTrips();
  renderPdfTemplates();

  // Auto-login
  if (localStorage.getItem('tb-logged')) {
    document.getElementById('screen-splash').classList.remove('active');
    document.getElementById('screen-home').classList.add('active');
    document.getElementById('nav').classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(x =>
      x.classList.toggle('active', x.dataset.screen === 'screen-home')
    );
    cur = 'screen-home'; hist = ['screen-home'];
  }

  // Splash grid
  loadSplashGrid();

  // Fetch photos from Pexels for all voyages
  fetchAllPhotos().then(() => { console.log('Pexels photos loaded'); });

  // Map lazy-load
  new MutationObserver(() => {
    if (document.getElementById('screen-map').classList.contains('active')) loadMap();
  }).observe(document.getElementById('screen-map'), { attributes: true, attributeFilter: ['class'] });

  // Chat enter key
  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && document.activeElement?.id === 'chat-input') sendChat();
  });
});
