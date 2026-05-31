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

// ---------- مدیریت مودال ----------
function showWelcomeModal() {
    document.getElementById('welcomeModal').style.display = 'flex';
}
function hideWelcomeModal() {
    document.getElementById('welcomeModal').style.display = 'none';
}

// ---------- رندر برنامه‌ریز ----------
function renderTodos() {
    const list = document.getElementById('todoList');
    const count = document.getElementById('todoCount');
    const emptyMsg = document.getElementById('todoEmpty');
    list.innerHTML = '';
    if (todos.length === 0) {
        emptyMsg.style.display = 'block';
        count.textContent = '۰ کار';
        return;
    }
    emptyMsg.style.display = 'none';
    count.textContent = todos.length + ' کار';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'item' + (todo.done ? ' done' : '');
        li.innerHTML = `
            <span class="item-text">${todo.text}</span>
            <div class="item-actions">
                <button class="btn-done" data-index="${index}">${todo.done ? '↩' : '✔'}</button>
                <button class="btn-delete" data-index="${index}">🗑</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function renderSchedules() {
    const list = document.getElementById('scheduleList');
    const count = document.getElementById('scheduleCount');
    const emptyMsg = document.getElementById('scheduleEmpty');
    list.innerHTML = '';
    if (schedules.length === 0) {
        emptyMsg.style.display = 'block';
        count.textContent = '۰ برنامه';
        return;
    }
    emptyMsg.style.display = 'none';
    count.textContent = schedules.length + ' برنامه';
    schedules.forEach((sch, index) => {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
            <span class="item-text">${sch.text}</span>
            <span class="item-time">${formatTimeRange(sch.startH, sch.startM, sch.endH, sch.endM)}</span>
            <div class="item-actions">
                <button class="btn-delete" data-index="${index}">🗑</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// ---------- ساعت‌های نموداری (فقط نمایش اشغال، بدون عقربه) ----------
function getOccupiedHours() {
    const occupiedAM = new Set();
    const occupiedPM = new Set();
    schedules.forEach(sch => {
        let h = sch.startH;
        const endH = (sch.endM === 0) ? sch.endH : sch.endH + 1;
        while (h < endH) {
            if (h < 12) occupiedAM.add(h);
            else if (h < 24) occupiedPM.add(h - 12);
            h++;
        }
    });
    return { occupiedAM, occupiedPM };
}

function drawClockCanvas(canvasId, rangeStart, rangeEnd, occupiedHours) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2, r = Math.min(cx, cy) - 2;
    ctx.clearRect(0, 0, w, h);

    // دایره زمینه
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = '#fdf6ec';
    ctx.fill();
    ctx.strokeStyle = '#8b5e3c';
    ctx.lineWidth = 2;
    ctx.stroke();

    // ترسیم بخش‌های اشغال‌شده
    if (occupiedHours) {
        occupiedHours.forEach(hour => {
            const startAngle = ((hour * 30) - 105) * Math.PI / 180;
            const endAngle = ((hour * 30) - 75) * Math.PI / 180;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r - 2, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = 'rgba(192, 133, 82, 0.35)';
            ctx.fill();
            ctx.strokeStyle = '#b0855a';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }

    // تیک‌های ساعت (۱۲ عدد)
    for (let i = 0; i < 12; i++) {
        const angle = (i - 3) * Math.PI / 6;
        const outer = r - 4;
        const inner = r - 10;
        const x1 = cx + inner * Math.cos(angle);
        const y1 = cy + inner * Math.sin(angle);
        const x2 = cx + outer * Math.cos(angle);
        const y2 = cy + outer * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#5c3a21';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // نقطه مرکزی
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, 2 * Math.PI);
    ctx.fillStyle = '#3a2517';
    ctx.fill();
}

function renderClocks() {
    const { occupiedAM, occupiedPM } = getOccupiedHours();
    drawClockCanvas('clockAMCanvas', 0, 12, occupiedAM);
    drawClockCanvas('clockPMCanvas', 12, 24, occupiedPM);
}

// ---------- کرونومتر ----------
let stopwatchInterval = null;
let stopwatchMillis = 0;
let stopwatchRunning = false;

function formatStopwatch(ms) {
    const sec = Math.floor(ms / 1000) % 60;
    const min = Math.floor(ms / 60000) % 60;
    const hr = Math.floor(ms / 3600000);
    return `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function updateStopwatchDisplay() {
    document.getElementById('stopwatchDisplay').textContent = formatStopwatch(stopwatchMillis);
}

let laps = [];

function startStopwatch() {
    if (stopwatchRunning) return;
    stopwatchRunning = true;
    stopwatchInterval = setInterval(() => {
        stopwatchMillis += 100;
        updateStopwatchDisplay();
    }, 100);
    document.getElementById('stopwatchStartBtn').disabled = true;
    document.getElementById('stopwatchPauseBtn').disabled = false;
    document.getElementById('stopwatchLapBtn').disabled = false;
}

function pauseStopwatch() {
    if (!stopwatchRunning) return;
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    document.getElementById('stopwatchStartBtn').disabled = false;
    document.getElementById('stopwatchPauseBtn').disabled = true;
    document.getElementById('stopwatchLapBtn').disabled = true;
}

function resetStopwatch() {
    pauseStopwatch();
    stopwatchMillis = 0;
    laps = [];
    updateStopwatchDisplay();
    renderLaps();
}

function lapStopwatch() {
    if (!stopwatchRunning) return;
    laps.push(stopwatchMillis);
    renderLaps();
}

function renderLaps() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';
    laps.forEach((ms, i) => {
        const li = document.createElement('li');
        li.textContent = `دور ${i + 1}: ${formatStopwatch(ms)}`;
        lapList.appendChild(li);
    });
}

