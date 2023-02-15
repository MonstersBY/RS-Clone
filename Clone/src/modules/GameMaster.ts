import socket from "./Socket";

export default class GameMaster {
  constructor(
    ) {}

  init() {
    socket.emit('join-game-room', localStorage.getItem('Room'))
    this.CreatePlayers()
    this.Resources()
  }

  CreatePlayers() {
    socket.emit('give-room-list-players', localStorage.getItem('Room'), localStorage.getItem('Name'))
    socket.on('list-players', (users, usersInfo) => {
      
        const list = document.querySelector('.all-player-board')
        console.log(list)

        while(list?.firstChild){
            list.removeChild(list.firstChild);
        }

        for (let i = 0; i < users.length; i++) {
            const div = document.createElement('div')
            div.classList.add('player-board')
            div.innerHTML = `
            <div class="player-board">
            <div class="nickname__wrap flex-bs">
              <div class="avatar__wrap flex-bs">
                <img src="assets/images/icons/icon_player.svg" alt="avatar" class="player__icon">
              </div>
              <div class="nickname">${users[i].username}</div>
              <div class="player-score flex-bs">
                <span>${i+1}</span>
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
          </div>`
            list?.appendChild(div)
          }
    })
  }

  Resources() {
    socket.on('players-hand', resources => {
      const lumbCount = document.getElementById('hand-counter_lumber');
      if (lumbCount) lumbCount.innerHTML = `${resources.lumber}`;
      const brickCount = document.getElementById('hand-counter_brick');
      if (brickCount) brickCount.innerHTML = `${resources.brick}`;
      const woolCount = document.getElementById('hand-counter_wool');
      if (woolCount) woolCount.innerHTML = `${resources.wool}`;
      const grainCount = document.getElementById('hand-counter_grain');
      if (grainCount) grainCount.innerHTML = `${resources.grain}`;
      const oreCount = document.getElementById('hand-counter_ore');
      if (oreCount) oreCount.innerHTML = `${resources.ore}`;
    })
  }

}
