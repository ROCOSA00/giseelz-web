/* ==========================================================================
   GISELZ · PANEL DE CONTROL DE LA WEB
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
   LO MÁS FÁCIL: las fechas se apuntan en la hoja de Google de aquí abajo
   (HOJA_FECHAS), desde el móvil, y la web las coge sola. Cómo se rellena:
   mira el apartado "Cambiar las fechas" del README.

   La hoja tiene que estar compartida como "Cualquier persona con el enlace:
   Lector", si no la web no puede leerla.
   -------------------------------------------------------------------------- */
const HOJA_FECHAS = "https://docs.google.com/spreadsheets/d/17Vx0dRTTy1sbMetWP6FitLhCPFTmKEhOeR3MeYBsKwk/edit";

/* También se pueden poner fechas aquí directamente (se suman a las de la hoja;
   si una fecha está en los dos sitios, sale una sola vez):
   · fecha     → formato AAAA-MM-DD   (ej. "2026-11-14" = 14 nov 2026)
   · ciudad    → ciudad del bolo
   · sala      → club, sala o festival
   · evento    → (opcional) nombre de la fiesta, ej. "Vive Fomo"
   · entradas  → enlace para comprar entradas ( "" si no hay )
   · info      → (opcional) enlace con más info (ej. el Instagram de la fiesta)
                 si no hay entradas, sale un botón "Info" con este enlace
   · agotado   → true si están agotadas (sale un sello de SOLD OUT)

   No hace falta borrar las fechas antiguas: cuando pasa el día, la web las
   mueve sola a "Fechas pasadas" y las muestra atenuadas.

   Truco: para ver cómo queda con fechas de prueba, abre la web añadiendo
   ?demo al final de la dirección (ej. https://giseelz-web.vercel.app/?demo).
*/
const FECHAS = [
  { fecha: "2026-10-11", ciudad: "Badalona", sala: "Espai Titus", evento: "Vive Fomo", info: "https://www.instagram.com/vivefomo/" },

  // Para añadir otra, copia esta línea, quítale las dos barras del principio y rellénala:
  // { fecha: "2026-11-14", ciudad: "Barcelona", sala: "Nombre del club", evento: "", entradas: "https://...", info: "", agotado: false },
];


/* --------------------------------------------------------------------------
   2. CONTACTO DE BOOKING (datos del presskit)
   -------------------------------------------------------------------------- */
const CONTACTO = {
  email: "giselzramon@gmail.com",

  // Número de WhatsApp: con prefijo de país, sin "+" ni espacios (34 = España).
  // Vacío = el número no sale en la web (ni botones ni iconos de WhatsApp).
  whatsapp: "",

  // Usuario de Instagram (sin @)
  instagram: "giseeelz",
};


/* --------------------------------------------------------------------------
   3. REDES SOCIALES (salen en el menú y en el pie de la web)
   --------------------------------------------------------------------------
   Pega el enlace completo de cada perfil. Las que estén vacías no se ven.
   -------------------------------------------------------------------------- */
const REDES = {
  instagram:  "https://www.instagram.com/giseeelz/",
  linktree:   "https://linktr.ee/gislz",
  tiktok:     "https://www.tiktok.com/@giseeelz",
  soundcloud: "https://soundcloud.com/giselz",
  mixcloud:   "", // [PENDIENTE: perfil de Mixcloud, si lo hay]
  spotify:    "", // [PENDIENTE: perfil de Spotify, si lo hay]
  youtube:    "https://www.youtube.com/@giselzmusic",
};


/* --------------------------------------------------------------------------
   4. TEXTOS: frase de portada, biografía y cita (español + inglés)
   -------------------------------------------------------------------------- */
const TEXTOS = {
  // Frase corta bajo el logo en la portada (sale del presskit)
  claim: {
    es: "Pump up the jam",
    en: "Pump up the jam",
  },

  // Bio corta: es lo primero que se lee.
  bioCorta: {
    es: "Hello! Mi nombre es Gisela, soy productora de espectáculos de comedia y DJ. Soy de Barcelona, pero me encanta viajar, así que podemos considerar que soy ciudadana del mundo :)",
    en: "Hello! My name is Gisela, I’m a comedy show producer and a DJ. I’m from Barcelona, but I love to travel, so you could say I’m a citizen of the world :)",
  },

  // Bio larga: sale al pulsar "Leer más". Cada línea entre comillas es un párrafo.
  bioLarga: {
    es: [
      "Siempre me ha gustado todo tipo de música (menos el flamenco, no entiendo el por qué) y siempre me he empapado de ella.",
      "Me gradué como DJ hace tres años en Plastic Academia y, desde entonces, no he dejado de ganar experiencia. Trabajo de forma continua, pinchando entre una y tres veces por semana.",
      "Básicamente me gusta la música que hace bailar a la gente :)",
      "Me hace feliz ser DJ porque, aparte de conectar con la música, conecto con las personas.",
    ],
    en: [
      "I’ve always loved every kind of music (except flamenco, don’t ask me why) and I’ve always soaked it all up.",
      "I graduated as a DJ three years ago at Plastic Academia and I haven’t stopped gaining experience since. I work steadily, playing between one and three times a week.",
      "Basically, I love the music that makes people dance :)",
      "Being a DJ makes me happy because, besides connecting with the music, I connect with people.",
    ],
  },

  // Cita grande que sale al final de la bio
  cita: {
    es: "Las sonrisas que recibes cuando estás en la cabina no se comparan con ninguna otra.",
    en: "The smiles you get when you’re in the booth are like no other.",
  },
};


