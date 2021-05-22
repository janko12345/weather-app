import {
    createBlankDayForecasts,
    createBlankHourForecasts,
    createBlankCurrentForecast,
} from "./blank-elements.js";
import { hideLoading, showLoading } from "./animations.js";
import { getFromStorage, saveToStorage } from "./helper-functions.js";
import { renderAll } from "./render-data.js";
import { getSettings } from "./settings.js";
import { getUserCoords } from "./track-user.js";
import { getWeatherData } from "./weather-data.js";

export function pageLoadBlankRender() {
    let numberOfDayForecasts = 3;
    let numberOfHourForecasts = 24 / getSettings().hourInterval;

    createBlankDayForecasts(numberOfDayForecasts);
    createBlankHourForecasts(numberOfHourForecasts);
    createBlankCurrentForecast();
}

export async function pageLoadDataRender() {
    renderSettingsActive();

    let coords = await getUserCoords();
    let weatherData = await getWeatherData(coords);

    let dayToRender = 0; // rendering data on main section for particular day, in case of page load its first day
    saveToStorage("rendered-day", dayToRender);
    renderAll(weatherData, dayToRender); // double rendered, first in getWeatherData
}

function renderSettingsActive() {
    let settingsElements = [
        ...document.querySelectorAll(
            "[data-settings-key][data-settings-value]"
        ),
    ];
    let settings = getFromStorage("settings");
    settingsElements.forEach((element) => {
        let value = element.getAttribute("data-settings-value");
        let key = element.getAttribute("data-settings-key");
        if (value === settings[key] + "") {
            element.classList.add("config-data-active");
        }
    });
}
