import { changeToCelc, changeToFahr } from "../scripts/utils/utils.js";
import geolocationUrl from '../scripts/services/geolocation.js';
import secret from "../secret.js";

const toggleState = document.querySelector('#toggle-state');
const selectedMetric = document.querySelector('#selected-metric');

const handleBrowserGeolocation = () => {
    window.navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(`${geolocationUrl}${latitude},${longitude}&key=${secret}`);
        const address = await response.json();

        if(address.plus_code.compound_code.includes('USA') || address.plus_code.compound_code.includes('US')) {
            changeToFahr(selectedMetric);
            toggleState.checked = false;
        } else {
            console.log('não tem');
        }
    });
}
handleBrowserGeolocation();

toggleState.addEventListener('click', (e) => {
    if (!e.target.checked) {
        changeToFahr(selectedMetric);
    }

    if (e.target.checked) {
        changeToCelc(selectedMetric);
    }
});
