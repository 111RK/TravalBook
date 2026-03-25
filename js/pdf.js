// TravelBook — 7 Unique Magazine Templates
// Each template has its own fonts, colors, layout style

function splitAtSentence(text, part) {
  const mid = Math.floor(text.length / 2);
  let b = text.lastIndexOf('. ', mid + 40);
  if (b < mid - 100 || b < 0) b = text.indexOf('. ', mid - 40);
  if (b < 0) b = mid; else b += 2;
  return part === 0 ? text.substring(0, b) : text.substring(b);
}

// Template definitions with complete style systems
const TEMPLATE_STYLES = {
  'landscape-magazine': {
    fonts: 'Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;700',
    titleFont: "'Playfair Display',serif",
    bodyFont: "'DM Sans',sans-serif",
    colors: { bg:'#fff', bg2:'#faf8f4', ink:'#3d4025', accent:'#4a5028', accent2:'#8a7a40', muted:'#8a8a7a', card:'#f5f2ec', border:'#e8e4da', coverBg:'rgba(0,0,0,.55)', quote:'rgba(74,80,40,.04)' },
    coverTitleSize: '80px', titleSize: '22px', secSize: '18px', bodySize: '11px',
    dropcapSize: '72px', dropcapColor: '#4a5028',
    barStyle: 'background:#4a5028;color:white',
    placeBar: '#4a5028', starColor: '#8a7a40'
  },
  'landscape-photobook': {
    fonts: 'Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700',
    titleFont: "'Cormorant Garamond',serif",
    bodyFont: "'Lato',sans-serif",
    colors: { bg:'#fff', bg2:'#f8f8f8', ink:'#1a1a1a', accent:'#2a2a2a', accent2:'#666', muted:'#999', card:'#f2f2f2', border:'#e0e0e0', coverBg:'rgba(0,0,0,.65)', quote:'rgba(0,0,0,.03)' },
    coverTitleSize: '90px', titleSize: '24px', secSize: '18px', bodySize: '11px',
    dropcapSize: '80px', dropcapColor: '#1a1a1a',
    barStyle: 'background:#1a1a1a;color:white',
    placeBar: '#1a1a1a', starColor: '#c8a050'
  },
  'a5-elegant': {
    fonts: 'Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600',
    titleFont: "'Libre Baskerville',serif",
    bodyFont: "'Source Sans 3',sans-serif",
    colors: { bg:'#fff', bg2:'#faf5f0', ink:'#2d1b1b', accent:'#7a2e2e', accent2:'#b06040', muted:'#9a8a7a', card:'#f5ede5', border:'#e8ddd0', coverBg:'rgba(45,27,27,.6)', quote:'rgba(122,46,46,.04)' },
    coverTitleSize: '56px', titleSize: '18px', secSize: '15px', bodySize: '10.5px',
    dropcapSize: '64px', dropcapColor: '#7a2e2e',
    barStyle: 'background:#7a2e2e;color:white',
    placeBar: '#7a2e2e', starColor: '#b06040'
  },
  'landscape-premium': {
    fonts: 'Abril+Fatface&family=Poppins:wght@300;400;500;600',
    titleFont: "'Abril Fatface',serif",
    bodyFont: "'Poppins',sans-serif",
    colors: { bg:'#0e0e0e', bg2:'#161616', ink:'#f0e8d8', accent:'#c8a050', accent2:'#e0c080', muted:'#6a6050', card:'#1e1e1a', border:'#2a2820', coverBg:'rgba(0,0,0,.45)', quote:'rgba(200,160,80,.06)' },
    coverTitleSize: '85px', titleSize: '24px', secSize: '18px', bodySize: '11px',
    dropcapSize: '76px', dropcapColor: '#c8a050',
    barStyle: 'background:#c8a050;color:#0e0e0e',
    placeBar: '#c8a050', starColor: '#c8a050',
    dark: true
  },
  'a5-carnet': {
    fonts: 'Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@300;400;600',
    titleFont: "'Lora',serif",
    bodyFont: "'Nunito',sans-serif",
    handFont: "'Caveat',cursive",
    colors: { bg:'#faf6f0', bg2:'#f0e8d8', ink:'#3a2e1e', accent:'#b06a3b', accent2:'#d4956a', muted:'#9a8a6a', card:'#f0e4d0', border:'#e0d0b8', coverBg:'rgba(58,46,30,.6)', quote:'rgba(176,106,59,.06)' },
    coverTitleSize: '52px', titleSize: '17px', secSize: '14px', bodySize: '10.5px',
    dropcapSize: '58px', dropcapColor: '#b06a3b',
    barStyle: 'background:#b06a3b;color:white',
    placeBar: '#b06a3b', starColor: '#b06a3b'
  },
  'square': {
    fonts: 'Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500',
    titleFont: "'Montserrat',sans-serif",
    bodyFont: "'Inter',sans-serif",
    colors: { bg:'#fff', bg2:'#f5f0eb', ink:'#2a2a2a', accent:'#e07a5f', accent2:'#81b29a', muted:'#999', card:'#f5f0eb', border:'#e5ddd5', coverBg:'rgba(0,0,0,.5)', quote:'rgba(224,122,95,.05)' },
    coverTitleSize: '54px', titleSize: '18px', secSize: '15px', bodySize: '10px',
    dropcapSize: '56px', dropcapColor: '#e07a5f',
    barStyle: 'background:#e07a5f;color:white',
    placeBar: '#e07a5f', starColor: '#e07a5f'
  },
  'portrait-photobook': {
    fonts: 'Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Montserrat:wght@300;400;500;600;700;800&family=Dancing+Script:wght@400;600;700',
    titleFont: "'Montserrat',sans-serif",
    bodyFont: "'Montserrat',sans-serif",
    scriptFont: "'Dancing Script',cursive",
    serifFont: "'Playfair Display',serif",
    colors: { bg:'#fff', bg2:'#f5f5f5', ink:'#2a2a2a', accent:'#1a1a1a', accent2:'#555', muted:'#888', card:'#f0f0f0', border:'#ddd', coverBg:'rgba(0,0,0,.4)', quote:'rgba(0,0,0,.03)', dark:'#1a1a1a', darkAlt:'#252525' },
    coverTitleSize: '72px', titleSize: '28px', secSize: '18px', bodySize: '11px',
    dropcapSize: '64px', dropcapColor: '#1a1a1a',
    barStyle: 'background:#1a1a1a;color:white',
    placeBar: '#1a1a1a', starColor: '#c8a050'
  }
};

