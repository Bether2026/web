/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · INDEX.JS
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
const C=window.CONTENT, B=window.BETHER;
if(!C||!B) return;

const h=C.hero;
document.getElementById('heroEyebrow').textContent=h.eyebrow;
document.getElementById('heroTitle').innerHTML=h.titulo;
document.getElementById('heroSub').innerHTML=h.subtitulo;
document.getElementById('heroPills').innerHTML=h.pills.map(p=>`<span class="cp">${p}</span>`).join('');
document.getElementById('heroActions').innerHTML=`
  <a href="${h.ctaPrimarioHref}" class="btn btn--gold">${h.ctaPrimario}</a>
  <a href="${B.waLink()}" class="btn btn--wa" target="_blank" rel="noopener">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.5-.3-.5.3-.5.8-1.6.1-.2 0-.3 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3 4.8 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 22a10 10 0 0 1-5.2-1.5L3 22l1.5-3.7A10 10 0 1 1 12 22Z"/></svg>
    WhatsApp
  </a>`;
document.getElementById('statsRow').innerHTML=h.stats.map(s=>
  `<div class="stat"><span class="stat-n">${s.n}</span><span class="stat-l">${s.l}</span></div>`).join('');

/* Teléfono del hero */
const mount=document.getElementById('heroPhoneMount');
if(mount){
  const FINE=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
  const hint=FINE?h.demo.hintDesktop:h.demo.hintMobile;
  mount.innerHTML=`
    <div class="phone" id="heroPhone">
      <div class="phone__glow"></div>
      <div class="phone__frame">
        <div class="phone__notch"><div class="phone__cam"></div><div class="phone__spk"></div></div>
        <div class="phone__screen" id="heroPhoneScreen"
             data-demo="${h.demo.url}" data-demo-title="${h.demo.titulo}"
             style="background:linear-gradient(160deg,#0d1f35,#1a4a7a 45%,#2d7cc0 75%,#3a8a2a)">
          <div class="phone__cover">
            <div class="phone__emojis">${h.demo.emojis}</div>
            <div class="phone__title">${h.demo.titulo.replace(/de (.+)$/,'de<br><strong>$1</strong>')}</div>
            <div class="phone__hint">${hint}</div>
            <div class="phone__play"><div class="phone__play-ring"></div><div class="phone__play-dot">▶</div></div>
          </div>
          <div class="phone__reflect"></div>
        </div>
        <div class="phone__home"></div>
      </div>
      <div class="phone__badge phone__badge--1"><span class="ic">✓</span><div><b>Valentina confirmó</b><span>hace 2 minutos</span></div></div>
      <div class="phone__badge phone__badge--2"><span class="ic">🎮</span><div><b>Score: 1.240 pts</b><span>Mini-juego</span></div></div>
    </div>`;

  document.getElementById('heroPhoneScreen').addEventListener('click',function(){
    window.openDemo&&window.openDemo(h.demo.url,h.demo.titulo,this);
  });

  if(FINE){
    const ph=document.getElementById('heroPhone');
    const fr=ph.querySelector('.phone__frame');
    const re=ph.querySelector('.phone__reflect');
    ph.addEventListener('mousemove',function(e){
      const r=fr.getBoundingClientRect();
      const px=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width-.5));
      const py=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height-.5));
      ph.classList.add('phone--tilting');
      fr.style.transform=`perspective(900px) rotateY(${px*10}deg) rotateX(${-py*8}deg) scale(1.04)`;
      if(re){re.style.setProperty('--rx',((px+.5)*100)+'%');re.style.setProperty('--ry',((py+.5)*100)+'%');}
    },{passive:true});
    ph.addEventListener('mouseleave',function(){ ph.classList.remove('phone--tilting'); fr.style.transform=''; });
  }
}

/* Contadores */
(function(){
  const row=document.getElementById('statsRow');
  if(!row||!('IntersectionObserver' in window)) return;
  let ran=false;
  new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting&&!ran){
      ran=true;
      row.querySelectorAll('.stat-n').forEach(el=>{
        const raw=el.textContent.trim(), m=raw.match(/^(\+?)(\d+)(.*)$/);
        if(!m) return;
        let f=0;
        const iv=setInterval(()=>{
          f++; const p=1-Math.pow(1-f/70,3);
          el.textContent=m[1]+Math.round(p*+m[2])+m[3];
          if(f>=70){el.textContent=raw;clearInterval(iv);}
        },1000/60);
      });
    }
  },{threshold:.4}).observe(row);
})();

/* Marquee */
const mq=document.getElementById('mqTrack');
if(mq) mq.innerHTML=[...C.marquee,...C.marquee].map(t=>`<span>${t}</span><span class="sep">●</span>`).join('');

/* Proof */
const pb=document.getElementById('proofBar');
if(pb) pb.innerHTML='<div class="proof-inner">'+
  C.proof.map((p,i)=>{
    const div=i<C.proof.length-1?'<div class="proof-div"></div>':'';
    const stars=p.icon?`<span class="proof-stars">${p.icon}</span>`:'';
    const txt=p.txt?(p.bold?`<strong>${p.bold}</strong> `:'')+p.txt:`<strong>${p.bold}</strong>`;
    return `<div class="proof-item">${stars}<span class="proof-text">${txt}</span></div>${div}`;
  }).join('')+'</div>';

