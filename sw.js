const CACHE_NAME = 'cashback-tracker-v31';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js?v=31',
  './manifest.json',
  './icon.svg'
];

// Установка сервис-воркера и мгновенная активация
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

// Активация сервис-воркера и очистка любого старого кэша
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Перехват запросов: Network-First для свежих данных, Cache при отсутствии интернета
self.addEventListener('fetch', event => {
  // Не кэшируем API-запросы синхронизации
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && event.request.method === 'GET') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
