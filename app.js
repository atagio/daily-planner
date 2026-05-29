// لیست ۳۰ شعر انتخابی شما به ترتیب روز
const dailyPoems = [
    { text: "یوسف گمگشته بازآید به کنعان غم مخور / کلبه احزان شود روزی گلستان غم مخور", poet: "حافظ" },
    { text: "آسایش دو گیتی تفسیر این دو حرف است / با دوستان مروت با دشمنان مدارا", poet: "سعدی" },
    { text: "دوش وقت سحر از غصه نجاتم دادند / و اندر آن ظلمت شب آب حیاتم دادند", poet: "حافظ" },
    { text: "بیا که قصر امل سخت سست بنیاد است / به باده فکر بنا کن که برقرار بوَد", poet: "حافظ" },
    { text: "مژده‌ای دل که دگر باد صبا بازآمد / هدهد صبح خوش‌آواز شکرپرداز آمد", poet: "حافظ" },
    { text: "روز هجران و شب فرقت یار آخر شد / زدم این فال و گذشت اختر و کار آخر شد", poet: "حافظ" },
    { text: "بوی بهبود ز اوضاع جهان می‌شنوم / شادی از بخت بداندیش نهان می‌شنوم", poet: "سعدی" },
    { text: "به جهان خرم از آنم که جهان خرم از اوست / عاشقم بر همه عالم که همه عالم از اوست", poet: "سعدی" },
    { text: "دلا بسوز که سوز تو کارها بکند / نیاز نیم‌شبی دفع صد بلا بکند", poet: "حافظ" },
    { text: "عاقبت از ما غباری ماند و از خوبان خیال / خرم آنکس که در این عالم غبارش کمتر است", poet: "صائب" },
    { text: "ما در این در نه پی حشمت و جاه آمدیم / از بد حادثه اینجا به پناه آمدیم", poet: "حافظ" },
    { text: "بیا که نوبت صلح است و دوستی و صفا / که دوستی و محبت هزار بار نکوست", poet: "سعدی" },
    { text: "جهان و هر چه در او هست، سربه‌سر خوابی است / به کوشش از پی آرایش سراب نباش", poet: "بیدل" },
    { text: "غم مخور ای دل که گردون گر کند صد پی شکست / خم می شیشه باز آید به دست شیشه‌گر", poet: "بیدل" },
    { text: "درین چمن گل بی‌خار نیست، خوش باش / بهار اگرچه خزان دارد، خزان بهاری هم", poet: "بیدل" },
    { text: "حاصل ما از جهان جز حسرت و اندوه نیست / خوش که چندانی نماندیم و غباری می‌شویم", poet: "صائب" },
    { text: "نفس گره مزن از پیچ و تاب آینه‌ها / همین غبار که بستی، حجاب می‌شکند", poet: "بیدل" },
    { text: "دل چو از خویش تهی شد، همه عالم در اوست / قطره کز خود بگذرد، بحر صفت می‌گردد", poet: "بیدل" },
    { text: "دل شکسته ز غم اعتبار می‌گیرد / شکستن دل ما را به کار می‌آید", poet: "صائب" },
    { text: "به لب رسیده جانم، غم فراق تو بس نیست / هنوز امید دیدار در میان می‌باشد", poet: "سعدی" },
    { text: "دل اگر چه ز غم روزگار پر خون است / به امید گشایش، در غم فرو بسته مدار", poet: "کلیم" },
    { text: "چه غم ز موج حوادث، که کشتی شکسته‌ای / به ساحل نجات از لطف باری می‌رسد", poet: "بیدل" },
    { text: "چمن بی‌داغ خاطر نیست، شاد از آن مباش / که بلبل از گل خندان نصیبش خار می‌باشد", poet: "کلیم" },
    { text: "غم مخور از سختی ایام که این دیر سپنج / روزی از پیچ و خم غم گهر آسایش آرد", poet: "صائب" },
    { text: "جهان و هر چه در او هست، هیچ نیست ای دل / به هیچ در نگر و هیچ بر مخوان و مپیچ", poet: "بیدل" },
    { text: "دل از غم جهان شاد دار، که غم جای دگر دارد / تو را این یک نفس فرصت، غنیمت دان و می نوش", poet: "صائب" },
    { text: "خوش باش که در باغ جهان، یک دو نفس بیش / گل نیست که پژمرده خزان نشودش", poet: "صائب" },
    { text: "غم فردا مبر ای دل، که قضا روزی تو / بیش از آن است که در فکر تو آید، غم نیست", poet: "کلیم" },
    { text: "غم دنیا مخور ای دل که دنیا را وفا نیست / غم ما در دو عالم، همه باد است و هوا نیست", poet: "سعدی" },
    { text: "سحر شد جام می در گردش آمد / چراغ شام در خواب گران رفت", poet: "کلیم" }
];

