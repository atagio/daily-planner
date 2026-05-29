(function () {
    'use strict';

    // ====== DOM ======
    const persianDateEl = document.getElementById('persianDate');
    const weekdayEl = document.getElementById('weekday');
    const userGreeting = document.getElementById('userGreeting');
    const themeToggle = document.getElementById('themeToggle');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const todoListEl = document.getElementById('todoList');
    const scheduleListEl = document.getElementById('scheduleList');
    const taskInput = document.getElementById('taskInput');
    const timeSelects = document.getElementById('timeSelects');
    const hourSelect = document.getElementById('hourSelect');
    const minuteSelect = document.getElementById('minuteSelect');
    const ampmSelect = document.getElementById('ampmSelect');
    const addBtn = document.getElementById('addBtn');
    const occupiedTimesEl = document.getElementById('occupiedTimes');
    const timeChipsEl = document.getElementById('timeChips');

    // ====== ورود نام ======
    const nameOverlay = document.getElementById('nameOverlay');
    const appContainer = document.getElementById('appContainer');
    const nameInput = document.getElementById('nameInput');
    const enterBtn = document.getElementById('enterBtn');

    let userName = localStorage.getItem('userName') || '';
    if (userName) {
        nameOverlay.classList.add('hidden');
        appContainer.classList.add('visible');
        showGreeting();
    }

    function enterApp() {
        userName = nameInput.value.trim();
        if (!userName) return;
        localStorage.setItem('userName', userName);
        nameOverlay.classList.add('hidden');
        appContainer.classList.add('visible');
        showGreeting();
    }

    enterBtn.addEventListener('click', enterApp);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enterApp();
    });

    function showGreeting() {
        userGreeting.textContent = `📋 صفحه‌ی برنامه‌ریزی ${userName}`;
    }

    // ====== تاریخ شمسی ======
    function updateDate() {
        if (typeof moment !== 'undefined') {
            persianDateEl.textContent = moment().format('jYYYY/jMM/jDD');
            weekdayEl.textContent = moment().format('dddd');
        }
    }
    updateDate();
    setInterval(updateDate, 60000);

    // ====== تم ======
    function loadTheme() {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (saved === 'dark' || (!saved && prefersDark)) {
            document.body.classList.add('dark');
            themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('dark');
            themeToggle.textContent = '🌙';
        }
    }
    loadTheme();
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // ====== تب‌ها ======
    let currentTab = 'todo';
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.dataset.tab;
            // نمایش/مخفی کردن لیست‌ها
            todoListEl.classList.toggle('active', currentTab === 'todo');
            scheduleListEl.classList.toggle('active', currentTab === 'schedule');
            // زمان فقط برای اسکجول
            timeSelects.style.display = currentTab === 'schedule' ? 'flex' : 'none';
            occupiedTimesEl.style.display = currentTab === 'schedule' ? 'block' : 'none';
            renderTasks();
        });
    });

    // ====== وظایف ======
    let tasks = JSON.parse(localStorage.getItem('cozyTasks')) || [];

    function saveTasks() {
        localStorage.setItem('cozyTasks', JSON.stringify(tasks));
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;
        let timeStr = null;
        if (currentTab === 'schedule') {
            const hour = hourSelect.value;
            const minute = minuteSelect.value;
            const ampm = ampmSelect.value;
            if (!hour) {
                alert('لطفاً ساعت را انتخاب کن.');
                return;
            }
            timeStr = `${hour}:${minute} ${ampm}`; // مثال: "9:15 صبح"
        }
        const type = currentTab === 'schedule' ? 'schedule' : 'todo';
        const newTask = {
            id: Date.now(),
            text,
            time: timeStr,
            type,
            done: false
        };
        tasks.push(newTask);
        saveTasks();
        taskInput.value = '';
        if (currentTab === 'schedule') {
            hourSelect.value = '';
            minuteSelect.value = '00';
            ampmSelect.value = 'صبح';
        }
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }

    function toggleTaskDone(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        }
    }

    // ====== مرتب‌سازی و فیلتر ======
    function getTodoTasks() {
        return tasks.filter(t => t.type === 'todo');
    }

    function getScheduleTasksSorted() {
        const ampmOrder = { 'صبح': 0, 'بعدازظهر': 1 };
        return tasks.filter(t => t.type === 'schedule' && t.time)
            .sort((a, b) => {
                const [aHour, aRest] = a.time.split(':');
                const [aMin, aAmPm] = aRest.split(' ');
                const [bHour, bRest] = b.time.split(':');
                const [bMin, bAmPm] = bRest.split(' ');
                const aTotal = (ampmOrder[aAmPm] || 0) * 60 * 12 + (parseInt(aHour) % 12) * 60 + parseInt(aMin);
                const bTotal = (ampmOrder[bAmPm] || 0) * 60 * 12 + (parseInt(bHour) % 12) * 60 + parseInt(bMin);
                return aTotal - bTotal;
            });
    }

    // ====== رندر ======
    function renderTasks() {
        todoListEl.innerHTML = '';
        scheduleListEl.innerHTML = '';
        if (currentTab === 'todo') {
            const items = getTodoTasks();
            if (items.length === 0) {
                todoListEl.innerHTML = '<div class="empty-message">هنوز کاری ثبت نشده 🌱</div>';
            } else {
                items.forEach(task => createTaskElement(task, todoListEl));
            }
        } else {
            const items = getScheduleTasksSorted();
            if (items.length === 0) {
                scheduleListEl.innerHTML = '<div class="empty-message">برنامه‌ای زمان‌بندی نشده 🌙</div>';
            } else {
                items.forEach(task => createTaskElement(task, scheduleListEl));
            }
            renderOccupiedTimes(items);
        }
    }

    function createTaskElement(task, container) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'task-item';
        itemDiv.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''}>
            <span class="task-text ${task.done ? 'done' : ''}">${escapeHtml(task.text)}</span>
            ${task.time ? `<span class="task-time">${task.time}</span>` : ''}
            <button class="delete-btn" aria-label="حذف">🗑️</button>
        `;
        itemDiv.querySelector('.task-checkbox').addEventListener('change', () => toggleTaskDone(task.id));
        itemDiv.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        });
        container.appendChild(itemDiv);
    }

    function renderOccupiedTimes(scheduleTasks) {
        timeChipsEl.innerHTML = '';
        if (scheduleTasks.length === 0) {
            timeChipsEl.innerHTML = '<span class="time-chip empty-chip">امروز هنوز برنامه‌ای نداری ✨</span>';
            return;
        }
        scheduleTasks.forEach(t => {
            if (t.time) {
                const chip = document.createElement('span');
                chip.className = 'time-chip';
                chip.textContent = t.time;
                timeChipsEl.appendChild(chip);
            }
        });
    }

    function escapeHtml(s) {
        return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
    }

    // ====== رویدادها ======
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // حالت اولیه
    timeSelects.style.display = 'none';
    occupiedTimesEl.style.display = 'none';
    renderTasks();

    // ====== Service Worker ======
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js')
                .then(reg => console.log('SW registered'))
                .catch(err => console.log('SW fail', err));
        });
    }
})();
