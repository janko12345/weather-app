import { hideErr, hideLoading, showErr, showLoading } from "./animations.js";
import { isEvent, saveToStorage } from "./helper-functions.js";
import { renderAll } from "./render-data.js";
import { getIpAddress } from "./track-user.js";

export async function getWeatherData(searchFor) {
    let argIsEvent = isEvent(searchFor);
    if (argIsEvent) {
        // in case target is input, which should
        if (searchFor.key === "Enter") {
            let city = searchFor.target.value;
            searchFor = {};
            searchFor.city = city;
        } else {
            return;
        }
    }

    showLoading();

    let weatherData;
    let isCity = searchFor !== null && searchFor.city !== undefined;

    if (searchFor !== null && isCity) {
        weatherData = await getWeatherDataByCity(searchFor.city);
    } else if (searchFor !== null && !isCity) {
        weatherData = await getWeatherDataByCoords(
            searchFor.latitude,
            searchFor.longitude
        );
    } else if (searchFor === null) {
        let ipAddress = await getIpAddress();
        if (ipAddress !== null) {
            weatherData = await getWeatherDataByIp(ipAddress);
        } else {
            weatherData = await getWeatherDataByCity("Bratislava");
        }
    }
    hideLoading();
    console.log(weatherData);
    if (weatherData === null) {
        showErr();
        setTimeout(() => {
            hideErr();
        }, 2000);
        return null;
    } else {
        saveToStorage("weather-data", weatherData);
        if (argIsEvent) {
            let dayToRender = 0;
            saveToStorage("rendered-day", 0);
            renderAll(weatherData, dayToRender); // have to render it here, because when triggered through event it just pull data
        }
    }
    return weatherData;
}

async function getWeatherDataByCoords(lat, lon) {
    try {
        let weatherData = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=cce7d49959c1448d9bb185355211201&q=${lat},${lon}&days=3`
        ).then((res) => res.json());
        return weatherData;
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function getWeatherDataByCity(cityName) {
    console.log(cityName);
    try {
        let city = await getCity(cityName); // this is needed, because searching by city on weatherapi is not 100% correct
        let { lat, lon } = city;

        let weatherData = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=cce7d49959c1448d9bb185355211201&q=${lat},${lon}&days=3`
        ).then((res) => res.json());
        let { village, town, suburb } = city.address;
        weatherData.location.name = village || town || suburb;
        return weatherData;
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function getWeatherDataByIp(ipAddress) {
    try {
        let weatherData = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=cce7d49959c1448d9bb185355211201&q=${ipAddress}&days=3`
        ).then((res) => res.json());
        return weatherData;
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function getCity(cityName) {
    let citiesData = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&city=${cityName}&zoom=18&addressdetails=1` // needed, cause weather api has incorrect city naming
    ).then((res) => res.json());
    let correctOne = citiesData.find((cityData) => {
        let { village, town, suburb } = cityData.address;
        [village, town, suburb] = [village, town, suburb].map((area) =>
            area ? area.toLowerCase() : null
        );
        cityName = cityName.toLowerCase();
        return cityName === village || cityName === town || cityName === suburb;
    });
    return correctOne;
}
