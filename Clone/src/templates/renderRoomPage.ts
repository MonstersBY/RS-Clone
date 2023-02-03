export const renderRoomPage = () => {
  const container = document.querySelector(".container");

  if (container) container.innerHTML = "";

  const roomPageWrap = document.createElement('div');
  roomPageWrap.classList.add('room-page__wrapper');
  roomPageWrap.innerHTML = `
      <div class="room__block room__block_left">
        <h2 class="subtitle">Players (4)</h2>
        <ul class="player__list">
            <li class="player__list-item">
                <div class="player__info">
                    <div class="player__name">
                        <img src="assets/images/icons/icon_player.svg" alt="player icon" class="player__icon">
                        <span>Jer#7164</span>
                    </div>
                    <div class="player__karma">Karma: 0/0</div>
                    <div class="player__color">
                        <select class="color__select" ">
                            <option value="Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Orange">Orange</option>
                            <option value="Green">Green</option>
                            <option value="Black">Black</option>
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="White">White</option>
                            <option value="Purple">Purple</option>
                            <option value="MysticBlue">MysticBlue</option>
                        </select>
                        <img src="assets/images/map_animation/road_red.svg" alt="Road" width="15" height="15">
                        <img src="assets/images/map_animation/settlement_red.svg" alt="Settlement" width="15" height="15">
                        <img src="assets/images/map_animation/city_red.svg" alt="City" width="15" height="15">
                    </div>
                </div>
                <div class="state__btn not_ready">
                    <span>Not ready</span>
                    <img src="assets/images/icons/icon_x.svg" alt="not ready"  class="status__icon">
                </div>
            </li>
            <li class="player__list-item">
                <div class="player__info">
                    <div class="player__name">
                        <img src="assets/images/icons/icon_player.svg" alt="player icon" class="player__icon">
                        <span>YaniaR#1000</span>
                    </div>
                    <div class="player__karma">Karma: 0/0</div>
                    <div class="player__color">
                        <select class="color__select" ">
                            <option value=" Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Orange">Orange</option>
                            <option value="Green">Green</option>
                            <option value="Black">Black</option>
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="White">White</option>
                            <option value="Purple">Purple</option>
                            <option value="MysticBlue">MysticBlue</option>
                        </select>
                        <img src="assets/images/map_animation/road_green.svg" alt="Road" width="15" height="15">
                        <img src="assets/images/map_animation/settlement_green.svg" alt="Settlement" width="15" height="15">
                        <img src="assets/images/map_animation/city_green.svg" alt="City" width="15" height="15">
                    </div>
                </div>
                <div class="state__btn">
                    <span>Ready</span>
                    <img src="assets/images/icons/icon_check.svg" alt="ready" class="status__icon">
                </div>
            </li>
            <li class="player__list-item">
                <div class="player__info">
                    <div class="player__name">
                        <img src="assets/images/icons/icon_player.svg" alt="player icon" class="player__icon">
                        <span>Arantola#7164</span>
                    </div>
                    <div class="player__karma">Karma: 0/0</div>
                    <div class="player__color">
                        <select class="color__select" ">
                            <option value=" Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Orange">Orange</option>
                            <option value="Green">Green</option>
                            <option value="Black">Black</option>
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="White">White</option>
                            <option value="Purple">Purple</option>
                            <option value="MysticBlue">MysticBlue</option>
                        </select>
                        <img src="assets/images/map_animation/road_blue.svg" alt="Road" width="15" height="15">
                        <img src="assets/images/map_animation/settlement_blue.svg" alt="Settlement" width="15" height="15">
                        <img src="assets/images/map_animation/city_blue.svg" alt="City" width="15" height="15">
                    </div>
                </div>
                <div class="state__btn">
                    <span>Ready</span>
                    <img src="assets/images/icons/icon_check.svg" alt="ready" class="status__icon">
                </div>
            </li>
            <li class="player__list-item">
                <div class="player__info">
                    <div class="player__name">
                        <img src="assets/images/icons/icon_player.svg" alt="player icon" class="player__icon">
                        <span>MonstersBY#6664</span>
                    </div>
                    <div class="player__karma">Karma: 0/0</div>
                    <div class="player__color">
                        <select class="color__select" ">
                            <option value=" Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Orange">Orange</option>
                            <option value="Green">Green</option>
                            <option value="Black">Black</option>
                            <option value="Bronze">Bronze</option>
                            <option value="Silver">Silver</option>
                            <option value="Gold">Gold</option>
                            <option value="White">White</option>
                            <option value="Purple">Purple</option>
                            <option value="MysticBlue">MysticBlue</option>
                        </select>
                        <img src="assets/images/map_animation/road_orange.svg" alt="Road" width="15" height="15">
                        <img src="assets/images/map_animation/settlement_orange.svg" alt="Settlement" width="15" height="15">
                        <img src="assets/images/map_animation/city_orange.svg" alt="City" width="15" height="15">
                    </div>
                </div>
                <div class="state__btn">
                    <span>Ready</span>
                    <img src="assets/images/icons/icon_check.svg" alt="ready" class="status__icon">
                </div>
            </li>
        </ul>
    </div>
    <div class="room__block room__block_mid">
        <div class="room__header">
            <h2 id="about" class="subtitle">Game Settings</h2>
            <img src="assets/images/icons/icon_x.svg" alt="trash icon" class="status__icon">
        </div>
        <div class="settings__block">
            <div class="settings__inputs">
                <div class="setting__input">
                    <div class="setting__input-item selected">
                        <div class="option__title flex-bs">
                            <h4 class="setting__title">Hide Bank Cards</h4>
                        </div>
                        <input type="checkbox" checked class="checkbox">
                    </div>
                    <div class="setting__input-item selected">
                        <div class="option__title flex-bs">
                            <h4 class="setting__title">Friendly Robber</h4>
                        </div>
                        <input type="checkbox" checked class="checkbox">
                    </div>
                </div>
                <div class="settings__options">
                    <div class="setting__input-item game__mode">
                        <div class="option__title flex-bs">
                            <h4 class="setting__title">Game Mode</h4>
                        </div>
                        <div class="option__body flex-bs">
                            <select name="gameMode" id="gameMode" class="options__select">
                                <option value="4Players" class="game__mode-option">Base: 4 Players</option>
                                <option value="1vs1" class="game__mode-option">1 vs 1</option>
                                <option value="Cities" class="game__mode-option">Cities and Knights</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="settings__options">
                    <div class="setting__input-item game__mode">
                        <div class="option__title flex-bs">
                            <h4 class="setting__title">Map</h4>
                        </div>
                        <div class="option__body flex-bs">
                            <select name="gameMode" id="gameMode" class="options__select">
                                <option value="4Players" class="game__mode-option">Classic</option>
                                <option value="1vs1" class="game__mode-option">Classic Random</option>
                            </select>
                        </div>
                    </div>
                <div class="setting__input-item game__mode">
                    <div class="option__title flex-bs">
                        <h4 class="setting__title">Dice</h4>
                    </div>
                    <div class="option__body flex-bs">
                        <select name="gameMode" id="gameMode" class="options__select">
                            <option value="4Players" class="game__mode-option">Random</option>
                            <option value="1vs1" class="game__mode-option">Balanced</option>
                        </select>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="settings__footer">
            <div class="ready__block">
                <span>I'm Ready</span>
                <input type="checkbox" class="ready__checkbox">
                <p class="ready__span" hidden="">All players need to be ready for host to start the game.</p>
            </div>
            <div class="start">
                <a href="#" class="btn start__game flex-bs">START GAME</a>
            </div>
        </div>
    </div>
    <div class="room__block room__block_right">
        <div class="room__header">
            <img src="assets/images/icons/chat/icon_sound_on.svg" alt="sound on" class="sound__icon">
            <h2 id="about" class="subtitle">Room Chat</h2>
            <img src="assets/images/icons/chat/icon_trash.svg" alt="trash icon" class="trash__icon">
        </div>
        <div class="chat__messages">
            <div class="message__post">
                <img src="assets/images/icons/icon_player.svg" alt="" class="nick">
                <b>some:</b> Hi
            </div>
        </div>
        <form action="#" class="chat__form">
            <input type="text" autocomplete="off" placeholder="Say hello" maxlength='200' aria-label="Send message input" class="chat__input">
            <button class="form-send__btn">
                <img src="assets/images//icons/chat/icon__send.svg" alt="send icon" class="send__icon">
            </button>
        </form>
    </div>
  `;
  if (container) container.append(roomPageWrap);
}
