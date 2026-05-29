// ===== app.js =====

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

// ---------- تبدیل تاریخ میلادی به شمسی ----------
function gregorianToJalali(gy, gm, gd) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    const gy2 = gm > 2 ? gy + 1 : gy;
    let days =
        355666 +
        365 * gy +
        Math.floor((gy2 + 3) / 4) -
        Math.floor((gy2 + 99) / 100) +
        Math.floor((gy2 + 399) / 400) +
        gd +
        g_d_m[gm - 1];
    let jy = -1595 + 33 * Math.floor(days / 12053);
    days %= 12053;
    jy += 4 * Math.floor(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += Math.floor((days - 1) / 365);
        days = (days - 1) % 365;
    }
    let jm, jd;
    if (days < 186) {
        jm = 1 + Math.floor(days / 31);
        jd = 1 + (days % 31);
    } else {
        jm = 7 + Math.floor((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
    }
    return [jy, jm, jd];
}

function getDayOfYearJalali(jy, jm, jd) {
    if (jm <= 6) return (jm - 1) * 31 + jd;
    return 186 + (jm - 7) * 30 + jd;
}

const jalaliMonthNames = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];
const jalaliWeekdays = [
    'شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه',
];

// محاسبه روز هفته شمسی (با استفاده از یک مرجع معلوم)
function getJalaliWeekday(jy, jm, jd) {
    const g = jalaliToGregorian(jy, jm, jd);
    const d = new Date(g[0], g[1] - 1, g[2]);
    const gregDay = d.getDay(); // 0=Sun -> شنبه=0 در تقویم ما
    return gregDay; // 0=یکشنبه میلادی = شنبه شمسی
}

function jalaliToGregorian(jy, jm, jd) {
    const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    jy += 1595;
    let days =
        -355668 +
        jd +
        (jm <= 6 ? (jm - 1) * 31 : 186 + (jm - 7) * 30) +
        Math.floor(jy / 33) * 12053 +
        Math.floor((jy % 33) * 365.25);
    days = Math.round(days);
    const gy = 621 + Math.floor(days / 365);
    const gd = days - Math.floor((gy - 621) * 365.25) - Math.floor((gy - 617) / 4) + Math.floor((gy - 617) / 100) - Math.floor((gy - 617) / 400);
    let gm = 1;
    const g_dim = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0) g_dim[1] = 29;
    let tempGd = gd;
    for (let i = 0; i < 12; i++) {
        if (tempGd <= g_dim[i]) {
            gm = i + 1;
            break;
        }
        tempGd -= g_dim[i];
    }
    return [gy, gm, tempGd];
}

function getTodayJalali() {
    const today = new Date();
    return gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
}

function formatHour12(hour) {
    if (hour === 0) return '۱۲ ق.ظ';
    if (hour < 12) return hour + ' ق.ظ';
    if (hour === 12) return '۱۲ ب.ظ';
    return (hour - 12) + ' ب.ظ';
}

// ---------- مدیریت نام کاربر ----------
let userName = localStorage.getItem('planner_userName') || '';

// ---------- مدیریت داده‌ها ----------
let todos = JSON.parse(localStorage.getItem('planner_todos')) || [];
let schedules = JSON.parse(localStorage.getItem('planner_schedules')) || [];

function saveTodos() {
    localStorage.setItem('planner_todos', JSON.stringify(todos));
}

function saveSchedules() {
    localStorage.setItem('planner_schedules', JSON.stringify(schedules));
}

// ---------- رندرینگ ----------
function renderTodos() {
    const list = document.getElementById('todoList');
    const empty = document.getElementById('todoEmpty');
    const count = document.getElementById('todoCount');
    list.innerHTML = '';

    if (todos.length === 0) {
        empty.classList.remove('hidden');
        count.textContent = '۰ کار';
    } else {
        empty.classList.add('hidden');
        count.textContent = todos.length + ' کار';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            if (todo.done) li.classList.add('done');
            li.innerHTML = `
                <span class="item-text" data-index="${index}" data-type="todo">${todo.text}</span>
                <button class="item-delete" data-index="${index}" data-type="todo">🗑️</button>
            `;
            list.appendChild(li);
        });
    }
}

