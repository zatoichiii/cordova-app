import { JOBS } from '../constants/jobs.js';

const urlParams = new URLSearchParams(window.location.search);
const jobId = parseInt(urlParams.get('id'));
const job = JOBS.find(j => j.id === jobId);

const container = document.getElementById('job-info');
const jobIdText = document.getElementById('job-id');
const jobFinishUpperText = document.getElementById('nameOfFinish');

if (job) {
    jobIdText.innerHTML = `
    <p>№${job.id}</p>
`
    jobFinishUpperText.innerHTML = `
            <p>${job.title}</p>
            `
    container.innerHTML = `
          <div class="job-detai__item">
            <div class="job-detail__title">Выберите резолюцию</div>
            <div class="custom-select">
              <div class="select-header" id="admin-select-header">
                <span id="admin-selected-option">Не выполнен</span>
                <span class="arrow" id="admin-arrow-icon">
                  <img src="./assets/images/icons/chevron-up.svg" />
                </span>
              </div>
              <ul class="select-options" id="admin-select-options"></ul>
            </div>
          </div>

        <div class="job-detai__item">
            <div class="job-detail__title">Комментарий</div>
            <textarea placeholder="Добавить описание..." style="min-height: 154px" name="comment" class="job-detail__input" type="text"></textarea>
          </div>

      `;
} else {
    console.warn('Задание не найдено');
}