/* Proceso */
const pg=document.getElementById('procesoGrid');
if(pg) pg.innerHTML=C.proceso.map((p,i)=>`
  <div class="proc-card rv d${i}">
    <span class="pc-num">${p.num}</span>
    <div class="pc-icon">${p.icon}</div>
    <div class="pc-name">${p.titulo}</div>
    <p class="pc-desc">${p.desc}</p>
    ${p.sub?`<span class="pc-sub">${p.sub}</span>`:''}
  </div>`).join('');

/* ══ FEATURES — SIN CAJA, IMPACTANTE ══════════════════════
   Emoji grande + título enorme flotando sobre la página.
   El fondo de la sección cambia de color entre slides.      */
const sliderWrap=document.getElementById('bentoGrid');
if(sliderWrap&&C.features){
  const feats=C.features;

  /* Emoji real + color de fondo por feature */
  const SLIDES=[
    { emoji:'🔗', bg:'rgba(212,165,116,.12)' },
    { emoji:'📊', bg:'rgba(34,211,238,.10)' },
    { emoji:'🎬', bg:'rgba(168,85,247,.12)' },
    { emoji:'🪑', bg:'rgba(74,222,128,.10)' },
    { emoji:'🎮', bg:'rgba(255,140,66,.11)' },
    { emoji:'🎵', bg:'rgba(255,93,122,.10)' },
    { emoji:'⏳', bg:'rgba(212,165,116,.10)' },
    { emoji:'🗺️', bg:'rgba(34,211,238,.09)' },
    { emoji:'✅', bg:'rgba(74,222,128,.12)' },
  ];

  sliderWrap.innerHTML=`
    <div class="fslider" id="fsliderRoot">
      <div class="fslider__color-layer" id="fsColorLayer"></div>
      <div class="fslider__viewport" id="fsViewport">
        ${feats.map((f,i)=>`
          <div class="fslider__slide" data-i="${i}">
            <div class="fslider__emoji">${SLIDES[i%SLIDES.length].emoji}</div>
            ${f.tag?`<span class="fslider__tag">${f.tag}</span>`:''}
            <h3 class="fslider__title">${f.titulo}</h3>
            <p class="fslider__desc">${f.desc}</p>
          </div>`).join('')}
      </div>
      <div class="fslider__ui">
        <div class="fslider__progress">
          <div class="fslider__progress-bar" id="fsProgressBar"></div>
        </div>
        <div class="fslider__controls">
          <button class="fslider__btn" id="fsPrev" aria-label="Anterior">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="fslider__dots" id="fsDots">
            ${feats.map((_,i)=>`<button class="fslider__dot${i===0?' active':''}" data-i="${i}"></button>`).join('')}
          </div>
          <button class="fslider__btn" id="fsNext" aria-label="Siguiente">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>`;

  const colorLayer = document.getElementById('fsColorLayer');
  const dots       = [...document.getElementById('fsDots').querySelectorAll('.fslider__dot')];
  const progBar    = document.getElementById('fsProgressBar');
  const DURATION   = 4800;
  let cur=0, rafId=null, progStart=null, paused=false;

  function getSlides(){ return [...document.getElementById('fsViewport').querySelectorAll('.fslider__slide')]; }

  function goTo(n){
    const slides=getSlides();
    const prev=cur;
    cur=(n+feats.length)%feats.length;
    slides[prev].classList.remove('active');
    slides[prev].classList.add('leaving');
    setTimeout(()=>slides[prev].classList.remove('leaving'),700);
    slides[cur].classList.add('active');
    dots.forEach((d,i)=>d.classList.toggle('active',i===cur));
    /* Cambiar el color de fondo de la sección */
    colorLayer.style.background=SLIDES[cur%SLIDES.length].bg;
    colorLayer.classList.add('visible');
    startAuto();
  }

  function startAuto(){
    cancelAnimationFrame(rafId);
    progStart=performance.now();
    function tick(now){
      if(paused){ progStart+=now-progStart; rafId=requestAnimationFrame(tick); return; }
      const pct=Math.min((now-progStart)/DURATION,1);
      progBar.style.transform=`scaleX(${pct})`;
      if(pct>=1){ goTo(cur+1); return; }
      rafId=requestAnimationFrame(tick);
    }
    rafId=requestAnimationFrame(tick);
  }

  document.getElementById('fsNext').onclick=()=>goTo(cur+1);
  document.getElementById('fsPrev').onclick=()=>goTo(cur-1);
  document.getElementById('fsDots').addEventListener('click',e=>{
    const d=e.target.closest('.fslider__dot');
    if(d) goTo(+d.getAttribute('data-i'));
  });
  sliderWrap.addEventListener('mouseenter',()=>{ paused=true; });
  sliderWrap.addEventListener('mouseleave',()=>{ paused=false; });

  /* Swipe táctil */
  let tx=0;
  document.getElementById('fsViewport').addEventListener('touchstart',e=>{ tx=e.touches[0].clientX; },{passive:true});
  document.getElementById('fsViewport').addEventListener('touchend',e=>{
    if(Math.abs(e.changedTouches[0].clientX-tx)>44) goTo(e.changedTouches[0].clientX<tx?cur+1:cur-1);
  },{passive:true});

  getSlides()[0].classList.add('active');
  colorLayer.style.background=SLIDES[0].bg;
  colorLayer.classList.add('visible');
  startAuto();
  if(window.BETHER.initReveals) window.BETHER.initReveals();
}

})();