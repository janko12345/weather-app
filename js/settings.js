import { saveToStorage, getFromStorage } from "./helper-functions.js";
import { renderAll } from "./renderData.js";

export function setInitialSettings() {
    let settings = {
        time: 24,
        temp: "c",
        volume: "mm",
        speed: "kph",
        pressure: "mb",
        gif: false,
        astronomy: true,
        hourInterval: 1,
    };
    saveToStorage("settings", settings);
}

export function updateSettings(event) {
    if (event.target.hasAttribute("data-settings-value")) {
        let element = event.target;
        let key = element.getAttribute("data-settings-key");
        let value = element.getAttribute("data-settings-value");
        let settings = getFromStorage("settings");
        settings[key] = value;

        saveToStorage("settings", settings);
        setNewActive(element);
    }
}

export function getSettings() {
    return getFromStorage("settings");
}

function setNewActive(element) {
    // element in argument is supposed to be clicked element
    let currentActive = findCurrentActive(element);
    unsetCurrentActive(currentActive);
    element.classList.add("config-data-active");
}
function unsetCurrentActive(currentActive) {
    currentActive.classList.remove("config-data-active");
}
function findCurrentActive(clickedElement) {
    return clickedElement.parentElement.querySelector(".config-data-active");
}
