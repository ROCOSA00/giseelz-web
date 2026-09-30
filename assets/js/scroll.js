/* ==========================================================================
   GISELZ · efectos al hacer scroll
   --------------------------------------------------------------------------
   · Scroll suave con inercia en ordenador (Lenis). En el móvil, el nativo.
   · La portada se queda fija y se desvanece mientras la web pasa por encima.
   · Secciones apiladas: al terminar, cada sección se queda quieta y la
     siguiente la tapa como una carta.
   · Los títulos grandes se rellenan de color al pasar.
   · Las cintas de estilos aceleran con el scroll y cambian de sentido.
   · La cita se ilumina palabra a palabra.
   · Los clubs pasan de lado.
   · Parallax en la galería, cursor rosa (ordenador) y barra de progreso.

   Si la persona tiene activado "reducir movimiento" en su móvil u ordenador,
   no se activa nada y la web se ve normal. No hace falta tocar este archivo.
   ========================================================================== */
(function () {
  'use strict';

  const root = document.documentElement;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  root.classList.add('fx');

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const main = $('#main');
  let vh = root.clientHeight;
  let vw = root.clientWidth;
  const desktop = () => vw >= 900;

  /* ---------- Scroll suave (ratón y trackpad) ---------- */
  let lenis = null;
  if (finePointer && typeof window.Lenis === 'function') {
    lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      allowNestedScroll: true,
      autoRaf: false,
    });
  }
  // Con el menú o el visor de fotos abiertos, el scroll de la página se para
  const lightbox = $('#lightbox');
  function syncLock() {
    if (!lenis) return;
    const locked = document.body.classList.contains('menu-open') || (lightbox && lightbox.open);
    if (locked) lenis.stop();
    else lenis.start();
  }
  new MutationObserver(syncLock).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  if (lightbox) new MutationObserver(syncLock).observe(lightbox, { attributes: true, attributeFilter: ['open'] });

  /* ---------- Piezas ---------- */
  const hero = $('.hero');
  const tracks = $$('[data-marquee]');
  const tapes = $('.tapes');
  const quoteStage = $('#cita');
  const hWrap = $('#clubs-hscroll');
  const hPin = hWrap && $('.hscroll__pin', hWrap);
  const wall = $('#wall');

  // Barra de progreso
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  bar.append(document.createElement('span'));
  document.body.append(bar);
  const barFill = bar.firstChild;

  // Secciones apiladas: una marca invisible delante de cada una guarda su posición real
  // (las secciones "pegadas" no sirven para calcular a dónde saltar desde el menú)
  if (hero) {
    hero._veil = document.createElement('span');
    hero._veil.className = 'hero__veil';
    hero._veil.setAttribute('aria-hidden', 'true');
    hero.append(hero._veil);
  }
  let stacks = [];
  function setupStacks() {
    stacks = $$(':scope > .hero, :scope > .sec, :scope > .quote-stage', main);
    stacks.forEach((el) => {
      if (!el.previousElementSibling || !el.previousElementSibling.classList.contains('stack-mark')) {
        const mark = document.createElement('i');
        mark.className = 'stack-mark';
        mark.setAttribute('aria-hidden', 'true');
        el.before(mark);
      }
      if (el === hero) return;
      el.classList.add('stack');
      if (!el._veil) {
        el._veil = document.createElement('span');
        el._veil.className = 'stack-veil';
        el._veil.setAttribute('aria-hidden', 'true');
        el.append(el._veil);
      }
    });
  }
  setupStacks();
  const nextOf = (el) => {
    let n = el.nextElementSibling;
    while (n && (n.classList.contains('stack-mark') || n.hidden)) n = n.nextElementSibling;
    return n;
  };

  /* ---------- Medidas (al cargar, al cambiar el tamaño o el contenido) ---------- */
  let needsMeasure = true;
  let lastLit = -1;
  let forceUpdate = true;
  let marqueeHalf = [];
  let hDist = 0;
  let hScrollLen = 0;
  let megas = [];
  let words = [];
  let shots = [];

  function measure() {
    needsMeasure = false;
    vh = root.clientHeight;
    vw = root.clientWidth;
    megas = $$('.mega');
    words = quoteStage ? $$('.w', quoteStage) : [];
    lastLit = -1;
    shots = $$('#gallery .shot').map((s) => ({ el: s, duo: $('.duo', s) })).filter((s) => s.duo);

    // Clubs de lado: altura del bloque = lo que tarda la fila en pasar entera
    if (hWrap && wall) {
      const pinH = hPin.offsetHeight;
      hDist = Math.max(0, wall.scrollWidth - vw);
      // La fila avanza más rápido que el scroll (x3,3 en ordenador, x2,5 en móvil) para no alargar la página
      hScrollLen = Math.round(hDist * (desktop() ? 0.3 : 0.4));
      hWrap.style.height = (pinH + hScrollLen) + 'px';
    }
    // Cada sección se "pega" cuando su final llega al final de la pantalla
    stacks.forEach((el) => {
      if (el === hero) return;
      const stick = Math.min(0, vh - el.offsetHeight);
      el.style.setProperty('--stick', stick + 'px');
      el._stick = stick;
    });
    marqueeHalf = tracks.map((t) => t.scrollWidth / 2);
    forceUpdate = true;
  }
  const requestMeasure = () => { needsMeasure = true; };
  window.addEventListener('resize', () => {
    // En el móvil, la barra del navegador cambia la altura al hacer scroll: solo el ancho cuenta
    if (root.clientWidth !== vw || !finePointer) requestMeasure();
  });
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(requestMeasure);
    stacks.forEach((el) => ro.observe(el));
    if (wall) ro.observe(wall);
  }
  document.addEventListener('giselz:render', requestMeasure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(requestMeasure);
  window.addEventListener('load', requestMeasure);

  /* ---------- Saltos del menú y botones (#bio, #booking...) ---------- */
  function targetY(el) {
    const mark = el.previousElementSibling;
    if (mark && mark.classList.contains('stack-mark')) return mark.getBoundingClientRect().top + window.scrollY;
    return el.getBoundingClientRect().top + window.scrollY;
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const id = decodeURIComponent(a.getAttribute('href').slice(1));
    const target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const y = id === 'inicio' ? 0 : targetY(target);
    if (lenis) {
      lenis.start();
      lenis.scrollTo(y, { duration: 1.4 });
    } else {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    if (id !== 'inicio') {
      const focusable = target.querySelector('h2, h1') || target;
      focusable.setAttribute('tabindex', '-1');
      setTimeout(() => focusable.focus({ preventScroll: true }), 900);
    }
  });

  /* ---------- Efectos ligados al scroll ---------- */
  // Solo se escribe en el estilo cuando el valor cambia (ahorra trabajo al navegador)
  function setVar(el, name, value) {
    const key = '_v' + name;
    if (el[key] === value) return;
    el[key] = value;
    el.style.setProperty(name, value);
  }
  function setStyle(el, prop, value) {
    const key = '_s' + prop;
    if (el[key] === value) return;
    el[key] = value;
    el.style[prop] = value;
  }
  function onScroll(y) {
    // 1) Lecturas (todas juntas para no forzar al navegador a recalcular)
    const docH = root.scrollHeight - vh;
    const nexts = stacks.map((el) => {
      const a = nextOf(el);
      const b = a && nextOf(a);
      return [a && a.getBoundingClientRect(), b && b.getBoundingClientRect()];
    });
    const megaTops = megas.map((m) => m.getBoundingClientRect().top);
    const qRect = quoteStage && !quoteStage.hidden ? quoteStage.getBoundingClientRect() : null;
    const hRect = hWrap ? hWrap.getBoundingClientRect() : null;
    const shotRects = shots.map((s) => s.el.getBoundingClientRect());

    // 2) Escrituras
    setStyle(barFill, 'transform', `scaleX(${docH > 0 ? clamp(y / docH).toFixed(4) : 0})`);
    if (hero) setVar(hero, '--hp', clamp(y / vh).toFixed(3));

    stacks.forEach((el, i) => {
      const [a, b] = nexts[i];
      const cover = a ? clamp(1 - a.top / vh) : 0;
      if (el._veil) setStyle(el._veil, 'opacity', (cover * 0.7).toFixed(2));
      // Tapada del todo por lo que viene detrás: se deja de pintar (la web va más fluida)
      const hidden = [a, b].some((r) => r && r.top <= 0 && r.bottom >= vh);
      setStyle(el, 'visibility', hidden ? 'hidden' : '');
    });

    megas.forEach((m, i) => {
      const top = megaTops[i];
      if (top > vh * 1.2 || top < -vh) return;
      const p = clamp((vh * 0.92 - top) / (vh * 0.45));
      setVar(m, '--fill', (p * 100).toFixed(0) + '%');
    });

    if (qRect && words.length && qRect.bottom > 0 && qRect.top < vh) {
      const p = clamp(-qRect.top / Math.max(1, qRect.height - vh));
      setVar(quoteStage, '--qp', p.toFixed(2));
      const lit = Math.min(words.length, Math.floor(p * (words.length + 3)));
      if (lit !== lastLit) {
        words.forEach((w, j) => {
          w.classList.toggle('is-lit', j < lit);
          w.classList.toggle('is-now', j === lit - 1 && lit < words.length);
        });
        lastLit = lit;
      }
      quoteStage.classList.toggle('is-done', p > 0.9);
    }

    if (hRect && wall && hDist > 0 && hRect.bottom > 0 && hRect.top < vh) {
      const p = clamp(-hRect.top / Math.max(1, hScrollLen));
      setStyle(wall, 'transform', `translate3d(${(-p * hDist).toFixed(0)}px,0,0)`);
    }

    shotRects.forEach((r, i) => {
      if (r.bottom < -100 || r.top > vh + 100) return;
      const off = (r.top + r.height / 2 - vh / 2) / vh;
      const py = clamp(-off * r.height * 0.1, -r.height * 0.08, r.height * 0.08);
      setStyle(shots[i].duo, 'transform', `translate3d(0,${py.toFixed(0)}px,0) scale(1.2)`);
    });
  }

  /* ---------- Cintas: aceleran al hacer scroll y giran con la dirección ---------- */
  let tapesVisible = true;
  if (tapes && 'IntersectionObserver' in window) {
    new IntersectionObserver((en) => { tapesVisible = en[0].isIntersecting; }, { rootMargin: '200px 0px' }).observe(tapes);
  }
  let mPos = 0;
  let dir = 1;
  let skew = 0;
  function marquee(dt, v) {
    if (!tapesVisible || !tracks.length) return;
    if (v > 0.3) dir = 1;
    else if (v < -0.3) dir = -1;
    const boost = Math.min(Math.abs(v), 40) * 0.3;
    mPos += (0.075 * dt + boost) * dir;
    skew += (clamp(v * 0.12, -9, 9) - skew) * 0.12;
    tracks.forEach((t, i) => {
      const half = marqueeHalf[i] || 1;
      const off = ((mPos % half) + half) % half;
      const x = i === 0 ? -off : off - half;
      t.style.transform = `translate3d(${x.toFixed(1)}px,0,0) skewX(${(i === 0 ? -skew : skew).toFixed(2)}deg)`;
    });
  }

  /* ---------- Cursor rosa (solo con ratón) ---------- */
  let cursor = null;
  const cur = { x: -100, y: -100, tx: -100, ty: -100 };
  if (finePointer) {
    cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = '<span class="cursor__label"></span>';
    document.body.append(cursor);
    const label = cursor.firstChild;
    const labels = { view: { es: 'Ver', en: 'View' }, play: { es: 'Play', en: 'Play' } };
    let lastEl = null;
    document.addEventListener('pointermove', (e) => {
      cur.tx = e.clientX;
      cur.ty = e.clientY;
      cursor.classList.add('is-on');
      const el = e.target;
      if (el === lastEl) return;
      lastEl = el;
      const lang = root.lang === 'en' ? 'en' : 'es';
      let text = '';
      if (el.closest('#gallery .shot:not(.shot--pending)')) text = labels.view[lang];
      else if (el.closest('.player__facade, .reel__facade')) text = labels.play[lang];
      label.textContent = text;
      cursor.classList.toggle('is-label', !!text);
      cursor.classList.toggle('is-link', !text && !!el.closest('a, button, select, input, textarea, label, summary, [role="button"]'));
      cursor.classList.toggle('on-pink', !!el.closest('.sec--pink, .foot, .menu, .tape--pink, .sec--pale'));
    }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
    window.addEventListener('blur', () => cursor.classList.remove('is-on'));
  }
  function cursorFrame() {
    if (!cursor) return;
    cur.x += (cur.tx - cur.x) * 0.22;
    cur.y += (cur.ty - cur.y) * 0.22;
    cursor.style.transform = `translate3d(${cur.x.toFixed(1)}px,${cur.y.toFixed(1)}px,0)`;
  }

  /* ---------- Bucle principal ---------- */
  let lastY = -1;
  let lastT = performance.now();
  let vel = 0;
  function frame(t) {
    if (lenis) lenis.raf(t);
    if (needsMeasure) measure();
    const y = window.scrollY;
    const dt = Math.min(64, Math.max(0, t - lastT));
    lastT = t;
    const raw = lenis ? lenis.velocity : (lastY < 0 ? 0 : y - lastY);
    vel += (raw - vel) * 0.25;
    if (y !== lastY || forceUpdate) {
      onScroll(y);
      lastY = y;
      forceUpdate = false;
    }
    marquee(dt, vel);
    cursorFrame();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
