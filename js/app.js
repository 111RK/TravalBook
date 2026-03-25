// ============================================
// TravelBook — App Logic
// ============================================

let currentScreen = 'screen-splash';
let currentVoyageId = null;
let swipeIndex = 0;
let screenHistory = ['screen-splash'];

const NAV_SCREENS = ['screen-home', 'screen-map', 'screen-profile'];

// ============================================
// Theme (light/dark)
// ============================================

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('tb-theme', theme);
  const toggle = document.getElementById('dark-mode-toggle');
  if (toggle) toggle.checked = theme === 'dark';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// ============================================
// Navigation
// ============================================

function navigateTo(screenId, addToHistory = true) {
  const current = document.getElementById(currentScreen);
  const next = document.getElementById(screenId);
  if (!current || !next || screenId === currentScreen) return;

  current.classList.remove('active');
  current.classList.add('slide-out');
  next.classList.add('slide-in');

  setTimeout(() => {
    current.classList.remove('slide-out');
    next.classList.remove('slide-in');
    next.classList.add('active');
  }, 350);

  if (addToHistory) screenHistory.push(screenId);
  currentScreen = screenId;

  const nav = document.getElementById('bottom-nav');
  if (NAV_SCREENS.includes(screenId)) {
    nav.classList.remove('hidden');
    updateNavActive(screenId);
  } else {
    nav.classList.add('hidden');
  }
}

function navTo(screenId) {
  if (screenId === currentScreen) return;
  const current = document.getElementById(currentScreen);
  const next = document.getElementById(screenId);
  if (!current || !next) return;

  current.classList.remove('active');
  next.classList.add('active');
  currentScreen = screenId;
  screenHistory.push(screenId);
  updateNavActive(screenId);
}

function updateNavActive(screenId) {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.screen === screenId);
  });
}

function goBack() {
  if (screenHistory.length > 1) {
    screenHistory.pop();
    navigateTo(screenHistory[screenHistory.length - 1], false);
  }
}

// ============================================
// Auth (demo)
// ============================================

function doLogin() {
  showToast('Connexion r\u00e9ussie !');
  setTimeout(() => navigateTo('screen-home'), 500);
}

function doSignup() {
  showToast('Compte cr\u00e9\u00e9 !');
  setTimeout(() => navigateTo('screen-home'), 500);
}

function logout() {
  navigateTo('screen-splash');
  screenHistory = ['screen-splash'];
}

// ============================================
// Home — Voyage List
// ============================================

