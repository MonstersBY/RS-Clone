export const modificatePage = () => {
  document.body.style.background = "rgb(0, 145, 204)";

    // "radial-gradient(circle,#009bda 0,#0091cc 18%,#2280b7 23%,#07486e 65%)";
  changeHeader();
  changeContainer();
  hiddenFooter();
}

  const changeHeader = () => {
  const logo = document.querySelector(".header__logo");
  const headerProfile = document.querySelector(".header__profile");
  const headerMenu = document.querySelector(".header-menu");
  const hamburger = document.querySelector(".hamburger");
  const tradeBtns = document.querySelectorAll('.trade__btn');

  logo?.classList.add('hidden');
  headerProfile?.classList.add('hidden');
  headerMenu?.classList.add('ingame');
  hamburger?.classList.add("block");

    tradeBtns.forEach((btn) => {
    btn.classList.remove("hidden");
    btn.classList.add("block");
  });
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
