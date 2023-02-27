export const room = `
    <div class="room-page__wrapper">
      <div class="room__block room__block_left">
        <h2 class="subtitle">Players (4)</h2>
        <ul class="player__list">
        </ul>
    </div>
    <div class="room__block room__block_mid">
        <div class="room__header">
            <h2 id="about" class="subtitle">Game Settings</h2>
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
                            <select id="gameMode" class="options__select">
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
                            <select id="gameMap" class="options__select">
                                <option value="newbie" class="game__mode-option">Classic</option>
                                <option value="random" class="game__mode-option">Classic Random</option>
                            </select>
                        </div>
                    </div>
                <div class="setting__input-item game__mode">
                    <div class="option__title flex-bs">
                        <h4 class="setting__title">Dice</h4>
                    </div>
                    <div class="option__body flex-bs">
                        <select id="diceMode" class="options__select">
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
                <a id="start-game" class="btn start__game flex-bs">START GAME</a>
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
        </div>
        <div class="chat__form">
            <input type="text" autocomplete="off" placeholder="Say hello" maxlength='200' aria-label="Send message input" class="chat__input">
            <button class="form-send__btn" type="submit">
                <img src="assets/images//icons/chat/icon__send.svg" alt="send icon" class="send__icon">
            </button>
        </div>
    </div>
    </div>
  `;
