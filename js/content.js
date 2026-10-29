/* ═══════════════════════════════════════════════════════════
   BETHER STUDIO · CONTENIDO EDITABLE
   ✏️  Editá acá, hacé push. Sin tocar HTML.
═══════════════════════════════════════════════════════════ */
const CONTENT = {

  negocio: {
    nombre:    "Bether Studio",
    tagline:   "Páginas web para negocios e invitaciones digitales interactivas.",
    whatsapp:  "5491145309135",
    ciudad:    "Buenos Aires, Argentina",
    mensajeWA: "Hola Bether 👋 Quiero pedir presupuesto para una invitación digital."
  },

  marquee: ["Casamientos","Quinceañeras","Bautismos","Infantiles","Para adultos",
            "Personajes favoritos","Mario Bros","Frozen","Spiderman",
            "Dinosaurios","Minecraft","Encanto"],

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

  /* EJEMPLOS — cada categoría con su demo en vivo.
     img: captura de la portada · pantalla: 'xv' o 'medida' si se dibuja en HTML
     glow: color del resplandor detrás del teléfono */
  categorias: [
    { id:"casamiento", label:"Casamiento", emoji:"💍",
      demo:"https://bether2026.github.io/casamiento-prueba/", img:"img/inv/casamiento.jpg",
      glow:"rgba(212,165,116,.45)",
      titulo:"Casamientos con clase", desc:"Un sobre lacrado que se abre con el nombre de cada invitado. Elegancia, emoción y cada detalle en su lugar.",
      feats:["Sobre animado","Link por invitado","Armado de mesas","RSVP en vivo"] },
    { id:"quinceanera", label:"XV años", emoji:"👑",
      demo:"https://bether2026.github.io/Fiestaxv/", pantalla:"xv",
      glow:"rgba(167,139,250,.5)",
      titulo:"Quinceañeras únicas", desc:"La noche más especial merece la invitación más especial: brillos, música y su nombre escribiéndose solo.",
      feats:["Nombre animado","Música","Countdown","Galería"] },
    { id:"adulto", label:"Cumple adulto", emoji:"🥂",
      demo:"https://cumplebet41.vercel.app/", img:"img/inv/adulto.jpg",
      glow:"rgba(34,211,238,.38)",
      titulo:"Cumpleaños de adultos", desc:"Bola de boliche, luces de neón y la pista esperando. La fiesta empieza desde el link.",
      feats:["Estética neón","Playlist","Confirmación","Mapa"] },
    { id:"infantil", label:"Infantil", emoji:"🎈",
      demo:"https://bob-esponja-delta.vercel.app/", img:"img/inv/infantil.jpg",
      glow:"rgba(56,189,248,.42)",
      titulo:"Experiencias infantiles", desc:"Su personaje favorito, un mini-juego y la invitación que los chicos quieren abrir una y otra vez.",
      feats:["Mini-juego","Personajes","Música","RSVP"] },
    { id:"medida", label:"A medida", emoji:"✨",
      demo:"", pantalla:"medida",
      glow:"rgba(236,72,153,.38)",
      titulo:"Completamente a medida", desc:"Temática exclusiva, diseño único y las funciones que imagines. Si se te ocurre, lo hacemos.",
      feats:["Diseño exclusivo","Cualquier temática","Funciones a pedido"] }
  ],

  /* PRECIOS */
  planes: [
    { id:"esencial", nombre:"Esencial", precio:"Desde $10.000", highlight:false,
      subtitulo:"Lo justo para una invitación que sorprende",
      categorias:["infantil"],
      garantia:"🛡 Demo gratis — si no te convence, no pagás nada",
      features:[
        "Diseño con temática personalizada",
        "Countdown en tiempo real",
        "Confirmación de asistencia por WhatsApp",
        "CBU / alias para regalos",
        "Link para compartir por WhatsApp",
        "1 revisión incluida",
        "Link activo por 2 meses"
      ],
      cta:"Consultar precio"
    },
    { id:"basico", nombre:"Básico", precio:"Desde $20.000", highlight:false,
      badge:"🎈 Ideal para infantiles",
      subtitulo:"Lo esencial bien hecho",
      categorias:["infantil","otro"],
      garantia:"🛡 Demo gratis — si no te convence, no pagás nada",
      features:[
        "Diseño con temática personalizada","Countdown en tiempo real",
        "Confirmación de asistencia con GIF","RSVP desde la propia invitación",
        "Panel de control de invitados","Mapas integrados (Google, Waze, Apple)",
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
      { label:"Mapas integrados",                    esencial:false, basico:true,  premium:true,  elite:true  },
      { label:"Agregar al calendario",               esencial:false, basico:true,  premium:true,  elite:true  },
      { label:"RSVP desde la invitación",              esencial:false, basico:true,  premium:true,  elite:true  },
      { label:"Panel de control de invitados",          esencial:false, basico:true,  premium:true,  elite:true  },
      { label:"Mini-juego o trivia interactiva",        esencial:false, basico:true,  premium:true,  elite:true  },
      { label:"Música de fondo temática",            esencial:false, basico:true,  premium:true,  elite:true  },
      { label:"Video personalizado con IA",             esencial:false, basico:false, premium:true,  elite:true  },
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

  contacto: {
    titulo:   "¿Listo para crear la experiencia?",
    sub:      "Contanos tu idea. En menos de 24 hs tenés una propuesta. Sin compromiso.",
    tiposEvento:["Cumpleaños infantil","Casamiento","Quinceañera","Bautismo","Graduación","Otro"],
    planes:   ["No sé todavía","Esencial","Básico","Premium","Elite","A medida"],
    fuentes:  ["Instagram","Recomendación","Google","WhatsApp","Otro"]
  }
};

window.CONTENT = CONTENT;
