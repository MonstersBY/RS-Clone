import "./styles/main.scss";
import { toModePage } from "./modules/StartPage/templates/StartPage/templates/renderModePage";
import { toRoomPage } from "./modules/StartPage/templates/renderRoomPage";
import addHelper from "./modules/StartPage/templates/ingamePopupHelper/helper";
import App from "./modules/App";

document.addEventListener("DOMContentLoaded", () => {
  toModePage();
  toRoomPage();
  addHelper();
});

const app = new App();
app.init();
