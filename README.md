# GISELZ · Web oficial

Web oficial de **GISELZ**, DJ open format de Barcelona (Instagram [@giseeelz](https://www.instagram.com/giseeelz/)).
Es una web de una sola página, rápida y pensada para móvil (la mayoría de visitas llegan desde el link de la bio de Instagram). Está en español e inglés, con un selector ES / EN arriba.

Todo el contenido (logo, fotos, bio, estilos, clubs, fiestas, contacto y enlaces de Spotify y Linktree) sale del presskit, que también se puede descargar desde la web.

**Todo el contenido se cambia en un solo archivo: [`assets/js/datos.js`](assets/js/datos.js).**
No hace falta tocar nada más ni saber programar.

---

## Índice

1. [Cómo editar algo (paso a paso)](#1-cómo-editar-algo-paso-a-paso)
2. [Cambiar las fechas](#2-cambiar-las-fechas)
3. [Cambiar enlaces: email, WhatsApp, redes, música y vídeos](#3-cambiar-enlaces)
4. [Cambiar fotos, logo y presskit](#4-cambiar-fotos-logo-y-presskit)
5. [Cambiar textos: bio, frase de portada, logros, clubs y estilos](#5-cambiar-textos)
6. [Publicación en Vercel](#6-publicación-en-vercel)
7. [Si algo se rompe](#7-si-algo-se-rompe)
8. [Lista de cosas pendientes](#8-lista-de-cosas-pendientes)
9. [Estructura de archivos](#9-estructura-de-archivos)

---

## 1. Cómo editar algo (paso a paso)

Todo se puede hacer desde la web de GitHub, sin instalar nada:

1. Entra en el repositorio y abre la carpeta `assets` → `js` → **`datos.js`**.
2. Pulsa el **lápiz ✏️** (arriba a la derecha, "Edit this file").
3. Cambia lo que necesites. **Solo lo que va entre comillas `"así"`.**
4. Pulsa el botón verde **"Commit changes…"** y otra vez **"Commit changes"**.
5. Vercel publica el cambio solo en 1 minuto más o menos. Recarga la web y ya está.

Tres reglas de oro para no romper nada:

- Cambia solo el texto que va **entre comillas**. No borres las comillas.
- Cada elemento de una lista va separado por una **coma** al final.
- Las líneas que empiezan por `//` son notas: la web las ignora. Sirven de ejemplo.

Todo lo que pone **`[PENDIENTE: ...]`** está esperando un dato real. En la web se ve como una etiqueta rayada para que sea fácil de localizar; en cuanto rellenas el dato, desaparece.

---

## 2. Cambiar las fechas

Abre `datos.js` y busca el apartado **`1. PRÓXIMAS FECHAS`**. Cada bolo es una línea así:

```js
{ fecha: "2026-10-11", ciudad: "Badalona", sala: "Espai Titus", evento: "Vive Fomo", info: "https://www.instagram.com/vivefomo/" },
```

| Campo      | Qué poner                                                                 |
|------------|---------------------------------------------------------------------------|
| `fecha`    | Año-mes-día, con guiones: `"2026-11-14"` es el 14 de noviembre de 2026.   |
| `ciudad`   | La ciudad.                                                                |
| `sala`     | El club, sala o festival.                                                 |
| `evento`   | (Opcional) el nombre de la fiesta. Sale delante de la sala: "Vive Fomo · Espai Titus". |
| `entradas` | El enlace para comprar entradas. Si no hay, déjalo vacío: `""`.           |
| `info`     | (Opcional) un enlace con más información, por ejemplo el Instagram de la fiesta. Si no hay entradas, sale un botón **Info** que lleva ahí. |
| `agotado`  | `true` si están agotadas (sale un sello **SOLD OUT**). Si no, `false`.    |

**Ejemplo con tres bolos** (los nombres son inventados, solo para ver el formato):

```js
const FECHAS = [
  { fecha: "2026-11-14", ciudad: "Madrid",    sala: "Club Ejemplo",       entradas: "https://...", agotado: false },
  { fecha: "2026-11-28", ciudad: "Barcelona", sala: "Sala Ejemplo",       entradas: "",            agotado: false },
  { fecha: "2026-12-31", ciudad: "Valencia",  sala: "Nochevieja Ejemplo", entradas: "https://...", agotado: true  },
];
```

- **No hace falta ordenarlas**: la web las ordena sola.
- **No hace falta borrar las fechas pasadas**: al día siguiente del bolo se mueven solas a "Fechas pasadas", que sale plegado y atenuado debajo.
- Si escribes mal una fecha (por ejemplo `14/11/2026`), la web te avisa con una etiqueta `[PENDIENTE]` diciendo cuál es.
- Si no hay ninguna fecha próxima, sale un bloque de "Nuevas fechas muy pronto" con un botón a Booking.
- **Truco para probar**: añade `?demo` al final de la dirección de la web (por ejemplo `https://giseelz-web.vercel.app/?demo`) y verás cómo queda con fechas de ejemplo, sin tocar nada.

---

## 3. Cambiar enlaces

### Email, WhatsApp e Instagram de booking
Apartado **`2. CONTACTO DE BOOKING`**:

```js
const CONTACTO = {
  email: "giselzramon@gmail.com",
  whatsapp: "34652932722",   // con prefijo del país (34 = España), sin "+" ni espacios
  instagram: "giseeelz",     // sin @
};
```

Con el email y el WhatsApp rellenos, el formulario de Booking funciona solo: al enviarlo se abre el WhatsApp o la app de correo de quien escribe, con el mensaje ya redactado (nombre, tipo de evento, fecha, ciudad y mensaje). No hace falta ningún servicio extra.

### Redes sociales (menú y pie de página)
Apartado **`3. REDES SOCIALES`**. Pega el enlace completo de cada perfil. Las que estén vacías (`""`) no se muestran.
El Linktree (`linktree`) además sale como botón **"Escucha mis sets"** en la sección Música.

### Música (reproductores)
Apartado **`9. MÚSICA`**. Ahora mismo están la playlist y las tres canciones de Spotify de los códigos QR del presskit. Copia el enlace del mix tal cual desde **SoundCloud, Mixcloud, Spotify o YouTube** y pégalo en `url`. La web detecta sola la plataforma y pone su reproductor.

```js
const MUSICA = [
  { titulo: "Open Format Mix Vol. 1", url: "https://soundcloud.com/usuario/nombre-del-mix" },
  { titulo: "Live set",               url: "https://www.youtube.com/watch?v=XXXXXXXXXXX" },
];
```

El `titulo` puede ir en un idioma (`"Playlist"`) o en los dos: `{ es: "Selección 01", en: "Pick 01" }`.

Puedes poner tantos como quieras. Los reproductores no se cargan hasta que alguien pulsa play, así la web sigue yendo rápida.

### Vídeos (Reels, TikTok, YouTube)
Apartado **`10. VÍDEOS`**. Igual que la música: pega el enlace del Reel de Instagram, del TikTok o del vídeo/Short de YouTube.

- Los **reels de Instagram** se abren en Instagram (en el móvil, directamente en la app): incrustados en la web piden iniciar sesión y se ven cortados. Los de **TikTok y YouTube** se reproducen dentro de la web.
- Puedes copiar el enlace tal cual desde "Compartir → Copiar enlace"; lo que va detrás del `?` sobra, pero no molesta.
- Ahora mismo hay 4 reels, con fotos del presskit como portada. Si quieres otra portada, pon en `portada` la ruta de una imagen vertical.
- Si la lista se deja vacía, la sección muestra dos tarjetas que llevan a sus **reels de Instagram** y a su **TikTok**.

- En **TikTok**, usa el enlace largo que contiene `/video/` (el que ves al abrir el vídeo en el ordenador), no el corto `vm.tiktok.com`.
- `portada` es opcional: una imagen para la tarjeta antes de darle al play (en YouTube se coge sola).

---

## 4. Cambiar fotos, logo y presskit

### Antes de subir una foto: hazla ligera
Las fotos del móvil o del fotógrafo pesan mucho y harían la web lenta. Pásalas antes por **[squoosh.app](https://squoosh.app)** (gratis, en el navegador):

| Uso                       | Tamaño recomendado                        | Peso objetivo |
|---------------------------|-------------------------------------------|---------------|
| Portada (`hero`)          | 1600 px de ancho                          | < 350 KB      |
| Galería y foto de bio     | 1600 px por el lado largo                 | < 300 KB      |
| Logo                      | PNG con fondo transparente, o SVG         | < 100 KB      |

En Squoosh: arrastra la foto → a la derecha elige **MozJPEG** o **WebP**, calidad 75-80 → en "Resize" pon el ancho → **Download**.

Usa nombres **sin espacios, tildes ni ñ**: `foto-01.jpg`, `hero.jpg`, `logo.png`.

### Cómo subir archivos a GitHub
1. Entra en la carpeta donde va el archivo (por ejemplo `assets/img/galeria`).
2. **Add file → Upload files** → arrastra los archivos → **Commit changes**.

### Galería
1. Sube las fotos a `assets/img/galeria/`.
2. En `datos.js`, apartado **`11. GALERÍA`**, añade una línea por foto:

```js
const GALERIA = [
  { foto: "assets/img/galeria/giselz-07.jpg", texto: "GISELZ pinchando en ..." },
  { foto: "assets/img/galeria/giselz-08.jpg", texto: "Backstage en ..." },
];
```

Las seis fotos actuales están sacadas del presskit. Algunas venían como captura de Instagram y se han recortado para dejar solo la foto; en cuanto tengas los archivos originales (más grandes y nítidos), sustitúyelas manteniendo el mismo nombre.

`texto` es una descripción corta: se ve al ampliar la foto y ayuda a Google y a quien usa lector de pantalla.
Las fotos salen en duotono rosa y negro y se ven a color al pasar el ratón. Al pulsarlas se abren a pantalla completa (en el móvil se desliza con el dedo entre ellas).

### Logo, portada y foto de la bio
Están en el apartado **`12. IMÁGENES PRINCIPALES`**:

```js
const IMAGENES = {
  logo: "assets/img/logo-giselz.png",
  hero: "assets/img/hero.jpg",
  heroVideo: "",              // opcional: vídeo corto .mp4 de fondo (5-15 s, sin sonido, < 4 MB)
  bio: "assets/img/bio.jpg",
};
```

- **Para cambiar la foto de portada o el logo, lo mejor es subir el archivo nuevo con el mismo nombre** (`hero.jpg` o `logo-giselz.png`) para que sustituya al anterior: así la portada carga al instante. Si le pones otro nombre y lo cambias aquí, también funciona, pero tarda un pelín más.
- La foto de portada se ve siempre en duotono rosa y negro, así que puede ser a color o en blanco y negro.
- El logo tiene que ser **blanco con fondo transparente** (PNG), porque va sobre fondo oscuro.
- Si `logo` se deja vacío, se usa el nombre GISELZ en tipografía.

### Presskit en PDF
Ya está subido en `assets/presskit/GISELZ-presskit.pdf`. Si haces uno nuevo, súbelo con **el mismo nombre** para sustituirlo.
Las **fotos en alta** y los **logos** se ponen en el apartado **`13. PRESS`**. El logo ya apunta al PNG de la web; para las fotos en alta lo más cómodo es un enlace a una carpeta de Google Drive o Dropbox (pesan mucho para el repositorio).

### Imagen al compartir el link (WhatsApp, Instagram…)
Es `assets/img/og-image.jpg` (1200 × 630 px): el logo, la foto de portada y los estilos. Si quieres cambiarla, sube otra con **el mismo nombre y tamaño**.
Ojo: WhatsApp guarda la vista previa unos días; si no ves el cambio enseguida es normal.

---

## 5. Cambiar textos

Todo en `datos.js`:

- **Frase de portada, bio y cita** → apartado `4. TEXTOS`. Cada texto tiene versión `es` (español) y `en` (inglés). La bio larga es una lista de párrafos: cada frase entre comillas es un párrafo. La bio es la del presskit; la versión en inglés es una traducción fiel.
- **Logros / highlights** → apartado `5. LOGROS`. Frases cortas, en los dos idiomas.
- **Estilos de la cinta que se mueve** → apartado `6. ESTILOS`.
- **Clubs y salas** (el muro grande) → apartado `7. CLUBS`. Nombre y ciudad (opcional), o nombre + logo:
  ```js
  const CLUBS = [
    { nombre: "Pachá", ciudad: "Barcelona" },
    { nombre: "Otro club", logo: "assets/img/clubs/otro-club.png" },
  ];
  ```
- **Fiestas, eventos, fiestas mayores y restaurantes** → apartado `8. EVENTOS`. Cada grupo tiene un título (en los dos idiomas) y su lista de nombres. Para añadir un sitio, escríbelo entre comillas dentro de su lista.

Los textos fijos de la web (menú, botones, formulario…) ya están traducidos a los dos idiomas.

---

## 6. Publicación en Vercel

La web está publicada en **https://giseelz-web.vercel.app/** y Vercel está conectado a este repositorio:

- **Cada cambio que se guarda en `main` se publica solo**, en un minuto más o menos. No hay que hacer nada más.
- Cuando se abre un Pull Request, Vercel crea una **vista previa** con su propio enlace (sale en el PR). Así se puede ver cómo queda antes de fusionarlo.
- No hace falta ninguna configuración especial: es una web estática, sin paso de compilación (en Vercel, *Framework Preset: Other*).

### ¿Dominio propio? (por ejemplo `giselz.com`)
1. Cómpralo en cualquier registrador y añádelo en Vercel: proyecto → **Settings → Domains → Add**, y sigue los pasos que te indica.
2. En `index.html`, `robots.txt` y `sitemap.xml`, cambia `https://giseelz-web.vercel.app/` por tu dominio nuevo (usa "buscar y reemplazar"). Así la vista previa en WhatsApp y Google apuntan bien.

---

## 7. Si algo se rompe

- Si cometes un error de escritura en `datos.js` (una coma o unas comillas de menos), la web muestra un **aviso rojo abajo** que dice **en qué línea** está el problema. Ve a esa línea y revisa comas y comillas.
- Para **deshacer** un cambio: en GitHub abre `datos.js` → **History** → elige la versión anterior buena → copia su contenido y pégalo de nuevo.
- Los errores más típicos:
  - Olvidar las comillas: `ciudad: Madrid` ❌ → `ciudad: "Madrid"` ✅
  - Olvidar la coma entre dos bolos: `} {` ❌ → `}, {` ✅
  - Usar comillas "curvas" copiadas de Word o WhatsApp (`“ ”`) ❌ → comillas rectas `" "` ✅

---

## 8. Lista de cosas pendientes

Ya está todo lo que venía en el presskit, más la primera fecha, SoundCloud, TikTok y 4 reels. Falta:

- [ ] Ir añadiendo las próximas fechas (`FECHAS`)
- [ ] Nombre de cada canción de Spotify, si se quiere mostrar en vez de "Selección 01, 02, 03" (`MUSICA`)
- [ ] Mixcloud, perfil de Spotify o YouTube, solo si los tiene (`REDES`)
- [ ] Enlace a las fotos originales en alta resolución (`PRESS.fotos`)
- [ ] Fotos originales para sustituir las de la galería que venían como captura de Instagram (`giselz-02`, `04` y `05`)
- [ ] Si la lista de estilos cambia, actualizar también las descripciones de `index.html` (las líneas con `description`), que son las que salen en Google y al compartir

---

## 9. Estructura de archivos

```
index.html              La página (estructura y textos para Google). No hace falta tocarla.
assets/
  js/datos.js           ← AQUÍ SE EDITA TODO EL CONTENIDO
  js/main.js            La lógica de la web (no tocar)
  css/styles.css        Colores, tipografías y diseño. Los colores están arriba del todo (:root)
  img/                  Logo (logo-giselz.png), portada (hero.jpg), foto de bio, favicon e imagen para compartir
  img/galeria/          Fotos de la galería
  presskit/             El presskit en PDF para descargar (GISELZ-presskit.pdf)
  fonts/                Tipografías (Anton, Inter y Permanent Marker, licencia libre)
robots.txt, sitemap.xml Para Google
.nojekyll               Solo se usa si algún día se publica en GitHub Pages (no molesta)
```

### Detalles técnicos (para quien programe)
- HTML + CSS + JavaScript sin dependencias ni paso de compilación. Para verla en local basta con un servidor estático (`python3 -m http.server`).
- Mobile first; fuentes auto-alojadas y precargadas; imágenes con `loading="lazy"`; los reproductores de SoundCloud, Mixcloud, Spotify, YouTube, Instagram y TikTok solo se cargan al pulsar play (fachada), lo que además evita cookies de terceros hasta ese momento.
- Respeta `prefers-reduced-motion` (sin animaciones) y el modo ahorro de datos (no carga el vídeo de portada).
- SEO: título, descripción, Open Graph y Twitter Card, datos estructurados `Person` y `MusicEvent` (este último se genera con las próximas fechas).
