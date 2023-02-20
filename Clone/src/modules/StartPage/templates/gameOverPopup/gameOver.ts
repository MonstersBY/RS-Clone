import { IPlayerInfo } from "../../../types/types";

export const modal = document.createElement("div");

export function closeModal() {
  const element = document.querySelector(".modal");
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

const createModal = (player: IPlayerInfo) => {
  const scroll = calcScroll();

  modal.classList.add("modal", "slideInDown");
  modal.setAttribute("id", "exampleModal2");
  modal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-content">
            <button class="close" data-close>
              <span>&times;</span>
            </button>
            <div class="modal-header">
              <div class="modal-title">GAME OVER!</div>
            </div>
            <div class="modal-body">
              ${player.name} win in this game!
            </div>
            <div class="modal-footer">
              <span class="congratulation">Congratulations!</span>
            </div>
          </div>
        </div>
      `;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

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
        closeModal();
      }
    });
  }
};
export default createModal;
