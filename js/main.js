// Modal de Video
    function openVideoModal(videoId, title) {
      const modal = document.getElementById('video-modal');
      const iframe = document.getElementById('video-modal-iframe');
      const titleEl = document.getElementById('video-modal-title');
      titleEl.textContent = title || 'Caso de Éxito — Dr. Carlos Gómez';
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeVideoModal() {
      const modal = document.getElementById('video-modal');
      const iframe = document.getElementById('video-modal-iframe');
      iframe.src = '';
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    document.getElementById('video-modal').addEventListener('click', function (e) {
      if (e.target === this) closeVideoModal();
    });

    // ==========================================
    // GALERÍA DE INSTALACIONES FULLSCREEN (16 FOTOS + VIDEO)
    // ==========================================
    const facilityItems = [
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

    let currentGalleryIdx = 0;
    let isGalleryVideo = false;

    function renderGalleryFilmstrip() {
      const filmstrip = document.getElementById('fg-filmstrip');
      if (!filmstrip || filmstrip.children.length > 0) return;
      filmstrip.innerHTML = facilityItems.map((item, idx) => `
        <button type="button" onclick="goToGalleryIndex(${idx})" class="fg-thumb-btn shrink-0 w-16 h-12 transition-all overflow-hidden ${idx === 0 ? 'ring-2 ring-[#c5b191] opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}" data-thumb-idx="${idx}">
          <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover" />
        </button>
      `).join('');
    }

    function updateGalleryFilmstripActive(activeIdx) {
      document.querySelectorAll('.fg-thumb-btn').forEach((btn, idx) => {
        if (idx === activeIdx) {
          btn.className = 'fg-thumb-btn shrink-0 w-16 h-12 ring-2 ring-[#c5b191] opacity-100 scale-105 transition-all overflow-hidden shadow-lg';
          btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          btn.className = 'fg-thumb-btn shrink-0 w-16 h-12 opacity-40 hover:opacity-100 transition-all overflow-hidden';
        }
      });
    }

    function openGalleryFullscreen(index = 0) {
      renderGalleryFilmstrip();
      const modal = document.getElementById('facility-gallery-modal');
      if (!modal) return;
      isGalleryVideo = false;
      document.getElementById('fg-image-container').classList.remove('hidden');
      document.getElementById('fg-video-container').classList.add('hidden');
      const iframe = document.getElementById('fg-video-iframe');
      if (iframe) iframe.src = '';
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      goToGalleryIndex(index);
    }

    function openGalleryVideo(videoId, title) {
      renderGalleryFilmstrip();
      const modal = document.getElementById('facility-gallery-modal');
      if (!modal) return;
      isGalleryVideo = true;
      document.getElementById('fg-image-container').classList.add('hidden');
      const vContainer = document.getElementById('fg-video-container');
      vContainer.classList.remove('hidden');
      const iframe = document.getElementById('fg-video-iframe');
      if (iframe) iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
      document.getElementById('fg-badge').textContent = 'Video Tour';
      document.getElementById('fg-title-top').textContent = title || 'Tour en Video — Instalaciones Clínica Ángeles';
      document.getElementById('fg-counter').textContent = 'Video';
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeGalleryFullscreen() {
      const modal = document.getElementById('facility-gallery-modal');
      if (!modal) return;
      const iframe = document.getElementById('fg-video-iframe');
      if (iframe) iframe.src = '';
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }

    function goToGalleryIndex(idx) {
      if (isGalleryVideo) {
        isGalleryVideo = false;
        document.getElementById('fg-image-container').classList.remove('hidden');
        document.getElementById('fg-video-container').classList.add('hidden');
        const iframe = document.getElementById('fg-video-iframe');
        if (iframe) iframe.src = '';
      }
      currentGalleryIdx = (idx + facilityItems.length) % facilityItems.length;
      const item = facilityItems[currentGalleryIdx];
      const img = document.getElementById('fg-main-img');
      const badge = document.getElementById('fg-badge');
      const titleTop = document.getElementById('fg-title-top');
      const counter = document.getElementById('fg-counter');
      const capTitle = document.getElementById('fg-caption-title');
      const capDesc = document.getElementById('fg-caption-desc');

      if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = item.src;
          img.alt = item.title;
          img.style.opacity = '1';
        }, 120);
      }
      if (badge) badge.textContent = item.badge;
      if (titleTop) titleTop.textContent = item.title;
      if (counter) counter.textContent = `${String(currentGalleryIdx + 1).padStart(2, '0')} / ${String(facilityItems.length).padStart(2, '0')}`;
      if (capTitle) capTitle.textContent = item.title;
      if (capDesc) capDesc.textContent = item.desc;
      updateGalleryFilmstripActive(currentGalleryIdx);
    }

    function nextGalleryItem() {
      goToGalleryIndex(currentGalleryIdx + 1);
    }

    function prevGalleryItem() {
      goToGalleryIndex(currentGalleryIdx - 1);
    }

    function toggleNativeFullscreen() {
      const modal = document.getElementById('facility-gallery-modal');
      if (!document.fullscreenElement) {
        if (modal.requestFullscreen) modal.requestFullscreen();
        else if (modal.webkitRequestFullscreen) modal.webkitRequestFullscreen();
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }

    function filterGalleryCategory(cat, btn) {
      document.querySelectorAll('.gal-filter-btn').forEach(b => {
        b.className = 'gal-filter-btn px-4 py-2 border border-[rgba(210,194,168,0.2)] bg-obsidian/60 text-stone hover:text-alabaster hover:border-[#c5b191] transition-colors';
      });
      if (btn) {
        btn.className = 'gal-filter-btn px-4 py-2 border border-[#c5b191] bg-[#c5b191] text-obsidian font-semibold transition-colors';
      }
      const items = document.querySelectorAll('.facility-grid-item');
      items.forEach(el => {
        const elCat = el.getAttribute('data-cat');
        if (cat === 'all' || elCat === cat || !elCat) {
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
    }

    // Keyboard controls for fullscreen gallery
    window.addEventListener('keydown', (e) => {
      const modal = document.getElementById('facility-gallery-modal');
      if (!modal || modal.classList.contains('hidden')) return;
      if (e.key === 'ArrowRight') nextGalleryItem();
      else if (e.key === 'ArrowLeft') prevGalleryItem();
      else if (e.key === 'Escape') closeGalleryFullscreen();
    });

    // Mobile Swipe Gestures
    (function () {
      let touchStartX = 0;
      let touchEndX = 0;
      const modal = document.getElementById('facility-gallery-modal');
      if (!modal) return;
      modal.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      modal.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 45) {
          if (diff < 0) nextGalleryItem();
          else prevGalleryItem();
        }
      }, { passive: true });

      // Cierre al hacer clic en el fondo con blur / backdrop
      modal.addEventListener('click', e => {
        if (!e.target.closest('#fg-main-img, #fg-video-container, button, a, #fg-filmstrip, #fg-caption-title, #fg-caption-desc')) {
          closeGalleryFullscreen();
        }
      });
    })();

    
    // ==========================================
    // CÓMO VIVIRÁS EL PROCESO (Split-Screen Walkthrough)
    // ==========================================
    const processStepsData = [
      {
        step: '01',
        badge: 'Paso 01 · Planificación',
        title: 'Programas la fecha de tu cirugía',
        desc: 'Coordinación personalizada de agenda quirúrgica con tu asistente médica asignada. Definición de fechas, resolución de dudas operativas y entrega de tu paquete de bienvenida.',
        img: 'images/dr-carlos-gomez-en-clinica-angeles-guayaquil.jpg',
        facilityTitle: 'Planificación Quirúrgica Personalizada',
        facilityNote: 'Coordinación directa y atención presencial con el Dr. Carlos Gómez.',
        galleryIdx: 13
      },
      {
        step: '02',
        badge: 'Paso 02 · 24 Horas Antes',
        title: 'Indicaciones preoperatorias del equipo médico',
        desc: 'Nuestro equipo te brinda las indicaciones específicas que debes cumplir 24 horas antes: pauta nutricional líquida, ayuno reglamentario, medicación previa y recomendaciones de confort.',
        img: 'images/personas-en-estados-unidos-visitan-ecuador-para-cirugia-bariatrica-con-el-dr-carlos-gomez.jpg',
        facilityTitle: 'Protocolo Preoperatorio Riguroso',
        facilityNote: 'Guía asistida para pacientes locales e internacionales.',
        galleryIdx: 12
      },
      {
        step: '03',
        badge: 'Paso 03 · Llegada & Parqueo QR',
        title: 'Llegas al parqueadero y colocas tu código QR',
        desc: 'Llegas cómodamente a Clínica Ángeles en el sector Mall del Sol. Acceso vehicular privado, automatizado y vigilado 24 horas mediante la lectura inmediata de tu código QR de acceso seguro.',
        img: 'images/acceso-por-codigo-qr-clinica-angeles-guayaquil-sector-mall-del-sol.jpg',
        facilityTitle: 'Acceso Inteligente por Código QR',
        facilityNote: 'Ingreso rápido, seguro y privado en sector Mall del Sol.',
        galleryIdx: 11
      },
      {
        step: '04',
        badge: 'Paso 04 · Admisión & Chequeo',
        title: 'Registras tu ingreso y valoración de rutina',
        desc: 'Recepción ágil y confidencial sin salas de espera congestionadas. Verificación de consentimientos, control de signos vitales basales y chequeo preanestésico final por el equipo médico.',
        img: 'images/centro-medico-clinica-angeles-donde-opera-el-dr-carlos-gomez-en-guayaquil.jpg',
        facilityTitle: 'Centro Médico Clínica Ángeles · Ágora',
        facilityNote: 'Admisión preferencial y valoración prequirúrgica de rutina.',
        galleryIdx: 9
      },
      {
        step: '05',
        badge: 'Paso 05 · Alojamiento Exclusivo',
        title: 'Ingresas a tu suite privada',
        desc: 'Te instalas en una suite hospitalaria con el estándar de confort de un hotel boutique: cama clínica automatizada, baño adaptado, climatización independiente, televisor y sofá cama para tu acompañante.',
        img: 'images/suite-de-paciente-cirugia-bariatrica-y-metabolica-en-clinica-angeles.jpg',
        facilityTitle: 'Suite Hospitalaria Tipo Hotel Boutique',
        facilityNote: 'Confort superior, cama automatizada y llamado 24/7.',
        galleryIdx: 0
      },
      {
        step: '06',
        badge: 'Paso 06 · Laparoscopía HD (60 - 90 min)',
        title: 'Llegas al quirófano bariátrico especializado',
        desc: 'Cirugía laparoscópica mínimamente invasiva efectuada por el Dr. Carlos Gómez con óptica HD y tecnología de sellado ultrasónico. Duración promedio entre 60 y 90 minutos con mínimas molestias postoperatorias.',
        img: 'images/quirofano-para-cirugia-baiatrica-dr-carlos-gomez-ecuador.jpg',
        facilityTitle: 'Quirófano Bariátrico de Alta Definición',
        facilityNote: 'Cirugía laparoscópica mínimamente invasiva (60 a 90 min).',
        galleryIdx: 1
      },
      {
        step: '07',
        badge: 'Paso 07 · Postoperatorio Inmediato',
        title: 'Te trasladan a área de postoperatorio',
        desc: 'Evaluación, atención y seguimiento inmediato por nuestro equipo médico y anestesiólogos. Monitoreo continuo de signos vitales, control del dolor y oxigenación hasta tu despertar tranquilo y pleno.',
        img: 'images/sala-de-postoperatorio-cirugia-bypass-gastrico-en-guayaquil.jpg',
        facilityTitle: 'Sala de Recuperación y Cuidados Intermedios',
        facilityNote: 'Monitoreo hemodinámico continuo y vigilancia especializada.',
        galleryIdx: 8
      },
      {
        step: '08',
        badge: 'Paso 08 · Recuperación (24 a 72h)',
        title: 'Regresas a tu Suite: control y descanso asistido',
        desc: 'Recuperación y control clínico durante 24 a 72 horas. Cuidado de enfermería 24/7, inicio guiado de deambulación y tolerancia oral, junto a la comodidad y privacidad de tu acompañante en la misma habitación.',
        img: 'images/suite-de-recuperacion-cirugia-bypass-gastrico-area-familiar.jpg',
        facilityTitle: 'Área Familiar y Recuperación en Suite',
        facilityNote: 'Acompañamiento familiar continuo y control médico 24 a 72 horas.',
        galleryIdx: 3
      },
      {
        step: '09',
        badge: 'Paso 09 · Alta Hospitalaria',
        title: 'Recibes el alta médica de manos del Dr. Carlos Gómez',
        desc: 'Valoración clínica satisfactoria, retiro de accesos intravenosos y entrega de tu carpeta de alta: esquema farmacológico detallado, pautas de alimentación inicial y contacto de emergencia directo.',
        img: 'images/suite-de-recuperacion-cirugia-bypass-gastrico-en-guayaquil.jpg',
        facilityTitle: 'Alta Hospitalaria y Protocolo Domiciliario',
        facilityNote: 'Evaluación clínica personal del Dr. Gómez e instrucciones claras.',
        galleryIdx: 4
      },
      {
        step: '10',
        badge: 'Paso 10 · Seguimiento Continuo',
        title: 'Consultas preprogramadas con Psicología y Nutrición',
        desc: 'Nuestro equipo multidisciplinario te acompaña durante todo tu primer año. Consultas programadas de soporte nutricional y psicológico para consolidar nuevos hábitos, energía renovada y resultados duraderos.',
        img: 'images/cafeteria-clinica-angeles-guayaquil.jpg',
        facilityTitle: 'Soporte y Seguimiento Multidisciplinario',
        facilityNote: 'Acompañamiento en consultas preprogramadas con psicólogo y nutricionista.',
        galleryIdx: 14
      }
    ];

    let currentProcessStepIdx = 0;

    function selectProcessStep(idx, shouldScroll = false) {
      if (idx < 0 || idx >= processStepsData.length) return;
      currentProcessStepIdx = idx;
      const data = processStepsData[idx];

      // Update right sticky image and texts
      const img = document.getElementById('process-main-img');
      const badge = document.getElementById('process-img-badge');
      const counter = document.getElementById('process-img-counter');
      const title = document.getElementById('process-img-title');
      const facility = document.getElementById('process-img-facility');
      if (img && img.getAttribute('src') !== data.img) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = data.img;
          img.alt = data.facilityTitle;
          img.style.opacity = '1';
        }, 140);
      }
      if (badge) badge.textContent = data.badge;
      if (counter) counter.textContent = `${data.step} / 10`;
      if (title) title.textContent = data.facilityTitle;
      if (facility) facility.textContent = data.facilityNote;

      // Update active state on cards
      document.querySelectorAll('.process-step-card').forEach((card, i) => {
        if (i === idx) {
          card.classList.add('is-active');
        } else {
          card.classList.remove('is-active');
        }
      });

      // Scroll to card if triggered from pill buttons or external
      if (shouldScroll) {
        const targetCard = document.querySelector(`.process-step-card[data-step-index="${idx}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }

    function openCurrentProcessPhotoFullscreen() {
      const data = processStepsData[currentProcessStepIdx];
      if (data && typeof data.galleryIdx === 'number') {
        openGalleryFullscreen(data.galleryIdx);
      }
    }

    // Sincronización precisa por scroll alineada cerca del punto medio de la imagen
    function syncProcessStepOnScroll() {
      const stickyFrame = document.getElementById('process-sticky-frame');
      const targetY = stickyFrame ? stickyFrame.getBoundingClientRect().top + (stickyFrame.offsetHeight * 0.45) : (window.innerHeight * 0.45);
      const cards = document.querySelectorAll('.process-step-card');
      let activeIdx = 0;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i].getBoundingClientRect().top <= targetY) {
          activeIdx = i;
        }
      }
      if (activeIdx !== currentProcessStepIdx) {
        selectProcessStep(activeIdx, false);
      }
    }
    window.addEventListener('scroll', syncProcessStepOnScroll, { passive: true });

    function selectProcedure(val) {
      const sel = document.getElementById('contact-proc');
      if (sel) sel.value = val;
    }

    // Estado global para integración con Kommo CRM
    window.drgCalculo = null;

    document.addEventListener('DOMContentLoaded', () => {
      // ==========================================
      // 1. SMART HEADER, PARALLAX & CURTAIN REVEAL (#cita)
      // ==========================================
      const smartHeader = document.getElementById('smart-header');
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      const citaSpacer = document.getElementById('cita-spacer');
      const citaRevealInner = document.getElementById('cita-reveal-inner');
      const citaBgLayer = document.getElementById('cita-bg-layer');
      let lastScrollY = window.scrollY;
      let ticking = false;

      function updateCurtainReveal() {
        if (!citaSpacer || !citaRevealInner) return;
        if (window.innerWidth >= 1024) {
          const rect = citaSpacer.getBoundingClientRect();
          const vh = window.innerHeight;
          // progress = 0 cuando #preguntas aún cubre todo, 1 cuando #cita se revela al 100%
          const rawProgress = (vh - rect.top) / vh;
          const progress = Math.max(0, Math.min(1, rawProgress));
          const translateY = (1 - progress) * 42;
          const scale = 0.965 + (progress * 0.035);
          const opacity = 0.35 + (progress * 0.65);
          citaRevealInner.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`;
          citaRevealInner.style.opacity = opacity.toFixed(3);
          if (citaBgLayer) {
            const bgScale = 1.08 - (progress * 0.08);
            const bgOpacity = 0.15 + (progress * 0.85);
            const bgBlur = (1 - progress) * 6;
            citaBgLayer.style.transform = `scale(${bgScale.toFixed(4)})`;
            citaBgLayer.style.opacity = bgOpacity.toFixed(3);
            citaBgLayer.style.filter = `blur(${bgBlur.toFixed(2)}px)`;
          }
        } else {
          citaRevealInner.style.transform = '';
          citaRevealInner.style.opacity = '';
          if (citaBgLayer) {
            citaBgLayer.style.transform = '';
            citaBgLayer.style.opacity = '';
            citaBgLayer.style.filter = '';
          }
        }
      }

      function onScrollFrame() {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;

        if (smartHeader) {
          if (currentScrollY > 60) {
            smartHeader.classList.add('header-scrolled');
          } else {
            smartHeader.classList.remove('header-scrolled');
          }

          if (currentScrollY > 140 && delta > 6) {
            // Bajando con el scroll -> ocultar suavemente
            smartHeader.classList.add('header-hidden');
          } else if (delta < -6 || currentScrollY <= 100) {
            // Subiendo con el scroll o en el tope -> mostrar suavemente
            smartHeader.classList.remove('header-hidden');
          }
        }

        // Efecto parallax suave en fondos e imágenes interactivas
        const viewportCenter = window.innerHeight / 2;
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
          const rect = el.parentElement.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const offset = (elementCenter - viewportCenter) * speed;
          const isHero = el.id === 'hero-banner-img';
          el.style.transform = isHero 
            ? `translate3d(0, ${offset.toFixed(1)}px, 0)` 
            : `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.05)`;
        });

        updateCurtainReveal();

        lastScrollY = Math.max(0, currentScrollY);
        ticking = false;
      }

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(onScrollFrame);
          ticking = true;
        }
      }, { passive: true });

      window.addEventListener('resize', updateCurtainReveal);
      updateCurtainReveal();

      // Navegación suave hacia #cita cuando está en modo Fixed Curtain Reveal
      document.querySelectorAll('a[href="#cita"]').forEach(link => {
        link.addEventListener('click', (e) => {
          if (window.innerWidth >= 1024 && citaSpacer) {
            e.preventDefault();
            const targetTop = citaSpacer.offsetTop;
            window.scrollTo({ top: targetTop, behavior: 'smooth' });
          }
        });
      });

      // ==========================================
      // 2. STAGGERED PROGRESSIVE SCROLL REVEAL
      // ==========================================
      document.querySelectorAll('[data-stagger]').forEach(container => {
        const stepMs = parseInt(container.getAttribute('data-stagger'), 10) || 100;
        const children = container.querySelectorAll(':scope > .reveal-item');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * stepMs}ms`;
        });
      });

      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.reveal-item').forEach(el => {
        revealObserver.observe(el);
      });

      // Aparición suave de los fondos de cada sección al entrar en pantalla
      const heroZoomContainer = document.getElementById('hero-zoom-container');
      if (heroZoomContainer) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            heroZoomContainer.classList.add('hero-zoomed');
          }, 80);
        });
      }

      const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const bgEl = entry.target._bgTarget || entry.target;
          if (entry.isIntersecting) {
            bgEl.classList.add('bg-is-visible');
          } else {
            bgEl.classList.remove('bg-is-visible');
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '60px 0px 60px 0px'
      });

      document.querySelectorAll('.bg-smooth-reveal').forEach(bgEl => {
        const parentSection = bgEl.parentElement;
        if (parentSection) {
          parentSection._bgTarget = bgEl;
          bgObserver.observe(parentSection);
        } else {
          bgObserver.observe(bgEl);
        }
      });

      // ==========================================
      // 3. INTERACTIVE RADIAL GLOW ON 10 RAZONES & PROCEDURE CARDS
      // ==========================================
      document.querySelectorAll('.razon-card, .proc-card, .process-step-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
      });

      // ==========================================
      // 4. CALCULADORA DE IMC INTERACTIVA (MODAL WIZARD)
      // ==========================================



      // Acordeón exclusivo FAQ con animación suave al abrir y cerrar
      const faqItems = document.querySelectorAll('details.faq-item');

      function closeFaqSmoothly(item) {
        const content = item.querySelector('.faq-content');
        if (!content || !item.open) return;
        item.classList.remove('is-expanded');
        content.style.height = `${content.scrollHeight}px`;
        content.style.opacity = '1';
        requestAnimationFrame(() => {
          content.style.height = '0px';
          content.style.opacity = '0';
        });
        const onEnd = (e) => {
          if (e.propertyName !== 'height') return;
          content.removeEventListener('transitionend', onEnd);
          if (!item.classList.contains('is-expanded')) {
            item.open = false;
            content.style.height = '';
          }
        };
        content.addEventListener('transitionend', onEnd);
      }

      function openFaqSmoothly(item) {
        const content = item.querySelector('.faq-content');
        if (!content) return;
        item.open = true;
        item.classList.add('is-expanded');
        content.style.height = '0px';
        content.style.opacity = '0';
        requestAnimationFrame(() => {
          const targetHeight = content.scrollHeight;
          content.style.height = `${targetHeight}px`;
          content.style.opacity = '1';
        });
        const onEnd = (e) => {
          if (e.propertyName !== 'height') return;
          content.removeEventListener('transitionend', onEnd);
          if (item.classList.contains('is-expanded')) {
            content.style.height = 'auto';
          }
        };
        content.addEventListener('transitionend', onEnd);
      }

      faqItems.forEach(item => {
        const summary = item.querySelector('summary');
        const content = item.querySelector('.faq-content');
        if (item.open && content) {
          item.classList.add('is-expanded');
          content.style.height = 'auto';
          content.style.opacity = '1';
        }
        if (summary) {
          summary.addEventListener('click', (e) => {
            e.preventDefault();
            if (item.classList.contains('is-expanded')) {
              closeFaqSmoothly(item);
            } else {
              faqItems.forEach(other => {
                if (other !== item && other.classList.contains('is-expanded')) {
                  closeFaqSmoothly(other);
                }
              });
              openFaqSmoothly(item);
            }
          });
        }
      });
    });


// ==========================================
// GLOBAL WINDOW EXPORTS (For HTML inline event handlers)
// ==========================================
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.openGalleryFullscreen = openGalleryFullscreen;
window.openGalleryVideo = openGalleryVideo;
window.closeGalleryFullscreen = closeGalleryFullscreen;
window.goToGalleryIndex = goToGalleryIndex;
window.nextGalleryItem = nextGalleryItem;
window.prevGalleryItem = prevGalleryItem;
window.toggleNativeFullscreen = toggleNativeFullscreen;
window.filterGalleryCategory = filterGalleryCategory;
window.selectProcessStep = selectProcessStep;
window.openCurrentProcessPhotoFullscreen = openCurrentProcessPhotoFullscreen;
window.selectProcedure = selectProcedure;
