/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · SHARED
   Nav (con hamburger), footer, modal efecto-app y fab WA.
   Se ejecuta en todas las páginas.
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
const C = window.CONTENT;
if(!C) return;

/* ── helpers ─────────────────────────────────────────────── */
function waLink(text){ return 'https://wa.me/'+C.negocio.whatsapp+'?text='+encodeURIComponent(text||C.negocio.mensajeWA); }
window.BETHER = { waLink: waLink, content: C };

/* ── NAV ──────────────────────────────────────────────────── */
const navEl = document.getElementById('nav');
if(navEl){
  const page = location.pathname.split('/').pop() || 'index.html';
  const links = [
    { href:'index.html',     label:'Inicio'    },
    { href:'portfolio.html', label:'Portfolio' },
    { href:'precios.html',   label:'Precios'   },
    { href:'contacto.html',  label:'Contacto'  }
  ];
  const linksHTML = links.map(l=>`<li><a href="${l.href}"${page===l.href?' class="active"':''}>${l.label}</a></li>`).join('');
  navEl.innerHTML = `
    <a href="index.html" class="nav__logo" aria-label="Bether Studio">
      <svg class="nav__logo-svg" viewBox="0 0 36 36" fill="none" width="32" height="32">
        <path d="M18 2 L33 11 L33 25 L18 34 L3 25 L3 11 Z" stroke="url(#ng)" stroke-width="1" fill="none" stroke-linejoin="round"/>
        <text x="18" y="22" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="11" font-weight="600" fill="url(#ng)">BH</text>
        <defs><linearGradient id="ng" x1="3" y1="2" x2="33" y2="34"><stop offset="0%" stop-color="#d4a574"/><stop offset="100%" stop-color="#e6c08a"/></linearGradient></defs>
      </svg>
      <div>
        <span class="nav__logo-name">Bether<span class="nav__logo-sub">Studio</span></span>
      </div>
    </a>
    <ul class="nav__links">${linksHTML}</ul>
    <div class="nav__right">
      <a href="contacto.html" class="btn btn--gold btn--sm">Comenzar</a>
      <button class="nav__burger" id="navBurger" aria-label="Menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>`;

  /* Mobile drawer */
  const drawer = document.createElement('div');
  drawer.className = 'nav__drawer';
  drawer.id = 'navDrawer';
  drawer.innerHTML = `
    <button class="nav__drawer-close" id="navDrawerClose" aria-label="Cerrar">✕</button>
    ${links.map(l=>`<a href="${l.href}"${page===l.href?' class="active"':''}>${l.label}</a>`).join('')}
    <a href="contacto.html" class="btn btn--gold" style="margin-top:16px">Comenzar</a>`;
  const overlay = document.createElement('div');
  overlay.className = 'nav__overlay'; overlay.id = 'navOverlay';
  document.body.append(drawer, overlay);

  function openDrawer(){
    drawer.classList.add('open'); overlay.classList.add('open');
    document.body.style.overflow='hidden';
    document.getElementById('navBurger').setAttribute('aria-expanded','true');
  }
  function closeDrawer(){
    drawer.classList.remove('open'); overlay.classList.remove('open');
    document.body.style.overflow='';
    document.getElementById('navBurger').setAttribute('aria-expanded','false');
  }
  document.getElementById('navBurger').onclick = openDrawer;
  document.getElementById('navDrawerClose').onclick = closeDrawer;
  overlay.onclick = closeDrawer;
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeDrawer(); });

  /* Scroll */
  function onScroll(){ navEl.classList.toggle('scrolled', scrollY>30); }
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
}

/* ── FOOTER ───────────────────────────────────────────────── */
const footerEl = document.getElementById('footer');
if(footerEl){
  const page = location.pathname.split('/').pop() || 'index.html';
  footerEl.innerHTML = `
    <div class="footer__inner">
      <div class="footer__brand">
        <div class="footer__logo">Bether Studio</div>
        <p class="footer__tagline">${C.negocio.tagline}</p>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Páginas</div>
        <a href="index.html">Inicio</a>
        <a href="portfolio.html">Portfolio</a>
        <a href="precios.html">Precios</a>
        <a href="contacto.html">Contacto</a>
      </div>
      <div class="footer__col">
        <div class="footer__col-title">Contacto</div>
        <a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a>
        <a href="mailto:${C.negocio.email}">Email</a>
        <a href="https://instagram.com/${C.negocio.instagram}" target="_blank" rel="noopener">Instagram</a>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} ${C.negocio.nombre} — ${C.negocio.ciudad}</span>
    </div>`;
}

