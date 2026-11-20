/**
 * KUBERA ASTRO - PWA CONTROLLER, VERSION CONTROL & UPDATE ENGINE
 * Handles Service Worker registration, Cache-Busting, and Instant Update Prompts
 * Strictly under 300 lines compliant (Rule 6).
 */
(function () {
  'use strict';

  const APP_VERSION = 'v5.1';
  let deferredInstallPrompt = null;
  let newWorker = null;

  function initServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('[PWA] Service Worker registered:', reg.scope);

        // Check for updates
        reg.addEventListener('updatefound', () => {
          const installingWorker = reg.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              newWorker = installingWorker;
              showUpdateBanner();
            }
          });
        });

        // Trigger manual check
        reg.update().catch(() => {});
      }).catch((err) => {
        console.warn('[PWA] Service Worker registration failed:', err);
      });

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    });
  }

  function showUpdateBanner() {
    const banner = document.getElementById('pwa-update-banner');
    if (banner) banner.style.display = 'flex';
  }

  function hideUpdateBanner() {
    const banner = document.getElementById('pwa-update-banner');
    if (banner) banner.style.display = 'none';
  }

  async function forceUpdateAndClearCache() {
    try {
      const banner = document.getElementById('pwa-update-banner');
      if (banner) {
        banner.innerHTML = '<span style="font-size:0.85rem; font-weight:700;">🔄 Updating to latest version & clearing old cache...</span>';
      }

      // 1. Tell all active and waiting service workers to skip waiting & activate immediately
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          if (reg.waiting) reg.waiting.postMessage({ action: 'skipWaiting' });
          if (reg.installing) reg.installing.postMessage({ action: 'skipWaiting' });
          await reg.unregister().catch(() => {});
        }
      }

      // 2. Clear all browser CacheStorage vaults completely
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
      }

      // 3. Clear transient storage while preserving user language & theme preferences
      const curLang = localStorage.getItem('kubera_astro_lang') || 'ta';
      const curTheme = localStorage.getItem('kubera_astro_theme') || 'dark';

      // 4. Force hard reload with timestamp query to bypass any edge CDN / browser HTTP disk cache
      setTimeout(() => {
        const bustUrl = window.location.origin + window.location.pathname + '?v=' + Date.now();
        window.location.replace(bustUrl);
      }, 400);
    } catch (e) {
      console.error('[PWA] Error updating version:', e);
      window.location.reload();
    }
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const btns = [document.getElementById('btn-pwa-install'), document.getElementById('drawer-pwa-install')];
    btns.forEach(b => { if (b) b.style.display = 'inline-flex'; });
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    const btns = [document.getElementById('btn-pwa-install'), document.getElementById('drawer-pwa-install')];
    btns.forEach(b => { if (b) b.style.display = 'none'; });
    console.log('[PWA] Kubera Astro App installed successfully.');
  });

  function promptInstallApp() {
    if (!deferredInstallPrompt) {
      alert('Kubera Astro is already installed or your browser does not support automated prompts. You can install via your browser menu (⋮ -> "Add to Home Screen" or "Install App").');
      return;
    }
    deferredInstallPrompt.prompt();
    deferredInstallPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted installation.');
      }
      deferredInstallPrompt = null;
    });
  }

  initServiceWorker();

  window.PWAController = {
    promptInstallApp,
    forceUpdateAndClearCache,
    showUpdateBanner,
    hideUpdateBanner,
    getVersion: () => APP_VERSION
  };
})();
