/* Service Worker Story App - push notification + offline (PWA). */
const VERSION = 'v2';
const SHELL_CACHE = `storyapp-shell-${VERSION}`;
const ASSET_CACHE = `storyapp-asset-${VERSION}`;
const API_CACHE = `storyapp-api-${VERSION}`;
const IMAGE_CACHE = `storyapp-image-${VERSION}`;

const BASE = new URL('./', self.location).pathname;
const SHELL_ASSETS = [
  BASE,
  `${BASE}index.html`,
  `${BASE}manifest.webmanifest`,
  `${BASE}favicon.png`,
  `${BASE}images/logo.png`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !key.endsWith(VERSION))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/** Network first: data selalu segar, tetapi tetap tersedia saat offline. */
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw error;
  }
}

/** Cache first: aset statis berhash dan gambar. */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response && response.status === 200) {
    cache.put(request, response.clone());
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Navigasi (SPA) -> selalu sajikan app shell agar tetap jalan saat offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(`${BASE}index.html`).then((r) => r || caches.match(BASE)),
      ),
    );
    return;
  }

  // Data dinamis dari Story API -> network first (kriteria 3 Advanced).
  if (url.origin === 'https://story-api.dicoding.dev') {
    if (url.pathname.includes('/images/') || url.pathname.includes('/photo')) {
      event.respondWith(cacheFirst(request, IMAGE_CACHE));
    } else {
      event.respondWith(networkFirst(request, API_CACHE));
    }
    return;
  }

  // Tile peta & CDN -> cache first.
  if (
    url.hostname.includes('tile.openstreetmap.org') ||
    url.hostname.includes('basemaps.cartocdn.com') ||
    url.hostname.includes('tile.opentopomap.org') ||
    url.hostname.includes('unpkg.com')
  ) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE).catch(() => Response.error()));
    return;
  }

  // Aset milik aplikasi sendiri.
  if (url.origin === self.location.origin) {
    event.respondWith(cacheFirst(request, ASSET_CACHE).catch(() => caches.match(request)));
  }
});

/* ---------------- Push Notification ---------------- */

self.addEventListener('push', (event) => {
  // Notifikasi dinamis: judul, isi, dan data diambil dari payload event (Skilled).
  let payload = {
    title: 'Story App',
    options: { body: 'Ada pembaruan cerita baru.' },
  };

  if (event.data) {
    try {
      payload = event.data.json();
    } catch (error) {
      payload = { title: 'Story App', options: { body: event.data.text() } };
    }
  }

  const title = payload.title || 'Story App';
  const options = payload.options || {};

  event.waitUntil(
    self.registration.showNotification(title, {
      body: options.body || 'Ada cerita baru untuk Anda.',
      icon: `${BASE}images/logo.png`,
      badge: `${BASE}favicon.png`,
      data: { ...(options.data || {}), url: BASE },
      tag: 'storyapp-notification',
      ...options,
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = new URL(`${BASE}#/saved`, self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      return self.clients.openWindow(target);
    }),
  );
});
