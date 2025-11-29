const CACHE = 'story-generator-cache-v1';
const PRECACHE = [
  '/examples/story-generator/',
  '/examples/story-generator/index.html',
  '/examples/story-generator/style.css',
  '/examples/story-generator/script.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : undefined))))
  );
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  e.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});


