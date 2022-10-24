import { changeToCelc, changeToFahr } from "../scripts/utils/utils.js";
import { googleKey } from "../secret.js";
import { geolocationByAddress } from './services/APIs/geolocationUrl.js';
import { handleGeolocationFetch } from "./services/handleGeolocationFetch.js";

const metricState = document.querySelector('#metric-state');
const selectedMetric = document.querySelector('#selected-metric');
const locationInput = document.querySelector('#location-input');
const optionsWrapper = document.querySelector('.options-wrapper');

let latitude, longitude;

(async () => {
    const localLat = localStorage.getItem('latitude');
    const localLong = localStorage.getItem('longitude');

    if (localLat && localLong) {
        latitude = localLat;
        longitude = localLong;

        handleGeolocationFetch(latitude, longitude, selectedMetric, metricState);
        return;
    }

    window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: long } = position.coords;
        latitude = lat;
        longitude = long;
        localStorage.setItem('latitude', lat);
        localStorage.setItem('longitude', long);

        handleGeolocationFetch(latitude, longitude, selectedMetric, metricState);
    });
})();

metricState.addEventListener('click', (e) => {
    if (!e.target.checked) {
        changeToFahr(selectedMetric);
        return;
    }

    changeToCelc(selectedMetric);
});

const getAddress = async (e) => {
    if (e.target.value === '' || e.target.value.trim() === '') {
        optionsWrapper.classList.add('hidden');
        return;
    };

    optionsWrapper.classList.remove('hidden');
    const currentValue = e.target.value;
    const response = await fetch(`${geolocationByAddress}${currentValue}&key=${googleKey}`);
    const searchByAddress = await response.json();

    if (!searchByAddress.results.length) return;

    const option = document.querySelector('.option');

    if (!option) {
        const option = document.createElement('span');
        option.textContent = searchByAddress.results[0].formatted_address;
        option.classList.add('option')
        optionsWrapper.append(option);

        option.addEventListener('click', (e) => {
            locationInput.value = e.target.textContent;
            option.remove();
        });
        return;
    }

    option.textContent = searchByAddress.results[0].formatted_address;
}
const handleFetchAddress = _.debounce(getAddress, 500);

locationInput.addEventListener('keydown', (e) => handleFetchAddress(e));