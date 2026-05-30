// ===== app.js (با رفع مشکل نمایش شعر و تقویم پس از ورود نام) =====

// ---------- اشعار ۳۰ روزه ----------
const poems = [
    'یوسف گمگشته بازآید به کنعان غم مخور / کلبه احزان شود روزی گلستان غم مخور. (حافظ)',
    'آسایش دو گیتی تفسیر این دو حرف است / با دوستان مروت با دشمنان مدارا. (سعدی)',
    'دوش وقت سحر از غصه نجاتم دادند / و اندر آن ظلمت شب آب حیاتم دادند. (حافظ)',
    'بیا که قصر امل سخت سست بنیاد است / به باده فکر بنا کن که برقرار بوَد. (حافظ)',
    'مژده‌ای دل که دگر باد صبا بازآمد / هدهد صبح خوش‌آواز شکرپرداز آمد. (حافظ)',
    'روز هجران و شب فرقت یار آخر شد / زدم این فال و گذشت اختر و کار آخر شد. (حافظ)',
    'بوی بهبود ز اوضاع جهان می‌شنوم / شادی از بخت بداندیش نهان می‌شنوم. (سعدی)',
    'به جهان خرم از آنم که جهان خرم از اوست / عاشقم بر همه عالم که همه عالم از اوست. (سعدی)',
    'دلا بسوز که سوز تو کارها بکند / نیاز نیم‌شبی دفع صد بلا بکند. (حافظ)',
    'عاقبت از ما غباری ماند و از خوبان خیال / خرم آنکس که در این عالم غبارش کمتر است. (صائب)',
    'ما در این در نه پی حشمت و جاه آمدیم / از بد حادثه اینجا به پناه آمدیم. (حافظ)',
    'بیا که نوبت صلح است و دوستی و صفا / که دوستی و محبت هزار بار نکوست. (سعدی)',
    'جهان و هر چه در او هست، سربه‌سر خوابی است / به کوشش از پی آرایش سراب مباش. (بیدل)',
    'غم مخور ای دل که گردون گر کند صد پی شکست / خم می شیشه باز آید به دست شیشه‌گر. (بیدل)',
    'درین چمن گل بی‌خار نیست، خوش باش / بهار اگرچه خزان دارد، خزان بهاری هم. (بیدل)',
    'حاصل ما از جهان جز حسرت و اندوه نیست / خوش که چندانی نماندیم و غباری می‌شویم. (صائب)',
    'نفس گره مزن از پیچ و تاب آینه‌ها / همین غبار که بستی، حجاب می‌شکند. (بیدل)',
    'دل چو از خویش تهی شد، همه عالم در اوست / قطره کز خود بگذرد، بحر صفت می‌گردد. (بیدل)',
    'دل شکسته ز غم اعتبار می‌گیرد / شکستن دل ما را به کار می‌آید. (صائب)',
    'به لب رسیده جانم، غم فراق تو بس نیست / هنوز امید دیدار در میان می‌باشد. (سعدی)',
    'دل اگر چه ز غم روزگار پر خون است / به امید گشایش، در غم فرو بسته مدار. (کلیم)',
    'چه غم ز موج حوادث، که کشتی شکسته‌ای / به ساحل نجات از لطف باری می‌رسد. (بیدل)',
    'چمن بی‌داغ خاطر نیست، شاد از آن مباش / که بلبل از گل خندان نصیبش خار می‌باشد. (کلیم)',
    'غم مخور از سختی ایام که این دیر سپنج / روزی از پیچ و خم غم گهر آسایش آرد. (صائب)',
    'جهان و هر چه در او هست، هیچ نیست ای دل / به هیچ در نگر و هیچ بر مخوان و مپیچ. (بیدل)',
    'دل از غم جهان شاد دار، که غم جای دگر دارد / تو را این یک نفس فرصت، غنیمت دان و می نوش. (صائب)',
    'خوش باش که در باغ جهان، یک دو نفس بیش / گل نیست که پژمرده خزان نشودش. (صائب)',
    'غم فردا مبر ای دل، که قضا روزی تو / بیش از آن است که در فکر تو آید، غم نیست. (کلیم)',
    'غم دنیا مخور ای دل که دنیا را وفا نیست / غم ما در دو عالم، همه باد است و هوا نیست. (سعدی)',
    'سحر شد جام می در گردش آمد / چراغ شام در خواب گران رفت. (کلیم)',
];

// ---------- ابزار تاریخ ----------
function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const gy2 = gm > 2 ? gy + 1 : gy;
    let days = 355666 + 365 * gy + Math.floor((gy2 + 3) / 4) - Math.floor((gy2 + 99) / 100) + Math.floor((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
    let jy = -1595 + 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) { jy += Math.floor((days - 1) / 365); days = (days - 1) % 365; }
    let jm, jd;
    if (days < 186) { jm = 1 + Math.floor(days / 31); jd = 1 + (days % 31); }
    else { jm = 7 + Math.floor((days - 186) / 30); jd = 1 + ((days - 186) % 30); }
    return [jy, jm, jd];
}

function getDayOfYearJalali(jy, jm, jd) { return jm <= 6 ? (jm - 1) * 31 + jd : 186 + (jm - 7) * 30 + jd; }

const jalaliMonthNames = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const jalaliWeekdays = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];

