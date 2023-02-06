import "./styles/main.scss";
import { toModePage } from "./modules/StartPage/templates/renderModePage";
import { toRoomPage } from "./modules/StartPage/templates/renderRoomPage";
import helperNode from "./modules/helper/helper";
import { diceRoll } from "./modules/diceRoll/diceRoll";


document.addEventListener("DOMContentLoaded", () => {
  toModePage();
  toRoomPage();
  diceRoll();

});

document.body.insertAdjacentHTML("beforeend", helperNode);
const helperWrapper = document.querySelector(".helper__wrapper");
const helperBtn = document.querySelector(".helper___button");
const helperBody = document.querySelector(".helper__body");

document.addEventListener("click", (e) => {
  if (e.target === helperBtn) {
    helperBody?.classList.toggle("hidden");
    helperWrapper?.classList.toggle("hidden");
  }
  if (e.target === helperWrapper) {
    helperBody?.classList.add("hidden");
    helperWrapper?.classList.add("hidden");
  }
});
