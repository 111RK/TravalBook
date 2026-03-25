// TravelBook — HTML Magazine PDF Generator v2

// Split text at nearest sentence break (period followed by space)
function splitAtSentence(text, part) {
  const mid = Math.floor(text.length / 2);
  // Search for ". " near the middle
  let breakIdx = text.lastIndexOf('. ', mid + 40);
  if (breakIdx < mid - 100 || breakIdx < 0) breakIdx = text.indexOf('. ', mid - 40);
  if (breakIdx < 0) breakIdx = mid; else breakIdx += 2; // after the ". "
  return part === 0 ? text.substring(0, breakIdx) : text.substring(breakIdx);
}

function downloadPdf() {
  const v = VOYAGES.find(x => x.id === curVoyage);
  if (!v) { showToast('Aucun voyage selectionne'); return; }
  const tpl = PDF_TEMPLATES.find(t => t.id === selectedTemplate) || PDF_TEMPLATES[0];
  const isLand = (tpl.orientation || 'landscape') === 'landscape';
  const quotes = QUOTES[v.country] || [{text:"Le voyage est la seule chose qu'on achete qui nous rend plus riche.",attr:"Anonyme"}];
  const gSel = (ch) => ch.photos ? ch.photos.filter(p => p.on) : [];
  const gFaces = (ch) => ch.faces ? ch.faces.map(f => COMPANIONS[f]?.name || f).join(', ') : '';

  const pageSize = isLand ? 'A4 landscape' : 'A5 portrait';
  const pw = isLand ? '297mm' : '148mm';
  const ph = isLand ? '210mm' : '210mm';

  // Force a real cover image - use specific Pexels search, not the Pexels-loaded one which might be wrong
  const coverUrl = v.cover;

  let chaptersHtml = '';
  v.chapters.forEach((ch, i) => {
    const photos = gSel(ch);
    const hero = photos.length ? photos[0].url : '';
    const extra = photos.slice(1, 7);
    const q = quotes[i % quotes.length];
    const companions = gFaces(ch);
    const layout = i % 3;

    if (layout === 0) {
      // Layout A: Text with float photo left + Highlights right
      chaptersHtml += `
      <div class="page spread">
        <div class="half left">
          <h2 class="ch-title">${ch.title.toUpperCase()}</h2>
          <div class="text-wrap">
            ${extra.length ? `<img src="${extra[0]?.url || hero}" class="float-left" alt="">` : ''}
            <p class="dropcap">${ch.text}</p>
          </div>
          ${companions ? `<div class="faces-bar">Visages detectes : ${companions}</div>` : ''}
        </div>
        <div class="half right">
          <h2 class="sec-title">HIGHLIGHTS</h2>
          <div class="sec-bar">${ch.day.toUpperCase()}</div>
          ${hero ? `<img src="${hero}" class="hero-img" alt="">` : ''}
          ${extra.length >= 3 ? `<div class="grid3">${extra.slice(0, 3).map(p => `<img src="${p.url}" alt="">`).join('')}</div>` : ''}
          <div class="place-card"><h4>${ch.place.name}</h4><p>${ch.place.address} · ${ch.place.duration}</p><span class="stars">${'★'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</span></div>
          <div class="quote"><p>"${q.text}"</p><span>— ${q.attr}</span></div>
        </div>
      </div>`;
    } else if (layout === 1) {
      // Layout B: Full photo left + Text right
      chaptersHtml += `
      <div class="page spread">
        <div class="half left photo-full">
          ${hero ? `<img src="${hero}" class="cover-img" alt="">` : '<div class="cover-img" style="background:#3d4025"></div>'}
          <div class="photo-badge">${ch.day}</div>
          ${extra.length ? `<img src="${extra[0]?.url || ''}" class="polaroid" alt="">` : ''}
        </div>
        <div class="half right text-bg">
          <h2 class="ch-title">${ch.title.toUpperCase()}</h2>
          <div class="bullet-item"><span class="bdot"></span><h4>${ch.place.name}</h4></div>
          <p>${ch.text}</p>
          <div class="quote"><p>"${q.text}"</p><span>— ${q.attr}</span></div>
          <div class="place-card"><h4>${ch.place.name}</h4><p>${ch.place.address} · ${ch.place.duration}</p><span class="stars">${'★'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</span></div>
          ${companions ? `<div class="faces-bar">Visages : ${companions}</div>` : ''}
        </div>
      </div>`;
    } else {
      // Layout C: Photo top + text + stack right
      chaptersHtml += `
      <div class="page spread">
        <div class="half left">
          ${hero ? `<img src="${hero}" class="top-photo" alt="">` : ''}
          <h2 class="ch-title">${ch.title.toUpperCase()}</h2>
          <div class="subsec"><span class="chev">›</span><h4>${ch.place.name}</h4></div>
          <p>${splitAtSentence(ch.text, 0)}</p>
          <div class="subsec"><span class="chev">›</span><h4>Impressions</h4></div>
          <p>${splitAtSentence(ch.text, 1)}</p>
        </div>
        <div class="half right">
          <h2 class="sec-title">INFOS & PHOTOS</h2>
          ${extra.length >= 2 ? `
          <div class="photo-stack">
            <img src="${extra[0]?.url || hero}" class="stack-main" alt="">
            <div class="stack-side">${extra.slice(1, 3).map(p => `<img src="${p.url}" alt="">`).join('')}</div>
          </div>` : (hero ? `<img src="${hero}" class="hero-img" alt="">` : '')}
          <div class="place-card"><h4>${ch.place.name}</h4><p>${ch.place.address} · ${ch.place.duration}</p><span class="stars">${'★'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</span></div>
          <div class="quote"><p>"${q.text}"</p><span>— ${q.attr}</span></div>
          ${companions ? `<div class="faces-bar">Visages : ${companions}</div>` : ''}
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
        ${v.chapters.map((ch, i) => `
          <div class="rline"></div>
          <div class="rp"><div class="rdot ${i === v.chapters.length - 1 ? 'last' : ''}"></div>
            <div><strong>${ch.place.name}</strong><br><small>${ch.day} · ${ch.place.duration}</small></div>
          </div>`).join('')}
        <div class="rline"></div>
        <div class="rp"><div class="rdot start"></div><span>Retour Toulouse</span></div>
      </div>
    </div>
    <div class="half right stats-bg">
      <h2 class="sec-title">RESUME DU VOYAGE</h2>
      <div class="stats-grid">
        <div class="stat"><span class="stat-n">${v.stats.photos}</span><span>Photos</span></div>
        <div class="stat"><span class="stat-n">${v.stats.lieux}</span><span>Lieux</span></div>
        <div class="stat"><span class="stat-n">${v.stats.mots.toLocaleString()}</span><span>Mots</span></div>
        <div class="stat"><span class="stat-n">${v.stats.temp}</span><span>Temperature</span></div>
      </div>
      <div class="comp-sec">
        <h4>Voyageurs</h4>
        ${['raph', ...(v.companions || []).map(c => c.toLowerCase())].map(f => {
          const comp = COMPANIONS[f]; if (!comp) return '';
          return `<div class="comp"><div class="cav ${comp.gender === 'F' ? 'f' : ''}">${comp.name[0]}</div><span>${comp.name} — ${comp.role}</span></div>`;
        }).join('')}
      </div>
    </div>
  </div>`;

  const fs = isLand ? {title:'22px',sec:'18px',body:'11px',small:'9px'} : {title:'17px',sec:'14px',body:'10px',small:'8px'};

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>TravelBook — ${v.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"><\/script>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  @page{size:${pageSize};margin:0}
  body{font-family:'DM Sans',sans-serif;color:#2a2a1e;background:#888;-webkit-print-color-adjust:exact;print-color-adjust:exact}

  /* PAGE */
  .page{width:${pw};height:${ph};background:#fff;overflow:hidden;page-break-after:always;position:relative;margin:0 auto 4px}
  .spread{display:flex}
  .half{width:50%;padding:22px;overflow:hidden;font-size:${fs.body};line-height:1.75}
  .half p{color:#3a3a2e;margin-bottom:8px}

  /* COVER */
  .page.cover{display:flex;align-items:center;justify-content:center}
  .page.cover>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .cover-ov{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.2),rgba(0,0,0,.6));display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px}
  .cover-title{font:900 ${isLand?'80px':'56px'} 'Playfair Display',serif;color:white;text-shadow:0 4px 30px rgba(0,0,0,.5);letter-spacing:5px;line-height:.92}
  .cover-sub{font:italic 400 20px 'Playfair Display',serif;color:rgba(255,255,255,.85);margin-top:10px}
  .cover-info{font:400 11px 'DM Sans';color:rgba(255,255,255,.6);letter-spacing:3px;text-transform:uppercase;margin-top:6px}
  .cover-brand{position:absolute;bottom:14px;font:400 9px 'DM Sans';color:rgba(255,255,255,.35);letter-spacing:5px;text-transform:uppercase}

  /* TITLES */
  .ch-title{font:900 ${fs.title} 'Playfair Display',serif;color:#3d4025;letter-spacing:1px;margin-bottom:10px;line-height:1.2}
  .sec-title{font:900 ${fs.sec} 'Playfair Display',serif;color:#3d4025;margin-bottom:4px;letter-spacing:1px}
  .sec-bar{background:#4a5028;color:white;padding:3px 12px;font-size:9px;letter-spacing:6px;display:inline-block;border-radius:2px;margin-bottom:10px}

  /* PHOTOS */
  .float-left{float:left;width:42%;margin:0 12px 8px 0;border-radius:4px;box-shadow:3px 3px 12px rgba(0,0,0,.15)}
  .hero-img{width:100%;max-height:38%;object-fit:cover;border-radius:5px;margin-bottom:8px;box-shadow:0 4px 16px rgba(0,0,0,.1)}
  .grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;margin-bottom:10px}
  .grid3 img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:3px}
  .top-photo{width:100%;height:${isLand?'160px':'120px'};object-fit:cover;border-radius:6px;margin-bottom:10px;box-shadow:0 4px 14px rgba(0,0,0,.1)}
  .photo-full{padding:0!important;position:relative}
  .cover-img{width:100%;height:100%;object-fit:cover;display:block}
  .photo-badge{position:absolute;bottom:12px;left:12px;background:rgba(0,0,0,.55);color:#fff;padding:5px 14px;border-radius:5px;font:500 11px 'DM Sans';backdrop-filter:blur(4px)}
  .polaroid{position:absolute;bottom:35px;right:14px;width:38%;border:6px solid white;box-shadow:4px 4px 16px rgba(0,0,0,.3);transform:rotate(3deg)}
  .text-bg{background:#faf8f4}
  .photo-stack{display:grid;grid-template-columns:2fr 1fr;gap:5px;margin-bottom:10px;height:${isLand?'150px':'110px'}}
  .stack-main{width:100%;height:100%;object-fit:cover;border-radius:5px;grid-row:1/3}
  .stack-side{display:flex;flex-direction:column;gap:5px}
  .stack-side img{width:100%;flex:1;object-fit:cover;border-radius:4px}

  /* PLACE */
  .place-card{background:#f5f2ec;border-left:3px solid #4a5028;padding:8px 12px;border-radius:0 6px 6px 0;margin-bottom:8px}
  .place-card h4{font:700 11px 'Playfair Display',serif;color:#3d4025;margin-bottom:1px}
  .place-card p{font-size:${fs.small};color:#7a7a6a;margin:0!important}
  .stars{color:#8a7a40;font-size:10px}

  /* QUOTE */
  .quote{border-left:3px solid #4a5028;padding:8px 12px;margin:10px 0;background:rgba(74,80,40,.04);border-radius:0 6px 6px 0}
  .quote p{font:italic 400 ${fs.body} 'Playfair Display',serif!important;color:#3d4025;line-height:1.55;margin:0!important}
  .quote span{font:400 ${fs.small} 'DM Sans';color:#8a8a7a;display:block;margin-top:3px;text-align:right}

  /* MISC */
  .bullet-item{display:flex;align-items:center;gap:7px;margin-bottom:5px}
  .bdot{width:7px;height:7px;border-radius:50%;background:#4a5028;flex-shrink:0}
  .bullet-item h4{font-size:10px;color:#4a5028;text-transform:uppercase;letter-spacing:1px}
  .subsec{display:flex;align-items:center;gap:5px;margin:8px 0 3px}
  .chev{font-size:15px;color:#4a5028;font-weight:bold}
  .subsec h4{font-size:10px;color:#4a5028;text-transform:uppercase;letter-spacing:1px}
  .faces-bar{font-size:${fs.small};color:#8a8a7a;padding:5px 0;border-top:1px solid #e8e4da;margin-top:6px}
  .dropcap::first-letter{font:900 72px/0.65 'Playfair Display',serif;float:left;color:#4a5028;margin:6px 10px 0 -2px;padding-top:8px}

  /* ROUTE */
  .route{padding:6px 0}
  .rp{display:flex;align-items:center;gap:10px;padding:4px 0}
  .rp strong{font-size:11px;color:#3d4025}
  .rp small{font-size:${fs.small};color:#8a8a7a}
  .rdot{width:10px;height:10px;border-radius:50%;background:#3d4025;flex-shrink:0}
  .rdot.start{background:#4a5028;box-shadow:0 0 0 3px rgba(74,80,40,.2)}
  .rdot.last{background:#8a7a40;box-shadow:0 0 0 3px rgba(138,122,64,.2)}
  .rline{width:2px;height:12px;background:linear-gradient(#4a5028,#aaa);margin-left:4px;border-radius:1px}
  .stats-bg{background:#faf8f4}
  .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:14px 0}
  .stat{text-align:center;padding:12px;background:#fff;border-radius:8px;border:1px solid #e8e4da}
  .stat-n{font:900 24px 'Playfair Display',serif;color:#4a5028;display:block}
  .stat span:last-child{font-size:${fs.small};color:#8a8a7a;text-transform:uppercase;letter-spacing:1px}
  .comp-sec{margin-top:16px}
  .comp-sec h4{font-size:9px;color:#4a5028;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
  .comp{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #e8e4da;font-size:11px}
  .cav{width:28px;height:28px;border-radius:50%;background:#4a5028;color:white;display:flex;align-items:center;justify-content:center;font:700 11px 'DM Sans'}
  .cav.f{background:#8a7a6a}

  /* LAST */
  .page.last-page{display:flex;align-items:center;justify-content:center;flex-direction:column;background:#1a1410;text-align:center}
  .last-page h1{font:900 32px 'Playfair Display',serif;color:#c8864a;margin-bottom:6px}
  .last-page p{font:400 11px 'DM Sans';color:#6a6050}
  .last-line{width:50px;height:2px;background:#c8864a;margin:12px 0}

  /* TOOLBAR */
  .toolbar{position:fixed;bottom:0;left:0;right:0;background:#1a1410;padding:14px 20px;display:flex;gap:10px;justify-content:center;z-index:100;box-shadow:0 -4px 20px rgba(0,0,0,.3)}
  .toolbar button{padding:12px 24px;border:none;border-radius:8px;font:600 14px 'DM Sans';cursor:pointer;transition:all .2s}
  .btn-print{background:#4a5028;color:white}
  .btn-print:hover{background:#3d4020}
  .btn-pdf{background:#c8864a;color:white}
  .btn-pdf:hover{background:#a06e3a}
  @media print{.toolbar{display:none!important}body{background:white}.page{margin:0;box-shadow:none}}
</style></head><body>

<!-- COVER -->
<div class="page cover">
  <img src="${coverUrl}" alt="">
  <div class="cover-ov">
    <div class="cover-title">${v.name.toUpperCase()}</div>
    <div class="cover-sub">${v.country} — ${v.days} jours</div>
    <div class="cover-info">${v.dates}${v.companions?.length ? ' · Avec ' + v.companions.join(', ') : ''}</div>
  </div>
  <div class="cover-brand">TravelBook</div>
</div>

${chaptersHtml}
${routeHtml}

<!-- LAST PAGE -->
<div class="page last-page">
  <div class="last-line"></div>
  <h1>TravelBook</h1>
  <p>Votre Livre de Voyage</p>
  <div class="last-line"></div>
  <p style="margin-top:12px;font-size:10px">Genere le ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
</div>

<!-- TOOLBAR -->
<div class="toolbar">
  <button class="btn-print" onclick="window.print()">Imprimer</button>
  <button class="btn-pdf" onclick="savePdf()">Convertir en PDF</button>
</div>

<script>
async function savePdf() {
  const btn = document.querySelector('.btn-pdf');
  btn.textContent = 'Conversion en cours...';
  btn.disabled = true;
  const toolbar = document.querySelector('.toolbar');
  toolbar.style.display = 'none';

  const pages = document.querySelectorAll('.page');
  const {jsPDF} = window.jspdf;
  const isLand = ${isLand};
  const pdf = new jsPDF({orientation: isLand?'landscape':'portrait', unit:'mm', format: isLand?'a4':'a5'});
  const W = pdf.internal.pageSize.getWidth();
  const H = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pages.length; i++) {
    if (i > 0) pdf.addPage();
    try {
      const canvas = await html2canvas(pages[i], {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: pages[i].offsetWidth,
        height: pages[i].offsetHeight
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.85);
      pdf.addImage(imgData, 'JPEG', 0, 0, W, H);
    } catch(e) {
      console.warn('Page ' + i + ' failed:', e);
    }
  }

  pdf.save('TravelBook-${v.name.replace(/[^a-zA-Z0-9]/g, '')}.pdf');
  toolbar.style.display = 'flex';
  btn.textContent = 'Convertir en PDF';
  btn.disabled = false;
}
<\/script>
</body></html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
  else { showToast('Autorisez les pop-ups'); }
}
