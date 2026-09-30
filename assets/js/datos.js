/* ==========================================================================
   GISEEELZ · PANEL DE CONTROL DE LA WEB
   --------------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para actualizar la web.
   No hace falta saber programar. Tres reglas de oro:

     1. Cambia solo lo que va ENTRE COMILLAS "así".
     2. Cada elemento de una lista va separado por una coma.
     3. Las líneas que empiezan por  //  son notas: la web las ignora.

   Todo lo que ponga [PENDIENTE] está esperando un dato real.
   Si un campo se queda vacío ( "" ), la web lo oculta o muestra un aviso.
   ¿Te has equivocado y la web sale rara? Aparecerá un aviso rojo abajo
   diciéndote en qué línea de este archivo está el fallo.
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. PRÓXIMAS FECHAS (bolos)
   --------------------------------------------------------------------------
   · fecha     → formato AAAA-MM-DD   (ej. "2026-11-14" = 14 nov 2026)
   · ciudad    → ciudad del bolo
   · sala      → club, sala, evento o festival
   · entradas  → enlace para comprar entradas ( "" si no hay )
   · agotado   → true si están agotadas (sale un sello de SOLD OUT)

   No hace falta borrar las fechas antiguas: cuando pasa el día, la web las
   mueve sola a "Fechas pasadas" y las muestra atenuadas.

   Truco: para ver cómo queda con fechas de prueba, abre la web añadiendo
   ?demo al final de la dirección (ej. https://.../giseelz-web/?demo).
   -------------------------------------------------------------------------- */
const FECHAS = [
  // Copia esta línea, quítale las dos barras del principio y rellénala:
  // { fecha: "2026-11-14", ciudad: "Madrid", sala: "Nombre del club", entradas: "https://...", agotado: false },

  // [PENDIENTE: añadir las próximas fechas]
];


/* --------------------------------------------------------------------------
   2. CONTACTO DE BOOKING
   -------------------------------------------------------------------------- */
const CONTACTO = {
  // [PENDIENTE: email de booking]  ej. "booking@giseeelz.com"
  email: "",

  // [PENDIENTE: número de WhatsApp]  con prefijo de país, sin "+" ni espacios.
  // ej. "34600111222"  (34 = España)
  whatsapp: "",

  // Usuario de Instagram (sin @)
  instagram: "giseeelz",
};


/* --------------------------------------------------------------------------
   3. REDES SOCIALES (salen en el pie de la web)
   --------------------------------------------------------------------------
   Pega el enlace completo de cada perfil. Las que estén vacías no se ven.
   -------------------------------------------------------------------------- */
const REDES = {
  instagram:  "https://www.instagram.com/giseeelz/",
  tiktok:     "", // [PENDIENTE: perfil de TikTok]
  soundcloud: "", // [PENDIENTE: perfil de SoundCloud]
  mixcloud:   "", // [PENDIENTE: perfil de Mixcloud]
  spotify:    "", // [PENDIENTE: perfil de Spotify]
  youtube:    "", // [PENDIENTE: canal de YouTube]
};


/* --------------------------------------------------------------------------
   4. TEXTOS: frase de portada y biografía (español + inglés)
   -------------------------------------------------------------------------- */
const TEXTOS = {
  // Frase corta que sale bajo el nombre en la portada
  claim: {
    es: "Todos los estilos. Una sola pista.",
    en: "Every style. One dancefloor.",
  },

  // Bio corta: 2-3 frases. Es lo primero que se lee.
  bioCorta: {
    es: "[PENDIENTE: bio corta del presskit, 2-3 frases]",
    en: "[PENDIENTE: bio corta en inglés]",
  },

  // Bio larga: sale al pulsar "Leer más". Cada línea entre comillas es un párrafo.
  bioLarga: {
    es: [
      "[PENDIENTE: bio larga del presskit, primer párrafo]",
      "[PENDIENTE: bio larga, segundo párrafo]",
    ],
    en: [
      "[PENDIENTE: bio larga en inglés, primer párrafo]",
      "[PENDIENTE: bio larga en inglés, segundo párrafo]",
    ],
  },
};


/* --------------------------------------------------------------------------
   5. LOGROS / HIGHLIGHTS (salen junto a la bio)
   --------------------------------------------------------------------------
   Frases cortas: residencias, festivales grandes, aperturas para artistas...
   -------------------------------------------------------------------------- */
const LOGROS = [
  "[PENDIENTE: logro o hito 1 del presskit]",
  "[PENDIENTE: logro o hito 2 del presskit]",
  "[PENDIENTE: logro o hito 3 del presskit]",
];


