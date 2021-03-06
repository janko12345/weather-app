import {
    switchConfigInfo,
    switchSunMoon,
    toggleConfig,
    toggleAstronomyVisibility,
    toggleSidebar,
    showDropdown,
    hideDropdown,
    showLegend,
    hideLegend,
    switchForecastInfo,
    showLoading,
} from "./animations.js";
import {
    renderAll,
    renderHourForecasts,
    renderMainPage,
} from "./render-data.js";
import { getWeatherData } from "./weather-data.js";

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

sidebarDays.addEventListener("click", renderMainPage);

search.addEventListener("keyup", getWeatherData);

burger.addEventListener("click", toggleSidebar);

gear.addEventListener("click", toggleConfig);
gear.addEventListener("click", renderAll);

configSwitch.addEventListener("click", switchConfigInfo);

astronomyInfoToggler.addEventListener("click", switchSunMoon);

astronomyVisibilityToggler.addEventListener("click", toggleAstronomyVisibility);

dropdownBtn.addEventListener("click", showDropdown);

dropdownMenu.addEventListener("click", hideDropdown);
dropdownMenu.addEventListener("click", renderHourForecasts);

switchInfoBtn.addEventListener("click", switchForecastInfo);

legendBtn.addEventListener("click", showLegend);

legendMod.addEventListener("click", hideLegend);