/* --------------------------------------------------------------------------
   5. LOGROS / HIGHLIGHTS (salen junto a la bio)
   -------------------------------------------------------------------------- */
const LOGROS = [
  { es: "Ha pinchado en Pachá Barcelona y Sala Apolo", en: "Has played Pachá Barcelona and Sala Apolo" },
  { es: "Graduada como DJ en Plastic Academia", en: "Graduated as a DJ from Plastic Academia" },
  { es: "Pincha de una a tres veces por semana", en: "Plays one to three gigs a week" },
  { es: "Productora de espectáculos de comedia", en: "Comedy show producer" },
];


/* --------------------------------------------------------------------------
   6. ESTILOS QUE PINCHA (la cinta que se mueve) — del presskit
   -------------------------------------------------------------------------- */
const GENEROS = [
  "Reggaeton",
  "Latin tech",
  "Tech house",
  "House",
];


/* --------------------------------------------------------------------------
   7. CLUBS Y SALAS DONDE HA PINCHADO (el muro grande)
   --------------------------------------------------------------------------
   · nombre  → nombre del club
   · ciudad  → (opcional) sale en pequeño al lado
   · logo    → (opcional) ej. "assets/img/clubs/nombre.png"
   -------------------------------------------------------------------------- */
const CLUBS = [
  { nombre: "Pachá", ciudad: "Barcelona" },
  { nombre: "Sala Apolo", ciudad: "Barcelona" },
  { nombre: "Espai Titus", ciudad: "Badalona" },
  { nombre: "Sala Vértigo", ciudad: "Barcelona" },
  { nombre: "Sala Upload", ciudad: "Barcelona" },
  { nombre: "Classic", ciudad: "Mataró" },
  { nombre: "Sala Dresdén", ciudad: "Cerdanyola del Vallés" },
  { nombre: "Nexus Club", ciudad: "Zaragoza" },
];


/* --------------------------------------------------------------------------
   8. FIESTAS, EVENTOS Y OTROS SITIOS (salen debajo del muro, por grupos)
   -------------------------------------------------------------------------- */
const EVENTOS = [
  {
    grupo: { es: "Fiestas", en: "Parties" },
    nombres: ["Milkshake", "Somos Manuelas", "Fomo Club", "Jaleo", "Zeta Dance", "La Curiosa", "Bbsesh"],
  },
  {
    grupo: { es: "Eventos", en: "Events" },
    nombres: ["PizzaFest", "TheSkateHub", "Skoda"],
  },
  {
    grupo: { es: "Fiestas mayores", en: "Town festivals" },
    nombres: ["Martorell", "Santa Coloma"],
  },
  {
    grupo: { es: "Restaurantes", en: "Restaurants" },
    nombres: ["Panoràmic Montgat", "Sal Groga Badalona", "Santa Lola Badalona", "Nini Cerveceria"],
  },
];


/* --------------------------------------------------------------------------
   9. MÚSICA
   --------------------------------------------------------------------------
   DESTACADO: el set que sale en grande al principio de Música, como novedad.
   Para cambiarlo, pega el enlace del nuevo vídeo de YouTube y cambia el título.
   · portada → (opcional) imagen propia; vacío = la miniatura de YouTube
   -------------------------------------------------------------------------- */
const DESTACADO = {
  etiqueta: { es: "Novedad", en: "New" },
  titulo: "Zetasets Vol.1",
  subtitulo: { es: "Tech house & latin tech · DJ set completo", en: "Tech house & latin tech · Full DJ set" },
  url: "https://www.youtube.com/watch?v=9FRQsvtrjdY",
  portada: "",
};

/* Debajo del destacado, el resto de enlaces de música.
   Pega el enlace tal cual lo copias de SoundCloud, Mixcloud, Spotify o
   YouTube: la web detecta sola de qué plataforma es y pone su reproductor.
   El perfil de SoundCloud sale como lista de todos sus sets; el canal de
   YouTube, como botón que lleva a todos los vídeos. */
