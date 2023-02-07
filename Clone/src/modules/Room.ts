import State from "./State/State";
import socket from "./Socket";

export default class Room {
  constructor(
    ) {}

  init() {
    const room = this.getRandomHash()
    this.AllSockets()
    this.ChatMessages()
    this.CreateMessage()
    // this.CreateRoom(room)
  }

  // CreateRoom(room: string) {
  //   socket.emit('joinRoom', room)
  // }

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
    const chatForm = document.querySelector('.form-send__btn')
    chatForm?.addEventListener('click', e => {
      const msg = <HTMLInputElement>document.querySelector('.chat__input')
      if (msg?.value === '') return
      socket.emit('chatMessage', msg?.value)
  
      msg.value = ''
      msg.focus()
    })
  }

  CreateMessage() {
    socket.on('message', (user, message) => {
      const chatMessages = document.querySelector('.chat__messages')
      console.log(message);
      this.outputMessage(user, message);
      // let scroll = chatMessages?.scrollTop
      // scroll = chatMessages?.scrollHeight
    })
  }

  outputMessage(user: string, message: string) {
    const div = document.createElement('div')
    div.classList.add('message__post')
    div.innerHTML = `
    <img src="assets/images/icons/icon_player.svg" alt="" class="nick">
    <b>${user.slice(0, 5)}:</b> ${message}`;
    document.querySelector('.chat__messages')?.appendChild(div)
  }
  
}
