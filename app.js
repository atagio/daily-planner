// ===== app.js (نسخه قطعی) =====

// ---------- اشعار ۳۰ روزه ----------
const poems = [ /* همان ۳۰ شعر قبلی */ ];

// ---------- ابزار تاریخ ----------
function gregorianToJalali(gy, gm, gd) { /* کد بدون تغییر */ }
function getDayOfYearJalali(jy, jm, jd) { /* ... */ }
const jalaliMonthNames = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const jalaliWeekdays = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];

function jalaliToGregorian(jy, jm, jd) { /* ... */ }
function getJalaliWeekday(jy,jm,jd){ /* ... */ }
function getTodayJalali(){ /* ... */ }

function formatTime12(h,m){ /* ... */ }
function formatTimeRange(sh,sm,eh,em){ /* ... */ }

// ---------- نام کاربر ----------
let userName = localStorage.getItem('planner_userName')||'';

// ---------- داده‌ها ----------
let todos = JSON.parse(localStorage.getItem('planner_todos'))||[];
let schedules = JSON.parse(localStorage.getItem('planner_schedules'))||[];
function saveTodos(){ /* ... */ }
function saveSchedules(){ /* ... */ }

// ---------- دارک مود ----------
function applyDarkMode(isDark) { /* ... */ }
function toggleDarkMode() { /* ... */ }

// ---------- مدیریت مودال (فقط style.display) ----------
function showWelcomeModal() {
    document.getElementById('welcomeModal').style.display = 'flex';
}
function hideWelcomeModal() {
    document.getElementById('welcomeModal').style.display = 'none';
}

// ---------- رندر برنامه‌ریز ----------
function renderTodos(){ /* همان کد */ }
function renderSchedules(){ /* همان کد */ }
function renderClocks(){ /* همان کد */ }
function drawClockCanvas(canvasId, rangeStart, rangeEnd){ /* همان کد */ }

// ---------- کرونومتر ----------
// ... (تمام توابع کرونومتر بدون تغییر)
let stopwatchInterval=null, stopwatchStartTime=0, stopwatchElapsed=0, lapTimes=[];
function updateStopwatchDisplay(){ /* ... */ }
function startStopwatch(){ /* ... */ }
function pauseStopwatch(){ /* ... */ }
function resetStopwatch(){ /* ... */ }
function lapStopwatch(){ /* ... */ }
function renderLaps(){ /* ... */ }

// ---------- پومودورو ----------
// ... (تمام توابع پومودورو بدون تغییر)
let pomodoroInterval=null, pomodoroTimeLeft=0, pomodoroPhase='idle', pomodoroSettings={work:25,break:5,parts:4};
let pomodoroCurrentPart=0;
function updatePomodoroDisplay(){ /* ... */ }
function startPomodoro(){ /* ... */ }
function pomodoroTick(){ /* ... */ }
function pausePomodoro(){ /* ... */ }
function resetPomodoro(){ /* ... */ }

// ---------- ناوبری ----------
function switchPage(pageId){ /* ... */ }

// ---------- رویدادها ----------
function setupEvents() {
    // جزیره و دارک مود و تودو و زمانبندی و کرونومتر و پومودورو مثل قبل...

    // مودال نام (تضمینی)
    document.getElementById('saveNameBtn').addEventListener('click', ()=>{
        const nameInput = document.getElementById('nameInput');
        const name = nameInput.value.trim();
        const errorEl = document.getElementById('nameError');

        if (!name) {
            errorEl.textContent = 'لطفاً یک اسم وارد کن 🌱';
            nameInput.focus();
            return; // مودال بسته نمی‌شود
        }

        errorEl.textContent = '';
        userName = name;
        localStorage.setItem('planner_userName', name);
        hideWelcomeModal(); // فقط در صورت موفقیت بسته می‌شود
        updateUIWithName();
    });

    document.getElementById('nameInput').addEventListener('keypress', e => {
        if (e.key === 'Enter') document.getElementById('saveNameBtn').click();
    });
}

function updateUIWithName(){ /* ... */ }

// ---------- تقویم و شعر ----------
function updateCalendarAndPoem(){ /* ... */ }

// ---------- راه‌اندازی ----------
function init() {
    const savedDark = localStorage.getItem('planner_darkMode') === 'true';
    applyDarkMode(savedDark);

    // اگر نام از قبل ذخیره شده، مودال را مخفی کن
    if (userName) {
        hideWelcomeModal();
        updateUIWithName();
    } else {
        showWelcomeModal();
    }

    updateCalendarAndPoem();
    renderTodos(); renderSchedules(); renderClocks();
    setupEvents();
    setInterval(renderClocks, 60000);
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
}
document.addEventListener('DOMContentLoaded', init);
