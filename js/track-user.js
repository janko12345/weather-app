function getPosition(options) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

export async function getUserCoords() {
    try {
        let position = await getPosition();
        let { latitude, longitude } = position.coords;
        return { latitude, longitude };
    } catch (denial) {
        return null;
    }
}

export async function getIpAddress() {
    try {
        let address = await fetch("https://api.ipify.org").then((res) =>
            res.text()
        );
        return address;
    } catch (e) {
        return null;
    }
}