// ---------- پومودورو ----------
let pomodoroInterval = null;
let pomodoroSeconds = 0;
let pomodoroPhase = 'work';
let pomodoroRunning = false;
let workParts = 4;
let workMinutes = 25;
let breakMinutes = 5;
let currentPart = 0;

function readPomodoroSettings() {
    workMinutes = parseInt(document.getElementById('workMinutes').value) || 25;
    breakMinutes = parseInt(document.getElementById('breakMinutes').value) || 5;
    workParts = parseInt(document.getElementById('workParts').value) || 4;
}

function updatePomodoroDisplay() {
    const min = Math.floor(pomodoroSeconds / 60);
    const sec = pomodoroSeconds % 60;
    document.getElementById('pomodoroTimer').textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function updatePomodoroProgress() {
    document.getElementById('pomodoroProgress').textContent = `پارت ${currentPart} از ${workParts}`;
}

function setPomodoroPhase(phase) {
    pomodoroPhase = phase;
    document.getElementById('pomodoroPhase').textContent = phase === 'work' ? 'کار' : 'استراحت';
    if (phase === 'work') {
        pomodoroSeconds = workMinutes * 60;
    } else {
        pomodoroSeconds = breakMinutes * 60;
    }
    updatePomodoroDisplay();
}

function startPomodoro() {
    if (pomodoroRunning) return;
    readPomodoroSettings();
    if (!pomodoroPhase || (pomodoroPhase !== 'work' && pomodoroPhase !== 'break')) {
        currentPart = 0;
        setPomodoroPhase('work');
    }
    pomodoroRunning = true;
    document.getElementById('pomodoroStartBtn').disabled = true;
    document.getElementById('pomodoroPauseBtn').disabled = false;
    pomodoroInterval = setInterval(() => {
        if (pomodoroSeconds <= 0) {
            if (pomodoroPhase === 'work') {
                currentPart++;
                updatePomodoroProgress();
                if (currentPart >= workParts) {
                    clearInterval(pomodoroInterval);
                    pomodoroRunning = false;
                    document.getElementById('pomodoroStartBtn').disabled = false;
                    document.getElementById('pomodoroPauseBtn').disabled = true;
                    setPomodoroPhase('break');
                    currentPart = 0;
                    updatePomodoroProgress();
                    return;
                }
                setPomodoroPhase('break');
            } else {
                setPomodoroPhase('work');
            }
        }
        pomodoroSeconds--;
        updatePomodoroDisplay();
    }, 1000);
}

function pausePomodoro() {
    if (!pomodoroRunning) return;
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    document.getElementById('pomodoroStartBtn').disabled = false;
    document.getElementById('pomodoroPauseBtn').disabled = true;
}

function resetPomodoro() {
    clearInterval(pomodoroInterval);
    pomodoroRunning = false;
    currentPart = 0;
    setPomodoroPhase('work');
    updatePomodoroProgress();
    document.getElementById('pomodoroStartBtn').disabled = false;
    document.getElementById('pomodoroPauseBtn').disabled = true;
}

// ---------- ناوبری ----------
function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.island-btn').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.island-btn[data-page="${pageId}"]`);
    if (btn) btn.classList.add('active');
}

