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
    let days = 355666 + 365*gy + Math.floor((gy2+3)/4) - Math.floor((gy2+99)/100) + Math.floor((gy2+399)/400) + gd + g_d_m[gm-1];
    let jy = -1595 + 33*Math.floor(days/12053);
    days %= 12053;
    jy += 4*Math.floor(days/1461);
    days %= 1461;
    if (days > 365) { jy += Math.floor((days-1)/365); days = (days-1)%365; }
    let jm, jd;
    if (days < 186) { jm = 1 + Math.floor(days/31); jd = 1 + (days%31); }
    else { jm = 7 + Math.floor((days-186)/30); jd = 1 + ((days-186)%30); }
    return [jy, jm, jd];
}
function getDayOfYearJalali(jy, jm, jd) { return jm <= 6 ? (jm-1)*31 + jd : 186 + (jm-7)*30 + jd; }
const jalaliMonthNames = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
const jalaliWeekdays = ['شنبه','یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه'];

function jalaliToGregorian(jy, jm, jd) {
    jy += 1595;
    let days = -355668 + jd + (jm<=6 ? (jm-1)*31 : 186+(jm-7)*30) + Math.floor(jy/33)*12053 + Math.floor((jy%33)*365.25);
    days = Math.round(days);
    const gy = 621 + Math.floor(days/365);
    let gd = days - Math.floor((gy-621)*365.25) - Math.floor((gy-617)/4) + Math.floor((gy-617)/100) - Math.floor((gy-617)/400);
    const g_dim = [31,28,31,30,31,30,31,31,30,31,30,31];
    if ((gy%4===0 && gy%100!==0) || gy%400===0) g_dim[1]=29;
    let gm=1, temp=gd;
    for(let i=0;i<12;i++){ if(temp<=g_dim[i]){ gm=i+1; break; } temp-=g_dim[i]; }
    return [gy,gm,temp];
}
function getJalaliWeekday(jy,jm,jd){ const g=jalaliToGregorian(jy,jm,jd); return new Date(g[0],g[1]-1,g[2]).getDay(); }
function getTodayJalali(){ const t=new Date(); return gregorianToJalali(t.getFullYear(),t.getMonth()+1,t.getDate()); }

function formatTime12(h,m){ const h12 = h%12||12; const p = h<12?'ق.ظ':'ب.ظ'; return `${h12}:${m.toString().padStart(2,'0')} ${p}`; }
function formatTimeRange(sh,sm,eh,em){ return `${formatTime12(sh,sm)} - ${formatTime12(eh,em)}`; }

// ---------- نام کاربر ----------
let userName = localStorage.getItem('planner_userName')||'';

// ---------- داده‌ها ----------
let todos = JSON.parse(localStorage.getItem('planner_todos'))||[];
let schedules = JSON.parse(localStorage.getItem('planner_schedules'))||[];
function saveTodos(){ localStorage.setItem('planner_todos',JSON.stringify(todos)); }
function saveSchedules(){ localStorage.setItem('planner_schedules',JSON.stringify(schedules)); }

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

// ---------- رندر برنامه‌ریز ----------
function renderTodos(){
    const list=document.getElementById('todoList'), empty=document.getElementById('todoEmpty'), count=document.getElementById('todoCount');
    list.innerHTML='';
    if(todos.length===0){ empty.classList.remove('hidden'); count.textContent='۰ کار'; }
    else {
        empty.classList.add('hidden'); count.textContent=`${todos.length} کار`;
        todos.forEach((t,i)=>{
            const li=document.createElement('li');
            if(t.done) li.classList.add('done');
            li.innerHTML=`
                <span class="item-text" data-index="${i}" data-type="todo">${t.text}</span>
                <div class="item-actions">
                    <button class="item-check" data-index="${i}" data-type="todo">✔</button>
                    <button class="item-delete" data-index="${i}" data-type="todo">🗑️</button>
                </div>`;
            list.appendChild(li);
        });
    }
}

