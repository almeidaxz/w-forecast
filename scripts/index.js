import { changeToCelc, changeToFahr } from "../scripts/utils/utils.js";
import geolocationUrl from '../scripts/services/geolocation.js';
import weather from "./services/weather.js";
import { googleKey, weatherKey } from "../secret.js";

const metricState = document.querySelector('#metric-state');
const selectedMetric = document.querySelector('#selected-metric');

let latitude, longitude;

const handleBrowserGeolocation = () => {
    window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude: lat, longitude: long } = position.coords;
        latitude = lat;
        longitude = long;

        const response = await fetch(`${geolocationUrl}${lat},${long}&key=${googleKey}`);
        const address = await response.json();

        if (address.plus_code.compound_code.includes('USA') || address.plus_code.compound_code.includes('US')) {
            changeToFahr(selectedMetric);
            metricState.checked = false;
        }

        getCurrentWeather();
    });
}
handleBrowserGeolocation();

metricState.addEventListener('click', (e) => {
    if (!e.target.checked) {
        changeToFahr(selectedMetric);
    }

    if (e.target.checked) {
        changeToCelc(selectedMetric);
    }
});

if (latitude && longitude) {
}
const getCurrentWeather = async () => {
    const response = await fetch(`${weather}lat=${latitude}&lon=${longitude}&appid=${weatherKey}`);
    const teste = await response.json();
    console.log(teste);
}