function renderSchedules() {
    const list = document.getElementById('scheduleList');
    const empty = document.getElementById('scheduleEmpty');
    const count = document.getElementById('scheduleCount');
    list.innerHTML = '';

    if (schedules.length === 0) {
        empty.classList.remove('hidden');
        count.textContent = '۰ برنامه';
    } else {
        empty.classList.add('hidden');
        count.textContent = schedules.length + ' برنامه';
        schedules.sort((a, b) => a.hour - b.hour);
        schedules.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="item-text" data-index="${index}" data-type="schedule">${item.text}</span>
                <span class="item-time-badge">${formatHour12(item.hour)}</span>
                <button class="item-delete" data-index="${index}" data-type="schedule">🗑️</button>
            `;
            list.appendChild(li);
        });
    }
}

function renderClocks() {
    const clockAM = document.getElementById('clockAM');
    const clockPM = document.getElementById('clockPM');
    clockAM.innerHTML = '<div class="clock-center"></div>';
    clockPM.innerHTML = '<div class="clock-center"></div>';

    const radius = 70; // برای ساعت‌های 170px
    const centerX = 85;
    const centerY = 85;

    // تعیین ساعت‌های پر (ساعت‌هایی که در لیست زمانبندی هستند)
    const busyHours = schedules.map(s => s.hour);
    // ساعت فعلی
    const now = new Date();
    const currentHour = now.getHours();

    for (let h = 0; h < 24; h++) {
        const angle = (h * 30 - 90) * (Math.PI / 180); // هر ساعت 30 درجه، شروع از 12 در بالا
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const label = (h % 12 === 0 ? 12 : h % 12).toString();

        const marker = document.createElement('div');
        marker.className = 'hour-marker';
        marker.textContent = label;
        marker.style.left = x + 'px';
        marker.style.top = y + 'px';

        if (busyHours.includes(h)) {
            marker.classList.add('busy');
        }
        if (h === currentHour) {
            marker.classList.add('current-hour');
        }

        if (h < 12) {
            clockAM.appendChild(marker);
        } else {
            clockPM.appendChild(marker);
        }
    }
}

// ---------- آپدیت تقویم و شعر ----------
function updateCalendarAndPoem() {
    const [jy, jm, jd] = getTodayJalali();
    const weekdayIndex = getJalaliWeekday(jy, jm, jd);
    const weekdayName = jalaliWeekdays[weekdayIndex];
    const monthName = jalaliMonthNames[jm - 1];

    document.getElementById('weekdayName').textContent = weekdayName;
    document.getElementById('jalaliDay').textContent = jd.toLocaleString('fa-IR');
    document.getElementById('jalaliMonth').textContent = monthName;
    document.getElementById('jalaliYear').textContent = jy.toLocaleString('fa-IR');

    // تاریخ میلادی
    const now = new Date();
    const gregMonthNames = ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'می', 'ژوئن', 'جولای', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
    const gregStr = now.getDate() + ' ' + gregMonthNames[now.getMonth()] + ' ' + now.getFullYear();
    document.getElementById('gregorianDate').textContent = gregStr;

    // شعر روز
    const dayOfYear = getDayOfYearJalali(jy, jm, jd);
    const poemIndex = (dayOfYear - 1) % poems.length;
    document.getElementById('poemText').textContent = poems[poemIndex];

    // فوتر تاریخ
    document.getElementById('footerDate').textContent = weekdayName + '، ' + jd + ' ' + monthName + ' ' + jy;
}

// ---------- ایونت‌ها ----------
function setupEvents() {
    // تب‌ها
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // افزودن تودو
    document.getElementById('addTodoBtn').addEventListener('click', () => {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        if (!text) return;
        todos.push({ text, done: false });
        saveTodos();
        renderTodos();
        input.value = '';
        input.focus();
    });

    document.getElementById('todoInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('addTodoBtn').click();
    });

    // افزودن زمانبندی
    document.getElementById('addScheduleBtn').addEventListener('click', () => {
        const input = document.getElementById('scheduleInput');
        const hourSelect = document.getElementById('scheduleHour');
        const text = input.value.trim();
        const hour = hourSelect.value;
        if (!text || hour === '') return;
        schedules.push({ text, hour: parseInt(hour) });
        saveSchedules();
        renderSchedules();
        renderClocks();
        input.value = '';
        hourSelect.value = '';
        input.focus();
    });

    document.getElementById('scheduleInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('addScheduleBtn').click();
    });

    // کلیک روی متن تودو (تغییر وضعیت done)
    document.getElementById('todoList').addEventListener('click', (e) => {
        if (e.target.classList.contains('item-text') && e.target.dataset.type === 'todo') {
            const index = parseInt(e.target.dataset.index);
            todos[index].done = !todos[index].done;
            saveTodos();
            renderTodos();
        }
    });

    // حذف آیتم‌ها
    document.getElementById('todoList').addEventListener('click', (e) => {
        if (e.target.classList.contains('item-delete') && e.target.dataset.type === 'todo') {
            const index = parseInt(e.target.dataset.index);
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        }
    });

    document.getElementById('scheduleList').addEventListener('click', (e) => {
        if (e.target.classList.contains('item-delete') && e.target.dataset.type === 'schedule') {
            const index = parseInt(e.target.dataset.index);
            schedules.splice(index, 1);
            saveSchedules();
            renderSchedules();
            renderClocks();
        }
    });

    // مودال ورود نام
    document.getElementById('saveNameBtn').addEventListener('click', () => {
        const nameInput = document.getElementById('nameInput');
        const name = nameInput.value.trim();
        if (!name) {
            nameInput.focus();
            return;
        }
        userName = name;
        localStorage.setItem('planner_userName', name);
        document.getElementById('welcomeModal').classList.add('hidden');
        updateUIWithName();
    });

    document.getElementById('nameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') document.getElementById('saveNameBtn').click();
    });
}

function updateUIWithName() {
    document.getElementById('userNameDisplay').textContent = userName;
    document.getElementById('footerName').textContent = userName;
    document.getElementById('greetingText').innerHTML = `صفحه‌ی برنامه‌ریزی <span id="userNameDisplay">${userName}</span>`;
}

// ---------- راه‌اندازی ----------
function init() {
    // اگر نام ذخیره شده نبود، مودال را نشان بده
    if (!userName) {
        document.getElementById('welcomeModal').classList.remove('hidden');
    } else {
        document.getElementById('welcomeModal').classList.add('hidden');
        updateUIWithName();
    }

    updateCalendarAndPoem();
    renderTodos();
    renderSchedules();
    renderClocks();
    setupEvents();

    // به‌روزرسانی ساعت‌ها هر دقیقه
    setInterval(renderClocks, 60000);

    // رجیستر سرویس ورکر
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker ثبت شد', reg))
            .catch(err => console.log('خطای Service Worker:', err));
    }
}

document.addEventListener('DOMContentLoaded', init);
