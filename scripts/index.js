import { changeToCelc, changeToFahr } from "../scripts/utils/utils.js";

const toggleState = document.querySelector('#toggle-state');
const selectedMetric = document.querySelector('#selected-metric');

let latitude, longitude;

(() => {
    window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: long } = position.coords;

        latitude = lat;
        longitude = long;
    });
})()

toggleState.addEventListener('click', (e) => {
    console.log(latitude, longitude);
    if (!e.target.checked) {
        changeToFahr(selectedMetric);
    }

    if (e.target.checked) {
        changeToCelc(selectedMetric);
    }
});