function renderSchedules(){
    const list=document.getElementById('scheduleList'), empty=document.getElementById('scheduleEmpty'), count=document.getElementById('scheduleCount');
    list.innerHTML='';
    if(schedules.length===0){ empty.classList.remove('hidden'); count.textContent='۰ برنامه'; }
    else {
        empty.classList.add('hidden'); count.textContent=`${schedules.length} برنامه`;
        schedules.sort((a,b)=> (a.startHour*60+a.startMinute) - (b.startHour*60+b.startMinute) );
        schedules.forEach((item,i)=>{
            const li=document.createElement('li');
            li.innerHTML=`
                <span class="item-text">${item.text}</span>
                <span class="item-time-badge">${formatTimeRange(item.startHour,item.startMinute,item.endHour,item.endMinute)}</span>
                <button class="item-delete" data-index="${i}" data-type="schedule">🗑️</button>`;
            list.appendChild(li);
        });
    }
}

// رسم ساعت‌ها
function renderClocks(){
    drawClockCanvas('clockAMCanvas',0,12);
    drawClockCanvas('clockPMCanvas',12,24);
}
function drawClockCanvas(canvasId, rangeStart, rangeEnd){
    const canvas=document.getElementById(canvasId);
    if(!canvas)return;
    const ctx=canvas.getContext('2d');
    const w=canvas.width, h=canvas.height, cx=w/2, cy=h/2, r=w/2-12;
    ctx.clearRect(0,0,w,h);
    // background
    ctx.beginPath(); ctx.arc(cx,cy,r,0,2*Math.PI); ctx.fillStyle='#fdf8f1'; ctx.fill(); ctx.strokeStyle='#e8c9a0'; ctx.lineWidth=2; ctx.stroke();
    // hour lines & numbers
    ctx.strokeStyle='#e8d5c0'; ctx.lineWidth=1;
    ctx.fillStyle='#6b5a4a'; ctx.font='bold 10px Vazirmatn, Tahoma'; ctx.textAlign='center'; ctx.textBaseline='middle';
    for(let i=0;i<12;i++){
        const angle=(i*30-90)*Math.PI/180;
        const ix=cx+(r-10)*Math.cos(angle), iy=cy+(r-10)*Math.sin(angle);
        const ox=cx+r*Math.cos(angle), oy=cy+r*Math.sin(angle);
        ctx.beginPath(); ctx.moveTo(ix,iy); ctx.lineTo(ox,oy); ctx.stroke();
        const num= i===0?12:i;
        ctx.fillText(num.toString(), cx+(r-18)*Math.cos(angle), cy+(r-18)*Math.sin(angle));
    }
    // busy arcs
    const now=new Date(), curH=now.getHours(), curM=now.getMinutes();
    schedules.forEach(item=>{
        const start=item.startHour+item.startMinute/60, end=item.endHour+item.endMinute/60;
        if(end<=start || end<=rangeStart || start>=rangeEnd) return;
        const cs=Math.max(start,rangeStart), ce=Math.min(end,rangeEnd);
        const sa=((cs-rangeStart)/12)*2*Math.PI - Math.PI/2;
        const ea=((ce-rangeStart)/12)*2*Math.PI - Math.PI/2;
        ctx.beginPath(); ctx.arc(cx,cy,r-6,sa,ea); ctx.lineWidth=16; ctx.strokeStyle='rgba(192,133,82,0.4)'; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx,cy,r-6,sa,sa); ctx.lineWidth=16; ctx.strokeStyle='#c08552'; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx,cy,r-6,ea,ea); ctx.stroke();
    });
    // current time indicator
    if(curH>=rangeStart && curH<rangeEnd){
        const hr=curH-rangeStart, frac=curM/60;
        const ang=((hr+frac)/12)*2*Math.PI - Math.PI/2;
        const ix=cx+(r-15)*Math.cos(ang), iy=cy+(r-15)*Math.sin(ang);
        ctx.beginPath(); ctx.arc(ix,iy,4,0,2*Math.PI); ctx.fillStyle='#8b5a3c'; ctx.fill(); ctx.strokeStyle='#fff'; ctx.lineWidth=1; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(ix,iy); ctx.strokeStyle='#8b5a3c'; ctx.lineWidth=2; ctx.stroke();
    }
}

