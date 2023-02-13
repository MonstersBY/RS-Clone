export const game = `
      <div class="main__wrapper">
        <div class="left__sidebar">
          <div id='hand' class="player-hand">
            <div class="player-hand__title">Hand</div>
            <div class="player-hand__resources">
              <div id="player-hand_lumber" class="player-hand__resource flex-bs">
                <div class="resource-icon icon-lumber"></div>
                <div id="hand-counter_lumber" class="resource-counter flex-bs">1</div>
              </div>
              <div id="player-hand_brick" class="player-hand__resource flex-bs empty">
                <div class="resource-icon icon-brick"></div>
                <div id="hand-counter_brick" class="resource-counter invisible flex-bs">0</div>
              </div>
              <div id="player-hand_wool" class="player-hand__resource flex-bs empty">
                <div class="resource-icon icon-wool"></div>
                <div id="hand-counter_wool" class="resource-counter invisible flex-bs">0</div>
              </div>
              <div id="player-hand_grain" class="player-hand__resource flex-bs">
                <div class="resource-icon icon-grain"></div>
                <div id="hand-counter_grain" class="resource-counter flex-bs">2</div>
              </div>
              <div id="player-hand_ore" class="player-hand__resource flex-bs empty">
                <div class="resource-icon icon-ore"></div>
                <div id="hand-counter_ore" class="resource-counter invisible flex-bs">0</div>
              </div>
            </div>
          </div>
          <button class="btn construction__btn flex-row">Construction Cost</button>
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
          <div class="player-board">
            <div class="nickname__wrap flex-bs">
              <div class="avatar__wrap flex-bs">
                <img src="assets/images/icons/icon_player.svg" alt="avatar" class="player__icon">
              </div>
              <div class="nickname">YaniaR</div>
              <div class="player-score flex-bs">
                <span>1</span>
              </div>
            </div>
            <div class="player-miniboard flex-bs">
              <div class="card__wrap unknown__wrap">
                <img src="assets/images/ingame/card_rescardback.svg" alt="unknown card" class="miniboard__img card__img">
                <div class="miniboard__counter flex-bs">7</div>
              </div>
              <div class="card__wrap devcard__wrap">
                <img src="assets/images/ingame/card_devcardback.svg" alt="devcard" class="miniboard__img devcard__img">
                <div class="miniboard__counter flex-bs">2</div>
              </div>
              <div class="card__wrap largest-army__wrap">
                <img src="assets/images/ingame/icon_largest_army.svg" alt="army" class="miniboard__img largest__icon army__img">
                <div class="miniboard__counter flex-bs">2</div>
              </div>
              <div class="card__wrap longest-road__wrap">
                <img src="assets/images/ingame/icon_longest_road.svg" alt="army"
                  class="miniboard__img largest__icon longest-road__img">
                <div class="miniboard__counter flex-bs">3</div>
              </div>
            </div>
          </div>
          <div class="player-board">
            <div class="nickname__wrap flex-bs">
              <div class="avatar__wrap flex-bs">
                <img src="assets/images/icons/icon_player.svg" alt="avatar" class="player__icon">
              </div>
              <div class="nickname">YaniaR</div>
              <div class="player-score flex-bs">
                <span>1</span>
              </div>
            </div>
            <div class="player-miniboard flex-bs">
              <div class="card__wrap unknown__wrap">
                <img src="assets/images/ingame/card_rescardback.svg" alt="unknown card" class="miniboard__img card__img">
                <div class="miniboard__counter flex-bs">7</div>
              </div>
              <div class="card__wrap devcard__wrap">
                <img src="assets/images/ingame/card_devcardback.svg" alt="devcard" class="miniboard__img devcard__img">
                <div class="miniboard__counter flex-bs">2</div>
              </div>
              <div class="card__wrap largest-army__wrap">
                <img src="assets/images/ingame/icon_largest_army.svg" alt="army" class="miniboard__img largest__icon army__img">
                <div class="miniboard__counter flex-bs">2</div>
              </div>
              <div class="card__wrap longest-road__wrap">
                <img src="assets/images/ingame/icon_longest_road.svg" alt="army"
                  class="miniboard__img largest__icon longest-road__img">
                <div class="miniboard__counter flex-bs">3</div>
              </div>
            </div>
          </div>
          <div class="player-board">
            <div class="nickname__wrap flex-bs">
              <div class="avatar__wrap flex-bs">
                <img src="assets/images/icons/icon_player.svg" alt="avatar" class="player__icon">
              </div>
              <div class="nickname">YaniaR</div>
              <div class="player-score flex-bs">
                <span>1</span>
              </div>
            </div>
            <div class="player-miniboard flex-bs">
              <div class="card__wrap unknown__wrap">
                <img src="assets/images/ingame/card_rescardback.svg" alt="unknown card" class="miniboard__img card__img">
                <div class="miniboard__counter flex-bs">7</div>
              </div>
              <div class="card__wrap devcard__wrap">
                <img src="assets/images/ingame/card_devcardback.svg" alt="devcard" class="miniboard__img devcard__img">
                <div class="miniboard__counter flex-bs">2</div>
              </div>
              <div class="card__wrap largest-army__wrap">
                <img src="assets/images/ingame/icon_largest_army.svg" alt="army" class="miniboard__img largest__icon army__img">
                <div class="miniboard__counter flex-bs">2</div>
              </div>
              <div class="card__wrap longest-road__wrap">
                <img src="assets/images/ingame/icon_longest_road.svg" alt="army"
                  class="miniboard__img largest__icon longest-road__img">
                <div class="miniboard__counter flex-bs">3</div>
              </div>
            </div>
          </div>
          <div class="player-board">
            <div class="nickname__wrap flex-bs">
              <div class="avatar__wrap flex-bs">
                <img src="assets/images/icons/icon_player.svg" alt="avatar" class="player__icon">
              </div>
              <div class="nickname">YaniaR</div>
              <div class="player-score flex-bs">
                <span>1</span>
              </div>
            </div>
            <div class="player-miniboard flex-bs">
              <div class="card__wrap unknown__wrap">
                <img src="assets/images/ingame/card_rescardback.svg" alt="unknown card" class="miniboard__img card__img">
                <div class="miniboard__counter flex-bs">7</div>
              </div>
              <div class="card__wrap devcard__wrap">
                <img src="assets/images/ingame/card_devcardback.svg" alt="devcard" class="miniboard__img devcard__img">
                <div class="miniboard__counter flex-bs">2</div>
              </div>
              <div class="card__wrap largest-army__wrap">
                <img src="assets/images/ingame/icon_largest_army.svg" alt="army" class="miniboard__img largest__icon army__img">
                <div class="miniboard__counter flex-bs">2</div>
              </div>
              <div class="card__wrap longest-road__wrap">
                <img src="assets/images/ingame/icon_longest_road.svg" alt="army"
                  class="miniboard__img largest__icon longest-road__img">
                <div class="miniboard__counter flex-bs">3</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-trade hidden">
          <div class="modal-trade__wrap">
            <div class="trade-container__wrap flex-row">
              <div class="trade-offer">
                <h4 class="trade__subtitle">Give</h4>
                <div class="player-hand__resources">
                  <div id="player-hand_lumber" class="resource__container player-hand__resource empty flex-bs">
                    <div class="arrow_left"></div>
                    <div class="resource-icon icon-lumber"></div>
                    <div id="hand-counter_lumber" class="resource-counter flex-bs">1</div>
                  </div>
                  <div id="player-hand_brick" class="resource__container player-hand__resource flex-bs empty invisible">
                    <div class="arrow_left"></div>
                    <div class="resource-icon icon-brick"></div>
                    <div id="hand-counter_brick" class="resource-counter invisible flex-bs">0</div>
                  </div>
                  <div id="player-hand_wool" class="resource__container player-hand__resource flex-bs empty invisible">
                    <div class="arrow_left"></div>
                    <div class="resource-icon icon-wool"></div>
                    <div id="hand-counter_wool" class="resource-counter invisible flex-bs">0</div>
                  </div>
                  <div id="player-hand_grain" class="resource__container player-hand__resource empty flex-bs">
                    <div class="arrow_left"></div>
                    <div class="resource-icon icon-grain"></div>
                    <div id="hand-counter_grain" class="resource-counter flex-bs">2</div>
                  </div>
                  <div id="player-hand_ore" class="resource__container player-hand__resource flex-bs empty invisible">
                    <div class="arrow_left"></div>
                    <div class="resource-icon icon-ore"></div>
                    <div id="hand-counter_ore" class="resource-counter invisible flex-bs">0</div>
                  </div>
                </div>
              </div>
              <div class="trade-wish">
                <h4 class="trade__subtitle">Get</h4>
                <div class="player-hand__resources">
                  <div id="player-hand_lumber" class="resource__container player-hand__resource empty flex-bs">
                    <div class="resource-icon icon-lumber"></div>
                    <div id="hand-counter_lumber" class="resource-counter flex-bs">1</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="player-hand_brick" class="resource__container player-hand__resource flex-bs empty">
                    <div class="resource-icon icon-brick"></div>
                    <div id="hand-counter_brick" class="resource-counter invisible flex-bs">1</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="player-hand_wool" class="resource__container player-hand__resource flex-bs empty">
                    <div class="resource-icon icon-wool"></div>
                    <div id="hand-counter_wool" class="resource-counter invisible flex-bs">1</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="player-hand_grain" class="resource__container player-hand__resource empty flex-bs">
                    <div class="resource-icon icon-grain"></div>
                    <div id="hand-counter_grain" class="resource-counter flex-bs">1</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="player-hand_ore" class="resource__container player-hand__resource flex-bs empty">
                    <div class="resource-icon icon-ore"></div>
                    <div id="hand-counter_ore" class="resource-counter invisible flex-bs">1</div>
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
        <div class="modal-trade__counteroffer hidden">
          <div class="modal-trade__wrap">
            <div class="trade-container__wrap flex-row">
              <div class="trade-offer">
                <h4 class="trade__subtitle">You Give</h4>
                <div class="player-hand__resources">
                  <div id="player-hand_lumber" class="resource__container player-hand__resource empty flex-bs">
                    <div class="resource-icon icon-lumber"></div>
                    <div id="hand-counter_lumber" class="resource-counter flex-bs">1</div>
                  </div>
                </div>
              </div>
              <div class="arrows">
                <div class="arrow_left"></div>
                <div class="arrow_right"></div>
              </div>
              <div class="trade-wish">
                <h4 class="trade__subtitle">You Get from Arantola</h4>
                <div class="player-hand__resources">
                  <div id="player-hand_brick" class="resource__container player-hand__resource flex-bs">
                    <div class="resource-icon icon-brick"></div>
                    <div id="hand-counter_brick" class="resource-counter flex-bs">1</div>
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
      </div>
`;
