// TravelBook v3 — App Logic
let cur='screen-splash',curVoyage=null,swIdx=0,hist=['screen-splash'];
const NAV_SCREENS=['screen-home','screen-map','screen-profile'];

// Theme
function setTheme(t){document.documentElement.setAttribute('data-theme',t);localStorage.setItem('tb-theme',t);const tg=document.getElementById('dark-mode-toggle');if(tg)tg.checked=t==='dark'}
function toggleTheme(){setTheme(document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark')}

// Nav
function navigateTo(id,h=true){
  const a=document.getElementById(cur),b=document.getElementById(id);
  if(!a||!b||id===cur)return;
  a.classList.remove('active');a.classList.add('slide-out');b.classList.add('slide-in');
  setTimeout(()=>{a.classList.remove('slide-out');b.classList.remove('slide-in');b.classList.add('active')},350);
  if(h)hist.push(id);cur=id;
  const nav=document.getElementById('nav');
  NAV_SCREENS.includes(id)?nav.classList.remove('hidden'):nav.classList.add('hidden');
  if(NAV_SCREENS.includes(id))document.querySelectorAll('.nav-btn').forEach(x=>x.classList.toggle('active',x.dataset.screen===id));
}
function navTo(id){
  if(id===cur)return;
  document.getElementById(cur).classList.remove('active');
  document.getElementById(id).classList.add('active');
  cur=id;hist.push(id);
  document.querySelectorAll('.nav-btn').forEach(x=>x.classList.toggle('active',x.dataset.screen===id));
}

// Auth
function doLogin(){
  localStorage.setItem('tb-logged','1');
  showToast('Connexion réussie');
  setTimeout(()=>navigateTo('screen-home'),400);
}
function doSignup(){
  localStorage.setItem('tb-logged','1');
  showToast('Compte créé');
  setTimeout(()=>navigateTo('screen-home'),400);
}
function logout(){
  localStorage.removeItem('tb-logged');
  navigateTo('screen-splash');hist=['screen-splash'];
}

// Home
function renderTrips(){
  document.getElementById('trip-list').innerHTML=VOYAGES.map(v=>`
    <div class="trip-card" onclick="openVoyage(${v.id})">
      <div class="trip-img" style="background-image:url('${v.cover}')">
        <span class="trip-badge ${v.badge==='ok'?'ok':'pdf'}">${v.badge==='ok'?'Carnet prêt':'PDF exporté'}</span>
      </div>
      <div class="trip-info">
        <div class="trip-name">${v.name}</div>
        <div class="trip-meta">${v.country} · ${v.dates}</div>
        <div class="trip-foot">
          <div class="trip-avatars">${v.companions.map(c=>`<div class="trip-av">${c[0]}</div>`).join('')}</div>
          <div class="trip-stat">${v.stats.photos} photos · ${v.stats.lieux} lieux</div>
        </div>
      </div>
    </div>
  `).join('');
}

// Carnet
function openVoyage(id){
  const v=VOYAGES.find(x=>x.id===id);if(!v)return;curVoyage=id;
  document.getElementById('carnet-cover').style.backgroundImage=`url('${v.cover}')`;
  document.getElementById('carnet-h').textContent=v.name;
  document.getElementById('carnet-sub').textContent=`${v.country} — ${v.days} jours`;
  document.getElementById('carnet-stats').innerHTML=
    [{v:v.stats.photos,l:'Photos'},{v:v.stats.lieux,l:'Lieux'},{v:v.stats.mots.toLocaleString(),l:'Mots'},{v:v.stats.temp,l:'Moy.'}]
    .map(s=>`<div class="c-stat"><b>${s.v}</b><small>${s.l}</small></div>`).join('');

  document.getElementById('carnet-body').innerHTML=v.chapters.map((ch,ci)=>{
    const sel=ch.photos?ch.photos.filter(p=>p.on):[];
    const hero=sel.length?sel[0].url:'';
    return `<div class="ch">
      <div class="ch-day">${ch.day}</div>
      <div class="ch-title">${ch.title}</div>
      ${hero?`<div class="ch-img" style="background-image:url('${hero}')" onclick="viewPhoto('${hero}')"></div>`:''}
      ${ch.photos&&ch.photos.length?`
        <div class="ch-strip">
          ${ch.photos.map((p,pi)=>`<div class="ch-thumb ${p.on?'on':''}" style="background-image:url('${p.url}')" onclick="togPhoto(${v.id},${ci},${pi})"><div class="ch-thumb-ck">✓</div></div>`).join('')}
          <div class="ch-add" onclick="addPhoto(${v.id},${ci})">+</div>
        </div>
        <div class="ch-sel" onclick="openGallery(${v.id},${ci})">${sel.length}/${ch.photos.length} photos — <b>Gérer</b></div>
      `:''}
      <div class="ch-text">${ch.text}</div>
      <div class="ch-place">
        <div style="flex:1"><div class="ch-pname">${ch.place.name}</div><div class="ch-pmeta">${ch.place.address} · ${ch.place.duration}</div></div>
        <div class="ch-prating">${'★'.repeat(Math.round(ch.place.rating))} ${ch.place.rating}</div>
      </div>
    </div>`;
  }).join('');

  // PDF
  document.getElementById('pdf-mock-title').textContent=v.name;
  document.getElementById('pdf-mock-date').textContent=v.dates;
  document.getElementById('pdf-mock-cover').style.backgroundImage=`url('${v.cover}')`;
  document.getElementById('pdf-mock-cover').style.backgroundSize='cover';
  document.getElementById('pdf-mock-cover').style.backgroundPosition='center';

  navigateTo('screen-carnet');
}
function goBackFromPdf(){navigateTo(curVoyage?'screen-carnet':'screen-home')}

// Photos
function togPhoto(vid,ci,pi){
  const v=VOYAGES.find(x=>x.id===vid);v.chapters[ci].photos[pi].on=v.chapters[ci].photos[pi].on?0:1;openVoyage(vid);
}
function openGallery(vid,ci){
  const v=VOYAGES.find(x=>x.id===vid);if(!v)return;const ch=v.chapters[ci];
  let g=document.querySelector('.gal');
  if(!g){g=document.createElement('div');g.className='gal';document.getElementById('app-content').appendChild(g)}
  const sel=ch.photos.filter(p=>p.on).length;
  g.innerHTML=`
    <div class="gal-head"><div><div class="gal-title">${ch.day} — Photos</div><div class="gal-sub">${sel} sélectionnées sur ${ch.photos.length}</div></div><button class="gal-ok" onclick="closeGallery(${vid})">OK</button></div>
    <div class="gal-grid" id="gal-grid">${ch.photos.map((p,pi)=>`<div class="gal-ph ${p.on?'on':''}" style="background-image:url('${p.url}')" onclick="togGal(${vid},${ci},${pi})"><div class="gal-ck">${p.on?'✓':''}</div></div>`).join('')}</div>
    <div class="gal-add">
      <div class="gal-search-row" style="display:flex;gap:8px;margin-bottom:8px">
        <input type="text" placeholder="Rechercher sur Pexels..." id="gal-search" style="flex:1;padding:12px 16px;background:var(--bg3);border:1px solid var(--border);border-radius:24px;color:var(--ink);font:400 14px var(--sans);outline:none">
        <button onclick="galSearch(${vid},${ci})" style="padding:12px 18px;background:var(--accent);color:#fff;border:none;border-radius:24px;font:500 13px var(--sans);cursor:pointer">Chercher</button>
      </div>
      <button onclick="addPhoto(${vid},${ci})"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>Importer depuis l'appareil</button>
    </div>`;
  requestAnimationFrame(()=>g.classList.add('show'));
}

async function galSearch(vid,ci){
  const q=document.getElementById('gal-search').value.trim();if(!q)return;
  const btn=document.querySelector('.gal-add button:last-child');
  showToast('Recherche en cours...');
  const photos=await searchPhotos(q);
  if(!photos.length){showToast('Aucune photo trouvée');return}
  const v=VOYAGES.find(x=>x.id===vid);
  photos.forEach(p=>{v.chapters[ci].photos.push({url:p.url,thumb:p.thumb,on:0})});
  showToast(photos.length+' photos ajoutées');
  openGallery(vid,ci);
}
function togGal(vid,ci,pi){
  VOYAGES.find(x=>x.id===vid).chapters[ci].photos[pi].on^=1;openGallery(vid,ci);
}
function closeGallery(vid){
  const g=document.querySelector('.gal');if(g)g.classList.remove('show');setTimeout(()=>openVoyage(vid),300);
}
function addPhoto(vid,ci){
  const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.multiple=true;
  inp.onchange=e=>{
    Array.from(e.target.files).forEach(f=>{
      VOYAGES.find(x=>x.id===vid).chapters[ci].photos.push({url:URL.createObjectURL(f),on:1});
    });
    if(e.target.files.length){showToast(e.target.files.length+' photo(s) ajoutée(s)');openGallery(vid,ci)}
  };inp.click();
}
function viewPhoto(url){
  let v=document.querySelector('.pv');
  if(!v){v=document.createElement('div');v.className='pv';v.onclick=()=>v.classList.remove('show');document.getElementById('app-content').appendChild(v)}
  v.innerHTML=`<button class="pv-close" onclick="event.stopPropagation();this.parentElement.classList.remove('show')">✕</button><img src="${url}">`;
  requestAnimationFrame(()=>v.classList.add('show'));
}

// New trip
function pickChip(el){el.parentElement.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));el.classList.add('active')}
function createTrip(){swIdx=0;renderSwipe();navigateTo('screen-swipe')}
function pickFmt(el){document.querySelectorAll('.pdf-fmt').forEach(f=>f.classList.remove('active'));el.classList.add('active')}

