/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · PRECIOS.JS
   Selector de tipo de evento → filtra los planes.
   Garantía en cada card. Tabla con columna Esencial.
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
const C=window.CONTENT, B=window.BETHER;
if(!C||!B) return;

/* ── SELECTOR DE TIPO DE EVENTO ──────────────────────────── */
const filtros = [
  { id:'todos',       label:'Todos' },
  { id:'infantil',    label:'Cumpleaños infantil' },
  { id:'casamiento',  label:'Casamiento' },
  { id:'quinceanera', label:'Quinceañera' },
  { id:'otro',        label:'Otro evento' }
];

const filterWrap = document.getElementById('planFiltros');
if(filterWrap){
  filterWrap.innerHTML = filtros.map((f,i)=>
    `<button class="plan-filtro${i===0?' plan-filtro--active':''}" data-filtro="${f.id}">${f.label}</button>`
  ).join('');
}

function renderPlanes(filtro){
  const pg = document.getElementById('planesGrid');
  if(!pg) return;
  const visibles = filtro==='todos'
    ? C.planes
    : C.planes.filter(p=>p.categorias&&p.categorias.includes(filtro));

  pg.innerHTML = visibles.map((p,i)=>`
    <div class="plan-card rv d${i}${p.highlight?' plan-card--highlight':''}">
      ${p.badge?`<div class="plan-card__badge">${p.badge}</div>`:''}
      <div class="plan-card__name">${p.nombre}</div>
      <div class="plan-card__price">${p.precio}</div>
      <div class="plan-card__sub">${p.subtitulo}</div>
      <ul class="plan-card__features">
        ${p.features.map(f=>`<li><span>✓</span>${f}</li>`).join('')}
      </ul>
      ${p.garantia?`<div class="plan-card__garantia">${p.garantia}</div>`:''}
      <a href="${B.waLink('Hola Bether 👋 Quiero consultar el plan '+p.nombre+' ('+p.precio+')')}"
         class="btn ${p.highlight?'btn--gold':'btn--ghost'}" target="_blank" rel="noopener">${p.cta}</a>
    </div>`).join('');

  if(window.BETHER.initReveals) window.BETHER.initReveals();
}

/* Click en filtros */
if(filterWrap){
  filterWrap.addEventListener('click', function(e){
    const btn = e.target.closest('.plan-filtro');
    if(!btn) return;
    filterWrap.querySelectorAll('.plan-filtro').forEach(b=>b.classList.remove('plan-filtro--active'));
    btn.classList.add('plan-filtro--active');
    renderPlanes(btn.getAttribute('data-filtro'));
  });
}
renderPlanes('todos');

/* ── A MEDIDA TAGS ────────────────────────────────────────── */
const at = document.getElementById('amedidaTags');
if(at) at.innerHTML=['Temática exclusiva','Video personalizado','Armado de mesa','Links personalizados','Música a medida','Panel completo']
  .map(t=>`<span class="amedida-tag">${t}</span>`).join('');

/* ── TABLA DE COMPARACIÓN (4 columnas) ───────────────────── */
const tb = document.getElementById('tablaComp');
if(tb){
  const f = C.comparacion.filas;
  tb.innerHTML=`
    <thead><tr>
      <th>Característica</th>
      <th>Esencial</th>
      <th>Básico</th>
      <th class="th-highlight">Premium ★</th>
      <th>Elite</th>
    </tr></thead>
    <tbody>${f.map(r=>`<tr>
      <td>${r.label}</td>
      ${['esencial','basico','premium','elite'].map(k=>`<td class="${k==='premium'?'td-highlight':''}">${
        r[k]===true  ? '<span class="check">✓</span>'
        :r[k]===false? '<span class="dash">—</span>'
        :r[k]
      }</td>`).join('')}
    </tr>`).join('')}
    </tbody>`;
}

/* ── PROCESO MINI ─────────────────────────────────────────── */
const pm = document.getElementById('procesoMini');
if(pm) pm.innerHTML=C.proceso.map((p,i)=>`
  <div class="proceso-mini__step">
    <span class="proceso-mini__icon">${p.icon}</span>
    <div class="proceso-mini__body"><b>${p.titulo}</b><span>${p.desc}</span></div>
  </div>${i<C.proceso.length-1?'<span class="proceso-mini__arrow">→</span>':''}`).join('');

/* ── FAQ ──────────────────────────────────────────────────── */
const fq = document.getElementById('faqGrid');
if(fq){
  fq.innerHTML=C.faq.map((item,i)=>`
    <div class="faq-item rv d${i%4}">
      <button class="faq-q" aria-expanded="false">${item.q}<span class="faq-icon">+</span></button>
      <div class="faq-a">${item.a}</div>
    </div>`).join('');
  fq.addEventListener('click',function(e){
    const btn=e.target.closest('.faq-q');
    if(!btn) return;
    const item=btn.closest('.faq-item');
    const open=item.classList.contains('open');
    fq.querySelectorAll('.faq-item.open').forEach(it=>{
      it.classList.remove('open');
      it.querySelector('.faq-q').setAttribute('aria-expanded','false');
    });
    if(!open){ item.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
  });
}

/* ── TESTIMONIO HERO ──────────────────────────────────────── */
const heroTest = document.getElementById('preciosTestimonio');
if(heroTest){
  heroTest.innerHTML=`<em>"Llegué al salón con todo resuelto desde el celular"</em> — Carolina, quince de Valentina`;
}

if(window.BETHER.initReveals) window.BETHER.initReveals();
})();