function renderVoyageList() {
  const list = document.getElementById('voyage-list');
  list.innerHTML = VOYAGES.map(v => `
    <div class="voyage-card" onclick="openVoyage(${v.id})">
      <div class="voyage-card-img" style="background-image:url('${v.coverImg}')">
        <span class="voyage-card-badge ${v.badge === 'ready' ? 'badge-ready' : 'badge-pdf'}">
          ${v.badge === 'ready' ? 'Carnet pr\u00eat' : 'PDF export\u00e9'}
        </span>
      </div>
      <div class="voyage-card-body">
        <div class="voyage-card-title">${v.name}</div>
        <div class="voyage-card-meta">${v.country} \u00b7 ${v.dates}</div>
        <div class="voyage-card-footer">
          <div class="voyage-companions">
            ${v.companions.map(c => `<div class="voyage-companion">${c[0]}</div>`).join('')}
          </div>
          <div class="voyage-card-stats">${v.stats.photos} photos \u00b7 ${v.stats.lieux} lieux</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ============================================
// Open Voyage (Carnet)
// ============================================

function openVoyage(id) {
  const v = VOYAGES.find(x => x.id === id);
  if (!v) return;
  currentVoyageId = id;

  // Cover with real image
  const cover = document.getElementById('carnet-cover');
  cover.style.backgroundImage = `url('${v.coverImg}')`;
  document.getElementById('carnet-title').textContent = v.name;
  document.getElementById('carnet-subtitle').textContent = `${v.country} \u2014 ${v.days} jours`;

  // Stats
  document.getElementById('carnet-stats').innerHTML = `
    <div class="carnet-stat">
      <span class="carnet-stat-val">${v.stats.photos}</span>
      <span class="carnet-stat-lbl">Photos</span>
    </div>
    <div class="carnet-stat">
      <span class="carnet-stat-val">${v.stats.lieux}</span>
      <span class="carnet-stat-lbl">Lieux</span>
    </div>
    <div class="carnet-stat">
      <span class="carnet-stat-val">${v.stats.mots.toLocaleString()}</span>
      <span class="carnet-stat-lbl">Mots</span>
    </div>
    <div class="carnet-stat">
      <span class="carnet-stat-val">${v.stats.temp}</span>
      <span class="carnet-stat-lbl">Moy.</span>
    </div>
  `;

  // Chapters with real images
  document.getElementById('carnet-chapters').innerHTML = v.chapters.map(ch => `
    <div class="chapter-card">
      <div class="chapter-day">${ch.day}</div>
      <div class="chapter-title">${ch.title}</div>
      ${ch.img ? `<div class="chapter-img" style="background-image:url('${ch.img}')"></div>` : ''}
      <div class="chapter-text">${ch.text}</div>
      <div class="chapter-place">
        <div class="chapter-place-info">
          <div class="chapter-place-name">${ch.place.name}</div>
          <div class="chapter-place-meta">${ch.place.address} \u00b7 ${ch.place.duration}</div>
        </div>
        <div class="chapter-place-rating">${'\u2605'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</div>
      </div>
    </div>
  `).join('');

  // PDF info
  document.getElementById('pdf-title').textContent = v.name;
  document.getElementById('pdf-dates').textContent = v.dates;
  const pdfCover = document.querySelector('.pdf-cover-img');
  if (pdfCover) {
    pdfCover.style.backgroundImage = `url('${v.coverImg}')`;
    pdfCover.style.backgroundSize = 'cover';
    pdfCover.style.backgroundPosition = 'center';
  }

  navigateTo('screen-carnet');
}

function goBackFromPdf() {
  if (currentVoyageId) {
    navigateTo('screen-carnet');
  } else {
    navigateTo('screen-home');
  }
}

// ============================================
// New Trip
// ============================================

function selectStyle(el) {
  document.querySelectorAll('.style-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

function createTrip() {
  swipeIndex = 0;
  renderSwipeCard();
  navigateTo('screen-swipe');
}

document.addEventListener('click', (e) => {
  const chip = e.target.closest('.companion-chip');
  if (chip && chip.closest('#companions-row')) {
    chip.classList.toggle('selected');
  }

  const fmt = e.target.closest('.pdf-format');
  if (fmt) {
    document.querySelectorAll('.pdf-format').forEach(f => f.classList.remove('active'));
    fmt.classList.add('active');
  }
});

// ============================================
// Swipe
// ============================================

function renderSwipeCard() {
  const area = document.getElementById('swipe-area');
  if (swipeIndex >= SWIPE_PLACES.length) {
    navigateTo('screen-generating');
    runGenerating();
    return;
  }

  const place = SWIPE_PLACES[swipeIndex];
  const progress = (swipeIndex / SWIPE_PLACES.length * 100);
  document.getElementById('swipe-progress-bar').style.width = progress + '%';
  document.getElementById('swipe-counter').textContent = `${swipeIndex + 1} / ${SWIPE_PLACES.length} lieux`;

  area.innerHTML = `
    <div class="swipe-card" id="current-swipe-card">
      <div class="swipe-card-img" style="background-image:url('${place.img}')">
        <div class="swipe-card-duration">${place.duration}</div>
      </div>
      <div class="swipe-card-body">
        <div class="swipe-card-name">${place.name}</div>
        <div class="swipe-card-address">${place.address}</div>
        <div class="swipe-card-rating">
          <span class="stars">${'\u2605'.repeat(Math.round(place.rating))}</span>
          <span>${place.rating}</span>
          <span class="rating-count">(${place.reviews.toLocaleString()} avis)</span>
        </div>
      </div>
    </div>
  `;
}

function swipeAction(dir) {
  const card = document.getElementById('current-swipe-card');
  if (!card) return;
  card.classList.add(dir === 'left' ? 'swiping-left' : 'swiping-right');
  setTimeout(() => { swipeIndex++; renderSwipeCard(); }, 400);
}

let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  if (currentScreen !== 'screen-swipe') return;
  touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  if (currentScreen !== 'screen-swipe') return;
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) > 60) swipeAction(diff > 0 ? 'right' : 'left');
});

// ============================================
// Generating
// ============================================

function runGenerating() {
  const steps = [
    { id: 'gen-step-1', delay: 0 },
    { id: 'gen-step-2', delay: 1200 },
    { id: 'gen-step-3', delay: 2400 },
    { id: 'gen-step-4', delay: 3600 }
  ];

  steps.forEach(s => {
    const el = document.getElementById(s.id);
    el.className = 'gen-step';
    el.querySelector('span').className = 'gen-dot';
  });

  steps.forEach((step, i) => {
    setTimeout(() => {
      const el = document.getElementById(step.id);
      if (i > 0) {
        const prev = document.getElementById(steps[i-1].id);
        prev.className = 'gen-step done';
        prev.querySelector('span').className = 'gen-check';
        prev.querySelector('span').innerHTML = '\u2713';
      }
      el.className = 'gen-step active';
      el.querySelector('span').className = 'gen-spinner';
      el.querySelector('span').innerHTML = '';
    }, step.delay);
  });

  setTimeout(() => {
    const last = document.getElementById(steps[steps.length-1].id);
    last.className = 'gen-step done';
    last.querySelector('span').className = 'gen-check';
    last.querySelector('span').innerHTML = '\u2713';
    setTimeout(() => openVoyage(1), 600);
  }, 4800);
}

// ============================================
// Map
// ============================================

let mapLoaded = false;

function loadMap() {
  if (mapLoaded) return;
  mapLoaded = true;

  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
    .then(r => r.json())
    .then(topo => renderMap(topo))
    .catch(() => {
      document.getElementById('map-container').innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px">Carte indisponible hors ligne</p>';
    });
}

function renderMap(topo) {
  const svg = document.getElementById('world-map');
  const countries = topojsonFeature(topo, topo.objects.countries);

  const w = 960, h = 500;
  const projX = (lon) => (lon + 180) / 360 * w;
  const projY = (lat) => (90 - lat) / 180 * h;

  countries.features.forEach(feature => {
    const id = feature.id;
    const isVisited = Object.values(COUNTRY_CODES_NUM).includes(id);
    const isRecent = id === COUNTRY_CODES_NUM['EG'];

    geoToPath(feature.geometry, projX, projY).forEach(d => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('class', `country${isVisited ? ' visited' : ''}${isRecent ? ' recent' : ''}`);
      svg.appendChild(path);
    });
  });

  Object.entries(MAP_COUNTRIES).forEach(([code, info]) => {
    const cx = projX(info.lon), cy = projY(info.lat);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', '4');
    circle.setAttribute('class', 'map-point');
    if (info.recent) circle.style.fill = 'var(--accent-sky)';
    svg.appendChild(circle);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', cx);
    text.setAttribute('y', cy - 10);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'var(--text-secondary)');
    text.setAttribute('font-size', '10');
    text.setAttribute('font-family', 'Inter, sans-serif');
    text.textContent = info.name;
    svg.appendChild(text);
  });

  // Home marker
  const homeX = projX(1.44), homeY = projY(43.6);
  const hc = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  hc.setAttribute('cx', homeX);
  hc.setAttribute('cy', homeY);
  hc.setAttribute('r', '3');
  hc.setAttribute('class', 'map-point');
  svg.appendChild(hc);

  // Routes
  Object.entries(MAP_ROUTES).forEach(([code, route]) => {
    const x1 = projX(route.from[0]), y1 = projY(route.from[1]);
    const x2 = projX(route.to[0]), y2 = projY(route.to[1]);
    const midX = (x1 + x2) / 2, midY = Math.min(y1, y2) - 30;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M${x1},${y1} Q${midX},${midY} ${x2},${y2}`);
    path.setAttribute('class', 'route-line');
    if (code === 'EG') path.style.stroke = 'var(--accent-sky)';
    svg.appendChild(path);
  });

  document.getElementById('map-voyages-btns').innerHTML = VOYAGES.map((v, i) => `
    <button class="map-voyage-btn ${i === 0 ? 'active' : ''}" onclick="selectMapVoyage(this)">${v.name}</button>
  `).join('');
}

