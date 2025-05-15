import { JOBS, STATUS_ICONS, STATUS_COLORS } from '../constants/jobs.js';

let currentRouteIndex = 0;
let routePolyline;
let driverMarker;
let isFirstLocation = true;
let animationInterval;
let myMap;
let userCoords = null;
let routeControl;
let currentJobForRoute = null;

window.init = function () {
  myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 10,
    controls: []
  }, {
    suppressMapOpenBlock: true
  });

  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        userCoords = [latitude, longitude];

        if (!driverMarker) {
          driverMarker = new ymaps.Placemark(userCoords, {}, {
            iconLayout: 'default#image',
            iconImageHref: './assets/images/icons/pins/active-pin.png',
            iconImageSize: [30, 30],
            iconImageOffset: [-12, -12]
          });
          myMap.geoObjects.add(driverMarker);
        } else {
          driverMarker.geometry.setCoordinates(userCoords);
        }

        if (isFirstLocation) {
          myMap.setCenter(userCoords, 15);
          isFirstLocation = false;
        }

        if (currentJobForRoute) {
          updateRoute(currentJobForRoute);
        }

      },
      function (error) {
        console.error("Ошибка получения геолокации:", error.message);
        alert("Ошибка получения геолокации: " + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

  }

  JOBS.forEach(job => {
    const iconUrl = STATUS_COLORS[job.status];

    const placemark = new ymaps.Placemark(job.coords, {
      hintContent: job.title
    }, {
      iconLayout: 'default#image',
      iconImageHref: iconUrl,
      iconImageSize: [24, 45],
      iconImageOffset: [-15, -40]
    });

    placemark.events.add('click', () => {
      showModal(job);
    });

    myMap.geoObjects.add(placemark);
  });
};


function formatDateWithoutYear(dateStr) {
  const months = [
    'января', 'февраля', 'марта',
    'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября',
    'октября', 'ноября', 'декабря'
  ];

  const [year, month, day] = dateStr.split('-');
  const monthIndex = parseInt(month, 10) - 1;

  return `${parseInt(day, 10)} ${months[monthIndex]}`;
}


function showModal(job) {
  const modal = document.createElement('div');
  modal.className = 'job-modal';

  modal.innerHTML = `
  <div class="job-modal-line"></div>
  <div class="job-modal-content">
  <p class="job-modal__id">#${job.id}</p>
    <h3 class="job-modal__title">${job.title}</h3>
    <div class="job-modal__item">
    <img src="./assets/images/icons/map-pin-gray.svg"/>
    ${job.address}
    </div>
    <div class="map__inline-flex-info">
      <div class="job-modal__item-flex">
        <img src="./assets/images/icons/calendar-gray.svg"/>
        ${job.timeStart} – ${job.timeEnd}, ${formatDateWithoutYear(job.date)}
      </div>
    <div class="job-modal__item-flex">
      <img style="width: 12px; height: auto" src="./assets/images/icons/profile-nav.svg"/>
      ${job.person}
    </div>
    </div>

    <div class="modal-buttons">
      <a href="/job.html?id=${job.id}" class="modal-btn">Подробнее о наряде</a>
      <button class="modal-btn start-route-btn">
      <span>Выехать</span>
      <img src="./assets/images/icons/navigation-white-ico.svg" />
      </button>
    </div>
  </div>
`;

  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add('show'), 50);

  modal.querySelector('.start-route-btn').addEventListener('click', () => {
    if (!userCoords) {
      alert('Геолокация не определена');
      return;
    }

    if (routeControl) myMap.geoObjects.remove(routeControl);
    if (driverMarker) myMap.geoObjects.remove(driverMarker);
    if (animationInterval) clearInterval(animationInterval);

    const multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [userCoords, job.coords],
      params: {
        routingMode: 'auto',
        wayPointsGeometries: []
      }
    }, {
      boundsAutoApply: true,
      routeActiveStrokeWidth: 5,
      routeActiveStrokeColor: "#12B76A",
      routeActiveOpacity: 1,
      routeVisible: true,
      editorDrawOver: false,

      wayPointStartIconLayout: 'default#image',
      wayPointStartIconImageHref: '',
      wayPointStartIconImageSize: [1, 1],

      wayPointFinishIconLayout: 'default#image',
      wayPointFinishIconImageHref: '',
      wayPointFinishIconImageSize: [1, 1]
    });

    routeControl = multiRoute;
    myMap.geoObjects.add(multiRoute);

    const startPlacemark = new ymaps.Placemark(userCoords, {}, {
      iconLayout: 'default#image',
      iconImageHref: './assets/images/icons/pins/green-start.png',
      iconImageSize: [16, 16],
      iconImageOffset: [-12, -12]
    });

    const endPlacemark = new ymaps.Placemark(job.coords, {}, {
      iconLayout: 'default#image',
      iconImageHref: './assets/images/icons/pins/green-end.png',
      iconImageSize: [16, 16],
      iconImageOffset: [-12, -12]
    });

    myMap.geoObjects.add(startPlacemark);
    myMap.geoObjects.add(endPlacemark);

    driverMarker = new ymaps.Placemark(userCoords, {}, {
      iconLayout: 'default#image',
      iconImageHref: './assets/images/icons/pins/active-pin.png',
      iconImageSize: [16, 16],
      iconImageOffset: [-12, -12]
    });
    myMap.geoObjects.add(driverMarker);
  });


  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal(modal);
  });

  let startY = 0;
  modal.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
  });

  modal.addEventListener('touchend', e => {
    const endY = e.changedTouches[0].clientY;
    if (endY - startY > 50) {
      closeModal(modal);
    }
  });
}

function closeModal(modal) {
  modal.classList.remove('show');
  setTimeout(() => modal.remove(), 300);
}