// ---------- کرونومتر ----------
let stopwatchInterval=null, stopwatchStartTime=0, stopwatchElapsed=0, lapTimes=[];
function updateStopwatchDisplay(){
    const now=Date.now();
    const total=stopwatchElapsed + (stopwatchInterval ? now-stopwatchStartTime : 0);
    const hh=Math.floor(total/3600000).toString().padStart(2,'0');
    const mm=Math.floor((total%3600000)/60000).toString().padStart(2,'0');
    const ss=Math.floor((total%60000)/1000).toString().padStart(2,'0');
    document.getElementById('stopwatchDisplay').textContent=`${hh}:${mm}:${ss}`;
}
function startStopwatch(){
    if(stopwatchInterval) return;
    stopwatchStartTime=Date.now();
    stopwatchInterval=setInterval(updateStopwatchDisplay, 100);
    document.getElementById('stopwatchStartBtn').disabled=true;
    document.getElementById('stopwatchPauseBtn').disabled=false;
    document.getElementById('stopwatchLapBtn').disabled=false;
}
function pauseStopwatch(){
    if(!stopwatchInterval) return;
    clearInterval(stopwatchInterval);
    stopwatchInterval=null;
    stopwatchElapsed+=Date.now()-stopwatchStartTime;
    updateStopwatchDisplay();
    document.getElementById('stopwatchStartBtn').disabled=false;
    document.getElementById('stopwatchPauseBtn').disabled=true;
    document.getElementById('stopwatchLapBtn').disabled=true;
}
function resetStopwatch(){
    pauseStopwatch();
    stopwatchElapsed=0; lapTimes=[];
    updateStopwatchDisplay();
    renderLaps();
    document.getElementById('stopwatchStartBtn').disabled=false;
    document.getElementById('stopwatchPauseBtn').disabled=true;
    document.getElementById('stopwatchLapBtn').disabled=true;
}
function lapStopwatch(){
    const now=Date.now();
    const total=stopwatchElapsed + (stopwatchInterval ? now-stopwatchStartTime : 0);
    lapTimes.push(total);
    renderLaps();
}
function renderLaps(){
    const list=document.getElementById('lapList');
    list.innerHTML='';
    lapTimes.slice().reverse().forEach((t,i)=>{
        const hh=Math.floor(t/3600000).toString().padStart(2,'0');
        const mm=Math.floor((t%3600000)/60000).toString().padStart(2,'0');
        const ss=Math.floor((t%60000)/1000).toString().padStart(2,'0');
        const li=document.createElement('li');
        li.textContent=`دور ${lapTimes.length-i}: ${hh}:${mm}:${ss}`;
        list.appendChild(li);
    });
}