// ==================== بخش نوتیفیکیشن ====================
let notificationsEnabled = false;
const notifiedToday = new Set();

function requestNotificationPermission() {
    if (!('Notification' in window)) {
        return;
    }
    if (Notification.permission === 'granted') {
        notificationsEnabled = true;
    } else if (Notification.permission === 'default') {
        Notification.requestPermission().then(perm => {
            notificationsEnabled = (perm === 'granted');
        });
    }
}

function resetNotificationsIfNewDay() {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem('planner_notify_reset');
    if (lastReset !== today) {
        notifiedToday.clear();
        localStorage.setItem('planner_notify_reset', today);
    }
}

function checkScheduleNotifications() {
    if (!notificationsEnabled) return;
    resetNotificationsIfNewDay();

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    schedules.forEach((sch, index) => {
        if (sch.startH === currentHour && sch.startM === currentMinute) {
            const key = `schedule-${index}`;
            if (!notifiedToday.has(key)) {
                const bodyMsg = `⏰ ${sch.text} از ${formatTime12(sch.startH, sch.startM)} تا ${formatTime12(sch.endH, sch.endM)}`;
                if (Notification.permission === 'granted') {
                    new Notification('برنامه‌ریز شخصی', {
                        body: bodyMsg,
                        icon: 'icon-192.png',
                        tag: key,
                        requireInteraction: true,
                    });
                }
                notifiedToday.add(key);
            }
        }
    });
}

// ---------- رویدادها ----------
function setupEvents() {
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
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
        updateCalendarAndPoem();
        renderClocks();
    });

    document.getElementById('nameInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') document.getElementById('saveNameBtn').click();
    });

    document.getElementById('addTodoBtn').addEventListener('click', () => {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        if (!text) return;
        todos.push({ text, done: false });
        saveTodos();
        input.value = '';
        renderTodos();
    });
    document.getElementById('todoInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') document.getElementById('addTodoBtn').click();
    });

    document.getElementById('todoList').addEventListener('click', e => {
        const index = e.target.dataset.index;
        if (index === undefined) return;
        const idx = parseInt(index);
        if (e.target.classList.contains('btn-done')) {
            todos[idx].done = !todos[idx].done;
            saveTodos();
            renderTodos();
        } else if (e.target.classList.contains('btn-delete')) {
            todos.splice(idx, 1);
            saveTodos();
            renderTodos();
        }
    });

    document.getElementById('addScheduleBtn').addEventListener('click', () => {
        const textInput = document.getElementById('scheduleInput');
        const startInput = document.getElementById('scheduleStart');
        const endInput = document.getElementById('scheduleEnd');
        const text = textInput.value.trim();
        const startVal = startInput.value;
        const endVal = endInput.value;
        if (!text || !startVal || !endVal) return;
        const [sh, sm] = startVal.split(':').map(Number);
        const [eh, em] = endVal.split(':').map(Number);
        schedules.push({ text, startH: sh, startM: sm, endH: eh, endM: em });
        saveSchedules();
        textInput.value = '';
        startInput.value = '';
        endInput.value = '';
        renderSchedules();
        renderClocks();
    });

    document.getElementById('scheduleList').addEventListener('click', e => {
        if (e.target.classList.contains('btn-delete')) {
            const index = parseInt(e.target.dataset.index);
            schedules.splice(index, 1);
            saveSchedules();
            renderSchedules();
            renderClocks();
        }
    });

    document.querySelectorAll('.island-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            switchPage(page);
        });
    });

    document.getElementById('stopwatchStartBtn').addEventListener('click', startStopwatch);
    document.getElementById('stopwatchPauseBtn').addEventListener('click', pauseStopwatch);
    document.getElementById('stopwatchResetBtn').addEventListener('click', resetStopwatch);
    document.getElementById('stopwatchLapBtn').addEventListener('click', lapStopwatch);

    document.getElementById('pomodoroStartBtn').addEventListener('click', startPomodoro);
    document.getElementById('pomodoroPauseBtn').addEventListener('click', pausePomodoro);
    document.getElementById('pomodoroResetBtn').addEventListener('click', resetPomodoro);

    requestNotificationPermission();
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

    setInterval(checkScheduleNotifications, 15000);
    setInterval(renderClocks, 60000);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js');
    }
}

document.addEventListener('DOMContentLoaded', init);
