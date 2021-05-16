import { getSettings } from "./settings.js";
import { getDayName, getLeadingZero } from "./helper-functions.js";
export function createDayEl(dayData, index) {
    let settings = getSettings();
    let isCelsius = settings.temp === "c";

    let day = document.createElement("div");
    day.classList.add("sidebar-day");
    day.setAttribute("data-day-index", index);
    day.innerHTML = `
    <div class="sidebar-day-row">
    <img
        src="${dayData.day.condition.icon}"
        alt="dynamic"
        class="sidebar-day-img"
        title="${dayData.day.condition.text}"
    />
    <p class="sidebar-day-temp">
        <span>${
            isCelsius ? dayData.day.mintemp_c : dayData.day.mintemp_f
        }</span>
        /
        <span>${
            isCelsius ? dayData.day.maxtemp_c : dayData.day.maxtemp_f
        }</span>
        <span>${isCelsius ? "°C" : "°F"}</span>
    </p>
    </div>
    <div class="sidebar-day-row">
        <p>${getDayName(dayData.date)}</p>
        <p>${dayData.day.condition.text}</p>
    </div>`;
    return day;
}

export function createHourEl(hourData) {
    console.log(hourData);
    let date = new Date(hourData.time);
    let hours = getLeadingZero(date.getHours());
    let minutes = getLeadingZero(date.getMinutes());
    let time = `${hours}:${minutes}`;
    let settings = getSettings();
    let isCelsius = settings.temp === "c";
    let isKph = settings.speed === "kph";
    let isMm = settings.volume === "mm";
    let isMb = settings.pressure === "mb";
    let willSnow = hourData.chance_of_snow > hourData.chance_of_rain;
    let forecast = document.createElement("div");
    forecast.classList.add("forecast");

    forecast.innerHTML = `<div class="forecast-header">
<p class="forecast-hour">${time}</p>
<img
    src="${hourData.condition.icon}"
    alt="weather icon"
    class="forecast-main-icon"
    title="${hourData.condition.text}"
/>
</div>
<div
class="
    forecast-infos forecast-primary-infos
"
>
<div class="forecast-info-column">
    <div class="forecast-info">
        <img
            src="assets/primary-info/thermometer.png"
            alt="thermometer"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
            ${isCelsius ? hourData.temp_c + "°C" : hourData.temp_f + "°F"}
        </p>
    </div>
    <div class="forecast-info">
        <img
            src="assets/primary-info/feels-like.png"
            alt="man next to thermometer"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        ${isCelsius ? hourData.feelslike_c + "°C" : hourData.feelslike_f + "°F"}
        </p>
    </div>
</div>
<div class="forecast-info-column">
    <div class="forecast-info">
        <img
            src="${
                willSnow
                    ? "assets/primary-info/snowing.png"
                    : "assets/primary-info/raining.png"
            }"
            alt="snow cloud"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        ${
            willSnow
                ? hourData.chance_of_snow + "%"
                : hourData.chance_of_rain + "%"
        }
        </p>
    </div>
    <div class="forecast-info">
        <img
            src="assets/primary-info/wind-gust.png"
            alt="wind gust"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        ${isKph ? hourData.wind_kph + "kph" : hourData.wind_mph + "mph"}
        </p>
    </div>
</div>
</div>
<div
class="
    forecast-infos forecast-secondary-infos
    hide
"
>
<div class="forecast-info-column">
    <div class="forecast-info">
        <img
            src="assets/secondary-info/humidity.png"
            alt="rain drop"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        ${hourData.humidity + "%"}
        </p>
    </div>
    <div class="forecast-info">
        <img
            src="assets/secondary-info/clouds.png"
            alt="cloudiness"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        ${hourData.cloud + "%"}
        </p>
    </div>
</div>
<div class="forecast-info-column">
    <div class="forecast-info">
        <img
            src="${
                willSnow
                    ? "assets/secondary-info/rain-volume.png"
                    : "assets/secondary-info/snow-volume.png"
            }"
            alt="ran drops"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        ${isMm ? hourData.precip_mm + "mm" : hourData.prepic_in + "in"}
        </p>
    </div>

    <div class="forecast-info">
        <img
            src="assets/secondary-info/barometer.png"
            alt="barometer"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        ${isMb ? hourData.pressure_mb + "mb" : hourData.pressure_in + "in"}
        </p>
    </div>
</div>
</div>`;
    return forecast;
}

export function createCurrentWeatherEls(currentData) {
    let settings = getSettings();
    let isCelsius = settings.temp === "c";
    let isKph = settings.speed === "kph";
    let isMb = settings.pressure === "mb";

    let currentTime = document.createElement("div");
    currentTime.classList.add("current-time");
    currentTime.textContent = "now:";

    let current = document.createElement("div");
    current.classList.add("current");

    let currentDescription = document.createElement("div");
    currentDescription.classList.add("current-description");
    currentDescription.textContent = currentData.condition.text;

    let currentInfos = document.createElement("div");
    currentInfos.classList.add("current-infos");
    currentInfos.innerHTML = `<div class="current-infos-row">
        <div class="current-info">
            <img
                src="assets/primary-info/thermometer.png"
                alt="thermometer"
                class="current-info-img"
            />
            <p class="current-info-data">${
                isCelsius
                    ? currentData.temp_c + "°C"
                    : currentData.temp_f + "°F"
            }</p>
        </div>
        <div class="current-info">
            <img
                src="assets/primary-info/feels-like.png"
                alt="man next to thermometer"
                class="current-info-img"
            />
            <p class="current-info-data">${
                isCelsius
                    ? currentData.feelslike_c + "°C"
                    : currentData.feelslike_f + "°F"
            }</p>
        </div>
        <div class="current-info">
            <img
                src="assets/primary-info/wind-gust.png"
                alt="snowing cloud"
                class="current-info-img"
            />
            <p class="current-info-data">${
                isKph
                    ? currentData.wind_kph + "kph"
                    : currentData.wind_mph + "mph"
            }</p>
        </div>
    </div>
    <div class="current-infos-row">
        <div class="current-info">
            <img
                src="assets/secondary-info/barometer.png"
                alt="snow flake"
                class="current-info-img"
            />
            <p class="current-info-data">${
                isMb
                    ? currentData.pressure_mb + "mb"
                    : currentData.pressure_in + "in"
            }</p>
        </div>
        <div class="current-info">
            <img
                src="assets/secondary-info/humidity.png"
                alt="rain drop humidity"
                class="current-info-img"
            />
            <p class="current-info-data">${currentData.humidity + "%"}</p>
        </div>
        <div class="current-info">
            <img
                src="assets/secondary-info/clouds.png"
                alt="clouds"
                class="current-info-img"
            />
            <p class="current-info-data">${currentData.cloud + "%"}</p>
        </div>
    </div>`;
    current.appendChild(currentInfos);
    current.appendChild(currentDescription);

    return [currentTime, current];
}
