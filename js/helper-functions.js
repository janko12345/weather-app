export function getDayName(date) {
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

export function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function isEvent(whatever) {
    return whatever instanceof Event;
}

export function to24HourCycle(timeString) {
    if (!timeString.includes(":")) {
        return timeString;
    } else {
        let [time, period] = timeString.split(" ");
        let [hours, minutes] = time.split(":");
        if (period.toLowerCase() === "pm") {
            hours = parseInt(hours) + 12 + "";
        }
        return `${hours}:${minutes}`;
    }
}

export function getLeadingZero(time) {
    return (time = ("0" + time).slice(-2));
}
