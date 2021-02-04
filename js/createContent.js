let forecast = document.querySelector(".forecast");
let forecasts = document.querySelector(".forecasts");
for (let i = 1; i < 24 / 3; i++) {
    let newForecast = forecast.cloneNode(true);
    forecasts.appendChild(newForecast);
}
