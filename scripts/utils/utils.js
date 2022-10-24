export const changeToFahr = (selectedMetric) => {
    selectedMetric.classList.add('fahr');
    selectedMetric.classList.remove('celc');
    selectedMetric.textContent = '°F';
}

export const changeToCelc = (selectedMetric) => {
    selectedMetric.classList.remove('fahr');
    selectedMetric.classList.add('celc');
    selectedMetric.textContent = '°C';
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