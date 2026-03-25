// TravelBook — 6 Unique Magazine Templates
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
  }
};

function downloadPdf() {
  const v = VOYAGES.find(x => x.id === curVoyage);
  if (!v) { showToast('Aucun voyage selectionne'); return; }
  const tpl = PDF_TEMPLATES.find(t => t.id === selectedTemplate) || PDF_TEMPLATES[0];
  const isLand = (tpl.orientation || 'landscape') === 'landscape';
  const quotes = QUOTES[v.country] || [{text:"Le voyage est la seule chose qu'on achete qui nous rend plus riche.",attr:"Anonyme"}];
  const gSel = (ch) => ch.photos ? ch.photos.filter(p => p.on) : [];
  const gFaces = (ch) => ch.faces ? ch.faces.map(f => COMPANIONS[f]?.name || f).join(', ') : '';
  const S = TEMPLATE_STYLES[tpl.id] || TEMPLATE_STYLES['landscape-magazine'];
  const C = S.colors;
  const isDark = S.dark || false;

  const pageSize = isLand ? 'A4 landscape' : (Array.isArray(tpl.format) ? '210mm 210mm' : 'A5 portrait');
  const pw = isLand ? '297mm' : (Array.isArray(tpl.format) ? '210mm' : '148mm');
  const ph = isLand ? '210mm' : '210mm';

  // Build chapters
  let chaptersHtml = '';
  v.chapters.forEach((ch, i) => {
    const photos = gSel(ch);
    const hero = photos.length ? photos[0].url : '';
    const extra = photos.slice(1, 7);
    const q = quotes[i % quotes.length];
    const companions = gFaces(ch);
    const layout = i % 3;

    const facesHtml = companions ? `<div class="faces-bar">Visages detectes : ${companions}</div>` : '';
    const placeHtml = `<div class="place-card"><h4>${ch.place.name}</h4><p>${ch.place.address} · ${ch.place.duration}</p><span class="stars">${'★'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</span></div>`;
    const quoteHtml = `<div class="quote"><p>"${q.text}"</p><span>— ${q.attr}</span></div>`;

    if (layout === 0) {
      chaptersHtml += `
      <div class="page spread">
        <div class="half left">
          <h2 class="ch-title">${ch.title.toUpperCase()}</h2>
          <div class="text-wrap">
            ${extra.length ? `<img src="${extra[0]?.url || hero}" class="float-left">` : ''}
            <p class="dropcap">${ch.text}</p>
          </div>
          ${facesHtml}
        </div>
        <div class="half right side-bg">
          <h2 class="sec-title">HIGHLIGHTS</h2>
          <div class="sec-bar">${ch.day.toUpperCase()}</div>
          ${hero ? `<img src="${hero}" class="hero-img">` : ''}
          ${extra.length >= 3 ? `<div class="grid3">${extra.slice(0, 3).map(p => `<img src="${p.url}">`).join('')}</div>` : ''}
          ${placeHtml}${quoteHtml}
        </div>
      </div>`;
    } else if (layout === 1) {
      chaptersHtml += `
      <div class="page spread">
        <div class="half left photo-full">
          ${hero ? `<img src="${hero}" class="cover-img">` : `<div class="cover-img" style="background:${C.accent}"></div>`}
          <div class="photo-badge">${ch.day}</div>
          ${extra.length ? `<img src="${extra[0]?.url || ''}" class="polaroid">` : ''}
        </div>
        <div class="half right side-bg">
          <h2 class="ch-title">${ch.title.toUpperCase()}</h2>
          <div class="bullet-item"><span class="bdot"></span><h4>${ch.place.name}</h4></div>
          <p>${ch.text}</p>
          ${quoteHtml}${placeHtml}${facesHtml}
        </div>
      </div>`;
    } else {
      chaptersHtml += `
      <div class="page spread">
        <div class="half left">
          ${hero ? `<img src="${hero}" class="top-photo">` : ''}
          <h2 class="ch-title">${ch.title.toUpperCase()}</h2>
          <div class="subsec"><span class="chev">›</span><h4>${ch.place.name}</h4></div>
          <p>${splitAtSentence(ch.text, 0)}</p>
          <div class="subsec"><span class="chev">›</span><h4>Impressions</h4></div>
          <p>${splitAtSentence(ch.text, 1)}</p>
        </div>
        <div class="half right side-bg">
          <h2 class="sec-title">INFOS & PHOTOS</h2>
          ${extra.length >= 2 ? `<div class="photo-stack"><img src="${extra[0]?.url || hero}" class="stack-main"><div class="stack-side">${extra.slice(1, 3).map(p => `<img src="${p.url}">`).join('')}</div></div>` : (hero ? `<img src="${hero}" class="hero-img">` : '')}
          ${placeHtml}${quoteHtml}${facesHtml}
        </div>
      </div>`;
    }
  });

  // Route page
  const routeHtml = `
  <div class="page spread">
    <div class="half left">
      <h2 class="ch-title">ITINERAIRE</h2>
      <div class="route">
        <div class="rp"><div class="rdot start"></div><span>Toulouse (depart)</span></div>
        ${v.chapters.map((ch, i) => `<div class="rline"></div><div class="rp"><div class="rdot ${i === v.chapters.length - 1 ? 'last' : ''}"></div><div><strong>${ch.place.name}</strong><br><small>${ch.day} · ${ch.place.duration}</small></div></div>`).join('')}
        <div class="rline"></div>
        <div class="rp"><div class="rdot start"></div><span>Retour Toulouse</span></div>
      </div>
    </div>
    <div class="half right side-bg">
      <h2 class="sec-title">RESUME DU VOYAGE</h2>
      <div class="stats-grid">
        <div class="stat"><span class="stat-n">${v.stats.photos}</span><span>Photos</span></div>
        <div class="stat"><span class="stat-n">${v.stats.lieux}</span><span>Lieux</span></div>
        <div class="stat"><span class="stat-n">${v.stats.mots.toLocaleString()}</span><span>Mots</span></div>
        <div class="stat"><span class="stat-n">${v.stats.temp}</span><span>Temperature</span></div>
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
  <p style="margin-top:12px;font-size:10px">Genere le ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
