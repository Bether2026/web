/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · CONTENIDO EDITABLE
   ✏️  Editá acá, hacé push. Sin tocar HTML.
═══════════════════════════════════════════════════════════ */
const CONTENT = {

  negocio: {
    nombre:    "Bether Studio",
    tagline:   "Invitaciones digitales interactivas que convierten un link en algo que nadie olvida.",
    whatsapp:  "5491145309135",
    instagram: "betherstudio",
    email:     "hola@betherstudio.com.ar",
    ciudad:    "Buenos Aires, Argentina",
    mensajeWA: "Hola Bether 👋 Quiero pedir presupuesto para una invitación digital."
  },

  hero: {
    eyebrow:       "Buenos Aires · Disponible ahora",
    titulo:        "No son solo invitaciones. Son <em>experiencias.</em>",
    subtitulo:     "Cada invitado recibe <strong>su propio link con su nombre</strong>. Lo abre y empieza la experiencia. Sin app, sin descarga, sin límites.",
    pills:         ["🔗 Link personalizado","📊 Panel de control","🎬 Video con IA","🪑 Armado de mesa","🎮 Mini-juego"],
    ctaPrimario:   "Ver experiencias",
    ctaPrimarioHref: "portfolio.html",
    ctaSecundario: "WhatsApp",
    stats: [
      { n:"+50",  l:"Experiencias" },
      { n:"24hs", l:"Entrega" },
      { n:"100%", l:"Recomendación" },
      { n:"∞",    l:"Temáticas" }
    ],
    demo: {
      titulo:   "Cumple de Agustín",
      emojis:   "🍄⭐🪙",
      url:      "https://bether2026.github.io/MarioBross/",
      hintMobile: "Tocá y viví la experiencia",
      hintDesktop:"Hacé clic y viví la experiencia"
    }
  },

  marquee: ["Casamientos","Quinceañeras","Bautismos","Infantiles","Para adultos",
            "Personajes favoritos","Mario Bros","Frozen","Spiderman",
            "Dinosaurios","Minecraft","Encanto"],

  proof: [
    { icon:"★★★★★", bold:"5.0", txt:"Google" },
    { bold:"+50", txt:"familias felices" },
    { bold:"100%", txt:"recomendación" },
    { txt:"Entrega ", bold:"24–48 hs" }
  ],

  /* BENTO — features incluidas */
  features: [
    { titulo:"Link con nombre propio — generado automáticamente",
      desc:"Cada invitado recibe su propio link único con su nombre. No es solo una invitación, es un gesto. Sin descarga, sin app.",
      tag:"Exclusivo Bether", wide:true,
      visual:"<div style='font-size:2.8rem;text-align:center;padding:16px 0'>🔗<br><span style='font-size:.75rem;color:rgba(255,255,255,.4);font-family:monospace'>bether.app/cumple/valentina</span></div>"
    },
    { titulo:"Panel en tiempo real",        desc:"Quién confirmó, quién no, qué puntaje hicieron. Todo desde tu celular.",      tag:"En vivo",         icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-5"/></svg>' },
    { titulo:"Video personalizado con IA",  desc:"Un video único dentro de la invitación, con música generada por IA.",          tag:"Con IA",           icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>' },
    { titulo:"Armado de mesa inteligente + lista para el salón",
      desc:"Acomodás a tus invitados según el salón. La lista queda lista. Sin estrés, sin papeles.",
      tag:"Organización total", wide:true,
      icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
    },
    { titulo:"Mini-juego o trivia temática", desc:"Canvas interactivo con la temática. Tus invitados juegan antes de llegar.",   tag:"Interactivo",     icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="6" y2="12" stroke-width="3"/><line x1="10" y1="12" x2="10" y2="12" stroke-width="3"/><circle cx="17" cy="12" r="2"/></svg>' },
    { titulo:"Música + sugerencias playlist", desc:"Audio temático con IA y sugerencias de canciones para la playlist del evento.", tag:"Con IA",          icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>' },
    { titulo:"Countdown en vivo",           desc:"Días, horas, minutos y segundos. Se actualiza solo.",                           tag:"Tiempo real",     icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>' },
    { titulo:"Mapas integrados",            desc:"Google Maps, Waze y Apple Maps. Un tap y el GPS abre directo al salón.",        tag:"Sin fricción",    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' },
    { titulo:"RSVP + calendario",           desc:"Confirmación con GIF personalizado y un tap para agregar al calendario.",        tag:"Elegante",        icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' }
  ],

  proceso: [
    { num:"01", icon:"💬", titulo:"Nos contás la idea",
      desc:"Escribinos por WhatsApp o el formulario. Temática, fecha, tipo de evento. Sin compromiso." },
    { num:"02", icon:"✨", titulo:"En 24–48 hs te enviamos el demo",
      desc:"Creamos una preview completa. La ves funcionando en tu celular antes de abonar. Si no te convence, no pagás nada.",
      sub:"Sin cargo · Sin compromiso" },
    { num:"03", icon:"🚀", titulo:"Si te gusta, abonás y listo",
      desc:"Elegís el plan, abonás y habilitamos el link definitivo. Tus invitados reciben la experiencia en minutos.",
      sub:"Tu evento, tu experiencia" }
  ],

  /* PORTFOLIO — categorías para el selector interactivo */
  categorias: [
    { id:"infantil",   label:"Infantil",    video:"https://r2.betherstudio.com/previews/infantil.mp4",
      demo:"https://bether2026.github.io/MarioBross/",
      coverEmoji:"🎮", coverBg:"linear-gradient(160deg,#0d1f35,#1a4a7a 45%,#d63a2f 75%,#3a8a2a)",
      titulo:"Experiencias infantiles", desc:"Mario Bros, Frozen, Spiderman, Dinosaurios, Minecraft y la que se te ocurra." },
    { id:"casamiento", label:"Casamiento",  video:"https://r2.betherstudio.com/previews/casamiento.mp4",
      demo:"",
      coverEmoji:"💍", coverBg:"linear-gradient(160deg,#141009,#3d2b14 50%,#d4a574)",
      titulo:"Casamientos con clase",   desc:"Elegancia, emoción y cada detalle en su lugar. Link personalizado por invitado." },
    { id:"quinceanera",label:"Quinceañera", video:"https://r2.betherstudio.com/previews/quinceanera.mp4",
      demo:"",
      coverEmoji:"👑", coverBg:"linear-gradient(160deg,#1a0b2e,#5b21b6 55%,#d4a574)",
      titulo:"Quinceañeras únicas",     desc:"La noche más especial merece la invitación más especial." },
    { id:"medida",     label:"A medida",    video:"https://r2.betherstudio.com/previews/medida.mp4",
      demo:"",
      coverEmoji:"✨", coverBg:"linear-gradient(160deg,#0a0a14,#7c3aed 55%,#22d3ee)",
      titulo:"Completamente a medida",  desc:"Temática exclusiva, diseño único, funcionalidades personalizadas." }
  ],

  /* PRECIOS */
  planes: [
    { id:"esencial", nombre:"Esencial", precio:"Desde $10.000", highlight:false,
      badge:"🎈 Ideal para infantiles",
      subtitulo:"Lo justo para una invitación que sorprende",
      categorias:["infantil"],
      garantia:"🛡 Demo gratis — si no te convence, no pagás nada",
      features:[
        "Diseño con temática personalizada",
        "Countdown en tiempo real",
        "Confirmación de asistencia por WhatsApp",
        "Mapas integrados (Google, Waze, Apple)",
        "Agregar al calendario",
        "Música de fondo temática",
        "CBU / alias para regalos",
        "Link para compartir por WhatsApp",
        "1 revisión incluida",
        "Link activo por 2 meses"
      ],
      cta:"Consultar precio"
    },
    { id:"basico", nombre:"Básico", precio:"Desde $20.000", highlight:false,
      subtitulo:"Lo esencial bien hecho",
      categorias:["infantil","otro"],
      garantia:"🛡 Demo gratis — si no te convence, no pagás nada",
      features:[
        "Diseño con temática personalizada","Countdown en tiempo real",
        "Confirmación de asistencia con GIF","Mapas integrados (Google, Waze, Apple)",
        "Agregar al calendario","Música de fondo temática",
        "Mini-juego o trivia interactiva","CBU / alias para regalos",
        "Link para compartir por WhatsApp","1 revisión incluida","Link activo por 3 meses"
      ],
      cta:"Consultar precio"
    },
    { id:"premium", nombre:"Premium", precio:"Desde $35.000", highlight:true,
      badge:"★ Más elegido",
      subtitulo:"El sweet spot — la mayoría elige este",
      categorias:["infantil","casamiento","quinceanera","otro"],
      garantia:"🛡 Demo gratis — si no te convence, no pagás nada",
      features:[
        "Todo lo del plan Básico","Efectos visuales avanzados",
        "Fotos y video del festejado","Música personalizada con IA",
        "Sugerencias para la playlist","Video personalizado dentro de la invitación",
        "Panel de control en tiempo real","3 revisiones incluidas",
        "Soporte WhatsApp prioritario","Link activo por 6 meses"
      ],
      cta:"Consultar precio"
    },
    { id:"elite", nombre:"Elite", precio:"Desde $70.000", highlight:false,
      subtitulo:"Para eventos que tienen que quedar marcados",
      categorias:["casamiento","quinceanera","otro"],
      garantia:"🛡 Demo gratis — si no te convence, no pagás nada",
      features:[
        "Todo lo del plan Premium","Link personalizado para cada invitado",
        "Armado de mesa inteligente","Listado de invitados para el salón",
        "Panel de control completo","Galería de fotos y videos",
        "Trivia del evento","Hasta 6 revisiones",
        "Soporte post-evento 30 días","Entrega garantizada en 24 hs","Link activo por 12 meses"
      ],
      cta:"Consultar precio"
    }
  ],

  comparacion: {
    filas:[
      { label:"Diseño con temática personalizada",  esencial:true,  basico:true,  premium:true,  elite:true  },
      { label:"Countdown en tiempo real",            esencial:true,  basico:true,  premium:true,  elite:true  },
      { label:"Confirmación de asistencia",          esencial:"WhatsApp", basico:"Con GIF", premium:"Con GIF", elite:"Con GIF" },
      { label:"Mapas integrados",                    esencial:true,  basico:true,  premium:true,  elite:true  },
      { label:"Mini-juego o trivia interactiva",     esencial:false, basico:true,  premium:true,  elite:true  },
      { label:"Video personalizado con IA",          esencial:false, basico:false, premium:true,  elite:true  },
      { label:"Música personalizada con IA",         esencial:false, basico:false, premium:true,  elite:true  },
      { label:"Panel de control de confirmados",     esencial:false, basico:false, premium:true,  elite:true  },
      { label:"Link personalizado por invitado",     esencial:false, basico:false, premium:false, elite:true  },
      { label:"Armado de mesa inteligente",          esencial:false, basico:false, premium:false, elite:true  },
      { label:"Revisiones incluidas",                esencial:"1",  basico:"1",  premium:"3",  elite:"Hasta 6" },
      { label:"Vigencia del link",                   esencial:"2 meses", basico:"3 meses", premium:"6 meses", elite:"12 meses" },
      { label:"Soporte WhatsApp",                    esencial:"Normal", basico:"Normal", premium:"Prioritario", elite:"+ 30 días post" }
    ]
  },

  faq:[
    { q:"¿Los precios son en pesos o dólares?",
      a:"Los precios son en pesos argentinos. Para clientes del exterior cotizamos en USD. Lo hablamos por WhatsApp según la complejidad del trabajo." },
    { q:"¿Puedo pagar en cuotas?",
      a:"Sí. Aceptamos Mercado Pago con cuotas, transferencia o efectivo. Lo que te sea más cómodo." },
    { q:"¿Qué pasa si quiero algo que no está en los planes?",
      a:"Escribinos. Cada invitación es artesanal y podemos armar un plan personalizado. No hay límites." },
    { q:"¿Cómo es el proceso?",
      a:"Nos contás la idea y los datos del evento. En 24 a 48 horas te enviamos un demo completo para que lo veas funcionando en tu celular — sin cargo. Si te gusta, elegís el plan, abonás y habilitamos el link definitivo." },
    { q:"¿Qué cuenta como una revisión?",
      a:"Una revisión es una ronda de cambios: textos, colores, elementos visuales. Podés agrupar todos los cambios que quieras en cada revisión." }
  ],

  testimonios: [
    { texto:"Los invitados no podían creer que cada uno tenía su link con su nombre. Me preguntaron toda la fiesta quién la hizo.", autor:"Romina", evento:"Cumple de Thiago" },
    { texto:"El armado de mesas me salvó la vida. Llegué al salón con todo resuelto desde el celular.", autor:"Carolina", evento:"Quince de Valentina" },
    { texto:"Pedimos un cambio de música un sábado a la noche y en una hora estaba listo.", autor:"Sofía", evento:"Casamiento" }
  ],

  contacto: {
    titulo:   "¿Listo para crear la experiencia?",
    sub:      "Contanos tu idea. En menos de 24 hs tenés una propuesta. Sin compromiso.",
    tiposEvento:["Cumpleaños infantil","Casamiento","Quinceañera","Bautismo","Graduación","Otro"],
    planes:   ["No sé todavía","Esencial","Básico","Premium","Elite","A medida"],
    fuentes:  ["Instagram","Recomendación","Google","WhatsApp","Otro"]
  }
};

window.CONTENT = CONTENT;
