/* ============ app.js — ядро Контур 2 ============ */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* --- иконки --- */
const IC={
  cal:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M8 2v4M16 2v4M3 9h18"/></svg>',
  pin:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  clock:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  users:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3.4"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M17 8.5a3 3 0 1 1-2-5.2M18 20h4a5.5 5.5 0 0 0-4-5.3"/></svg>',
  search:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>',
  heart:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7.5-4.7-9.3-9.2C1.4 7.7 3.7 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.3 0 5.6 3.2 4.3 6.3C19.5 15.3 12 20 12 20z"/></svg>',
  sun:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/></svg>',
  moon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 13.5A8.5 8.5 0 1 1 10.5 4a7 7 0 0 0 9.5 9.5z"/></svg>',
  close:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  check:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.6"><path d="M4 12.5 9.5 18 20 6.5"/></svg>',
  plus:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>',
  dl:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/></svg>',
  globe:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/></svg>',
  ticket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9a2 2 0 0 0 2-2V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a2 2 0 0 0 0 4v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3a2 2 0 0 0-2-2z"/></svg>',
  mic:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
  bld:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6"/></svg>',
  star:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.4l6.1-.8z"/></svg>',
  info:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
  bell:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 0 0 4 0"/></svg>',
};

/* --- состояние --- */
const LS='nauka2_';
const state={
  view:'home', q:'', type:'all', dept:'all', sort:'date', onlyFav:false, calMonth:10 /*ноябрь 2026*/,
  favs:JSON.parse(localStorage.getItem(LS+'favs')||'[]'),
  myRegs:JSON.parse(localStorage.getItem(LS+'regs')||'[]'),
  theme:localStorage.getItem(LS+'theme')||'dark',
};
document.documentElement.dataset.theme=state.theme;
const save=()=>{localStorage.setItem(LS+'favs',JSON.stringify(state.favs));localStorage.setItem(LS+'regs',JSON.stringify(state.myRegs));localStorage.setItem(LS+'theme',state.theme)};

const evDate=e=>new Date(e.date+'T'+e.time);
const fmtD=d=>`${d.getDate()} ${MONTHSF[d.getMonth()]} ${d.getFullYear()}`;
function status(e){
  const now=new Date('2026-10-28T12:00');
  if(evDate(e)<now) return {k:'done',t:'Завершено'};
  if(e.reg>=e.cap) return {k:'full',t:'Мест нет'};
  const soon=(evDate(e)-now)/36e5<72;
  return {k:soon?'live':'open',t:soon?'Скоро старт':'Регистрация открыта'};
}
const isReg=id=>state.myRegs.some(r=>r===id);
const isFav=id=>state.favs.includes(id);
function toast(msg,type='ok'){
  const t=document.createElement('div');t.className='toast '+(type==='err'?'err':type==='info'?'info':'');
  t.innerHTML=(type==='err'?IC.info:type==='info'?IC.bell:IC.check)+`<span>${esc(msg)}</span>`;
  $('#toasts').appendChild(t);setTimeout(()=>{t.style.opacity=0;t.style.transition='.4s';setTimeout(()=>t.remove(),400)},3200);
}

/* --- фильтрованные события --- */
function filtered(){
  let list=EVENTS.filter(e=>{
    if(state.type!=='all'&&e.type!==state.type)return false;
    if(state.dept!=='all'&&!e.dept.includes(state.dept)&&e.org!==state.dept)return false;
    if(state.onlyFav&&!isFav(e.id))return false;
    if(state.q){const s=(e.title+' '+e.place+' '+TYPES[e.type].name).toLowerCase();if(!s.includes(state.q.toLowerCase()))return false;}
    return true;
  });
  if(state.sort==='date')list.sort((a,b)=>evDate(a)-evDate(b));
  if(state.sort==='popular')list.sort((a,b)=>b.reg/b.cap-a.reg/a.cap);
  if(state.sort==='seats')list.sort((a,b)=>(a.cap-a.reg)-(b.cap-b.reg));
  return list;
}

