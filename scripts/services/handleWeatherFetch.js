import { weatherKey } from "../../secret.js";
import weatherUrl from "./APIs/weatherUrl.js";
import { formatToCelc, formatDayNumberToString } from "../utils/utils.js";

const weatherContentWrapper = document.querySelector('#weather-content-wrapper');

export const handleWeatherFetch = async (latitude, longitude, temperatureMetric) => {
    const response = await fetch(`${weatherUrl}/${latitude},${longitude}/next5days?key=${weatherKey}`);
    const weathers = await response.json();

    if (!weathers.days.length) return;

    weathers.days.map((day) => {
        const dailyWeatherWrapper = document.createElement('div');
        const dayAndTemperatureWrapper = document.createElement('div');
        const currentDayTemperature = document.createElement('h1');
        const weekDay = document.createElement('h2');
        const conditions = document.createElement('span');

        dailyWeatherWrapper.classList.add('daily-weather', 'column', 'align-center', 'space-btw');
        dayAndTemperatureWrapper.classList.add('column-reverse', 'align-center', 'gap-5');

        
        currentDayTemperature.innerHTML = `${day.temp.toFixed(0)} <sup>&deg;F</sup>`;

        if(temperatureMetric === '°C') {
            currentDayTemperature.innerHTML = `${formatToCelc(day.temp)} <sup>&deg;C</sup>`;
        }

        weekDay.textContent = formatDayNumberToString(day.datetime);
        conditions.textContent = day.conditions;
        
        if (day === weathers.days[0]) {
            dailyWeatherWrapper.classList.remove('daily-weather');
            dailyWeatherWrapper.classList.add('todays-weather');

            dayAndTemperatureWrapper.classList.add('column-reverse', 'align-center', 'gap-5');
            currentDayTemperature.classList.add('todays-temperature');
            weekDay.classList.add('todays-weekday');
            conditions.classList.add('todays-condition');
        }

        dayAndTemperatureWrapper.append(conditions);
        dayAndTemperatureWrapper.append(weekDay);
        dayAndTemperatureWrapper.append(currentDayTemperature);
        dailyWeatherWrapper.append(dayAndTemperatureWrapper)
        weatherContentWrapper.append(dailyWeatherWrapper);
    });
}