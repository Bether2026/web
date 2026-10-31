/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · WEBS.JS (páginas de la sección web)
   Lo usan index, trabajos, planes y empezar: cada bloque se
   activa solo si su elemento existe en la página.
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

/* Si se llega con #ancla desde otra página, asegurar el salto cuando termina de cargar */
if(location.hash.length>1) addEventListener('load',()=>{ const t=document.getElementById(location.hash.slice(1)); if(t) t.scrollIntoView(); });

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
const filters=document.getElementById('filters');
if(filters) filters.addEventListener('click',e=>{
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

/* Los botones de plan llegan con ?plan=… y lo preseleccionan en el formulario */
const planSel=document.querySelector('select[name=plan]');
const planQ=new URLSearchParams(location.search).get('plan');
if(planSel&&planQ&&[...planSel.options].some(o=>o.value===planQ)) planSel.value=planQ;

/* ══ EFECTOS "WOW" ══════════════════════════════════════════ */
const REDUCED=matchMedia('(prefers-reduced-motion:reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const hero=document.getElementById('hero');

/* Entrada del hero (arranca enseguida, dura menos de 1 s) */
requestAnimationFrame(()=>hero.classList.add('ready'));

/* Nav oscuro mientras se ve el hero */
new IntersectionObserver(([e])=>nav.classList.toggle('on-dark',e.isIntersecting),
  {rootMargin:'-74px 0px 0px 0px'}).observe(hero);

/* Palabra que va cambiando en el título */
const rot=document.getElementById('rotator');
if(rot&&!REDUCED){
  const words=rot.dataset.words.split('|');
  let i=0;
  const paint=w=>{ rot.innerHTML=[...w].map((c,k)=>`<span class="ch" style="animation-delay:${k*.03}s">${c}</span>`).join(''); };
  paint(words[0]);
  setInterval(()=>{
    if(document.hidden) return;
    rot.classList.add('out');
    setTimeout(()=>{ rot.classList.remove('out'); i=(i+1)%words.length; paint(words[i]); },380);
  },2800);
}

/* Partículas doradas en el hero */
const cv=document.getElementById('heroFx');
if(cv&&!REDUCED){
  const x=cv.getContext('2d');
  const MOBILE=innerWidth<760, N=MOBILE?26:60, DPR=Math.min(devicePixelRatio||1,2);
  let W=0,H=0,mx=-999,my=-999,running=true;
  const size=()=>{ W=cv.offsetWidth; H=cv.offsetHeight; cv.width=W*DPR; cv.height=H*DPR; x.setTransform(DPR,0,0,DPR,0,0); };
  size(); addEventListener('resize',size,{passive:true});
  const P=Array.from({length:N},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.4,
    vx:(Math.random()-.5)*.18,vy:-(Math.random()*.25+.05),a:Math.random()*.6+.2,ph:Math.random()*6.28}));
  hero.addEventListener('pointermove',e=>{ const r=cv.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top; },{passive:true});
  hero.addEventListener('pointerleave',()=>{ mx=my=-999; });
  new IntersectionObserver(([e])=>{ running=e.isIntersecting; }).observe(hero);
  (function loop(){
    requestAnimationFrame(loop);
    if(!running||document.hidden) return;
    x.clearRect(0,0,W,H);
    for(const p of P){
      p.ph+=.02; p.x+=p.vx; p.y+=p.vy;
      const dx=p.x-mx, dy=p.y-my, d=Math.hypot(dx,dy);
      if(d<120){ p.x+=dx/d*1.2; p.y+=dy/d*1.2; }
      if(p.y<-10){ p.y=H+10; p.x=Math.random()*W; }
      if(p.x<-10) p.x=W+10; if(p.x>W+10) p.x=-10;
      const a=p.a*(.6+.4*Math.sin(p.ph));
      x.beginPath(); x.arc(p.x,p.y,p.r*3.5,0,6.28); x.fillStyle=`rgba(230,192,138,${a*.12})`; x.fill();
      x.beginPath(); x.arc(p.x,p.y,p.r,0,6.28); x.fillStyle=`rgba(241,216,168,${a})`; x.fill();
    }
  })();
}

/* Luz que sigue al mouse + escena 3D que se inclina */
const spot=document.getElementById('heroSpot'), deck=document.getElementById('deck');
if(FINE&&!REDUCED){
  if(deck) hero.addEventListener('pointermove',e=>{
    const r=hero.getBoundingClientRect();
    spot.style.left=(e.clientX-r.left)+'px'; spot.style.top=(e.clientY-r.top)+'px';
    const px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
    deck.style.setProperty('--ry',(-16+px*16)+'deg');
    deck.style.setProperty('--rx',(10-py*12)+'deg');
  },{passive:true});
  if(deck) hero.addEventListener('pointerleave',()=>{ deck.style.removeProperty('--ry'); deck.style.removeProperty('--rx'); });

  /* Botones magnéticos */
  document.querySelectorAll('.magnetic').forEach(b=>{
    b.addEventListener('pointermove',e=>{
      const r=b.getBoundingClientRect();
      b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`;
    });
    b.addEventListener('pointerleave',()=>{ b.style.transform=''; });
  });

  /* Tarjetas del portfolio: inclinación 3D + reflejo */
  document.querySelectorAll('.work').forEach(w=>{
    w.addEventListener('pointermove',e=>{
      const r=w.getBoundingClientRect(), px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
      w.classList.add('tilting');
      w.style.setProperty('--ty',((px-.5)*6)+'deg'); w.style.setProperty('--tx',((.5-py)*6)+'deg');
      w.style.setProperty('--gx',px*100+'%'); w.style.setProperty('--gy',py*100+'%');
    });
    w.addEventListener('pointerleave',()=>{ w.classList.remove('tilting'); w.style.setProperty('--ty','0deg'); w.style.setProperty('--tx','0deg'); });
  });
}

/* En celulares, la captura larga se recorre sola al aparecer */
if(!FINE){
  document.querySelectorAll('.scrollshot').forEach(s=>new IntersectionObserver(([e])=>s.classList.toggle('in-view',e.isIntersecting),{threshold:.4}).observe(s));
}

/* Manifiesto: se ilumina palabra por palabra con el scroll */
const man=document.getElementById('manifesto');
if(man){
  const wrapWords=node=>{
    [...node.childNodes].forEach(n=>{
      if(n.nodeType===3){
        const frag=document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(t=>{
          if(!t) return;
          if(/^\s+$/.test(t)){ frag.appendChild(document.createTextNode(t)); return; }
          const s=document.createElement('span'); s.className='w'; s.textContent=t; frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else wrapWords(n);
    });
  };
  wrapWords(man);
  const ws=[...man.querySelectorAll('.w')];
  if(REDUCED) ws.forEach(w=>w.classList.add('on'));
  else{
    const upd=()=>{
      const r=man.getBoundingClientRect();
      const p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.35)));
      const n=Math.round(p*ws.length);
      ws.forEach((w,k)=>w.classList.toggle('on',k<n));
    };
    addEventListener('scroll',upd,{passive:true}); upd();
  }
}

/* Antes / después arrastrable */
const ba=document.getElementById('ba'), baView=ba&&ba.querySelector('.ba__view'), baH=document.getElementById('baHandle');
if(ba){
  let drag=false, touched=false;
  const set=v=>{ v=Math.max(0,Math.min(100,v)); ba.style.setProperty('--pos',v+'%'); baH.setAttribute('aria-valuenow',Math.round(v)); };
  const fromX=cx=>{ const r=baView.getBoundingClientRect(); set((cx-r.left)/r.width*100); };
  baView.addEventListener('pointerdown',e=>{ drag=true; touched=true; baView.setPointerCapture(e.pointerId); fromX(e.clientX); });
  baView.addEventListener('pointermove',e=>{ if(drag) fromX(e.clientX); });
  baView.addEventListener('pointerup',()=>{ drag=false; });
  baView.addEventListener('pointercancel',()=>{ drag=false; });
  baH.addEventListener('keydown',e=>{
    const v=parseFloat(getComputedStyle(ba).getPropertyValue('--pos'))||50;
    if(e.key==='ArrowLeft'){ set(v-5); e.preventDefault(); }
    if(e.key==='ArrowRight'){ set(v+5); e.preventDefault(); }
  });
  /* Al aparecer, la línea hace un barrido para mostrar que se puede arrastrar */
  if(!REDUCED&&!matchMedia('(max-width:760px)').matches) new IntersectionObserver(([e],o)=>{
    if(!e.isIntersecting) return; o.disconnect();
    const t0=performance.now(), keys=[[0,50],[700,82],[1500,18],[2200,50]];
    (function step(now){
      if(touched) return;
      const t=now-t0; let k=0; while(k<keys.length-2&&t>keys[k+1][0]) k++;
      const [a,va]=keys[k],[b,vb]=keys[k+1], q=Math.min(1,(t-a)/(b-a)), ease=q<.5?2*q*q:1-Math.pow(-2*q+2,2)/2;
      set(va+(vb-va)*ease);
      if(t<keys[keys.length-1][0]) requestAnimationFrame(step);
    })(t0);
  },{threshold:.55}).observe(ba);
}

/* Formulario -> WhatsApp */
const form=document.getElementById('form');
if(form) form.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(e.target);
  const text=`Hola Bether! Soy ${d.get('nombre')}, de ${d.get('negocio')}.\nQuiero una página web. Plan: ${d.get('plan')}.\n${d.get('msg')||''}`.trim();
  open(waLink(text),'_blank');
});

/* ══ CELULAR ════════════════════════════════════════════════ */
const MOBILE=matchMedia('(max-width:760px)');

/* Hero: el celular va pasando por webs reales */
const mshow=document.getElementById('mshow');
if(mshow){
  const imgs=[...mshow.querySelectorAll('img')], dots=[...document.querySelectorAll('#mshowDots i')];
  const name=document.getElementById('mshowName'), tag=document.getElementById('mshowTag'), cap=name.parentElement;
  let i=0;
  const show=n=>{
    imgs[i].classList.remove('on'); dots[i].classList.remove('on');
    i=n; imgs[i].classList.add('on'); dots[i].classList.add('on');
    name.textContent=imgs[i].dataset.name; tag.textContent=imgs[i].dataset.tag;
    cap.classList.toggle('demo',/demo/i.test(imgs[i].dataset.tag));
  };
  if(!REDUCED) setInterval(()=>{ if(MOBILE.matches&&!document.hidden) show((i+1)%imgs.length); },3200);
}

/* Carruseles: puntitos que siguen al dedo; el de planes arranca en el recomendado */
document.querySelectorAll('[data-carousel]').forEach(c=>{
  const items=[...c.children], dots=document.createElement('div');
  dots.className='cdots'; dots.setAttribute('aria-hidden','true');
  dots.innerHTML=items.map(()=>'<i></i>').join('');
  c.after(dots);
  const sync=()=>{
    const mid=c.scrollLeft+c.clientWidth/2;
    let best=0, dist=Infinity;
    items.forEach((el,k)=>{ const d=Math.abs(el.offsetLeft+el.offsetWidth/2-mid); if(d<dist){ dist=d; best=k; } });
    [...dots.children].forEach((d,k)=>d.classList.toggle('on',k===best));
  };
  c.addEventListener('scroll',()=>requestAnimationFrame(sync),{passive:true});
  const hot=c.querySelector('.hot');
  const start=()=>{ if(MOBILE.matches&&hot) c.scrollLeft=hot.offsetLeft-(c.clientWidth-hot.offsetWidth)/2; sync(); };
  start(); addEventListener('load',start);
});

/* Antes / después con botón */
const baSw=document.querySelector('.ba__switch');
if(ba&&baSw){
  const btns=[...baSw.querySelectorAll('button')];
  let auto=true;
  const pick=w=>{ ba.style.setProperty('--pos',w==='after'?'100%':'0%'); btns.forEach(b=>b.classList.toggle('on',b.dataset.ba===w)); };
  btns.forEach(b=>b.addEventListener('click',()=>{ auto=false; pick(b.dataset.ba); }));
  /* Al aparecer arranca en "Antes" y a los segundos se transforma solo */
  if(MOBILE.matches){
    pick('before');
    new IntersectionObserver(([e],o)=>{
      if(!e.isIntersecting) return; o.disconnect();
      setTimeout(()=>{ if(auto) pick('after'); },1200);
    },{threshold:.6}).observe(ba);
  }
}

})();
