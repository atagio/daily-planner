// service-worker.js
const CACHE_NAME = 'pwa-planner-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700&display=swap'
];

// نصب و کش اولیه
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('حافظه کش باز شد');
        return cache.addAll(urlsToCache);
      })
  );
});

// فعال‌سازی و پاکسازی کش‌های قدیمی
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('حذف کش قدیمی:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// استراتژی کش اول، بعد شبکه
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // اگر در کش بود، همان را برگردان
        if (response) {
          return response;
        }
        // در غیر این صورت از شبکه دریافت کن
        return fetch(event.request).then(
          networkResponse => {
            // اگر پاسخ معتبر نبود، همان را برگردان (مثلاً خطا)
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            // کلون کردن پاسخ برای ذخیره در کش
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return networkResponse;
          }
        ).catch(() => {
          // در صورت آفلاین بودن می‌توان یک صفحه fallback برگرداند
          // برای سادگی، درخواست‌های غیر HTML را رد می‌کنیم
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
