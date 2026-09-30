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
      'nav.bio': 'Bio', 'nav.musica': 'Música', 'nav.fechas': 'Fechas', 'nav.clubs': 'Clubs',
      'nav.galeria': 'Galería', 'nav.videos': 'Vídeos', 'nav.press': 'Press', 'nav.booking': 'Booking',
      'menu.open': 'Abrir menú', 'menu.close': 'Cerrar menú',
      'hero.kicker': 'DJ · Open format · BCN', 'hero.listen': 'Escuchar', 'hero.down': 'Bajar a la bio',
      'genres.sr': 'Estilos: ',
      'bio.kicker': 'Quién es', 'bio.title': 'Bio', 'bio.more': 'Leer más', 'bio.less': 'Leer menos', 'bio.highlights': 'Highlights',
      'music.kicker': 'Dale al play', 'music.title': 'Música', 'music.play': 'Reproducir', 'music.more': 'Más música en',
      'music.open': 'Escuchar en', 'music.sets': 'Escucha mis sets',
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
      'booking.kicker': 'Contrataciones', 'booking.title': 'Booking',
      'booking.intro': 'Clubs, festivales, eventos privados y marcas. Cuéntanos tu idea y te respondemos.',
      'form.name': 'Nombre', 'form.type': 'Tipo de evento', 'form.typePick': 'Elige una opción',
      'form.type.club': 'Club', 'form.type.festival': 'Festival', 'form.type.private': 'Evento privado',
      'form.type.brand': 'Marca / corporativo', 'form.type.other': 'Otro',
      'form.date': 'Fecha', 'form.city': 'Ciudad', 'form.msg': 'Mensaje', 'form.msgPh': 'Aforo, horario del set, tipo de público…',
      'form.sendWa': 'Enviar por WhatsApp', 'form.sendMail': 'Enviar por email',
      'form.note': 'Se abrirá tu WhatsApp o tu app de correo con el mensaje listo para enviar.',
      'form.ok': '¡Listo! Ya solo te queda darle a enviar.',
      'form.off': 'Este canal todavía no está activo. Mientras tanto, escribe por Instagram a @giseeelz.',
      'form.hello': '¡Hola GISELZ! Te escribo desde tu web por un booking:',
      'form.subject': 'Booking',
      'contact.email': 'Email', 'contact.wa': 'WhatsApp', 'contact.ig': 'Instagram',
      'footer.top': 'Volver arriba', 'footer.rights': 'Todos los derechos reservados',
    },
    en: {
      'skip': 'Skip to content',
      'nav.bio': 'Bio', 'nav.musica': 'Music', 'nav.fechas': 'Dates', 'nav.clubs': 'Clubs',
      'nav.galeria': 'Gallery', 'nav.videos': 'Videos', 'nav.press': 'Press', 'nav.booking': 'Booking',
      'menu.open': 'Open menu', 'menu.close': 'Close menu',
      'hero.kicker': 'DJ · Open format · BCN', 'hero.listen': 'Listen', 'hero.down': 'Scroll to bio',
      'genres.sr': 'Styles: ',
      'bio.kicker': 'Meet', 'bio.title': 'Bio', 'bio.more': 'Read more', 'bio.less': 'Read less', 'bio.highlights': 'Highlights',
      'music.kicker': 'Press play', 'music.title': 'Music', 'music.play': 'Play', 'music.more': 'More music on',
      'music.open': 'Listen on', 'music.sets': 'Listen to my sets',
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
      'booking.kicker': 'Bookings', 'booking.title': 'Booking',
      'booking.intro': 'Clubs, festivals, private events and brands. Tell us about your event and we’ll get back to you.',
      'form.name': 'Name', 'form.type': 'Event type', 'form.typePick': 'Choose one',
      'form.type.club': 'Club', 'form.type.festival': 'Festival', 'form.type.private': 'Private event',
      'form.type.brand': 'Brand / corporate', 'form.type.other': 'Other',
      'form.date': 'Date', 'form.city': 'City', 'form.msg': 'Message', 'form.msgPh': 'Capacity, set time, crowd…',
      'form.sendWa': 'Send via WhatsApp', 'form.sendMail': 'Send via email',
      'form.note': 'Your WhatsApp or email app will open with the message ready to send.',
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
    $('.burger').setAttribute('aria-label', t(document.body.classList.contains('menu-open') ? 'menu.close' : 'menu.open'));
    langHooks.forEach((fn) => fn());
    renderClaim();
    renderGenresSr();
    renderBio();
    renderDates();
    observeReveals();
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

    const quote = tx(tt.cita);
    $('#bio-quote').hidden = !quote;
    $('#bio-quote-text').textContent = quote || '';
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
            el('span', { class: 'player__platform' }, icon(p.icon), `${t('music.open')} ${p.name}`),
            titleNode())));
        return card;
      }
      const musicLabel = () => `${t('music.play')}: ${isPending(tx(m.titulo)) ? p.name : tx(m.titulo)}`;
      const facade = el('button', { class: 'player__facade', type: 'button', 'aria-label': musicLabel() },
        el('span', { class: 'player__btn', 'aria-hidden': 'true' }, icon('play')),
        el('span', { class: 'player__meta' },
          el('span', { class: 'player__platform' }, icon(p.icon), p.name),
          titleNode()),
        eq('player__eq'));
      langHooks.push(() => facade.setAttribute('aria-label', musicLabel()));
      facade.addEventListener('click', () => {
        const frame = iframe(info.src, title, info.height ? { height: info.height } : { style: `aspect-ratio:${info.ratio || '16 / 9'};height:auto` });
        frame.removeAttribute('loading');
        card.replaceChildren(frame);
      });
      card.append(facade);
      return card;
    }));

    // Enlaces a perfiles de música
    const r = D.redes || {};
    const links = ['soundcloud', 'mixcloud', 'spotify', 'youtube'].filter((k) => r[k] && !isPending(r[k]));
    const chips = links.map((k) => el('a', Object.assign({ class: 'chip', href: r[k] }, extAttrs(r[k])), icon(PLATFORM[k].icon), PLATFORM[k].name));
    if (r.linktree && !isPending(r.linktree)) {
      chips.unshift(el('a', Object.assign({ class: 'chip chip--solid', href: r.linktree }, extAttrs(r.linktree)), icon('linktree'), el('span', { 'data-i18n': 'music.sets' }, t('music.sets'))));
    }
    $('#platforms').replaceChildren(...chips);
  }

  /* ---------- 5. Fechas ---------- */
  function parseDate(s) {
    const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(s || '').trim());
    if (!m) return null;
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return d.getMonth() === +m[2] - 1 ? d : null;
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
    const source = demo ? demoGigs() : (D.fechas || []);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bad = [];
    const all = source.filter(Boolean).map((g) => Object.assign({}, g, { d: parseDate(g.fecha) }))
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
        demo || (D.fechas || []).length ? null : pendingTag('', 'añadir los bolos en assets/js/datos.js → FECHAS'),
        el('a', { class: 'btn btn--pink', href: '#booking' }, t('dates.empty.cta'), icon('arrow'))));
    }
    if (past.length) {
      out.push(el('details', { class: 'past' },
        el('summary', {}, `${t('dates.past')} (${past.length})`, icon('plus')),
        el('ul', { class: 'gig-list' }, past.map((g) => gigRow(g, true)))));
    }
    bad.forEach((f) => out.push(el('p', { class: 'gig-warn' }, pendingTag(`[PENDIENTE: la fecha "${f}" no se entiende. Escríbela como AAAA-MM-DD, ej. 2026-11-14]`))));
    box.replaceChildren(...out);

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
            '@type': 'MusicEvent', name: g.evento ? `${g.evento} · GISELZ` : `GISELZ @ ${g.sala}`, startDate: g.fecha,
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
      // Los reels de Instagram se abren en Instagram: incrustados piden login y se cortan en el móvil
      if (!info.src || info.platform === 'instagram') {
        const href = info.link || v.url;
        const label = () => `${t('videos.open')} ${p.name}${title ? ': ' + title : ''}`;
        const link = el('a', Object.assign({ class: 'reel__facade', href, 'aria-label': label() }, extAttrs(href)), inner);
        langHooks.push(() => link.setAttribute('aria-label', label()));
        card.append(link);
        return card;
      }
      const label = () => `${t('videos.play')}${title ? ': ' + title : ''} (${p.name})`;
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
    const cards = [
      { url: p.presskit, type: 'PDF', label: 'press.kit', sub: 'press.kitSub', main: true, missing: 'sube el PDF a assets/presskit/GISELZ-presskit.pdf' },
      { url: p.fotos, type: 'JPG', label: 'press.photos', sub: 'press.download', missing: 'enlace a fotos en alta' },
      { url: p.logos, type: 'PNG', label: 'press.logos', sub: 'press.download', missing: 'enlace a logos en alta' },
    ];
    const box = $('#press-cards');
    box.replaceChildren(...cards.map((c, i) => {
      const body = [
        el('span', { class: 'press-card__icon', 'aria-hidden': 'true' }, icon('download')),
        el('span', { class: 'press-card__type', 'aria-hidden': 'true' }, c.type),
        el('span', {}, el('span', { class: 'press-card__label', 'data-i18n': c.label }, t(c.label)), el('span', { class: 'press-card__sub', 'data-i18n': c.sub }, t(c.sub))),
      ];
      const cls = 'press-card reveal' + (c.main ? ' press-card--main' : '');
      const pendingCard = () => el('div', { class: cls + ' is-pending is-in', style: `--d:${i * 90}ms` }, body, pendingTag('', c.missing));
      if (isPending(c.url)) return pendingCard();
      const local = !isExternal(c.url);
      const link = el('a', Object.assign({ class: cls, href: c.url, style: `--d:${i * 90}ms` }, local ? { download: '' } : extAttrs(c.url)), body);
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
      { key: 'contact.wa', icon: 'whatsapp', value: wa && prettyPhone(wa), href: wa && `https://wa.me/${wa}`, missing: 'número de WhatsApp' },
      { key: 'contact.ig', icon: 'instagram', value: '@' + ig, handle: true, href: `https://www.instagram.com/${ig}/` },
    ];
    $('#contact-list').replaceChildren(...rows.map((r) => {
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
  }

  /* ---------- Animaciones al hacer scroll ---------- */
  const io = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    : null;
  function observeReveals() {
    $$('.reveal:not(.is-in)').forEach((node) => (io ? io.observe(node) : node.classList.add('is-in')));
  }

  /* ---------- Arranque ---------- */
  $('#year').textContent = new Date().getFullYear();
  renderHero();
  renderMarquee();
  renderBioPhoto();
  renderMusic();
  renderClubs();
  renderGallery();
  renderVideos();
  renderPress();
  renderContact();
  renderSocials();
  applyLang();
})();