// Swipe
function renderSwipe(){
  const z=document.getElementById('swipe-zone');
  if(swIdx>=SWIPE_PLACES.length){navigateTo('screen-generating');runGen();return}
  const p=SWIPE_PLACES[swIdx];
  document.getElementById('swipe-bar-fill').style.width=(swIdx/SWIPE_PLACES.length*100)+'%';
  document.getElementById('swipe-count').textContent=`${swIdx+1} / ${SWIPE_PLACES.length}`;
  z.innerHTML=`<div class="sw-card" id="sw-cur">
    <div class="sw-img" style="background-image:url('${p.img}')"><div class="sw-dur">${p.duration}</div></div>
    <div class="sw-body"><div class="sw-name">${p.name}</div><div class="sw-addr">${p.address}</div>
    <div><span class="sw-stars">${'★'.repeat(Math.round(p.rating))}</span> <span class="sw-rating">${p.rating} (${p.reviews.toLocaleString()})</span></div></div></div>`;
}
function swipeAction(d){
  const c=document.getElementById('sw-cur');if(!c)return;
  c.classList.add(d==='left'?'out-l':'out-r');setTimeout(()=>{swIdx++;renderSwipe()},400);
}
let tx=0;
document.addEventListener('touchstart',e=>{if(cur==='screen-swipe')tx=e.touches[0].clientX});
document.addEventListener('touchend',e=>{if(cur!=='screen-swipe')return;const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>60)swipeAction(d>0?'right':'left')});

