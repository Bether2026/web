/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · WEBS.JS (portada de páginas web)
   El número de WhatsApp sale de content.js (negocio.whatsapp).
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
const C=window.CONTENT;
const WA=C?C.negocio.whatsapp:'';
const waLink=text=>'https://wa.me/'+WA+'?text='+encodeURIComponent(text);

document.documentElement.classList.add('js');
document.getElementById('year').textContent=new Date().getFullYear();

/* Links de WhatsApp */
document.querySelectorAll('[data-wa]').forEach(a=>{
  a.href=waLink(a.getAttribute('data-wa'));
  a.target='_blank'; a.rel='noopener';
});

/* Nav */
const nav=document.getElementById('nav');
const burger=document.getElementById('navBurger');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>10),{passive:true});
burger.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  burger.setAttribute('aria-expanded',open);
});
document.querySelectorAll('#navLinks a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open'); burger.setAttribute('aria-expanded','false');
}));

/* Reveals */
const rvs=document.querySelectorAll('.rv');
if(!('IntersectionObserver' in window)){ rvs.forEach(el=>el.classList.add('in')); }
else{
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  }),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  rvs.forEach(el=>io.observe(el));
}

/* Filtros del portfolio */
document.getElementById('filters').addEventListener('click',e=>{
  const chip=e.target.closest('.chip'); if(!chip) return;
  document.querySelectorAll('.chip').forEach(c=>c.classList.toggle('active',c===chip));
  const f=chip.dataset.f;
  document.querySelectorAll('.work').forEach(w=>{
    w.style.display=(f==='all'||w.dataset.cat===f)?'':'none';
    w.classList.toggle('featured',f==='all'&&w.dataset.cat==='educacion');
  });
});

/* Rubros: abren WhatsApp pidiendo una demo */
document.querySelectorAll('.rubro').forEach(b=>b.addEventListener('click',()=>{
  open(waLink(`Hola Bether! Tengo ${b.dataset.rubro} y me gustaría ver una demo de cómo quedaría mi web.`),'_blank');
}));

/* Precios mensual / anual */
const fmt=n=>'$'+n.toLocaleString('es-AR');
document.querySelectorAll('.billing button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.billing button').forEach(x=>x.classList.toggle('active',x===b));
  const yearly=b.dataset.bill==='y';
  document.querySelectorAll('.price').forEach(p=>{
    const m=+p.dataset.m;
    p.innerHTML=yearly?`${fmt(Math.round(m*10/12))} <small>/mes, pago anual</small>`:`${fmt(m)} <small>/mes</small>`;
  });
}));

/* Botones de plan: preseleccionan el plan en el formulario */
document.querySelectorAll('[data-plan]').forEach(a=>a.addEventListener('click',()=>{
  document.querySelector('select[name=plan]').value=a.dataset.plan;
}));

/* Formulario -> WhatsApp */
document.getElementById('form').addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(e.target);
  const text=`Hola Bether! Soy ${d.get('nombre')}, de ${d.get('negocio')}.\nQuiero una página web. Plan: ${d.get('plan')}.\n${d.get('msg')||''}`.trim();
  open(waLink(text),'_blank');
});

})();
