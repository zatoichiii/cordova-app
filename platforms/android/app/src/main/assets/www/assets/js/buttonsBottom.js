document.getElementById('start-button-bototm').addEventListener('click', () => {
  const startBtn = document.getElementById('start-button-bototm');
  const isStarted = startBtn.dataset.started === 'true';

  if (isStarted) {
    const confirmModal = document.createElement('div');
    confirmModal.className = 'start-modal';
    confirmModal.innerHTML = `
      <div class="start-modal-overlay"></div>
      <div class="start-modal-content">
        <img src="/assets/images/icons/completed.svg" class="modal-icon" />
        <p class="modal-text">Точно завершить работу по наряду?</p>
        <div class="modal-actions">
          <button class="modal-cancel">Отменить</button>
          <button class="modal-finish">Завершить</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmModal);
    setTimeout(() => confirmModal.classList.add('show'), 50);

    confirmModal.querySelector('.modal-cancel').addEventListener('click', () => confirmModal.remove());

    confirmModal.querySelector('.modal-finish').addEventListener('click', () => {
      const jobId = new URLSearchParams(window.location.search).get('id');
      window.location.href = `job-finish.html?id=${jobId}`;
    });

    return;
  }

  const modal = document.createElement('div');
  modal.className = 'start-modal';
  modal.innerHTML = `
    <div class="start-modal-overlay"></div>
    <div class="start-modal-content">
      <img src="/assets/images/icons/start-ico-modal.svg" class="modal-icon" />
      <p class="modal-text">Приступить к работе по наряду?</p>
      <div class="modal-actions">
        <button class="modal-cancel">Отменить</button>
        <button class="modal-start">Начать</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 50);

  modal.querySelector('.modal-cancel').addEventListener('click', () => modal.remove());

  modal.querySelector('.modal-start').addEventListener('click', () => {
    modal.remove();
    startBtn.innerHTML = `
      <span>Завершить</span>
      <img src="/assets/images/icons/done-ico.svg" alt=""/>
    `;
    startBtn.dataset.started = 'true';

    const footer = document.querySelector('.job-footer');
    const dotButton = document.createElement('div');
    dotButton.className = 'more-options-button';
    dotButton.innerHTML = `⋮`;
    footer.insertBefore(dotButton, footer.firstChild);

    const slideMenu = document.createElement('div');
    slideMenu.className = 'slide-menu';
    slideMenu.innerHTML = `
      <button class="slide-action" data-action="pause">Приостановить</button>
      <button class="slide-action" data-action="cancel">Отменить</button>
    `;
    document.body.appendChild(slideMenu);

    let menuVisible = false;
    dotButton.addEventListener('click', (e) => {
      e.stopPropagation();
      menuVisible = !menuVisible;
      slideMenu.classList.toggle('visible', menuVisible);
    });

    document.addEventListener('click', (e) => {
      if (!slideMenu.contains(e.target) && !dotButton.contains(e.target)) {
        slideMenu.classList.remove('visible');
        menuVisible = false;
      }
    });

    slideMenu.querySelectorAll('.slide-action').forEach(btn => {
      btn.addEventListener('click', () => {
        slideMenu.querySelectorAll('.slide-action').forEach(b => {
          b.innerHTML = b.dataset.action === 'pause' ? 'Приостановить' : 'Отменить';
        });

        const label = btn.dataset.action === 'pause' ? 'Приостановить' : 'Отменить';
        btn.innerHTML = `${label} <img src="/assets/images/icons/done-ico-purple.svg" alt=""/>`;
      });
    });
  });
});
