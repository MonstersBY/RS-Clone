export const costListener = () => {
  const costBtn = document.querySelector(".construction__btn");
  const constructionBlock = document.querySelector(".construction-cost");

  costBtn?.addEventListener("click", () => {
    constructionBlock?.classList.toggle("cost");
  })
}