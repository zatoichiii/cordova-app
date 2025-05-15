document.addEventListener("deviceready", () => {
    const container = document.getElementById("qrPay");

    if (!container) return;

    // Добавляем контейнер модалки
    const modalHtml = `
    <div id="qrModal" class="qr-modal" style="display: none;">
      <div class="qr-modal-content">
      <img src="/assets/images/icons/qrModal.svg">
        <div class="qr-modal-title">QR-код для оплаты</div>
        <div class="qr-modal-text">Наведите камеру на QR-код, чтобы оплатить, или скачайте файл по кнопке ниже.</div>
        <span class="qr-modal-close">&times;</span>
        <img id="qrModalMain" class="qr-modal-main-image" src="" alt="QR Image">
        <button id="downloadQrBtn" class="qr-download-btn">
        <span>Скачать файл</span>
        <img src="/assets/images/icons/qrModalDownload.svg" alt=""/>
        </button>
      </div>
    </div>
  `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    container.innerHTML = `
    <div class="accordion">
      <div class="accordion-header">
        <div class="accordion-title">Оплата по QR-коду</div>
        <div class="accordion-toggle">
          <img src="./assets/images/icons/chevron-up.svg" class="chevron-icon">
        </div>
      </div>
      <div class="accordion-content" style="display: none;">
        <div class="job-detai__item">
          <div class="job-detail__title">Кто получатель оплаты (юр. лицо)</div>
          <input class="job-detail__input" type="text" />
        </div>

        <div class="job-detai__item">
          <div class="job-detail__title">Общая стоимость услуг</div>
          <input name="allPay" class="job-detail__input" type="text" placeholder="₽ 00.0" />
        </div>

        <div class="qr-btn" id="generateQrBtn">
          <span class="upload-text">Сгенерировать QR-код</span>
          <img src="/assets/images/icons/qr-code-pay.svg" class="upload-icon" alt="QR" />
        </div>

        <div id="qrResultList" class="qr-result-list"></div>
      </div>
    </div>
  `;

    const header = container.querySelector(".accordion-header");
    const content = container.querySelector(".accordion-content");
    const chevron = container.querySelector(".chevron-icon");

    header.addEventListener("click", () => {
        const isOpen = content.style.display === "block";
        content.style.display = isOpen ? "none" : "block";
        chevron.classList.toggle("rotated", !isOpen);
    });

    const qrButton = container.querySelector("#generateQrBtn");
    const qrList = container.querySelector("#qrResultList");

    const modal = document.getElementById("qrModal");
    const modalImg = document.getElementById("qrModalMain");
    const closeBtn = document.querySelector(".qr-modal-close");
    const downloadBtn = document.getElementById("downloadQrBtn");

    qrButton.addEventListener("click", () => {
        const inputs = container.querySelectorAll(".job-detail__input");
        const recipient = inputs[0].value.trim();
        const amount = inputs[1].value.trim();

        if (!recipient || !amount) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        const qrText = `Получатель: ${recipient}\nСумма: ${amount}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrText)}&size=200x200`;

        // Обёртка для блока QR + кнопки
        const qrItem = document.createElement("div");
        qrItem.className = "qr-item-block";

        const qrImg = document.createElement("img");
        qrImg.src = qrUrl;
        qrImg.className = "qr-image";
        qrImg.style.cursor = "pointer";

        qrImg.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = qrUrl;

            downloadBtn.onclick = () => {
                const link = document.createElement("a");
                link.href = qrUrl;
                link.download = "qr-code.png";
                link.click();
            };
        });

        const actions = document.createElement("div");
        actions.className = "qr-actions";

        const download = document.createElement("button");
        download.className = "qr-download-btn-right";
        download.innerHTML = `<span>Скачать файл</span><img src="/assets/images/icons/qrModalDownloadBlack.svg" alt=""/>`;
        download.onclick = () => {
            const link = document.createElement("a");
            link.href = qrUrl;
            link.download = "qr-code.png";
            link.click();
        };

        const check = document.createElement("button");
        check.className = "qr-check-btn";
        check.innerText = "Проверить";

        const result = document.createElement("div");
        result.className = "qr-check-result";

        check.addEventListener("click", () => {
            result.textContent = "Проверка...";
            result.className = "qr-check-result checking";

            setTimeout(() => {
                const isSuccess = Math.random() < 0.5;
                if (isSuccess) {
                    result.textContent = "Оплата прошла успешно";
                    result.className = "qr-check-result success";
                } else {
                    result.textContent = "Отклонено";
                    result.className = "qr-check-result failed";
                }
            }, 2000 + Math.random() * 1000);
        });

        actions.appendChild(download);
        actions.appendChild(check);
        actions.appendChild(result);

        qrItem.appendChild(qrImg);
        qrItem.appendChild(actions);
        qrList.appendChild(qrItem);
    });


    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});
