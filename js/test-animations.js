let sidebar = document.querySelector(".sidebar");
let search = sidebar.querySelector(".sidebar-search");
let fetchResponse = sidebar.querySelector(".fetch-response");
let burger = sidebar.querySelector(".hamburger-button");
let main = document.querySelector("main");
let gear = main.querySelector(".config-gear-icon");
let configMenu = main.querySelector(".config-menu");
let formatMenu = configMenu.querySelector("#format-menu");
let otherMenu = configMenu.querySelector("#other-menu");
let configSwitch = configMenu.querySelector(".config-menu-switch");

let astronomyCnt = document.querySelector(".astronomy-wrapper");
let astronomy = document.querySelector(".astronomy");
let astronomyInfoToggler = main.querySelector(".astronomy-info-toggler");
let astronomyVisibilityToggler = main.querySelector(
    ".astronomy-visibility-toggler"
);
let dropdownBtn = main.querySelector("#dropdown-button");
let dropdownImg = dropdownBtn.querySelector(".forecasts-dropdown-img");
let dropdownMenu = main.querySelector(".forecasts-dropdown-menu");
let switchInfoBtn = main.querySelector("#switch-info-button");
let switchInfoImg = switchInfoBtn.querySelector(".forecasts-switch-info-img");
let legendBtn = main.querySelector("#legend-button");
let legendMod = document.querySelector(".legend-module");
let primaryInfos = [...main.querySelectorAll(".forecast-primary-infos")];
let secondaryInfos = [...main.querySelectorAll(".forecast-secondary-infos")];

let failedTO;
search.addEventListener("keyup", (e) => {
    clearTimeout(failedTO);
    fetchResponse.classList.remove("fetch-response-failed");
    if (e.key.toLowerCase() === "enter") {
        fetchResponse.classList.add("fetch-response-in-process");
        setTimeout(() => {
            fetchResponse.classList.remove("fetch-response-in-process");
            fetchResponse.classList.add("fetch-response-failed");
            failedTO = setTimeout(() => {
                fetchResponse.classList.remove("fetch-response-failed");
            }, 3000);
        }, 2000);
    }
});

burger.addEventListener("click", (e) => {
    sidebar.classList.toggle("sidebar-show");
    burger.classList.toggle("hamburger-button-active");
});

gear.addEventListener("click", (e) => {
    gear.classList.toggle("config-gear-icon-active");
    configMenu.classList.toggle("config-menu-active");
});

configSwitch.addEventListener("click", (e) => {
    formatMenu.classList.toggle("hide");
    otherMenu.classList.toggle("hide");
});

astronomyInfoToggler.addEventListener("click", (e) => {
    astronomyInfoToggler.classList.toggle("astronomy-info-toggler-active");
    astronomyCnt.classList.toggle("astronomy-info-toggled");
});

astronomyVisibilityToggler.addEventListener("click", (e) => {
    astronomy.classList.toggle("astronomy-hide");
    astronomyVisibilityToggler.classList.toggle(
        "astronomy-visibility-toggler-rolled-up"
    );
});

dropdownBtn.addEventListener("click", (e) => {
    dropdownImg.classList.toggle("forecasts-dropdown-img-active");
    dropdownMenu.classList.toggle("forecasts-dropdown-menu-active");
});

dropdownMenu.addEventListener("click", (e) => {
    if (e.target.classList.contains("forecasts-dropdown-item")) {
        dropdownMenu
            .querySelector(".forecasts-dropdown-item-active")
            .classList.remove("forecasts-dropdown-item-active");
        e.target.classList.add("forecasts-dropdown-item-active");
        dropdownMenu.classList.remove("forecasts-dropdown-menu-active");
        dropdownImg.classList.remove("forecasts-dropdown-img-active");
    }
});

switchInfoBtn.addEventListener("click", (e) => {
    secondaryInfos.forEach((secondaryInfo) =>
        secondaryInfo.classList.toggle("hide")
    );
    primaryInfos.forEach((primaryInfo) => primaryInfo.classList.toggle("hide"));
    if (switchInfoImg.classList.contains("switch-info-img-rotate-180")) {
        switchInfoImg.classList.add("switch-info-img-rotate-360");
        switchInfoImg.classList.remove("switch-info-img-rotate-180");
    } else if (switchInfoImg.classList.contains("switch-info-img-rotate-360")) {
        switchInfoImg.classList.remove("switch-info-img-rotate-360");
        switchInfoImg.classList.add("switch-info-img-rotate-180");
    } else switchInfoImg.classList.add("switch-info-img-rotate-180");
});

legendBtn.addEventListener("click", (e) => {
    legendMod.classList.add("legend-module-active");
});

legendMod.addEventListener("click", (e) => {
    if (e.target.closest(".legend")) return;
    legendMod.classList.remove("legend-module-active");
});
