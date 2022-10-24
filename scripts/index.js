import { changeToCelc, changeToFahr } from "../scripts/utils/utils.js";
import { geolocationByCoods, geolocationByAddress } from '../scripts/services/geolocation.js';
import weather from "./services/weather.js";
import { googleKey, weatherKey } from "../secret.js";

const metricState = document.querySelector('#metric-state');
const selectedMetric = document.querySelector('#selected-metric');
const locationInput = document.querySelector('#location-input');
const optionsWrapper = document.querySelector('.options-wrapper');
const weatherContentWrapper = document.querySelector('#weather-content-wrapper');

let latitude, longitude;

const getCurrentWeather = async () => {
    const response = await fetch(`${weather}/${latitude},${longitude}/next5days?key=${weatherKey}`);
    const weathers = await response.json();
    console.log(weathers);

    if(!weathers.days.length) return;

    weathers.days.map((day) => {
        console.log(day);
        const dayWeather = document.createElement('div');
        dayWeather.textContent = day.temp;
        dayWeather.classList.add('day-weather');
        weatherContentWrapper.append(dayWeather);
    });
}

(() => {
    const localLat = localStorage.getItem('latitude');
    const localLong = localStorage.getItem('longitude');

    if(localLat && localLong) {
        latitude = localLat;
        longitude = localLong;
        getCurrentWeather();
        return;
    }

    window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: long } = position.coords;
        latitude = lat;
        longitude = long;
        localStorage.setItem('latitude', lat);
        localStorage.setItem('longitude', long);

        const response = await fetch(`${geolocationByCoods}${lat},${long}&key=${googleKey}`);
        const address = await response.json();

        if (address.plus_code.compound_code.includes('USA') || address.plus_code.compound_code.includes('US')) {
            changeToFahr(selectedMetric);
            metricState.checked = false;
        }

        getCurrentWeather();
    });
})();

metricState.addEventListener('click', (e) => {
    if (!e.target.checked) {
        changeToFahr(selectedMetric);
    }

    if (e.target.checked) {
        changeToCelc(selectedMetric);
    }
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