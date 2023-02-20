export const mode = `
      <div class="landing-page__wrapper">
        <div class="ranked-block__wrapper">
          <h2 class="ranked-cards__title">no rooms created</h2>
          <div class="ranked-cards__wrapper">
          </div>
          </div>
        <div class="landing-page_right">
          <h2 class="subtitle mode__subtitle">Creating room</h2>
          <div class="social__proof">
            <div class="random__nick"><b>Your random nickname: </b>YHdhl</div>
              <label class="nick__label" for="new__nick"><b>Change nickname:</b>
                <div id="nick-form" class="chat__form">
                  <input id="new__nick" type="text" class="new__nick" placeholder="Write your new nickname">
                  <button class="nick__form-btn" type="submit">
                    <img src="assets/images//icons/chat/icon__send.svg" alt="send icon" class="send__icon">
                  </button>
                </div>
              </label>
          </div>
          <a id="create-room" href="/room" class="btn play__btn">Create room</a>
        </div>
      </div>
`;
