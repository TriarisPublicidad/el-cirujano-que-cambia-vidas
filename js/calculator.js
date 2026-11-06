/* calculator.js — Calculadora de IMC (asistente de 3 pasos dentro de #bmi-modal).
 * Las acciones se registran en window.drgActions y se disparan con data-action desde el HTML. */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  var sex = 'f';
  var isMetric = true;
  var conditions = new Set();

  var CONDITION_NAMES = {
    diabetes: 'Diabetes Tipo 2',
    hipertension: 'Hipertensión',
    apnea: 'Apnea del Sueño',
    higado: 'Hígado Graso'
  };

  var modal = $('bmi-modal');

  function openModal() {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  // ---- Pasos ----
  function goToStep(step) {
    [1, 2, 3].forEach(function (n) {
      $('bmi-step-' + n).hidden = n !== step;
      $('step-label-' + n).classList.toggle('is-done', n <= step);
    });
    $('bmi-progress-bar').style.width = step === 1 ? '33.33%' : (step === 2 ? '66.66%' : '100%');
  }

  function selectGender(gender) {
    sex = gender;
    $('gender-card-f').classList.toggle('is-selected', gender === 'f');
    $('gender-card-m').classList.toggle('is-selected', gender === 'm');
    setTimeout(function () { goToStep(2); }, 180);
  }

  function setUnit(metric) {
    isMetric = metric;
    $('modal-unit-metric').classList.toggle('is-active', metric);
    $('modal-unit-imperial').classList.toggle('is-active', !metric);
    $('modal-grp-height-metric').hidden = !metric;
    $('modal-grp-height-imperial').hidden = metric;
    $('modal-weight-unit-label').textContent = metric ? 'Kilogramos (kg)' : 'Libras (lb)';
    $('modal-weight-badge').textContent = metric ? 'kg' : 'lb';
    $('modal-calc-weight').placeholder = metric ? 'Ej. 95' : 'Ej. 210';
  }

  function toggleCondition(cond, btn) {
    if (conditions.has(cond)) conditions.delete(cond);
    else conditions.add(cond);
    btn.classList.toggle('is-selected', conditions.has(cond));
  }

  // ---- Cálculo ----
  function calculate() {
    var err = $('modal-calc-error');
    var wVal = parseFloat($('modal-calc-weight').value || 0);
    var hm = 0;
    var kg = 0;

    if (isMetric) {
      hm = parseFloat($('modal-calc-height').value || 0) / 100;
      kg = wVal;
    } else {
      var ft = parseFloat($('modal-calc-ft').value || 0);
      var inch = parseFloat($('modal-calc-in').value || 0);
      hm = ((ft * 30.48) + (inch * 2.54)) / 100;
      kg = wVal * 0.45359237;
    }

    if (!kg || !hm || hm < 1.0 || hm > 2.3 || kg < 30 || kg > 350) {
      err.hidden = false;
      return;
    }
    err.hidden = true;

    var bmi = kg / (hm * hm);
    var idealKg = (sex === 'f' ? 21.5 : 23.0) * hm * hm;
    var excessKg = Math.max(0, kg - idealKg);
    var conv = function (v) { return isMetric ? v : (v / 0.45359237); };
    var u = isMetric ? 'kg' : 'lb';

    var hasComorbidity = conditions.size > 0;
    var condNames = Array.from(conditions).map(function (c) { return CONDITION_NAMES[c] || c; }).join(', ');

    // Categoría, color (data-tone en CSS) y sugerencia
    var catName, tone, procText;
    if (bmi < 18.5) {
      catName = 'Bajo peso';
      tone = 'sky';
      procText = 'IMC por debajo del rango saludable. No se indica cirugía.';
    } else if (bmi < 25) {
      catName = 'Peso Normal (Saludable)';
      tone = 'emerald';
      procText = 'Tu peso está dentro del rango óptimo. Mantenimiento y prevención.';
    } else if (bmi < 30) {
      catName = 'Sobrepeso';
      tone = 'amber';
      procText = hasComorbidity
        ? 'Candidato a Balón Gástrico o manejo metabólico preventivo para ' + condNames + '.'
        : 'Candidato habitual a manejo nutricional o Balón Gástrico no quirúrgico.';
    } else if (bmi < 35) {
      catName = hasComorbidity ? 'Obesidad Grado I + Comorbilidad' : 'Obesidad Grado I';
      tone = 'orange';
      procText = hasComorbidity
        ? 'Candidato a Cirugía Metabólica (Bypass o Manga). Alta tasa de remisión y control de ' + condNames + ' (hasta 85%).'
        : 'Candidato a Balón Gástrico o Manga Gástrica según evaluación clínica personalizada.';
    } else if (bmi < 40) {
      catName = 'Obesidad Grado II';
      tone = 'red';
      procText = hasComorbidity
        ? 'Candidato prioritario a Bypass Gástrico o Manga Gástrica para resolución de ' + condNames + '.'
        : 'Candidato habitual a Manga Gástrica o Bypass Gástrico de alta precisión.';
    } else {
      catName = 'Obesidad Grado III';
      tone = 'red';
      procText = hasComorbidity
        ? 'Candidato urgente a Cirugía Bariátrica / Metabólica para protección cardiovascular y control de ' + condNames + '.'
        : 'Candidato prioritario a Manga Gástrica o Bypass Gástrico laparoscópico.';
    }

    // Pantalla de resultado
    var bmiText = bmi.toFixed(1).replace('.', ',');
    $('result-hero-card').dataset.tone = tone;
    $('result-bmi-val').textContent = bmiText;
    $('result-bmi-badge').textContent = catName;
    $('result-bmi-recommendation').innerHTML = 'Indicación sugerida: <strong>' + procText + '</strong>';
    $('result-bmi-ideal').textContent = '~' + Math.round(conv(idealKg)) + ' ' + u;
    $('result-bmi-excess').textContent = Math.round(conv(excessKg)) + ' ' + u;
    // Posición del indicador: escala de 15 a 45
    var pct = Math.min(97, Math.max(3, ((bmi - 15) / 30) * 100));
    $('result-scale-pointer').style.left = pct.toFixed(1) + '%';

    // Enlace de WhatsApp con el mensaje ya redactado
    var condNote = hasComorbidity ? ' (Afecciones: ' + condNames + ')' : '';
    var alturaTxt = Math.round(isMetric ? (hm * 100) : (hm * 100 / 2.54)) + (isMetric ? 'cm' : 'in');
    var waMsg = 'Hola Dr. Carlos Gómez, calculé mi IMC en su web (' + bmiText + ' - ' + catName + condNote +
      ', Peso: ' + Math.round(wVal) + u + ', Estatura: ' + alturaTxt + ') y deseo solicitar una valoración médica.';
    $('btn-modal-whatsapp').href = 'https://wa.me/593988188639?text=' + encodeURIComponent(waMsg);

    // Datos que js/leads.js envía a Kommo con el formulario del informe
    window.drgCalculo = {
      imc: bmi.toFixed(1),
      categoria: catName,
      comorbilidades: condNames || 'Ninguna indicada',
      exceso: Math.round(conv(excessKg)) + ' ' + u,
      peso_kg: kg.toFixed(1),
      estatura_cm: (hm * 100).toFixed(1),
      sexo: sex,
      peso_ideal: Math.round(conv(idealKg)) + ' ' + u,
      procedimiento_sugerido: procText
    };

    if (window.drgTrack) window.drgTrack('calculate_bmi', { bmi_category: catName });
    goToStep(3);
  }

  function toggleEmailReport() {
    var box = $('email-report-container');
    var btn = $('btn-toggle-email');
    box.hidden = !box.hidden;
    $('email-toggle-arrow').textContent = box.hidden ? '↓' : '↑';
    btn.setAttribute('aria-expanded', String(!box.hidden));
  }

  Object.assign(window.drgActions = window.drgActions || {}, {
    'open-bmi': openModal,
    'close-bmi': closeModal,
    'bmi-gender': function (el) { selectGender(el.dataset.gender); },
    'bmi-unit': function (el) { setUnit(el.dataset.unit === 'metric'); },
    'bmi-condition': function (el) { toggleCondition(el.dataset.condition, el); },
    'bmi-step': function (el) { goToStep(Number(el.dataset.step)); },
    'bmi-calculate': calculate,
    'toggle-email-report': toggleEmailReport
  });

  window.drgCloseBmi = closeModal; // lo usa main.js al pulsar Escape
})();
