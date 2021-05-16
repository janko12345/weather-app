export async function getWeatherDataByCoords(lat, lon) {
    try {
        let weatherData = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=cce7d49959c1448d9bb185355211201&q=${lat},${lon}&days=3`
        ).then((res) => res.json());
        console.log(weatherData);
        return weatherData;
    } catch (e) {
        console.log(e);
    }
}

export async function getWeatherDataByCity(cityName) {
    try {
        let weatherData = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=cce7d49959c1448d9bb185355211201&q=${cityName}&days=3`
        ).then((res) => res.json());
        console.log(weatherData);
        return weatherData;
    } catch (e) {
        console.log(e);
    }
}

export async function getWeatherDataByIp(ipAddress) {
    try {
        let weatherData = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=cce7d49959c1448d9bb185355211201&q=${ipAddress}&days=3`
        ).then((res) => res.json());
        console.log(weatherData);
        return weatherData;
    } catch (e) {
        console.log(e);
    }
}
