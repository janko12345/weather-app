import {
    createCurrentWeatherEls,
    createDayEl,
    createHourEl,
} from "./elementsFactory.js";
import {
    getFromStorage,
    isEvent,
    saveToStorage,
    to24HourCycle,
} from "./helper-functions.js";
import {
    clearCurrentWeather,
    clearDayForecasts,
    clearHourForecasts,
} from "./remove-elements.js";
import { getSettings } from "./settings.js";

function renderSidebar(weatherData) {
    clearDayForecasts();
    let forecastDays = weatherData.forecast.forecastday;
    let todayForecast = forecastDays[0];
    let nextDaysForecast = forecastDays.slice(1);

    let todayCnt = document.querySelector(".sidebar-today");
    let nextDaysCnt = document.querySelector(".sidebar-next-days");
    todayCnt.appendChild(createDayEl(todayForecast, 0));
    nextDaysForecast.forEach((dayForecast, index) => {
        nextDaysCnt.appendChild(createDayEl(dayForecast, ++index));
    });
}

function renderSunInfo(weatherData, index) {
    let astronomy = document.querySelector(".astronomy");
    let forecastDays = weatherData.forecast.forecastday;
    let dayToRender = forecastDays[index];
    let settings = getSettings();

    let sunRise = astronomy.querySelector("#sun-rise-time");
    let sunSet = astronomy.querySelector("#sun-set-time");
    let moonRise = astronomy.querySelector("#moon-rise-time");
    let moonSet = astronomy.querySelector("#moon-set-time");
    let { sunrise, sunset, moonrise, moonset } = dayToRender.astro;

    if (settings.time + "" === "24") {
        sunrise = to24HourCycle(sunrise);
        sunset = to24HourCycle(sunset);
        moonrise = to24HourCycle(moonrise);
        moonset = to24HourCycle(moonset);
    }

    sunRise.textContent = sunrise;
    sunSet.textContent = sunset;
    moonRise.textContent = moonrise;
    moonSet.textContent = moonset;
}

export function renderHourForecasts(weatherData, index) {
    // this condition is needed here, because this function is going to be called separately unlike other renders
    if (isEvent(weatherData)) {
        let dayIndex = weatherData.target.closest("[data-day-index]");
        weatherData = getFromStorage("weather-data");
        index =
            dayIndex !== null
                ? dayIndex.getAttribute("data-day-index")
                : getFromStorage("rendered-day");
    }
    clearHourForecasts();
    let forecasts = document.querySelector(".forecasts");
    let settings = getSettings();
    let hourInterval = parseInt(settings.hourInterval);

    let forecastDays = weatherData.forecast.forecastday;
    let dayToRender = forecastDays[index];
    let hoursData = dayToRender.hour;

    for (let i = 0; i < dayToRender.hour.length; i += hourInterval) {
        let hourData = hoursData[i];
        forecasts.appendChild(createHourEl(hourData));
    }
}

function renderCurrentWeather(weatherData, index) {
    clearCurrentWeather();

    let currentCnt = document.querySelector(".current-wrapper");
    let currentData = weatherData.current;
    let [currentTime, current] = createCurrentWeatherEls(currentData);
    currentCnt.appendChild(currentTime);
    currentCnt.appendChild(current);
}

export function renderMainPage(weatherData, index) {
    if (isEvent(weatherData)) {
        let dayIndex = weatherData.target.closest("[data-day-index]");
        weatherData = getFromStorage("weather-data");
        index =
            dayIndex !== null
                ? dayIndex.getAttribute("data-day-index")
                : getFromStorage("rendered-day");
    }
    saveToStorage("rendered-day", index);

    renderSunInfo(weatherData, index);
    renderHourForecasts(weatherData, index);
    renderCurrentWeather(weatherData, index);
}

export function renderAll(weatherData, index) {
    if (isEvent(weatherData)) {
        let dayIndex = weatherData.target.closest("[data-day-index]");
        weatherData = getFromStorage("weather-data");
        index =
            dayIndex !== null
                ? dayIndex.getAttribute("data-day-index")
                : getFromStorage("rendered-day");
    }

    renderSidebar(weatherData);
    renderMainPage(weatherData, index);
}