function selectMapVoyage(btn) {
  document.querySelectorAll('.map-voyage-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// TopoJSON helpers
function topojsonFeature(topo, obj) {
  const arcs = topo.arcs;
  const transform = topo.transform;

  function decodeArc(arcIdx) {
    const reversed = arcIdx < 0;
    const arc = arcs[reversed ? ~arcIdx : arcIdx];
    const coords = [];
    let x = 0, y = 0;
    for (const point of arc) {
      x += point[0]; y += point[1];
      coords.push([
        x * transform.scale[0] + transform.translate[0],
        y * transform.scale[1] + transform.translate[1]
      ]);
    }
    return reversed ? coords.reverse() : coords;
  }

  function decodeRing(ring) {
    const coords = [];
    for (const arcIdx of ring) {
      const ac = decodeArc(arcIdx);
      coords.push(...(coords.length ? ac.slice(1) : ac));
    }
    return coords;
  }

  return {
    type: 'FeatureCollection',
    features: obj.geometries.map(geom => ({
      type: 'Feature',
      id: geom.id,
      geometry: {
        type: geom.type,
        coordinates: geom.type === 'Polygon'
          ? geom.arcs.map(decodeRing)
          : geom.type === 'MultiPolygon'
            ? geom.arcs.map(p => p.map(decodeRing))
            : []
      }
    }))
  };
}

function geoToPath(geometry, projX, projY) {
  const paths = [];
  function ringToPath(ring) {
    return ring.map((c, i) => (i === 0 ? 'M' : 'L') + projX(c[0]).toFixed(1) + ',' + projY(c[1]).toFixed(1)).join('') + 'Z';
  }
  if (geometry.type === 'Polygon') {
    paths.push(geometry.coordinates.map(ringToPath).join(''));
  } else if (geometry.type === 'MultiPolygon') {
    geometry.coordinates.forEach(poly => paths.push(poly.map(ringToPath).join('')));
  }
  return paths;
}

// ============================================
// PDF
// ============================================

function downloadPdf() {
  showToast('PDF g\u00e9n\u00e9r\u00e9 avec succ\u00e8s !');
}

// ============================================
// Chat
// ============================================

function showChat() {
  let overlay = document.querySelector('.chat-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'chat-overlay';
    overlay.innerHTML = `
      <div class="chat-panel">
        <div class="chat-handle"></div>
        <div class="chat-messages">
          <div class="chat-msg ai">Bonjour ! Je peux modifier votre carnet. Que souhaitez-vous changer ?</div>
        </div>
        <div class="chat-input-row">
          <input type="text" placeholder="Ex: Rends le Jour 2 plus dr\u00f4le..." id="chat-input">
          <button onclick="sendChat()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>
    `;
    overlay.addEventListener('click', (e) => { if (e.target === overlay) hideChat(); });
    document.getElementById('app-content').appendChild(overlay);
  }
  requestAnimationFrame(() => overlay.classList.add('show'));
}

function hideChat() {
  const overlay = document.querySelector('.chat-overlay');
  if (overlay) overlay.classList.remove('show');
}

function sendChat() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  const messages = document.querySelector('.chat-messages');
  messages.innerHTML += `<div class="chat-msg user">${msg}</div>`;
  input.value = '';
  setTimeout(() => {
    messages.innerHTML += `<div class="chat-msg ai">C'est not\u00e9 ! Je modifie le passage en question... Voil\u00e0, c'est fait !</div>`;
    messages.scrollTop = messages.scrollHeight;
  }, 1200);
}

// ============================================
// Toast
// ============================================

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ============================================
// Clock
// ============================================

function updateClock() {
  const now = new Date();
  document.getElementById('status-time').textContent =
    now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
}

// ============================================
// Init
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Restore theme
  const savedTheme = localStorage.getItem('tb-theme') || 'light';
  setTheme(savedTheme);

  // Dark mode toggle
  const dmToggle = document.getElementById('dark-mode-toggle');
  if (dmToggle) {
    dmToggle.addEventListener('change', toggleTheme);
  }

  updateClock();
  setInterval(updateClock, 30000);
  renderVoyageList();

  // Map lazy load
  const observer = new MutationObserver(() => {
    if (document.getElementById('screen-map').classList.contains('active')) loadMap();
  });
  observer.observe(document.getElementById('screen-map'), { attributes: true, attributeFilter: ['class'] });

  // Chat enter key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement?.id === 'chat-input') sendChat();
  });
});
