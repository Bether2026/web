/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · ANIMACIONES
   Partículas doradas + ripple al tocar — funciona en mobile.
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
const REDUCED = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
if(REDUCED) return;

const MOBILE = innerWidth < 760;

/* ── CANVAS ───────────────────────────────────────────────── */
const CV = document.createElement('canvas');
CV.id = 'bgParticles';
CV.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;will-change:transform';
document.body.prepend(CV);
const X = CV.getContext('2d', {alpha:true});
if(!X){ CV.remove(); return; }

function resize(){ CV.width=innerWidth; CV.height=innerHeight; }
resize();
addEventListener('resize', resize, {passive:true});

const GOLD = [[212,165,116],[230,192,138],[241,216,168],[255,235,200]];

/* ── PARTÍCULAS — más en mobile para compensar falta de orbs ─ */
const N = MOBILE ? 28 : 38;
const P = [];

function makeP(init){
  return {
    x: Math.random()*innerWidth,
    y: Math.random()*innerHeight,
    r: Math.random()*1.4+.4,
    c: GOLD[(Math.random()*GOLD.length)|0],
    a: 0,
    maxA: MOBILE ? Math.random()*.45+.18 : Math.random()*.22+.06,
    ph: Math.random()*Math.PI*2,
    sp: Math.random()*.008+.003,
    dx: (Math.random()-.5)*.09,
    dy: (Math.random()-.5)*.07,
    life: init ? (Math.random()*600)|0 : 0,
    lifeMax: Math.random()*520+280
  };
}
for(let i=0;i<N;i++) P.push(makeP(true));

/* ── RIPPLES ──────────────────────────────────────────────── */
const RIPPLES = [];

function addRipple(x, y){
  RIPPLES.push({
    x, y,
    r: 0,
    maxR: MOBILE ? 140 : 200,
    a: MOBILE ? 0.65 : 0.55
  });
}

/* Click en desktop */
document.addEventListener('click', function(e){
  if(e.target.closest('a,button,[data-demo]')) return;
  addRipple(e.clientX, e.clientY);
});

/* Touch en mobile — responde a CUALQUIER toque */
document.addEventListener('touchstart', function(e){
  const t = e.touches[0];
  addRipple(t.clientX, t.clientY);
}, {passive:true});

/* ── LOOP ─────────────────────────────────────────────────── */
let visible = true;
document.addEventListener('visibilitychange', ()=>{ visible = !document.hidden; });

(function loop(){
  requestAnimationFrame(loop);
  if(!visible) return;
  X.clearRect(0, 0, CV.width, CV.height);

  /* Partículas */
  for(let i=0;i<P.length;i++){
    const p=P[i];
    p.life++; p.ph+=p.sp; p.x+=p.dx; p.y+=p.dy;
    p.a = p.maxA * Math.sin(Math.PI*p.life/p.lifeMax) * (.5+.5*Math.sin(p.ph));
    if(p.life>=p.lifeMax){ P[i]=makeP(false); continue; }
    if(p.a<=0) continue;
    const[r,g,b]=p.c, gr=p.r*4.2;
    const gd=X.createRadialGradient(p.x,p.y,0,p.x,p.y,gr);
    gd.addColorStop(0,`rgba(${r},${g},${b},${p.a})`);
    gd.addColorStop(1,`rgba(${r},${g},${b},0)`);
    X.fillStyle=gd; X.beginPath(); X.arc(p.x,p.y,gr,0,Math.PI*2); X.fill();
    X.fillStyle=`rgba(${r},${g},${b},${Math.min(p.a*3.5,.65)})`;
    X.beginPath(); X.arc(p.x,p.y,p.r,0,Math.PI*2); X.fill();
  }

  /* Ripples */
  for(let i=RIPPLES.length-1;i>=0;i--){
    const rp=RIPPLES[i];
    rp.r += MOBILE ? 7 : 7;
    rp.a -= 0.016;
    if(rp.a<=0||rp.r>=rp.maxR){ RIPPLES.splice(i,1); continue; }

    /* Anillo principal */
    X.beginPath();
    X.arc(rp.x,rp.y,rp.r,0,Math.PI*2);
    X.strokeStyle=`rgba(212,165,116,${rp.a})`;
    X.lineWidth = MOBILE ? 1.8 : 1.5;
    X.stroke();

    /* Glow central */
    const gd2=X.createRadialGradient(rp.x,rp.y,0,rp.x,rp.y,rp.r*.6);
    gd2.addColorStop(0,`rgba(212,165,116,${rp.a*.18})`);
    gd2.addColorStop(1,`rgba(212,165,116,0)`);
    X.fillStyle=gd2; X.beginPath(); X.arc(rp.x,rp.y,rp.r*.6,0,Math.PI*2); X.fill();

    /* Segundo anillo tenue */
    if(rp.r>24){
      X.beginPath();
      X.arc(rp.x,rp.y,rp.r*.65,0,Math.PI*2);
      X.strokeStyle=`rgba(241,216,168,${rp.a*.35})`;
      X.lineWidth=.8;
      X.stroke();
    }
  }
})();

})();
