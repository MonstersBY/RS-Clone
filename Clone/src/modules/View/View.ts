// import State from "../../backend/State/State";
// import Room from "../../backend/Room";
import { IHex, ISettlement, IResources, IDevCards } from "../types/types";
import MapRenderer from "./MapRenderer";
import PlayerInterface from "./PlayerInterface";
import { game } from "../StartPage/templates/gamePage";

import socket from "../Socket";
import { modificatePage } from "../StartPage/templates/modificateIngamePage";

export default class View {
  constructor(
    private renderer: MapRenderer = new MapRenderer(),
    private ui?: PlayerInterface
  ) {}

    init(mapObject: any, playersInfo: any) {
      setTimeout(() => {
      modificatePage();
      this.renderFullMap(mapObject);
      this.CreatePlayers()
      this.Resources()
      // add renderfullUI(player: number)
      }, 0);
    }

  // Possable useless function
  //   renderGamePage() {
  //     const container = document.getElementById("main");
  //     if (container) container.innerHTML = "";
  //     container?.insertAdjacentHTML("afterbegin", game);

  //   //   if (container) {
  //   //     container.addEventListener("click", (e: Event) => {
  //   //       const constructionBlock = document.querySelector(".construction-cost");
  //   //       console.log(e.target);
  //   //       if (
  //   //         e.target instanceof HTMLDivElement &&
  //   //         e.target.classList.contains("cost__btn")
  //   //       ) {
  //   //         constructionBlock?.classList.toggle("cost");
  //   //       }
  //   //     });
  //   // }
  // }

  renderFullMap(map: Array<IHex>) {
    const mapContainer = document.getElementById("map");
    if (mapContainer) {
      mapContainer.innerHTML = "";
      const mapTree = this.renderer.getMapAsNodeTree(map as Array<IHex>) as string;
      mapContainer?.insertAdjacentHTML("beforeend", mapTree);
    }
  }

  renderfullUI(player: number) {
    // hey, ui, transfer this.state.playersInfo[player] object to UI
    this.renderStats();
    this.renderHand(player);
  }

  renderStats() {
    // transfer this.state.playersInfo object to UI
  }

  renderHand(player: number) {
    // transfer this.state.playersInfo[player].hand object to UI
  }

  CreatePlayers() {
    socket.emit('give-room-list-players', localStorage.getItem('Room'), localStorage.getItem('Name'))
    socket.on('list-players', (users, usersInfo) => {
      
        const list = document.querySelector('.all-player-board')
        console.log(list)

        const color = ['red', 'blue', 'green', 'orange']
        while(list?.firstChild){
            list.removeChild(list.firstChild);
        }

        for (let i = 0; i < users.length; i++) {
          const allRes = this.SummCards(usersInfo[i].hand.resources)
          const allDev = this.SummCards(usersInfo[i].hand.development)
          const div = document.createElement('div')
          div.classList.add('player-board')
          div.innerHTML = `
            <div class="player-board">
            <div class="nickname__wrap flex-bs">
              <div class="avatar__wrap avatar__${color[i]} flex-bs">
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
                <div class="miniboard__counter flex-bs all-resources">${allRes}</div>
              </div>
              <div class="card__wrap devcard__wrap">
                <img src="assets/images/ingame/card_devcardback.svg" alt="devcard" class="miniboard__img devcard__img">
                <div class="miniboard__counter flex-bs all-devcard">${allDev}</div>
              </div>
              <div class="card__wrap largest-army__wrap">
                <img src="assets/images/ingame/icon_largest_army.svg" alt="army" class="miniboard__img largest__icon army__img">
                <div class="miniboard__counter flex-bs all-army">${usersInfo[i].armySize}</div>
              </div>
              <div class="card__wrap longest-road__wrap">
                <img src="assets/images/ingame/icon_longest_road.svg" alt="army"
                  class="miniboard__img largest__icon longest-road__img">
                <div class="miniboard__counter flex-bs all-chainRoad">${usersInfo[i].roadChain}</div>
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

  SummCards(obj: IResources | IDevCards) {
    console.log(obj)
    let sum = 0;
    for (let cards of Object.values(obj)) {
      sum += cards;
    }
    return sum;
  }
}
