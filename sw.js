/**
 * KUBERA ASTRO - SERVICE WORKER (CACHE-FIRST RESILIENT SHELL)
 * Fast app loading, reliable offline support, background caching
 * Strictly under 100 lines compliant (Rule 6).
 */
const CACHE_NAME = 'kubera-astro-v5.1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/ganesha.png',
  '/assets/murugan.png',
  '/assets/apple-touch-icon.png',
  '/assets/favicon-32x32.png',
  '/styles/variables.css',
  '/styles/base.css',
  '/styles/header_nav.css',
  '/styles/astro_charts.css',
  '/styles/porutham.css',
  '/styles/donation.css',
  '/styles/footer.css',
  '/styles/theme_light.css',
  '/styles/adsense.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) {
            return caches.delete(k);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Do not intercept or cache external dynamic backend API calls
  if (url.hostname.includes('jathagam-backend') ||
      url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('googletagmanager.com') ||
      url.hostname.includes('pagead2.googlesyndication.com') ||
      url.hostname.includes('openstreetmap.org')) {
    return;
  }

  // Network first for HTML navigation, cache fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Cache first for static assets, network fallback
  event.respondWith(
    caches.match(req).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(req).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, responseToCache);
        });
        return networkResponse;
      });
    }).catch(() => {
      return caches.match(req);
    })
  );
});
