import View from "../View/View";
// import Room from "../../backend/Room";
// import Timer from "./Timer";
// import GameMaster from "../../backend/GameMaster";
import { IPlayerInfo } from "../types/types";
// import State from "../../backend/State/State";

import socket from "../Socket";

export default class Controller {
  constructor(
    public view?: View,
    // public state?: State,
    // public room?: Room,
    public player?: IPlayerInfo,
    public map?: HTMLDivElement,
    public activePlayer?: boolean,
    // private timer: Timer = new Timer(),
    // private master: GameMaster = new GameMaster(),
  ) {}

  init() {
    const buttons = `
    <div style="position: absolute; z-index: 10; top: 0; left: 100px; display: flex; flex-direction: column; height: 30px; gap: 20px;">
    <button id="first-set">first-set<button>
    <button id="refresh">refresh<button>
    <button id="random-number">random-number<button>
    </div>
    `
    // <button id="robber">robber<button>
    //  <button id="build-road">build-road<button>
    // <button /* id="build-settlement" */>build-settlement<button>
    // <button/*  id="build-city" */>build-city<button>
    setTimeout(() => {
      socket.emit('isYouTurnPlayer', localStorage.getItem('Room'), localStorage.getItem('Name'))
      socket.on('firstSettlementMode', (player, active) =>{
        // console.log(player)
        this.player = player
        this.activePlayer = active
        console.log(`${localStorage.getItem('Name')}: ${this.activePlayer}`)

        if (this.activePlayer) {
          this.buildFirstSettlementMode()
        }
      })
      this.map = document.getElementById("map") as HTMLDivElement;
      document.body.insertAdjacentHTML("afterbegin", buttons);
      this.addBuildFirstSettlementListener();
      // this.addRefreshListener();
      this.addRoadListener();
      this.addSettlementListener();
      this.addCityListener();
      this.addCardsListener();
    }, 0);
  }

  addBuildFirstSettlementListener() {
    document.getElementById("first-set")?.addEventListener("click", this.buildFirstSettlementMode.bind(this))// , { once: true }
  }

  // addRefreshListener() {
  //   document.getElementById("refresh")?.addEventListener("click", () => { this.state?.updateMap(); })
  // }

  addRoadListener() {
    document.getElementById("build-road")?.addEventListener("click", () => { this.buildRoad(this.player as IPlayerInfo); })
  }

  addSettlementListener() {
    document.getElementById("build-settlement")?.addEventListener("click", () => { this.buildSettlement(this.player as IPlayerInfo); })
  }

  addCityListener() {
    document.getElementById("build-city")?.addEventListener("click", () => { this.buildCity(this.player as IPlayerInfo); })
  }

  /* addRobberListener() {
    document.getElementById("robber")?.addEventListener("click", () => { this.setRobber(this.player1 as IPlayerInfo); })
  } */

  addCardsListener() {
    document.getElementById("develop-card-list")?.addEventListener("click", (e) => {
      if (e.target instanceof HTMLDivElement) {
        const target = e.target.closest(".knight");
        if (target && target.classList.contains("knight")) {
          // console.log(target);
          this.playKnightCard(this.player as IPlayerInfo);
        }
      }
      }) // , { once: true }
  }

  playKnightCard(player: IPlayerInfo) {
    player.hand.development.knights -= 1;
    player.armySize += 1;
    // this.state?.calculateArmySize();
    // this.setRobber(player);
  }

  // addAvaliableListener(player: IPlayerInfo) {
  //   const mapContainer = document.querySelector("#map");
  //   mapContainer?.addEventListener("click", e => {
  //     if (e.target instanceof HTMLDivElement) {
  //       if (e.target.classList.contains("hex_node")) {
  //         if (e.target.classList.contains("active")) {
  //           player.avalible.push(...e.target.dataset.next?.split(",") as Array<string>);
  //         }
  //       }
  //     }
  //   })
  // }

  buildFirstSettlementMode() {
    const places = [...document.querySelectorAll(".hex__settlement_N"), ...document.querySelectorAll(".hex__settlement_S")];
    places.forEach((e) => {
      if (!e.classList.contains("own")) {
        e.classList.add("select");
      }
    });
    if (this.map) {
      this.map.onclick = this.choosePlaceSettlement.bind(this);
    }
    // this.map?.addEventListener("click", this.choosePlaceSettlement.bind(this)); //.bind(this) , {once: true}
  }

