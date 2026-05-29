// لیست جملات و شعرهای آرامش‌بخش (متناسب با لحن دنج برنامه)
const quotes = [
    "هر چیزی در زمان خودش اتفاق می‌افتد. صبور باش و به مسیر اعتماد کن. ✨",
    "نفس عمیق بکش؛ همین لحظه تنها چیزی است که واقعاً داری. ☕",
    "گاهی وقت‌ها، بزرگ‌ترین دستاورد این است که فقط آرام بمانی. 🌿",
    "در میان هر طوفانی، یک گوشه دنج برای آرامش دلت پیدا کن. 🍂",
    "مثل یک فنجان چای گرم در روزی بارانی، به خودت مهربانی هدیه کن. 🫖",
    "امروز به خودت سخت نگیر، تو داری تمام تلاشت را می‌کنی. 🤍"
];

const quoteDisplay = document.getElementById('quote-display');
const newQuoteBtn = document.getElementById('new-quote-btn');

// تابع انتخاب جمله تصادفی بدون تکرار متوالی
let lastIndex = -1;
function getRandomQuote() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
    } while (randomIndex === lastIndex);
    
    lastIndex = randomIndex;
    quoteDisplay.textContent = quotes[randomIndex];
}

// رویداد کلیک دکمه
newQuoteBtn.addEventListener('click', getRandomQuote);

// ثبت Service Worker برای قابلیت آفلاین و پی‌دبلیوای شدن
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('ServiceWorker with scope registered: ', registration.scope);
            })
            .catch(error => {
                console.error('ServiceWorker registration failed: ', error);
            });
    });
}
