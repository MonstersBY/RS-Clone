import { IPlayerInfo } from "../../../types/types";

export const modal = document.createElement("div");

export function closePopup() {
  window.location.pathname = '/mode'
  const element = document.querySelector(".popup");
  if (element) {
    element.classList.add("slideInUp");
    element.classList.remove("slideInDown");
    setTimeout(() => {
      element.remove();
    }, 500);
  }
  document.body.style.overflow = "";
  document.body.style.marginRight = "0px";
}

const victoryPopup = (player: IPlayerInfo) => {
  const scroll = calcScroll();

  modal.classList.add("popup", "slideInDown");
  modal.setAttribute("id", "exampleModal2");
  modal.innerHTML = `
        <div class="popup-dialog">
          <div class="popup-content">
            <button class="close" data-close>
              <span>&times;</span>
            </button>
            <div class="popup-header">
              <div class="popup-title">GAME OVER!</div>
            </div>
            <div class="popup-body">
              ${player.name} win in this game!
            </div>
            <div class="popup-footer">
              <span class="congratulation">Congratulations!</span>
            </div>
          </div>
        </div>
      `;

  document.body.append(modal);
  document.body.style.overflow = "hidden";
  document.body.style.marginRight = `${scroll}px`;

  function calcScroll() {
    const div = document.createElement("div");
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";
    document.body.append(div);

    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  const closeElem = document.querySelector("[data-close]");
  if (closeElem) {
    closeElem.addEventListener("click", (e) => {
      const target = e.target;
      if (
        target &&
        target instanceof HTMLElement &&
        target.closest("[data-close]")
      ) {
        closePopup();
      }
    });
  }
};
export default victoryPopup;