/* ── FAB WHATSAPP ─────────────────────────────────────────── */
const fab = document.getElementById('fabWa');
if(fab){ fab.href = waLink(); fab.target='_blank'; fab.rel='noopener'; }

/* ── MODAL EFECTO APP ─────────────────────────────────────── */
const modal   = document.getElementById('appModal');
const mPhone  = document.getElementById('appModalPhone');
const mScreen = document.getElementById('appModalScreen');
const mFrame  = document.getElementById('appModalFrame');
const mLoader = document.getElementById('appModalLoader');
const mLabel  = document.getElementById('appModalLabel');
const mClose  = document.getElementById('appModalClose');
if(modal && mPhone){
  function phoneSize(){
    const byH = (innerHeight*.86-70)*(9/19.5);
    return Math.round(Math.min(byH, innerWidth*.88));
  }
  window.openDemo = function(url, titulo, fromEl){
    if(!url) return;
    const w=phoneSize(), br=Math.round(w*.16);
    mPhone.style.width=w+'px'; mPhone.style.borderRadius=br+'px';
    mScreen.style.borderRadius=Math.round(br*.68)+'px';
    if(fromEl && !matchMedia('(prefers-reduced-motion:reduce)').matches){
      const r=fromEl.getBoundingClientRect();
      const cx=r.left+r.width/2-innerWidth/2, cy=r.top+r.height/2-innerHeight/2;
      const sc=Math.max(.08,r.width/w);
      mPhone.style.transition='none';
      mPhone.style.transform=`translate(${cx}px,${cy}px) scale(${sc})`;
      mPhone.style.opacity='.3';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        mPhone.style.transition=''; mPhone.style.transform=''; mPhone.style.opacity='1';
      }));
    }
    if(mLoader) mLoader.style.display='flex';
    mFrame.src=url;
    mFrame.onload=()=>{ if(mLoader) mLoader.style.display='none'; };
    if(mLabel&&titulo) mLabel.textContent=titulo+' — navegá como un invitado';
    modal.classList.add('open');
    document.body.style.overflow='hidden';
    if(mClose) mClose.focus();
  };
  window.closeDemo = function(){
    modal.classList.remove('open');
    mFrame.src='about:blank';
    document.body.style.overflow='';
  };
  if(mClose) mClose.onclick=window.closeDemo;
  modal.addEventListener('click',e=>{ if(e.target===modal) window.closeDemo(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&modal.classList.contains('open')) window.closeDemo(); });
  addEventListener('resize',()=>{
    if(!modal.classList.contains('open')) return;
    const w=phoneSize(), br=Math.round(w*.16);
    mPhone.style.width=w+'px'; mPhone.style.borderRadius=br+'px';
    mScreen.style.borderRadius=Math.round(br*.68)+'px';
  },{passive:true});
}

/* ── DATA-WA ──────────────────────────────────────────────── */
function wireWA(){
  document.querySelectorAll('[data-wa]').forEach(el=>{
    if(el.tagName==='A'){
      const txt=el.getAttribute('data-wa-text')||'';
      el.href=waLink(txt); el.target='_blank'; el.rel='noopener';
    }
  });
}
wireWA();
const mutObs=new MutationObserver(wireWA);
mutObs.observe(document.body,{childList:true,subtree:true});

/* ── REVEALS ──────────────────────────────────────────────── */
const REDUCED=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function initReveals(){
  const rvs=document.querySelectorAll('.rv:not(.in)');
  if(REDUCED||!('IntersectionObserver' in window)){ rvs.forEach(el=>el.classList.add('in')); return; }
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); obs.unobserve(en.target); }});
  },{threshold:.1, rootMargin:'0px 0px -30px 0px'});
  rvs.forEach(el=>obs.observe(el));
}
initReveals();
window.BETHER.initReveals=initReveals;

})();
