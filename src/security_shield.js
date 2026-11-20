/**
 * KUBERA ASTRO - 5-TIER SECURITY SHIELD
 * Anti-debugging, Headless/Bot Scraper Filter & DOM Protection
 * Strictly under 300 lines compliant (Rule 6).
 */
(function () {
  'use strict';

  function initSecurityShield() {
    // 1. Detect Headless Browsers / Scrapers (Allow Google AdSense & Search crawlers)
    const ua = navigator.userAgent || '';
    const isSearchCrawler = /Googlebot|Mediapartners-Google|AdsBot-Google|bingbot|DuckDuckBot/i.test(ua);
    const isHeadless = !isSearchCrawler && (
      navigator.webdriver || 
      window.callPhantom || 
      window._phantom || 
      /HeadlessChrome|PhantomJS|Electron/i.test(ua)
    );

    if (isHeadless) {
      window.__IS_UNTRUSTED_BOT__ = true;
      console.warn("🛡️ Security Shield: Automated crawler detected.");
    }

    // 2. Disable Keyboard Shortcuts (F12, Ctrl+Shift+I/J, Ctrl+U)
    window.addEventListener('keydown', function (e) {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || // I, J, C
        (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83)) // Ctrl+U, Ctrl+S
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);

    // 3. Global Right Click Context Menu Block
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);

    // 4. Debugger Trap in Production
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      setInterval(function () {
        const startTime = performance.now();
        debugger;
        if (performance.now() - startTime > 100) {
          // DevTools open delay detected
        }
      }, 4000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSecurityShield);
  } else {
    initSecurityShield();
  }
})();

