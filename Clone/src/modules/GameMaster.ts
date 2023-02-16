import socket from "./Socket";
import { IResources, IDevCards } from "./types/types"

export default class GameMaster {
  constructor(
    ) {}

  init() {
    socket.emit('join-game-room', localStorage.getItem('Room'))
    this.ChangeTurn()
    // this.CreatePlayers()
    // this.Resources()
  }

  ChangeTurn() {
    const changeTurn = document.getElementById('change-turn')
    changeTurn?.addEventListener('click', e =>{
      
    })
  }
}
