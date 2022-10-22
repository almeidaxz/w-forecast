import { changeToCelc, changeToFahr } from "../scripts/utils/utils.js";
import geolocationUrl from '../scripts/services/geolocation.js';
import secret from "../secret.js";

const locationState = document.querySelector('#location-state');
const metricState = document.querySelector('#metric-state');
const selectedMetric = document.querySelector('#selected-metric');

const handleBrowserGeolocation = () => {
    window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(`${geolocationUrl}${latitude},${longitude}&key=${secret}`);
        const address = await response.json();

        if(address.plus_code.compound_code.includes('USA') || address.plus_code.compound_code.includes('US')) {
            changeToFahr(selectedMetric);
            metricState.checked = false;
        } else {
            console.log('não tem');
        }
    }, (err) => {
        if(err.code === 1) {
            locationState.checked = false;
        }
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