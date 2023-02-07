import State from "./State/State";
import socket from "./Socket";

export default class Mode {

  constructor(
    ) {}

  init() {
    this.ConnectSocket()
    this.createNewRoom()
    this.CheckRoom()
  }

  ConnectSocket() {
    socket.on('connect', () => {
        console.log(socket.id);
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
        // socket.emit('join-room', room, (message: string) => {
        //     console.log(message);
        // })
    })
  }
  CheckRoom() {
    const CreateRoom = document.getElementById('create-room-bot');
    CreateRoom?.addEventListener('click', () => {
        socket.emit('getRooms')  
    })
  }
  
}
