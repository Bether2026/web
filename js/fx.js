/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · EFECTOS VISUALES
   1. Transición entre páginas (cortina con logo)
   2. Texto typewriter en el hero
   3. Letras una a una (split text) en títulos
   4. Badges flotantes animados
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ── 1. TRANSICIÓN ENTRE PÁGINAS ─────────────────────────── */
const curtain = document.createElement('div');
curtain.className = 'page-transition';
curtain.innerHTML = '<div class="page-transition__logo">Bether</div>';
document.body.appendChild(curtain);

/* Entrada: cortina sube al cargar la página */
window.addEventListener('DOMContentLoaded', function(){
  if(REDUCED) return;
  curtain.classList.add('enter');
  setTimeout(()=>{ curtain.classList.remove('enter'); }, 600);
});

/* Salida: cortina baja al hacer clic en un link interno */
document.addEventListener('click', function(e){
  if(REDUCED) return;
  const a = e.target.closest('a[href]');
  if(!a) return;
  const href = a.getAttribute('href');
  /* Solo links internos .html, no anclas ni externos */
  if(!href || href.startsWith('http') || href.startsWith('#') ||
     href.startsWith('mailto') || href.startsWith('tel') ||
     a.target === '_blank') return;
  e.preventDefault();
  curtain.classList.add('exit');
  setTimeout(()=>{ window.location.href = href; }, 580);
});

if(REDUCED) return;

/* ── 2. SPLIT TEXT — letras una a una ────────────────────── */
function splitText(el, delayBase){
  if(!el) return;
  const text  = el.textContent;
  const inner = el.innerHTML;

  /* Si tiene HTML (em, strong) procesamos solo los text nodes */
  if(el.children.length > 0){
    /* Modo simplificado: animar el elemento completo con fadeUp */
    el.style.animation = `charIn .7s ${delayBase||0}s var(--ease) both`;
    return;
  }

  let html = '';
  let delay = delayBase || 0;
  for(let i = 0; i < text.length; i++){
    const ch = text[i] === ' ' ? '&nbsp;' : text[i];
    html += `<span class="split-char" style="animation-delay:${delay.toFixed(3)}s">${ch}</span>`;
    delay += text[i] === ' ' ? 0.04 : 0.032;
  }
  el.innerHTML = `<span class="split-word">${html}</span>`;
}

/* Aplicar a todos los .hero__title y .sec-title que sean h1 */
document.querySelectorAll('h1.sec-title, h1.hero__title, .hero__title').forEach(function(el, i){
  splitText(el, 0.1 + i * 0.05);
});

/* ── 3. TYPEWRITER — subtítulo del hero ─────────────────── */
function typewriter(el, speed){
  if(!el) return;
  const full = el.textContent.trim();
  el.textContent = '';
  el.classList.add('tw-cursor');
  let i = 0;
  function tick(){
    if(i < full.length){
      el.textContent += full[i++];
      setTimeout(tick, speed || 28);
    } else {
      el.classList.remove('tw-cursor');
    }
  }
  setTimeout(tick, 900); /* empieza después del split del título */
}

const sub = document.querySelector('.hero__sub, .page-hero .sec-sub');
if(sub) typewriter(sub, 22);

/* ── 4. BADGES FLOTANTES — clases float-a/b/c ───────────── */
/* Ya los aplica el CSS — acá solo les ponemos delay random  */
document.querySelectorAll('.phone__badge, .precio-feat, .cp').forEach(function(el, i){
  const cls = ['float-a','float-b','float-c'][i % 3];
  el.classList.add(cls);
  el.style.animationDelay = (Math.random() * 2).toFixed(2) + 's';
});

})();
