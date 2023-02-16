// import State from "../backend/State/State";
import socket from "./Socket";

export default class Room {
  constructor(
  ) { }

  init() {
    // const room = this.getRandomHash()
    this.AllSockets()
    this.ChatMessages()
    this.CreateMessage()
    this.CreateRoom()
    this.CheckReady()
    this.CreateGame()
  }

  CreateRoom() {
    const info = {
      room: localStorage.getItem('Room'),
      username: localStorage.getItem('Name')
    }
    const room = localStorage.getItem('Room')
    const username = localStorage.getItem('Name')
    socket.emit('join-room', username, room)

    socket.on('create-room', room => {
      const text = document.createElement('h2')
      text.innerHTML = `Room: ${room}`;
      document.querySelector('.room__header')?.append(text)
    })

    // Users is array

    socket.on('all-user-room', users => {
      // const need = users.filter((user: { room: string | null; }) => user.room === room)
      let list = document.querySelector('.player__list')
      while (list?.firstChild) {
        list.removeChild(list.firstChild);
      }
      for (let i = 0; i < users.length; i++) {
        const li = document.createElement('li')
        li.classList.add('player__list-item')
        li.innerHTML = `
                  <div class="player__info">
                      <div class="player__name">
                          <img src="assets/images/icons/icon_player.svg" alt="player icon" class="player__icon">
                          <span>${users[i].username}</span>
                      </div>
                      <div class="player__color">
                          <select class="color__select" ">
                              <option value="Red">Red</option>
                              <option value="Blue">Blue</option>
                              <option value="Orange">Orange</option>
                              <option value="Green">Green</option>
                          </select>
                          <img src="assets/images/map_animation/road_red.svg" alt="Road" width="15" height="15">
                          <img src="assets/images/map_animation/settlement_red.svg" alt="Settlement" width="15" height="15">
                          <img src="assets/images/map_animation/city_red.svg" alt="City" width="15" height="15">
                      </div>
                  </div>`
        let readyInfo = document.createElement('div')
        if (users[i].ready) {
          readyInfo.innerHTML = `
            <div class="state__btn">
              <span>Ready</span>
              <img src="assets/images/icons/icon-check_green.png" alt="ready"  class="status__icon">
            </div>`
        } else {
          readyInfo.innerHTML = `
            <div class="state__btn not_ready">
              <span>Not ready</span>
              <img src="assets/images/icons/icon_x.svg" alt="not ready"  class="status__icon">
            </div>`
        }
        li.appendChild(readyInfo)
        list?.appendChild(li)
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

  AllSockets() {

  }


  ChatMessages() {
    const room = localStorage.getItem('Room')
    const user = localStorage.getItem('Name')
    const chatForm = document.querySelector('.form-send__btn')
    chatForm?.addEventListener('click', e => {
      const msg = <HTMLInputElement>document.querySelector('.chat__input')
      if (msg?.value === '') return
      socket.emit('chatMessage', msg?.value, room, user)
      msg.value = ''
      msg.focus()
    })
  }

  CreateMessage() {
    socket.on('message', (user, message) => {
      const chatMessages = document.querySelector('.chat__messages')
      console.log(message);
      this.outputMessage(user, message);
    })
  }

  outputMessage(user: string, message: string) {
    const div = document.createElement('div')
    div.classList.add('message__post')
    div.innerHTML = `
    <img src="assets/images/icons/icon_player.svg" alt="" class="nick">
    <b>${user}:</b> ${message}`;
    document.querySelector('.chat__messages')?.appendChild(div)
  }

  CheckReady() {
    const checkbox = document.querySelector('.ready__checkbox');
    checkbox?.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement
      socket.emit('change-prepared', localStorage.getItem('Room'), localStorage.getItem('Name'), target.checked)
    })
  }

  CreateGame() {
    const startGame = document.getElementById('start-game')
    startGame?.addEventListener('click', e => {
      socket.emit('StartGame', localStorage.getItem('Room'))
    })

    socket.on('ChangeToGamePage', () => {
      window.location.pathname = '/game'
    })
  }
}