/* ================= ГЛАВНАЯ ================= */
function vHome(){
  const up=EVENTS.filter(e=>status(e).k!=='done').sort((a,b)=>evDate(a)-evDate(b));
  const next=up[0], feat=up.slice(1,4);
  const totalReg=EVENTS.reduce((s,e)=>s+e.reg,0)+state.myRegs.length;
  return `
  <section class="hero">
    <h1>Научные мероприятия<br><span class="gr">Военно-медицинской академии</span></h1>
    <p>Конференции, семинары, вебинары и школы молодого учёного. Узнавайте первыми, регистрируйтесь в один клик.</p>
    <div class="hero-stats">
      <div class="hstat"><b>${up.length}</b><span>предстоящих событий</span></div>
      <div class="hstat"><b>${totalReg.toLocaleString('ru')}</b><span>участников</span></div>
      <div class="hstat"><b>${Object.keys(TYPES).length}</b><span>форматов</span></div>
      <div class="hstat"><b>${DEPTS.length}</b><span>организаторов</span></div>
    </div>
  </section>
  <div class="wrap">
    ${next?`<div class="feat rv">
      <div class="feat-big" onclick="openEvent(${next.id})">
        <div class="feat-bg"><div class="inner">
          <span class="badge ${status(next).k}" style="background:${TYPES[next.type].color};border:none">${TYPES[next.type].name}</span>
          <h3>${esc(next.title)}</h3>
          <div style="display:flex;gap:16px;margin-top:10px;font-size:13.5px;opacity:.9;flex-wrap:wrap">
            <span>${IC.cal} ${fmtD(evDate(next))}</span><span>${IC.clock} ${next.time}</span><span>${IC.pin} ${esc(next.place)}</span>
          </div>
        </div></div>
      </div>
      <div class="feat-side">${feat.map(e=>{const d=evDate(e);return `
        <div class="mini" onclick="openEvent(${e.id})">
          <div class="sq" style="background:${TYPES[e.type].color}">${d.getDate()}<br><span style="font-size:10px;font-weight:700">${MONTHS[d.getMonth()]}</span></div>
          <div><h4>${esc(e.title)}</h4><p>${TYPES[e.type].name} · ${e.reg}/${e.cap}</p></div>
        </div>`}).join('')}
      </div>
    </div>`:''}

    <div class="sec-t rv"><h2>Ближайшие события</h2><span class="cnt">${Math.min(6,up.length-1)}</span>
      <span class="more" onclick="go('all')">Все мероприятия →</span></div>
    <div class="grid">${up.slice(1,7).map(cardHTML).join('')}</div>

    <div class="sec-t rv"><h2>Лента новостей</h2></div>
    <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
      ${FEED.map(f=>`<div class="m-cell rv" style="align-items:flex-start"><span style="color:var(--acc)">${IC.bell}</span><div><b style="font-size:13.5px">${esc(f.txt)}</b><span style="font-size:12px;color:var(--txt3)">${f.t}</span></div></div>`).join('')}
    </div>
  </div>`;
}

function cardHTML(e){
  const d=evDate(e),st=status(e),pct=Math.round(e.reg/e.cap*100);
  return `<article class="ev rv" onclick="openEvent(${e.id})">
    <button class="fav ${isFav(e.id)?'on':''}" onclick="event.stopPropagation();toggleFav(${e.id})" title="В избранное">${IC.heart}</button>
    <div class="ev-cover" style="background:linear-gradient(135deg,${TYPES[e.type].color}33,${TYPES[e.type].color}cc)">
      <div class="ev-date"><b>${d.getDate()}</b><span>${MONTHS[d.getMonth()]}</span></div>
      <span class="ev-type">${TYPES[e.type].name}</span>
    </div>
    <div class="ev-body">
      <h3>${esc(e.title)}</h3>
      <div class="ev-meta">
        <div>${IC.clock} ${e.time}–${e.end}${e.online?' · онлайн':''}</div>
        <div>${IC.pin} ${esc(e.place)}</div>
        <div>${IC.mic} ${esc(e.org)}</div>
      </div>
      <div class="ev-foot">
        <span class="badge ${st.k}">${st.t}</span>
        <div class="bar"><i style="width:${pct}%"></i></div>
        <span class="seats">${e.reg}/${e.cap}</span>
      </div>
    </div>
  </article>`;
}

