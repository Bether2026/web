/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · ANIMACIONES
   1. Partículas doradas en canvas (fondo sutil)
   2. Ripple de click: aura que se expande desde donde tocás
   3. Mouse trail dorado (solo desktop con mouse real)
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
const MOBILE  = innerWidth < 760;
const FINE    = window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches;

if(REDUCED) return;

/* ── CANVAS PRINCIPAL (partículas + ripples + trail) ─────── */
const CV = document.createElement('canvas');
CV.id = 'bgParticles';
CV.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;will-change:transform';
document.body.prepend(CV);
const X = CV.getContext('2d',{alpha:true});
if(!X){ CV.remove(); return; }

function resize(){ CV.width=innerWidth; CV.height=innerHeight; }
resize();
addEventListener('resize',resize,{passive:true});

/* ── Colores ─────────────────────────────────────────────── */
const GOLD = [[212,165,116],[230,192,138],[241,216,168],[255,235,200]];

/* ── PARTÍCULAS ──────────────────────────────────────────── */
const N = MOBILE ? 18 : 38;
const P = [];

function makeP(init){
  return {
    x:Math.random()*innerWidth, y:Math.random()*innerHeight,
    r:Math.random()*1.2+.35,
    c:GOLD[(Math.random()*GOLD.length)|0],
    a:0, maxA:Math.random()*.22+.06,
    ph:Math.random()*Math.PI*2, sp:Math.random()*.008+.003,
    dx:(Math.random()-.5)*.08, dy:(Math.random()-.5)*.07,
    life:init?(Math.random()*600)|0:0,
    lifeMax:Math.random()*520+280
  };
}
for(let i=0;i<N;i++) P.push(makeP(true));

/* ── RIPPLES (efecto click) ──────────────────────────────── */
const RIPPLES = [];

function addRipple(x,y){
  RIPPLES.push({ x, y, r:0, maxR: MOBILE?120:200, a:0.55, dead:false });
}

/* Click y touch */
document.addEventListener('click', function(e){
  // No ripple sobre botones/links para no confundir
  if(e.target.closest('a,button,[data-demo]')) return;
  addRipple(e.clientX, e.clientY);
});
document.addEventListener('touchend', function(e){
  const t=e.changedTouches[0];
  if(e.target.closest('a,button,[data-demo]')) return;
  addRipple(t.clientX, t.clientY);
},{passive:true});

/* ── MOUSE TRAIL ─────────────────────────────────────────── */
const TRAIL = [];
if(FINE){
  document.addEventListener('mousemove',function(e){
    mx=e.clientX; my=e.clientY;
    if(Math.hypot(mx-lastMx,my-lastMy)>14){
      lastMx=mx; lastMy=my;
      const c=GOLD[(Math.random()*GOLD.length)|0];
      TRAIL.push({ x:mx,y:my,r:Math.random()*2+1,c,a:.45,decay:.025 });
      if(TRAIL.length>28) TRAIL.shift();
    }
  },{passive:true});
}

/* ── LOOP ────────────────────────────────────────────────── */
let visible=true;
document.addEventListener('visibilitychange',()=>{ visible=!document.hidden; });

(function loop(){
  requestAnimationFrame(loop);
  if(!visible) return;
  X.clearRect(0,0,CV.width,CV.height);

  /* Partículas */
  for(let i=0;i<P.length;i++){
    const p=P[i];
    p.life++; p.ph+=p.sp; p.x+=p.dx; p.y+=p.dy;
    p.a=p.maxA*Math.sin(Math.PI*p.life/p.lifeMax)*(.5+.5*Math.sin(p.ph));
    if(p.life>=p.lifeMax){ P[i]=makeP(false); continue; }
    if(p.a<=0) continue;
    const[r,g,b]=p.c, gr=p.r*4.2;
    const gd=X.createRadialGradient(p.x,p.y,0,p.x,p.y,gr);
    gd.addColorStop(0,`rgba(${r},${g},${b},${p.a})`);
    gd.addColorStop(1,`rgba(${r},${g},${b},0)`);
    X.fillStyle=gd; X.beginPath(); X.arc(p.x,p.y,gr,0,Math.PI*2); X.fill();
    X.fillStyle=`rgba(${r},${g},${b},${Math.min(p.a*3,.6)})`;
    X.beginPath(); X.arc(p.x,p.y,p.r,0,Math.PI*2); X.fill();
  }

  /* Ripples */
  for(let i=RIPPLES.length-1;i>=0;i--){
    const rp=RIPPLES[i];
    rp.r += MOBILE?5:7;
    rp.a -= 0.018;
    if(rp.a<=0){ RIPPLES.splice(i,1); continue; }
    /* Anillo exterior */
    X.beginPath();
    X.arc(rp.x,rp.y,rp.r,0,Math.PI*2);
    X.strokeStyle=`rgba(212,165,116,${rp.a*.7})`;
    X.lineWidth=1.5;
    X.stroke();
    /* Glow central que se desvanece */
    const gd2=X.createRadialGradient(rp.x,rp.y,0,rp.x,rp.y,rp.r*.55);
    gd2.addColorStop(0,`rgba(212,165,116,${rp.a*.12})`);
    gd2.addColorStop(1,`rgba(212,165,116,0)`);
    X.fillStyle=gd2; X.beginPath(); X.arc(rp.x,rp.y,rp.r*.55,0,Math.PI*2); X.fill();
    /* Segundo anillo más tenue */
    if(rp.r>30){
      X.beginPath();
      X.arc(rp.x,rp.y,rp.r*.7,0,Math.PI*2);
      X.strokeStyle=`rgba(230,192,138,${rp.a*.4})`;
      X.lineWidth=.8;
      X.stroke();
    }
    if(rp.r>=rp.maxR){ RIPPLES.splice(i,1); }
  }

  })();

})();
