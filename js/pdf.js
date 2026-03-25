// TravelBook — HTML Magazine PDF Generator
// Generates a styled HTML page that looks like FlipHTML5 magazine, printable to PDF

function downloadPdf() {
  const v = VOYAGES.find(x => x.id === curVoyage);
  if (!v) { showToast('Aucun voyage selectionne'); return; }
  const tpl = PDF_TEMPLATES.find(t => t.id === selectedTemplate) || PDF_TEMPLATES[0];
  const isLand = (tpl.orientation || 'landscape') === 'landscape';
  const quotes = QUOTES[v.country] || [{text:"Le voyage est la seule chose qu'on achete qui nous rend plus riche.",attr:"Anonyme"}];
  const sel = (ch) => ch.photos ? ch.photos.filter(p => p.on) : [];
  const getFaces = (ch) => ch.faces ? ch.faces.map(f => COMPANIONS[f]?.name || f).join(', ') : '';

  const pageSize = isLand ? 'A4 landscape' : 'A5 portrait';
  const pageW = isLand ? '297mm' : '148mm';
  const pageH = isLand ? '210mm' : '210mm';

  // Build chapters HTML
  let chaptersHtml = '';
  v.chapters.forEach((ch, i) => {
    const photos = sel(ch);
    const hero = photos.length ? photos[0].url : '';
    const extra = photos.slice(1, 7);
    const q = quotes[i % quotes.length];
    const companions = getFaces(ch);
    const layout = i % 3;

    if (layout === 0) {
      chaptersHtml += `
      <div class="mag-spread">
        <div class="mag-left">
          <h2 class="mag-ch-title">${ch.title.toUpperCase()}</h2>
          <div class="mag-text-wrap">
            ${extra.length ? `<img src="${extra[0]?.url || hero}" class="mag-float-left">` : ''}
            <p class="mag-dropcap">${ch.text}</p>
            ${extra.length >= 2 ? `<img src="${extra[1]?.url}" class="mag-img-inline">` : ''}
          </div>
          ${companions ? `<div class="mag-faces-bar">Visages detectes : ${companions}</div>` : ''}
        </div>
        <div class="mag-right">
          <h2 class="mag-sec-title">HIGHLIGHTS</h2>
          <div class="mag-sec-bar">${ch.day.toUpperCase()}</div>
          ${hero ? `<img src="${hero}" class="mag-hero">` : ''}
          <div class="mag-grid3">${extra.slice(0, 3).map(p => `<img src="${p.url}">`).join('')}</div>
          <div class="mag-place"><h4>${ch.place.name}</h4><p>${ch.place.address} · ${ch.place.duration}</p><span class="mag-stars">${'★'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</span></div>
          <div class="mag-quote"><p>"${q.text}"</p><span>— ${q.attr}</span></div>
        </div>
      </div>`;
    } else if (layout === 1) {
      chaptersHtml += `
      <div class="mag-spread">
        <div class="mag-left mag-photo-full">
          ${hero ? `<img src="${hero}" class="mag-cover-img">` : ''}
          <div class="mag-photo-badge">${ch.day}</div>
          ${extra.length ? `<img src="${extra[0]?.url}" class="mag-polaroid">` : ''}
        </div>
        <div class="mag-right mag-text-side">
          <h2 class="mag-ch-title">${ch.title.toUpperCase()}</h2>
          <div class="mag-bullet-section">
            <div class="mag-bullet-item"><span class="mag-bdot"></span><h4>${ch.place.name}</h4></div>
            <p>${ch.text}</p>
          </div>
          <div class="mag-quote"><p>"${q.text}"</p><span>— ${q.attr}</span></div>
          <div class="mag-place"><h4>${ch.place.name}</h4><p>${ch.place.address} · ${ch.place.duration}</p><span class="mag-stars">${'★'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</span></div>
          ${companions ? `<div class="mag-faces-bar">Visages : ${companions}</div>` : ''}
        </div>
      </div>`;
    } else {
      chaptersHtml += `
      <div class="mag-spread">
        <div class="mag-left">
          ${extra.length ? `<img src="${extra[0]?.url || hero}" class="mag-side-top">` : ''}
          <h2 class="mag-ch-title">${ch.title.toUpperCase()}</h2>
          <div class="mag-subsec"><span class="mag-chev">›</span> <h4>${ch.place.name}</h4></div>
          <p>${ch.text.substring(0, ch.text.length / 2)}</p>
          ${hero ? `<img src="${hero}" class="mag-img-inline">` : ''}
          <div class="mag-subsec"><span class="mag-chev">›</span> <h4>Impressions</h4></div>
          <p>${ch.text.substring(ch.text.length / 2)}</p>
        </div>
        <div class="mag-right">
          <h2 class="mag-sec-title">INFOS & PHOTOS</h2>
          ${extra.length >= 2 ? `
          <div class="mag-photo-stack">
            <img src="${extra[1]?.url || hero}" class="mag-stack-main">
            <div class="mag-stack-side">${extra.slice(2, 4).map(p => `<img src="${p.url}">`).join('')}</div>
          </div>` : (hero ? `<img src="${hero}" class="mag-hero">` : '')}
          <div class="mag-place"><h4>${ch.place.name}</h4><p>${ch.place.address} · ${ch.place.duration}</p><span class="mag-stars">${'★'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</span></div>
          <div class="mag-quote"><p>"${q.text}"</p><span>— ${q.attr}</span></div>
          ${companions ? `<div class="mag-faces-bar">Visages : ${companions}</div>` : ''}
        </div>
      </div>`;
    }
  });

  // Route page
  const routeHtml = `
  <div class="mag-spread mag-route-spread">
    <div class="mag-left">
      <h2 class="mag-ch-title">ITINERAIRE</h2>
      <div class="mag-route">
        <div class="mag-rp"><div class="mag-rdot start"></div><span>Toulouse (depart)</span></div>
        ${v.chapters.map((ch, i) => `
          <div class="mag-rline"></div>
          <div class="mag-rp"><div class="mag-rdot ${i === v.chapters.length - 1 ? 'last' : ''}"></div>
            <div><strong>${ch.place.name}</strong><br><small>${ch.day} · ${ch.place.duration}</small></div>
          </div>`).join('')}
        <div class="mag-rline"></div>
        <div class="mag-rp"><div class="mag-rdot start"></div><span>Retour Toulouse</span></div>
      </div>
    </div>
    <div class="mag-right mag-stats-side">
      <h2 class="mag-sec-title">RESUME</h2>
      <div class="mag-stats">
        <div class="mag-stat"><span class="mag-sn">${v.stats.photos}</span><span>Photos</span></div>
        <div class="mag-stat"><span class="mag-sn">${v.stats.lieux}</span><span>Lieux</span></div>
        <div class="mag-stat"><span class="mag-sn">${v.stats.mots.toLocaleString()}</span><span>Mots</span></div>
        <div class="mag-stat"><span class="mag-sn">${v.stats.temp}</span><span>Temperature</span></div>
      </div>
      <div class="mag-comp-section">
        <h4>Voyageurs</h4>
        ${['raph', ...(v.companions || []).map(c => c.toLowerCase())].map(f => {
          const comp = COMPANIONS[f]; if (!comp) return '';
          return `<div class="mag-comp"><div class="mag-cav ${comp.gender === 'F' ? 'f' : ''}">${comp.name[0]}</div><span>${comp.name} — ${comp.role}</span></div>`;
        }).join('')}
      </div>
    </div>
  </div>`;

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <title>TravelBook — ${v.name}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    @page{size:${pageSize};margin:0}
    body{font-family:'DM Sans',sans-serif;color:#2a2a1e;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}

    .mag-cover{width:${pageW};height:${pageH};position:relative;overflow:hidden;page-break-after:always}
    .mag-cover>img{width:100%;height:100%;object-fit:cover;display:block}
    .mag-cover-ov{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.15),rgba(0,0,0,.55));display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px}
    .mag-cover-big{font:900 ${isLand ? '96px' : '64px'} 'Playfair Display',serif;color:white;text-shadow:0 6px 40px rgba(0,0,0,.5);letter-spacing:6px;line-height:.9}
    .mag-cover-sub{font:italic 400 22px 'Playfair Display',serif;color:rgba(255,255,255,.85);margin-top:12px}
    .mag-cover-info{font:400 12px 'DM Sans',sans-serif;color:rgba(255,255,255,.55);letter-spacing:3px;text-transform:uppercase;margin-top:8px}
    .mag-cover-brand{position:absolute;bottom:16px;font:400 9px 'DM Sans',sans-serif;color:rgba(255,255,255,.3);letter-spacing:5px;text-transform:uppercase}

    .mag-spread{width:${pageW};height:${pageH};display:flex;page-break-after:always;overflow:hidden;background:#fff}
    .mag-left,.mag-right{width:50%;padding:${isLand ? '22px' : '18px'};overflow:hidden;position:relative;font-size:${isLand ? '11px' : '10px'};line-height:1.75}
    .mag-left p,.mag-right p{margin-bottom:10px;color:#3a3a2e}

    .mag-ch-title{font:900 ${isLand ? '22px' : '17px'} 'Playfair Display',serif;color:#3d4025;letter-spacing:1.5px;margin-bottom:12px;line-height:1.2}
    .mag-sec-title{font:900 ${isLand ? '18px' : '14px'} 'Playfair Display',serif;color:#3d4025;margin-bottom:4px;letter-spacing:1px}
    .mag-sec-bar{background:#4a5028;color:white;padding:4px 14px;font-size:9px;letter-spacing:6px;display:inline-block;border-radius:2px;margin-bottom:12px}

    .mag-float-left{float:left;width:44%;margin:0 14px 10px 0;border-radius:4px;box-shadow:4px 4px 14px rgba(0,0,0,.15)}
    .mag-img-inline{width:100%;border-radius:6px;margin:10px 0;box-shadow:0 4px 16px rgba(0,0,0,.1)}
    .mag-hero{width:100%;max-height:42%;object-fit:cover;border-radius:6px;margin-bottom:10px;box-shadow:0 6px 24px rgba(0,0,0,.12)}
    .mag-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5px;margin-bottom:12px}
    .mag-grid3 img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:4px}
    .mag-side-top{width:100%;height:${isLand ? '180px' : '140px'};object-fit:cover;border-radius:8px;margin-bottom:12px;box-shadow:0 4px 16px rgba(0,0,0,.1)}

    .mag-photo-full{padding:0!important;position:relative}
    .mag-cover-img{width:100%;height:100%;object-fit:cover;display:block}
    .mag-photo-badge{position:absolute;bottom:14px;left:14px;background:rgba(0,0,0,.55);color:#fff;padding:6px 16px;border-radius:6px;font:500 12px 'DM Sans';backdrop-filter:blur(4px)}
    .mag-polaroid{position:absolute;bottom:40px;right:16px;width:40%;border:7px solid white;box-shadow:5px 5px 20px rgba(0,0,0,.35);transform:rotate(3deg)}
    .mag-text-side{background:#faf8f4}

    .mag-photo-stack{display:grid;grid-template-columns:2fr 1fr;gap:6px;margin-bottom:12px;height:${isLand ? '160px' : '130px'}}
    .mag-stack-main{width:100%;height:100%;object-fit:cover;border-radius:6px;grid-row:1/3}
    .mag-stack-side{display:flex;flex-direction:column;gap:6px}
    .mag-stack-side img{width:100%;flex:1;object-fit:cover;border-radius:4px}

    .mag-place{background:#f5f2ec;border-left:3px solid #4a5028;padding:10px 14px;border-radius:0 8px 8px 0;margin-bottom:10px}
    .mag-place h4{font:700 12px 'Playfair Display',serif;color:#3d4025;margin-bottom:2px}
    .mag-place p{font-size:9px;color:#7a7a6a;margin:0!important}
    .mag-stars{color:#8a7a40;font-size:10px}

    .mag-quote{border-left:3px solid #4a5028;padding:10px 14px;margin:12px 0;background:rgba(74,80,40,.04);border-radius:0 8px 8px 0}
    .mag-quote p{font:italic 400 ${isLand ? '12px' : '10px'} 'Playfair Display',serif!important;color:#3d4025;line-height:1.6;margin:0!important}
    .mag-quote span{font:400 9px 'DM Sans';color:#8a8a7a;display:block;margin-top:4px;text-align:right}

    .mag-bullet-section{margin-bottom:10px}
    .mag-bullet-item{display:flex;align-items:center;gap:8px;margin-bottom:6px}
    .mag-bdot{width:8px;height:8px;border-radius:50%;background:#4a5028;flex-shrink:0}
    .mag-bullet-item h4{font-size:11px;color:#4a5028;text-transform:uppercase;letter-spacing:1px}
    .mag-subsec{display:flex;align-items:center;gap:6px;margin:10px 0 4px}
    .mag-chev{font-size:16px;color:#4a5028;font-weight:bold}
    .mag-subsec h4{font-size:10px;color:#4a5028;text-transform:uppercase;letter-spacing:1px}
    .mag-faces-bar{font-size:9px;color:#8a8a7a;padding:6px 0;border-top:1px solid #e8e4da;margin-top:8px}
    .mag-dropcap::first-letter{font:900 48px 'Playfair Display',serif;float:left;color:#4a5028;line-height:.82;margin:2px 6px 0 0}

    .mag-route{padding:8px 0}
    .mag-rp{display:flex;align-items:center;gap:12px;padding:5px 0}
    .mag-rp strong{font-size:12px;color:#3d4025}
    .mag-rp small{font-size:9px;color:#8a8a7a}
    .mag-rdot{width:12px;height:12px;border-radius:50%;background:#3d4025;flex-shrink:0}
    .mag-rdot.start{background:#4a5028;box-shadow:0 0 0 3px rgba(74,80,40,.2)}
    .mag-rdot.last{background:#8a7a40;box-shadow:0 0 0 3px rgba(138,122,64,.2)}
    .mag-rline{width:2px;height:14px;background:linear-gradient(#4a5028,#8a8a7a);margin-left:5px;border-radius:1px}
    .mag-stats-side{background:#faf8f4}
    .mag-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0}
    .mag-stat{text-align:center;padding:14px;background:#fff;border-radius:10px;border:1px solid #e8e4da}
    .mag-sn{font:900 26px 'Playfair Display',serif;color:#4a5028;display:block}
    .mag-stat span:last-child{font-size:9px;color:#8a8a7a;text-transform:uppercase;letter-spacing:1px}
    .mag-comp-section{margin-top:20px}
    .mag-comp-section h4{font-size:10px;color:#4a5028;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px}
    .mag-comp{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #e8e4da;font-size:12px}
    .mag-cav{width:30px;height:30px;border-radius:50%;background:#4a5028;color:white;display:flex;align-items:center;justify-content:center;font:700 12px 'DM Sans'}
    .mag-cav.f{background:#8a7a6a}

    .mag-last{width:${pageW};height:${pageH};background:#1a1410;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center}
    .mag-last h1{font:900 36px 'Playfair Display',serif;color:#c8864a;margin-bottom:6px}
    .mag-last p{font:400 12px 'DM Sans';color:#6a6050}
    .mag-last-line{width:60px;height:2px;background:#c8864a;margin:14px 0}

    @media print{.mag-noprint{display:none!important}}
    .mag-btn{position:fixed;bottom:20px;right:20px;background:#4a5028;color:white;border:none;padding:14px 28px;border-radius:10px;font:600 15px 'DM Sans';cursor:pointer;z-index:100;box-shadow:0 8px 24px rgba(0,0,0,.2)}
    .mag-btn:hover{background:#3d4020}
  </style></head><body>

  <div class="mag-cover">
    <img src="${v.cover}" alt="">
    <div class="mag-cover-ov">
      <div class="mag-cover-big">${v.name.toUpperCase()}</div>
      <div class="mag-cover-sub">${v.country} — ${v.days} jours</div>
      <div class="mag-cover-info">${v.dates}${v.companions?.length ? ' · Avec ' + v.companions.join(', ') : ''}</div>
    </div>
    <div class="mag-cover-brand">TravelBook</div>
  </div>

  ${chaptersHtml}
  ${routeHtml}

  <div class="mag-last">
    <div class="mag-last-line"></div>
    <h1>TravelBook</h1>
    <p>Votre Livre de Voyage</p>
    <div class="mag-last-line"></div>
    <p style="margin-top:14px;font-size:10px">Genere le ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <button class="mag-btn mag-noprint" onclick="window.print()">Imprimer / Sauvegarder en PDF</button>
  </body></html>`;

  const w = window.open('', '_blank');
  if (w) { w.document.write(html); w.document.close(); }
  else { showToast('Autorisez les pop-ups'); }
}