// ---------- پومودورو ----------
let pomodoroInterval=null, pomodoroTimeLeft=0, pomodoroPhase='idle', pomodoroSettings={work:25,break:5,parts:4};
let pomodoroCurrentPart=0;
function updatePomodoroDisplay(){
    const min=Math.floor(pomodoroTimeLeft/60).toString().padStart(2,'0');
    const sec=Math.floor(pomodoroTimeLeft%60).toString().padStart(2,'0');
    document.getElementById('pomodoroTimer').textContent=`${min}:${sec}`;
    if(pomodoroPhase==='working'){
        document.getElementById('pomodoroPhase').textContent='کار';
        document.getElementById('pomodoroProgress').textContent=`پارت ${pomodoroCurrentPart} از ${pomodoroSettings.parts}`;
    }else if(pomodoroPhase==='breaking'){
        document.getElementById('pomodoroPhase').textContent='استراحت';
        document.getElementById('pomodoroProgress').textContent='';
    }else{
        document.getElementById('pomodoroPhase').textContent='آماده';
        document.getElementById('pomodoroProgress').textContent=`پارت ۰ از ${pomodoroSettings.parts}`;
    }
}
function startPomodoro(){
    if(pomodoroInterval) return;
    pomodoroSettings.work=parseInt(document.getElementById('workMinutes').value)||25;
    pomodoroSettings.break=parseInt(document.getElementById('breakMinutes').value)||5;
    pomodoroSettings.parts=parseInt(document.getElementById('workParts').value)||4;
    if(pomodoroSettings.work<1||pomodoroSettings.break<1||pomodoroSettings.parts<1) return;

    pomodoroCurrentPart=1;
    pomodoroPhase='working';
    pomodoroTimeLeft=pomodoroSettings.work*60;
    updatePomodoroDisplay();
    pomodoroInterval=setInterval(pomodoroTick,1000);
    document.getElementById('pomodoroStartBtn').disabled=true;
    document.getElementById('pomodoroPauseBtn').disabled=false;
}
function pomodoroTick(){
    if(pomodoroTimeLeft>0){ pomodoroTimeLeft--; updatePomodoroDisplay(); return; }
    if(pomodoroPhase==='working'){
        if(pomodoroCurrentPart >= pomodoroSettings.parts){
            clearInterval(pomodoroInterval); pomodoroInterval=null;
            pomodoroPhase='idle'; pomodoroTimeLeft=0; updatePomodoroDisplay();
            document.getElementById('pomodoroStartBtn').disabled=false;
            document.getElementById('pomodoroPauseBtn').disabled=true;
            return;
        }
        pomodoroPhase='breaking';
        pomodoroTimeLeft=pomodoroSettings.break*60;
        updatePomodoroDisplay();
    }else if(pomodoroPhase==='breaking'){
        pomodoroCurrentPart++;
        pomodoroPhase='working';
        pomodoroTimeLeft=pomodoroSettings.work*60;
        updatePomodoroDisplay();
    }
}
function pausePomodoro(){
    if(pomodoroInterval){ clearInterval(pomodoroInterval); pomodoroInterval=null; }
    document.getElementById('pomodoroStartBtn').disabled=false;
    document.getElementById('pomodoroPauseBtn').disabled=true;
}
function resetPomodoro(){
    pausePomodoro();
    pomodoroPhase='idle'; pomodoroTimeLeft=0; pomodoroCurrentPart=0;
    document.getElementById('pomodoroTimer').textContent=`${pomodoroSettings.work}:00`;
    updatePomodoroDisplay();
}

// ---------- ناوبری ----------
function switchPage(pageId){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelectorAll('.island-btn').forEach(b=>b.classList.remove('active'));
    document.querySelector(`.island-btn[data-page="${pageId}"]`).classList.add('active');
}

