export async function getWeatherData(lat, lon) {
    try {
        let [cityData, weatherData] = await Promise.all([
            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1` // needed to search for city name, cause weather api has incorrect city naming
            ),
            fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=cce7d49959c1448d9bb185355211201&q=${lat},${lon}&days=3`
            ),
        ]).then((responses) => Promise.all(responses.map((res) => res.json())));
        let { village, suburb, state, town } = cityData.address;
        weatherData.location.name = village || town || suburb;
        weatherData.location.region = state;
        return weatherData;
    } catch (e) {
        console.log(e);
    }
}