const MUSICA = [
  { titulo: { es: "Sets en SoundCloud", en: "Sets on SoundCloud" }, url: "https://soundcloud.com/giselz" },
  { titulo: { es: "Sets en YouTube", en: "Sets on YouTube" }, url: "https://www.youtube.com/@giselzmusic/videos" },
  // Para añadir un set concreto: { titulo: "Nombre del set", url: "https://soundcloud.com/giselz/nombre-del-set" },
];


/* --------------------------------------------------------------------------
   10. VÍDEOS (Reels de Instagram, TikTok o YouTube)
   --------------------------------------------------------------------------
   · url      → enlace del reel, del TikTok o del vídeo de YouTube
   · portada  → (opcional) imagen para la tarjeta antes de darle al play,
                ej. "assets/img/videos/reel-1.jpg". En YouTube no hace falta.

   Los reels de Instagram se ven con la vista previa oficial de Instagram
   (se pueden reproducir en la propia web). Si el navegador de quien visita la
   bloquea, sale una tarjeta con la foto de "portada" que abre el reel.
   Los de TikTok y YouTube se reproducen dentro de la web.
   Mientras esta lista esté vacía, la sección muestra dos tarjetas que llevan
   a sus reels de Instagram y a su TikTok.
   -------------------------------------------------------------------------- */
const VIDEOS = [
  { titulo: "", url: "https://www.instagram.com/reel/DMnPs49Mo-p/", portada: "assets/img/galeria/giselz-02.jpg" },
  { titulo: "", url: "https://www.instagram.com/reel/DPCPt9-iADu/", portada: "assets/img/galeria/giselz-03.jpg" },
  { titulo: "", url: "https://www.instagram.com/reel/DdUGtmoIdiw/", portada: "assets/img/galeria/giselz-04.jpg" },
  { titulo: "", url: "https://www.instagram.com/reel/DXhRL2viGGo/", portada: "assets/img/galeria/giselz-05.jpg" },

  // Para añadir otro, copia esta línea, quítale las dos barras del principio y pega el enlace:
  // { titulo: "Nombre del vídeo", url: "https://www.instagram.com/reel/XXXXXXXXX/", portada: "" },
];


/* --------------------------------------------------------------------------
   11. GALERÍA DE FOTOS (sacadas del presskit)
   --------------------------------------------------------------------------
   Sube las fotos a la carpeta assets/img/galeria/ y añade una línea por foto.
   · foto   → ruta de la foto
   · texto  → descripción corta (la leen Google y los lectores de pantalla)
   -------------------------------------------------------------------------- */
const GALERIA = [
  { foto: "assets/img/galeria/giselz-01.jpg", texto: "GISELZ en cabina, con americana rosa" },
  { foto: "assets/img/galeria/giselz-02.jpg", texto: "GISELZ pinchando en Fomo Club" },
  { foto: "assets/img/galeria/giselz-03.jpg", texto: "GISELZ en la cabina de Fomo Club" },
  { foto: "assets/img/galeria/giselz-04.jpg", texto: "GISELZ sonriendo mientras pincha" },
  { foto: "assets/img/galeria/giselz-05.jpg", texto: "GISELZ a los platos" },
  { foto: "assets/img/galeria/giselz-06.jpg", texto: "Retrato de GISELZ" },
];


/* --------------------------------------------------------------------------
   12. IMÁGENES PRINCIPALES
   -------------------------------------------------------------------------- */
const IMAGENES = {
  // Logo (PNG blanco con fondo transparente, sacado del presskit)
  logo: "assets/img/logo-giselz.png",

  // Foto de portada a pantalla completa
  hero: "assets/img/hero.jpg",

  // (Opcional) vídeo de portada: .mp4 corto (5-15 s), sin sonido y ligero (< 4 MB).
  // ej. "assets/img/hero.mp4". Si hay vídeo, la foto de portada se usa mientras carga.
  heroVideo: "",

  // Foto de la sección Bio
  bio: "assets/img/bio.jpg",

  // Foto de fondo de la sección Booking (si la dejas vacía "", el fondo queda negro)
  booking: "assets/img/booking.jpg",
};


/* --------------------------------------------------------------------------
   13. PRESS (descargas para medios y promotores)
   --------------------------------------------------------------------------
   · presskit → el PDF dentro de assets/presskit/
   · fotos    → carpeta con todas las fotos en alta (Google Drive)
   · logos    → carpeta con los logos (Google Drive)
   -------------------------------------------------------------------------- */
const PRESS = {
  presskit: "assets/presskit/GISELZ-presskit.pdf",
  fotos: "https://drive.google.com/drive/folders/1V3szzAgTzSTG0LqUGvnSDULXiBD_IkYW",
  logos: "https://drive.google.com/drive/folders/1AZbRgNkh9YMMBcxyNsnMAA4QDSMW1ESx",
};