// Generating
function runGen(){
  const steps=[{id:'gen-step-1',d:0},{id:'gen-step-2',d:1200},{id:'gen-step-3',d:2400},{id:'gen-step-4',d:3600}];
  steps.forEach(s=>{const e=document.getElementById(s.id);e.className='gen-step';e.querySelector('span').className='gen-dot'});
  steps.forEach((s,i)=>{setTimeout(()=>{
    const e=document.getElementById(s.id);
    if(i>0){const p=document.getElementById(steps[i-1].id);p.className='gen-step done';p.querySelector('span').className='gen-check';p.querySelector('span').textContent='✓'}
    e.className='gen-step active';e.querySelector('span').className='gen-spinner';e.querySelector('span').textContent='';
  },s.d)});
  setTimeout(()=>{const l=document.getElementById(steps[3].id);l.className='gen-step done';l.querySelector('span').className='gen-check';l.querySelector('span').textContent='✓';setTimeout(()=>openVoyage(1),500)},4800);
}

// Map
let mapOk=false;
function loadMap(){
  if(mapOk)return;mapOk=true;
  fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(r=>r.json()).then(t=>drawMap(t)).catch(()=>{document.getElementById('map-wrap').innerHTML='<p style="color:var(--ink3);text-align:center;padding:40px">Carte indisponible</p>'});
}
function drawMap(topo){
  const svg=document.getElementById('world-map'),coll=topoFeat(topo,topo.objects.countries);
  const w=960,h=500,px=lon=>(lon+180)/360*w,py=lat=>(90-lat)/180*h;
  coll.features.forEach(f=>{const id=f.id,vis=Object.values(COUNTRY_CODES_NUM).includes(id),rec=id===COUNTRY_CODES_NUM.EG;
    geo2path(f.geometry,px,py).forEach(d=>{const p=ns('path');p.setAttribute('d',d);p.setAttribute('class','country'+(vis?' visited':'')+(rec?' recent':''));svg.appendChild(p)})});
  Object.entries(MAP_COUNTRIES).forEach(([,info])=>{
    const cx=px(info.lon),cy=py(info.lat);
    const c=ns('circle');c.setAttribute('cx',cx);c.setAttribute('cy',cy);c.setAttribute('r','4');c.setAttribute('class','map-point');if(info.recent)c.style.fill='var(--blue)';svg.appendChild(c);
    const t=ns('text');t.setAttribute('x',cx);t.setAttribute('y',cy-10);t.setAttribute('text-anchor','middle');t.setAttribute('fill','var(--ink2)');t.setAttribute('font-size','10');t.setAttribute('font-family','Inter,sans-serif');t.textContent=info.name;svg.appendChild(t);
  });
  const hx=px(1.44),hy=py(43.6);const hc=ns('circle');hc.setAttribute('cx',hx);hc.setAttribute('cy',hy);hc.setAttribute('r','3');hc.setAttribute('class','map-point');svg.appendChild(hc);
  Object.entries(MAP_ROUTES).forEach(([code,r])=>{
    const x1=px(r.from[0]),y1=py(r.from[1]),x2=px(r.to[0]),y2=py(r.to[1]);
    const p=ns('path');p.setAttribute('d',`M${x1},${y1} Q${(x1+x2)/2},${Math.min(y1,y2)-30} ${x2},${y2}`);p.setAttribute('class','route-line');if(code==='EG')p.style.stroke='var(--blue)';svg.appendChild(p);
  });
  document.getElementById('map-btns').innerHTML=VOYAGES.map((v,i)=>`<button class="map-btn ${i===0?'active':''}" onclick="this.parentElement.querySelectorAll('.map-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${v.name}</button>`).join('');
}
function ns(tag){return document.createElementNS('http://www.w3.org/2000/svg',tag)}
function topoFeat(topo,obj){
  const arcs=topo.arcs,tr=topo.transform;
  function dArc(ai){const rev=ai<0,a=arcs[rev?~ai:ai],c=[];let x=0,y=0;for(const p of a){x+=p[0];y+=p[1];c.push([x*tr.scale[0]+tr.translate[0],y*tr.scale[1]+tr.translate[1]])}return rev?c.reverse():c}
  function dRing(r){const c=[];for(const ai of r){const ac=dArc(ai);c.push(...(c.length?ac.slice(1):ac))}return c}
  return{type:'FeatureCollection',features:obj.geometries.map(g=>({type:'Feature',id:g.id,geometry:{type:g.type,coordinates:g.type==='Polygon'?g.arcs.map(dRing):g.type==='MultiPolygon'?g.arcs.map(p=>p.map(dRing)):[]}}))};
}
function geo2path(g,px,py){
  const ps=[];function r2p(r){return r.map((c,i)=>(i?'L':'M')+px(c[0]).toFixed(1)+','+py(c[1]).toFixed(1)).join('')+'Z'}
  if(g.type==='Polygon')ps.push(g.coordinates.map(r2p).join(''));
  else if(g.type==='MultiPolygon')g.coordinates.forEach(p=>ps.push(p.map(r2p).join('')));
  return ps;
}

