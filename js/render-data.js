import {
    createCurrentWeatherEl,
    createDayEl,
    createHourEl,
} from "./elementsFactory.js";
import {
    getFromStorage,
    isEvent,
    saveToStorage,
    to24HourFormat,
} from "./helper-functions.js";
import {
    clearCurrentWeather,
    clearDayForecasts,
    clearHourForecasts,
} from "./remove-elements.js";
import { getSettings } from "./settings.js";

export function renderAll(weatherData, index) {
    if (isEvent(weatherData)) {
        let event = weatherData;
        weatherData = getFromStorage("weather-data");

        let dayIndex = event.target.closest("[data-day-index]");
        let isSettings = event.target.hasAttribute("data-settings-value");

        if (dayIndex !== null) {
            index = parseInt(dayIndex.getAttribute("data-day-index"));
        } else if (isSettings) {
            index = getFromStorage("rendered-day");
        } else {
            return;
        }
    }

    renderSidebar(weatherData);
    renderMainPage(weatherData, index);
}

export function renderMainPage(weatherData, index) {
    if (isEvent(weatherData)) {
        let event = weatherData;
        weatherData = getFromStorage("weather-data");

        let dayIndex = event.target.closest("[data-day-index]");
        let isSettings = event.target.hasAttribute("data-settings-value");

        if (dayIndex !== null) {
            index = parseInt(dayIndex.getAttribute("data-day-index"));
        } else if (isSettings) {
            index = getFromStorage("rendered-day");
        } else {
            return;
        }
    }
    saveToStorage("rendered-day", index);

    renderSunInfo(weatherData, index);
    renderHourForecasts(weatherData, index);
    renderCurrentWeather(weatherData, index);
}

function renderSidebar(weatherData) {
    let city = document.querySelector(".sidebar-city");
    city.textContent = weatherData.location.name;

    let forecastDays = weatherData.forecast.forecastday;
    let todayForecast = forecastDays[0];
    let nextDaysForecast = forecastDays.slice(1);

    let todayCnt = document.querySelector(".sidebar-today");
    let nextDaysCnt = document.querySelector(".sidebar-next-days");

    clearDayForecasts();

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
        sunrise = to24HourFormat(sunrise);
        sunset = to24HourFormat(sunset);
        moonrise = to24HourFormat(moonrise);
        moonset = to24HourFormat(moonset);
    }

    sunRise.textContent = sunrise;
    sunSet.textContent = sunset;
    moonRise.textContent = moonrise;
    moonSet.textContent = moonset;
}

export function renderHourForecasts(weatherData, index) {
    let forecasts = document.querySelector(".forecasts");
    let settings = getSettings();
    let hourInterval = parseInt(settings.hourInterval);

    // this condition is needed here, because this function is going to be called separately by hour forecast dropdown unlike other renders
    if (isEvent(weatherData)) {
        let event = weatherData;
        weatherData = getFromStorage("weather-data");

        let intervalSpan = event.target.getAttribute("data-interval-span");
        if (intervalSpan === null) {
            return; // not clicked dedicated element from dropdown
        } else {
            hourInterval = parseInt(intervalSpan);
            index = getFromStorage("rendered-day");
        }
    }

    let forecastDays = weatherData.forecast.forecastday;
    let dayToRender = forecastDays[index];
    let hoursData = dayToRender.hour;

    clearHourForecasts();
    for (let i = 0; i < dayToRender.hour.length; i += hourInterval) {
        let hourData = hoursData[i];
        forecasts.appendChild(createHourEl(hourData));
    }
}

function renderCurrentWeather(weatherData, index) {
    clearCurrentWeather();

    let current = document.querySelector(".current");
    let currentData = weatherData.current;

    let currentInfos = createCurrentWeatherEl(currentData);
    current.appendChild(currentInfos);
}