/* ================= ВСЕ МЕРОПРИЯТИЯ ================= */
function vAll(){
  const list=filtered();
  return `<div class="wrap" style="padding-top:26px">
    <div class="sec-t"><h2>Все мероприятия</h2><span class="cnt">${list.length}</span></div>
    <div class="tbar">
      <div class="search">${IC.search}<input id="q" placeholder="Поиск по названию, месту, формату…" value="${esc(state.q)}" oninput="state.q=this.value;renderGrid()"></div>
      <select class="sel" onchange="state.dept=this.value;renderGrid()">
        <option value="all">Все организаторы</option>${DEPTS.map(d=>`<option ${state.dept===d?'selected':''}>${d}</option>`).join('')}
      </select>
      <select class="sel" onchange="state.sort=this.value;renderGrid()">
        <option value="date">По дате</option><option value="popular" ${state.sort==='popular'?'selected':''}>По популярности</option><option value="seats" ${state.sort==='seats'?'selected':''}>Мало мест</option>
      </select>
      <button class="chip ${state.onlyFav?'on':''}" onclick="state.onlyFav=!state.onlyFav;go('all')">${IC.heart} Избранное</button>
    </div>
    <div class="chips" style="margin-bottom:22px">
      <button class="chip ${state.type==='all'?'on':''}" onclick="state.type='all';go('all')">Все форматы</button>
      ${Object.entries(TYPES).map(([k,v])=>`<button class="chip ${state.type===k?'on':''}" onclick="state.type='${k}';go('all')"><i style="background:${v.color}"></i>${v.name}</button>`).join('')}
    </div>
    <div id="grid">${gridHTML(list)}</div>
  </div>`;
}
function gridHTML(list){
  return list.length?`<div class="grid">${list.map(cardHTML).join('')}</div>`:
  `<div class="empty">${IC.search}<h3>Ничего не найдено</h3><p>Попробуйте изменить фильтры или запрос.</p></div>`;
}
function renderGrid(){const g=$('#grid');if(g){g.innerHTML=gridHTML(filtered());reveal();}}

/* ================= КАЛЕНДАРЬ ================= */
function vCal(){
  const y=2026,m=state.calMonth,first=new Date(y,m,1),days=new Date(y,m+1,0).getDate(),startDow=(first.getDay()+6)%7;
  const byDay={};EVENTS.forEach(e=>{const d=evDate(e);if(d.getFullYear()===y&&d.getMonth()===m)(byDay[d.getDate()]=byDay[d.getDate()]||[]).push(e)});
  const today=new Date('2026-10-28');
  let cells='';
  for(let i=0;i<startDow;i++)cells+='<div class="cal-d out"></div>';
  for(let d=1;d<=days;d++){
    const evs=byDay[d]||[],isT=today.getFullYear()===y&&today.getMonth()===m&&today.getDate()===d;
    cells+=`<div class="cal-d ${evs.length?'has':''} ${isT?'today':''}" ${evs.length?`onclick="dayEvents(${d})"`:''}><b>${d}</b><div class="dots">${evs.map(e=>`<span class="dot" style="background:${TYPES[e.type].color}"></span>`).join('')}</div></div>`;
  }
  const prev=m>0, next=m<11;
  return `<div class="wrap" style="padding-top:26px">
    <div class="sec-t"><h2>Календарь · ${['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'][m]} 2026</h2>
      <span class="more" style="cursor:pointer" onclick="${prev?`state.calMonth--;go('cal')`:''}">← предыдущий</span>
      <span class="more" style="cursor:pointer" onclick="${next?`state.calMonth++;go('cal')`:''}">следующий →</span></div>
    <div class="cal"><div class="cal-grid">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(x=>`<div class="cal-dow">${x}</div>`).join('')}${cells}</div></div>
    <div class="sec-t"><h2>События месяца</h2><span class="cnt">${EVENTS.filter(e=>evDate(e).getMonth()===m&&evDate(e).getFullYear()===y).length}</span></div>
    <div class="grid">${EVENTS.filter(e=>evDate(e).getMonth()===m).sort((a,b)=>evDate(a)-evDate(b)).map(cardHTML).join('')}</div>
  </div>`;
}
function dayEvents(d){
  const evs=EVENTS.filter(e=>{const x=evDate(e);return x.getFullYear()===2026&&x.getMonth()===state.calMonth&&x.getDate()===d});
  openModal(`<div class="m-body" style="padding-top:26px"><h2>${d} ${MONTHSF[state.calMonth]} — ${evs.length} событ.</h2>
    <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px">${evs.map(e=>`<div class="mini" onclick="openEvent(${e.id})"><div class="sq" style="background:${TYPES[e.type].color}">${e.time}</div><div><h4>${esc(e.title)}</h4><p>${TYPES[e.type].name} · ${esc(e.place)}</p></div></div>`).join('')}</div></div>`);
}

