export const game = `
      <div class="main__wrapper">
        <div class="left__sidebar">
          <div class="menu">
            <nav class="menu header-menu game-menu">
              <a href="/" class="logo  burger__logo flex-bs">
                <img src="assets/images/logo.png" alt="logo" class="logo__img">
              </a>
              <ul class="menu__list header-menu__list flex-row">
                <li class="menu__list-item mode__page">
                  <a href="#" class="link menu__link active">Play Page</a>
                </li>
                <li class="menu__list-item">
                  <a href="ingame.html" class="link menu__link">Rules</a>
                </li>
              </ul>
              <div class="overlay"></div>
            </nav>
            <div class="hamburger game-burger">
              <span class="line"></span>
              <span class="line"></span>
              <span class="line"></span>
            </div>
          </div>
          <div id='hand' class="player-hand">
            <div class="player-hand__title">Hand</div>
            <div class="player-hand__resources flex-bs">
              <div id="player-hand_lumber" class="resource player-hand__resource flex-bs">
                <div class="resource-icon icon-lumber"></div>
                <div id="hand-counter_lumber" class="resource-counter flex-bs">1</div>
              </div>
              <div id="player-hand_brick" class=" resource player-hand__resource flex-bs">
                <div class="resource-icon icon-brick"></div>
                <div id="hand-counter_brick" class="resource-counter flex-bs">0</div>
              </div>
              <div id="player-hand_wool" class="resource player-hand__resource flex-bs">
                <div class="resource-icon icon-wool"></div>
                <div id="hand-counter_wool" class="resource-counter flex-bs">0</div>
              </div>
              <div id="player-hand_grain" class="resource player-hand__resource flex-bs">
                <div class="resource-icon icon-grain"></div>
                <div id="hand-counter_grain" class="resource-counter flex-bs">2</div>
              </div>
              <div id="player-hand_ore" class="resource player-hand__resource flex-bs">
                <div class="resource-icon icon-ore"></div>
                <div id="hand-counter_ore" class="resource-counter flex-bs">0</div>
              </div>
            </div>
          </div>
          <div class="game-btns__wrapper flex-bs">
              <div class="game-btn flex-bs">
                <div id="build-road" class="player-stock__icon player-stock__road_red">
                  <div class="player-stock__counter flex-bs road__counter">15</div>
                </div>
              </div>
              <div class="game-btn">
                <div id="build-settlement" class="player-stock__icon player-stock__settlement_red">
                  <div class="player-stock__counter flex-bs settlement__counter">5</div>
                </div>
              </div>
              <div class="game-btn">
                <div id="build-city" class="player-stock__icon player-stock__city_red">
                  <div class="player-stock__counter flex-bs city__counter">4</div>
                </div>
              </div>
            <button class="game-btn construction__btn">Cost</button>
            <div class="game-btn trade__btn">
              <div class="trade__btn-icon"></div>
            </div>
            <div class="game-btn trade-devcard__btn">
              <div class="trade-devcard__btn-icon"></div>
            </div>
          </div>
          <div id="develop-card-list" class="game-btns__wrapper flex-bs develop-cards__wrapper">
            <div class="game-btn monopoly develop__btn">
              <div class="devcard__btn-icon dev-monopoly">
                <div class="player-stock__counter flex-bs devcard__counter">1</div>
              </div>
            </div>
            <div class="game-btn plenty develop__btn empty">
              <div class="devcard__btn-icon dev-plenty">
                <div class="player-stock__counter flex-bs devcard__counter">0</div>
              </div>
            </div>
            <div class="game-btn road develop__btn">
              <div class="devcard__btn-icon dev-road">
                <div class="player-stock__counter flex-bs devcard__counter">1</div>
              </div>
            </div>
            <div class="game-btn develop__btn">
              <div class="devcard__btn-icon dev-victory">
                <div class="player-stock__counter flex-bs devcard__counter">3</div>
              </div>
            </div>
            <div class="game-btn knight develop__btn">
              <div id="robber" class="devcard__btn-icon dev-knight">
                <div class="player-stock__counter flex-bs devcard__counter">5</div>
              </div>
            </div>
          </div>
          <div class="construction-cost">
            <div class="construction-content__wrap">
              <h3 class="construction-cost__title">Construction Cost</h3>
              <div class="cost__subtitle__wrap flex-row">
                <div class="cost__subtitle">Road</div>
                <div class="player-stock__counter flex-bs road__counter">13</div>
              </div>
              <div class="cost__wrapper road-cost">
                <div class="cost-icon icon-lumber">
                  <div class="icon-check"></div>
                </div>
                <div class="cost-icon icon-brick">
                  <div class="icon-check hidden"></div>
                </div>
              </div>
              <div class="cost__subtitle__wrap flex-row">
                <div class="cost__subtitle">Settlement</div>
                <div class="player-stock__counter flex-bs road__counter">3</div>
              </div>
              <div class="cost__wrapper settlement-cost">
                <div class="cost-icon icon-lumber">
                  <div class="icon-check"></div>
                </div>
                <div class="cost-icon icon-brick">
                  <div class="icon-check hidden"></div>
                </div>
                <div class="cost-icon icon-wool">
                  <div class="icon-check"></div>
                </div>
                <div class="cost-icon icon-grain">
                  <div class="icon-check hidden"></div>
                </div>
              </div>
              <div class="cost__subtitle__wrap flex-row">
                <div class="cost__subtitle">City</div>
                <div class="player-stock__counter flex-bs road__counter">4</div>
              </div>
              <div class="cost__wrapper city-cost">
                <div class="cost-icon icon-grain">
                  <div class="icon-check hidden"></div>
                </div>
                <div class="cost-icon icon-grain">
                  <div class="icon-check hidden"></div>
                </div>
                <div class="cost-icon icon-ore">
                  <div class="icon-check hidden"></div>
                </div>
                <div class="cost-icon icon-ore">
                  <div class="icon-check hidden"></div>
                </div>
                <div class="cost-icon icon-ore">
                  <div class="icon-check hidden"></div>
                </div>
              </div>
              <div class="cost__subtitle">Devcards</div>
              <div class="cost__wrapper devcard-cost">
                <div class="cost-icon icon-grain">
                  <div class="icon-check hidden"></div>
                </div>
                <div class="cost-icon icon-wool">
                  <div class="icon-check"></div>
                </div>
                <div class="cost-icon icon-ore">
                  <div class="icon-check hidden"></div>
                </div>
              </div>
              <div class="cost__subtitle">Rate</div>
              <div class="cost__wrapper rate-cost">
                <div class="icon__wrap">
                  <div class="cost-icon icon-lumber"></div>
                  <span>4:1</span>
                </div>
                <div class="icon__wrap">
                  <div class="cost-icon icon-brick"></div>
                  <span>4:1</span>
                </div>
                <div class="icon__wrap">
                  <div class="cost-icon icon-wool"></div>
                  <span>4:1</span>
                </div>
                <div class="icon__wrap">
                  <div class="cost-icon icon-grain"></div>
                  <span>4:1</span>
                </div>
                <div class="icon__wrap">
                  <div class="cost-icon icon-ore"></div>
                  <span>4:1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="map-background__container">
          <div class="map__container" id="map"></div>
          <div class="coastline__wrap">
            <div class="hex__coastline_1 pos_1"></div>
            <div class="hex__coastline_2 pos_2"></div>
            <div class="hex__coastline_1 pos_3"></div>
            <div class="hex__coastline_2 pos_4"></div>
            <div class="hex__coastline_1 pos_5"></div>
            <div class="hex__coastline_2 pos_6"></div>
          </div>
        </div>
        <div class="right__sidebar">
          <div class="game-chat">
            <div class="game-chat__text"></div>
            <form action="#" class="chat__form">
              <input type="text" autocomplete="off" placeholder="Say hello" maxlength='200' aria-label="Send message input"
                class="chat__input">
              <button class="form-send__btn">
                <img src="assets/images//icons/chat/icon__send.svg" alt="send icon" class="send__icon">
              </button>
            </form>
          </div>
          <div class = "all-player-board">
          </div>
        </div>
        <div class="timer game-btn flex-bs">Time:
          <span class="minutes">1:</span>
          <span class="seconds">45</span>
        </div>
        <div class="modal-trade">
          <div class="modal-trade__wrap">
            <div class="trade-container__wrap flex-row">
              <div class="trade-offer">
                <h4 class="trade__subtitle">Give</h4>
                <div class="resources trade__resources">
                  <div id="trade__offer_lumber" class="resource__container resource trade__resource empty flex-bs">
                    <div class="arrow_left"></div>
                    <div class="resource-icon trade__resource-icon icon-lumber"></div>
                    <div id="trade__offer-counter_lumber" class="resource-counter flex-bs">1</div>
                  </div>
                  <div id="trade__offer_brick" class="resource__container resource trade__resource flex-bs empty invisible">
                    <div class="arrow_left"></div>
                    <div class="resource-icon trade__resource-icon icon-brick"></div>
                    <div id="trade__offer-counter_brick" class="resource-counter invisible flex-bs">0</div>
                  </div>
                  <div id=trade__offer_wool" class="resource__container resource trade__resource flex-bs empty invisible">
                    <div class="arrow_left"></div>
                    <div class="resource-icon trade__resource-icon icon-wool"></div>
                    <div id="trade__offer-counter_wool" class="resource-counter invisible flex-bs">0</div>
                  </div>
                  <div id=trade__offer_grain" class="resource__container resource trade__resource empty flex-bs">
                    <div class="arrow_left"></div>
                    <div class="resource-icon trade__resource-icon icon-grain"></div>
                    <div id="trade__offer-counter_grain" class="resource-counter flex-bs">2</div>
                  </div>
                  <div id=trade__offer_ore" class="resource__container resource trade__resource flex-bs empty invisible">
                    <div class="arrow_left"></div>
                    <div class="resource-icon trade__resource-icon icon-ore"></div>
                    <div id="trade__offer-counter_ore" class="resource-counter invisible flex-bs">0</div>
                  </div>
                </div>
              </div>
              <div class="trade-wish">
                <h4 class="trade__subtitle">Get</h4>
                <div class="resources trade__resources">
                  <div id="trade__wish_lumber" class="resource resource__container trade__resource empty flex-bs">
                    <div class="resource-icon trade__resource-icon icon-lumber"></div>
                    <div id="trade__wish-counter_lumber" class="resource-counter flex-bs">1</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="trade__wish_brick" class="resource resource__container trade__resource flex-bs empty">
                    <div class="resource-icon trade__resource-icon icon-brick"></div>
                    <div id="trade__wish-counter_brick" class="resource-counter invisible flex-bs">1</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="trade__wish_wool" class="resource resource__container trade__resource flex-bs empty">
                    <div class="resource-icon trade__resource-icon icon-wool"></div>
                    <div id="trade__wish-counter_wool" class="resource-counter invisible flex-bs">1</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="trade__wish_grain" class="resource resource__container trade__resource empty flex-bs">
                    <div class="resource-icon trade__resource-icon icon-grain"></div>
                    <div id="trade__wish-counter_grain" class="resource-counter flex-bs">1</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="trade__wish_ore" class="resource resource__container trade__resource flex-bs empty">
                    <div class="resource-icon trade__resource-icon icon-ore"></div>
                    <div id="trade__wish-counter_ore" class="resource-counter invisible flex-bs">1</div>
                    <div class="arrow_right"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="trade__btns flex-row">
              <img src="assets/images/icons/icon_check.svg" alt="ready" class="status__icon">
              <img src="assets/images/icons/icon_x.svg" alt="close icon" class="status__icon">
            </div>
          </div>
        </div>
        <div class="modal-trade__counteroffer">
          <div class="modal-trade__wrap">
            <div class="trade__titles flex-bs">
              <h4 class="trade__subtitle">You Give</h4>
              <h4 class="trade__subtitle">You Get from Arantola</h4>
            </div>
            <div class="trade-container__wrap flex-row">
              <div class="trade-offer">
                <div class="resources">
                  <div class="resource resource__container trade__resource empty flex-bs">
                    <div class="resource-icon trade__resource-icon icon-lumber"></div>
                    <div class="resource-counter flex-bs">1</div>
                  </div>
                </div>
              </div>
              <div class="arrows">
                <div class="arrow_left"></div>
                <div class="arrow_right"></div>
              </div>
              <div class="trade-wish">
                <div class="resources">
                  <div id="counteroffer_brick" class="resource__container resource trade__resource flex-bs">
                    <div class="resource-icon trade__resource-icon icon-brick"></div>
                    <div id="counteroffer-counter_brick" class="resource-counter flex-bs">1</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="trade__btns flex-row">
              <img src="assets/images/icons/icon_check.svg" alt="ready" class="status__icon">
              <div class="btn counteroffer__btn counteroffer">Counteroffer</div>
              <img src="assets/images/icons/icon_x.svg" alt="close icon" class="status__icon">
            </div>
          </div>
        </div>
        <div class="modal-choose plenty-choose">
          <div class="modal-choose__wrap flex-bs">
            <div id="plenty-choose_lumber" class="resource__container choose-resource resource flex-bs">
              <div class="resource-icon icon-lumber"></div>
              <input type="checkbox" checked class="choose-checkbox">
              <input type="checkbox" checked class="choose-checkbox">
            </div>
            <div id="plenty-choose_grain" class="resource__container choose-resource resource flex-bs">
              <div class="resource-icon icon-grain"></div>
              <input type="checkbox" checked class="choose-checkbox">
              <input type="checkbox" checked class="choose-checkbox">
            </div>
            <div id="plenty-choose_wool" class="resource__container choose-resource resource flex-bs">
              <div class="resource-icon icon-wool"></div>
              <input type="checkbox" class="choose-checkbox">
              <input type="checkbox" checked class="choose-checkbox">
            </div>
            <div id="plenty-choose_brick" class="resource__container choose-resource resource flex-bs">
              <div class="resource-icon icon-brick"></div>
              <input type="checkbox" class="choose-checkbox">
              <input type="checkbox" checked class="choose-checkbox">
            </div>
            <div id="plenty-choose_ore" class="resource__container choose-resource resource flex-bs">
              <div class="resource-icon icon-ore"></div>
              <input type="checkbox" class="choose-checkbox">
              <input type="checkbox" checked class="choose-checkbox">
            </div>
            <div class="choose__btns flex-row">
              <img src="assets/images/icons/icon_check.svg" alt="ready" class="status__icon">
              <img src="assets/images/icons/icon_x.svg" alt="close icon" class="status__icon">
            </div>
          </div>
        </div>
        <div class="modal-choose monopoly-choose">
          <div class="modal-choose__wrap flex-bs">
            <div id="monopoly-choose_lumber" class="resource__container choose-resource resource flex-bs">
              <div class="resource-icon icon-lumber"></div>
              <input type="checkbox" checked class="choose-checkbox">
            </div>
            <div id="monopoly-choose_grain" class="resource__container choose-resource resource flex-bs">
              <div class="resource-icon icon-grain"></div>
              <input type="checkbox" checked class="choose-checkbox">
            </div>
            <div id="monopoly-choose_wool" class="resource__container choose-resource resource flex-bs">
              <div class="resource-icon icon-wool"></div>
              <input type="checkbox" class="choose-checkbox">
            </div>
            <div id="monopoly-choose_brick" class="resource__container choose-resource resource flex-bs">
              <div class="resource-icon icon-brick"></div>
              <input type="checkbox" class="choose-checkbox">
            </div>
            <div id="monopoly-choose_ore" class="resource__container choose-resource resource flex-bs">
              <div class="resource-icon icon-ore"></div>
              <input type="checkbox" class="choose-checkbox">
            </div>
            <div class="choose__btns flex-row">
              <img src="assets/images/icons/icon_check.svg" alt="ready" class="status__icon">
              <img src="assets/images/icons/icon_x.svg" alt="close icon" class="status__icon">
            </div>
          </div>
        </div>
      </div>
`;