function jalaliToGregorian(jy, jm, jd) {
    jy += 1595;
    let days = -355668 + jd + (jm <= 6 ? (jm - 1) * 31 : 186 + (jm - 7) * 30) + Math.floor(jy / 33) * 12053 + Math.floor((jy % 33) * 365.25);
    days = Math.round(days);
    const gy = 621 + Math.floor(days / 365);
    let gd = days - Math.floor((gy - 621) * 365.25) - Math.floor((gy - 617) / 4) + Math.floor((gy - 617) / 100) - Math.floor((gy - 617) / 400);
    const g_dim = [31,28,31,30,31,30,31,31,30,31,30,31];
    if ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0) g_dim[1] = 29;
    let gm = 1, temp = gd;
    for (let i = 0; i < 12; i++) { if (temp <= g_dim[i]) { gm = i + 1; break; } temp -= g_dim[i]; }
    return [gy, gm, temp];
}

function getJalaliWeekday(jy, jm, jd) { const g = jalaliToGregorian(jy, jm, jd); return new Date(g[0], g[1] - 1, g[2]).getDay(); }
function getTodayJalali() { const t = new Date(); return gregorianToJalali(t.getFullYear(), t.getMonth() + 1, t.getDate()); }

function formatTime12(h, m) { const h12 = h % 12 || 12; const p = h < 12 ? 'ق.ظ' : 'ب.ظ'; return `${h12}:${m.toString().padStart(2, '0')} ${p}`; }
function formatTimeRange(sh, sm, eh, em) { return `${formatTime12(sh, sm)} - ${formatTime12(eh, em)}`; }

// ---------- نام کاربر ----------
let userName = localStorage.getItem('planner_userName') || '';

// ---------- داده‌ها ----------
let todos = JSON.parse(localStorage.getItem('planner_todos')) || [];
let schedules = JSON.parse(localStorage.getItem('planner_schedules')) || [];

function saveTodos() { localStorage.setItem('planner_todos', JSON.stringify(todos)); }
function saveSchedules() { localStorage.setItem('planner_schedules', JSON.stringify(schedules)); }

// ---------- دارک مود ----------
function applyDarkMode(isDark) {
    document.body.classList.toggle('dark', isDark);
    const btn = document.getElementById('darkModeToggle');
    if (btn) btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('planner_darkMode', isDark);
}

function toggleDarkMode() {
    const isDark = !document.body.classList.contains('dark');
    applyDarkMode(isDark);
}

// ---------- مدیریت مودال (فقط با style.display) ----------
function showWelcomeModal() {
    document.getElementById('welcomeModal').style.display = 'flex';
}
function hideWelcomeModal() {
    document.getElementById('welcomeModal').style.display = 'none';
}

// ---------- رندر برنامه‌ریز ----------
function renderTodos() { /* کد بدون تغییر، دقیقاً مثل قبل */ }
function renderSchedules() { /* کد بدون تغییر */ }
function renderClocks() { /* کد بدون تغییر */ }
function drawClockCanvas(canvasId, rangeStart, rangeEnd) { /* کد بدون تغییر */ }

// ---------- کرونومتر ----------
// ... (همان توابع)
// ---------- پومودورو ----------
// ... (همان توابع)

// ---------- ناوبری ----------
function switchPage(pageId) { /* کد بدون تغییر */ }

// ---------- رویدادها ----------
function setupEvents() {
    // جزیره و دارک مود و تودو و زمانبندی و کرونومتر و پومودورو مثل قبل...

    // مودال نام (اصلاح نهایی)
    document.getElementById('saveNameBtn').addEventListener('click', () => {
        const nameInput = document.getElementById('nameInput');
        const name = nameInput.value.trim();
        const errorEl = document.getElementById('nameError');

        if (!name) {
            errorEl.textContent = 'لطفاً یک اسم وارد کن 🌱';
            nameInput.focus();
            return;
        }

        errorEl.textContent = '';
        userName = name;
        localStorage.setItem('planner_userName', name);
        hideWelcomeModal();
        updateUIWithName();
        // حالا که اسم ذخیره شد، تقویم و شعر را به‌روز کن
        updateCalendarAndPoem();
        renderClocks(); // یک بار هم ساعت‌ها را رسم کن
    });

    document.getElementById('nameInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') document.getElementById('saveNameBtn').click();
    });
}

function updateUIWithName() {
    document.getElementById('userNameDisplay').textContent = userName;
    document.getElementById('footerName').textContent = userName;
}

// ---------- تقویم و شعر ----------
function updateCalendarAndPoem() {
    const [jy, jm, jd] = getTodayJalali();
    const wd = getJalaliWeekday(jy, jm, jd);
    document.getElementById('weekdayName').textContent = jalaliWeekdays[wd];
    document.getElementById('jalaliDay').textContent = jd.toLocaleString('fa-IR');
    document.getElementById('jalaliMonth').textContent = jalaliMonthNames[jm - 1];
    document.getElementById('jalaliYear').textContent = jy.toLocaleString('fa-IR');
    const now = new Date();
    const gm = ['ژانویه','فوریه','مارس','آوریل','می','ژوئن','جولای','اوت','سپتامبر','اکتبر','نوامبر','دسامبر'];
    document.getElementById('gregorianDate').textContent = now.getDate() + ' ' + gm[now.getMonth()] + ' ' + now.getFullYear();
    const doy = getDayOfYearJalali(jy, jm, jd);
    document.getElementById('poemText').textContent = poems[(doy - 1) % poems.length];
    document.getElementById('footerDate').textContent = jalaliWeekdays[wd] + '، ' + jd + ' ' + jalaliMonthNames[jm - 1] + ' ' + jy;
}

// ---------- راه‌اندازی ----------
function init() {
    const savedDark = localStorage.getItem('planner_darkMode') === 'true';
    applyDarkMode(savedDark);

    if (userName) {
        hideWelcomeModal();
        updateUIWithName();
    } else {
        showWelcomeModal();
    }

    updateCalendarAndPoem();
    renderTodos();
    renderSchedules();
    renderClocks();
    setupEvents();

    setInterval(renderClocks, 60000);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
}

document.addEventListener('DOMContentLoaded', init);
