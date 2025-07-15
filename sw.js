const CACHE_NAME = 'ak-solutions-v1.0.3';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/css/fonts.css',
  '/fonts/nunito-400-latin.woff2',
  '/fonts/nunito-700-latin.woff2',
  '/img/logo.webp',
  '/img/equipe.webp'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// Stratégie de cache : Cache First pour les assets statiques
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  
  // Ne pas intercepter les requêtes vers des domaines tiers
  if (url.hostname !== location.hostname) {
    return;
  }
  
  // Cache les ressources statiques locales uniquement
  if (url.pathname.match(/\.(css|js|woff2|webp|png|jpg|jpeg)$/)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Retourne depuis le cache ou fetch si pas en cache
          return response || fetch(event.request);
        })
    );
  }
});

// Nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
