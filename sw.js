self.addEventListener('install', (event) => {
  console.log('Service Worker instalado com sucesso.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado.');
  event.waitUntil(clients.claim());
});

// O Chrome exige um listener de fetch para considerar a PWA instalável
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});