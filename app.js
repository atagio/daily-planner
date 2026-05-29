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

function getJalaliWeekday(jy, jm, jd) {
    const g = jalaliToGregorian(jy, jm, jd);
    const d = new Date(g[0], g[1] - 1, g[2]);
    return d.getDay(); // 0=Sun -> شنبه
}

function jalaliToGregorian(jy, jm, jd) {
    jy += 1595;
    let days =
        -355668 +
        jd +
        (jm <= 6 ? (jm - 1) * 31 : 186 + (jm - 7) * 30) +
        Math.floor(jy / 33) * 12053 +
        Math.floor((jy % 33) * 365.25);
    days = Math.round(days);
    const gy = 621 + Math.floor(days / 365);
    let gd = days - Math.floor((gy - 621) * 365.25) - Math.floor((gy - 617) / 4) + Math.floor((gy - 617) / 100) - Math.floor((gy - 617) / 400);
    const g_dim = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0) g_dim[1] = 29;
    let gm = 1;
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

// فرمت ساعت به صورت ۱۲ ساعته
function formatTime12(hour, minute) {
    const h = hour % 12 || 12;
    const period = hour < 12 ? 'ق.ظ' : 'ب.ظ';
    return `${h}:${minute.toString().padStart(2, '0')} ${period}`;
}

