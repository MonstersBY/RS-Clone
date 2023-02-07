export const changeHeader = () => {
  const logo = document.querySelector(".header__logo");
  const headerMenu = document.querySelector(".header-menu");
  const hamburger = document.querySelector(".hamburger");
  logo?.classList.add('hidden');
  headerMenu?.classList.add('ingame');
  hamburger?.classList.add("block");
}

const hiddenFooter = () => {
  const footer = document.querySelector('.footer');
  footer?.classList.add('hidden');
}
