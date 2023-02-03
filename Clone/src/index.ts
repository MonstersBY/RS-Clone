import "./styles/main.scss";
import { toModePage } from "./modules/toModePage";
import { toRoomPage } from "./modules/toRoomPage";
import helperNode from "./modules/helper/helper";

document.addEventListener("DOMContentLoaded", () => {
  toModePage();
  toRoomPage();
});

document.body.insertAdjacentHTML("beforeend", helperNode);
const helperWrapper = document.querySelector(".helper__wrapper");
const helperBtn = document.querySelector(".helper___button");
const helperBody = document.querySelector(".helper__body");

helperWrapper?.addEventListener("click", (e) => {
  if (e.target === helperBtn) {
    helperBody?.classList.toggle("hidden");
    helperWrapper.classList.toggle("nobackground");
  }
  if (e.target === helperWrapper) {
    helperBody?.classList.add("hidden");
    helperWrapper.classList.add("nobackground");
  }
})
