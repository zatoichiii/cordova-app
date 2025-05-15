import { JOBS, STATUS_ICONS } from '/assets/constants/jobs.js';

const statusLabels = {
  'in-progress': 'В процессе',
  'completed': 'Завершён',
  'pending': 'Ожидает',
  'canceled': 'Отменен',
  'option': 'Не начат',
};


function calculateDuration(start, end) {
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);

  const startTimeInMinutes = startHours * 60 + startMinutes;
  const endTimeInMinutes = endHours * 60 + endMinutes;

  let diffMinutes = endTimeInMinutes - startTimeInMinutes;

  if (diffMinutes < 0) {
    diffMinutes += 24 * 60;
  }

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return { hours, minutes };
}

function formatDateWithoutYear(dateStr) {
  const months = [
    'января', 'февраля', 'марта',
    'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'
  ];

  const [year, month, day] = dateStr.split('-');
  const monthIndex = parseInt(month, 10) - 1;

  return `${parseInt(day, 10)} ${months[monthIndex]}`;
}


const urlParams = new URLSearchParams(window.location.search);
const jobId = parseInt(urlParams.get('id'));
const job = JOBS.find(j => j.id === jobId);
const duration = calculateDuration(job.timeStart, job.timeEnd);

const tabDetails = document.getElementById('tab-details');
const mainInfo = document.getElementById('job-main-info-after-header')
if (job) {

  document.getElementById('job-id').textContent = `№${job.id}`;
  document.getElementById('job-status-text').textContent = statusLabels[job.status] || job.status;
  document.getElementById('job-icon').src = STATUS_ICONS[job.status];
  mainInfo.innerHTML = `
      <div class="job-info">
      <h1>${job.title}</h1>
      <div class="job-heaader__flex-item adress"> 
        <img src="./assets/images/icons/map-pin-gray.svg" />
        <span>${job.address}</span>
      </div>
      <div class="job-header__flex-items">
      <div class="job-heaader__flex-item">
        <img src="./assets/images/icons/calendar-gray.svg" />
        <span>
         ${job.timeStart} – ${job.timeEnd}, ${formatDateWithoutYear(job.date)}
         </span>
      </div>
      <div class="job-heaader__flex-item">
        <img src="./assets/images/icons/profile-nav.svg" />
        <span>${job.person}</span>
      </div>
      </div>
    </div>
    `
  tabDetails.innerHTML = `
    <div class="job-detail__items">
      <div class="job-detai__item">
        <div class="job-detail__title">Длительность</div>
        <div class="job-detail__row">
          <div class="job-detail__info">${duration.hours} ч</div>
          <div class="job-detail__info">${duration.minutes} мин</div>
        </div>
      </div>
      <div class="job-detai__item">
        <div class="job-detail__title">Диспетчер</div>
        <div class="job-detail__row">
          <div class="job-detail__info">${job.dispatcher}</div>
        </div>
      </div>
      <div class="job-detai__item">
        <div class="job-detail__title">Услуга</div>
        <div class="job-detail__row">
          <div class="job-detail__info">${job.service}</div>
        </div>
      </div>
      <div class="job-detai__item">
        <div class="job-detail__title">Клиент</div>
        <div class="job-detail__row">
          <a href="tel:${job.tel}" class="job-detail__info">
          <span>${job.person}</span>
          <img src="./assets/images/icons/phone.svg"/>
          </a>
          </div>
        </div>
      </div>
      <div class="job-detai__item">
        <div class="job-detail__title">Возраст</div>
        <div class="job-detail__row">
          <div class="job-detail__info">${job.age}</div>
        </div>
      </div>
    </div>
  `;
} else {
  tabDetails.innerHTML = `<p>⚠️ Наряд не найден.</p>`;
}

tabDetails.querySelectorAll('.job-detail__row').forEach(row => {
  const count = row.querySelectorAll('.job-detail__info').length;
  row.classList.add(`info-count-${count}`);
});

