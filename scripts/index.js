import { changeToCelc, changeToFahr } from "../scripts/utils/utils.js";

const toggleState = document.querySelector('#toggle-state');
const selectedMetric = document.querySelector('#selected-metric');

toggleState.addEventListener('click', (e) => {
    if (!e.target.checked) {
        changeToFahr(selectedMetric);
    }

    if (e.target.checked) {
        changeToCelc(selectedMetric);
    }
});