// دیتای اپلیکیشن
let todos = JSON.parse(localStorage.getItem('cozy_todos')) || [];
let schedules = JSON.parse(localStorage.getItem('cozy_schedules')) || [];

// تبدیل اعداد انگلیسی به فارسی برای حس دنج‌تر
function toPersianNumber(num) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, x => farsiDigits[x]);
}

// اجرای کدها بعد از لود شدن کامل صفحه
document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupTabs();
    setupEventListeners();
    renderAll();
});

function initApp() {
    // ۱. مدیریت نام کاربر
    const userName = localStorage.getItem('cozy_user_name');
    const modal = document.getElementById('name-modal');
    const appContent = document.getElementById('app-content');

    if (!userName) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
        appContent.style.display = 'block';
        document.getElementById('greeting').textContent = `صفحه‌ی برنامه‌ریزی ${userName} ✨`;
    }

    // ۲. نمایش تاریخ شمسی بومی
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const todayJalali = new Intl.DateTimeFormat('fa-IR', options).format(new Date());
    document.getElementById('jalali-date').textContent = todayJalali;

    // ۳. سیستم مدیریت و تزریق شعر روزانه
    initDailyPoem();
}

function initDailyPoem() {
    let startDayStr = localStorage.getItem('cozy_start_date');
    if (!startDayStr) {
        startDayStr = new Date().toISOString().split('T')[0];
        localStorage.setItem('cozy_start_date', startDayStr);
    }

    const diffTime = Math.abs(new Date() - new Date(startDayStr));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const poemIndex = diffDays % 30; // چرخش بین ۳۰ شعر بعد از روز سی‌ام
    const todayPoem = dailyPoems[poemIndex];

    // ساخت المان شعر دنج و تزریق آن زیر هدر
    const header = document.querySelector('header');
    const poemDiv = document.createElement('div');
    poemDiv.className = 'cozy-card';
    poemDiv.style.margin = '15px 0 0 0';
    poemDiv.style.padding = '14px';
    poemDiv.style.fontStyle = 'italic';
    poemDiv.style.fontSize = '0.95rem';
    poemDiv.style.textAlign = 'center';
    poemDiv.style.lineHeight = '1.8';
    poemDiv.style.background = 'linear-gradient(to right, #fbf9f6, #f5eee6)';
    poemDiv.innerHTML = `« ${todayPoem.text} » <br> <span style="font-size: 0.8rem; color: #8e6c58; display:block; margin-top:5px; font-weight:bold;">— ${todayPoem.poet}</span>`;
    
    header.appendChild(poemDiv);
}

// مدیریت جابجایی بین تب‌ها
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
        });
    });
}

function setupEventListeners() {
    // دکمه ذخیره نام
    document.getElementById('save-name-btn').addEventListener('click', () => {
        const nameInput = document.getElementById('user-name-input').value.trim();
        if (nameInput) {
            localStorage.setItem('cozy_user_name', nameInput);
            document.getElementById('name-modal').style.display = 'none';
            document.getElementById('app-content').style.display = 'block';
            document.getElementById('greeting').textContent = `صفحه‌ی برنامه‌ریزی ${nameInput} ✨`;
        }
    });

    // افزودن To-Do
    document.getElementById('add-todo-btn').addEventListener('click', addTodo);
    document.getElementById('todo-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') addTodo(); });

    // افزودن Schedule
    document.getElementById('add-schedule-btn').addEventListener('click', addSchedule);
}

// افزودن تسک جدید به لیست کارها
function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (!text) return;

    todos.push({ id: Date.now(), text, completed: false });
    localStorage.setItem('cozy_todos', JSON.stringify(todos));
    input.value = '';
    renderAll();
}