  choosePlaceSettlement(e: Event) {
    if (e.target instanceof HTMLDivElement && e.target.classList.contains("select")) {
      if (e.target.classList.contains("hex__settlement_N") || e.target.classList.contains("hex__settlement_S")) {
        const chousen = e.target;
        const places = [...document.querySelectorAll(".hex__settlement_N"), ...document.querySelectorAll(".hex__settlement_S")];
        places.forEach((e) => {
            e.classList.remove("select");
        })
        // this.state?.setNewSettlement(this.player as IPlayerInfo, chousen.id);
        socket.emit('setNewSettlement', this.player, chousen.id, localStorage.getItem('Room'))
        this.updateBuildCounter(".settlement__counter");
        this.view?.renderFullMap()
        // this.state?.updateMap();
        // this.map?.removeEventListener("click", this.choosePlaceSettlement.bind(this)); //.bind(this) , {once: true}
        if (this.map) {
          this.map.onclick = null;
        }
        setTimeout(()=>{
          this.buildFirstRoadMode(chousen.dataset.next || "");
        }, 0) 
      }
    }
  }

  buildFirstRoadMode(next: string) {
    next.split(",").forEach((e) => {
      const road = document.getElementById(e) as HTMLDivElement;
      console.log(!road.classList.contains("own"))
      if (!road.classList.contains("own")) {
        console.log(road)
        console.log('--------')
        console.log(e)
        console.log('--------')
        road.classList.add("select__road");
        road.addEventListener("click", (e) => {
          console.log('CLICK')
          // this.state?.setNewRoad(this.player1 as IPlayerInfo, road.id);
          // this.state?.updateMap();
          socket.emit('setNewRoad', this.player, road.id, localStorage.getItem('Room'))
          this.updateBuildCounter(".road__counter");
          this.view?.renderFullMap()
        })
      }
    })
  }

  buildRoad(player: IPlayerInfo) {
    const roads = [...new Set(this.player?.avalible.filter(e => e.split("_")[1] === "road"))];
    roads.forEach(e => {
      const road = document.getElementById(e);
      if(road && !road.classList.contains("own")) {
        road.classList.add("select__road");
        road.addEventListener("click", (e) => {
          this.updateBuildCounter(".road__counter");
          // this.state?.setNewRoad(this.player1 as IPlayerInfo, road.id);
          // this.state?.updateMap();
        })
      }
    })
  }

  buildSettlement(player: IPlayerInfo) {
    const settlements = [...new Set(this.player?.avalible.filter(e => e.split("_")[1] === "settlement"))];
    settlements.forEach(e => {
      const settlement = document.getElementById(e);
      if(settlement && !settlement.classList.contains("own")) {
        settlement.classList.add("select");
        settlement.addEventListener("click", (e) => {
          // this.state?.setNewSettlement(this.player1 as IPlayerInfo, settlement.id);
          // this.state?.updateMap();
          this.updateBuildCounter(".settlement__counter");
        })
      }
    })
  }

  buildCity(player: IPlayerInfo) {
    const settlements = this.player?.settlements as Array<string>;
    settlements.forEach(e => {
      const settlement = document.getElementById(e) as HTMLDivElement;
      settlement.style.transform = "scale(0.8)";
      settlement.addEventListener("click", e => {
        this.updateBuildCounter(".city__counter");
        // this.state?.setNewCity(this.player1 as IPlayerInfo, settlement.id);
        // this.state?.updateMap();
      })
    })
  }

  updateBuildCounter(sel: string) {
    const counter = document.querySelector(sel);
    let counterNumber = Number(counter?.textContent);
    if (counterNumber <= 0) return;
    if(counter) counter.textContent = `${ --counterNumber }`;
  }

  // setRobber(player: IPlayerInfo) {
  //   //На левой клетке в среднем ряду сыпет ошибки Uncaught TypeError: Cannot read properties of null (reading 'classList')
  //   this.map?.addEventListener("click", (e: MouseEvent) => {

  //     if (e.target instanceof HTMLDivElement) {
  //       const target = e.target.closest(".hex");
  //       if (target && target.classList.contains("hex")) {
  //         const settlementsToRob = this.state?.setRobber(this.player1 as IPlayerInfo, String(target.id)); //this.player1 as IPlayerInfo,
  //         this.state?.updateMap();

  //         const robber = document.querySelector(".robber");
  //         if (robber) robber.classList.add("moveDown");

  //         settlementsToRob?.forEach((e) => {
  //           const settlement = document.getElementById(e) as HTMLDivElement;
  //           if (
  //             settlement.classList.contains("own") &&
  //             !settlement.classList.contains("own_nobody") &&
  //             !settlement.classList.contains(`own_${player.color}`)
  //           ) {
  //             settlement.classList.add("select");
  //             settlement.addEventListener(
  //               "click",
  //               (e) => {
  //                 this.state?.transferOneToAnother(
  //                   player,
  //                   settlement.classList[3]
  //                 );
  //               },
  //               { once: true }
  //             );
  //           }
  //         });
  //       }
  //     }
  //   })
  // }


buyDevelopCard() {}

  rollDice() {} // import from dice module?

  rollDiceTimer() {}

  turnTimer() {}

  updateState() {}

  checkIsWinner() {}

  endGame() {}
}
