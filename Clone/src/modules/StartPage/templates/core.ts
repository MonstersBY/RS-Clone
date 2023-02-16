export const core = `
  <header class="header header__wrapper flex-row">
      <a href="/" class="logo header__logo flex-bs">
          <img src="assets/images/logo.png" alt="logo" class="logo__img">
      </a>
    <nav class="menu header-menu">
        <a href="/" class="logo burger__logo flex-bs">
        <img src="assets/images/logo.png" alt="logo" class="logo__img">
        </a>
      <ul class="menu__list header-menu__list flex-row">
          <li class="menu__list-item mode__page">
              <a href="/mode" class="link menu__link active">Play Page</a>
          </li>
      </ul>
      <div class="overlay"></div>
    </nav>
    <div class="hamburger">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
  <div class="header__profile">
      <div class="header-login__wrapper">
          <div class="login__container flex-row">
              <div class="header-icon__wrap">
                  <img src="assets/images/icons/icon_player.svg" alt="player icon" class="player__icon">
                  <img src="#" alt="membership icon" class="player__icon-membership">
              </div>
              <div class="login__nickname">
                  <p class="nickname">YaniaR#1000</p>
              </div>
          </div>
      </div>
  </div>
  </header>
  <main class="main-content">
    <div class="container" id="main"></div>
  </main>
  <footer class="footer">
  <div class="container footer__wrapper">
      <div class="social__icons">
          <div class="socila__icons-wrapper">
              <a href="https://discord.com/invite/uzCKAWV6qm" target='_blank' class="link social__link">
                  <img src="assets/images/icons/social__icons/social_icon_discord.svg" alt="discord icon" class="social__ico">
              </a>
              <a href="https://www.facebook.com/colonistio/" target='_blank' class="social__link">
                  <img src="assets/images/icons/social__icons/social_icon_facebook.svg" alt="facebook icon" class="social__ico"></a>
              <a href="https://twitter.com/colonistio" target='_blank' class="social__link">
                  <img src="assets/images/icons/social__icons/social_icon_instagram.svg" alt="instagram icon" class="social__ico">
              </a>
              <a href="https://www.instagram.com/colonist_io/" target=_blank' class="social__link">
                  <img src="assets/images/icons/social__icons/social_icon_twitter.svg" alt="twitter icon" class="social__ico">
              </a>
              <a href="https://www.youtube.com/channel/UCkmPiTR8n0zqT6tIuUK0klA" target='_blank' class="social__link">
                  <img src="assets/images/icons/social__icons/social_icon_youtube.svg" alt="youtube icon" class="social__ico">
              </a>
          </div>
      </div>
      <div class="copirate footer__copirate">
          <div>©</div>
          <div>2023</div>
          <div> Created by:
              <a class="copirate__link" href="https://github.com/Arantola">Arantola</a>
              <a class="copirate__link" href="https://github.com/MonstersBY">MonstersBY</a>
              <a class="copirate__link" href="https://github.com/YanaPronko">Yana Pronko</a>
          </div>
      </div>
      <div class="footer__logo">
          <a class="link copirate__link" href="https://rs.school/js/">
              <svg class="rss__logo">
                  <use xlink:href="assets/images/icons/sprite.svg#rss"></use>
              </svg>
          </a>
      </div>
  </div>
  </footer>
`;

export const renderCore = () => {
  document.body.innerHTML = "";
  document.body.insertAdjacentHTML("beforeend", core);
};
