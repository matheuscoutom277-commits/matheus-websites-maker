self.addEventListener('install', (e) => {
  console.log('[Service Worker] Instalado com sucesso!');
});

self.addEventListener('fetch', (e) => {
  e.respondWith(fetch(e.request));
});