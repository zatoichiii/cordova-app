const today = new Date();
let calendarDate = new Date();

const calendarPopup = document.getElementById('calendarPopup');
const selectedDate = document.getElementById('selectedDate');

const dateFromInput = document.getElementById('dateFrom');
const dateToInput = document.getElementById('dateTo');
const calendarTitle = document.getElementById('calendarTitle');

const monthSelect = document.getElementById('monthSelect');
const yearSelect = document.getElementById('yearSelect');

const container = document.getElementById('calendarDays');

let selectedDateFrom = null;
let selectedDateTo = null;
let selectingFrom = true;

const months = [
  'Январь', 'Февраль', 'Март', 'Апрель',
  'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

function toggleCalendar() {
  calendarPopup.classList.toggle('open');
}

function updateCalendarTitle(date) {
  const monthName = months[date.getMonth()];
  calendarTitle.textContent = `${monthName} ${date.getFullYear()}`;
}

function formatDate(date) {
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
}

function isSameDay(d1, d2) {
  return d1 && d2 &&
         d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}

function isInRange(date) {
  if (!selectedDateFrom || !selectedDateTo) return false;
  return date >= selectedDateFrom && date <= selectedDateTo;
}

function handleDayClick(clickedDate) {
  if (selectingFrom || !selectedDateFrom || clickedDate < selectedDateFrom) {
    selectedDateFrom = new Date(clickedDate);
    selectedDateTo = null;
    selectingFrom = false;
    dateFromInput.value = formatDate(selectedDateFrom);
    dateToInput.value = '';
  } else {
    selectedDateTo = new Date(clickedDate);
    dateToInput.value = formatDate(selectedDateTo);
    selectingFrom = true;
  }
  renderCalendar(calendarDate);
}

function updateCalendarControls() {
  monthSelect.value = calendarDate.getMonth();
  yearSelect.value = calendarDate.getFullYear();
}

function updateMonthYearSelects() {
  const currentYear = today.getFullYear();

  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    yearSelect.appendChild(option);
  }

  months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.text = month;
    monthSelect.appendChild(option);
  });
}

function renderCalendar(date = new Date()) {
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDay = new Date(year, month, 1).getDay() || 7;
  const totalDays = new Date(year, month + 1, 0).getDate();

  container.innerHTML = '';

  const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  daysOfWeek.forEach(day => {
    const el = document.createElement('div');
    el.className = 'day-label';
    el.textContent = day;
    container.appendChild(el);
  });

  for (let i = 1; i < firstDay; i++) {
    const empty = document.createElement('div');
    container.appendChild(empty);
  }

  for (let i = 1; i <= totalDays; i++) {
    const dayEl = document.createElement('div');
    const currentDate = new Date(year, month, i);

    dayEl.className = 'day';

    if (isSameDay(currentDate, today)) {
      dayEl.classList.add('active');
    }

    dayEl.innerHTML = `
      <div class="day-number">${i}</div>
      <div class="day-name">${daysOfWeek[currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1]}</div>
    `;

    if (isSameDay(selectedDateFrom, currentDate)) {
      dayEl.classList.add('day-selected-start');
    } else if (isSameDay(selectedDateTo, currentDate)) {
      dayEl.classList.add('day-selected-end');
    } else if (isInRange(currentDate)) {
      dayEl.classList.add('day-in-range');
    }

    dayEl.onclick = () => {
      handleDayClick(currentDate);
    };

    container.appendChild(dayEl);
  }

  updateCalendarTitle(calendarDate);
}

document.getElementById('prevMonth').addEventListener('click', () => {
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  updateCalendarControls();
  renderCalendar(calendarDate);
});

document.getElementById('nextMonth').addEventListener('click', () => {
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  updateCalendarControls();
  renderCalendar(calendarDate);
});
monthSelect.addEventListener('change', () => {
  calendarDate.setMonth(parseInt(monthSelect.value));
  renderCalendar(calendarDate);
});

yearSelect.addEventListener('change', () => {
  calendarDate.setFullYear(parseInt(yearSelect.value));
  renderCalendar(calendarDate);
});

document.getElementById('today').addEventListener('click', () => {
  const now = new Date();
  selectedDate.innerText = `Сегодня, ${formatDate(now)}`;
  selectedDateFrom = new Date(now);
  selectedDateTo = new Date(now);
  dateFromInput.value = formatDate(now);
  dateToInput.value = formatDate(now);
  toggleCalendar();
});

document.getElementById('yesterday').addEventListener('click', () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  selectedDate.innerText = `Вчера, ${formatDate(yesterday)}`;
  selectedDateFrom = new Date(yesterday);
  selectedDateTo = new Date(yesterday);
  dateFromInput.value = formatDate(yesterday);
  dateToInput.value = formatDate(yesterday);
  toggleCalendar();
});

document.getElementById('tomorrow').addEventListener('click', () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  selectedDate.innerText = `Завтра, ${formatDate(tomorrow)}`;
  selectedDateFrom = new Date(tomorrow);
  selectedDateTo = new Date(tomorrow);
  dateFromInput.value = formatDate(tomorrow);
  dateToInput.value = formatDate(tomorrow);
  toggleCalendar();
});

document.getElementById('applyBtn').addEventListener('click', () => {
    if (selectedDateFrom && selectedDateTo) {
      const fromStr = formatDate(selectedDateFrom);
      const toStr = formatDate(selectedDateTo);
      document.getElementById('calendarHeader').innerText = `${fromStr} — ${toStr}`;
      window.selectedDateFrom = selectedDateFrom;
      window.selectedDateTo = selectedDateTo;
    } else if (selectedDateFrom) {
      window.selectedDateFrom = selectedDateFrom;
      window.selectedDateTo = selectedDateFrom;
    } else {
      window.selectedDateFrom = null;
      window.selectedDateTo = null;
    }
  
    const event = new CustomEvent('updateJobList');
    window.dispatchEvent(event);
  
    toggleCalendar();
  });

updateMonthYearSelects();
updateCalendarControls();
renderCalendar(calendarDate);

document.getElementById('calendarHeader').addEventListener('click', toggleCalendar);