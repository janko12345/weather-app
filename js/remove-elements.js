export function clearDayForecasts() {
    let dayForecasts = [...document.querySelectorAll(".sidebar-day")];
    dayForecasts.forEach((day) => {
        day.parentNode.removeChild(day);
    });
}

export function clearHourForecasts() {
    let hourForecastsCnt = document.querySelector(".forecasts");
    hourForecastsCnt.innerHTML = "";
}

export function clearCurrentWeather() {
    let currentCnt = document.querySelector(".current");
    currentCnt.innerHTML = "";
}
