import { getFromStorage } from "./helper-functions.js";
import { getSettings } from "./settings.js";
function createBlankHourForecast() {
    let forecast = document.createElement("div");

    forecast.classList.add("forecast");
    forecast.innerHTML = `<div class="forecast-header">
<p class="forecast-hour">- - -</p>
<img
    src="assets/primary-info/raining.png"
    alt="weather icon"
    class="forecast-main-icon"
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
            - - -
        </p>
    </div>
    <div class="forecast-info">
        <img
            src="assets/primary-info/feels-like.png"
            alt="man next to thermometer"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        - - -
        </p>
    </div>
</div>
<div class="forecast-info-column">
    <div class="forecast-info">
        <img
            src="assets/primary-info/snowing.png"
            alt="snow cloud"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        - - -
        </p>
    </div>
    <div class="forecast-info">
        <img
            src="assets/primary-info/wind-gust.png"
            alt="wind gust"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        - - -
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
        - - -
        </p>
    </div>
    <div class="forecast-info">
        <img
            src="assets/secondary-info/clouds.png"
            alt="man next to thermometer"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        - - -
        </p>
    </div>
</div>
<div class="forecast-info-column">
    <div class="forecast-info">
        <img
            src="assets/secondary-info/rain-volume.png"
            alt="ran drops"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        - - -
        </p>
    </div>

    <div class="forecast-info">
        <img
            src="assets/secondary-info/barometer.png"
            alt="barometer"
            class="forecast-info-img"
        />
        <p class="forecast-info-data">
        - - -
        </p>
    </div>
</div>
</div>`;
    return forecast;
}

function createBlankDayForecast() {
    let day = document.createElement("div");
    day.classList.add("sidebar-day");
    day.innerHTML = `
    <div class="sidebar-day-row">
    <i class="fas fa-image"></i>
    <p class="sidebar-day-temp">
        <span>--</span>
        /
        <span>--</span>
    </p>
    </div>
    <div class="sidebar-day-row">
        <p>- - -</p>
        <p>- - -</p>
    </div>`;
    return day;
}

function createBlankHourForecasts(amount) {
    let forecastsCnt = document.querySelector(".forecasts");
    let forecast = createBlankHourForecast();
    for (let i = 0; i < amount; i++) {
        let newForecast = forecast.cloneNode(true);
        forecastsCnt.appendChild(newForecast);
    }
}

function createBlankDayForecasts(amount) {
    let todayCnt = document.querySelector(".sidebar-today");
    let nextDaysCnt = document.querySelector(".sidebar-next-days");
    let dayEl = createBlankDayForecast();

    todayCnt.appendChild(dayEl);
    for (let i = 0; i < amount - 1; i++) {
        let newDayEl = dayEl.cloneNode(true);
        nextDaysCnt.appendChild(newDayEl);
    }
}

function createBlankCurrentForecast() {
    let currentCnt = document.querySelector(".current-wrapper");

    let currentTime = document.createElement("div");
    currentTime.classList.add("current-time");
    currentTime.textContent = "now:";

    let current = document.createElement("div");
    current.classList.add("current");

    let currentDescription = document.createElement("div");
    currentDescription.classList.add("current-description");
    currentDescription.textContent = "";

    let currentInfos = document.createElement("div");
    currentInfos.classList.add("current-infos");
    currentInfos.innerHTML = `<div class="current-infos-row">
        <div class="current-info">
            <img
                src="assets/primary-info/thermometer.png"
                alt="thermometer"
                class="current-info-img"
            />
            <p class="current-info-data">- - -</p>
        </div>
        <div class="current-info">
            <img
                src="assets/primary-info/feels-like.png"
                alt="man next to thermometer"
                class="current-info-img"
            />
            <p class="current-info-data">- - -</p>
        </div>
        <div class="current-info">
            <img
                src="assets/primary-info/wind-gust.png"
                alt="snowing cloud"
                class="current-info-img"
            />
            <p class="current-info-data">- - -</p>
        </div>
    </div>
    <div class="current-infos-row">
        <div class="current-info">
            <img
                src="assets/secondary-info/barometer.png"
                alt="snow flake"
                class="current-info-img"
            />
            <p class="current-info-data">- - -</p>
        </div>
        <div class="current-info">
            <img
                src="assets/secondary-info/humidity.png"
                alt="rain drop humidity"
                class="current-info-img"
            />
            <p class="current-info-data">- - -</p>
        </div>
        <div class="current-info">
            <img
                src="assets/secondary-info/clouds.png"
                alt="clouds"
                class="current-info-img"
            />
            <p class="current-info-data">- - -</p>
        </div>
    </div>`;

    current.appendChild(currentInfos);
    current.appendChild(currentDescription);

    currentCnt.appendChild(currentTime);
    currentCnt.appendChild(current);
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

export function pageLoadRender() {
    let numberOfDayForecasts = 3;
    let numberOfHourForecasts = 24 / getSettings().hourInterval;

    renderSettingsActive();
    createBlankDayForecasts(numberOfDayForecasts);
    createBlankHourForecasts(numberOfHourForecasts);
    createBlankCurrentForecast();
}