function formatTimeRange(startH, startM, endH, endM) {
    return `${formatTime12(startH, startM)} - ${formatTime12(endH, endM)}`;
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
        count.textContent = `${todos.length} کار`;
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
        count.textContent = `${schedules.length} برنامه`;
        // مرتب‌سازی بر اساس زمان شروع
        schedules.sort((a, b) => {
            if (a.startHour !== b.startHour) return a.startHour - b.startHour;
            return a.startMinute - b.startMinute;
        });
        schedules.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="item-text">${item.text}</span>
                <span class="item-time-badge">${formatTimeRange(item.startHour, item.startMinute, item.endHour, item.endMinute)}</span>
                <button class="item-delete" data-index="${index}" data-type="schedule">🗑️</button>
            `;
            list.appendChild(li);
        });
    }
}

// رسم ساعت‌های نموداری با Canvas
function renderClocks() {
    drawClockCanvas('clockAMCanvas', 0, 12);   // قبل از ظهر
    drawClockCanvas('clockPMCanvas', 12, 24); // بعد از ظهر
}

function drawClockCanvas(canvasId, rangeStart, rangeEnd) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 12; // کمی فاصله از لبه

    ctx.clearRect(0, 0, width, height);

    // رسم دایره‌ی پس‌زمینه شفاف (اختیاری)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fdf8f1';
    ctx.fill();
    ctx.strokeStyle = '#e8c9a0';
    ctx.lineWidth = 2;
    ctx.stroke();

    // رسم خطوط ساعت (اختیاری)
    ctx.strokeStyle = '#e8d5c0';
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
        const angle = (i * 30 - 90) * Math.PI / 180;
        const innerX = centerX + (radius - 10) * Math.cos(angle);
        const innerY = centerY + (radius - 10) * Math.sin(angle);
        const outerX = centerX + radius * Math.cos(angle);
        const outerY = centerY + radius * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
        ctx.stroke();
    }

    // نوشتن اعداد ساعت
    ctx.fillStyle = '#6b5a4a';
    ctx.font = 'bold 10px Vazirmatn, Tahoma';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < 12; i++) {
        const hour = (i === 0 ? 12 : i); // 12 به جای 0
        const angle = (i * 30 - 90) * Math.PI / 180;
        const x = centerX + (radius - 18) * Math.cos(angle);
        const y = centerY + (radius - 18) * Math.sin(angle);
        ctx.fillText(hour.toString(), x, y);
    }

    // رسم بازه‌های مشغول
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    schedules.forEach(item => {
        const startDecimal = item.startHour + item.startMinute / 60;
        const endDecimal = item.endHour + item.endMinute / 60;
        if (endDecimal <= startDecimal) return; // بازه نامعتبر

        // بررسی هم‌پوشانی با بازه‌ی این ساعت (rangeStart تا rangeEnd)
        if (endDecimal <= rangeStart || startDecimal >= rangeEnd) return;

        const clampedStart = Math.max(startDecimal, rangeStart);
        const clampedEnd = Math.min(endDecimal, rangeEnd);

        // تبدیل به زاویه (۰ درجه = بالای ساعت، جهت عقربه‌های ساعت)
        const startAngle = ((clampedStart - rangeStart) / 12) * 2 * Math.PI - Math.PI / 2;
        const endAngle = ((clampedEnd - rangeStart) / 12) * 2 * Math.PI - Math.PI / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 6, startAngle, endAngle);
        ctx.lineWidth = 18;
        ctx.strokeStyle = 'rgba(192, 133, 82, 0.4)';
        ctx.stroke();

        // خطوط مرز بازه
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 6, startAngle, startAngle);
        ctx.lineWidth = 18;
        ctx.strokeStyle = '#c08552';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 6, endAngle, endAngle);
        ctx.stroke();
    });

    // علامت‌گذاری ساعت جاری (اگر در این بازه باشد)
    if (currentHour >= rangeStart && currentHour < rangeEnd) {
        const hourInRange = currentHour - rangeStart;
        const minuteFraction = currentMinute / 60;
        const currentAngle = ((hourInRange + minuteFraction) / 12) * 2 * Math.PI - Math.PI / 2;

        // یک نقطه یا عقربه کوچک
        const indicatorX = centerX + (radius - 15) * Math.cos(currentAngle);
        const indicatorY = centerY + (radius - 15) * Math.sin(currentAngle);
        ctx.beginPath();
        ctx.arc(indicatorX, indicatorY, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#8b5a3c';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // خط از مرکز
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(indicatorX, indicatorY);
        ctx.strokeStyle = '#8b5a3c';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// ---------- پر کردن انتخابگرهای زمان (نیم‌ساعته) ----------
function populateTimeSelects() {
    const startSelect = document.getElementById('scheduleStart');
    const endSelect = document.getElementById('scheduleEnd');
    if (!startSelect || !endSelect) return;

    const options = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 30) {
            const value = `${h}:${m.toString().padStart(2, '0')}`;
            const label = formatTime12(h, m);
            options.push({ value, label });
        }
    }

    startSelect.innerHTML = '';
    endSelect.innerHTML = '';
    options.forEach(opt => {
        const optionEl = document.createElement('option');
        optionEl.value = opt.value;
        optionEl.textContent = opt.label;
        startSelect.appendChild(optionEl.cloneNode(true));
        endSelect.appendChild(optionEl);
    });
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
        const startVal = document.getElementById('scheduleStart').value;
        const endVal = document.getElementById('scheduleEnd').value;
        const text = input.value.trim();
        if (!text || !startVal || !endVal) return;

        const [startHour, startMinute] = startVal.split(':').map(Number);
        const [endHour, endMinute] = endVal.split(':').map(Number);

        const startDecimal = startHour + startMinute / 60;
        const endDecimal = endHour + endMinute / 60;
        if (endDecimal <= startDecimal) {
            alert('زمان پایان باید بعد از زمان شروع باشد.');
            return;
        }

        schedules.push({
            text,
            startHour,
            startMinute,
            endHour,
            endMinute
        });
        saveSchedules();
        renderSchedules();
        renderClocks();
        input.value = '';
        document.getElementById('scheduleStart').value = '';
        document.getElementById('scheduleEnd').value = '';
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

    const now = new Date();
    const gregMonthNames = ['ژانویه', 'فوریه', 'مارس', 'آوریل', 'می', 'ژوئن', 'جولای', 'اوت', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
    const gregStr = now.getDate() + ' ' + gregMonthNames[now.getMonth()] + ' ' + now.getFullYear();
    document.getElementById('gregorianDate').textContent = gregStr;

    const dayOfYear = getDayOfYearJalali(jy, jm, jd);
    const poemIndex = (dayOfYear - 1) % poems.length;
    document.getElementById('poemText').textContent = poems[poemIndex];

    document.getElementById('footerDate').textContent = weekdayName + '، ' + jd + ' ' + monthName + ' ' + jy;
}

// ---------- راه‌اندازی ----------
function init() {
    populateTimeSelects();

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

    setInterval(renderClocks, 60000);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(reg => console.log('Service Worker ثبت شد', reg))
            .catch(err => console.log('خطای Service Worker:', err));
    }
}

document.addEventListener('DOMContentLoaded', init);
