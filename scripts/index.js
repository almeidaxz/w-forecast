import { changeToCelc, changeToFahr } from "../scripts/utils/utils.js";
import { geolocationByCoods, geolocationByAddress } from '../scripts/services/geolocation.js';
import weather from "./services/weather.js";
import { googleKey, weatherKey } from "../secret.js";

const metricState = document.querySelector('#metric-state');
const selectedMetric = document.querySelector('#selected-metric');
const locationInput = document.querySelector('#location-input');
const optionsWrapper = document.querySelector('.options-wrapper');

let latitude, longitude;

(() => {
    window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: long } = position.coords;
        latitude = lat;
        longitude = long;

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
    const currentValue = e.target.value;
    const response = await fetch(`${geolocationByAddress}${currentValue}&key=${googleKey}`);
    const searchByAddress = await response.json();

    searchByAddress.results.map((result) => {
        const option = document.createElement('span');
        option.textContent = result.formatted_address;
        option.classList.add('option')
        optionsWrapper.append(option);
    });
}

const handleFetchAddress = _.debounce(getAddress, 500);

locationInput.addEventListener('keydown', (e) =>  handleFetchAddress(e));

if (latitude && longitude) {
    getCurrentWeather();
}

const getCurrentWeather = async () => {
    const response = await fetch(`${weather}/${latitude},${longitude}/next5days?key=${weatherKey}`);
    const weathers = await response.json();
    console.log(weathers);
}