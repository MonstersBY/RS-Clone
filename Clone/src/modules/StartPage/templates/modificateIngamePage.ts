export const modificatePage = () => {
  if (window.location.pathname === "/game") {
    document.body.style.background = "rgb(0, 145, 204)";
    changeHeader();
    changeContainer();
    hiddenFooter();
  }
}

const changeHeader = () => {
  const header = document.querySelector(".header");
  header?.classList.add("hidden");
}

const changeContainer = () => {
  const container = document.querySelector<HTMLDivElement>(".container");
  if (container) {
    container.style.paddingLeft = "0";
    container.style.paddingRight = "0";
    container.style.maxWidth = '100%';
  }
}

const hiddenFooter = () => {
  const footer = document.querySelector('.footer');
  footer?.classList.add('hidden');
}
