(function () {
    var WEBHOOK = 'https://n8n.agenciasm.marketing/webhook/landing-lead-drgomez';
    var POLITICA = 'https://www.drcarlosgomez.doc.ec/politica-privacidad/';
    var WHATSAPP = 'https://wa.me/593988188639?text=' +
      encodeURIComponent('Hola Dr. Carlos Gómez, deseo información sobre cirugía bariátrica');
    var CONSENTIMIENTO = 'Acepto la política de privacidad y autorizo al Dr. Carlos Gómez y a CIBAE S.A.S. (Clínica Ángeles) a usar ' +
      'los datos que ingresé, incluidos peso, estatura e IMC si usé la calculadora, para ' +
      'contactarme por WhatsApp sobre mi consulta. Se guardan en Kommo, su sistema de ' +
      'gestión de pacientes.';

    var CLAVES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];
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
    try { sessionStorage.setItem('drg_origen', JSON.stringify(origen)); } catch (e) {}

    function iniciar() {
      conectar('lead-form', 'lead-success', 'block', true);
      conectar('contact-form', 'contact-success', 'flex', false);

      function conectar(idForm, idExito, display, conCalculo) {
        var viejo = document.getElementById(idForm);
        var exito = document.getElementById(idExito);
        if (!viejo || !exito) return;

        var form = viejo.cloneNode(true);
        viejo.parentNode.replaceChild(form, viejo);

        var hp = document.createElement('div');
        hp.className = 'drg-hp';
        hp.setAttribute('aria-hidden', 'true');
        hp.innerHTML = '<label>No llenar <input type="text" name="website" tabindex="-1" autocomplete="off"></label>';
        form.appendChild(hp);

        var idCasilla = idForm + '-consent';
        var consent = document.createElement('label');
        consent.className = 'drg-consent';
        consent.setAttribute('for', idCasilla);
        consent.innerHTML = '<input type="checkbox" id="' + idCasilla + '" name="consent" required>' +
          '<span>' + CONSENTIMIENTO.replace('política de privacidad',
            '<a href="' + POLITICA + '" target="_blank" rel="noopener">política de privacidad</a>') + '</span>';
        var boton = form.querySelector('button[type="submit"]');
        if (boton.parentNode === form) form.insertBefore(consent, boton);
        else form.appendChild(consent);

        var estado = document.createElement('p');
        estado.className = 'drg-estado';
        estado.setAttribute('role', 'alert');
        estado.style.display = 'none';
        form.appendChild(estado);

        var htmlBoton = boton.innerHTML;
        var enviando = false;

        form.addEventListener('submit', function (e) {
          e.preventDefault();
          if (enviando) return;
          enviando = true;
          boton.disabled = true;
          boton.textContent = 'Enviando solicitud...';
          estado.style.display = 'none';

          var datos = new URLSearchParams(new FormData(form));
          datos.set('form', idForm);
          datos.set('consent_text', CONSENTIMIENTO);
          datos.set('page', location.origin + location.pathname);
          Object.keys(origen).forEach(function (k) { datos.set(k, origen[k]); });
          if (conCalculo && window.drgCalculo) {
            Object.keys(window.drgCalculo).forEach(function (k) { datos.set(k, window.drgCalculo[k]); });
          }

          var corte = new AbortController();
          var reloj = setTimeout(function () { corte.abort(); }, 20000);

          fetch(WEBHOOK, { method: 'POST', body: datos, signal: corte.signal })
            .then(function (r) {
              return r.json().catch(function () { return {}; }).then(function (j) {
                return { ok: r.ok && j.ok === true, motivo: j.motivo };
              });
            })
            .catch(function () { return { ok: false }; })
            .then(function (res) {
              clearTimeout(reloj);
              enviando = false;
              boton.disabled = false;
              boton.innerHTML = htmlBoton;
              if (res.ok) {
                form.style.display = 'none';
                exito.style.display = display;
                return;
              }
              var mensajes = {
                telefono: 'Revisa tu número de WhatsApp: parece incompleto.',
                nombre: 'Escribe tu nombre, por favor.',
                consentimiento: 'Para enviar tus datos necesitamos que aceptes la política de privacidad.',
              };
              estado.innerHTML = mensajes[res.motivo] ||
                'No pudimos enviar tu solicitud. <a href="' + WHATSAPP + '" target="_blank" rel="noopener">Escríbenos por WhatsApp</a> y te atendemos de inmediato.';
              estado.style.display = 'block';
            });
        });
      }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
    else iniciar();
  })();
