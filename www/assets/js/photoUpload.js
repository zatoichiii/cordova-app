document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  const permissions = cordova.plugins.permissions;
  const requiredPermissions = [
    permissions.CAMERA,
    permissions.READ_EXTERNAL_STORAGE,
    permissions.WRITE_EXTERNAL_STORAGE,
  ];

  permissions.hasPermission(requiredPermissions, function (status) {
    if (status.hasPermission) {
      console.log("Все разрешения уже есть");
    } else {
      permissions.requestPermissions(requiredPermissions, function (status) {
        if (status.hasPermission) {
          console.log("Разрешения получены");
        } else {
          console.error("Не получены все необходимые разрешения.");
        }
      }, function () {
        console.error("Ошибка при запросе разрешений");
      });
    }
  }, function () {
    console.error("Ошибка при проверке разрешений");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const modalHtml = `
    <div id="photoModal" class="photo-modal" style="display: none;">
      <span class="photo-modal-close">&times;</span>
      <img class="photo-modal-content" id="photoModalImg">
    </div>

    <div id="photoSourceModal" class="photo-source-modal" style="display: none;">
      <div class="photo-source-content">
        <button id="chooseCamera" class="photo-source-btn">Сделать фото</button>
        <button id="chooseGallery" class="photo-source-btn second">Выбрать из галереи</button>
        <button id="cancelPhotoChoice" class="photo-source-cancel">Отмена</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const style = document.createElement("style");
  style.innerHTML = `

  `;
  document.head.appendChild(style);

  const modal = document.getElementById("photoModal");
  const modalImg = document.getElementById("photoModalImg");
  const closeBtn = document.querySelector(".photo-modal-close");

  closeBtn.onclick = () => (modal.style.display = "none");
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };

  document.querySelectorAll(".photo-upload").forEach(container => {
    addUploadButton(container);
  });
});

function addUploadButton(container) {
  const button = document.createElement("div");
  button.className = "upload-btn";
  button.innerHTML = `
    <span class="upload-text">Загрузить файл</span>
    <img src="/assets/images/icons/cloud.svg" class="upload-icon" alt="Облако" />
  `;
  container.appendChild(button);

  button.addEventListener("click", () => {
    uploadPhoto(container, button);
  });
}

function uploadPhoto(container, button) {
  const sourceModal = document.getElementById("photoSourceModal");
  sourceModal.style.display = "flex";

  const cleanup = () => {
    sourceModal.style.display = "none";
  };

  const handleChoice = (sourceType) => {
    navigator.camera.getPicture(
      function (base64Data) {
        if (base64Data.startsWith('data:image')) {
          base64Data = base64Data.split(',')[1];
        }
        addPhotoPreview(container, base64Data);
        button.remove();
        addUploadButton(container);
        cleanup();
      },
      function (message) {
        console.error("Ошибка при получении изображения: " + message);
        cleanup();
      },
      {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: sourceType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: false,
      }
    );
  };

  document.getElementById("chooseCamera").onclick = () => handleChoice(Camera.PictureSourceType.CAMERA);
  document.getElementById("chooseGallery").onclick = () => handleChoice(Camera.PictureSourceType.PHOTOLIBRARY);
  document.getElementById("cancelPhotoChoice").onclick = cleanup;
}

function addPhotoPreview(container, base64Data) {
  let previewContainer = container.querySelector(".photo-preview");
  if (!previewContainer) {
    previewContainer = document.createElement("div");
    previewContainer.className = "photo-preview";
    container.insertBefore(previewContainer, container.querySelector(".upload-btn"));
  }

  const thumb = document.createElement("div");
  thumb.className = "photo-thumb";
  thumb.innerHTML = `
    <img class="preview-image" src="data:image/jpeg;base64,${base64Data}" />
    <div class="remove-btn">&times;</div>
  `;

  thumb.querySelector(".preview-image").addEventListener("click", () => {
    const modal = document.getElementById("photoModal");
    const modalImg = document.getElementById("photoModalImg");
    modalImg.src = `data:image/jpeg;base64,${base64Data}`;
    modal.style.display = "flex";
  });

  thumb.querySelector(".remove-btn").addEventListener("click", () => {
    thumb.remove();
  });

  previewContainer.appendChild(thumb);
}