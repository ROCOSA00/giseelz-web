/* ==========================================================================
   GISELZ · lógica de la web
   No hace falta tocar este archivo: el contenido se edita en assets/js/datos.js
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- Utilidades ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const params = new URLSearchParams(location.search);

  // Crea elementos: el('a', { class: 'btn', href: '#' }, 'texto', otroNodo)
  function el(tag, attrs, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v == null || v === false) continue;
      if (k === 'class') node.className = v;
      else if (k === 'text') node.textContent = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      node.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return node;
  }
  function icon(name, cls) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon' + (cls ? ' ' + cls : ''));
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', '#i-' + name);
    svg.append(use);
    return svg;
  }
  const star = () => el('span', { class: 'star', 'aria-hidden': 'true' });
  const eq = (cls) => el('span', { class: 'eq' + (cls ? ' ' + cls : ''), 'aria-hidden': 'true' }, el('i'), el('i'), el('i'), el('i'), el('i'));

  const isPending = (s) => !s || /^\s*\[PENDIENTE/i.test(String(s));
  const pendingTag = (s, fallback) => el('span', { class: 'pending' }, s && String(s).trim() ? s : `[PENDIENTE: ${fallback}]`);
  // Devuelve texto normal o, si falta el dato, la etiqueta [PENDIENTE]
  const textOr = (s, fallback) => (isPending(s) ? pendingTag(s, fallback) : document.createTextNode(s));
  const isExternal = (url) => /^https?:\/\//i.test(url);
  const extAttrs = (url) => (isExternal(url) ? { target: '_blank', rel: 'noopener' } : {});

  /* ---------- Datos (de datos.js) ---------- */
  let dataBroken = false;
  function read(getter, fallback) {
    try {
      const v = getter();
      return v == null ? fallback : v;
    } catch (e) {
      dataBroken = true;
      return fallback;
    }
  }
  const D = {
    fechas: read(() => FECHAS, []),
    hojaFechas: read(() => (typeof HOJA_FECHAS === 'undefined' ? '' : HOJA_FECHAS), ''),
    destacado: read(() => (typeof DESTACADO === 'undefined' ? null : DESTACADO), null),
    contacto: read(() => CONTACTO, {}),
    redes: read(() => REDES, {}),
    textos: read(() => TEXTOS, {}),
    logros: read(() => LOGROS, []),
    generos: read(() => GENEROS, ['Open format']),
    clubs: read(() => CLUBS, []),
    eventos: read(() => (typeof EVENTOS === 'undefined' ? [] : EVENTOS), []),
    musica: read(() => MUSICA, []),
    videos: read(() => VIDEOS, []),
    galeria: read(() => GALERIA, []),
    imagenes: read(() => IMAGENES, {}),
    press: read(() => PRESS, {}),
  };
  if (dataBroken || window.__datosError) {
    const box = $('#data-error');
    box.textContent = '⚠ Hay un error de escritura en assets/js/datos.js' +
      (window.__datosError ? ` (${window.__datosError})` : '') +
      '. Revisa comas y comillas cerca de esa línea.';
    box.hidden = false;
  }

  /* ---------- Idiomas ---------- */
  const UI = {
    es: {
      'skip': 'Saltar al contenido',
      'meta.title': 'GISELZ — Web oficial y booking',
      'meta.desc': 'Web oficial de GISELZ, DJ open format de Barcelona. Reggaeton, latin tech, tech house y house. Ha pinchado en Pachá Barcelona y Sala Apolo. Fechas, música y booking.',
      'nav.bio': 'Bio', 'nav.musica': 'Música', 'nav.fechas': 'Fechas', 'nav.clubs': 'Clubs',
      'nav.galeria': 'Galería', 'nav.videos': 'Vídeos', 'nav.press': 'Press', 'nav.booking': 'Booking',
      'menu.open': 'Abrir menú', 'menu.close': 'Cerrar menú',
      'hero.kicker': 'DJ · Open format · BCN', 'hero.listen': 'Escuchar', 'hero.down': 'Bajar a la bio',
      'genres.sr': 'Estilos: ',
      'bio.kicker': 'Quién es', 'bio.title': 'Bio', 'bio.more': 'Leer más', 'bio.less': 'Leer menos', 'bio.highlights': 'Highlights',
      'music.kicker': 'Dale al play', 'music.title': 'Música', 'music.play': 'Reproducir', 'music.more': 'Más música en',
      'music.open': 'Escuchar en', 'feature.watch': 'Ver', 'top.next': 'Próxima fecha',
      'dates.kicker': 'En directo', 'dates.title': 'Fechas', 'dates.upcoming': 'Próximas fechas', 'dates.past': 'Fechas pasadas',
      'dates.tickets': 'Entradas', 'dates.info': 'Info', 'dates.soldout': 'Sold out', 'dates.soon': 'Info pronto',
      'dates.empty.title': 'Nuevas fechas muy pronto', 'dates.empty.text': '¿Quieres a GISELZ en tu club, festival o evento?',
      'dates.empty.cta': 'Pide fecha', 'dates.demo': 'Modo demo · datos de ejemplo, no son fechas reales',
      'dates.demo.city': 'Ciudad de ejemplo', 'dates.demo.venue': 'Sala de ejemplo',
      'clubs.kicker': 'Ha pinchado en', 'clubs.title': 'Clubs', 'clubs.more': 'Fiestas, eventos y más',
      'gallery.kicker': 'Fotos', 'gallery.title': 'Galería', 'gallery.open': 'Ampliar foto',
      'lb.close': 'Cerrar', 'lb.prev': 'Foto anterior', 'lb.next': 'Foto siguiente',
      'videos.kicker': 'En acción', 'videos.title': 'Vídeos', 'videos.play': 'Ver vídeo', 'videos.open': 'Ver en',
      'videos.ig': 'Reels en Instagram', 'videos.tt': 'Vídeos en TikTok',
      'videos.moreIg': 'Más reels en Instagram', 'videos.moreTt': 'Más en TikTok',
      'press.kicker': 'Para medios y promotores', 'press.title': 'Press',
      'press.kit': 'Presskit', 'press.kitSub': 'Descargar PDF',
      'press.photos': 'Fotos en alta', 'press.logos': 'Logos', 'press.download': 'Descargar',
      'press.drive': 'Abrir carpeta en Drive',
      'booking.kicker': 'Contrataciones', 'booking.title': 'Booking',
      'booking.intro': 'Clubs, festivales, eventos privados y marcas. Cuéntanos tu idea y te respondemos.',
      'form.name': 'Nombre', 'form.type': 'Tipo de evento', 'form.typePick': 'Elige una opción',
      'form.type.club': 'Club', 'form.type.festival': 'Festival', 'form.type.private': 'Evento privado',
      'form.type.brand': 'Marca / corporativo', 'form.type.other': 'Otro',
      'form.date': 'Fecha', 'form.city': 'Ciudad', 'form.msg': 'Mensaje', 'form.msgPh': 'Aforo, horario del set, tipo de público…',
      'form.sendWa': 'Enviar por WhatsApp', 'form.sendMail': 'Enviar por email',
      'form.note': 'Se abrirá tu WhatsApp o tu app de correo con el mensaje listo para enviar.',
      'form.noteMail': 'Se abrirá tu app de correo con el mensaje listo para enviar.',
      'form.ok': '¡Listo! Ya solo te queda darle a enviar.',
      'form.off': 'Este canal todavía no está activo. Mientras tanto, escribe por Instagram a @giseeelz.',
      'form.hello': '¡Hola GISELZ! Te escribo desde tu web por un booking:',
      'form.subject': 'Booking',
      'contact.email': 'Email', 'contact.wa': 'WhatsApp', 'contact.ig': 'Instagram',
      'footer.top': 'Volver arriba', 'footer.rights': 'Todos los derechos reservados',
    },
    en: {
      'skip': 'Skip to content',
      'meta.title': 'GISELZ — Official website & booking',
      'meta.desc': 'Official website of GISELZ, open format DJ from Barcelona. Reggaeton, latin tech, tech house and house. Played at Pachá Barcelona and Sala Apolo. Dates, music and booking.',
      'nav.bio': 'Bio', 'nav.musica': 'Music', 'nav.fechas': 'Dates', 'nav.clubs': 'Clubs',
      'nav.galeria': 'Gallery', 'nav.videos': 'Videos', 'nav.press': 'Press', 'nav.booking': 'Booking',
      'menu.open': 'Open menu', 'menu.close': 'Close menu',
      'hero.kicker': 'DJ · Open format · BCN', 'hero.listen': 'Listen', 'hero.down': 'Scroll to bio',
      'genres.sr': 'Styles: ',
      'bio.kicker': 'Meet', 'bio.title': 'Bio', 'bio.more': 'Read more', 'bio.less': 'Read less', 'bio.highlights': 'Highlights',
      'music.kicker': 'Press play', 'music.title': 'Music', 'music.play': 'Play', 'music.more': 'More music on',
      'music.open': 'Listen on', 'feature.watch': 'Watch', 'top.next': 'Next date',
      'dates.kicker': 'Live', 'dates.title': 'Dates', 'dates.upcoming': 'Upcoming dates', 'dates.past': 'Past dates',
      'dates.tickets': 'Tickets', 'dates.info': 'Info', 'dates.soldout': 'Sold out', 'dates.soon': 'Info soon',
      'dates.empty.title': 'New dates coming soon', 'dates.empty.text': 'Want GISELZ at your club, festival or event?',
      'dates.empty.cta': 'Request a date', 'dates.demo': 'Demo mode · sample data, not real dates',
      'dates.demo.city': 'Sample city', 'dates.demo.venue': 'Sample venue',
      'clubs.kicker': 'Played at', 'clubs.title': 'Clubs', 'clubs.more': 'Parties, events & more',
      'gallery.kicker': 'Photos', 'gallery.title': 'Gallery', 'gallery.open': 'Enlarge photo',
      'lb.close': 'Close', 'lb.prev': 'Previous photo', 'lb.next': 'Next photo',
      'videos.kicker': 'In action', 'videos.title': 'Videos', 'videos.play': 'Play video', 'videos.open': 'Watch on',
      'videos.ig': 'Reels on Instagram', 'videos.tt': 'Videos on TikTok',
      'videos.moreIg': 'More reels on Instagram', 'videos.moreTt': 'More on TikTok',
      'press.kicker': 'For media & promoters', 'press.title': 'Press',
      'press.kit': 'Press kit', 'press.kitSub': 'Download PDF',
      'press.photos': 'Hi-res photos', 'press.logos': 'Logos', 'press.download': 'Download',
      'press.drive': 'Open Drive folder',
      'booking.kicker': 'Bookings', 'booking.title': 'Booking',
      'booking.intro': 'Clubs, festivals, private events and brands. Tell us about your event and we’ll get back to you.',
      'form.name': 'Name', 'form.type': 'Event type', 'form.typePick': 'Choose one',
      'form.type.club': 'Club', 'form.type.festival': 'Festival', 'form.type.private': 'Private event',
      'form.type.brand': 'Brand / corporate', 'form.type.other': 'Other',
      'form.date': 'Date', 'form.city': 'City', 'form.msg': 'Message', 'form.msgPh': 'Capacity, set time, crowd…',
      'form.sendWa': 'Send via WhatsApp', 'form.sendMail': 'Send via email',
      'form.note': 'Your WhatsApp or email app will open with the message ready to send.',
      'form.noteMail': 'Your email app will open with the message ready to send.',
      'form.ok': 'Done! Just hit send.',
      'form.off': 'This channel isn’t active yet. Meanwhile, DM @giseeelz on Instagram.',
      'form.hello': 'Hi GISELZ! Booking enquiry from your website:',
      'form.subject': 'Booking',
      'contact.email': 'Email', 'contact.wa': 'WhatsApp', 'contact.ig': 'Instagram',
      'footer.top': 'Back to top', 'footer.rights': 'All rights reserved',
    },
  };

  function storedLang() {
    try { return localStorage.getItem('giselz-lang'); } catch (e) { return null; }
  }
  function detectLang() {
    const forced = params.get('lang');
    if (forced === 'es' || forced === 'en') return forced;
    const saved = storedLang();
    if (saved === 'es' || saved === 'en') return saved;
    const langs = navigator.languages || [navigator.language || 'es'];
    if (langs.some((l) => /^(es|ca|gl|eu)\b/i.test(l))) return 'es';
    return /^en\b/i.test(langs[0] || '') ? 'en' : 'es';
  }
  let lang = detectLang();
  const t = (key) => (UI[lang] && UI[lang][key]) || UI.es[key] || key;
  const tx = (v) => (v == null ? '' : typeof v === 'string' || Array.isArray(v) ? v : v[lang] != null ? v[lang] : v.es || '');
  const locale = () => (lang === 'es' ? 'es-ES' : 'en-GB');
  // Textos bilingües que viven dentro de tarjetas ya pintadas (se actualizan al cambiar de idioma)
  const langHooks = [];
  function bindText(node, value) {
    if (value && typeof value === 'object' && !Array.isArray(value)) langHooks.push(() => { node.textContent = tx(value); });
    return node;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((node) => {
      node.textContent = t(node.dataset.i18n);
      if (node.hasAttribute('data-text')) node.dataset.text = node.textContent;
    });
    $$('[data-i18n-attr]').forEach((node) => {
      node.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':');
        node.setAttribute(attr, t(key));
      });
    });
    $$('.lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    document.title = t('meta.title');
    const desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc'));
    $$('.shot[data-label]').forEach((b) => b.setAttribute('aria-label', `${t('gallery.open')}: ${b.dataset.label}`));
    $('.burger').setAttribute('aria-label', t(document.body.classList.contains('menu-open') ? 'menu.close' : 'menu.open'));
    langHooks.forEach((fn) => fn());
    renderClaim();
    renderGenresSr();
    renderBio();
    renderDates();
    observeReveals();
    // Avisa a scroll.js de que el contenido ha cambiado (idioma, textos)
    document.dispatchEvent(new CustomEvent('giselz:render'));
  }
  $$('.lang button').forEach((b) =>
    b.addEventListener('click', () => {
      lang = b.dataset.lang;
      try { localStorage.setItem('giselz-lang', lang); } catch (e) { /* sin almacenamiento: no pasa nada */ }
      applyLang();
    })
  );

  /* ---------- Cabecera y menú ---------- */
  const head = $('.site-head');
  const burger = $('.burger');
  const menu = $('#menu');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      head.classList.toggle('is-solid', window.scrollY > 30);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', t(open ? 'menu.close' : 'menu.open'));
    if (open) setTimeout(() => { const a = $('a', menu); if (a) a.focus({ preventScroll: true }); }, 50);
  }
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); burger.focus(); }
  });

  /* ---------- 1. Hero ---------- */
  // La portada ya viene en el HTML (carga más rápido); aquí se ajusta a lo que diga datos.js
  function swapSrc(node, src) {
    if (node.getAttribute('src') === src) return;
    node.removeAttribute('width');
    node.removeAttribute('height');
    node.src = src;
  }
  function renderHero() {
    const img = D.imagenes || {};
    const hero = $('.hero');
    const box = $('.hero__photo');
    const useVideo = img.heroVideo && !reduceMotion && !saveData;
    if (useVideo) {
      const v = el('video', { autoplay: true, muted: true, loop: true, playsinline: true, preload: 'metadata', poster: img.hero || null });
      v.muted = true;
      v.append(el('source', { src: img.heroVideo, type: 'video/mp4' }));
      box.replaceChildren(v);
    } else if (img.hero) {
      swapSrc($('img', box), img.hero);
    } else if (img.hero === '') {
      // Solo se quita si se ha dejado vacío a propósito (si datos.js falla, se queda la del HTML)
      box.remove();
      hero.classList.remove('has-photo');
    }
    const logos = [$('.hero__logo'), $('.brand img')].filter(Boolean);
    if (img.logo) logos.forEach((l) => swapSrc(l, img.logo));
    else if (img.logo === '') {
      logos.forEach((l) => l.remove());
      hero.classList.remove('has-logo');
    }
  }
  function renderClaim() {
    const c = tx((D.textos || {}).claim);
    const p = $('#hero-claim');
    p.replaceChildren(textOr(c, 'frase de portada'));
  }

  /* ---------- 2. Marquesina ---------- */
  function renderMarquee() {
    const g = (D.generos || []).filter(Boolean);
    if (!g.length) return;
    const perHalf = Math.max(12, Math.ceil(12 / g.length) * g.length);
    $$('[data-marquee]').forEach((track, row) => {
      const frag = document.createDocumentFragment();
      for (let copy = 0; copy < 2; copy++) {
        for (let i = 0; i < perHalf; i++) {
          const name = g[(i + row * 2) % g.length];
          const variant = (i + row) % 3 === 1 ? ' tape__item--outline' : (i + row) % 5 === 3 ? ' tape__item--hand' : '';
          frag.append(el('span', { class: 'tape__item' + variant }, name), star());
        }
      }
      track.replaceChildren(frag);
    });
  }
  function renderGenresSr() {
    $('#genres-sr').textContent = t('genres.sr') + (D.generos || []).join(', ');
  }

  /* ---------- Foto de fondo de Booking ---------- */
  function renderBookingPhoto() {
    const sec = $('#booking');
    const img = $('.booking-bg img', sec);
    const src = (D.imagenes || {}).booking;
    if (src) { swapSrc(img, src); return; }
    if (src === '') { sec.classList.remove('has-photo'); $('.booking-bg', sec).remove(); }
  }

  /* ---------- 3. Bio ---------- */
  function renderBioPhoto() {
    const fig = $('#bio-photo');
    const src = (D.imagenes || {}).bio;
    const media = src
      ? el('div', { class: 'duo duo--hover' }, el('img', { src, alt: 'GISELZ', loading: 'lazy', decoding: 'async' }))
      : el('div', { class: 'placeholder' }, pendingTag('', 'foto para la bio (del presskit)'));
    fig.replaceChildren(el('span', { class: 'tape-strip', 'aria-hidden': 'true' }), media, el('span', { class: 'sticker', 'aria-hidden': 'true' }, 'open format'));
  }
  function renderBio() {
    const tt = D.textos || {};
    $('#bio-short').replaceChildren(textOr(tx(tt.bioCorta), 'bio corta del presskit'));
    let long = tx(tt.bioLarga);
    long = (Array.isArray(long) ? long : [long]).filter((p) => p != null && String(p).trim() !== '');
    const box = $('#bio-long');
    const toggle = $('#bio-toggle');
    box.replaceChildren(...long.map((p) => el('p', {}, textOr(p, 'párrafo de la bio larga'))));
    toggle.hidden = long.length === 0;
    const open = toggle.getAttribute('aria-expanded') === 'true';
    $('span', toggle).textContent = t(open ? 'bio.less' : 'bio.more');

    const list = $('#logros');
    const logros = (D.logros || []).filter(Boolean);
    list.replaceChildren(
      ...(logros.length ? logros : ['']).map((l) => el('li', {}, star(), textOr(tx(l), 'logros del presskit')))
    );

    // La cita va palabra a palabra para que se pueda iluminar al hacer scroll (scroll.js)
    const quote = tx(tt.cita);
    $('#cita').hidden = !quote;
    const words = String(quote || '').trim().split(/\s+/).filter(Boolean);
    $('#bio-quote-text').replaceChildren(...words.flatMap((w, i) => [el('span', { class: 'w' }, w), i < words.length - 1 ? ' ' : '']));
  }
  $('#bio-toggle').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    $('#bio-long').hidden = !open;
    $('span', btn).textContent = t(open ? 'bio.less' : 'bio.more');
  });

  /* ---------- Enlaces de plataformas → reproductores ---------- */
  const PLATFORM = {
    soundcloud: { name: 'SoundCloud', icon: 'soundcloud' },
    mixcloud: { name: 'Mixcloud', icon: 'mixcloud' },
    spotify: { name: 'Spotify', icon: 'spotify' },
    youtube: { name: 'YouTube', icon: 'youtube' },
    instagram: { name: 'Instagram', icon: 'instagram' },
    tiktok: { name: 'TikTok', icon: 'tiktok' },
    linktree: { name: 'Linktree', icon: 'linktree' },
  };
  function youtubeId(u) {
    if (u.hostname.endsWith('youtu.be')) return u.pathname.slice(1).split('/')[0];
    if (u.searchParams.get('v')) return u.searchParams.get('v');
    const m = u.pathname.match(/\/(shorts|embed|live|v)\/([\w-]{6,})/);
    return m ? m[2] : null;
  }
  // Traduce un enlace normal a su reproductor embebido
  function parseMedia(url) {
    let u;
    try { u = new URL(url); } catch (e) { return null; }
    const host = u.hostname.replace(/^(www|m|on)\./, '');
    if (host.endsWith('soundcloud.com')) {
      // Un perfil (soundcloud.com/usuario) o una playlist (/sets/) se ven como lista
      const parts = u.pathname.split('/').filter(Boolean);
      const isList = parts.length === 1 || parts.includes('sets') || ['tracks', 'popular-tracks', 'albums'].includes(parts[1]);
      return {
        platform: 'soundcloud', height: isList ? 450 : 166,
        src: 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url.split('?')[0]) +
          '&color=%23ff2e93&auto_play=true&hide_related=true&show_comments=false&show_reposts=false&visual=false',
      };
    }
    if (host.endsWith('mixcloud.com')) {
      return { platform: 'mixcloud', height: 120, src: 'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=1&feed=' + encodeURIComponent(u.pathname) };
    }
    if (host.endsWith('spotify.com')) {
      const m = u.pathname.match(/\/(track|album|playlist|artist|episode|show)\/([A-Za-z0-9]+)/);
      if (!m) return { platform: 'spotify', link: url };
      const compact = m[1] === 'track' || m[1] === 'episode';
      return { platform: 'spotify', height: compact ? 152 : 352, src: `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator` };
    }
    if (host.endsWith('youtube.com') || host.endsWith('youtu.be')) {
      const list = u.searchParams.get('list');
      const id = youtubeId(u);
      const vertical = u.pathname.startsWith('/shorts/');
      if (id) return { platform: 'youtube', ratio: vertical ? '9 / 16' : '16 / 9', vertical, id, thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1` };
      if (list) return { platform: 'youtube', ratio: '16 / 9', src: `https://www.youtube-nocookie.com/embed/videoseries?list=${list}&autoplay=1` };
      return { platform: 'youtube', link: url };
    }
    if (host.endsWith('instagram.com')) {
      const m = u.pathname.match(/\/(reel|reels|p|tv)\/([\w-]+)/);
      if (!m) return { platform: 'instagram', link: url };
      const kind = m[1] === 'p' ? 'p' : 'reel';
      return { platform: 'instagram', vertical: true, src: `https://www.instagram.com/${kind}/${m[2]}/embed/` };
    }
    if (host.endsWith('tiktok.com')) {
      const m = u.pathname.match(/\/video\/(\d+)/);
      if (!m) return { platform: 'tiktok', link: url };
      return { platform: 'tiktok', vertical: true, src: `https://www.tiktok.com/player/v1/${m[1]}?autoplay=1&music_info=1&description=1&rel=0` };
    }
    return { platform: null, link: url };
  }
  function iframe(src, title, extra) {
    return el('iframe', Object.assign({
      src, title, loading: 'lazy',
      allow: 'autoplay; encrypted-media; fullscreen; picture-in-picture; clipboard-write',
      allowfullscreen: true, referrerpolicy: 'strict-origin-when-cross-origin',
    }, extra || {}));
  }

  /* ---------- 4. Música: set destacado ("novedad") ---------- */
  function renderFeature() {
    const box = $('#feature');
    const f = D.destacado;
    if (!box) return;
    if (!f || isPending(f.url)) { box.hidden = true; return; }
    const info = parseMedia(f.url) || { link: f.url };
    const p = PLATFORM[info.platform] || { name: 'Link', icon: 'arrow' };
    const big = f.portada || (info.id ? `https://i.ytimg.com/vi/${info.id}/maxresdefault.jpg` : '');
    const small = f.portada || (info.id ? `https://i.ytimg.com/vi/${info.id}/hqdefault.jpg` : '');
    const title = tx(f.titulo);
    const media = el('div', { class: 'feature__media' });
    const play = () => {
      if (!info.src) { window.open(info.link || f.url, '_blank', 'noopener'); return; }
      const frame = iframe(info.src, title || p.name);
      frame.removeAttribute('loading');
      media.replaceChildren(frame);
      media.classList.add('is-playing');
    };
    const cover = el('img', { src: big, alt: '', loading: 'lazy', decoding: 'async' });
    cover.addEventListener('error', () => { if (small && cover.src !== small) cover.src = small; }, { once: true });
    const facadeLabel = () => `${t('music.play')}: ${title}`;
    const facade = el('button', { class: 'feature__facade', type: 'button', 'aria-label': facadeLabel() },
      big ? cover : null,
      el('span', { class: 'feature__play', 'aria-hidden': 'true' }, icon('play')));
    langHooks.push(() => facade.setAttribute('aria-label', facadeLabel()));
    facade.addEventListener('click', play);
    media.append(facade);
    const watch = el('button', { class: 'btn btn--outline btn--light', type: 'button' }, el('span', { 'data-i18n': 'feature.watch' }, t('feature.watch')), icon('eye'));
    watch.addEventListener('click', () => { play(); media.scrollIntoView({ block: 'center', behavior: 'smooth' }); });
    const outUrl = info.id ? `https://www.youtube.com/watch?v=${info.id}` : f.url;
    box.replaceChildren(
      small ? el('div', { class: 'feature__bg', 'aria-hidden': 'true' }, el('img', { src: small, alt: '', loading: 'lazy', decoding: 'async' })) : null,
      el('div', { class: 'feature__inner wrap' },
        media,
        el('div', { class: 'feature__text reveal' },
          f.etiqueta ? bindText(el('span', { class: 'feature__tag' }, tx(f.etiqueta)), f.etiqueta) : null,
          bindText(el('h3', { class: 'feature__title' }, title), f.titulo),
          f.subtitulo ? bindText(el('p', { class: 'feature__sub' }, tx(f.subtitulo)), f.subtitulo) : null,
          el('div', { class: 'feature__actions' },
            watch,
            el('a', Object.assign({ class: 'feature__out', href: outUrl }, extAttrs(outUrl)), icon(p.icon), el('span', {}, el('span', { 'data-i18n': 'videos.open' }, t('videos.open')), ` ${p.name}`), icon('arrow'))))));
    box.hidden = false;
  }

  /* ---------- 4. Música ---------- */
  function renderMusic() {
    const box = $('#players');
    const items = (D.musica || []).length ? D.musica : [{ titulo: '', url: '' }];
    box.replaceChildren(...items.map((m, i) => {
      const card = el('article', { class: 'player reveal', style: `--d:${i * 90}ms` });
      if (isPending(m.url)) {
        card.classList.add('player--pending');
        card.append(el('div', { class: 'player__facade' },
          el('span', { class: 'player__btn', 'aria-hidden': 'true' }, icon('play')),
          el('span', { class: 'player__meta' },
            el('span', { class: 'player__platform' }, 'SoundCloud · Mixcloud · Spotify · YouTube'),
            el('span', { class: 'player__title' }, textOr(tx(m.titulo), 'nombre del mix'))),
          el('p', { class: 'player__hint' }, pendingTag('', 'pega el enlace del mix en assets/js/datos.js → MUSICA'))));
        return card;
      }
      const info = parseMedia(m.url) || { link: m.url };
      const p = PLATFORM[info.platform] || { name: 'Link', icon: 'arrow' };
      const title = isPending(tx(m.titulo)) ? p.name : tx(m.titulo);
      const titleNode = () => bindText(el('span', { class: 'player__title' }, title), isPending(tx(m.titulo)) ? null : m.titulo);
      if (!info.src) {
        card.append(el('a', Object.assign({ class: 'player__facade', href: info.link }, extAttrs(info.link)),
          el('span', { class: 'player__btn', 'aria-hidden': 'true' }, icon('arrow')),
          el('span', { class: 'player__meta' },
            el('span', { class: 'player__platform' }, icon(p.icon), el('span', {}, el('span', { 'data-i18n': 'music.open' }, t('music.open')), ` ${p.name}`)),
            titleNode())));
        return card;
      }
      const facade = el('button', { class: 'player__facade', type: 'button' },
        el('span', { class: 'sr-only', 'data-i18n': 'music.play' }, t('music.play')),
        el('span', { class: 'player__btn', 'aria-hidden': 'true' }, icon('play')),
        el('span', { class: 'player__meta' },
          el('span', { class: 'player__platform' }, icon(p.icon), p.name),
          titleNode()),
        eq('player__eq'));
      facade.addEventListener('click', () => {
        const frame = iframe(info.src, title, info.height ? { height: info.height } : { style: `aspect-ratio:${info.ratio || '16 / 9'};height:auto` });
        frame.removeAttribute('loading');
        card.replaceChildren(frame);
      });
      card.append(facade);
      return card;
    }));

    // Enlaces a perfiles de música que no salgan ya arriba como tarjeta
    const r = D.redes || {};
    const used = new Set((D.musica || []).map((m) => (parseMedia(m.url) || {}).platform).filter(Boolean));
    const links = ['soundcloud', 'mixcloud', 'spotify', 'youtube'].filter((k) => r[k] && !isPending(r[k]) && !used.has(k));
    $('#platforms').replaceChildren(...links.map((k) => el('a', Object.assign({ class: 'chip', href: r[k] }, extAttrs(r[k])), icon(PLATFORM[k].icon), PLATFORM[k].name)));
  }

  /* ---------- 5. Fechas ---------- */
  // Acepta 2026-11-14 y también 14/11/2026, 14-11-2026, 14.11.2026 o 14/11/26
  function parseDate(s) {
    const str = String(s || '').trim();
    let y, mo, da;
    let m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(str);
    if (m) [y, mo, da] = [+m[1], +m[2], +m[3]];
    else if ((m = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2}|\d{4})$/.exec(str))) [da, mo, y] = [+m[1], +m[2], +m[3] < 100 ? 2000 + +m[3] : +m[3]];
    else return null;
    const d = new Date(y, mo - 1, da);
    return d.getMonth() === mo - 1 && d.getDate() === da ? d : null;
  }
  const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  /* Fechas desde una hoja de Google (HOJA_FECHAS en datos.js).
     La hoja tiene que estar compartida como "cualquier persona con el enlace". */
  let sheetGigs = [];
  let sheetBad = [];
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z]/g, '');
  const COLS = {
    fecha: ['fecha', 'date', 'dia'], ciudad: ['ciudad', 'city', 'localidad'], sala: ['sala', 'club', 'lugar', 'venue', 'local'],
    evento: ['evento', 'fiesta', 'event', 'nombre'], entradas: ['entradas', 'tickets', 'ticket', 'venta'],
    info: ['info', 'masinfo', 'enlace', 'link', 'instagram'], agotado: ['agotado', 'agotadas', 'soldout'],
  };
  function colKey(label) {
    const n = norm(label);
    return Object.keys(COLS).find((k) => COLS[k].includes(n)) || null;
  }
  function cellText(c) {
    if (!c || c.v == null) return '';
    if (typeof c.v === 'string' && /^Date\(/.test(c.v)) {
      const p = c.v.match(/\d+/g).map(Number);
      return isoDate(new Date(p[0], p[1], p[2]));
    }
    return typeof c.v === 'string' ? c.v.trim() : (c.f != null ? String(c.f) : String(c.v));
  }
  function fixUrl(u) {
    u = String(u || '').trim();
    if (!u) return '';
    if (/^@[\w.]+$/.test(u)) return `https://www.instagram.com/${u.slice(1)}/`;
    if (!/^https?:\/\//i.test(u) && /\.[a-z]{2,}/i.test(u)) return 'https://' + u;
    return u;
  }
  function rowsToGigs(headers, rows) {
    const keys = headers.map(colKey);
    if (!keys.includes('fecha')) return null;
    const gigs = [];
    const bad = [];
    rows.forEach((cells) => {
      const g = {};
      keys.forEach((k, i) => { if (k) g[k] = cells[i] || ''; });
      if (!g.fecha && !g.sala && !g.ciudad) return;
      const d = parseDate(g.fecha);
      if (!d) { if (g.fecha) bad.push(g.fecha); return; }
      gigs.push({
        fecha: isoDate(d), ciudad: g.ciudad, sala: g.sala, evento: g.evento,
        entradas: fixUrl(g.entradas), info: fixUrl(g.info),
        agotado: /^(s[ií]|x|yes|y|true|1|agotad|sold)/i.test(String(g.agotado || '').trim()),
      });
    });
    return { gigs, bad };
  }
  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cur = '';
    let q = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (q) {
        if (ch === '"' && text[i + 1] === '"') { cur += '"'; i++; } else if (ch === '"') q = false; else cur += ch;
      } else if (ch === '"') q = true;
      else if (ch === ',') { row.push(cur); cur = ''; }
      else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(cur); rows.push(row); row = []; cur = '';
      } else cur += ch;
    }
    if (cur || row.length) { row.push(cur); rows.push(row); }
    return rows.map((r) => r.map((c) => c.trim()));
  }
  function loadSheetDates() {
    const link = String(D.hojaFechas || '').trim();
    const pub = link.match(/\/spreadsheets\/d\/e\/([\w-]+)/);
    const id = !pub && link.match(/\/spreadsheets\/d\/([\w-]+)/);
    if (!pub && !id) return;
    const gid = (link.match(/[#?&]gid=(\d+)/) || [])[1];
    const url = pub
      ? `https://docs.google.com/spreadsheets/d/e/${pub[1]}/pub?output=csv${gid ? '&gid=' + gid : ''}`
      : `https://docs.google.com/spreadsheets/d/${id[1]}/gviz/tq?tqx=out:json&headers=1${gid ? '&gid=' + gid : ''}`;
    fetch(url, { cache: 'no-store' })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then((text) => {
        let res;
        if (pub) {
          const rows = parseCsv(text).filter((r) => r.some(Boolean));
          res = rows.length ? rowsToGigs(rows[0], rows.slice(1)) : null;
        } else {
          const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
          if (json.status === 'error') throw new Error('hoja');
          const t = json.table || {};
          const headers = (t.cols || []).map((c) => c.label || '');
          const rows = (t.rows || []).map((r) => (r.c || []).map(cellText));
          res = rowsToGigs(headers, rows);
          // Si la hoja no marca la primera fila como encabezado, se usa esa fila
          if (!res && rows.length) res = rowsToGigs(rows[0], rows.slice(1));
        }
        if (!res) throw new Error('sin columna Fecha');
        sheetGigs = res.gigs;
        sheetBad = res.bad;
        renderDates();
        observeReveals();
        document.dispatchEvent(new CustomEvent('giselz:render'));
      })
      .catch((e) => {
        console.warn('[GISELZ] No se pudo leer la hoja de fechas (¿está compartida como "cualquier persona con el enlace"?):', e.message);
      });
  }
  function demoGigs() {
    const iso = (offset) => {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };
    const c = t('dates.demo.city');
    const v = t('dates.demo.venue');
    return [
      { fecha: iso(9), ciudad: c + ' 1', sala: v + ' 1', entradas: '#booking' },
      { fecha: iso(23), ciudad: c + ' 2', sala: v + ' 2', entradas: '#booking', agotado: true },
      { fecha: iso(41), ciudad: c + ' 3', sala: v + ' 3', entradas: '' },
      { fecha: iso(-12), ciudad: c + ' 4', sala: v + ' 4', entradas: '' },
      { fecha: iso(-40), ciudad: c + ' 5', sala: v + ' 5', entradas: '' },
    ];
  }
  function gigRow(g, past) {
    const fmt = (opts) => new Intl.DateTimeFormat(locale(), opts).format(g.d).replace('.', '').toUpperCase();
    const thisYear = new Date().getFullYear();
    const date = el('time', { class: 'gig__date', datetime: g.fecha },
      el('span', { class: 'gig__dow' }, fmt({ weekday: 'short' })),
      el('span', { class: 'gig__day' }, String(g.d.getDate())),
      el('span', { class: 'gig__mon' }, fmt({ month: 'short' })),
      g.d.getFullYear() !== thisYear ? el('span', { class: 'gig__year' }, String(g.d.getFullYear())) : null);
    let cta = null;
    if (!past) {
      if (g.agotado) cta = el('span', { class: 'gig__tag gig__tag--soldout' }, t('dates.soldout'));
      else if (g.entradas && !isPending(g.entradas)) {
        cta = el('a', Object.assign({ class: 'btn btn--ink', href: g.entradas }, extAttrs(g.entradas)), t('dates.tickets'), icon('arrow'));
      } else if (g.info && !isPending(g.info)) {
        cta = el('a', Object.assign({ class: 'btn btn--ink', href: g.info }, extAttrs(g.info)), t('dates.info'), icon('arrow'));
      } else cta = el('span', { class: 'gig__tag gig__tag--soon' }, t('dates.soon'));
    }
    return el('li', { class: 'gig' + (past ? ' gig--past' : ' reveal') },
      date,
      el('div', { class: 'gig__info' },
        el('p', { class: 'gig__city' }, textOr(g.ciudad, 'ciudad')),
        el('p', { class: 'gig__venue' }, g.evento ? `${g.evento} · ` : '', textOr(g.sala, 'sala'))),
      cta ? el('div', { class: 'gig__cta' }, cta) : null);
  }
  function renderDates() {
    const box = $('#gigs');
    const demo = params.has('demo');
    // Fechas de datos.js + las de la hoja de Google (si una está en las dos, sale una vez)
    const merged = new Map();
    (demo ? demoGigs() : (D.fechas || []).concat(sheetGigs)).filter(Boolean).forEach((g) => {
      const d = parseDate(g.fecha);
      const key = d ? `${isoDate(d)}|${norm(g.sala)}` : `bad|${g.fecha}`;
      merged.set(key, g);
    });
    const source = [...merged.values()];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bad = demo ? [] : sheetBad.slice();
    const all = source.map((g) => Object.assign({}, g, { d: parseDate(g.fecha) }))
      .filter((g) => (g.d ? true : (bad.push(g.fecha), false)));
    const upcoming = all.filter((g) => g.d >= today).sort((a, b) => a.d - b.d);
    const past = all.filter((g) => g.d < today).sort((a, b) => b.d - a.d);

    const out = [];
    if (demo) out.push(el('p', { class: 'demo-flag' }, t('dates.demo')));
    if (upcoming.length) {
      out.push(el('h3', { class: 'gigs__label' }, eq(), t('dates.upcoming')));
      out.push(el('ul', { class: 'gig-list' }, upcoming.map((g) => gigRow(g, false))));
    } else {
      out.push(el('div', { class: 'gigs-empty reveal' },
        el('p', { class: 'gigs-empty__title' }, t('dates.empty.title')),
        el('p', {}, t('dates.empty.text')),
        demo || source.length || D.hojaFechas ? null : pendingTag('', 'añadir los bolos en la hoja de fechas o en datos.js → FECHAS'),
        el('a', { class: 'btn btn--pink', href: '#booking' }, t('dates.empty.cta'), icon('arrow'))));
    }
    if (past.length) {
      out.push(el('details', { class: 'past' },
        el('summary', {}, `${t('dates.past')} (${past.length})`, icon('plus')),
        el('ul', { class: 'gig-list' }, past.map((g) => gigRow(g, true)))));
    }
    bad.forEach((f) => out.push(el('p', { class: 'gig-warn' }, pendingTag(`[PENDIENTE: la fecha "${f}" no se entiende. Escríbela como 14/11/2026]`))));
    box.replaceChildren(...out);
    renderTopNext(demo ? null : upcoming[0]);

    // Datos estructurados para que Google muestre los eventos
    const old = $('#ld-events');
    if (old) old.remove();
    const events = demo ? [] : upcoming.filter((g) => !isPending(g.sala) && !isPending(g.ciudad));
    if (events.length) {
      const ld = el('script', { type: 'application/ld+json', id: 'ld-events' });
      ld.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': events.map((g) => {
          const ev = {
            '@type': 'MusicEvent', name: g.evento ? `${g.evento} · GISELZ` : `GISELZ @ ${g.sala}`, startDate: isoDate(g.d),
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: { '@type': 'Place', name: g.sala, address: { '@type': 'PostalAddress', addressLocality: g.ciudad } },
            performer: { '@type': 'Person', name: 'GISELZ' },
          };
          if (g.info && isExternal(g.info)) ev.url = g.info;
          if (g.entradas && isExternal(g.entradas)) {
            ev.offers = { '@type': 'Offer', url: g.entradas, availability: g.agotado ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock' };
          }
          return ev;
        }),
      });
      document.head.append(ld);
    }
  }

  /* ---------- 6. Clubs ---------- */
  function renderClubs() {
    const wall = $('#wall');
    const list = (D.clubs || []).filter(Boolean);
    const items = list.length ? list : [''];
    wall.replaceChildren(...items.map((c, i) => {
      const item = typeof c === 'string' ? { nombre: c } : c;
      const variant = isPending(item.nombre) ? '' : i % 3 === 1 ? ' wall__item--outline' : i % 5 === 3 ? ' wall__item--hand' : '';
      const li = el('li', { class: 'wall__item reveal' + variant, style: `--d:${(i % 6) * 70}ms` });
      if (item.logo) li.append(el('img', { src: item.logo, alt: item.nombre || '', loading: 'lazy', decoding: 'async' }));
      else li.append(el('span', { class: 'wall__name' }, textOr(item.nombre, 'clubs, eventos y festivales del presskit')));
      if (item.ciudad) li.append(el('span', { class: 'sr-only' }, ', '), el('span', { class: 'wall__city' }, item.ciudad));
      return li;
    }));

    const groups = (D.eventos || []).filter((g) => g && (g.nombres || []).length);
    const box = $('#scene');
    box.hidden = !groups.length;
    box.replaceChildren(
      el('h3', { class: 'scene__head', 'data-i18n': 'clubs.more' }, t('clubs.more')),
      el('div', { class: 'scene__grid' }, groups.map((g, i) => el('div', { class: 'scene__group reveal', style: `--d:${i * 90}ms` },
        bindText(el('h4', { class: 'scene__title' }, tx(g.grupo)), g.grupo),
        el('ul', { class: 'scene__list' }, g.nombres.map((n) => el('li', {}, n)))))));
  }

  /* ---------- 7. Galería + visor ---------- */
  let photos = [];
  let current = 0;
  const lb = $('#lightbox');
  const lbImg = $('.lightbox__img', lb);
  function renderGallery() {
    const grid = $('#gallery');
    photos = (D.galeria || []).filter((f) => f && f.foto);
    if (!photos.length) {
      grid.replaceChildren(...Array.from({ length: 6 }, (_, i) =>
        el('div', { class: 'shot shot--pending reveal', style: `--d:${(i % 4) * 80}ms` },
          el('div', { class: 'placeholder placeholder--dark' }, pendingTag('', `foto ${String(i + 1).padStart(2, '0')} del presskit`)))));
      return;
    }
    grid.replaceChildren(...photos.map((f, i) =>
      el('button', {
        class: 'shot reveal', type: 'button', style: `--d:${(i % 4) * 80}ms`,
        'aria-label': `${t('gallery.open')}: ${f.texto || 'GISELZ'}`,
        'data-label': f.texto || 'GISELZ',
        onclick: () => openLightbox(i),
      },
      i % 5 === 2 ? el('span', { class: 'tape-strip', 'aria-hidden': 'true' }) : null,
      el('span', { class: 'duo' }, el('img', { src: f.foto, alt: f.texto || 'GISELZ', loading: 'lazy', decoding: 'async' })),
      el('span', { class: 'shot__zoom', 'aria-hidden': 'true' }, icon('plus')))));
  }
  function showPhoto(i) {
    current = (i + photos.length) % photos.length;
    const f = photos[current];
    lbImg.src = f.foto;
    lbImg.alt = f.texto || 'GISELZ';
    $('.lightbox__cap', lb).textContent = f.texto || '';
    $('.lightbox__count', lb).textContent = `${String(current + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
    const multi = photos.length > 1;
    $('.lightbox__prev', lb).hidden = !multi;
    $('.lightbox__next', lb).hidden = !multi;
    // precarga las vecinas para que el paso sea instantáneo
    [current + 1, current - 1].forEach((n) => { const p = photos[(n + photos.length) % photos.length]; if (p) new Image().src = p.foto; });
  }
  function openLightbox(i) {
    showPhoto(i);
    if (typeof lb.showModal === 'function') lb.showModal();
    else lb.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (typeof lb.close === 'function') lb.close();
    else lb.removeAttribute('open');
  }
  lb.addEventListener('close', () => {
    document.body.style.overflow = '';
    const btn = $$('#gallery .shot')[current];
    if (btn) btn.focus({ preventScroll: true });
  });
  $('.lightbox__close', lb).addEventListener('click', closeLightbox);
  $('.lightbox__prev', lb).addEventListener('click', () => showPhoto(current - 1));
  $('.lightbox__next', lb).addEventListener('click', () => showPhoto(current + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lightbox__fig')) closeLightbox(); });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') showPhoto(current + 1);
    if (e.key === 'ArrowLeft') showPhoto(current - 1);
  });
  let touchX = null;
  lb.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50 && photos.length > 1) showPhoto(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---------- 8. Vídeos ---------- */
  // Mientras no haya vídeos, tarjetas que llevan a sus reels de Instagram y a su TikTok
  function profileCards() {
    const r = D.redes || {};
    const fotos = (D.galeria || []).filter((f) => f && f.foto);
    const igUrl = r.instagram && !isPending(r.instagram) ? r.instagram.replace(/\/?(\?.*)?$/, '/') + 'reels/' : '';
    const ttUrl = r.tiktok && !isPending(r.tiktok) ? r.tiktok : '';
    const handle = (url) => (url.match(/(?:instagram\.com\/|@)([\w.]+)/) || [])[1] || '';
    return [['instagram', igUrl, 'videos.ig'], ['tiktok', ttUrl, 'videos.tt']].filter(([, url]) => url).map(([k, url, key], i) => {
      const foto = fotos.length ? fotos[(i * 2 + 1) % fotos.length].foto : '';
      const cover = foto
        ? el('span', { class: 'reel__cover duo' }, el('img', { src: foto, alt: '', loading: 'lazy', decoding: 'async' }))
        : el('span', { class: 'reel__cover placeholder placeholder--dark' });
      return el('article', { class: 'reel reveal', style: `--d:${i * 90}ms` },
        el('a', Object.assign({ class: 'reel__facade', href: url }, extAttrs(url)),
          cover, el('span', { class: 'reel__shade' }),
          el('span', { class: 'reel__badge' }, icon(PLATFORM[k].icon), PLATFORM[k].name),
          el('span', { class: 'reel__play', 'aria-hidden': 'true' }, icon('arrow')),
          el('span', { class: 'reel__title' }, el('span', { 'data-i18n': key }, t(key)), handle(url) ? el('span', { class: 'reel__handle' }, '@' + handle(url)) : null)));
    });
  }
  /* Vista previa oficial de Instagram (embed.js). Se carga solo cuando la sección se acerca
     a la pantalla; si el navegador la bloquea o no carga, se quedan las tarjetas con foto. */
  function loadScript(src, timeout) {
    return new Promise((resolve, reject) => {
      const s = el('script', { src, async: true });
      const timer = setTimeout(() => reject(new Error('timeout')), timeout);
      s.onload = () => { clearTimeout(timer); resolve(); };
      s.onerror = () => { clearTimeout(timer); reject(new Error('error')); };
      document.body.append(s);
    });
  }
  function setupInstagramEmbeds() {
    const cards = $$('#reels .reel[data-ig]');
    if (!cards.length) return;
    const start = () => {
      const holders = cards.map((card) => {
        const holder = el('div', { class: 'reel__embed', 'aria-hidden': 'true' },
          el('blockquote', { class: 'instagram-media', 'data-instgrm-permalink': card.dataset.ig + '?utm_source=ig_embed&utm_campaign=loading', 'data-instgrm-version': '14' },
            el('a', { href: card.dataset.ig, target: '_blank', rel: 'noopener' }, 'Instagram')));
        card.append(holder);
        return holder;
      });
      const giveUp = (holder) => holder.remove();
      loadScript('https://www.instagram.com/embed.js', 12000).then(() => {
        if (window.instgrm && window.instgrm.Embeds) window.instgrm.Embeds.process();
        holders.forEach((holder) => {
          const card = holder.parentNode;
          let done = false;
          const check = () => {
            const frame = $('iframe', holder);
            if (done || !frame || frame.offsetHeight < 300) return;
            done = true;
            // La vista previa ya tiene contenido: sustituye a la tarjeta con foto
            $$(':scope > :not(.reel__embed)', card).forEach((n) => n.remove());
            holder.removeAttribute('aria-hidden');
            card.classList.add('reel--embed');
          };
          const ro = 'ResizeObserver' in window ? new ResizeObserver(check) : null;
          if (ro) new MutationObserver(() => { const f = $('iframe', holder); if (f) ro.observe(f); check(); }).observe(holder, { childList: true, subtree: true });
          const poll = setInterval(check, 500);
          setTimeout(() => { clearInterval(poll); if (ro) ro.disconnect(); if (!done) giveUp(holder); }, 15000);
        });
      }).catch(() => holders.forEach(giveUp));
    };
    const section = $('#videos');
    if (!('IntersectionObserver' in window)) return start();
    const io2 = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io2.disconnect(); start(); }
    }, { rootMargin: '900px 0px' });
    io2.observe(section);
  }

  function renderVideoLinks(show) {
    const r = D.redes || {};
    const links = show ? [['instagram', r.instagram && !isPending(r.instagram) ? r.instagram.replace(/\/?(\?.*)?$/, '/') + 'reels/' : '', 'videos.moreIg'],
      ['tiktok', r.tiktok && !isPending(r.tiktok) ? r.tiktok : '', 'videos.moreTt']].filter(([, url]) => url) : [];
    $('#video-links').replaceChildren(...links.map(([k, url, key]) =>
      el('a', Object.assign({ class: 'chip', href: url }, extAttrs(url)), icon(PLATFORM[k].icon), el('span', { 'data-i18n': key }, t(key)))));
  }
  function renderVideos() {
    const row = $('#reels');
    const hasVideos = (D.videos || []).some((v) => v && !isPending(v.url));
    renderVideoLinks(hasVideos);
    if (!hasVideos) {
      const cards = profileCards();
      if (cards.length) return row.replaceChildren(...cards);
    }
    const list = (D.videos || []).length ? D.videos : [{}, {}, {}];
    row.replaceChildren(...list.map((v, i) => {
      const card = el('article', { class: 'reel reveal', style: `--d:${(i % 4) * 90}ms` });
      if (isPending(v.url)) {
        card.classList.add('reel--pending');
        card.append(el('div', { class: 'placeholder placeholder--dark reel__cover' }),
          el('div', { class: 'reel__body' },
            el('span', { class: 'reel__icons', 'aria-hidden': 'true' }, icon('instagram'), icon('tiktok'), icon('youtube')),
            el('div', {}, el('p', { class: 'reel__title' }, textOr(tx(v.titulo), `vídeo ${i + 1}`)))),
          el('div', { style: 'position:absolute;left:16px;right:16px;bottom:72px;z-index:3' }, pendingTag('', 'pega el enlace del Reel, TikTok o YouTube en datos.js → VIDEOS')));
        return card;
      }
      const info = parseMedia(v.url) || { link: v.url };
      const p = PLATFORM[info.platform] || { name: 'Link', icon: 'arrow' };
      const title = isPending(tx(v.titulo)) ? '' : tx(v.titulo);
      const coverSrc = v.portada || info.thumb;
      const cover = coverSrc
        ? el('span', { class: 'reel__cover duo' }, el('img', { src: coverSrc, alt: '', loading: 'lazy', decoding: 'async' }))
        : el('span', { class: 'reel__cover placeholder placeholder--dark' });
      const inner = [cover, el('span', { class: 'reel__shade' }),
        el('span', { class: 'reel__badge' }, icon(p.icon), p.name),
        el('span', { class: 'reel__play', 'aria-hidden': 'true' }, icon(info.src || info.platform === 'instagram' ? 'play' : 'arrow')),
        title ? el('span', { class: 'reel__title' }, title) : null];
      // Instagram: primero una tarjeta con foto que enlaza al reel; al acercarse a la sección
      // se cambia por la vista previa oficial de Instagram (ver setupInstagramEmbeds)
      if (!info.src || info.platform === 'instagram') {
        const href = info.link || (info.src ? info.src.replace(/embed\/$/, '') : v.url);
        if (info.platform === 'instagram' && info.src) card.dataset.ig = href;
        const label = () => `${t('videos.open')} ${p.name}: ${title || 'reel ' + (i + 1)}`;
        const link = el('a', Object.assign({ class: 'reel__facade', href, 'aria-label': label() }, extAttrs(href)), inner);
        langHooks.push(() => link.setAttribute('aria-label', label()));
        card.append(link);
        return card;
      }
      const label = () => `${t('videos.play')}: ${title || i + 1} (${p.name})`;
      const btn = el('button', { class: 'reel__facade', type: 'button', 'aria-label': label() }, inner);
      langHooks.push(() => btn.setAttribute('aria-label', label()));
      btn.addEventListener('click', () => {
        const frame = iframe(info.src, title || p.name, info.platform === 'instagram' ? { scrolling: 'no' } : null);
        frame.removeAttribute('loading');
        card.replaceChildren(frame);
      });
      card.append(btn);
      return card;
    }));
  }

  /* ---------- 9. Press ---------- */
  function renderPress() {
    const p = D.press || {};
    const sub = (url, localKey) => (isExternal(url || '') && /drive\.google\./.test(url) ? 'press.drive' : localKey);
    const cards = [
      { url: p.presskit, type: 'PDF', label: 'press.kit', sub: 'press.kitSub', mod: 'main', missing: 'sube el PDF a assets/presskit/GISELZ-presskit.pdf' },
      { url: p.fotos, type: 'JPG', label: 'press.photos', sub: sub(p.fotos, 'press.download'), mod: 'fotos', missing: 'enlace a fotos en alta' },
      { url: p.logos, type: 'PNG', label: 'press.logos', sub: sub(p.logos, 'press.download'), mod: 'logos', missing: 'enlace a logos en alta' },
    ];
    const box = $('#press-cards');
    box.replaceChildren(...cards.map((c, i) => {
      const local = !isExternal(c.url || '');
      const body = [
        el('span', { class: 'press-card__icon', 'aria-hidden': 'true' }, icon(local ? 'download' : 'arrow')),
        c.type ? el('span', { class: 'press-card__type', 'aria-hidden': 'true' }, c.type) : null,
        el('span', { class: 'press-card__text' }, el('span', { class: 'press-card__label', 'data-i18n': c.label }, t(c.label)), el('span', { class: 'press-card__sub', 'data-i18n': c.sub }, t(c.sub))),
      ];
      const cls = `press-card press-card--${c.mod} reveal`;
      const pendingCard = () => el('div', { class: cls + ' is-pending is-in', style: `--d:${i * 90}ms` }, body, pendingTag('', c.missing));
      if (isPending(c.url)) return pendingCard();
      const fileName = local ? 'GISELZ-' + c.url.split('/').pop().replace(/^GISELZ-/, '') : null;
      const link = el('a', Object.assign({ class: cls, href: c.url, style: `--d:${i * 90}ms` }, local ? { download: fileName } : extAttrs(c.url)), body);
      if (local) {
        // Si el archivo aún no está subido, el botón se muestra como pendiente
        fetch(c.url, { method: 'HEAD' })
          .then((r) => { if (!r.ok) throw new Error(r.status); })
          .catch(() => link.replaceWith(pendingCard()));
      }
      return link;
    }));
  }

  /* ---------- 10. Booking ---------- */
  const C = D.contacto || {};
  const email = isPending(C.email) ? '' : String(C.email).trim();
  const wa = String(C.whatsapp || '').replace(/\D/g, '');
  const ig = String(C.instagram || 'giseeelz').replace(/^@/, '');
  function prettyPhone(n) {
    if (n.startsWith('34') && n.length === 11) return `+34 ${n.slice(2, 5)} ${n.slice(5, 7)} ${n.slice(7, 9)} ${n.slice(9)}`;
    return '+' + n;
  }
  function renderContact() {
    const rows = [
      { key: 'contact.email', icon: 'mail', value: email, href: email && `mailto:${email}`, missing: 'email de booking' },
      // Sin número en datos.js, la fila de WhatsApp no se muestra
      wa ? { key: 'contact.wa', icon: 'whatsapp', value: prettyPhone(wa), href: `https://wa.me/${wa}` } : null,
      { key: 'contact.ig', icon: 'instagram', value: '@' + ig, handle: true, href: `https://www.instagram.com/${ig}/` },
    ];
    $('#contact-list').replaceChildren(...rows.filter(Boolean).map((r) => {
      const inner = [
        el('span', { class: 'contact__icon', 'aria-hidden': 'true' }, icon(r.icon)),
        el('span', {}, el('span', { class: 'contact__label', 'data-i18n': r.key }, t(r.key)),
          r.value ? el('span', { class: 'contact__value' + (r.handle ? ' contact__value--handle' : '') }, r.value) : pendingTag('', r.missing)),
      ];
      return el('li', { class: 'contact__item' }, r.href
        ? el('a', Object.assign({ href: r.href }, extAttrs(r.href)), inner, icon('arrow', 'icon--go'))
        : el('div', {}, inner));
    }));
  }
  const form = $('#booking-form');
  if (!wa) {
    // Sin WhatsApp: solo se envía por email, y ese pasa a ser el botón principal
    const waBtn = $('button[value="whatsapp"]', form);
    if (waBtn) waBtn.remove();
    const mailBtn = $('button[value="email"]', form);
    if (mailBtn) mailBtn.classList.replace('btn--outline', 'btn--pink');
    $('.form__note', form).dataset.i18n = 'form.noteMail';
  }
  const dateInput = $('#f-fecha');
  dateInput.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const via = (e.submitter && e.submitter.value) || (wa ? 'whatsapp' : 'email');
    const f = new FormData(form);
    const typeOpt = $('#f-tipo').selectedOptions[0];
    const d = parseDate(f.get('fecha'));
    const dateTxt = d ? new Intl.DateTimeFormat(locale(), { dateStyle: 'long' }).format(d) : f.get('fecha');
    const lines = [
      t('form.hello'), '',
      `· ${t('form.name')}: ${f.get('nombre')}`,
      `· ${t('form.type')}: ${typeOpt ? typeOpt.textContent : ''}`,
      `· ${t('form.date')}: ${dateTxt}`,
      `· ${t('form.city')}: ${f.get('ciudad')}`,
      '', String(f.get('mensaje') || ''),
    ];
    const text = lines.join('\n');
    const status = $('#form-status');
    let url = '';
    if (via === 'whatsapp' && wa) url = `https://wa.me/${wa}?text=${encodeURIComponent(text)}`;
    if (via === 'email' && email) {
      const subject = `${t('form.subject')} · ${typeOpt ? typeOpt.textContent : ''} · ${f.get('ciudad')} · ${dateTxt}`;
      url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    if (!url) {
      status.replaceChildren(t('form.off'), el('br'), pendingTag('', via === 'whatsapp' ? 'número de WhatsApp en datos.js → CONTACTO' : 'email de booking en datos.js → CONTACTO'));
      return;
    }
    status.textContent = t('form.ok');
    if (via === 'whatsapp') window.open(url, '_blank', 'noopener');
    else window.location.href = url;
  });

  /* ---------- 11. Redes (menú y footer) ---------- */
  function renderSocials() {
    const r = D.redes || {};
    const list = ['instagram', 'linktree', 'tiktok', 'soundcloud', 'mixcloud', 'spotify', 'youtube']
      .filter((k) => r[k] && !isPending(r[k]))
      .map((k) => ({ href: r[k], icon: PLATFORM[k].icon, label: PLATFORM[k].name }));
    if (wa) list.push({ href: `https://wa.me/${wa}`, icon: 'whatsapp', label: 'WhatsApp' });
    if (email) list.push({ href: `mailto:${email}`, icon: 'mail', label: 'Email' });
    $$('[data-socials]').forEach((box) => box.replaceChildren(...list.map((s) =>
      el('a', Object.assign({ class: 'social', href: s.href, 'aria-label': s.label }, extAttrs(s.href)), icon(s.icon)))));
    // Barra fina de arriba (en toda la web): solo las redes principales
    const top = ['instagram', 'tiktok', 'soundcloud', 'spotify', 'youtube'].filter((k) => r[k] && !isPending(r[k]));
    $$('[data-topsocials]').forEach((box) => box.replaceChildren(...top.map((k) =>
      el('a', Object.assign({ class: 'topbar__link', href: r[k], 'aria-label': PLATFORM[k].name }, extAttrs(r[k])), icon(PLATFORM[k].icon)))));
  }
  // En la barra de arriba (ordenador), la próxima fecha
  function renderTopNext(g) {
    const box = $('#topbar-next');
    if (!box) return;
    if (!g) { box.hidden = true; return; }
    const day = new Intl.DateTimeFormat(locale(), { day: 'numeric', month: 'short' }).format(g.d).replace('.', '');
    box.replaceChildren(el('span', { class: 'topbar__dot', 'aria-hidden': 'true' }),
      el('span', { class: 'topbar__nextlabel' }, t('top.next')), `${day} · ${g.evento || g.sala || ''}${g.ciudad ? ' — ' + g.ciudad : ''}`);
    box.hidden = false;
  }

  /* ---------- Animaciones al hacer scroll ---------- */
  const io = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -40px 0px', threshold: 0 })
    : null;
  function observeReveals() {
    $$('.reveal:not(.is-in)').forEach((node) => (io ? io.observe(node) : node.classList.add('is-in')));
  }

  /* ---------- Arranque ---------- */
  $('#year').textContent = new Date().getFullYear();
  renderHero();
  renderMarquee();
  renderBioPhoto();
  renderBookingPhoto();
  renderFeature();
  renderMusic();
  renderClubs();
  renderGallery();
  renderVideos();
  setupInstagramEmbeds();
  renderPress();
  renderContact();
  renderSocials();
  applyLang();
  loadSheetDates();
})();
