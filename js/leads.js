/* leads.js — envía los formularios (#lead-form y #contact-form) al webhook de n8n → Kommo.
 * Añade honeypot, casilla de consentimiento, origen de la visita (UTM / click ids) y event_id para deduplicar en CAPI. */
(function () {
  'use strict';

  var WEBHOOK = 'https://n8n.agenciasm.marketing/webhook/landing-lead-drgomez';
  var POLITICA = 'https://www.drcarlosgomez.doc.ec/politica-privacidad/';
  var WHATSAPP = 'https://wa.me/593988188639?text=' +
    encodeURIComponent('Hola Dr. Carlos Gómez, deseo información sobre cirugía bariátrica');
  var CONSENTIMIENTO = 'Acepto la política de privacidad y autorizo al Dr. Carlos Gómez y a CIBAE S.A.S. (Clínica Ángeles) a usar ' +
    'los datos que ingresé, incluidos peso, estatura e IMC si usé la calculadora, para ' +
    'contactarme por WhatsApp sobre mi consulta. Se guardan en Kommo, su sistema de ' +
    'gestión de pacientes.';

  // Origen de la visita: se guarda en la sesión y viaja con el formulario
  var CLAVES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid', 'ttclid'];
  var origen = {};
  try { origen = JSON.parse(sessionStorage.getItem('drg_origen') || '{}'); } catch (e) { origen = {}; }
  var params = new URLSearchParams(location.search);
  if (CLAVES.some(function (k) { return params.get(k); })) {
    origen = {};
    CLAVES.forEach(function (k) { if (params.get(k)) origen[k] = params.get(k); });
  }
  if (!origen.referrer && document.referrer && document.referrer.indexOf(location.hostname) === -1) {
    origen.referrer = document.referrer;
  }
  try { sessionStorage.setItem('drg_origen', JSON.stringify(origen)); } catch (e) { /* sin sessionStorage */ }

  function iniciar() {
    conectar('lead-form', 'lead-success', true);
    conectar('contact-form', 'contact-success', false);
  }

  function conectar(idForm, idExito, conCalculo) {
    var viejo = document.getElementById(idForm);
    var exito = document.getElementById(idExito);
    if (!viejo || !exito) return;

    // Se clona el formulario para quitar cualquier listener previo
    var form = viejo.cloneNode(true);
    viejo.parentNode.replaceChild(form, viejo);

    // Honeypot que revisa el webhook
    var hp = document.createElement('div');
    hp.className = 'drg-hp';
    hp.setAttribute('aria-hidden', 'true');
    hp.innerHTML = '<label>No llenar <input type="text" name="website" tabindex="-1" autocomplete="off"></label>';
    form.appendChild(hp);

    // Casilla de consentimiento obligatoria
    var idCasilla = idForm + '-consent';
    var consent = document.createElement('label');
    consent.className = 'drg-consent';
    consent.setAttribute('for', idCasilla);
    consent.innerHTML = '<input type="checkbox" id="' + idCasilla + '" name="consent" required>' +
      '<span>' + CONSENTIMIENTO.replace('política de privacidad',
        '<a href="' + POLITICA + '" target="_blank" rel="noopener noreferrer">política de privacidad</a>') + '</span>';
    var boton = form.querySelector('button[type="submit"]');
    if (boton.parentNode === form) form.insertBefore(consent, boton);
    else form.appendChild(consent);

    var estado = document.createElement('p');
    estado.className = 'drg-estado';
    estado.setAttribute('role', 'alert');
    estado.hidden = true;
    form.appendChild(estado);

    var htmlBoton = boton.innerHTML;
    var enviando = false;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (enviando) return;
      enviando = true;
      boton.disabled = true;
      boton.textContent = 'Enviando solicitud...';
      estado.hidden = true;

      var datos = new URLSearchParams(new FormData(form));
      datos.set('form', idForm);
      datos.set('consent_text', CONSENTIMIENTO);
      datos.set('page', location.origin + location.pathname);
      Object.keys(origen).forEach(function (k) { datos.set(k, origen[k]); });
      if (conCalculo && window.drgCalculo) {
        Object.keys(window.drgCalculo).forEach(function (k) { datos.set(k, window.drgCalculo[k]); });
      }
      // Mismo event_id en el navegador (dataLayer) y en el servidor (CAPI) para deduplicar
      var eventId = window.drgEventId ? window.drgEventId() : '';
      if (eventId) datos.set('event_id', eventId);

      var corte = new AbortController();
      var reloj = setTimeout(function () { corte.abort(); }, 20000);

      fetch(WEBHOOK, { method: 'POST', body: datos, signal: corte.signal })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (j) {
            return { ok: r.ok && j.ok === true, motivo: j.motivo, status: r.status };
          });
        })
        .catch(function () { return { ok: false, red: true }; }) // sin conexión, CORS o tiempo agotado
        .then(function (res) {
          clearTimeout(reloj);
          enviando = false;
          boton.disabled = false;
          boton.innerHTML = htmlBoton;
          if (res.ok) {
            if (window.drgTrack) window.drgTrack('generate_lead', { form_id: idForm, event_id: eventId });
            form.hidden = true;
            exito.hidden = false;
            return;
          }
          // Se avisa a GTM para detectar formularios que fallan sin que nadie lo note
          if (window.drgTrack) window.drgTrack('lead_error', { form_id: idForm, status: res.status || 0, motivo: res.motivo || (res.red ? 'red' : 'desconocido') });
          var mensajes = {
            telefono: 'Revisa tu número de WhatsApp: parece incompleto.',
            nombre: 'Escribe tu nombre, por favor.',
            email: 'Revisa tu correo electrónico: parece incompleto.',
            consentimiento: 'Para enviar tus datos necesitamos que aceptes la política de privacidad.'
          };
          var enlace = '<a href="' + WHATSAPP + '" target="_blank" rel="noopener noreferrer">escríbenos por WhatsApp</a> y te atendemos de inmediato.';
          estado.innerHTML = mensajes[res.motivo] || (res.red
            ? 'No pudimos conectar. Revisa tu conexión o ' + enlace
            : 'No pudimos enviar tu solicitud. Intenta de nuevo o ' + enlace);
          estado.hidden = false;
        });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
