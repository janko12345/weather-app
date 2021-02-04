let sidebar = document.querySelector(".sidebar");
let burger = sidebar.querySelector(".hamburger-button");
let main = document.querySelector("main");
let gear = main.querySelector(".gear-icon");
let astronomyCnt = document.querySelector(".astronomy-wrapper");
let astronomy = document.querySelector(".astronomy");
let astronomyInfoToggler = main.querySelector(".astronomy-info-toggler");
let astronomyVisibilityToggler = main.querySelector(
    ".astronomy-visibility-toggler"
);
let changeInfoBtn = main.querySelector(".forecasts-buttons-change-info");
let secondaryInfos = [...main.querySelectorAll(".forecast-secondary-infos")];
let primaryInfos = [...main.querySelectorAll(".forecast-primary-infos")];
let dropdown = main.querySelector(".forecasts-buttons-dropdown");

burger.addEventListener("click", (e) => {
    sidebar.classList.toggle("sidebar-show");
    burger.classList.toggle("hamburger-button-active");
});

gear.addEventListener("click", (e) => {
    gear.classList.toggle("gear-icon-active");
});

astronomyInfoToggler.addEventListener("click", (e) => {
    astronomyInfoToggler.classList.toggle("astronomy-info-toggler-active");
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
            "forecasts-buttons-change-info-rotate-180"
        )
    ) {
        changeInfoBtn.classList.add("forecasts-buttons-change-info-rotate-360");
        changeInfoBtn.classList.remove(
            "forecasts-buttons-change-info-rotate-180"
        );
    } else if (
        changeInfoBtn.classList.contains(
            "forecasts-buttons-change-info-rotate-360"
        )
    ) {
        changeInfoBtn.classList.remove(
            "forecasts-buttons-change-info-rotate-360"
        );
        changeInfoBtn.classList.add("forecasts-buttons-change-info-rotate-180");
    } else
        changeInfoBtn.classList.add("forecasts-buttons-change-info-rotate-180");
});

dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("forecasts-buttons-dropdown-active");
});
