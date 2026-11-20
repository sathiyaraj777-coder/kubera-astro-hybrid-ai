/**
 * KUBERA ASTRO - GOOGLE ADSENSE CONTROLLER & AD SLOTS
 * Standard 09: Value-dense context, zero deceptive triggers.
 * Strictly under 300 lines compliant (Rule 6).
 */
(function () {
  'use strict';

  function initAdSense() {
    // Only push ads if adsbygoogle script is loaded and user is not bot
    if (window.__IS_UNTRUSTED_BOT__) return;

    try {
      const adSlots = document.querySelectorAll('.adsbygoogle');
      adSlots.forEach(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      });
    } catch (e) {
      console.warn("AdSense slot notice:", e);
    }
  }

  window.AdsManager = {
    init: initAdSense
  };

  document.addEventListener('DOMContentLoaded', initAdSense);
})();