/* ================= МЕРоприятие (модалка) ================= */
function openEvent(id){
  const e=EVENTS.find(x=>x.id===id);if(!e)return;
  const d=evDate(e),st=status(e),reg=isReg(id),pct=Math.round(e.reg/e.cap*100);
  openModal(`
    <div class="m-hero" style="background:linear-gradient(135deg,${TYPES[e.type].color}44,${TYPES[e.type].color}dd)">
      <button class="icobtn m-close" onclick="closeModal()">${IC.close}</button>
      <div style="position:relative;z-index:2;color:#fff;width:100%">
        <span class="ev-type" style="background:rgba(0,0,0,.3)">${TYPES[e.type].name}</span>
        ${e.online?`<span class="ev-type" style="background:var(--cy);margin-left:8px">${IC.globe} Онлайн</span>`:''}
      </div>
    </div>
    <div class="m-body">
      <h2>${esc(e.title)}</h2>
      <div class="m-tags"><span class="badge ${st.k}">${st.t}</span><span class="chip" style="pointer-events:none">${IC.ticket} ${e.fee}</span></div>
      <div class="m-info">
        <div class="m-cell">${IC.cal}<div><span>Дата</span><b>${fmtD(d)}</b></div></div>
        <div class="m-cell">${IC.clock}<div><span>Время</span><b>${e.time} – ${e.end}</b></div></div>
        <div class="m-cell">${IC.pin}<div><span>Место</span><b style="font-size:13px">${esc(e.place)}</b></div></div>
        <div class="m-cell">${IC.users}<div><span>Участники</span><b>${e.reg} / ${e.cap} (${pct}%)</b></div></div>
      </div>
      <p class="m-desc">${esc(e.desc)}</p>
      ${e.speakers.length?`<div class="sec-t" style="margin:6px 0 12px"><h2 style="font-size:16px">Докладчики</h2></div>
      <div class="speakers">${e.speakers.map(s=>`<div class="spk"><div class="av">${s.n.split(' ').slice(-1)[0][0]}</div><div><b>${esc(s.n)}</b><span>${esc(s.r)}</span></div></div>`).join('')}</div>`:''}
      <div class="m-actions">
        ${reg?`<button class="btn" style="border-color:var(--rd);color:var(--rd)" onclick="unreg(${id})">Отменить регистрацию</button>
              <span class="badge open">${IC.check?.replace('#22c55e','currentColor')||''} Вы участвуете</span>`:
          st.k==='done'?`<button class="btn" disabled style="opacity:.5">Мероприятие завершено</button>`:
          st.k==='full'?`<button class="btn pri" onclick="waitlist(${id})">Записаться в лист ожидания</button>`:
          `<button class="btn pri" onclick="regForm(${id})">${IC.plus} Зарегистрироваться</button>`}
        <button class="btn" onclick="shareEv(${id})">${IC.dl} Поделиться</button>
        <button class="btn ${isFav(id)?'pri':''}" onclick="toggleFav(${id});openEvent(${id})">${IC.heart} ${isFav(id)?'В избранном':'В избранное'}</button>
      </div>
    </div>`);
}