// Chat
function showChat(){
  let o=document.querySelector('.chat-overlay');
  if(!o){o=document.createElement('div');o.className='chat-overlay';o.innerHTML=`<div class="chat-panel"><div class="chat-handle"></div><div class="chat-messages"><div class="chat-msg ai">Que souhaitez-vous modifier ?</div></div><div class="chat-input-row"><input placeholder="Ex: Rends le Jour 2 plus drôle..." id="chat-input"><button class="chat-send" onclick="sendChat()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg></button></div></div>`;
  o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('show')});document.getElementById('app-content').appendChild(o)}
  requestAnimationFrame(()=>o.classList.add('show'));
}
function sendChat(){
  const inp=document.getElementById('chat-input'),msg=inp.value.trim();if(!msg)return;
  const m=document.querySelector('.chat-messages');m.innerHTML+=`<div class="chat-msg user">${msg}</div>`;inp.value='';
  setTimeout(()=>{m.innerHTML+=`<div class="chat-msg ai">C'est noté ! Modification effectuée.</div>`;m.scrollTop=m.scrollHeight},1000);
}

// Misc
async function downloadPdf(){
  const v=VOYAGES.find(x=>x.id===curVoyage);
  if(!v){showToast('Aucun voyage selectionne');return}
  showToast('Generation du PDF en cours...');

  // Strip unicode for jsPDF (helvetica doesn't support it)
  function ascii(s){
    return s.replace(/[\u2014]/g,'--').replace(/[\u00b7]/g,'.').replace(/[\u2605]/g,'*')
      .replace(/[\u00e9\u00e8\u00ea\u00eb]/g,'e').replace(/[\u00e0\u00e2\u00e4]/g,'a')
      .replace(/[\u00f4\u00f6]/g,'o').replace(/[\u00ee\u00ef]/g,'i').replace(/[\u00fb\u00fc]/g,'u')
      .replace(/[\u00e7]/g,'c').replace(/[\u00c9\u00c8]/g,'E').replace(/[\u00c0]/g,'A')
      .replace(/[\u00d4]/g,'O').replace(/[\u2019\u2018]/g,"'").replace(/[\u201c\u201d]/g,'"')
      .replace(/[\u014d\u00f3]/g,'o').replace(/[\u016b]/g,'u').replace(/[\u0101]/g,'a')
      .replace(/[^\x00-\x7F]/g,'');
  }

  try{
    const {jsPDF}=window.jspdf;
    const pdf=new jsPDF({orientation:'portrait',unit:'mm',format:'a5'});
    const W=148,H=210,M=15;

    function loadImg(url){
      return new Promise(resolve=>{
        const img=new Image();img.crossOrigin='anonymous';
        img.onload=()=>{try{const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext('2d').drawImage(img,0,0);resolve(c.toDataURL('image/jpeg',0.7))}catch(e){resolve(null)}};
        img.onerror=()=>resolve(null);
        img.src=url+(url.includes('?')?'&':'?')+'_t='+Date.now();
        setTimeout(()=>resolve(null),5000);
      });
    }

    // Helper: add text with auto page break, returns new y
    function addText(pdf,txt,x,y,maxW,fontSize,bold,color){
      pdf.setFont('helvetica',bold?'bold':'normal');pdf.setFontSize(fontSize);
      pdf.setTextColor(color[0],color[1],color[2]);
      const lines=pdf.splitTextToSize(ascii(txt),maxW);
      const lh=fontSize*0.45;
      for(const line of lines){
        if(y>H-20){pdf.addPage();y=M;}
        pdf.text(line,x,y);y+=lh;
      }
      return y;
    }

    // --- COVER PAGE ---
    pdf.setFillColor(26,26,26);pdf.rect(0,0,W,H,'F');
    const cb=await loadImg(v.cover);
    if(cb){try{pdf.addImage(cb,'JPEG',0,0,W,H*0.45)}catch(e){}}
    pdf.setFillColor(26,26,26);pdf.rect(0,H*0.45-20,W,H*0.55+20,'F');

    pdf.setFont('helvetica','bold');pdf.setFontSize(36);pdf.setTextColor(255,255,255);
    pdf.text(ascii(v.name),W/2,H*0.55,{align:'center'});
    pdf.setFont('helvetica','normal');pdf.setFontSize(13);pdf.setTextColor(180,180,180);
    pdf.text(ascii(v.country)+' -- '+v.days+' jours',W/2,H*0.55+12,{align:'center'});
    pdf.text(ascii(v.dates),W/2,H*0.55+22,{align:'center'});
    if(v.companions&&v.companions.length){
      pdf.setFontSize(11);pdf.setTextColor(160,160,160);
      pdf.text('Avec '+v.companions.join(', '),W/2,H*0.55+34,{align:'center'});
    }
    pdf.setFontSize(9);pdf.setTextColor(120,120,120);
    pdf.text(v.stats.photos+' photos . '+v.stats.lieux+' lieux . '+v.stats.mots+' mots . '+v.stats.temp,W/2,H-25,{align:'center'});
    pdf.setFontSize(8);pdf.setTextColor(90,90,90);
    pdf.text('TravelBook',W/2,H-12,{align:'center'});

    // --- CHAPTERS ---
    for(let i=0;i<v.chapters.length;i++){
      const ch=v.chapters[i];
      const selP=ch.photos?ch.photos.filter(p=>p.on):[];

      // -- Full-page photo if available --
      if(selP.length){
        pdf.addPage();
        const ib=await loadImg(selP[0].url||selP[0].thumb||'');
        if(ib){
          try{pdf.addImage(ib,'JPEG',0,0,W,H)}catch(e){}
          // Overlay with day + title
          pdf.setFillColor(0,0,0);pdf.setGState(new pdf.GState({opacity:0.5}));
          pdf.rect(0,H-60,W,60,'F');
          pdf.setGState(new pdf.GState({opacity:1}));
          pdf.setFont('helvetica','normal');pdf.setFontSize(9);pdf.setTextColor(200,160,120);
          pdf.text(ascii(ch.day).toUpperCase(),M,H-40);
          pdf.setFont('helvetica','bold');pdf.setFontSize(22);pdf.setTextColor(255,255,255);
          const titleLines=pdf.splitTextToSize(ascii(ch.title),W-30);
          pdf.text(titleLines,M,H-28);
        }
      }

      // -- Text page --
      pdf.addPage();
      let y=M;

      // Day + Title
      pdf.setFont('helvetica','normal');pdf.setFontSize(9);pdf.setTextColor(176,106,59);
      pdf.text(ascii(ch.day).toUpperCase(),M,y);y+=7;
      pdf.setFont('helvetica','bold');pdf.setFontSize(18);pdf.setTextColor(30,30,30);
      const tl=pdf.splitTextToSize(ascii(ch.title),W-30);
      pdf.text(tl,M,y);y+=tl.length*8+8;

      // Narrative text
      y=addText(pdf,ch.text,M,y,W-30,10.5,false,[70,70,70]);
      y+=6;

      // Faces detected (companion mention)
      if(ch.faces&&ch.faces.length){
        const names=ch.faces.map(f=>COMPANIONS[f]?COMPANIONS[f].name:f).join(', ');
        pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.setTextColor(140,140,140);
        if(y>H-20){pdf.addPage();y=M;}
        pdf.text('Personnes detectees : '+names,M,y);y+=8;
      }

      // Place card
      if(y>H-25){pdf.addPage();y=M;}
      pdf.setDrawColor(210,210,210);pdf.setFillColor(248,247,244);
      pdf.roundedRect(M,y,W-30,20,3,3,'FD');
      pdf.setFont('helvetica','bold');pdf.setFontSize(10);pdf.setTextColor(30,30,30);
      pdf.text(ascii(ch.place.name),M+5,y+7);
      pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.setTextColor(120,120,120);
      pdf.text(ascii(ch.place.address)+' . '+ch.place.duration,M+5,y+14);
      pdf.setTextColor(176,106,59);pdf.setFontSize(9);
      pdf.text('*'.repeat(Math.round(ch.place.rating))+' '+ch.place.rating,W-M-5,y+10,{align:'right'});
      y+=28;

      // Additional selected photos (2 per row)
      if(selP.length>1){
        const extraPhotos=selP.slice(1,5); // max 4 more
        for(let r=0;r<extraPhotos.length;r+=2){
          if(y>H-50){pdf.addPage();y=M;}
          const pw=(W-30-5)/2, ph=40;
          for(let c=0;c<2&&(r+c)<extraPhotos.length;c++){
            const ep=extraPhotos[r+c];
            const eb=await loadImg(ep.url||ep.thumb||'');
            if(eb){try{pdf.addImage(eb,'JPEG',M+c*(pw+5),y,pw,ph,undefined,'MEDIUM')}catch(e){}}
          }
          y+=ph+5;
        }
      }

      // Page number
      pdf.setFont('helvetica','normal');pdf.setFontSize(8);pdf.setTextColor(160,160,160);
      pdf.text(String(i+1),W/2,H-8,{align:'center'});
    }

    // --- LAST PAGE ---
    pdf.addPage();
    pdf.setFillColor(248,247,244);pdf.rect(0,0,W,H,'F');
    pdf.setFont('helvetica','bold');pdf.setFontSize(22);pdf.setTextColor(176,106,59);
    pdf.text('TravelBook',W/2,H/2-15,{align:'center'});
    pdf.setFont('helvetica','normal');pdf.setFontSize(11);pdf.setTextColor(140,140,140);
    pdf.text('Votre Livre de Voyage',W/2,H/2,{align:'center'});
    pdf.setFontSize(9);
    pdf.text('Genere automatiquement par TravelBook',W/2,H/2+15,{align:'center'});
    pdf.text(new Date().toLocaleDateString('fr-FR',{year:'numeric',month:'long',day:'numeric'}),W/2,H/2+24,{align:'center'});
    if(v.companions&&v.companions.length){
      pdf.setFontSize(8);pdf.setTextColor(160,160,160);
      pdf.text('Voyageurs : Raph, '+v.companions.join(', '),W/2,H/2+36,{align:'center'});
    }

    pdf.save('TravelBook-'+v.name.replace(/[^a-zA-Z0-9]/g,'')+'.pdf');
    showToast('PDF telecharge !');

  }catch(err){
    console.error('PDF error:',err);
    showToast('Erreur: '+err.message);
  }
}
function showToast(msg){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)}
function updateClock(){const n=new Date();document.getElementById('status-time').textContent=n.getHours().toString().padStart(2,'0')+':'+n.getMinutes().toString().padStart(2,'0')}

