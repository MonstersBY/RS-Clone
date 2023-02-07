export const burger = (
  menuSelector: string,
  UlSelector: string,
  burgerSelector: string,
  burgerLogoSelector: string,
  overlaySelector: string,
) => {
  const hamburger = document.querySelector(burgerSelector),
    menu = document.querySelector(menuSelector),
    menuList = document.querySelector(UlSelector),
    logoBurger = document.querySelector(burgerLogoSelector),
    overlay = document.querySelector(overlaySelector);


  function openMenu() {
    if(hamburger) hamburger.classList.toggle("open");
    if(menu) menu.classList.toggle("open");
    if(menuList) menuList.classList.toggle("open");
   if(overlay) overlay.classList.toggle("open");
    if(logoBurger) logoBurger.classList.toggle("open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (hamburger) hamburger.classList.remove("open");
    if (menu) menu.classList.remove("open");
    if (menuList) menuList.classList.remove("open");
    if(overlay) overlay.classList.remove("open");
    if(logoBurger) logoBurger.classList.remove("open");
    document.body.style.overflow = "";
  }

  if(menu) menu.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    if (target && target.classList.contains("menu__link")) {
      closeMenu();
    }
  });

  if (overlay) overlay.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    if (target && target.classList.contains("overlay")) {
      closeMenu();
    }
  });

  if(hamburger) hamburger.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;
    if (target && target.closest(".hamburger.open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });
};
export default burger;
