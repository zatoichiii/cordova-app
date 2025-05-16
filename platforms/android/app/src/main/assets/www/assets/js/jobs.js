import { JOBS, STATUS_ICONS, STATUS_COLORS, STATUS_COLOR_TEXT, STATUS_COLOR_BG } from '../constants/jobs.js';

const jobsList = document.querySelector('.jobs-list');

let selectedDateFrom = null;
let selectedDateTo = null;
let currentStatusFilter = 'all';
let currentRenderMode = 'status';

const statusLabels = {
  'in-progress': 'В процессе',
  'completed': 'Завершён',
  'pending': 'Ожидает',
  'canceled': 'Отменен',
  'option': 'Не начат',
};


function renderJobs(jobs, mode = 'status') {
  jobsList.innerHTML = '';


  if (jobs.length === 0) {
    const noJobs = document.createElement('div');
    noJobs.className = 'no-jobs';
    noJobs.textContent = 'Нет заданий';
    jobsList.appendChild(noJobs);
  }
  
  if (mode === 'date') {
    jobs.forEach(job => {
      const jobCard = document.createElement('a');
      jobCard.href = `/job.html?id=${job.id}`;
      jobCard.className = 'job-card';

      jobCard.innerHTML = `
        <div class="job-card__left">
          <img src="${STATUS_ICONS[job.status]}" alt="${job.status}" />
        </div>
        <div class="job-card__right">
          <div class="job-time">${job.timeStart}–${job.timeEnd}</div>
          <div class="job-title">${job.title}</div>
          <div class="divider"></div>
          <div class="job-address">
            <img src="./assets/images/icons/map-pin-adress.svg" />
            <span>${job.address}</span>
          </div>
        </div>
      `;

      jobsList.appendChild(jobCard);
    });
  } else {
    const grouped = jobs.reduce((acc, job) => {
      if (!acc[job.status]) acc[job.status] = [];
      acc[job.status].push(job);
      return acc;
    }, {});

    Object.entries(grouped).forEach(([status, jobsArray]) => {
      const statusContainer = document.createElement('div');
      statusContainer.className = 'status-accordion';

      const header = document.createElement('div');
      header.className = 'status-header';

      const statusColorBg = STATUS_COLOR_BG[status];
      const statusColorText = STATUS_COLOR_TEXT[status];

      header.innerHTML = `
      <span>${statusLabels[status]}</span>
      <div class="status__right-side">
        <span 
          class="right-side__count" 
          style="
            background-color: ${statusColorBg}; 
            color: ${statusColorText}; 
            padding: 5px;
            border-radius: 50%; 
            font-size: 12px;
            font-weight: 500;
            min-width: 24px;
            min-height: 24px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >${jobsArray.length}</span>
        <span class="arrow" id="status-arrow-icon"><img src="./assets/images/icons/chevron-up.svg"></span>
      </div>
    `;


      const content = document.createElement('div');
      content.className = 'status-content';
      content.style.display = 'none';


      jobsArray.forEach(job => {
        const jobCard = document.createElement('a');
        jobCard.href = `/job.html?id=${job.id}`;
        jobCard.className = 'job-card';

        jobCard.innerHTML = `
          <div class="job-card__left">
            <img src="${STATUS_ICONS[job.status]}" alt="${job.status}" />
          </div>
          <div class="job-card__right">
            <div class="job-time">${job.timeStart}–${job.timeEnd}</div>
            <div class="job-title">${job.title}</div>
            <div class="divider"></div>
            <div class="job-address">
              <img src="./assets/images/icons/map-pin-adress.svg" />
              <span>${job.address}</span>
            </div>
          </div>
        `;

        content.appendChild(jobCard);
      });

      header.addEventListener('click', () => {
        const isVisible = content.style.display === 'block';
        content.style.display = isVisible ? 'none' : 'block';

        const arrow = header.querySelector('.arrow');
        arrow.classList.toggle('rotated', !isVisible);
      });

      statusContainer.appendChild(header);
      statusContainer.appendChild(content);

      jobsList.appendChild(statusContainer);
    });
  }
}

function filterAndSortJobs() {
  let filtered = [...JOBS];

  if (selectedDateFrom && selectedDateTo) {
    const from = new Date(selectedDateFrom);
    const to = new Date(selectedDateTo);

    filtered = filtered.filter(job => {
      const jobDate = new Date(job.date);
      return jobDate >= from && jobDate <= to;
    });
  }

  if (currentStatusFilter !== 'all') {
    filtered = filtered.filter(job => job.status === currentStatusFilter);
  }

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  renderJobs(filtered, currentRenderMode);
}

const sortByDateBtn = document.getElementById('sortByDateBtn');
if (sortByDateBtn) {
  sortByDateBtn.addEventListener('click', () => {
    currentStatusFilter = 'all';
    selectedDateFrom = null;
    selectedDateTo = null;
    currentRenderMode = 'date';

    filterAndSortJobs();
  });
}


const sortButtons = document.querySelector('.sort-buttons');

const statusAccordionWrapper = document.createElement('div');
statusAccordionWrapper.className = 'status-accordion-wrapper';

statusAccordionWrapper.innerHTML = `
  <button class="status-filter-btn">По статусу</button>
`;

if (sortButtons) {
  sortButtons.appendChild(statusAccordionWrapper);

}

const statusFilterBtn = statusAccordionWrapper.querySelector('.status-filter-btn');
const statusDropdown = statusAccordionWrapper.querySelector('.status-filter-dropdown');

statusFilterBtn.addEventListener('click', () => {
  currentRenderMode = 'status';
  selectedDateFrom = null;
  selectedDateTo = null;
  filterAndSortJobs();

  statusDropdown.style.display =
    statusDropdown.style.display === 'block' ? 'none' : 'block';
});

if (statusDropdown) {
  statusDropdown.querySelectorAll('.status-option').forEach(option => {
    option.addEventListener('click', () => {
      const status = option.getAttribute('data-status');
      currentStatusFilter = status;
      currentRenderMode = 'date';
      statusFilterBtn.innerText = option.innerText;
      statusDropdown.style.display = 'none';
      filterAndSortJobs();
    });
  });
}


window.addEventListener('DOMContentLoaded', () => {
  if (sortByDateBtn) {
    sortByDateBtn.click();
  }
});


window.addEventListener('updateJobList', () => {
  selectedDateFrom = window.selectedDateFrom;
  selectedDateTo = window.selectedDateTo;
  filterAndSortJobs();
}); 