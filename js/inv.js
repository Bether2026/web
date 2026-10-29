/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · INV.JS (páginas de invitaciones)
   Se carga ANTES de webs.js: arma con los datos de content.js lo
   que cada página necesita, y webs.js después conecta los links
   de WhatsApp y las animaciones de entrada.
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
const C=window.CONTENT; if(!C) return;
const $=s=>document.querySelector(s);
const REDUCED=matchMedia('(prefers-reduced-motion:reduce)').matches;
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const waLink=t=>'https://wa.me/'+C.negocio.whatsapp+'?text='+encodeURIComponent(t);

/* Pantalla de una categoría dentro de un teléfono */
const screenHTML=cat=>{
  if(cat.pantalla==='xv') return '<div class="scr-xv"><small>Una invitación especial para vos</small><b>Betiana</b><em>· XV ·</em><span>15 de agosto</span></div>';
  if(cat.pantalla==='medida') return '<div class="scr-medida"><span>✨</span></div>';
  return `<img src="${cat.img}" alt="Portada de la invitación de ${esc(cat.label)}" loading="lazy">`;
};
const phoneHTML=(inner,extra='')=>`<div class="phone__screen">${inner}</div><span class="phone__notch"></span><span class="phone__glare"></span>${extra}`;

/* ── Modal con la demo jugable ─────────────────────────── */
let modal=null;
function openDemo(url,title){
  if(!url) return;
  if(!modal){
    modal=document.createElement('div');
    modal.className='demo-modal'; modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true');
    modal.innerHTML=`<button class="demo-modal__x" aria-label="Cerrar">✕</button>
      <div class="phone">${phoneHTML('<iframe title="Demo de invitación" allow="autoplay; fullscreen" allowfullscreen></iframe>')}</div>
      <p class="demo-modal__label"></p>`;
    document.body.appendChild(modal);
    modal.querySelector('.demo-modal__x').onclick=closeDemo;
    modal.addEventListener('click',e=>{ if(e.target===modal) closeDemo(); });
    addEventListener('keydown',e=>{ if(e.key==='Escape') closeDemo(); });
  }
  modal.querySelector('iframe').src=url;
  modal.querySelector('.demo-modal__label').textContent=(title||'Demo')+' · navegala como un invitado';
  requestAnimationFrame(()=>modal.classList.add('open'));
  document.body.style.overflow='hidden';
  modal.querySelector('.demo-modal__x').focus();
}
function closeDemo(){
  if(!modal||!modal.classList.contains('open')) return;
  modal.classList.remove('open');
  document.body.style.overflow='';
  setTimeout(()=>{ modal.querySelector('iframe').src='about:blank'; },350);
}
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-demo]'); if(!t) return;
  e.preventDefault(); openDemo(t.dataset.demo,t.dataset.title);
});

/* ── Portada: teléfonos del hero y tarjetas de celebraciones ── */
document.querySelectorAll('[data-cat-phone]').forEach(el=>{
  const cat=C.categorias.find(c=>c.id===el.dataset.catPhone); if(!cat) return;
  const play=cat.demo?'<span class="phone__play"><i>▶</i>Tocá y jugá</span>':'';
  el.innerHTML=phoneHTML(screenHTML(cat),el.hasAttribute('data-play')?play:'');
  if(cat.demo&&el.tagName==='BUTTON'){ el.dataset.demo=cat.demo; el.dataset.title=cat.titulo; el.setAttribute('aria-label','Abrir demo: '+cat.titulo); }
});

/* ── Historia "Así se vive" ────────────────────────────── */
const stage=$('#storyStage');
if(stage){
  const scrs=[...stage.querySelectorAll('.scr')];
  const steps=[...document.querySelectorAll('.sstep')];
  const show=i=>{
    stage.dataset.step=i;
    scrs.forEach((s,k)=>s.classList.toggle('on',k===i));
    steps.forEach((s,k)=>s.classList.toggle('on',k===i));
  };
  show(0);
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) show(steps.indexOf(e.target)); }),
    {rootMargin:'-45% 0px -45% 0px'});
  steps.forEach(s=>io.observe(s));

  /* Cuenta regresiva que corre de verdad (a 23 días de hoy) */
  const target=Date.now()+((23*24+14)*60+5)*60000;
  const cd=stage.querySelectorAll('.cd b');
  const tick=()=>{
    const ms=Math.max(0,target-Date.now()), s=Math.floor(ms/1000);
    const v=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];
    cd.forEach((b,k)=>b.textContent=String(v[k]).padStart(2,'0'));
  };
  if(cd.length){ tick(); setInterval(tick,1000); }

  /* Confeti de la confirmación */
  const conf=stage.querySelector('.confetti');
  if(conf&&!REDUCED){
    const cols=['#f472b6','#a78bfa','#facc15','#34d399','#e6c08a','#60a5fa'];
    conf.innerHTML=Array.from({length:36},(_,i)=>`<i style="left:${Math.random()*100}%;background:${cols[i%cols.length]};animation-delay:${1+Math.random()*.6}s;transform:rotate(${Math.random()*180}deg)"></i>`).join('');
  }
}

