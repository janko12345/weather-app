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
