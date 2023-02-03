import { renderRoomPage } from '../templates/renderRoomPage';

export const toRoomPage = () => {
  const container = document.querySelector(".container");
  if (container) {
    container.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target && target.classList.contains("create__btn")) {
        e.preventDefault();
        renderRoomPage();
      }
    });
  }
}