/* ── Ejemplos: selector + demo jugable dentro del teléfono ── */
const show=$('#show');
if(show){
  const tabs=$('#catTabs'), info=$('#showInfo'), ph=$('#showPhone'), st=$('#showStage');
  tabs.innerHTML=C.categorias.map(c=>`<button data-id="${c.id}" role="tab">${c.emoji} ${esc(c.label)}</button>`).join('');
  function pick(id,push){
    const cat=C.categorias.find(c=>c.id===id)||C.categorias[0];
    tabs.querySelectorAll('button').forEach(b=>{ const on=b.dataset.id===cat.id; b.classList.toggle('active',on); b.setAttribute('aria-selected',on); });
    st.style.setProperty('--glow',`radial-gradient(circle,${cat.glow},transparent 65%)`);
    const wa=`Hola Bether 👋 Vi el ejemplo de ${cat.label} y quiero una invitación así.`;
    info.innerHTML=`<span class="eyebrow">${cat.emoji} ${esc(cat.label)}</span>
      <h2>${esc(cat.titulo)}</h2><p>${esc(cat.desc)}</p>
      <div class="show__feats">${cat.feats.map(f=>`<span>${esc(f)}</span>`).join('')}</div>
      <div class="show__btns">
        ${cat.demo?`<a href="${cat.demo}" target="_blank" rel="noopener" class="btn btn--dark">Abrir en pantalla completa ↗</a>`:''}
        <a href="${waLink(wa)}" target="_blank" rel="noopener" class="btn btn--ghost">Quiero una así</a>
      </div>`;
    ph.innerHTML=phoneHTML(screenHTML(cat),cat.demo?'<span class="phone__play"><i>▶</i>Jugar acá</span>':'');
    ph.dataset.demo=cat.demo||'';
    ph.setAttribute('aria-label',cat.demo?'Jugar la demo de '+cat.titulo:cat.titulo);
    $('#showHint').textContent=cat.demo?'Tocá el teléfono y navegala como un invitado':'Contanos tu idea y la hacemos realidad';
    if(!REDUCED){ show.classList.remove('swap'); void show.offsetWidth; show.classList.add('swap'); }
    if(push) history.replaceState(null,'','#'+cat.id);
  }
  tabs.addEventListener('click',e=>{ const b=e.target.closest('button'); if(b) pick(b.dataset.id,true); });
  /* El teléfono carga la demo adentro (sin abrir el modal) */
  ph.addEventListener('click',e=>{
    e.stopPropagation(); e.preventDefault();
    const url=ph.dataset.demo; if(!url||ph.querySelector('iframe')) return;
    const sc=ph.querySelector('.phone__screen');
    sc.innerHTML='<div class="loader">Cargando…</div><iframe title="Demo" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    const fr=sc.querySelector('iframe'); fr.onload=()=>{ const l=sc.querySelector('.loader'); if(l) l.remove(); };
    fr.src=url; ph.querySelector('.phone__play')?.remove();
  },true);
  pick(location.hash.slice(1),false);
}

/* ── Precios ───────────────────────────────────────────── */
const plans=$('#plans');
if(plans){
  plans.innerHTML=C.planes.map(p=>`<div class="plan${p.highlight?' hot':''} rv">
      ${p.badge?`<span class="tag">${esc(p.badge)}</span>`:''}
      <h3>${esc(p.nombre)}</h3>
      <p class="for">${esc(p.subtitulo)}</p>
      <div class="price">${esc(p.precio.replace(/^Desde\s*/,''))}</div>
      <p class="setup">por invitación · pago único</p>
      <ul>${p.features.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>
      <a href="contacto.html?plan=${encodeURIComponent(p.nombre)}#pedido" class="btn ${p.highlight?'btn--gold':'btn--outline'}">Pedir ${esc(p.nombre)}</a>
    </div>`).join('');
  const cmp=$('#compareBody');
  if(cmp){
    const ids=C.planes.map(p=>p.id), hot=C.planes.findIndex(p=>p.highlight);
    $('#compareHead').innerHTML='<th>Incluye</th>'+C.planes.map((p,i)=>`<th${i===hot?' class="hot"':''}>${esc(p.nombre)}</th>`).join('');
    cmp.innerHTML=C.comparacion.filas.map(f=>'<tr><td>'+esc(f.label)+'</td>'+ids.map(id=>{
      const v=f[id]; return v===true?'<td class="y">✓</td>':v===false?'<td class="n">—</td>':`<td>${esc(v)}</td>`;
    }).join('')+'</tr>').join('');
  }
}
const faq=$('#faqList');
if(faq) faq.innerHTML=C.faq.map((f,i)=>`<details${i===0?' open':''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');

/* ── Pedido: formulario que arma el mensaje de WhatsApp ── */
const form=$('#invForm');
if(form){
  const ct=C.contacto;
  const opts=(name,list)=>list.map(o=>`<option>${esc(o)}</option>`).join('');
  form.querySelector('[name=tipo]').insertAdjacentHTML('beforeend',opts('tipo',ct.tiposEvento));
  form.querySelector('[name=plan]').innerHTML=opts('plan',ct.planes);
  form.querySelector('[name=fuente]').insertAdjacentHTML('beforeend',opts('fuente',ct.fuentes));
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(form), v=k=>(d.get(k)||'').trim();
    let t='Hola Bether 👋 Quiero pedir mi demo de invitación.\n';
    t+='• Nombre: '+v('nombre')+'\n';
    if(v('tipo'))     t+='• Evento: '+v('tipo')+'\n';
    if(v('tematica')) t+='• Temática: '+v('tematica')+'\n';
    if(v('fecha'))    t+='• Fecha: '+v('fecha')+'\n';
    if(v('plan')&&v('plan')!=='No sé todavía') t+='• Plan: '+v('plan')+'\n';
    if(v('msg'))      t+='• Más info: '+v('msg')+'\n';
    if(v('fuente'))   t+='• Cómo nos conoció: '+v('fuente');
    open(waLink(t.trim()),'_blank','noopener');
  });
}

})();
