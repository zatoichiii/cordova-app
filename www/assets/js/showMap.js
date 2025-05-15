import { JOBS } from '../constants/jobs.js';

let myMap;
let routeControl;
let userCoords = null;

function getCurrentJobFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get('id'));
    return JOBS.find(j => j.id === jobId);
}



function createModal(job) {
    const modal = document.createElement('div');
    modal.className = 'map-modal';
    modal.innerHTML = `
    <div class="map-modal-overlay"></div>
    <div class="map-modal-content">
      <div class="remove-btn-map-modal">×</div>
      <h2 class="map-title">Перемещения по наряду</h2>
      <div id="modalMap" style="height: 400px" class="map-container"></div>
      <div class="flex-modal__elements">
        <p class="map-distance">
        <img src="/assets/images/icons/map-pin-modal.svg" />
        <span id="mapDistance">1,5 км</span>
        </p>
        <button class="map-ok-button">Ок</button>
      </div>
    </div>
  `;
    document.body.appendChild(modal);

    modal.querySelector('.map-ok-button').addEventListener('click', () => {
        closeModal(modal);
    });

    modal.querySelector('.remove-btn-map-modal').addEventListener('click', () => {
        closeModal(modal);
    });

    setTimeout(() => modal.classList.add('show'), 50);
    return modal;
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.remove();
        if (myMap) myMap.destroy();
    }, 300);
}

function initMap(coords, jobCoords) {
    myMap = new ymaps.Map("modalMap", {
        center: coords,
        zoom: 14,
        controls: []
    }, {
        suppressMapOpenBlock: true
    });

    routeControl = new ymaps.multiRouter.MultiRoute({
        referencePoints: [coords, jobCoords],
        params: { routingMode: 'auto' }
    }, {
        boundsAutoApply: true,
        wayPointStartIconLayout: 'empty#layout',
        wayPointFinishIconLayout: 'empty#layout',
        routeActiveStrokeColor: "#12B76A",
        routeActiveStrokeWidth: 5,
        routeActiveOpacity: 1
    });

    routeControl.model.events.add("requestsuccess", function () {
        const activeRoute = routeControl.getActiveRoute();
        if (activeRoute) {
            const distance = activeRoute.properties.get("distance").text;
            document.getElementById("mapDistance").textContent = distance;
        }
    });

    myMap.geoObjects.add(routeControl);
}

function showMapModal() {
    const job = getCurrentJobFromUrl();
    console.log(job);
    if (!job || !job.coords) {
        console.log("Задание не найдено или не содержит координат.");
        return;
    }

    const modal = createModal(job);

    navigator.geolocation.getCurrentPosition(
        (position) => {
            userCoords = [position.coords.latitude, position.coords.longitude];
            ymaps.ready(() => {
                initMap(userCoords, job.coords);
            });
        },
        (error) => {
            alert("Ошибка определения геолокации: " + error.message);
        },
        { enableHighAccuracy: true }
    );
}

document.getElementById("showMapModal").addEventListener("click", showMapModal);
