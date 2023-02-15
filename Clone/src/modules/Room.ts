// import State from "../backend/State/State";
import socket from "./Socket";

export default class Room {
  constructor(
    public mode = "newbie", 
    ) {}

  init() {
    // const room = this.getRandomHash()

    this.AllSockets()
    this.ChatMessages()
    this.CreateMessage()
    this.CreateRoom()
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
      const need = users.filter((user: { room: string | null; }) => user.room === room)
      let list = document.querySelector('.player__list')
      while(list?.firstChild){
        list.removeChild(list.firstChild);
      }
      for (let i = 0; i < need.length; i++) {
        const div = document.createElement('li')
        div.classList.add('player__list-item')
        div.innerHTML = `
                  <div class="player__info">
                      <div class="player__name">
                          <img src="assets/images/icons/icon_player.svg" alt="player icon" class="player__icon">
                          <span>${need[i].username}</span>
                      </div>
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

  AllSockets() {

  }


  ChatMessages() {
    const room = localStorage.getItem('Room')
    const chatForm = document.querySelector('.form-send__btn')
    chatForm?.addEventListener('click', e => {
      const msg = <HTMLInputElement>document.querySelector('.chat__input')
      if (msg?.value === '') return
      // socket.emit('chatMessage', msg?.value, room)
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

  addGameListener() {
    if (window.location.pathname === "/room") {
      document.getElementById("gameMode")?.addEventListener("change", (e) => {
        if (e.target instanceof HTMLSelectElement) {
          this.mode = e.target.value;
        }
      })
    }
  }
}
