let sidebar = document.querySelector(".sidebar");
let burger = sidebar.querySelector(".hamburger-button");
let main = document.querySelector("main");
let gear = main.querySelector(".gear-icon");

burger.addEventListener("click", (e) => {
    sidebar.classList.toggle("sidebar-show");
    burger.classList.toggle("hamburger-button-active");
});

gear.addEventListener("click", (e) => {
    gear.classList.toggle("gear-icon-active");
});
