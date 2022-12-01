import { googleKey } from "../../secret.js";
import { geolocationByCoods } from './APIs/geolocationUrl.js';
import { handleWeatherFetch } from "./handleWeatherFetch.js";
import { changeTemperatureUnit } from "../utils/utils.js";

export const handleGeolocationFetch = async (latitude, longitude, selectedMetric, metricState, metricText) => {
    const response = await fetch(`${geolocationByCoods}${latitude},${longitude}&language=en&key=${googleKey}`);
    const address = await response.json();

    const splitedAddress = address.plus_code.compound_code.split(', ');
    const removedUselessData = splitedAddress[0].split(' ').splice(1).join().replaceAll(',', ' ');
    const formatedAdress = [removedUselessData, splitedAddress.splice(1)].join().replaceAll(',', ', ');

    if (address.plus_code.compound_code.includes('USA') || address.plus_code.compound_code.includes('US') || address.plus_code.compound_code.includes('EUA')) {
        changeTemperatureUnit(selectedMetric, metricText, address.plus_code.compound_code);
        metricState.checked = false;
    }

    handleWeatherFetch(latitude, longitude, metricText, formatedAdress);
}