// import State from "../../backend/State/State";
// import Room from "../../backend/Room";
import { IHex, ISettlement, IResources, IDevCards } from "../types/types";
import MapRenderer from "./MapRenderer";
import PlayerInterface from "./PlayerInterface";
import { game } from "../StartPage/templates/gamePage";

import socket from "../Socket";
import { modificatePage } from "../StartPage/templates/modificateIngamePage";
import { IPlayerInfo } from "../types/types";
import Dice from "../diceRoll/diceRoll";

export default class View {
  constructor(
    private renderer: MapRenderer = new MapRenderer(),
    private ui?: PlayerInterface,
    // public dice: Dice = new Dice,
  ) {}

    init() {
      setTimeout(() => {
        modificatePage();
      // this.renderStaticUI(playerInfo, player) //need player and playerINfo[]
      this.renderFullMap();
      this.CreatePlayers()
      this.Resources()
      // this.dice.init()

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

  renderFullMap() {
    socket.emit('updateMap', localStorage.getItem('Room'))
    socket.on('renderFullMapView', mapObj => {
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        mapContainer.innerHTML = "";
        const mapTree = this.renderer.getMapAsNodeTree(mapObj as Array<IHex>) as string;
        mapContainer?.insertAdjacentHTML("beforeend", mapTree);
      }
    })
    let event = new Event('mapLoad');
    window.dispatchEvent(event);
  }

  renderfullUI(playerInfo: IPlayerInfo[], player: number) {
    // hey, ui, transfer this.state.playersInfo[player] object to UI
    this.renderStaticUI(playerInfo, player);
    // Fthis.renderDynamicUI(playerInfo);
  }

  renderStaticUI(playerInfo: IPlayerInfo[], player: number) {
    this.renderStock(playerInfo[player])
    // transfer this.state.playersInfo object to UI
  }

  renderDynamicUI(player: IPlayerInfo) {
    // transfer this.state.playersInfo[player].hand object to UI
  }

  renderStock(player: IPlayerInfo) {
    const ids = ["build-road", "build-settlement", "build-city"];
    const stockElements: any = []; // what type?
    ids.forEach(id => {
      stockElements.push(document.getElementById(id));
    });

    for (let i = 0; i < stockElements; i++) {
      switch (stockElements[i].id) {
        case "build-road":
          stockElements[i].classList.add(`player-stock__road_${player.color}`);
          break;
        case "build-settlement":
          stockElements[i].classList.add(`player-stock__settlement_${player.color}`);
          break;
        case "build-city":
          stockElements[i].classList.add(`player-stock__city_${player.color}`);
          break;
      }
    }

    /* const stockRoad = document.getElementById("build-road");
    stockRoad?.classList.add(`player-stock__road_${player.color}`);
    const stockSettlement = document.getElementById("build-settlement");
    stockSettlement?.classList.add(`player-stock__settlement_${player.color}`);
    const stockCity = document.getElementById("build-city");
    stockCity?.classList.add(`player-stock__city_${player.color}`); */
  }

  showPlentyPopup() {
    const modalPlenty = document.querySelector(".plenty-choose");
    modalPlenty?.classList.toggle("modal");
  }

  showMonopolyPopup() {
    const modalMonopoly = document.querySelector(".monopoly-choose");
    modalMonopoly?.classList.toggle("modal");
  }

  showTradePopup() {
    const modalTrade = document.querySelector(".modal-trade");
    modalTrade?.classList.toggle("modal");
  }

  showConstructionCost() {
    const constructionBlock = document.querySelector(".construction-cost");
    constructionBlock?.classList.toggle("modal");
  }


  CreatePlayers() {
    socket.emit('give-room-list-players', localStorage.getItem('Room'), localStorage.getItem('Name'))
    socket.on('list-players', (users, usersInfo) => {

        const list = document.querySelector('.all-player-board')

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
      if (lumbCount != null) lumbCount.innerHTML = `${resources.lumber}`;
      const brickCount = document.getElementById('hand-counter_brick');
      if (brickCount != null) brickCount.innerHTML = `${resources.brick}`;
      const woolCount = document.getElementById('hand-counter_wool');
      if (woolCount != null) woolCount.innerHTML = `${resources.wool}`;
      const grainCount = document.getElementById('hand-counter_grain');
      if (grainCount != null) grainCount.innerHTML = `${resources.grain}`;
      const oreCount = document.getElementById('hand-counter_ore');
      if (oreCount != null) oreCount.innerHTML = `${resources.ore}`;
    })
  }

  SummCards(obj: IResources | IDevCards) {
    let sum = 0;
    for (let cards of Object.values(obj)) {
      sum += cards;
    }
    return sum;
  }
}
