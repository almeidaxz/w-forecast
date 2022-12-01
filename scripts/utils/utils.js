export const changeTemperatureUnit = (selectedMetric, metricText, addressLocation) => {
    if (metricText.textContent === 'Metric' && (addressLocation.includes('USA') || addressLocation.includes('US') || addressLocation.includes('EUA'))) {
        selectedMetric.classList.remove('celc');
        selectedMetric.classList.add('fahr');
        selectedMetric.textContent = '°F';
        return metricText.textContent = 'Imperial';
    }
    if (metricText.textContent === 'Imperial' && !(addressLocation.includes('USA') || addressLocation.includes('US') || addressLocation.includes('EUA'))) {
        selectedMetric.classList.remove('fahr');
        selectedMetric.classList.add('celc');
        selectedMetric.textContent = '°C';
        metricText.textContent = 'Metric';
    }
}

export const changeTemperatureInput = (checked, selectedMetric, metricText) => {
    if (checked) {
        selectedMetric.classList.remove('fahr');
        selectedMetric.classList.add('celc');
        selectedMetric.textContent = '°C';
        metricText.textContent = 'Metric';
    } else {
        selectedMetric.classList.remove('celc');
        selectedMetric.classList.add('fahr');
        selectedMetric.textContent = '°F';
        metricText.textContent = 'Imperial';
    }
}

export const formatToCelc = (fahrValue) => {
    const celcValue = (fahrValue - 32) / 1.8;
    if(celcValue.toFixed(0) === '-0') return 0;
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