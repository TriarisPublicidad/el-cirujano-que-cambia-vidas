/* tracking.js — Google Tag Manager + Consent Mode v2 + eventos del dataLayer.
 *
 * - GTM es el único punto de carga de etiquetas (Meta, Google Ads, TikTok, GA4 se configuran dentro del contenedor).
 * - El consentimiento arranca DENEGADO. Solo se concede cuando la persona pulsa "Aceptar" en el aviso de cookies.
 * - window.drgTrack(evento, parametros) envía un evento al dataLayer y devuelve su event_id,
 *   el mismo que se manda al servidor (n8n → CAPI) para deduplicar conversiones.
 */
(function () {
  'use strict';

  var GTM_ID = 'GTM-TVL2KNGP';
  var STORAGE_KEY = 'drg_consent';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  function consentState(value) {
    return {
      ad_storage: value,
      ad_user_data: value,
      ad_personalization: value,
      analytics_storage: value
    };
  }

  function readChoice() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function saveChoice(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* modo privado: se pregunta de nuevo */ }
  }

  // 1. Consentimiento por defecto: denegado. Si ya aceptó antes, se concede de inmediato.
  var defaults = consentState('denied');
  defaults.wait_for_update = 500;
  gtag('consent', 'default', defaults);
  if (readChoice() === 'granted') gtag('consent', 'update', consentState('granted'));

  // 2. Carga de GTM
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var first = document.getElementsByTagName('script')[0];
  var gtm = document.createElement('script');
  gtm.async = true;
  gtm.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
  first.parentNode.insertBefore(gtm, first);

  // 3. Eventos
  function newEventId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }

  window.drgEventId = newEventId;

  window.drgTrack = function (eventName, params) {
    var payload = { event: eventName, event_id: newEventId() };
    if (params) for (var k in params) payload[k] = params[k];
    window.dataLayer.push(payload);
    return payload.event_id;
  };

  // Clic en cualquier enlace a WhatsApp
  document.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href*="wa.me"]') : null;
    if (link) window.drgTrack('click_whatsapp', { link_url: link.href });
  });

  // 4. Aviso de cookies
  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.getElementById('consent-banner');
    if (!banner) return;
    if (!readChoice()) banner.hidden = false;

    banner.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var granted = btn.getAttribute('data-action') === 'consent-accept';
      if (!granted && btn.getAttribute('data-action') !== 'consent-reject') return;
      saveChoice(granted ? 'granted' : 'denied');
      gtag('consent', 'update', consentState(granted ? 'granted' : 'denied'));
      banner.hidden = true;
    });
  });
})();
