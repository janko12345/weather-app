let sidebar = document.querySelector(".sidebar");
let search = sidebar.querySelector(".sidebar-search");
let fetchResponse = sidebar.querySelector(".fetch-response");
let burger = sidebar.querySelector(".hamburger-button");
let main = document.querySelector("main");
let gear = main.querySelector(".config-gear-icon");
let configMenu = main.querySelector(".config-menu");
let astronomyCnt = document.querySelector(".astronomy-wrapper");
let astronomy = document.querySelector(".astronomy");
let astronomyInfoToggler = main.querySelector(".astronomy-info-toggler");
let astronomyVisibilityToggler = main.querySelector(
    ".astronomy-visibility-toggler"
);
let changeInfoBtn = main.querySelector(".forecasts-buttons-switch-img");
let secondaryInfos = [...main.querySelectorAll(".forecast-secondary-infos")];
let primaryInfos = [...main.querySelectorAll(".forecast-primary-infos")];
let dropdown = main.querySelector(".forecasts-buttons-dropdown-img");
let dropdownMenu = main.querySelector(".forecasts-buttons-dropdown-menu");

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

changeInfoBtn.addEventListener("click", (e) => {
    secondaryInfos.forEach((secondaryInfo) =>
        secondaryInfo.classList.toggle("hide")
    );
    primaryInfos.forEach((primaryInfo) => primaryInfo.classList.toggle("hide"));
    if (
        changeInfoBtn.classList.contains(
            "forecasts-buttons-switch-img-rotate-180"
        )
    ) {
        changeInfoBtn.classList.add("forecasts-buttons-switch-img-rotate-360");
        changeInfoBtn.classList.remove(
            "forecasts-buttons-switch-img-rotate-180"
        );
    } else if (
        changeInfoBtn.classList.contains(
            "forecasts-buttons-switch-img-rotate-360"
        )
    ) {
        changeInfoBtn.classList.remove(
            "forecasts-buttons-switch-img-rotate-360"
        );
        changeInfoBtn.classList.add("forecasts-buttons-switch-img-rotate-180");
    } else
        changeInfoBtn.classList.add("forecasts-buttons-switch-img-rotate-180");
});

dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("forecasts-buttons-dropdown-img-active");
    dropdownMenu.classList.toggle("forecasts-buttons-dropdown-menu-active");
});

dropdownMenu.addEventListener("click", (e) => {
    if (e.target.classList.contains("forecasts-buttons-dropdown-item")) {
        dropdownMenu
            .querySelector(".forecasts-buttons-dropdown-item-active")
            .classList.remove("forecasts-buttons-dropdown-item-active");
        e.target.classList.add("forecasts-buttons-dropdown-item-active");
        dropdownMenu.classList.remove("forecasts-buttons-dropdown-menu-active");
    }
});