// ---------- رویدادها ----------
function setupEvents(){
    // جزیره
    document.querySelectorAll('.island-btn').forEach(btn=>{
        btn.addEventListener('click',()=>switchPage(btn.dataset.page));
    });

    // دارک مود
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

    // تودو
    document.getElementById('addTodoBtn').addEventListener('click',()=>{
        const inp=document.getElementById('todoInput');
        const text=inp.value.trim();
        if(!text)return;
        todos.push({text,done:false}); saveTodos(); renderTodos(); inp.value=''; inp.focus();
    });
    document.getElementById('todoInput').addEventListener('keypress',e=>{ if(e.key==='Enter') document.getElementById('addTodoBtn').click(); });

    // تیک و حذف تودو
    document.getElementById('todoList').addEventListener('click',e=>{
        if(e.target.classList.contains('item-check')){
            const idx=parseInt(e.target.dataset.index);
            todos[idx].done=!todos[idx].done; saveTodos(); renderTodos();
        }
        if(e.target.classList.contains('item-delete')){
            const idx=parseInt(e.target.dataset.index);
            todos.splice(idx,1); saveTodos(); renderTodos();
        }
    });

    // زمانبندی
    document.getElementById('addScheduleBtn').addEventListener('click',()=>{
        const inp=document.getElementById('scheduleInput');
        const startVal=document.getElementById('scheduleStart').value;
        const endVal=document.getElementById('scheduleEnd').value;
        const text=inp.value.trim();
        if(!text||!startVal||!endVal)return;
        const [sh,sm]=startVal.split(':').map(Number);
        const [eh,em]=endVal.split(':').map(Number);
        if(eh*60+em <= sh*60+sm){ alert('زمان پایان باید بعد از شروع باشد.'); return; }
        schedules.push({text,startHour:sh,startMinute:sm,endHour:eh,endMinute:em});
        saveSchedules(); renderSchedules(); renderClocks();
        inp.value=''; document.getElementById('scheduleStart').value=''; document.getElementById('scheduleEnd').value=''; inp.focus();
    });
    document.getElementById('scheduleInput').addEventListener('keypress',e=>{ if(e.key==='Enter') document.getElementById('addScheduleBtn').click(); });
    document.getElementById('scheduleList').addEventListener('click',e=>{
        if(e.target.classList.contains('item-delete')){
            const idx=parseInt(e.target.dataset.index);
            schedules.splice(idx,1); saveSchedules(); renderSchedules(); renderClocks();
        }
    });

    // کرونومتر
    document.getElementById('stopwatchStartBtn').addEventListener('click',startStopwatch);
    document.getElementById('stopwatchPauseBtn').addEventListener('click',pauseStopwatch);
    document.getElementById('stopwatchResetBtn').addEventListener('click',resetStopwatch);
    document.getElementById('stopwatchLapBtn').addEventListener('click',lapStopwatch);

    // پومودورو
    document.getElementById('pomodoroStartBtn').addEventListener('click',startPomodoro);
    document.getElementById('pomodoroPauseBtn').addEventListener('click',pausePomodoro);
    document.getElementById('pomodoroResetBtn').addEventListener('click',resetPomodoro);

    // مودال نام (اصلاح‌شده)
    document.getElementById('saveNameBtn').addEventListener('click', ()=>{
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
        
        // مخفی کردن مودال (دو روش برای اطمینان)
        const modal = document.getElementById('welcomeModal');
        modal.classList.add('hidden');
        modal.style.display = 'none';  // ← این خط مشکل رو حل می‌کنه
        
        updateUIWithName();
    });
    document.getElementById('nameInput').addEventListener('keypress',e=>{ if(e.key==='Enter') document.getElementById('saveNameBtn').click(); });
}

function updateUIWithName(){
    document.getElementById('userNameDisplay').textContent=userName;
    document.getElementById('footerName').textContent=userName;
}

// ---------- تقویم و شعر ----------
function updateCalendarAndPoem(){
    const [jy,jm,jd]=getTodayJalali();
    const wd=getJalaliWeekday(jy,jm,jd);
    document.getElementById('weekdayName').textContent=jalaliWeekdays[wd];
    document.getElementById('jalaliDay').textContent=jd.toLocaleString('fa-IR');
    document.getElementById('jalaliMonth').textContent=jalaliMonthNames[jm-1];
    document.getElementById('jalaliYear').textContent=jy.toLocaleString('fa-IR');
    const now=new Date();
    const gm=['ژانویه','فوریه','مارس','آوریل','می','ژوئن','جولای','اوت','سپتامبر','اکتبر','نوامبر','دسامبر'];
    document.getElementById('gregorianDate').textContent=now.getDate()+' '+gm[now.getMonth()]+' '+now.getFullYear();
    const doy=getDayOfYearJalali(jy,jm,jd);
    document.getElementById('poemText').textContent=poems[(doy-1)%poems.length];
    document.getElementById('footerDate').textContent=jalaliWeekdays[wd]+'، '+jd+' '+jalaliMonthNames[jm-1]+' '+jy;
}

// ---------- راه‌اندازی ----------
function init(){
    // دارک مود ذخیره‌شده
    const savedDark = localStorage.getItem('planner_darkMode') === 'true';
    applyDarkMode(savedDark);

    if(!userName){
        const modal = document.getElementById('welcomeModal');
        modal.classList.remove('hidden');
        modal.style.display = 'flex'; // اطمینان از نمایش
    } else {
        document.getElementById('welcomeModal').classList.add('hidden');
        document.getElementById('welcomeModal').style.display = 'none';
        updateUIWithName();
    }
    updateCalendarAndPoem();
    renderTodos(); renderSchedules(); renderClocks();
    setupEvents();
    setInterval(renderClocks,60000);
    if('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
}
document.addEventListener('DOMContentLoaded', init);
