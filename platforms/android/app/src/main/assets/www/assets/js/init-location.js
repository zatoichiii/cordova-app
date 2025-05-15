document.addEventListener("deviceready", function () {
  cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
    if (!enabled) {
      alert("Геолокация отключена. Пожалуйста, включите её в настройках.");
      return;
    }

    cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
      if (
        status === cordova.plugins.diagnostic.permissionStatus.GRANTED ||
        status === cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
      ) {
        ymaps.ready(init);
      } else {
        alert("Приложению нужен доступ к геолокации для работы карты.");
      }
    }, function (error) {
      console.error("Ошибка запроса разрешения:", error);
    }, cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);

  }, function (error) {
    console.error("Ошибка проверки геолокации:", error);
  });
});
