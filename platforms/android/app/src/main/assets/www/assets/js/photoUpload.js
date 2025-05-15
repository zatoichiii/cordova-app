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
        }
      }, function () {
        alert("Ошибка при запросе разрешений");
      });
    }
  }, function () {
    alert("Ошибка при проверке разрешений");
  });
}

document.addEventListener("DOMContentLoaded", () => {
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
  navigator.camera.getPicture(
    function (base64Data) {
      if (base64Data.startsWith('data:image')) {
        base64Data = base64Data.split(',')[1];
      }

      addPhotoPreview(container, base64Data);

      button.remove();

      addUploadButton(container);
    },
    function (message) {
      console.error("Ошибка при получении изображения: " + message);
    },
    {
      quality: 80,
      destinationType: Camera.DestinationType.DATA_URL, // base64
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
    }
  );
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
    <img src="data:image/jpeg;base64,${base64Data}" />
    <div class="remove-btn">&times;</div>
  `;

  thumb.querySelector(".remove-btn").addEventListener("click", () => {
    thumb.remove();
  });

  previewContainer.appendChild(thumb);
}
