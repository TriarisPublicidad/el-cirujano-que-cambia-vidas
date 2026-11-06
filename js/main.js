/* main.js — interacciones del sitio.
 * Secciones: 1) Modales y galería · 2) Proceso paso a paso · 3) Scroll (cabecera, parallax, telón)
 *            4) Aparición progresiva y fondos · 5) Brillo en tarjetas · 6) Acordeón de preguntas · 7) Acciones.
 * El HTML dispara las acciones con data-action="nombre"; ver el objeto `actions` al final. */
(function () {
  'use strict';

  var $ = function (selector, root) { return (root || document).querySelector(selector); };
  var $$ = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };
  var YOUTUBE = 'https://www.youtube-nocookie.com/embed/';

  function openModal(modal) {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function videoUrl(id) { return YOUTUBE + id + '?autoplay=1&rel=0'; }

  // ==========================================================================
  // 1. MODAL DE VIDEO
  // ==========================================================================
  var videoModal = $('#video-modal');
  var videoFrame = $('#video-modal-iframe');

  function openVideo(videoId, title) {
    $('#video-modal-title').textContent = title || 'Caso de Éxito — Dr. Carlos Gómez';
    videoFrame.src = videoUrl(videoId);
    openModal(videoModal);
  }
  function closeVideo() {
    videoFrame.src = '';
    closeModal(videoModal);
  }
  videoModal.addEventListener('click', function (e) { if (e.target === videoModal) closeVideo(); });

  // ==========================================================================
  // 1b. GALERÍA DE INSTALACIONES (16 fotos + video tour)
  // ==========================================================================
  var facilityItems = [
    {
      src: 'images/suite-de-paciente-cirugia-bariatrica-y-metabolica-en-clinica-angeles.jpg',
      category: 'suites',
      title: 'Suite Hospitalaria Tipo Hotel Boutique',
      desc: 'Habitación individual climatizada con cama clínica automatizada, sistema de llamado de enfermería 24/7 y acabados de lujo.',
      badge: 'Suite Principal'
    },
    {
      src: 'images/quirofano-para-cirugia-baiatrica-dr-carlos-gomez-ecuador.jpg',
      category: 'quirofano',
      title: 'Quirófano Bariátrico Especializado',
      desc: 'Torres de laparoscopía de ultra alta definición y tecnología de sellado vascular para cirugías seguras y de mínima invasión.',
      badge: 'Quirófano'
    },
    {
      src: 'images/quirofano-dr-carlos-gomez-guayaquil.jpg',
      category: 'quirofano',
      title: 'Torres de Monitoreo Anestésico y Quirúrgico',
      desc: 'Estación de anestesiología avanzada, monitoreo hemodinámico y sistemas de soporte vital con flujo laminar estéril.',
      badge: 'Tecnología'
    },
    {
      src: 'images/suite-de-recuperacion-cirugia-bypass-gastrico-area-familiar.jpg',
      category: 'suites',
      title: 'Área Familiar Integrada',
      desc: 'Zona de descanso con sofá cama para el acompañante dentro de la suite, garantizando privacidad total para la familia.',
      badge: 'Confort Familiar'
    },
    {
      src: 'images/suite-de-recuperacion-cirugia-bypass-gastrico-en-guayaquil.jpg',
      category: 'suites',
      title: 'Suite de Recuperación Postoperatoria',
      desc: 'Espacio climatizado con iluminación cálida y confort acústico para un despertar postquirúrgico seguro y placentero.',
      badge: 'Recuperación'
    },
    {
      src: 'images/suite-de-recuperacion-paciente-dr-carlos-gomez-guayaquil.jpg',
      category: 'suites',
      title: 'Habitación del Paciente con Asistencia Médica',
      desc: 'Atención personalizada las 24 horas del día por parte del equipo de enfermería especializada en pacientes bariátricos.',
      badge: 'Cuidados 24/7'
    },
    {
      src: 'images/suite-de-recuperacion-cirugia-bypass-gastrico-en-ecuador.jpg',
      category: 'suites',
      title: 'Vista Panorámica y Luz Natural',
      desc: 'Amplios ventanales con vista exterior que favorecen el bienestar emocional y la recuperación rápida del paciente.',
      badge: 'Bienestar'
    },
    {
      src: 'images/suite-de-recuperacionbano-completo-cirugia-bypass-gastrico-en-ecuador.jpg',
      category: 'suites',
      title: 'Baño Privado Completo y Adaptado',
      desc: 'Ducha a ras de piso con barras de apoyo ergonómicas y grifería de alta gama adaptada para pacientes bariátricos.',
      badge: 'Accesibilidad'
    },
    {
      src: 'images/sala-de-postoperatorio-cirugia-bypass-gastrico-en-guayaquil.jpg',
      category: 'quirofano',
      title: 'Sala de Postoperatorio y Cuidados Intermedios',
      desc: 'Monitoreo hemodinámico continuo durante las primeras horas posteriores a la intervención quirúrgica.',
      badge: 'Postoperatorio'
    },
    {
      src: 'images/centro-medico-clinica-angeles-donde-opera-el-dr-carlos-gomez-en-guayaquil.jpg',
      category: 'fachada',
      title: 'Centro Médico Clínica Ángeles · Ágora Medical',
      desc: 'Complejo médico de referencia en Guayaquil, equipado con infraestructura de última generación y parqueo privado.',
      badge: 'Centro Médico'
    },
    {
      src: 'images/clinica-angeles-sector-mall-del-sol-en-guayaquil.jpg',
      category: 'fachada',
      title: 'Ubicación de Prestigio · Sector Mall del Sol',
      desc: 'Ubicación estratégica y segura en Guayaquil, a solo 5 minutos del Aeropuerto Internacional José Joaquín de Olmedo.',
      badge: 'Ubicación'
    },
    {
      src: 'images/acceso-por-codigo-qr-clinica-angeles-guayaquil-sector-mall-del-sol.jpg',
      category: 'comunes',
      title: 'Acceso Inteligente por Código QR',
      desc: 'Ingreso digitalizado y seguro para pacientes y familiares con control de accesos automatizado y alta bioseguridad.',
      badge: 'Seguridad'
    },
    {
      src: 'images/personas-en-estados-unidos-visitan-ecuador-para-cirugia-bariatrica-con-el-dr-carlos-gomez.jpg',
      category: 'comunes',
      title: 'Recepción y Pacientes Internacionales',
      desc: 'Servicio de conserjería médica y recepción preferencial para pacientes locales y procedentes de Estados Unidos y Europa.',
      badge: 'Recepción'
    },
    {
      src: 'images/dr-carlos-gomez-en-clinica-angeles-guayaquil.jpg',
      category: 'comunes',
      title: 'El Dr. Carlos Gómez en Clínica Ángeles',
      desc: 'Supervisión presencial y directa en cada fase de la experiencia: preoperatorio, quirófano y alta médica.',
      badge: 'Dr. Carlos Gómez'
    },
    {
      src: 'images/cafeteria-clinica-angeles-guayaquil.jpg',
      category: 'comunes',
      title: 'Cafetería y Sala de Estar Premium',
      desc: 'Área de cafetería y descanso diseñada para brindar máxima comodidad y tranquilidad a los familiares visitantes.',
      badge: 'Cafetería Lounge'
    },
    {
      src: 'images/cafeteria-clinica-angeles-ecuador.jpg',
      category: 'comunes',
      title: 'Espacios de Confort y Espera Relajada',
      desc: 'Ambiente distinguido con conectividad de alta velocidad y servicio de cafetería de especialidad.',
      badge: 'Lounge'
    }
  ];

  var gallery = $('#facility-gallery-modal');
  var galleryIndex = 0;
  var galleryIsVideo = false;
  var thumbsBuilt = false;

  function buildThumbs() {
    if (thumbsBuilt) return;
    thumbsBuilt = true;
    $('#fg-filmstrip').innerHTML = facilityItems.map(function (item, i) {
      return '<button class="thumb" type="button" data-action="gallery-go" data-index="' + i + '">' +
        '<img src="' + item.src + '" alt="' + item.title + '" width="64" height="48" loading="lazy" /></button>';
    }).join('');
  }

  function showImageSlide() {
    galleryIsVideo = false;
    $('#fg-image-container').hidden = false;
    $('#fg-video-container').hidden = true;
    $('#fg-video-iframe').src = '';
  }

  function openGallery(index) {
    buildThumbs();
    showImageSlide();
    openModal(gallery);
    goToGallery(index || 0);
  }

  function openGalleryVideo(videoId, title) {
    buildThumbs();
    galleryIsVideo = true;
    $('#fg-image-container').hidden = true;
    $('#fg-video-container').hidden = false;
    $('#fg-video-iframe').src = videoUrl(videoId);
    $('#fg-badge').textContent = 'Video Tour';
    $('#fg-title-top').textContent = title || 'Tour en Video — Instalaciones Clínica Ángeles';
    $('#fg-counter').textContent = 'Video';
    openModal(gallery);
  }

  function closeGallery() {
    $('#fg-video-iframe').src = '';
    closeModal(gallery);
    if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
  }

  function goToGallery(index) {
    if (galleryIsVideo) showImageSlide();
    galleryIndex = (index + facilityItems.length) % facilityItems.length;
    var item = facilityItems[galleryIndex];
    var img = $('#fg-main-img');

    img.style.opacity = '0';
    setTimeout(function () {
      img.src = item.src;
      img.alt = item.title;
      img.style.opacity = '1';
    }, 120);

    $('#fg-badge').textContent = item.badge;
    $('#fg-title-top').textContent = item.title;
    $('#fg-counter').textContent = String(galleryIndex + 1).padStart(2, '0') + ' / ' + String(facilityItems.length).padStart(2, '0');
    $('#fg-caption-title').textContent = item.title;
    $('#fg-caption-desc').textContent = item.desc;

    $$('.thumb').forEach(function (thumb, i) {
      var active = i === galleryIndex;
      thumb.classList.toggle('is-active', active);
      if (active) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (gallery.requestFullscreen) gallery.requestFullscreen();
      else if (gallery.webkitRequestFullscreen) gallery.webkitRequestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  // Teclado: flechas para navegar, Escape para cerrar cualquier modal abierto
  window.addEventListener('keydown', function (e) {
    var galleryOpen = gallery.classList.contains('is-open');
    if (galleryOpen && e.key === 'ArrowRight') goToGallery(galleryIndex + 1);
    else if (galleryOpen && e.key === 'ArrowLeft') goToGallery(galleryIndex - 1);
    else if (e.key === 'Escape') {
      if (galleryOpen) closeGallery();
      if (videoModal.classList.contains('is-open')) closeVideo();
      if (window.drgCloseBmi && $('#bmi-modal').classList.contains('is-open')) window.drgCloseBmi();
    }
  });

  // Gestos táctiles (deslizar) y cierre al pulsar el fondo
  (function () {
    var startX = 0;
    gallery.addEventListener('touchstart', function (e) { startX = e.changedTouches[0].screenX; }, { passive: true });
    gallery.addEventListener('touchend', function (e) {
      var diff = e.changedTouches[0].screenX - startX;
      if (Math.abs(diff) > 45) goToGallery(galleryIndex + (diff < 0 ? 1 : -1));
    }, { passive: true });
    gallery.addEventListener('click', function (e) {
      if (!e.target.closest('#fg-main-img, #fg-video-container, button, a, #fg-filmstrip, #fg-caption-title, #fg-caption-desc')) closeGallery();
    });
  })();

  // ==========================================================================
  // 2. CÓMO VIVIRÁS EL PROCESO
  //    Los textos y la foto de cada paso salen de las tarjetas .step del HTML.
  // ==========================================================================
  var steps = $$('.step');
  var stepIndex = 0;

  function stepData(card) {
    return {
      badge: $('.step__badge', card).textContent.trim(),
      img: $('.step__preview img', card).getAttribute('src'),
      title: card.dataset.facilityTitle,
      note: card.dataset.facilityNote,
      gallery: Number(card.dataset.gallery)
    };
  }

  function selectStep(index) {
    if (index < 0 || index >= steps.length) return;
    stepIndex = index;
    var data = stepData(steps[index]);
    var img = $('#process-main-img');

    if (img && img.getAttribute('src') !== data.img) {
      img.style.opacity = '0';
      setTimeout(function () {
        img.src = data.img;
        img.alt = data.title;
        img.style.opacity = '1';
      }, 140);
    }
    $('#process-img-badge').textContent = data.badge;
    $('#process-img-counter').textContent = String(index + 1).padStart(2, '0') + ' / ' + String(steps.length).padStart(2, '0');
    $('#process-img-title').textContent = data.title;
    $('#process-img-facility').textContent = data.note;
    steps.forEach(function (card, i) { card.classList.toggle('is-active', i === index); });
  }

  steps.forEach(function (card, i) {
    card.addEventListener('mouseenter', function () { selectStep(i); });
    card.addEventListener('click', function (e) { if (!e.target.closest('[data-action]')) selectStep(i); });
    card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectStep(i); } });
  });

  // Al hacer scroll se activa el paso que cruza la mitad de la foto fija
  window.addEventListener('scroll', function () {
    var frame = $('#process-sticky-frame');
    var targetY = frame && frame.offsetHeight
      ? frame.getBoundingClientRect().top + frame.offsetHeight * 0.45
      : window.innerHeight * 0.45;
    var active = 0;
    steps.forEach(function (card, i) { if (card.getBoundingClientRect().top <= targetY) active = i; });
    if (active !== stepIndex) selectStep(active);
  }, { passive: true });

  // ==========================================================================
  // 3. SCROLL: cabecera inteligente, parallax y telón de #cita
  // ==========================================================================
  var header = $('#smart-header');
  var parallaxItems = $$('[data-parallax]');
  var citaSpacer = $('#cita-spacer');
  var citaInner = $('#cita-reveal-inner');
  var citaBg = $('#cita-bg-layer');
  var lastScrollY = window.scrollY;
  var ticking = false;

  function updateCurtain() {
    if (!citaSpacer || !citaInner) return;
    if (window.innerWidth >= 1024) {
      var vh = window.innerHeight;
      // 0 = #preguntas cubre todo · 1 = #cita revelada al 100 %
      var progress = Math.max(0, Math.min(1, (vh - citaSpacer.getBoundingClientRect().top) / vh));
      citaInner.style.transform = 'translate3d(0,' + ((1 - progress) * 42).toFixed(1) + 'px,0) scale(' + (0.965 + progress * 0.035).toFixed(4) + ')';
      citaInner.style.opacity = (0.35 + progress * 0.65).toFixed(3);
      if (citaBg) {
        citaBg.style.transform = 'scale(' + (1.08 - progress * 0.08).toFixed(4) + ')';
        citaBg.style.opacity = (0.15 + progress * 0.85).toFixed(3);
        citaBg.style.filter = 'blur(' + ((1 - progress) * 6).toFixed(2) + 'px)';
      }
    } else {
      citaInner.style.transform = citaInner.style.opacity = '';
      if (citaBg) citaBg.style.transform = citaBg.style.opacity = citaBg.style.filter = '';
    }
  }

  function onScrollFrame() {
    var y = window.scrollY;
    var delta = y - lastScrollY;

    header.classList.toggle('header-scrolled', y > 60);
    if (y > 140 && delta > 6) header.classList.add('header-hidden');          // bajando: se oculta
    else if (delta < -6 || y <= 100) header.classList.remove('header-hidden'); // subiendo: aparece

    var center = window.innerHeight / 2;
    parallaxItems.forEach(function (el) {
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
      var rect = el.parentElement.getBoundingClientRect();
      var offset = (rect.top + rect.height / 2 - center) * speed;
      el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)' + (el.id === 'hero-banner-img' ? '' : ' scale(1.05)');
    });

    updateCurtain();
    lastScrollY = Math.max(0, y);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScrollFrame); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', updateCurtain);
  updateCurtain();

  // Los enlaces a #cita bajan hasta el espaciador cuando el telón está activo (escritorio)
  $$('a[href="#cita"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth >= 1024 && citaSpacer) {
        e.preventDefault();
        window.scrollTo({ top: citaSpacer.offsetTop, behavior: 'smooth' });
      }
    });
  });

  // ==========================================================================
  // 4. APARICIÓN PROGRESIVA Y FONDOS
  // ==========================================================================
  $$('[data-stagger]').forEach(function (container) {
    var stepMs = parseInt(container.getAttribute('data-stagger'), 10) || 100;
    $$(':scope > .reveal', container).forEach(function (child, i) { child.style.transitionDelay = (i * stepMs) + 'ms'; });
  });

  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(function (el) { revealObserver.observe(el); });

  var zoom = $('#hero-zoom-container');
  if (zoom) requestAnimationFrame(function () { setTimeout(function () { zoom.classList.add('hero-zoomed'); }, 80); });

  // Cada fondo aparece cuando su sección entra en pantalla
  var bgObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target._bg.classList.toggle('bg-is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.08, rootMargin: '60px 0px 60px 0px' });
  $$('.bg-layer, .hero__bg').forEach(function (bg) {
    var section = bg.parentElement;
    section._bg = bg;
    bgObserver.observe(section);
  });

  // ==========================================================================
  // 5. BRILLO QUE SIGUE AL MOUSE EN LAS TARJETAS
  // ==========================================================================
  $$('.card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
  });

  // ==========================================================================
  // 6. ACORDEÓN DE PREGUNTAS (abre una a la vez, con animación de altura)
  // ==========================================================================
  var faqItems = $$('details.faq-item');

  function closeFaq(item) {
    var content = $('.faq-item__content', item);
    if (!content || !item.open) return;
    item.classList.remove('is-expanded');
    content.style.height = content.scrollHeight + 'px';
    content.style.opacity = '1';
    void content.offsetHeight; // fuerza el recálculo para que la transición se ejecute
    requestAnimationFrame(function () { content.style.height = '0px'; content.style.opacity = '0'; });
    content.addEventListener('transitionend', function done(e) {
      if (e.propertyName !== 'height') return;
      content.removeEventListener('transitionend', done);
      if (!item.classList.contains('is-expanded')) { item.open = false; content.style.height = ''; }
    });
  }

  function openFaq(item) {
    var content = $('.faq-item__content', item);
    if (!content) return;
    item.open = true;
    item.classList.add('is-expanded');
    content.style.height = '0px';
    content.style.opacity = '0';
    void content.offsetHeight;
    requestAnimationFrame(function () { content.style.height = content.scrollHeight + 'px'; content.style.opacity = '1'; });
    content.addEventListener('transitionend', function done(e) {
      if (e.propertyName !== 'height') return;
      content.removeEventListener('transitionend', done);
      if (item.classList.contains('is-expanded')) content.style.height = 'auto';
    });
  }

  faqItems.forEach(function (item) {
    var content = $('.faq-item__content', item);
    if (item.open && content) { item.classList.add('is-expanded'); content.style.height = 'auto'; content.style.opacity = '1'; }
    $('summary', item).addEventListener('click', function (e) {
      e.preventDefault();
      if (item.classList.contains('is-expanded')) { closeFaq(item); return; }
      faqItems.forEach(function (other) { if (other !== item && other.classList.contains('is-expanded')) closeFaq(other); });
      openFaq(item);
    });
  });

  // ==========================================================================
  // 7. ACCIONES (data-action) — calculator.js añade las suyas a este mismo objeto
  // ==========================================================================
  var actions = window.drgActions = window.drgActions || {};
  Object.assign(actions, {
    'open-video': function (el) { openVideo(el.dataset.videoId, el.dataset.title); },
    'close-video': closeVideo,
    'open-gallery': function (el) { openGallery(Number(el.dataset.index)); },
    'open-gallery-video': function (el) { openGalleryVideo(el.dataset.videoId, el.dataset.title); },
    'close-gallery': closeGallery,
    'gallery-prev': function () { goToGallery(galleryIndex - 1); },
    'gallery-next': function () { goToGallery(galleryIndex + 1); },
    'gallery-go': function (el) { goToGallery(Number(el.dataset.index)); },
    'gallery-fullscreen': toggleFullscreen,
    'open-stage-photo': function () { openGallery(stepData(steps[stepIndex]).gallery); },
    'select-procedure': function (el) { $('#contact-proc').value = el.dataset.procedure; }
  });

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-action]');
    var run = trigger && actions[trigger.dataset.action];
    if (run) run(trigger, e);
  });
})();
