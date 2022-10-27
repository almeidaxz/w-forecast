import { weatherKey } from "../../secret.js";
import weatherUrl from "./APIs/weatherUrl.js";
import { formatToCelc, formatDayNumberToString, formatMilesToKMh } from "../utils/utils.js";

const weatherContentWrapper = document.querySelector('#weather-results-container');

export const handleWeatherFetch = async (latitude, longitude, metricText) => {
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
        const weatherConditionBgImg = document.createElement('div');

        weatherInformationWrapper.classList.add('weather-info-wrapper', 'column', 'gap-15');

        const feelsLikeWrapper = document.createElement('div');
        const feelslikeImgAndTextWrapper = document.createElement('div');
        const feelslikeImg = document.createElement('div');
        const feelslikeText = document.createElement('span');
        const feelslikeResult = document.createElement('span');

        const minAndMaxWrapper = document.createElement('div');
        const minAndMaxImgAndTextWrapper = document.createElement('div');
        const minAndMaxImg = document.createElement('div');
        const minAndMaxText = document.createElement('span');
        const minAndMaxResult = document.createElement('span');

        const humidityWrapper = document.createElement('div');
        const humidityImgAndTextWrapper = document.createElement('div');
        const humidityImg = document.createElement('div');
        const humidityText = document.createElement('span');
        const humidityResult = document.createElement('span');

        const precipitationWrapper = document.createElement('div');
        const precipitationImgAndTextWrapper = document.createElement('div');
        const precipitationImg = document.createElement('div');
        const precipitationText = document.createElement('span');
        const precipitationResult = document.createElement('span');

        const windSpeedWrapper = document.createElement('div');
        const windSpeedImgAndTextWrapper = document.createElement('div');
        const windSpeedImg = document.createElement('div');
        const windSpeedText = document.createElement('span');
        const windSpeedResult = document.createElement('span');

        feelslikeImg.classList.add('feelslike-img', 'info-img-bg');
        feelslikeImgAndTextWrapper.classList.add('row', 'space-btw', 'align-center', 'gap-8');
        feelsLikeWrapper.classList.add('weather-info-wrapper', 'row', 'space-btw', 'align-start');
        feelslikeText.textContent = 'Feels Like';
        feelslikeResult.innerHTML = `${day.temp}<sup>&deg;F</sup>`;
        feelslikeImgAndTextWrapper.append(feelslikeImg, feelslikeText);
        feelsLikeWrapper.append(feelslikeImgAndTextWrapper, feelslikeResult);

        minAndMaxImg.classList.add('min-max-img', 'info-img-bg');
        minAndMaxImgAndTextWrapper.classList.add('row', 'space-btw', 'align-center', 'gap-8');
        minAndMaxWrapper.classList.add('row', 'space-btw', 'align-start');
        minAndMaxText.textContent = 'Min/Max';
        minAndMaxResult.innerHTML = `${day.tempmax}<sup>&deg;F</sup>/${day.tempmin}<sup>&deg;F</sup>`;
        minAndMaxImgAndTextWrapper.append(minAndMaxImg, minAndMaxText)
        minAndMaxWrapper.append(minAndMaxImgAndTextWrapper, minAndMaxResult);

        humidityImg.classList.add('humidity-img', 'info-img-bg');
        humidityImgAndTextWrapper.classList.add('row', 'space-btw', 'align-center', 'gap-8');
        humidityWrapper.classList.add('row', 'space-btw', 'align-center');
        humidityText.textContent = 'Humidity';
        humidityResult.textContent = `${day.humidity.toFixed(0)}%`;
        humidityImgAndTextWrapper.append(humidityImg, humidityText);
        humidityWrapper.append(humidityImgAndTextWrapper, humidityResult);
        
        precipitationImg.classList.add('precipitation-img', 'info-img-bg');
        precipitationImgAndTextWrapper.classList.add('row', 'space-btw', 'align-center', 'gap-8');
        precipitationWrapper.classList.add('row', 'space-btw', 'align-center');
        precipitationText.textContent = 'Precipitation Chance';
        precipitationResult.textContent = `${day.precipprob.toFixed(0)}%`;
        precipitationImgAndTextWrapper.append(precipitationImg, precipitationText);
        precipitationWrapper.append(precipitationImgAndTextWrapper, precipitationResult);

        windSpeedImg.classList.add('windspeed-img', 'info-img-bg');
        windSpeedImgAndTextWrapper.classList.add('row', 'space-btw', 'align-center', 'gap-8');
        windSpeedWrapper.classList.add('row', 'space-btw', 'align-center');
        windSpeedText.textContent = 'Wind Speed';
        windSpeedResult.textContent = `${day.windspeed.toFixed(0)}mi/h`;
        windSpeedImgAndTextWrapper.append(windSpeedImg, windSpeedText);
        windSpeedWrapper.append(windSpeedImgAndTextWrapper, windSpeedResult);

        dailyWeatherWrapper.classList.add('daily-weather', 'weather-content-wrapper', 'column', 'align-center', 'space-around');
        dayAndTemperatureWrapper.classList.add('relative', 'column-reverse', 'align-center', 'justify-center', 'gap-5');
        weatherConditionBgImg.style.backgroundImage = `url('../../assets/weatherIcons/${day.icon}.svg`;
        weatherConditionBgImg.classList.add('daily-condition-img', 'weather-condition-img', 'size-10', 'absolute');
        dayAndTemperatureWrapper.append(weatherConditionBgImg);

        currentDayTemperature.innerHTML = `${day.temp.toFixed(0)} <sup>&deg;F</sup>`;

        if(metricText.textContent === 'Metric') {
            currentDayTemperature.innerHTML = `${formatToCelc(day.temp)} <sup>&deg;C</sup>`;
            feelslikeResult.innerHTML = `${formatToCelc(day.feelslike)} <sup>&deg;C</sup>`;
            minAndMaxResult.innerHTML = `${formatToCelc(day.tempmax)}<sup>&deg;C</sup>/${formatToCelc(day.tempmin)}<sup>&deg;C</sup>`;
            humidityResult.textContent = `${formatMilesToKMh(day.windspeed)}km/h`;
        }

        weekDay.textContent = formatDayNumberToString(day.datetime);
        conditions.textContent = day.conditions;


        if (day === weathers.days[0]) {
            dailyWeatherWrapper.classList.remove('daily-weather');
            weatherConditionBgImg.classList.remove('daily-condition-img', 'size-10');
            
            dailyWeatherWrapper.classList.add('todays-weather');
            weatherConditionBgImg.classList.add('todays-condition-img', 'size-15');
            dayAndTemperatureWrapper.classList.add('column', 'align-center', 'gap-5');
            currentDayTemperature.classList.add('todays-temperature');
            weekDay.classList.add('todays-weekday');
            conditions.classList.add('todays-condition');
        }
        
                
        weatherInformationWrapper.append(feelsLikeWrapper, minAndMaxWrapper, humidityWrapper, precipitationWrapper, windSpeedWrapper);
        dayAndTemperatureWrapper.append(conditions, weekDay, currentDayTemperature);
        dailyWeatherWrapper.append(dayAndTemperatureWrapper, weatherInformationWrapper);
        weatherContentWrapper.append(dailyWeatherWrapper);
    });
}