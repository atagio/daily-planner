const CACHE_NAME = 'cozy-corner-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// مرحله نصب: فایل‌های اصلی در حافظه کش ذخیره می‌شوند
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('فایل‌های اصلی با موفقیت کش شدند.');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// مرحله فعال‌سازی: حذف کش‌های قدیمی در صورت آپدیت نسخه برنامه
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('کش قدیمی حذف شد:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// مرحله واکشی (Fetch): درخواست‌ها ابتدا از کش خوانده می‌شوند تا برنامه آفلاین کار کند
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // اگر فایل در کش بود، همان را برگردان؛ در غیر این صورت از شبکه بگیر
                return cachedResponse || fetch(event.request);
            })
    );
});
