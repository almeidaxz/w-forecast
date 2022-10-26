export const changeTemperatureUnit = (selectedMetric, metricText, existingResults) => {
    if(metricText.textContent === 'Metric'){
        selectedMetric.classList.add('fahr');
        selectedMetric.classList.remove('celc');
        selectedMetric.textContent = '°F';
        metricText.textContent = 'Imperial';
        return;
    }

    selectedMetric.classList.remove('fahr');
    selectedMetric.classList.add('celc');
    selectedMetric.textContent = '°C';
    metricText.textContent = 'Metric';

    changeTemperatureUnitForExistingResults(existingResults, metricText);
}

const changeTemperatureUnitForExistingResults = (existingResults) => {
    if(!existingResults.length) return;

    existingResults.forEach((result) => {
        
    });
}

export const formatToCelc = (fahrValue) => {
    const celcValue = (fahrValue - 32) / 1.8;
    return celcValue.toFixed(0);
}

export const formatDayNumberToString = (date) => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const rawDate = new Date(date)
    const userTimezoneOffset = rawDate.getTimezoneOffset() * 60000;
    const weekDay = new Date(rawDate.getTime() + userTimezoneOffset).getDay();

    return weekDays[weekDay];
}

export const formatMilesToKMh = (valueInMiles) => {
    return (valueInMiles * 1.6).toFixed(0);
}