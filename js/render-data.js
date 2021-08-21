import {
    createCurrentWeatherEl,
    createDayEl,
    createHourEl,
} from "./elementsFactory.js";
import { to24HourFormat } from "./helper-functions.js";
import {
    clearCurrentWeather,
    clearDayForecasts,
    clearHourForecasts,
} from "./remove-elements.js";
import { getSettings } from "./settings.js";

export function renderAllData(weatherData, index) {
    renderSidebar(weatherData);
    renderMainPage(weatherData, index);
}

export function renderMainPage(weatherData, index) {
    let settings = getSettings();
    if (settings.astronomy === "true") {
        console.log("show");
        showAstronomy();
    } else {
        console.log("hide");
        hideAstronomy();
    }
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

export function renderHourForecasts(weatherData, index, interval) {
    let forecasts = document.querySelector(".forecasts");
    let settings = getSettings();
    let hourInterval = +interval || +settings.hourInterval;

    let forecastDays = weatherData.forecast.forecastday;
    let dayToRender = forecastDays[index];
    let hoursData = dayToRender.hour;

    clearHourForecasts();
    for (let i = 0; i < dayToRender.hour.length; i += hourInterval) {
        let hourData = hoursData[i];

        forecasts.appendChild(createHourEl(hourData));
    }
}

function renderCurrentWeather(weatherData) {
    clearCurrentWeather();

    let current = document.querySelector(".current");
    let currentData = weatherData.current;

    let currentInfos = createCurrentWeatherEl(currentData);
    current.appendChild(currentInfos);
}

export function renderVisualsBySettings(event) {
    let settingsKey = event.target.getAttribute("data-settings-key");

    if (settingsKey === "astronomy") {
        let shouldHide =
            event.target.getAttribute("data-settings-value") === "false";
        renderAstronomyVisibility(shouldHide);
    } else if (settingsKey === "gif") {
        let shouldHide =
            event.target.getAttribute("data-settings-value") === "false";
        renderGifVisibility(shouldHide);
    }
}

function showAstronomy() {
    let astronomy = document.querySelector(".astronomy");
    astronomy.classList.remove("hide");
}

function hideAstronomy() {
    let astronomy = document.querySelector(".astronomy");
    astronomy.classList.add("hide");
}
