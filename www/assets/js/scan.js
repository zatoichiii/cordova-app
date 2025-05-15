document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  const scannerContainer = document.getElementById("scannner");
  if (!scannerContainer) return;

  const scanButton = document.createElement("div");
  scanButton.className = "qr-btn";
  scanButton.innerHTML = `
    <span class="upload-text">Сканировать QR</span>
    <img src="/assets/images/icons/qr-small-ico.svg" class="upload-icon" alt="Облако">
  `;
  scannerContainer.appendChild(scanButton);

  const resultDisplay = document.createElement("div");
  resultDisplay.className = "scan-result";
  scannerContainer.appendChild(resultDisplay);

  scanButton.addEventListener("click", () => {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if (!result.cancelled) {
          resultDisplay.textContent = `Результат: ${result.text}`;
          console.log("Тип кода: " + result.format);
        } else {
          resultDisplay.textContent = "";
        }
      },
      function (error) {
        resultDisplay.textContent = "Ошибка сканирования: " + error;
      },
      {
        preferFrontCamera: false,
        showFlipCameraButton: false,
        showTorchButton: false,
        torchOn: false,
        prompt: "Наведите камеру на QR-код",
        resultDisplayDuration: 0,
        formats: "QR_CODE",
        orientation: "portrait",
      }
    );
  });
}
