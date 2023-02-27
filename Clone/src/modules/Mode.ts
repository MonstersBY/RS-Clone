import socket from "./Socket";

export default class Mode {

  constructor(
    ) {}

  init() {
    this.ConnectSocket()
    this.createNewRoom()
    this.CheckRoom()
    this.CreateName()
    this.RoomList()
    this.ConnectRoom()
    this.Disconnect()
  }

  ConnectSocket() {
    socket.on('connect', () => {
        if (!localStorage.getItem('Name')){
          localStorage.setItem('Name', this.getRandomHash())
        }
    })
  }

  CreateName() {
    const divNick = document.querySelector('.random__nick')?.querySelector('span')
    const chatBtn = document.querySelector('.nick__form-btn')
    const msg = <HTMLInputElement>document.getElementById('new__nick')
    chatBtn?.addEventListener('click', e => {
      if (msg?.value === '') return
      localStorage.setItem('Name', msg?.value)
      msg.value = ''
      msg.focus()
      if (divNick != null) divNick.innerHTML = `${localStorage.getItem('Name')}`;
    })
    if (divNick != null) divNick.innerHTML = `${localStorage.getItem('Name')}`;
  }

  RoomList() {
    socket.on('room-list', rooms => {
      const list = document.querySelector('.ranked-cards__wrapper')

      while(list?.firstChild){
        list.removeChild(list.firstChild);
      }

      for (let i = 0; i < rooms.length; i++) {
        const div = document.createElement('a')
        div.href = '/room'
        div.innerHTML = `
        <div class="ranked-card">
          <div class="ranked-card__img-container">
            <img src="assets/images/icons/icon_gamemode_base.svg" alt="map icon" class="ranked-card__img">
          </div>
          <div class="ranked-card__text">
            <h3 class="ranked-card__title">Room: <span class="room-name">${rooms[i].room}</span></h3>
            <div class="ranked-card__link">
              <a href="#" class="link login__link">Log in to play</a>
            </div>
          </div>
          <div class="ranked-card__icon">
            <img src="assets/images/icons/icon_info.svg" alt="info icon" class="info__icon">
          </div>
        </div>`
        list?.appendChild(div)
      }
    })
  }

  getRandomHash() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text
  }

  createNewRoom() {
    const CreateRoom = document.getElementById('create-room');
    CreateRoom?.addEventListener('click', () => {
        const room = this.getRandomHash()
        localStorage.setItem('Room', room)
    })
  }
  CheckRoom() {
    const CreateRoom = document.getElementById('create-room-bot');
    CreateRoom?.addEventListener('click', () => {
      socket.emit('getRooms')
      this.changeRoomTitle();
    })
  }

  ConnectRoom() {
    document.querySelector('.ranked-cards__wrapper')?.addEventListener('click', e => {
      const target = e.target as Element
      if(!target.classList.contains('ranked-card')) return
      const room = target.querySelector('.room-name')?.innerHTML
      if (room) localStorage.setItem('Room', room)
    })
  }

  Disconnect() {
    if (localStorage.getItem('Room')){
      socket.emit('leave-lobby', localStorage.getItem('Room'), localStorage.getItem('Name'))
      localStorage.setItem('Room', '')
    }
  }
  changeRoomTitle() {
    const title = document.querySelector(".ranked-cards__title");
    if (title) title.textContent = "ROOMS:";
  }
}
