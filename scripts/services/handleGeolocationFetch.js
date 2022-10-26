import { googleKey } from "../../secret.js";
import { geolocationByCoods } from './APIs/geolocationUrl.js';
import { handleWeatherFetch } from "./handleWeatherFetch.js";
import { changeToFahr } from "../utils/utils.js";

export const handleGeolocationFetch = async (latitude, longitude, selectedMetric, metricState, metricText) => {
    const response = await fetch(`${geolocationByCoods}${latitude},${longitude}&key=${googleKey}`);
    const address = await response.json();

    if (address.plus_code.compound_code.includes('USA') || address.plus_code.compound_code.includes('US')) {
        changeToFahr(selectedMetric, metricText);
        metricState.checked = false;
    }

    handleWeatherFetch(latitude, longitude, selectedMetric.innerHTML);
}