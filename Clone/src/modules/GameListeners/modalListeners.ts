export const costListener = () => {
  const constructionBlock = document.querySelector(".construction-cost");

  document.addEventListener("click", (e: Event) => {
    if (e.target instanceof HTMLElement) {
      if (e.target && e.target.classList.contains("construction__btn")) {
        constructionBlock?.classList.toggle("modal");
      }
    }
  });
}

export const tradeListener = () => {
  const modalTrade = document.querySelector(".modal-trade");

  document.addEventListener("click", (e: Event) => {
    if (e.target && e.target instanceof HTMLElement) {
      const target = e.target.closest(".trade__btn");
      if (target && target.classList.contains("trade__btn")) {
        modalTrade?.classList.toggle("modal");
      }
    }
  });
};

export const monopolyListener = () => {
  const modalMonopoly = document.querySelector(".monopoly-choose");

  document.addEventListener("click", (e: Event) => {
    if (e.target && e.target instanceof HTMLElement) {
      const target = e.target.closest(".dev-monopoly");
      if (target && target.classList.contains("dev-monopoly")) {
        modalMonopoly?.classList.toggle("modal");
      }
    }
  });
};

export const plentyListener = () => {
  const modalPlenty = document.querySelector(".plenty-choose");

  document.addEventListener("click", (e: Event) => {
    if (e.target && e.target instanceof HTMLElement) {
      const target = e.target.closest(".dev-plenty");
      if (target && target.classList.contains("dev-plenty")) {
        modalPlenty?.classList.toggle("modal");
      }
    }
  });
};
