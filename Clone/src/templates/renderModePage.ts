export const renderModePaGe = () => {
  const container = document.querySelector(".container");

  if (container) container.innerHTML = "";

  const landingPageWrap = document.createElement('div');
  landingPageWrap.classList.add('landing-page__wrapper');
  landingPageWrap.innerHTML = `
        <div class="ranked-block__wrapper">
          <h2 class="ranked-cards__title">Play Ranked</h2>
          <div class="ranked-cards__wrapper">
            <div class="ranked-card">
              <div class="ranked-card__img-container">
                <img src="assets/images/icons/icon_gamemode_base.svg" alt="map icon" class="ranked-card__img">
              </div>
              <div class="ranked-card__text">
                <h3 class="ranked-card__title">4 Players</h3>
                <div class="ranked-card__link">
                  <a href="#" class="link login__link">Log in to play ranked</a>
                </div>
              </div>
              <div class="ranked-card__icon">
                <img src="assets/images/icons/icon_info.svg" alt="info icon" class="info__icon">
              </div>
            </div>
            <div class="ranked-card">
              <div class="ranked-card__img-container">
                <img src="assets/images/icons/icon_gamemode_1v1.svg" alt="map icon" class="ranked-card__img">
              </div>
              <div class="ranked-card__text">
                <h3 class="ranked-card__title">1 vs 1</h3>
                <div class="ranked-card__link">
                  <a href="#" class="link login__link">Log in to play ranked</a>
                </div>
              </div>
              <div class="ranked-card__icon">
                <img src="assets/images/icons/icon_info.svg" alt="info icon" class="info__icon">
              </div>
            </div>
            <div class="ranked-card">
              <div class="ranked-card__img-container">
                <img src="assets/images/icons/icon_gamemode_citiesandknights.svg" alt="map icon" class="ranked-card__img">
              </div>
              <div class="ranked-card__text">
                <h3 class="ranked-card__title">Cities & Knights</h3>
                <div class="ranked-card__link">
                  <a href="#" class="link login__link">Log in to play ranked</a>
                </div>
              </div>
              <div class="ranked-card__icon">
                <img src="assets/images/icons/icon_info.svg" alt="info icon" class="info__icon">
              </div>
            </div>
            </div>
          </div>
        <div class="landing-page_right">
          <h1 class="title">#1 Free Online Alternative to Settlers of Catan</h1>
          <div class="social__proof">
            <span class="span__left"><b>4009</b> online</span>
            <span class="span__right"><b>98,714</b> games today</span>
          </div>
          <div class="buttons__wrapper">
            <a href="#" class="btn btn__left flex-bs">Create room</a>
            <a href="#" class="btn btn__left flex-bs">Play vs Bots</a>
          </div>
          <a href="#" class="btn play__btn">Play
            <span class="btn__span">Ranked / Unranked</span>
          </a>
        </div>
  `;
  if (container) container.append(landingPageWrap);
}