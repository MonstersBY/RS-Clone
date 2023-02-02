import { renderModePaGe } from "../templates/renderModePage";

export const toModePage = () => {
  const modeBtns = document.querySelectorAll(".mode__page");
  if (modeBtns) {
    modeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        renderModePaGe();
      });
    });
  }
}
