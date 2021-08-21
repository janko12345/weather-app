import { updateSettings } from "./settings.js";
import {
    switchConfigInfo,
    switchSunMoon,
    toggleConfig,
    toggleAstronomyVisibility,
    toggleSidebar,
    toggleDropdown,
    hideDropdown,
    showLegend,
    hideLegend,
    switchForecastInfo,
} from "./animations.js";
import {
    renderAllData,
    renderHourForecasts,
    renderMainPage,
} from "./render-data.js";
import { getWeatherData } from "./get-weather-data.js";
import { getFromStorage } from "./helper-functions.js";
let configMenu = document.querySelector(".config-menu");
let sidebarDays = document.querySelector(".sidebar-days");
let gear = document.querySelector(".config-gear-icon");
let search = document.querySelector(".sidebar-search");
let main = document.querySelector("main");
let configSwitch = document.querySelector(".config-menu-switch");
let burger = document.querySelector(".hamburger-button");
let astronomyInfoToggler = main.querySelector(".astronomy-info-toggler");
let astronomyVisibilityToggler = main.querySelector(
    ".astronomy-visibility-toggler"
);
let dropdownBtn = main.querySelector("#dropdown-button");
let dropdownMenu = main.querySelector(".forecasts-dropdown-menu");
let switchInfoBtn = main.querySelector("#switch-info-button");
let legendBtn = main.querySelector("#legend-button");
let legendMod = document.querySelector(".legend-module");

sidebarDays.addEventListener("click", (e) => {
    let dayToRenderEl = e.target.closest("[data-day-index]");
    if (dayToRenderEl === null) return;

    const dayToRender = +dayToRenderEl.getAttribute("data-day-index");
    const weatherData = getFromStorage("weather-data");

    renderMainPage(weatherData, dayToRender);
    saveToStorage("rendered-day", dayToRender);
});

search.addEventListener("keyup", async (e) => {
    if (e.key !== "Enter") return;
    const city = e.target.value;
    const weatherData = await getWeatherData({ city });

    weatherData && renderAllData(weatherData, 0);
});

burger.addEventListener("click", toggleSidebar);

gear.addEventListener("click", toggleConfig);

configSwitch.addEventListener("click", switchConfigInfo);

astronomyInfoToggler.addEventListener("click", switchSunMoon);

astronomyVisibilityToggler.addEventListener("click", toggleAstronomyVisibility);

dropdownBtn.addEventListener("click", toggleDropdown);
dropdownMenu.addEventListener("click", (e) => {
    const clickedOnInterval = e.target.hasAttribute("data-interval-span");
    if (!clickedOnInterval) return;

    const weatherData = getFromStorage("weather-data");
    const dayToRender = getFromStorage("rendered-day");
    const interval = e.target.dataset.intervalSpan;

    renderHourForecasts(weatherData, dayToRender, interval);
    hideDropdown(e);
});

switchInfoBtn.addEventListener("click", switchForecastInfo);

legendBtn.addEventListener("click", showLegend);

legendMod.addEventListener("click", hideLegend);

configMenu.addEventListener("click", updateSettings);

configMenu.addEventListener("click", (e) => {
    const clickedOnValue = e.target.hasAttribute("data-settings-value");
    if (!clickedOnValue) return;

    const dayToRender = getFromStorage("rendered-day");
    const weatherData = getFromStorage("weather-data");
    weatherData && renderAllData(weatherData, dayToRender);
});
