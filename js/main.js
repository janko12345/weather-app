import { updateSettings, setInitialSettings, getSettings } from "./settings.js";
import { pageLoadBlankRender, pageLoadDataRender } from "./initial-render.js";
import { renderAll } from "./renderData.js";
import {} from "./events.js"; // importing this just because events to be assigned

if (getSettings() === null) {
    setInitialSettings();
}

pageLoadBlankRender(); // needs this because it takes time while fetching data

pageLoadDataRender();

// events that changes data and also automatically rerenders it
let configMenu = document.querySelector(".config-menu");
configMenu.addEventListener("click", updateSettings);
configMenu.addEventListener("click", renderAll);