// افزودن برنامه زمانی جدید
function addSchedule() {
    const titleInput = document.getElementById('schedule-input');
    const timeInput = document.getElementById('schedule-time');
    
    const title = titleInput.value.trim();
    const time = timeInput.value;

    if (!title || !time) return;

    schedules.push({ id: Date.now(), title, time });
    // مرتب‌سازی برنامه‌ها بر اساس ساعت فعلی
    schedules.sort((a, b) => a.time.localeCompare(b.time));
    
    localStorage.setItem('cozy_schedules', JSON.stringify(schedules));
    titleInput.value = '';
    timeInput.value = '';
    
    renderAll();
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    localStorage.setItem('cozy_todos', JSON.stringify(todos));
    renderAll();
}

function deleteSchedule(id) {
    schedules = schedules.filter(s => s.id !== id);
    localStorage.setItem('cozy_schedules', JSON.stringify(schedules));
    renderAll();
}

function toggleTodo(id) {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    localStorage.setItem('cozy_todos', JSON.stringify(todos));
    renderAll();
}

// رندر کردن همزمان تمام بخش‌ها و به‌روزرسانی ساعت‌ها
function renderAll() {
    renderTodoList();
    renderScheduleList();
    drawClocks();
}

function renderTodoList() {
    const listEl = document.getElementById('todo-list');
    listEl.innerHTML = '';

    if (todos.length === 0) {
        listEl.innerHTML = `<li class="todo-item" style="border:none; justify-content:center; color:#8a7a71; font-size:0.9rem;">لیست کارهای امروز خالیه ☕</li>`;
        return;
    }

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <span class="item-text">${todo.text}</span>
            <span class="delete-btn">✕</span>
        `;

        li.querySelector('.item-text').addEventListener('click', () => toggleTodo(todo.id));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(todo.id));
        
        listEl.appendChild(li);
    });
}

function renderScheduleList() {
    const listEl = document.getElementById('schedule-list');
    listEl.innerHTML = '';

    if (schedules.length === 0) {
        listEl.innerHTML = `<li style="border:none; justify-content:center; color:#8a7a71; font-size:0.9rem;">هنوز زمان‌بندی‌ای ثبت نکردی ⏱️</li>`;
        return;
    }

    schedules.forEach(item => {
        const li = document.createElement('li');
        
        // تبدیل زمان به فرمت فارسی شیک
        const timeParts = item.time.split(':');
        const formattedTime = toPersianNumber(`${timeParts[0]}:${timeParts[1]}`);

        li.innerHTML = `
            <span class="item-text"><strong>[${formattedTime}]</strong> ${item.title}</span>
            <span class="delete-btn">✕</span>
        `;

        li.querySelector('.delete-btn').addEventListener('click', () => deleteSchedule(item.id));
        listEl.appendChild(li);
    });
}

// رسم کردن ساعت‌های ۱۲ ساعته بصری (AM و PM)
function drawClocks() {
    const amClock = document.getElementById('am-clock');
    const pmClock = document.getElementById('pm-clock');
    
    amClock.innerHTML = '';
    pmClock.innerHTML = '';

    // مجموعه ساعت‌های پر شده بر اساس جدول زمان‌بندی
    const occupiedAM = new Set();
    const occupiedPM = new Set();

    schedules.forEach(item => {
        const hour = parseInt(item.time.split(':')[0], 10);
        if (hour >= 12) {
            // بعد از ظهر PM (ساعت ۱۲ تا ۲۳)
            const pmHour = hour === 12 ? 12 : hour - 12;
            occupiedPM.add(pmHour);
        } else {
            // قبل از ظهر AM (ساعت ۰ تا ۱۱)
            const amHour = hour === 0 ? 12 : hour;
            occupiedAM.add(amHour);
        }
    });

    // ایجاد ۱۲ نقطه دایره‌ای روی هر ساعت با روابط مثلثاتی
    createClockNodes(amClock, occupiedAM);
    createClockNodes(pmClock, occupiedPM);
}

function createClockNodes(clockContainer, occupiedSet) {
    const radius = 62; // شعاع قرارگیری گره‌ها داخل دایره ۱۶۰ پیکسلی
    const centerX = 80;
    const centerY = 80;

    for (let h = 1; h <= 12; h++) {
        const node = document.createElement('div');
        node.className = `hour-node ${occupiedSet.has(h) ? 'occupied' : ''}`;
        node.textContent = toPersianNumber(h);

        // محاسبه زاویه هر ساعت روی دایره (کم کردن ۹۰ درجه برای شروع از ساعت ۱۲ بالا)
        const angle = (h * 30 - 90) * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        node.style.left = `${x}px`;
        node.style.top = `${y}px`;

        clockContainer.appendChild(node);
    }
}
