const CACHE_NAME = 'cozy-planner-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json'
];

// مرحله نصب: ذخیره فایل‌های اصلی در کش
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('فایل‌های اصلی با موفقیت کش شدند');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// مرحله فعال‌سازی: پاک‌سازی کش‌های قدیمی در صورت آپدیت برنامه
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('کش قدیمی پاک شد:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// مدیریت درخواست‌ها: خواندن از کش در صورت قطع اینترنت
self.addEventListener('fetch', (event) => {
    // برای فونت‌ها و بقیه درخواست‌ها، اول کش رو چک کن، اگه نبود از شبکه بگیر
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
    );
});
