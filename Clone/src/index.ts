import "./styles/main.scss";
import { toModePage } from "./modules/StartPage/templates/toModePage";
import addHelper from "./modules/StartPage/templates/ingamePopupHelper/helper";
import App from "./modules/App";

document.addEventListener("DOMContentLoaded", () => {
  toModePage();
  addHelper();
});

const app = new App();
app.init();
