async function getIpAddress() {
    let address = await fetch("https://api.ipify.org").then((res) =>
        res.text()
    );
    return address;
}

async function getIpData() {
    try {
        let ipAddress = await getIpAddress();
        let ipData = await fetch(
            `https://ipinfo.io/${ipAddress}?token=3e548cb9104eda`
        ).then((res) => res.json());
        return ipData;
    } catch (err) {
        console.log(err);
    }
}

function getPosition(options) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

export async function getCoords() {
    try {
        let position = await getPosition();
        let { latitude, longitude } = position.coords;
        return { latitude, longitude };
    } catch (denial) {
        let ip = await getIpData();
        if (ip) {
            let [latitude, longitude] = ip.loc.split(",");
            return { latitude, longitude };
        } else {
            return null;
        }
    }
}
