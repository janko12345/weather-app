import { saveToStorage } from "./helper-functions.js";
import {} from "./animations.js";
import { pageLoadRender } from "./initial-render.js";
import { updateSettings, setInitialSettings, getSettings } from "./settings.js";
import { getCoords, getIpAddress } from "./track-user.js";
import {
    getWeatherDataByCity,
    getWeatherDataByCoords,
    getWeatherDataByIp,
} from "./weather-data.js";
import { renderAll } from "./renderData.js";
import { showLoading, hideLoading } from "./animations.js";

if (getSettings() === null) {
    setInitialSettings();
}
// render all elements without data, because we don't have it, till we fetch them
pageLoadRender();
// rendering elements with actual data

let coords = await getCoords();
let weatherData;

if (coords !== null) {
    weatherData = await getWeatherDataByCoords(
        coords.latitude,
        coords.longitude
    );
} else if (coords === null) {
    let ipAddress = await getIpAddress();
    if (ipAddress !== null) {
        weatherData = await getWeatherDataByIp(ipAddress);
    } else {
        weatherData = await getWeatherDataByCity("Bratislava");
    }
}

saveToStorage("weather-data", weatherData);
let dayToRender = 0; // rendering data on main section for particular day, in case of page load its first day
renderAll(weatherData, dayToRender);
document.querySelector(".sidebar-city").textContent = weatherData.location.name;
saveToStorage("rendered-day", dayToRender);
console.log(weatherData);

// events that changes data and also automatically rerenders it
let configMenu = document.querySelector(".config-menu");
configMenu.addEventListener("click", updateSettings);
configMenu.addEventListener("click", renderAll);