// Init
document.addEventListener('DOMContentLoaded',()=>{
  setTheme(localStorage.getItem('tb-theme')||'light');
  const dm=document.getElementById('dark-mode-toggle');if(dm)dm.addEventListener('change',toggleTheme);
  updateClock();setInterval(updateClock,30000);
  renderTrips();
  // Auto-login if already logged in
  if(localStorage.getItem('tb-logged')){
    document.getElementById('screen-splash').classList.remove('active');
    document.getElementById('screen-home').classList.add('active');
    document.getElementById('nav').classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(x=>x.classList.toggle('active',x.dataset.screen==='screen-home'));
    cur='screen-home';hist=['screen-home'];
  }
  // Splash photo (fallback, will be replaced by Pexels)
  document.getElementById('splash-photo').style.backgroundImage=`url('${IMG.splash}')`;
  // Fetch real photos from Pexels API
  fetchAllPhotos().then(()=>{ console.log('Pexels photos loaded'); });
  // Map lazy
  new MutationObserver(()=>{if(document.getElementById('screen-map').classList.contains('active'))loadMap()}).observe(document.getElementById('screen-map'),{attributes:true,attributeFilter:['class']});
  // Chat enter
  document.addEventListener('keydown',e=>{if(e.key==='Enter'&&document.activeElement?.id==='chat-input')sendChat()});
});
