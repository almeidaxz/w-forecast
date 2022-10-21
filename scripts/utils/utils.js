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