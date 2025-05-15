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
        <p><strong>Задание:</strong> ${job.title}</p>
        <p><strong>Адрес:</strong> ${job.address}</p>
        <p><strong>Дата:</strong> ${job.date}</p>
        <p><strong>Время:</strong> ${job.timeStart} – ${job.timeEnd}</p>
        <p><strong>Статус:</strong> Завершено</p>
      `;
} else {
    container.innerHTML = `<p style="color:red;">Задание не найдено</p>`;
}

document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = '/index.html';
});