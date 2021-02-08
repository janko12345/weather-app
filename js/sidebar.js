let defaultCity = "London";

// DOM caching
let city = document.querySelector(".sidebar-city");
let fetchResHint = document.querySelector(".fetch-response");
let daysCnt = document.querySelector(".sidebar-days");
let todayCnt = daysCnt.querySelector(".sidebar-today");
let nextDaysCnt = daysCnt.querySelector(".sidebar-next-days");

async function fire() {
    try {
        let position = await getPosition();
        let { latitude, longitude } = position.coords;
        render(latitude, longitude);
    } catch (denial) {
        console.log("🚀 ~ denial", denial);
        let ipAddress = await getIpAddress();
        let ip = await getIpData(ipAddress);
        let [lat, lon] = ip.loc.split(",");
        render(lat, lon);
    }
}
function render(lat, lon) {
    fetchResHint.classList.add("fetch-response-in-proccess");
    Promise.all([
        fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1` // needed, cause weather api has incorrect city naming
        ),
        fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=cce7d49959c1448d9bb185355211201&q=${lat},${lon}&days=3`
        ),
    ])
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((resDatas) => {
            let [cityData, weatherData] = resDatas;
            if (weatherData.error && weatherData.error.code === 1006) {
                // no city found
                fetchResHint.classList.remove("fetch-response-in-proccess");
                fetchResHint.classList.add("fetch-response-failed");
                setTimeout(() => {
                    fetchResHint.classList.remove("fetch-response-failed");
                }, 2000);
            } else {
                let address = cityData.address;
                city.textContent =
                    address.village || address.town || address.suburb;
                let daysData = weatherData.forecast.forecastday;
                let today = daysData[0];
                let nextDays = daysData.slice(1);
                clearDays();
                fetchResHint.classList.remove("fetch-response-in-proccess");
                todayCnt.appendChild(createDayEl(today));
                nextDays.forEach((day) => {
                    nextDaysCnt.appendChild(createDayEl(day));
                });
            }
        })
        .catch(console.log);
}
initialRender();
fire();

function createDayEl(dayData) {
    let day = document.createElement("div");
    day.classList.add("sidebar-day");
    day.innerHTML = `
    <div class="sidebar-day-row">
    <img
        src="${dayData.day.condition.icon}"
        alt="dynamic"
        class="sidebar-day-img"
    />
    <p class="sidebar-day-temp">
        <span>${dayData.day.mintemp_c}</span>
        /
        <span>${dayData.day.maxtemp_c}</span>
        <span>°C</span>
    </p>
    </div>
    <div class="sidebar-day-row">
        <p>${getDayName(dayData.date)}</p>
        <p>snowy</p>
    </div>`;
    return day;
}

function getDayName(date) {
    let weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let dayNum = new Date(date).getDay();
    return weekDays[dayNum];
}

async function getIpData(ipAddress) {
    try {
        let ipDataRes = await fetch(
            `https://ipinfo.io/${ipAddress}?token=3e548cb9104eda`
        );
        let ipData = await ipDataRes.json();
        console.log("🚀 ~ ipData", ipData);
        return ipData;
    } catch (err) {
        console.log(err);
        return "ip location not found";
    }
}

async function getIpAddress() {
    let ipRes = await fetch("https://api.ipify.org");
    let address = await ipRes.text();
    return address;
}

function getPosition(options) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

function createBlankDayEl() {
    let day = document.createElement("div");
    day.classList.add("sidebar-day");
    day.innerHTML = `
    <div class="sidebar-day-row">
    <i class="fas fa-image"></i>
    <p class="sidebar-day-temp">
        <span>--</span>
        /
        <span>--</span>
    </p>
    </div>
    <div class="sidebar-day-row">
        <p>----</p>
        <p>----</p>
    </div>`;
    return day;
}
function initialRender() {
    todayCnt.appendChild(createBlankDayEl());

    for (let i = 0; i < 2; i++) {
        nextDaysCnt.appendChild(createBlankDayEl());
    }
}

function clearDays() {
    let days = [...daysCnt.querySelectorAll(".sidebar-day")];
    days.forEach((day) => {
        day.parentNode.removeChild(day);
    });
}