/* --- регистрация --- */
function regForm(id){
  const e=EVENTS.find(x=>x.id===id);
  openModal(`<div class="m-body" style="padding-top:26px">
    <h2 style="font-size:20px">Регистрация</h2><p style="color:var(--txt2);margin:6px 0 18px;font-size:14px">${esc(e.title)}</p>
    <form id="rf" onsubmit="return doReg(event,${id})">
      <div class="frow">
        <div class="field"><label>ФИО *</label><input name="fio" placeholder="Иванов Иван Иванович"><div class="err">Укажите ФИО</div></div>
        <div class="field"><label>E-mail *</label><input name="em" placeholder="you@mail.ru"><div class="err">Некорректный e-mail</div></div>
      </div>
      <div class="frow">
        <div class="field"><label>Подразделение</label><select name="dp"><option value="">— выберите —</option>${DEPTS.map(d=>`<option>${d}</option>`).join('')}<option>Другое</option></select></div>
        <div class="field"><label>Должность / звание</label><input name="pos" placeholder="например, адъюнкт"></div>
      </div>
      <div class="field"><label>Комментарий</label><textarea name="cm" placeholder="Тема доклада, особые условия…"></textarea></div>
      <div style="display:flex;gap:12px;margin-top:6px"><button class="btn pri" type="submit">Отправить заявку</button><button class="btn" type="button" onclick="openEvent(${id})">Назад</button></div>
    </form></div>`);
}
function doReg(ev,id){
  ev.preventDefault();const f=ev.target,fd=new FormData(f);let bad=false;
  const check=(n,test)=>{const fld=f.elements[n].closest('.field'),ok=test(fd.get(n));fld.classList.toggle('bad',!ok);if(!ok)bad=true};
  check('fio',v=>v&&v.trim().length>4);check('em',v=>/^\S+@\S+\.\S+$/.test(v));
  if(bad){toast('Проверьте правильность заполнения','err');return false}
  state.myRegs.push(id);save();
  toast('Вы зарегистрированы! Приглашение отправлено на почту.');
  setTimeout(()=>openEvent(id),400);return false;
}
function unreg(id){state.myRegs=state.myRegs.filter(x=>x!==id);save();toast('Регистрация отменена','info');openEvent(id)}
function waitlist(id){toast('Вы в листе ожидания — сообщим об освободившемся месте','info')}
function shareEv(id){
  const url=location.origin+location.pathname+'#e'+id;
  navigator.clipboard?.writeText(url).then(()=>toast('Ссылка скопирована в буфер','info')).catch(()=>prompt('Скопируйте ссылку:',url));
}
function toggleFav(id){
  state.favs=isFav(id)?state.favs.filter(x=>x!==id):[...state.favs,id];save();
  toast(isFav(id)?'Добавлено в избранное':'Убрано из избранного','info');
  if(state.view==='my'||state.view==='all')render();else render();
}

/* ================= МОИ СОБЫТИЯ ================= */
function vMy(){
  const mine=EVENTS.filter(e=>isReg(e.id)||isFav(e.id));
  return `<div class="wrap" style="padding-top:26px">
    <div class="sec-t"><h2>Мои события</h2><span class="cnt">${mine.length}</span></div>
    ${mine.length?`<div class="grid">${mine.map(e=>{const r=isReg(e.id);return `${cardHTML(e)}<div style="margin:-6px 0 18px;display:flex;gap:8px">${r?`<span class="badge open">${IC.check.replace('#22c55e','currentColor')} Заявка подтверждена</span><button class="btn" style="padding:6px 12px;font-size:12.5px" onclick="ics(${e.id})">${IC.dl} Добавить в календарь (.ics)</button>`:`<span class="badge soon">Только в избранном</span>`}</div>`}).join('')}</div>`:
    `<div class="empty">${IC.star}<h3>Пока пусто</h3><p>Зарегистрируйтесь на мероприятие или добавьте его в избранное.</p><br><button class="btn pri" onclick="go('all')">Смотреть мероприятия</button></div>`}
  </div>`;
}
function ics(id){
  const e=EVENTS.find(x=>x.id===id),d=evDate(e),end=new Date(evDate(e).getTime()+2*36e5);
  const p=n=>String(n).padStart(2,'0');
  const dt=x=>x.getFullYear()+p(x.getMonth()+1)+p(x.getDate())+'T'+p(x.getHours())+p(x.getMinutes())+'00';
  const blob=`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nUID:nauka-${id}\nDTSTART:${dt(d)}\nDTEND:${dt(end)}\nSUMMARY:${e.title}\nLOCATION:${e.place}\nDESCRIPTION:${e.desc}\nEND:VEVENT\nEND:VCALENDAR`;
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([blob],{type:'text/calendar'}));a.download='event.ics';a.click();
  toast('Событие добавлено в календарь');
}

