export function toggleSidebar() {
    let sidebar = document.querySelector(".sidebar");
    let burger = sidebar.querySelector(".hamburger-button");

    sidebar.classList.toggle("sidebar-show");
    burger.classList.toggle("hamburger-button-active");
}

export function toggleConfig() {
    let gear = document.querySelector(".config-gear-icon");
    let configMenu = document.querySelector(".config-menu");

    gear.classList.toggle("config-gear-icon-active");
    configMenu.classList.toggle("config-menu-active");
}

export function switchConfigInfo() {
    let formatMenu = document.querySelector("#format-menu");
    let otherMenu = document.querySelector("#other-menu");

    formatMenu.classList.toggle("hide");
    otherMenu.classList.toggle("hide");
}

export function switchSunMoon() {
    let astronomyCnt = document.querySelector(".astronomy-wrapper");
    let astronomyInfoToggler = document.querySelector(
        ".astronomy-info-toggler"
    );

    astronomyInfoToggler.classList.toggle("astronomy-info-toggler-active");
    astronomyCnt.classList.toggle("astronomy-info-toggled");
}

export function toggleAstronomyVisibility() {
    let astronomy = document.querySelector(".astronomy");
    let astronomyVisibilityToggler = document.querySelector(
        ".astronomy-visibility-toggler"
    );

    astronomy.classList.toggle("astronomy-hide");
    astronomyVisibilityToggler.classList.toggle(
        "astronomy-visibility-toggler-rolled-up"
    );
}

export function toggleDropdown() {
    let dropdownImg = document.querySelector(".forecasts-dropdown-img");
    let dropdownMenu = document.querySelector(".forecasts-dropdown-menu");

    dropdownImg.classList.toggle("forecasts-dropdown-img-active");
    dropdownMenu.classList.toggle("forecasts-dropdown-menu-active");
}

export function hideDropdown(e) {
    let dropdownImg = document.querySelector(".forecasts-dropdown-img");
    let dropdownMenu = document.querySelector(".forecasts-dropdown-menu");

    if (e.target.classList.contains("forecasts-dropdown-item")) {
        dropdownMenu.classList.remove("forecasts-dropdown-menu-active");
        dropdownImg.classList.remove("forecasts-dropdown-img-active");
    }
}

export function switchForecastInfo() {
    let switchInfoImg = document.querySelector(".forecasts-switch-info-img");
    let secondaryInfos = [
        ...document.querySelectorAll(".forecast-secondary-infos"),
    ];
    let primaryInfos = [
        ...document.querySelectorAll(".forecast-primary-infos"),
    ];

    secondaryInfos.forEach((secondaryInfo) =>
        secondaryInfo.classList.toggle("hide")
    );
    primaryInfos.forEach((primaryInfo) => primaryInfo.classList.toggle("hide"));
    rotate360Right(switchInfoImg);
}

export function showLegend() {
    let legendMod = document.querySelector(".legend-module");

    legendMod.classList.add("legend-module-active");
}

export function hideLegend(e) {
    if (e.target.closest(".legend")) {
        // clicked on legend, dont close
        return;
    }
    let legendMod = document.querySelector(".legend-module");

    legendMod.classList.remove("legend-module-active");
}

export function showLoading() {
    let fetchResponse = document.querySelector(".fetch-response");

    fetchResponse.classList.add("fetch-response-in-process");
}

export function hideLoading() {
    let fetchResponse = document.querySelector(".fetch-response");

    fetchResponse.classList.remove("fetch-response-in-process");
}

export function showErr() {
    let fetchResponse = document.querySelector(".fetch-response");

    fetchResponse.classList.add("fetch-response-failed");
}

export function hideErr() {
    let fetchResponse = document.querySelector(".fetch-response");

    fetchResponse.classList.remove("fetch-response-failed");
}

function rotate360Right(element) {
    if (element.classList.contains("switch-info-img-rotate-180")) {
        element.classList.add("switch-info-img-rotate-360");
        element.classList.remove("switch-info-img-rotate-180");
    } else if (element.classList.contains("switch-info-img-rotate-360")) {
        element.classList.remove("switch-info-img-rotate-360");
        element.classList.add("switch-info-img-rotate-180");
    } else element.classList.add("switch-info-img-rotate-180");
}