// === PHOTO BOOK TRAVEL — Dedicated template generator ===
function generatePhotoBookHtml(v, tpl, S) {
  const C = S.colors;
  const scriptFont = S.scriptFont || "'Dancing Script',cursive";
  const serifFont = S.serifFont || "'Playfair Display',serif";
  const quotes = QUOTES[v.country] || [{text:"Le voyage est la seule chose qu'on achète qui nous rend plus riche.",attr:"Anonyme"}];
  const gSel = (ch) => ch.photos ? ch.photos.filter(p => p.on) : [];

  let pages = '';

  // ===== PAGE 1: COVER — White frame, "PHOTO BOOK" header, Travel script =====
  pages += `
  <div class="pb-page pb-cover">
    <div class="pb-cover-inner">
      <div class="pb-cover-header">
        <span class="pb-arrow">›››› </span>
        <span class="pb-header-label">WORLDTRAVEL</span>
      </div>
      <div class="pb-cover-title">PHOTO BOOK</div>
      <div class="pb-cover-photo">
        <img src="${v.cover}" alt="">
        <div class="pb-cover-script">${v.name}</div>
      </div>
      <div class="pb-cover-continents">${v.country ? v.country.toUpperCase() : 'EUROPE'} | ${v.dates || ''}</div>
    </div>
  </div>`;

  // ===== CHAPTER PAGES =====
  v.chapters.forEach((ch, i) => {
    const photos = gSel(ch);
    const allPhotos = photos.map(p => p.url);
    const q = quotes[i % quotes.length];

    // --- PAGE: Chapter divider (dark bg, framed title) ---
    pages += `
    <div class="pb-page pb-divider">
      <div class="pb-divider-bg" ${allPhotos[0] ? `style="background-image:url(${allPhotos[0]})"` : ''}></div>
      <div class="pb-divider-overlay"></div>
      <div class="pb-divider-frame">
        <div class="pb-divider-title">${ch.title.toUpperCase()}</div>
      </div>
    </div>`;

    // --- PAGE: Photo grid + text (Must-See Landmarks style) ---
    if (allPhotos.length >= 3) {
      const gridPhotos = allPhotos.slice(0, Math.min(8, allPhotos.length));
      // Build adaptive grid rows
      let gridHtml = '';
      if (gridPhotos.length >= 8) {
        gridHtml = `
          <div class="pb-grid-row pb-grid-3">${gridPhotos.slice(0, 3).map(u => `<img src="${u}">`).join('')}</div>
          <div class="pb-grid-row pb-grid-2">${gridPhotos.slice(3, 5).map(u => `<img src="${u}">`).join('')}</div>
          <div class="pb-grid-row pb-grid-3">${gridPhotos.slice(5, 8).map(u => `<img src="${u}">`).join('')}</div>`;
      } else if (gridPhotos.length >= 6) {
        gridHtml = `
          <div class="pb-grid-row pb-grid-3">${gridPhotos.slice(0, 3).map(u => `<img src="${u}">`).join('')}</div>
          <div class="pb-grid-row pb-grid-3">${gridPhotos.slice(3, 6).map(u => `<img src="${u}">`).join('')}</div>`;
      } else if (gridPhotos.length >= 4) {
        gridHtml = `
          <div class="pb-grid-row pb-grid-2">${gridPhotos.slice(0, 2).map(u => `<img src="${u}">`).join('')}</div>
          <div class="pb-grid-row pb-grid-2">${gridPhotos.slice(2, 4).map(u => `<img src="${u}">`).join('')}</div>`;
      } else {
        gridHtml = `<div class="pb-grid-row pb-grid-3">${gridPhotos.map(u => `<img src="${u}">`).join('')}</div>`;
      }

      pages += `
      <div class="pb-page pb-grid-page">
        <div class="pb-grid-photos">${gridHtml}</div>
        <div class="pb-grid-text">
          <h2 class="pb-section-title">${ch.title.toUpperCase()}</h2>
          <p class="pb-body">${ch.text}</p>
          <div class="pb-pin">📍</div>
        </div>
      </div>`;
    }

    // --- PAGE: Full-bleed photo with white frame overlay ---
    if (allPhotos[0]) {
      pages += `
      <div class="pb-page pb-fullbleed">
        <img src="${allPhotos[0]}" class="pb-fullbleed-img">
        <div class="pb-fullbleed-frame"></div>
        <div class="pb-fullbleed-script">${ch.place.name}</div>
        <div class="pb-fullbleed-caption">
          <span class="pb-icon-loc">📍</span>
          ${ch.place.address || ch.place.name}<br>
          ${ch.day} · ${ch.place.duration}
        </div>
      </div>`;
    }

    // --- PAGE: Split layout (photo left + text right) — every other chapter ---
    if (i % 2 === 0 && allPhotos.length >= 2) {
      pages += `
      <div class="pb-page pb-split">
        <div class="pb-split-photo">
          <img src="${allPhotos[Math.min(1, allPhotos.length - 1)]}" alt="">
          <div class="pb-split-photo-frame"></div>
        </div>
        <div class="pb-split-text">
          <div class="pb-split-dots">
            <span class="pb-dot-big"></span>
            <span class="pb-dot-small"></span>
          </div>
          <h2 class="pb-split-title">${ch.title.toUpperCase()}</h2>
          <p class="pb-split-body">${ch.text}</p>
          ${ch.history ? `<div class="pb-history"><div class="pb-history-label">Histoire</div><p>${ch.history.summary}</p></div>` : ''}
        </div>
      </div>`;
    }

    // --- PAGE: Quote page (alternating) ---
    if (i % 3 === 1) {
      pages += `
      <div class="pb-page pb-quote-page">
        ${allPhotos[allPhotos.length - 1] ? `<img src="${allPhotos[allPhotos.length - 1]}" class="pb-quote-bg">` : ''}
        <div class="pb-quote-overlay"></div>
        <div class="pb-quote-content">
          <div class="pb-quote-mark">"</div>
          <p class="pb-quote-text">${q.text}</p>
          <span class="pb-quote-attr">— ${q.attr}</span>
        </div>
      </div>`;
    }
  });

  // ===== ROUTE / STATS PAGE =====
  pages += `
  <div class="pb-page pb-stats-page">
    <div class="pb-stats-left">
      <h2 class="pb-section-title">ITINÉRAIRE</h2>
      <div class="pb-route">
        <div class="pb-route-item"><div class="pb-route-dot pb-route-start"></div><span>Départ</span></div>
        ${v.chapters.map((ch, i) => `
          <div class="pb-route-line"></div>
          <div class="pb-route-item"><div class="pb-route-dot ${i === v.chapters.length - 1 ? 'pb-route-end' : ''}"></div><div><strong>${ch.place.name}</strong><br><small>${ch.day} · ${ch.place.duration}</small></div></div>
        `).join('')}
        <div class="pb-route-line"></div>
        <div class="pb-route-item"><div class="pb-route-dot pb-route-start"></div><span>Retour</span></div>
      </div>
    </div>
    <div class="pb-stats-right">
      <h2 class="pb-section-title">RÉSUMÉ</h2>
      <div class="pb-stats-grid">
        <div class="pb-stat"><span class="pb-stat-num">${v.stats.photos}</span><span class="pb-stat-label">Photos</span></div>
        <div class="pb-stat"><span class="pb-stat-num">${v.stats.lieux}</span><span class="pb-stat-label">Lieux</span></div>
        <div class="pb-stat"><span class="pb-stat-num">${v.stats.mots.toLocaleString()}</span><span class="pb-stat-label">Mots</span></div>
        <div class="pb-stat"><span class="pb-stat-num">${v.stats.temp}</span><span class="pb-stat-label">Temp.</span></div>
      </div>
      <div class="pb-companions">
        <h4>Voyageurs</h4>
        ${['raph', ...(v.companions || []).map(c => c.toLowerCase())].map(f => { const comp = COMPANIONS[f]; return comp ? `<div class="pb-comp"><div class="pb-comp-av ${comp.gender === 'F' ? 'f' : ''}">${comp.name[0]}</div><span>${comp.name} — ${comp.role}</span></div>` : ''; }).join('')}
      </div>
    </div>
  </div>`;

  // ===== BACK COVER =====
  pages += `
  <div class="pb-page pb-back">
    <div class="pb-back-content">
      <img src="${v.cover}" class="pb-back-photo" alt="">
      <div class="pb-back-line">
        <span class="pb-back-rule"></span>
        <div class="pb-back-icons">📘 ✈️ 🌍</div>
        <span class="pb-back-rule"></span>
      </div>
      <p class="pb-back-text">TravelBook — Votre livre de voyage personnel.<br>Généré le ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
  </div>`;

  // ===== FULL HTML =====
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>TravelBook — ${v.name}</title>
<link href="https://fonts.googleapis.com/css2?family=${S.fonts}&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  @page{size:A4 portrait;margin:0}
  body{font-family:${S.bodyFont};color:${C.ink};background:#666;-webkit-print-color-adjust:exact;print-color-adjust:exact}

  .pb-page{width:210mm;height:297mm;overflow:hidden;page-break-after:always;position:relative;margin:0 auto 4px;background:${C.bg}}

  /* ===== COVER ===== */
  .pb-cover{display:flex;align-items:center;justify-content:center}
  .pb-cover-inner{width:100%;height:100%;padding:18mm;display:flex;flex-direction:column;align-items:center}
  .pb-cover-header{display:flex;align-items:center;gap:6px;align-self:flex-end;margin-bottom:8px}
  .pb-arrow{font:700 12px ${S.bodyFont};color:${C.accent};letter-spacing:-2px}
  .pb-header-label{font:500 9px ${S.bodyFont};color:${C.muted};letter-spacing:3px;text-transform:uppercase}
  .pb-cover-title{font:800 42px ${S.bodyFont};color:${C.accent};letter-spacing:8px;text-transform:uppercase;margin:12px 0 20px;text-align:center}
  .pb-cover-photo{position:relative;width:100%;flex:1;overflow:hidden;border-radius:2px;box-shadow:0 8px 40px rgba(0,0,0,.15)}
  .pb-cover-photo img{width:100%;height:100%;object-fit:cover}
  .pb-cover-script{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);font:700 64px ${scriptFont};color:white;text-shadow:0 4px 30px rgba(0,0,0,.5);white-space:nowrap}
  .pb-cover-continents{font:500 9px ${S.bodyFont};color:${C.muted};letter-spacing:3px;text-transform:uppercase;margin-top:14px;text-align:center}

  /* ===== CHAPTER DIVIDER ===== */
  .pb-divider{display:flex;align-items:center;justify-content:center}
  .pb-divider-bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:brightness(.2) blur(2px)}
  .pb-divider-overlay{position:absolute;inset:0;background:rgba(20,20,20,.85)}
  .pb-divider-frame{position:relative;border:2px solid rgba(255,255,255,.6);padding:40px 55px;text-align:center}
  .pb-divider-title{font:700 32px ${S.bodyFont};color:white;letter-spacing:6px;text-transform:uppercase;line-height:1.4}

  /* ===== PHOTO GRID PAGE ===== */
  .pb-grid-page{display:flex;flex-direction:column;padding:10mm}
  .pb-grid-photos{flex:1;display:flex;flex-direction:column;gap:4px;margin-bottom:14px}
  .pb-grid-row{display:grid;gap:4px;flex:1}
  .pb-grid-3{grid-template-columns:1fr 1fr 1fr}
  .pb-grid-2{grid-template-columns:1fr 1fr}
  .pb-grid-row img{width:100%;height:100%;object-fit:cover;border-radius:2px}
  .pb-grid-text{padding:0 5mm}
  .pb-section-title{font:800 28px ${S.bodyFont};color:${C.accent};letter-spacing:2px;margin-bottom:10px}
  .pb-body{font:400 11px ${S.bodyFont};color:${C.ink};line-height:1.8}
  .pb-pin{font-size:18px;margin-top:10px;opacity:.6}

  /* ===== FULL BLEED WITH FRAME ===== */
  .pb-fullbleed{overflow:hidden}
  .pb-fullbleed-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .pb-fullbleed-frame{position:absolute;top:16mm;left:16mm;right:16mm;bottom:16mm;border:2px solid rgba(255,255,255,.7);pointer-events:none}
  .pb-fullbleed-script{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font:700 52px ${scriptFont};color:white;text-shadow:0 4px 25px rgba(0,0,0,.5);white-space:nowrap}
  .pb-fullbleed-caption{position:absolute;bottom:22mm;right:22mm;font:400 9px ${S.bodyFont};color:rgba(255,255,255,.8);text-align:right;line-height:1.6;background:rgba(0,0,0,.3);padding:8px 14px;border-radius:4px;backdrop-filter:blur(4px)}
  .pb-icon-loc{margin-right:4px}

  /* ===== SPLIT LAYOUT ===== */
  .pb-split{display:grid;grid-template-columns:1fr 1fr;height:297mm}
  .pb-split-photo{position:relative;overflow:hidden}
  .pb-split-photo img{width:100%;height:100%;object-fit:cover}
  .pb-split-photo-frame{position:absolute;inset:10mm;border:2px solid ${C.accent}}
  .pb-split-text{padding:16mm 12mm;display:flex;flex-direction:column;justify-content:center}
  .pb-split-dots{margin-bottom:16px}
  .pb-dot-big{display:inline-block;width:12px;height:12px;border-radius:50%;background:${C.accent};margin-right:4px}
  .pb-dot-small{display:inline-block;width:7px;height:7px;border-radius:50%;background:${C.muted}}
  .pb-split-title{font:700 26px ${serifFont};color:${C.accent};line-height:1.2;margin-bottom:16px}
  .pb-split-body{font:400 11px ${S.bodyFont};color:#444;line-height:1.85}
  .pb-history{margin-top:16px;padding:12px;background:${C.bg2};border-radius:6px}
  .pb-history .pb-history-label{font:600 9px ${S.bodyFont};color:${C.accent};text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
  .pb-history p{font:400 10px ${S.bodyFont};color:${C.muted};line-height:1.6;margin:0}

  /* ===== QUOTE PAGE ===== */
  .pb-quote-page{display:flex;align-items:center;justify-content:center}
  .pb-quote-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .pb-quote-overlay{position:absolute;inset:0;background:rgba(0,0,0,.6)}
  .pb-quote-content{position:relative;text-align:center;padding:30mm;max-width:80%}
  .pb-quote-mark{font:700 80px ${serifFont};color:rgba(255,255,255,.3);line-height:1}
  .pb-quote-text{font:italic 400 22px ${serifFont};color:white;line-height:1.6;margin:10px 0 16px}
  .pb-quote-attr{font:400 11px ${S.bodyFont};color:rgba(255,255,255,.6);letter-spacing:2px}

  /* ===== STATS PAGE ===== */
  .pb-stats-page{display:grid;grid-template-columns:1fr 1fr;height:297mm}
  .pb-stats-left{padding:16mm 10mm;border-right:1px solid ${C.border}}
  .pb-stats-right{padding:16mm 10mm}
  .pb-route{padding:12px 0}
  .pb-route-item{display:flex;align-items:center;gap:10px;padding:5px 0}
  .pb-route-item strong{font:600 12px ${S.bodyFont};color:${C.accent}}
  .pb-route-item small{font-size:9px;color:${C.muted}}
  .pb-route-dot{width:10px;height:10px;border-radius:50%;background:${C.accent};flex-shrink:0}
  .pb-route-start{box-shadow:0 0 0 3px rgba(26,26,26,.2)}
  .pb-route-end{background:${C.accent2}}
  .pb-route-line{width:2px;height:14px;background:${C.accent};margin-left:4px;opacity:.3}
  .pb-stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0}
  .pb-stat{text-align:center;padding:14px;background:${C.bg2};border-radius:8px}
  .pb-stat-num{font:800 28px ${S.bodyFont};color:${C.accent};display:block}
  .pb-stat-label{font:400 9px ${S.bodyFont};color:${C.muted};text-transform:uppercase;letter-spacing:1px}
  .pb-companions{margin-top:20px}
  .pb-companions h4{font:600 10px ${S.bodyFont};color:${C.accent};text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
  .pb-comp{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid ${C.border};font:400 11px ${S.bodyFont}}
  .pb-comp-av{width:30px;height:30px;border-radius:50%;background:${C.accent};color:white;display:flex;align-items:center;justify-content:center;font:700 12px ${S.bodyFont}}
  .pb-comp-av.f{background:${C.muted}}

  /* ===== BACK COVER ===== */
  .pb-back{background:${C.dark};display:flex;align-items:center;justify-content:center}
  .pb-back-content{text-align:center;padding:30mm}
  .pb-back-photo{width:160px;height:110px;object-fit:cover;border-radius:4px;box-shadow:0 8px 30px rgba(0,0,0,.4);margin-bottom:24px}
  .pb-back-line{display:flex;align-items:center;gap:14px;margin:14px 0}
  .pb-back-rule{flex:1;height:1px;background:rgba(255,255,255,.25)}
  .pb-back-icons{font-size:16px;letter-spacing:8px}
  .pb-back-text{font:400 11px ${S.bodyFont};color:rgba(255,255,255,.45);line-height:1.7;margin-top:18px}

  /* TOOLBAR */
  .toolbar{position:fixed;bottom:0;left:0;right:0;background:#1a1a1a;padding:14px 20px;display:flex;gap:10px;justify-content:center;align-items:center;z-index:100;box-shadow:0 -4px 20px rgba(0,0,0,.3)}
  .toolbar button{padding:12px 24px;border:none;border-radius:8px;font:600 14px ${S.bodyFont};cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px}
  .btn-print{background:${C.accent};color:white}
  .btn-print:hover{opacity:.85}
  .btn-pdf{background:#c8864a;color:white}
  .btn-pdf:hover{opacity:.85}
  .btn-flip{background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white}
  .btn-flip:hover{opacity:.85}

  /* ===== FLIPBOOK OVERLAY ===== */
  #flipbook-overlay{position:fixed;inset:0;background:#1a1a1a;display:none;flex-direction:column;align-items:center;justify-content:center;z-index:1000}
  #flipbook-overlay.active{display:flex}
  #flipbook-container{position:relative;overflow:hidden;transition:all .4s ease}
  .stf__parent{box-shadow:0 10px 60px rgba(0,0,0,.5);background:transparent!important;transition:clip-path .4s ease, transform .4s ease}
  #flipbook-container.cover-front .stf__parent{clip-path:inset(0 0 0 50%);transform:translateX(-25%)}
  #flipbook-container.cover-back .stf__parent{clip-path:inset(0 50% 0 0);transform:translateX(25%)}
  .fb-toolbar{position:fixed;bottom:0;left:0;right:0;background:rgba(20,20,20,.95);backdrop-filter:blur(10px);padding:12px 20px;display:flex;align-items:center;justify-content:center;gap:12px;z-index:1001;border-top:1px solid rgba(255,255,255,.1)}
  .fb-btn{padding:10px 20px;border:none;border-radius:8px;font:600 13px ${S.bodyFont};cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:6px}
  .fb-btn:hover{opacity:.85;transform:translateY(-1px)}
  .fb-nav{background:rgba(255,255,255,.1);color:white;font-size:20px;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:0}
  .fb-nav:hover{background:rgba(255,255,255,.2)}
  .fb-close{position:fixed;top:16px;right:16px;background:rgba(255,255,255,.1);color:white;border:none;width:40px;height:40px;border-radius:50%;font-size:20px;cursor:pointer;z-index:1002;display:flex;align-items:center;justify-content:center}
  .fb-close:hover{background:rgba(255,255,255,.2)}
  .fb-title{position:fixed;top:16px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,.6);font:500 14px ${S.bodyFont};letter-spacing:2px;z-index:1002}
  .fb-page-info{color:rgba(255,255,255,.5);font:400 12px ${S.bodyFont};min-width:80px;text-align:center}
  .fb-loading{color:rgba(255,255,255,.4);font:400 14px ${S.bodyFont};text-align:center}

  @media print{.toolbar,.fb-toolbar,#flipbook-overlay,.fb-close,.fb-title{display:none!important}body{background:white}.pb-page{margin:0;box-shadow:none;page-break-after:always}}
</style></head><body>

${pages}

<!-- Normal toolbar -->
<div class="toolbar" id="normal-toolbar">
  <button class="btn-flip" onclick="openFlipbook()">&#128214; Feuilleter</button>
  <button class="btn-print" onclick="window.print()">&#128424; Imprimer</button>
  <button class="btn-pdf" onclick="savePdf()">&#128196; Convertir en PDF</button>
</div>

<!-- Flipbook overlay (hidden by default) -->
<div id="flipbook-overlay">
  <div class="fb-title">TravelBook — ${v.name}</div>
  <button class="fb-close" onclick="closeFlipbook()" title="Fermer">&times;</button>
  <div id="flipbook-container"></div>
  <div class="fb-loading" id="fb-loading">Chargement du livre...</div>
  <div class="fb-toolbar" id="fb-toolbar" style="display:none">
    <button class="fb-btn fb-nav" onclick="flipbook.flipPrev()">&#8249;</button>
    <span class="fb-page-info" id="fb-page-info">— / —</span>
    <button class="fb-btn fb-nav" onclick="flipbook.flipNext()">&#8250;</button>
    <span style="width:1px;height:28px;background:rgba(255,255,255,.15)"></span>
    <button class="fb-btn" style="background:rgba(255,255,255,.1);color:white" onclick="toggleFullscreen()">&#x26F6; Plein écran</button>
    <button class="fb-btn" style="background:white;color:#1a1a1a" onclick="closeFlipbook();window.print()">&#128424; Imprimer</button>
    <button class="fb-btn" style="background:#c8864a;color:white" onclick="savePdfFromFlip()">&#128196; PDF</button>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
<script>
let flipbook = null;
const pageImages = [];
let flipbookReady = false;

// Normal PDF save (from scroll view)
async function savePdf() {
  const btn = document.querySelector('.btn-pdf');
  btn.textContent = 'Conversion...'; btn.disabled = true;
  document.getElementById('normal-toolbar').style.display = 'none';
  const allPages = document.querySelectorAll('.pb-page');
  const {jsPDF} = window.jspdf;
  const pdf = new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const W = pdf.internal.pageSize.getWidth(), H = pdf.internal.pageSize.getHeight();
  for (let i = 0; i < allPages.length; i++) {
    if (i > 0) pdf.addPage();
    try {
      const c = await html2canvas(allPages[i], {scale:2, useCORS:true, allowTaint:true, width:allPages[i].offsetWidth, height:allPages[i].offsetHeight});
      pdf.addImage(c.toDataURL('image/jpeg',.85), 'JPEG', 0, 0, W, H);
    } catch(e) { console.warn('Page '+i+' skip:', e); }
  }
  pdf.save('TravelBook-${v.name.replace(/[^a-zA-Z0-9]/g, '')}.pdf');
  document.getElementById('normal-toolbar').style.display = 'flex';
  btn.textContent = 'Convertir en PDF'; btn.disabled = false;
}

// PDF save from flipbook (uses cached images)
async function savePdfFromFlip() {
  if (!pageImages.length) return;
  const {jsPDF} = window.jspdf;
  const pdf = new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
  const W = pdf.internal.pageSize.getWidth(), H = pdf.internal.pageSize.getHeight();
  for (let i = 0; i < pageImages.length; i++) {
    if (i > 0) pdf.addPage();
    pdf.addImage(pageImages[i], 'JPEG', 0, 0, W, H);
  }
  pdf.save('TravelBook-${v.name.replace(/[^a-zA-Z0-9]/g, '')}.pdf');
}

// Open flipbook overlay
async function openFlipbook() {
  const overlay = document.getElementById('flipbook-overlay');
  overlay.classList.add('active');
  document.getElementById('normal-toolbar').style.display = 'none';

  if (flipbookReady) {
    document.getElementById('fb-toolbar').style.display = 'flex';
    return;
  }

  const sourcePages = document.querySelectorAll('.pb-page');
  const container = document.getElementById('flipbook-container');
  const loading = document.getElementById('fb-loading');

  for (let i = 0; i < sourcePages.length; i++) {
    loading.textContent = 'Rendu page ' + (i + 1) + '/' + sourcePages.length + '...';
    try {
      const canvas = await html2canvas(sourcePages[i], {
        scale: 1.5, useCORS: true, allowTaint: true,
        width: sourcePages[i].offsetWidth, height: sourcePages[i].offsetHeight
      });
      pageImages.push(canvas.toDataURL('image/jpeg', 0.88));
    } catch(e) {
      const c = document.createElement('canvas'); c.width = 595; c.height = 842;
      const ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0,0,595,842);
      pageImages.push(c.toDataURL('image/jpeg', 0.88));
    }
  }

  loading.style.display = 'none';

  const viewH = window.innerHeight - 100;
  const pageH = viewH;
  const pageW = Math.round(pageH * 0.707);

  flipbook = new St.PageFlip(container, {
    width: pageW, height: pageH, size: 'fixed',
    minWidth: 300, maxWidth: 800, minHeight: 420, maxHeight: 1130,
    showCover: true, maxShadowOpacity: 0.5, mobileScrollSupport: false,
    flippingTime: 800, useMouseEvents: true, swipeDistance: 30, drawShadow: true, autoSize: true
  });

  flipbook.loadFromImages(pageImages);

  // Start in front cover mode (centered single page)
  container.classList.add('cover-front');

  flipbook.on('flip', (e) => {
    const pg = e.data;
    const total = flipbook.getPageCount();
    document.getElementById('fb-page-info').textContent = (pg + 1) + ' / ' + total;
    container.classList.remove('cover-front', 'cover-back');
    if (pg === 0) {
      container.classList.add('cover-front');
    } else if (pg >= total - 1) {
      container.classList.add('cover-back');
    }
  });
  document.getElementById('fb-page-info').textContent = '1 / ' + flipbook.getPageCount();
  document.getElementById('fb-toolbar').style.display = 'flex';
  flipbookReady = true;
}

function closeFlipbook() {
  document.getElementById('flipbook-overlay').classList.remove('active');
  document.getElementById('normal-toolbar').style.display = 'flex';
}

function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
}

document.addEventListener('keydown', (e) => {
  if (!document.getElementById('flipbook-overlay').classList.contains('active')) return;
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); flipbook.flipNext(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); flipbook.flipPrev(); }
  if (e.key === 'Escape') closeFlipbook();
  if (e.key === 'f' || e.key === 'F') toggleFullscreen();
});
<\/script>
</body></html>`;
}

function downloadPdf() {
  const v = VOYAGES.find(x => x.id === curVoyage);
  if (!v) { showToast('Aucun voyage sélectionné'); return; }
  const tpl = PDF_TEMPLATES.find(t => t.id === selectedTemplate) || PDF_TEMPLATES[0];
  const isLand = (tpl.orientation || 'landscape') === 'landscape';
  const quotes = QUOTES[v.country] || [{text:"Le voyage est la seule chose qu'on achète qui nous rend plus riche.",attr:"Anonyme"}];
  const gSel = (ch) => ch.photos ? ch.photos.filter(p => p.on) : [];
  const gFaces = (ch) => ch.faces ? ch.faces.map(f => COMPANIONS[f]?.name || f).join(', ') : '';
  const S = TEMPLATE_STYLES[tpl.id] || TEMPLATE_STYLES['landscape-magazine'];
  const C = S.colors;
  const isDark = S.dark || false;

  // Photo Book Travel uses its own dedicated generator
  if (tpl.id === 'portrait-photobook') {
    const html = generatePhotoBookHtml(v, tpl, S);
    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); }
    else { showToast('Autorisez les pop-ups'); }
    return;
  }

  const pageSize = isLand ? 'A4 landscape' : (Array.isArray(tpl.format) ? '210mm 210mm' : 'A5 portrait');
  const pw = isLand ? '297mm' : (Array.isArray(tpl.format) ? '210mm' : '148mm');
  const ph = isLand ? '210mm' : '210mm';

  // Build chapters — each chapter = 1 text spread + 1 photo spread
  let chaptersHtml = '';
  v.chapters.forEach((ch, i) => {
    const photos = gSel(ch);
    const hero = photos.length ? photos[0].url : '';
    const allPhotos = photos.map(p => p.url);
    const q = quotes[i % quotes.length];
    const companions = gFaces(ch);
    const layout = i % 3;

    const facesHtml = companions ? `<div class="faces-bar">Visages détectés : ${companions}</div>` : '';
    const placeHtml = `<div class="place-card"><h4>${ch.place.name}</h4><p>${ch.place.address} · ${ch.place.duration}</p><span class="stars">${'★'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</span></div>`;
    const historyHtml = ch.history ? `<div class="history-block"><div class="history-head">Histoire du lieu</div>${ch.history.thumbnail ? `<img src="${ch.history.thumbnail}" class="history-img">` : ''}<p class="history-text">${ch.history.summary}</p></div>` : '';
    const quoteHtml = `<div class="quote"><p>"${q.text}"</p><span>— ${q.attr}</span></div>`;

    // === SPREAD 1: Full-page hero photo ===
    if (hero) {
      chaptersHtml += `
      <div class="page photo-page">
        <img src="${hero}" class="full-bg">
        <div class="photo-page-ov">
          <div class="photo-page-top"><span class="photo-page-day">${ch.day.toUpperCase()}</span></div>
          <div class="photo-page-bot">
            <h2 class="photo-page-title">${ch.title}</h2>
            <p class="photo-page-place">${ch.place.name} · ${ch.place.duration}</p>
          </div>
        </div>
      </div>`;
    }

    // === SPREAD 2: Text + photos side by side ===
    if (layout === 0) {
      chaptersHtml += `
      <div class="page spread">
        <div class="half left">
          <h2 class="ch-title">${ch.title.toUpperCase()}</h2>
          <div class="text-wrap">
            ${allPhotos[1] ? `<img src="${allPhotos[1]}" class="float-left">` : ''}
            <p class="dropcap">${ch.text}</p>
          </div>
          ${allPhotos[2] ? `<img src="${allPhotos[2]}" class="img-bottom">` : ''}
          ${facesHtml}
        </div>
        <div class="half right side-bg">
          <h2 class="sec-title">HIGHLIGHTS</h2>
          <div class="sec-bar">${ch.day.toUpperCase()}</div>
          ${allPhotos[3] ? `<img src="${allPhotos[3]}" class="hero-img">` : ''}
          ${allPhotos.length >= 6 ? `<div class="grid3">${allPhotos.slice(4, 7).map(u => `<img src="${u}">`).join('')}</div>` : (allPhotos.length >= 5 ? `<div class="grid2">${allPhotos.slice(4, 6).map(u => `<img src="${u}">`).join('')}</div>` : '')}
          ${placeHtml}${historyHtml}${quoteHtml}
        </div>
      </div>`;
    } else if (layout === 1) {
      chaptersHtml += `
      <div class="page spread">
        <div class="half left photo-full">
          ${allPhotos[1] ? `<img src="${allPhotos[1]}" class="cover-img">` : `<div class="cover-img" style="background:${C.accent}"></div>`}
          <div class="photo-badge">${ch.place.name}</div>
          ${allPhotos[2] ? `<img src="${allPhotos[2]}" class="polaroid">` : ''}
        </div>
        <div class="half right side-bg">
          <h2 class="ch-title">${ch.title.toUpperCase()}</h2>
          <div class="bullet-item"><span class="bdot"></span><h4>${ch.place.name}</h4></div>
          <p>${ch.text}</p>
          ${quoteHtml}${placeHtml}${historyHtml}${facesHtml}
        </div>
      </div>`;
    } else {
      chaptersHtml += `
      <div class="page spread">
        <div class="half left">
          ${allPhotos[1] ? `<img src="${allPhotos[1]}" class="top-photo">` : ''}
          <h2 class="ch-title">${ch.title.toUpperCase()}</h2>
          <div class="subsec"><span class="chev">›</span><h4>${ch.place.name}</h4></div>
          <p>${splitAtSentence(ch.text, 0)}</p>
          ${allPhotos[2] ? `<img src="${allPhotos[2]}" class="img-bottom">` : ''}
          <div class="subsec"><span class="chev">›</span><h4>Impressions</h4></div>
          <p>${splitAtSentence(ch.text, 1)}</p>
        </div>
        <div class="half right side-bg">
          <h2 class="sec-title">INFOS & PHOTOS</h2>
          ${allPhotos.length >= 4 ? `<div class="photo-stack"><img src="${allPhotos[3]}" class="stack-main"><div class="stack-side">${allPhotos.slice(4, 6).map(u => `<img src="${u}">`).join('')}</div></div>` : (allPhotos[3] ? `<img src="${allPhotos[3]}" class="hero-img">` : '')}
          ${placeHtml}${historyHtml}${quoteHtml}${facesHtml}
        </div>
      </div>`;
    }

    // === SPREAD 3: Photo gallery page (if enough photos) ===
    if (allPhotos.length >= 4) {
      const galleryPhotos = allPhotos.slice(1); // all except hero
      const gpLayout = i % 4; // vary gallery layouts

      if (gpLayout === 0 && galleryPhotos.length >= 4) {
        // Collage: 1 big left + 3 small right
        chaptersHtml += `
        <div class="page spread gallery-page">
          <div class="gal-big"><img src="${galleryPhotos[0]}"><div class="gal-caption">${ch.place.name}</div></div>
          <div class="gal-side">
            ${galleryPhotos.slice(1, 4).map(u => `<div class="gal-side-img"><img src="${u}"></div>`).join('')}
          </div>
        </div>`;
      } else if (gpLayout === 1 && galleryPhotos.length >= 6) {
        // Grid 2x3
        chaptersHtml += `
        <div class="page gallery-page">
          <div class="gal-grid6">
            ${galleryPhotos.slice(0, 6).map(u => `<img src="${u}">`).join('')}
          </div>
          <div class="gal-bar">${ch.day} · ${ch.place.name} · ${galleryPhotos.length} photos</div>
        </div>`;
      } else if (gpLayout === 2 && galleryPhotos.length >= 3) {
        // Cinema strip: 3 wide horizontal
        chaptersHtml += `
        <div class="page gallery-page gal-cinema">
          <div class="gal-cinema-strip">
            ${galleryPhotos.slice(0, 3).map(u => `<div class="gal-cinema-frame"><img src="${u}"></div>`).join('')}
          </div>
          ${galleryPhotos.length >= 6 ? `<div class="gal-cinema-strip">${galleryPhotos.slice(3, 6).map(u => `<div class="gal-cinema-frame"><img src="${u}"></div>`).join('')}</div>` : ''}
          <div class="gal-bar">${ch.place.name} — ${ch.day}</div>
        </div>`;
      } else if (galleryPhotos.length >= 5) {
        // Mosaic: 2 big top + 3 small bottom
        chaptersHtml += `
        <div class="page gallery-page">
          <div class="gal-mosaic-top">
            <img src="${galleryPhotos[0]}"><img src="${galleryPhotos[1]}">
          </div>
          <div class="gal-mosaic-bot">
            ${galleryPhotos.slice(2, 5).map(u => `<img src="${u}">`).join('')}
          </div>
          <div class="gal-bar">${ch.day} · ${ch.place.name}</div>
        </div>`;
      } else {
        // Simple 2x2
        chaptersHtml += `
        <div class="page gallery-page">
          <div class="gal-grid4">
            ${galleryPhotos.slice(0, 4).map(u => `<img src="${u}">`).join('')}
          </div>
          <div class="gal-bar">${ch.day} · ${ch.place.name}</div>
        </div>`;
      }
    }
  });

  // Route page
  const routeHtml = `
  <div class="page spread">
    <div class="half left">
      <h2 class="ch-title">ITINÉRAIRE</h2>
      <div class="route">
        <div class="rp"><div class="rdot start"></div><span>Toulouse (départ)</span></div>
        ${v.chapters.map((ch, i) => `<div class="rline"></div><div class="rp"><div class="rdot ${i === v.chapters.length - 1 ? 'last' : ''}"></div><div><strong>${ch.place.name}</strong><br><small>${ch.day} · ${ch.place.duration}</small></div></div>`).join('')}
        <div class="rline"></div>
        <div class="rp"><div class="rdot start"></div><span>Retour Toulouse</span></div>
      </div>
    </div>
    <div class="half right side-bg">
      <h2 class="sec-title">RÉSUMÉ DU VOYAGE</h2>
      <div class="stats-grid">
        <div class="stat"><span class="stat-n">${v.stats.photos}</span><span>Photos</span></div>
        <div class="stat"><span class="stat-n">${v.stats.lieux}</span><span>Lieux</span></div>
        <div class="stat"><span class="stat-n">${v.stats.mots.toLocaleString()}</span><span>Mots</span></div>
        <div class="stat"><span class="stat-n">${v.stats.temp}</span><span>Température</span></div>
      </div>
      <div class="comp-sec"><h4>Voyageurs</h4>
        ${['raph', ...(v.companions || []).map(c => c.toLowerCase())].map(f => { const comp = COMPANIONS[f]; return comp ? `<div class="comp"><div class="cav ${comp.gender === 'F' ? 'f' : ''}">${comp.name[0]}</div><span>${comp.name} — ${comp.role}</span></div>` : ''; }).join('')}
      </div>
    </div>
  </div>`;

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>TravelBook — ${v.name}</title>
<link href="https://fonts.googleapis.com/css2?family=${S.fonts}&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  @page{size:${pageSize};margin:0}
  body{font-family:${S.bodyFont};color:${C.ink};background:#888;-webkit-print-color-adjust:exact;print-color-adjust:exact}

  .page{width:${pw};height:${ph};background:${C.bg};overflow:hidden;page-break-after:always;position:relative;margin:0 auto 4px}
  .spread{display:flex}
  .half{width:50%;padding:22px;overflow:hidden;font-size:${S.bodySize};line-height:1.75}
  .half p{color:${isDark?C.muted:C.ink};margin-bottom:8px;opacity:${isDark?'.8':'1'}}
  .side-bg{background:${C.bg2}}

  /* COVER */
  .page.cover{display:flex;align-items:center;justify-content:center}
  .page.cover>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .cover-ov{position:absolute;inset:0;background:${C.coverBg};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px}
  .cover-title{font:900 ${S.coverTitleSize} ${S.titleFont};color:${isDark?C.accent:'white'};text-shadow:0 4px 30px rgba(0,0,0,.4);letter-spacing:4px;line-height:.92}
  .cover-sub{font:italic 400 20px ${S.titleFont};color:rgba(255,255,255,.85);margin-top:10px}
  .cover-info{font:400 11px ${S.bodyFont};color:rgba(255,255,255,.6);letter-spacing:3px;text-transform:uppercase;margin-top:6px}
  .cover-brand{position:absolute;bottom:14px;font:400 9px ${S.bodyFont};color:rgba(255,255,255,.3);letter-spacing:5px;text-transform:uppercase}

  /* TITLES */
  .ch-title{font:900 ${S.titleSize} ${S.titleFont};color:${C.accent};letter-spacing:1px;margin-bottom:10px;line-height:1.2}
  .sec-title{font:900 ${S.secSize} ${S.titleFont};color:${C.accent};margin-bottom:4px;letter-spacing:1px}
  .sec-bar{${S.barStyle};padding:3px 12px;font-size:9px;letter-spacing:6px;display:inline-block;border-radius:2px;margin-bottom:10px}

  /* DROPCAP */
  .dropcap::first-letter{font:900 ${S.dropcapSize}/0.65 ${S.titleFont};float:left;color:${S.dropcapColor};margin:6px 10px 0 -2px;padding-top:8px}

  /* PHOTOS */
  .float-left{float:left;width:42%;margin:0 12px 8px 0;border-radius:4px;box-shadow:3px 3px 12px rgba(0,0,0,.15)}
  .hero-img{width:100%;max-height:40%;object-fit:cover;border-radius:5px;margin-bottom:8px;box-shadow:0 4px 16px rgba(0,0,0,.1)}
  .grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-bottom:10px}
  .grid3 img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:3px}
  .top-photo{width:100%;height:${isLand ? '150px' : '120px'};object-fit:cover;border-radius:6px;margin-bottom:10px;box-shadow:0 4px 14px rgba(0,0,0,.1)}
  .photo-full{padding:0!important;position:relative}
  .cover-img{width:100%;height:100%;object-fit:cover;display:block}
  .photo-badge{position:absolute;bottom:12px;left:12px;background:rgba(0,0,0,.55);color:#fff;padding:5px 14px;border-radius:5px;font:500 11px ${S.bodyFont};backdrop-filter:blur(4px)}
  .polaroid{position:absolute;bottom:35px;right:14px;width:38%;border:6px solid white;box-shadow:4px 4px 16px rgba(0,0,0,.3);transform:rotate(3deg)}
  .photo-stack{display:grid;grid-template-columns:2fr 1fr;gap:5px;margin-bottom:10px;height:${isLand ? '150px' : '110px'}}
  .stack-main{width:100%;height:100%;object-fit:cover;border-radius:5px;grid-row:1/3}
  .stack-side{display:flex;flex-direction:column;gap:5px}
  .stack-side img{width:100%;flex:1;object-fit:cover;border-radius:4px}

  /* PLACE CARD */
  .place-card{background:${C.card};border-left:3px solid ${S.placeBar};padding:8px 12px;border-radius:0 6px 6px 0;margin-bottom:8px}
  .place-card h4{font:700 11px ${S.titleFont};color:${C.accent};margin-bottom:1px}
  .place-card p{font-size:9px;color:${C.muted};margin:0!important}
  .stars{color:${S.starColor};font-size:10px}

  /* QUOTE */
  .quote{border-left:3px solid ${C.accent};padding:8px 12px;margin:10px 0;background:${C.quote};border-radius:0 6px 6px 0}
  .quote p{font:italic 400 ${S.bodySize} ${S.titleFont}!important;color:${C.accent};line-height:1.55;margin:0!important}
  .quote span{font:400 9px ${S.bodyFont};color:${C.muted};display:block;margin-top:3px;text-align:right}

  /* BULLETS */
  .bullet-item{display:flex;align-items:center;gap:7px;margin-bottom:5px}
  .bdot{width:7px;height:7px;border-radius:50%;background:${C.accent};flex-shrink:0}
  .bullet-item h4{font-size:10px;color:${C.accent};text-transform:uppercase;letter-spacing:1px}
  .subsec{display:flex;align-items:center;gap:5px;margin:8px 0 3px}
  .chev{font-size:15px;color:${C.accent};font-weight:bold}
  .subsec h4{font-size:10px;color:${C.accent};text-transform:uppercase;letter-spacing:1px}
  .faces-bar{font-size:9px;color:${C.muted};padding:5px 0;border-top:1px solid ${C.border};margin-top:6px}

  /* History block */
  .history-block{background:${C.card};border:1px solid ${C.border};border-radius:6px;padding:10px 12px;margin:8px 0}
  .history-head{font:600 9px ${S.bodyFont};color:${C.accent};text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
  .history-img{float:right;width:70px;height:55px;object-fit:cover;border-radius:5px;margin:0 0 6px 10px}
  .history-text{font:400 9px ${S.bodyFont};line-height:1.55;color:${C.muted};margin:0}

  /* ROUTE */
  .route{padding:6px 0}
  .rp{display:flex;align-items:center;gap:10px;padding:4px 0}
  .rp strong{font-size:11px;color:${C.accent}}
  .rp small{font-size:9px;color:${C.muted}}
  .rdot{width:10px;height:10px;border-radius:50%;background:${C.accent};flex-shrink:0}
  .rdot.start{box-shadow:0 0 0 3px ${C.accent}33}
  .rdot.last{background:${C.accent2};box-shadow:0 0 0 3px ${C.accent2}33}
  .rline{width:2px;height:12px;background:linear-gradient(${C.accent},${C.muted});margin-left:4px;border-radius:1px}

  /* STATS */
  .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}
  .stat{text-align:center;padding:12px;background:${isDark?C.card:C.bg};border-radius:8px;border:1px solid ${C.border}}
  .stat-n{font:900 24px ${S.titleFont};color:${C.accent};display:block}
  .stat span:last-child{font-size:9px;color:${C.muted};text-transform:uppercase;letter-spacing:1px}
  .comp-sec{margin-top:16px}
  .comp-sec h4{font-size:9px;color:${C.accent};text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
  .comp{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid ${C.border};font-size:11px}
  .cav{width:28px;height:28px;border-radius:50%;background:${C.accent};color:${isDark?C.bg:'white'};display:flex;align-items:center;justify-content:center;font:700 11px ${S.bodyFont}}
  .cav.f{background:${C.muted}}

  /* LAST */
  .page.last-page{display:flex;align-items:center;justify-content:center;flex-direction:column;background:${isDark?C.bg:'#1a1410'};text-align:center}
  .last-page h1{font:900 32px ${S.titleFont};color:${C.accent};margin-bottom:6px}
  .last-page p{font:400 11px ${S.bodyFont};color:${isDark?C.muted:'#6a6050'}}
  .last-line{width:50px;height:2px;background:${C.accent};margin:12px 0}

  ${S.handFont ? `.ch-title{font-family:${S.handFont};letter-spacing:0;font-size:${isLand?'28px':'22px'}}` : ''}

  /* FULL PAGE PHOTO */
  .photo-page{position:relative}
  .full-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .photo-page-ov{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.3) 0%,transparent 30%,transparent 60%,rgba(0,0,0,.6) 100%);display:flex;flex-direction:column;justify-content:space-between;padding:22px 28px}
  .photo-page-top{display:flex;align-items:center}
  .photo-page-day{font:600 10px ${S.bodyFont};color:${C.accent};background:rgba(0,0,0,.4);padding:4px 14px;border-radius:4px;letter-spacing:4px;backdrop-filter:blur(4px)}
  .photo-page-bot{margin-top:auto}
  .photo-page-title{font:900 ${isLand?'36px':'26px'} ${S.titleFont};color:white;text-shadow:0 3px 20px rgba(0,0,0,.4);line-height:1.1;margin-bottom:6px}
  .photo-page-place{font:400 12px ${S.bodyFont};color:rgba(255,255,255,.7)}

  /* EXTRA IN-TEXT PHOTOS */
  .img-bottom{width:100%;height:${isLand?'120px':'90px'};object-fit:cover;border-radius:5px;margin:8px 0;box-shadow:0 3px 12px rgba(0,0,0,.1)}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px}
  .grid2 img{width:100%;height:${isLand?'100px':'80px'};object-fit:cover;border-radius:4px}

  /* GALLERY PAGES */
  .gallery-page{overflow:hidden;position:relative}

  /* Collage: big left + 3 small right */
  .gal-big{width:55%;height:100%;position:absolute;left:0;top:0}
  .gal-big img{width:100%;height:100%;object-fit:cover}
  .gal-big .gal-caption{position:absolute;bottom:14px;left:14px;background:rgba(0,0,0,.5);color:white;padding:5px 14px;border-radius:5px;font:500 11px ${S.bodyFont};backdrop-filter:blur(4px)}
  .gal-side{position:absolute;right:0;top:0;width:45%;height:100%;display:flex;flex-direction:column}
  .gal-side-img{flex:1;overflow:hidden}
  .gal-side-img img{width:100%;height:100%;object-fit:cover}

  /* Grid 2x3 */
  .gal-grid6{display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr;height:calc(100% - 30px);gap:3px;padding:3px}
  .gal-grid6 img{width:100%;height:100%;object-fit:cover}

  /* Grid 2x2 */
  .gal-grid4{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;height:calc(100% - 30px);gap:3px;padding:3px}
  .gal-grid4 img{width:100%;height:100%;object-fit:cover}

  /* Cinema strip */
  .gal-cinema{display:flex;flex-direction:column;padding:0}
  .gal-cinema-strip{display:flex;flex:1;gap:3px}
  .gal-cinema-frame{flex:1;overflow:hidden}
  .gal-cinema-frame img{width:100%;height:100%;object-fit:cover}

  /* Mosaic */
  .gal-mosaic-top{display:grid;grid-template-columns:1fr 1fr;gap:3px;height:55%;padding:3px 3px 0}
  .gal-mosaic-top img{width:100%;height:100%;object-fit:cover;border-radius:0}
  .gal-mosaic-bot{display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px;height:calc(45% - 30px);padding:3px}
  .gal-mosaic-bot img{width:100%;height:100%;object-fit:cover}

  /* Gallery caption bar */
  .gal-bar{height:27px;display:flex;align-items:center;justify-content:center;font:500 10px ${S.bodyFont};color:${C.muted};letter-spacing:1px;text-transform:uppercase;background:${C.bg2}}

  .toolbar{position:fixed;bottom:0;left:0;right:0;background:#1a1410;padding:14px 20px;display:flex;gap:10px;justify-content:center;z-index:100;box-shadow:0 -4px 20px rgba(0,0,0,.3)}
  .toolbar button{padding:12px 24px;border:none;border-radius:8px;font:600 14px ${S.bodyFont};cursor:pointer;transition:all .2s}
  .btn-print{background:${C.accent};color:${isDark?C.bg:'white'}}
  .btn-print:hover{opacity:.85}
  .btn-pdf{background:${isDark?C.accent2:'#c8864a'};color:${isDark?C.bg:'white'}}
  .btn-pdf:hover{opacity:.85}
  @media print{.toolbar{display:none!important}body{background:white}.page{margin:0;box-shadow:none}}
</style></head><body>

<div class="page cover">
  <img src="${v.cover}" alt="">
  <div class="cover-ov">
    <div class="cover-title">${v.name.toUpperCase()}</div>
    <div class="cover-sub">${v.country} — ${v.days} jours</div>
    <div class="cover-info">${v.dates}${v.companions?.length ? ' · Avec ' + v.companions.join(', ') : ''}</div>
  </div>
  <div class="cover-brand">TravelBook</div>
</div>

${chaptersHtml}
${routeHtml}

<div class="page last-page">
  <div class="last-line"></div>
  <h1>TravelBook</h1>
  <p>Votre Livre de Voyage</p>
  <div class="last-line"></div>
  <p style="margin-top:12px;font-size:10px">Généré le ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
</div>

<div class="toolbar">
  <button class="btn-print" onclick="window.print()">Imprimer</button>
  <button class="btn-pdf" onclick="savePdf()">Convertir en PDF</button>
</div>

<script>
async function savePdf() {
  const btn = document.querySelector('.btn-pdf');
  btn.textContent = 'Conversion...'; btn.disabled = true;
  document.querySelector('.toolbar').style.display = 'none';
  const pages = document.querySelectorAll('.page');
  const {jsPDF} = window.jspdf;
  const pdf = new jsPDF({orientation:'${isLand ? 'landscape' : 'portrait'}',unit:'mm',format:${Array.isArray(tpl.format) ? JSON.stringify(tpl.format) : "'"+tpl.format+"'"}});
  const W = pdf.internal.pageSize.getWidth(), H = pdf.internal.pageSize.getHeight();
  for (let i = 0; i < pages.length; i++) {
    if (i > 0) pdf.addPage();
    try {
      const c = await html2canvas(pages[i], {scale:2, useCORS:true, allowTaint:true, width:pages[i].offsetWidth, height:pages[i].offsetHeight});
      pdf.addImage(c.toDataURL('image/jpeg',.85), 'JPEG', 0, 0, W, H);
    } catch(e) { console.warn('Page '+i+' skip:', e); }
  }
  pdf.save('TravelBook-${v.name.replace(/[^a-zA-Z0-9]/g, '')}.pdf');
  document.querySelector('.toolbar').style.display = 'flex';
  btn.textContent = 'Convertir en PDF'; btn.disabled = false;
}
<\/script>
</body></html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
  else { showToast('Autorisez les pop-ups'); }
}
