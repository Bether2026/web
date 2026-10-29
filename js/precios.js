(function(){
'use strict';
const C=window.CONTENT, B=window.BETHER;
if(!C||!B) return;

/* Features resumidas debajo del precio grande */
const pf=document.getElementById('precioFeatures');
if(pf){
  const items=['🔗 Link con nombre propio','🎮 Mini-juego temático','🎵 Música con IA','📊 Panel de confirmados','🎬 Video personalizado','⏳ Countdown en vivo','🗺️ Mapas integrados','✅ RSVP desde la invitación'];
  pf.innerHTML=items.map(f=>`<span class="precio-feat">${f}</span>`).join('');
}

/* Qué incluye — detalle completo */
const pi=document.getElementById('precioIncludes');
if(pi){
  const includes=[
    {emoji:'🔗',titulo:'Link personalizado por invitado',desc:'Cada invitado recibe su propio link con su nombre. Sin descarga, sin app.'},
    {emoji:'🎮',titulo:'Mini-juego o trivia temática',desc:'Canvas interactivo con la temática del evento. Tus invitados juegan antes de llegar.'},
    {emoji:'🎵',titulo:'Música con IA',desc:'Audio temático generado con IA y sugerencias de playlist para la fiesta.'},
    {emoji:'📊',titulo:'Panel de control en tiempo real',desc:'Quién confirmó, quién no, desde tu celular. Sin planillas, sin Excel.'},
    {emoji:'🎬',titulo:'Video personalizado',desc:'Un video único dentro de la invitación, con fotos y música del evento.'},
    {emoji:'⏳',titulo:'Countdown en vivo',desc:'Días, horas y minutos actualizados en tiempo real hasta el gran momento.'},
    {emoji:'🗺️',titulo:'Mapas integrados',desc:'Google Maps, Waze y Apple Maps. Un tap y el GPS arranca directo al salón.'},
    {emoji:'✅',titulo:'RSVP desde la invitación',desc:'Confirmación con GIF personalizado y opción de agregar al calendario.'},
  ];
  pi.innerHTML=includes.map(f=>`
    <div class="include-card rv">
      <div class="include-card__emoji">${f.emoji}</div>
      <div>
        <div class="include-card__title">${f.titulo}</div>
        <div class="include-card__desc">${f.desc}</div>
      </div>
    </div>`).join('');
}

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

/* FAQ */
const fq=document.getElementById('faqGrid');
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

if(window.BETHER.initReveals) window.BETHER.initReveals();
})();
