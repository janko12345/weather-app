import { setInitialSettings, getSettings } from "./settings.js";
import { pageLoadBlankRender, pageLoadDataRender } from "./render-initial.js";
import {} from "./events.js"; // importing this just because events to be assigned

if (getSettings() === null) {
    setInitialSettings();
}

pageLoadBlankRender(); // needs this because it takes time while fetching data

pageLoadDataRender();
