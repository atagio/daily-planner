// =============================================
// app.js - منطق برنامه Todo و Schedule
// =============================================

(function () {
  'use strict';

  // ---------- عناصر DOM ----------
  const persianDateEl = document.getElementById('persianDate');
  const weekdayEl = document.getElementById('weekday');
  const themeToggle = document.getElementById('themeToggle');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const todoListEl = document.getElementById('todoList');
  const scheduleListEl = document.getElementById('scheduleList');
  const taskInput = document.getElementById('taskInput');
  const taskTime = document.getElementById('taskTime');
  const addBtn = document.getElementById('addBtn');

  // ---------- وضعیت برنامه ----------
  let tasks = JSON.parse(localStorage.getItem('cozyTasks')) || [];
  let currentTab = 'todo'; // 'todo' یا 'schedule'

  // ---------- تاریخ شمسی ----------
  function updateDate() {
    if (typeof moment === 'undefined') return; // اطمینان از لود کتابخانه
    const now = moment();
    persianDateEl.textContent = now.format('jYYYY/jMM/jDD');
    weekdayEl.textContent = now.format('dddd'); // شنبه، یکشنبه...
  }

  // بروزرسانی اولیه و هر ۶۰ ثانیه
  updateDate();
  setInterval(updateDate, 60000);

  // ---------- تم تاریک / روشن ----------
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

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  loadTheme();

  // ---------- تب‌ها ----------
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTab = btn.dataset.tab;
      // نمایش/مخفی کردن لیست مربوطه
      if (currentTab === 'todo') {
        todoListEl.classList.add('active');
        scheduleListEl.classList.remove('active');
      } else {
        scheduleListEl.classList.add('active');
        todoListEl.classList.remove('active');
      }
      renderTasks();
    });
  });

  // ---------- عملیات روی وظایف ----------
  function saveTasks() {
    localStorage.setItem('cozyTasks', JSON.stringify(tasks));
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const time = taskTime.value; // فرمت "HH:MM"
    // اگر در تب Schedule باشیم و ساعت وارد شده باشد → نوع schedule
    // در غیر اینصورت → todo
    const type = (currentTab === 'schedule' && time) ? 'schedule' : 'todo';

    const newTask = {
      id: Date.now(),
      text,
      time: time || null,
      type,
      done: false
    };

    tasks.push(newTask);
    saveTasks();

    // پاکسازی ورودی‌ها
    taskInput.value = '';
    taskTime.value = '';
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

  // ---------- دریافت و مرتب‌سازی وظایف ----------
  function getTodoTasks() {
    return tasks.filter(t => t.type === 'todo');
  }

  function getSortedScheduleTasks() {
    return tasks
      .filter(t => t.type === 'schedule' && t.time)
      .sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  }

  // ---------- رندر لیست ----------
  function renderTasks() {
    // خالی کردن لیست‌ها
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
      const items = getSortedScheduleTasks();
      if (items.length === 0) {
        scheduleListEl.innerHTML = '<div class="empty-message">برنامه‌ای زمان‌بندی نشده 🌙</div>';
      } else {
        items.forEach(task => createTaskElement(task, scheduleListEl));
      }
    }
  }

  // ساخت یک آیتم در DOM
  function createTaskElement(task, container) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'task-item';

    // HTML درون آیتم
    itemDiv.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''}>
      <span class="task-text ${task.done ? 'done' : ''}">${escapeHtml(task.text)}</span>
      ${task.time ? `<span class="task-time">${task.time}</span>` : ''}
      <button class="delete-btn" aria-label="حذف">🗑️</button>
    `;

    // رویداد تیک زدن
    const checkbox = itemDiv.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => toggleTaskDone(task.id));

    // رویداد حذف
    const deleteBtn = itemDiv.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });

    container.appendChild(itemDiv);
  }

  // escape کردن HTML (جلوگیری از XSS)
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ---------- رویدادهای فرم ----------
  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // رندر اولیه
  renderTasks();

  // ---------- ثبت Service Worker (برای PWA) ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('service-worker.js')
        .then(reg => console.log('Service Worker registered:', reg.scope))
        .catch(err => console.log('SW registration failed:', err));
    });
  }
})();