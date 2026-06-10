/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · PORTFOLIO.JS
   Al elegir categoría: el teléfono muestra portada con emoji
   + gradiente + botón "▶ Ver demo" en el centro.
   Ese botón es el ÚNICO que abre el modal. No hay overlay.
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
const C=window.CONTENT, B=window.BETHER;
if(!C||!B) return;

const cats  = C.categorias;
const tabs  = document.getElementById('ptabs');
const info  = document.getElementById('portfInfo');
const video = document.getElementById('portfVideo');
const cover = document.getElementById('portfCover');
const glow  = document.getElementById('portfGlow');
let current = null;
let playBtn = null;   // referencia al único botón del medio

/* Render tabs */
tabs.innerHTML = cats.map((c,i)=>
  `<button class="ptab${i===0?' ptab--active':''}" data-id="${c.id}"
    role="tab" aria-selected="${i===0}">${c.label}</button>`
).join('');

function openCatDemo(cat){
  if(cat.demo && window.openDemo){
    window.openDemo(cat.demo, cat.titulo, playBtn);
  } else {
    open(B.waLink('Hola Bether 👋 Quiero ver la demo de: '+cat.label),'_blank','noopener');
  }
}

function selectCat(cat){
  if(current===cat.id) return;
  current=cat.id;

  /* Tabs UI */
  tabs.querySelectorAll('.ptab').forEach(t=>{
    const a=t.getAttribute('data-id')===cat.id;
    t.classList.toggle('ptab--active',a);
    t.setAttribute('aria-selected',a);
  });

  /* Panel de info a la izquierda */
  info.innerHTML=`
    <div class="portf-info__tag sec-tag">${cat.label}</div>
    <h2 class="portf-info__title sec-title">${cat.titulo}</h2>
    <p class="portf-info__desc sec-sub">${cat.desc}</p>
    <div class="portf-info__actions">
      ${cat.demo
        ? `<button class="btn btn--gold portf-open-demo"
               data-url="${cat.demo}" data-title="${cat.titulo}">▶ Ver demo interactiva</button>`
        : `<a href="${B.waLink('Hola Bether 👋 Quiero ver una demo de: '+cat.titulo)}"
              class="btn btn--gold" target="_blank" rel="noopener">Pedir demo por WhatsApp</a>`
      }
      <a href="contacto.html" class="btn btn--ghost">Consultar precio</a>
    </div>`;
  if(window.BETHER.initReveals) window.BETHER.initReveals();

  /* Glow del teléfono */
  if(glow){
    const m=cat.coverBg.match(/#[0-9a-f]{6}/gi);
    const c2=m&&m[1]?m[1]:'#d4a574';
    glow.style.background=`radial-gradient(circle,${c2}55 0%,transparent 70%)`;
  }

  /* ── PORTADA DEL TELÉFONO ──────────────────────────────
     Siempre visible. El botón del MEDIO es el único CTA.  */
  cover.style.background=cat.coverBg;
  cover.style.opacity='1';
  cover.style.pointerEvents='auto';

  const emojiEl = cover.querySelector('.portf-cover-emoji');
  if(emojiEl) emojiEl.textContent=cat.coverEmoji;

  /* Crear o reusar el botón del medio */
  playBtn = cover.querySelector('.portf-cover-play');
  if(!playBtn){
    playBtn=document.createElement('div');
    playBtn.className='portf-cover-play';
    playBtn.innerHTML=`<div class="portf-play-ring"></div><div class="portf-play-dot">▶ Ver demo</div>`;
    cover.appendChild(playBtn);
  }
  /* Actualizar handler para esta categoría (closure limpio) */
  playBtn.onclick=(function(c){ return function(){ openCatDemo(c); }; })(cat);

  /* Video detrás si existe — portada baja a tenue */
  if(cat.video){
    video.style.opacity='0';
    if(video.getAttribute('data-src')!==cat.video){
      video.setAttribute('data-src',cat.video);
      video.src=cat.video;
      video.load();
    }
    video.oncanplay=function(){
      try{ video.play().catch(()=>{}); }catch(e){}
      setTimeout(()=>{
        cover.style.opacity='0.18';
        cover.style.pointerEvents='none';   // clicks pasan al video
        // El play flotante queda encima del video visible
        playBtn.style.pointerEvents='auto';
        video.style.opacity='1';
        // Reinsertar playBtn fuera del cover para que quede encima del video
        const screen=document.getElementById('portfScreen');
        if(screen&&!screen.querySelector('.portf-cover-play')){
          playBtn.style.position='absolute';
          playBtn.style.bottom='22px';
          playBtn.style.left='50%';
          playBtn.style.transform='translateX(-50%)';
          playBtn.style.zIndex='5';
          screen.appendChild(playBtn);
        }
      },800);
    };
  } else {
    video.pause(); video.src=''; video.style.opacity='0';
    // Resetear posición del botón por si vino de un video anterior
    if(playBtn.style.position==='absolute'){
      playBtn.style.position=''; playBtn.style.bottom='';
      playBtn.style.left=''; playBtn.style.transform='';
      playBtn.style.zIndex='';
      cover.appendChild(playBtn);
    }
  }
}

/* Click en tabs */
tabs.addEventListener('click',function(e){
  const btn=e.target.closest('.ptab');
  if(!btn) return;
  const cat=cats.find(c=>c.id===btn.getAttribute('data-id'));
  if(cat) selectCat(cat);
});

/* Delegación para botón "Ver demo" en el panel info */
document.addEventListener('click',function(e){
  const btn=e.target.closest('.portf-open-demo');
  if(!btn) return;
  window.openDemo&&window.openDemo(btn.getAttribute('data-url'),btn.getAttribute('data-title'),btn);
});

/* Seleccionar primera al cargar */
selectCat(cats[0]);
})();
