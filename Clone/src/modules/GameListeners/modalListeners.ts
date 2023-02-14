export const costListener = () => {
  // const costBtn = document.querySelector(".construction__btn");
  const constructionBlock = document.querySelector(".construction-cost");

  document.addEventListener("click", (e: Event) => {
    if (e.target instanceof HTMLElement) {
      if (e.target && e.target.classList.contains("construction__btn")) {
        constructionBlock?.classList.toggle("cost");
      }
    }
  });
}
export const tradeListener = () => {
  // const costBtn = document.querySelector(".construction__btn");
  const constructionBlock = document.querySelector(".modal-trade");

  document.addEventListener("click", (e: Event) => {
    if (e.target && e.target instanceof HTMLElement) {
      const target = e.target.closest(".trade__btn");
      if (target && target.classList.contains("trade__btn")) {
        constructionBlock?.classList.toggle("trade");
      }
    }
  });
};