/* --------------------------------------------------------------------------
   6. ESTILOS QUE PINCHA (la cinta que se mueve)
   -------------------------------------------------------------------------- */
// [PENDIENTE: confirmar la lista con el presskit]
const GENEROS = [
  "Reggaetón",
  "Hip Hop",
  "Dancehall",
  "Afro",
  "R&B",
  "House",
];


/* --------------------------------------------------------------------------
   7. CLUBS, EVENTOS Y FESTIVALES DONDE HA PINCHADO
   --------------------------------------------------------------------------
   Solo el nombre:          "Nombre del club",
   Con logo (opcional):     { nombre: "Nombre del club", logo: "assets/img/clubs/nombre.png" },
   -------------------------------------------------------------------------- */
const CLUBS = [
  "[PENDIENTE: club]",
  "[PENDIENTE: festival]",
  "[PENDIENTE: evento]",
  "[PENDIENTE: sala]",
];


/* --------------------------------------------------------------------------
   8. MÚSICA (reproductores)
   --------------------------------------------------------------------------
   Pega el enlace tal cual lo copias de SoundCloud, Mixcloud, Spotify o
   YouTube: la web detecta sola de qué plataforma es y pone su reproductor.
   -------------------------------------------------------------------------- */
const MUSICA = [
  { titulo: "[PENDIENTE: nombre del mix 1]", url: "" },
  { titulo: "[PENDIENTE: nombre del mix 2]", url: "" },
];


/* --------------------------------------------------------------------------
   9. VÍDEOS (Reels de Instagram, TikTok o YouTube)
   --------------------------------------------------------------------------
   · url      → enlace del reel, del TikTok o del vídeo de YouTube
   · portada  → (opcional) imagen para la tarjeta antes de darle al play,
                ej. "assets/img/videos/reel-1.jpg". En YouTube no hace falta.
   -------------------------------------------------------------------------- */
const VIDEOS = [
  { titulo: "[PENDIENTE: vídeo 1]", url: "", portada: "" },
  { titulo: "[PENDIENTE: vídeo 2]", url: "", portada: "" },
  { titulo: "[PENDIENTE: vídeo 3]", url: "", portada: "" },
  { titulo: "[PENDIENTE: vídeo 4]", url: "", portada: "" },
];


/* --------------------------------------------------------------------------
   10. GALERÍA DE FOTOS
   --------------------------------------------------------------------------
   Sube las fotos a la carpeta assets/img/galeria/ y añade una línea por foto.
   · foto   → ruta de la foto
   · texto  → descripción corta (la leen Google y los lectores de pantalla)
   -------------------------------------------------------------------------- */
const GALERIA = [
  // { foto: "assets/img/galeria/foto-01.jpg", texto: "GISEEELZ pinchando en ..." },

  // [PENDIENTE: fotos del presskit]
];


/* --------------------------------------------------------------------------
   11. IMÁGENES PRINCIPALES
   -------------------------------------------------------------------------- */
const IMAGENES = {
  // [PENDIENTE: logo del presskit]  mejor PNG con fondo transparente o SVG.
  // ej. "assets/img/logo.png". Si está vacío, se usa el nombre en tipografía.
  logo: "",

  // [PENDIENTE: foto de portada a pantalla completa]  ej. "assets/img/hero.jpg"
  hero: "",

  // (Opcional) vídeo de portada: .mp4 corto (5-15 s), sin sonido y ligero (< 4 MB).
  // ej. "assets/img/hero.mp4". Si hay vídeo, la foto de portada se usa mientras carga.
  heroVideo: "",

  // [PENDIENTE: foto para la sección Bio]  ej. "assets/img/bio.jpg"
  bio: "",
};


/* --------------------------------------------------------------------------
   12. PRESS (descargas para medios y promotores)
   --------------------------------------------------------------------------
   · presskit → sube el PDF a assets/presskit/ con ESTE nombre exacto.
                Mientras no exista, el botón sale como pendiente.
   · fotos    → enlace a las fotos en alta (carpeta de Google Drive, Dropbox,
                WeTransfer...) o a un .zip dentro de assets/presskit/
   · logos    → igual que fotos, pero con los logos
   -------------------------------------------------------------------------- */
const PRESS = {
  presskit: "assets/presskit/GISEEELZ-presskit.pdf",
  fotos: "", // [PENDIENTE: enlace a fotos en alta]
  logos: "", // [PENDIENTE: enlace a logos en alta]
};