/* ================= ОРГАНИЗАТОРАМ ================= */
function vOrg(){
  const byType={};EVENTS.forEach(e=>byType[e.type]=(byType[e.type]||0)+1);
  return `<div class="wrap" style="padding-top:26px">
    <div class="sec-t"><h2>Организаторам</h2></div>
    <div class="m-info" style="grid-template-columns:repeat(auto-fit,minmax(230px,1fr))">
      <div class="m-cell">${IC.bld}<div><span>Публикация</span><b>Через Контур 1</b></div></div>
      <div class="m-cell">${IC.users}<div><span>Отбор</span><b>Личные кабинеты кафедр</b></div></div>
      <div class="m-cell">${IC.dl}<div><span>Аналитика</span><b>Явка и popularity</b></div></div>
    </div>
    <p class="m-desc" style="margin-top:18px">Мероприятия публикуются через единую систему учёта научной работы (Контур&nbsp;1). Кафедра создаёт событие в модуле «Мероприятия», оно автоматически появляется здесь с формой регистрации. Заявки участников возвращаются в Контур 1 и учитываются в отчётах подразделения.</p>
    <div class="sec-t"><h2>Статистика по форматам</h2></div>
    <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">
      ${Object.entries(TYPES).map(([k,v])=>`<div class="m-cell"><span class="dot" style="width:12px;height:12px;border-radius:50%;background:${v.color}"></span><div><span>${v.name}</span><b>${byType[k]||0} мероприятий</b></div></div>`).join('')}
    </div>
    <div style="margin-top:26px"><a class="btn pri" href="https://nauka-sistem-patfiz.waw0.amvera.tech" target="_blank">${IC.bld} Перейти в Контур 1 (система учёта)</a></div>
  </div>`;
}

/* ================= роутинг/рендер ================= */
const VIEWS={home:vHome,all:vAll,cal:vCal,my:vMy,org:vOrg};
function go(v){state.view=v;window.scrollTo(0,0);render();}
function render(){
  $('#main').innerHTML=(VIEWS[state.view]||vHome)();
  $$('.nav a').forEach(a=>a.classList.toggle('on',a.dataset.v===state.view));
  reveal();
}
function reveal(){
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.06});
  $$('.rv:not(.in)').forEach(el=>io.observe(el));
}
function openModal(html){$('#modal').innerHTML=`<div class="modal">${html}</div>`;$('#ovl').classList.add('on');document.body.style.overflow='hidden'}
function closeModal(){$('#ovl').classList.remove('on');document.body.style.overflow=''}

/* --- init --- */
document.addEventListener('DOMContentLoaded',()=>{
  $('#nav').innerHTML=[['home','Главная'],['all','Мероприятия'],['cal','Календарь'],['my','Мои события'],['org','Организаторам']]
    .map(([v,t])=>`<a data-v="${v}" onclick="go('${v}')">${t}</a>`).join('');
  $('#themeBtn').innerHTML=state.theme==='dark'?IC.sun:IC.moon;
  $('#themeBtn').onclick=()=>{state.theme=state.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=state.theme;$('#themeBtn').innerHTML=state.theme==='dark'?IC.sun:IC.moon;save()};
  $('#ovl').addEventListener('click',e=>{if(e.target.id==='ovl')closeModal()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
  const h=location.hash.match(/^#e(\d+)$/);
  render();
  if(h)openEvent(+h[1]);
});
