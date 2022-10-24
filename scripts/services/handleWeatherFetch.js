import { weatherKey } from "../../secret.js";
import weatherUrl from "./APIs/weatherUrl.js";
import { formatToCelc, formatDayNumberToString, formatMilesToKMh } from "../utils/utils.js";

const weatherContentWrapper = document.querySelector('#weather-content-wrapper');

export const handleWeatherFetch = async (latitude, longitude, temperatureMetric) => {
    const response = await fetch(`${weatherUrl}/${latitude},${longitude}/next5days?key=${weatherKey}`);
    const weathers = await response.json();

    if (!weathers.days.length) return;

    console.log(weathers);

    weathers.days.map((day) => {
        const dailyWeatherWrapper = document.createElement('div');
        const dayAndTemperatureWrapper = document.createElement('div');
        const currentDayTemperature = document.createElement('h1');
        const weekDay = document.createElement('h2');
        const conditions = document.createElement('span');
        const weatherInformationWrapper = document.createElement('div');
        const feelsLikeWrapper = document.createElement('div');
        const minAndMaxWrapper = document.createElement('div');
        const humidityWrapper = document.createElement('div'); 
        const precipitationWrapper = document.createElement('div');
        const windSpeedWrapper = document.createElement('div');

        feelsLikeWrapper.innerHTML = `Feels Like ${day.temp}<sup>&deg;F</sup>`;
        minAndMaxWrapper.innerHTML = `Min/Max ${day.tempmax}<sup>&deg;F</sup>/${day.tempmin}<sup>&deg;F</sup>`;
        humidityWrapper.textContent = `Humidity ${day.humidity.toFixed(0)}%`;
        precipitationWrapper.textContent = `Precipitation Probability ${day.precipprob.toFixed(0)}%`;
        windSpeedWrapper.textContent = `Wind Speed ${day.windspeed}mi/h`;


        dailyWeatherWrapper.classList.add('daily-weather', 'column', 'align-center', 'space-around');
        dayAndTemperatureWrapper.classList.add('column-reverse', 'align-center', 'gap-5');
        
        currentDayTemperature.innerHTML = `${day.temp.toFixed(0)} <sup>&deg;F</sup>`;

        if(temperatureMetric === '°C') {
            currentDayTemperature.innerHTML = `${formatToCelc(day.temp)} <sup>&deg;C</sup>`;
            feelsLikeWrapper.innerHTML = `Feels Like ${formatToCelc(day.feelslike)} <sup>&deg;C</sup>`;
            minAndMaxWrapper.innerHTML = `Min/Max ${formatToCelc(day.tempmax)}<sup>&deg;C</sup>/${formatToCelc(day.tempmin)}<sup>&deg;C</sup>`;
            windSpeedWrapper.textContent = `Wind Speed ${formatMilesToKMh(day.windspeed)}km/h`;
        }

        weekDay.textContent = formatDayNumberToString(day.datetime);
        conditions.textContent = day.conditions;


        if (day === weathers.days[0]) {
            dailyWeatherWrapper.classList.remove('daily-weather');
            dailyWeatherWrapper.classList.add('todays-weather');

            dayAndTemperatureWrapper.classList.add('column', 'align-center', 'gap-5');
            currentDayTemperature.classList.add('todays-temperature');
            weekDay.classList.add('todays-weekday');
            conditions.classList.add('todays-condition');
        }
        
                
        weatherInformationWrapper.append(feelsLikeWrapper);
        weatherInformationWrapper.append(minAndMaxWrapper);
        weatherInformationWrapper.append(humidityWrapper);
        weatherInformationWrapper.append(precipitationWrapper);
        weatherInformationWrapper.append(windSpeedWrapper);
        dayAndTemperatureWrapper.append(conditions);
        dayAndTemperatureWrapper.append(weekDay);
        dayAndTemperatureWrapper.append(currentDayTemperature);
        dailyWeatherWrapper.append(dayAndTemperatureWrapper);
        dailyWeatherWrapper.append(weatherInformationWrapper);
        weatherContentWrapper.append(dailyWeatherWrapper);
    });
}