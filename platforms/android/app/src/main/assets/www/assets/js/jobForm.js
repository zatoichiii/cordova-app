import { DIAGNOSES, ADMINS, STATUSES, PARAMEDICS, COMPLEX } from '../constants/main.js';

document.querySelectorAll('input[name="price"], input[name="allPay"], input[name="zoom"], input[name="bads"], input[name="prepayment"]').forEach(input => {
  input.addEventListener('input', () => {
    let value = input.value.replace(/[^\d,]/g, '');

    input.value = value ? `₽ ${value}` : '';
  });

  input.addEventListener('focus', () => {
    input.value = input.value.replace('₽ ', '');
  });

  input.addEventListener('blur', () => {
    if (input.value.trim() !== '') {
      input.value = `₽ ${input.value.replace(/[^\d,]/g, '')}`;
    }
  });
});


document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

    btn.classList.add('active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.remove('hidden');
  });
});
const form = document.getElementById('job-report-form');
if (form) {
document.getElementById('job-report-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const report = {
    comment: formData.get('comment'),
    status: formData.get('status'),
    jobId: new URLSearchParams(window.location.search).get('id'),
    timestamp: new Date().toISOString()
  };

  try {
    const res = await fetch('https://your-api.com/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    });

    if (res.ok) {
      alert('Отчет отправлен!');
      e.target.reset();
    } else {
      throw new Error('Ошибка при отправке отчета');
    }
  } catch (err) {
    alert(err.message);
  }
});
}




document.addEventListener("DOMContentLoaded", function () {
  function setupCustomSelect(list, headerId, optionsId, selectedId, arrowId) {
    const header = document.getElementById(headerId);
    const options = document.getElementById(optionsId);
    const selected = document.getElementById(selectedId);
    const arrow = document.getElementById(arrowId);

    if (list && list.length > 0) {
      options.innerHTML = '';
      list.forEach(item => {
        const li = document.createElement('li');
        li.setAttribute('data-value', item.id);
        li.textContent = item.name;
        options.appendChild(li);
      });
    }

    header.addEventListener("click", () => {
      options.classList.toggle("show");
      header.classList.toggle("open");
    });

    options.addEventListener("click", (e) => {
      if (e.target.tagName === 'LI') {
        options.querySelectorAll('li').forEach(li => li.classList.remove("active"));
        e.target.classList.add("active");
        selected.textContent = e.target.textContent;
        selected.dataset.value = e.target.getAttribute("data-value");
        options.classList.remove("show");
        header.classList.remove("open");
      }
    });

    document.addEventListener("click", (e) => {
      if (!header.contains(e.target) && !options.contains(e.target)) {
        options.classList.remove("show");
        header.classList.remove("open");
      }
    });
  }

  setupCustomSelect(ADMINS, "admin-select-header", "admin-select-options", "admin-selected-option", "admin-arrow-icon");
  setupCustomSelect(PARAMEDICS, "paramedic-select-header", "paramedic-select-options", "paramedic-selected-option", "paramedic-arrow-icon");
  setupCustomSelect(STATUSES, "status-select-header", "status-select-options", "status-selected-option", "status-arrow-icon");
  setupCustomSelect(COMPLEX, "complex-select-header", "complex-select-options", "complex-selected-option", "complex-arrow-icon");
  setupCustomSelect(DIAGNOSES, "diagnosis-select-header", "diagnosis-select-options", "diagnosis-selected-option", "diagnosis-arrow-icon");
});