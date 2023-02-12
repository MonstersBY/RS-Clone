import View from "../View/View";
import Room from "../../backend/Room";
// import Timer from "./Timer";
import GameMaster from "../../backend/GameMaster";
import { IPlayerInfo } from "../types/types";
import State from "../../backend/State/State";

export default class Controller {
  constructor(
    // public view?: View,
    public state?: State,
    // public room?: Room,
    public player1?: IPlayerInfo,
    public map?: HTMLDivElement,
    // private timer: Timer = new Timer(),
    // private master: GameMaster = new GameMaster(),
  ) {}

  init() {
    this.player1 = this.state?.playersInfo[0];
    this.map = document.getElementById("map") as HTMLDivElement;
    const buttons = `
    <div style="position: absolute; top: 0; left: 0; display: flex; flex-direction: column; height: 30px; gap: 20px;">
    <button id="first-set">first-set<button>
    <button id="refresh">refresh<button>
    <button id="build-road">build-road<button>
    <button id="build-settlement">build-settlement<button>
    <button id="build-city">build-city<button>
    <button id="robber">robber<button>
    <button id="random-number">random-number<button>
    </div>
    `
    document.body.insertAdjacentHTML("afterbegin", buttons);
    this.addBuildFirstSettlementListener();
    this.addRefreshListener();
    this.addRoadListener();
    this.addSettlementListener();
    this.addCityListener();
    this.addRobberListener();

    // this.addRandomListener();
  }

  // addRandomListener() {
  //   document.getElementById("random-number")?.addEventListener("click", () => {console.log(this.state?.chooseRandomResourse())} )// , { once: true }
  // }

  addBuildFirstSettlementListener() {
    document.getElementById("first-set")?.addEventListener("click", this.buildFirstSettlementMode.bind(this))// , { once: true }
  }

  addRefreshListener() {
    document.getElementById("refresh")?.addEventListener("click", () => { this.state?.updateMap(); })
  }

  addRoadListener() {
    document.getElementById("build-road")?.addEventListener("click", () => { this.buildRoad(this.player1 as IPlayerInfo); })
  }

  addSettlementListener() {
    document.getElementById("build-settlement")?.addEventListener("click", () => { this.buildSettlement(this.player1 as IPlayerInfo); })
  }

  addCityListener() {
    document.getElementById("build-city")?.addEventListener("click", () => { this.buildCity(this.player1 as IPlayerInfo); })
  }

  addRobberListener() {
    document.getElementById("robber")?.addEventListener("click", () => { this.setRobber(this.player1 as IPlayerInfo); })
  }

  addCardsListener() {
    document.getElementById("develop-card-list")?.addEventListener("click", (e) => {
      if (e.target instanceof HTMLDivElement && e.target.classList.contains("knight")) {
        this.playKnightCard(this.player1 as IPlayerInfo);
      }
    })// , { once: true }
  }

  playKnightCard(player: IPlayerInfo) {
    player.hand.development.knights -= 1;
    player.armySize += 1;
    this.state?.calculateArmySize();
    this.setRobber(player);
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
        e.classList.add("active");
      }
    });
    if (this.map) {
      this.map.onclick = this.choosePlaceSettlement.bind(this);
    }
    // this.map?.addEventListener("click", this.choosePlaceSettlement.bind(this)); //.bind(this) , {once: true}
  }

  choosePlaceSettlement(e: Event) {
    if (e.target instanceof HTMLDivElement && e.target.classList.contains("active")) {
      if (e.target.classList.contains("hex__settlement_N") || e.target.classList.contains("hex__settlement_S")) {
        const chousen = e.target;
        const places = [...document.querySelectorAll(".hex__settlement_N"), ...document.querySelectorAll(".hex__settlement_S")];
        places.forEach((e) => {
            e.classList.remove("active");
        })
        this.state?.setNewSettlement(this.player1 as IPlayerInfo, chousen.id);
        this.state?.updateMap();
        // this.map?.removeEventListener("click", this.choosePlaceSettlement.bind(this)); //.bind(this) , {once: true}
        if (this.map) {
          this.map.onclick = null;
        }
        this.buildFirstRoadMode(chousen.dataset.next || "");
      }
    }
  }

  buildFirstRoadMode(next: string) {
    next.split(",").forEach((e) => {
      const road = document.getElementById(e) as HTMLDivElement;
      if (!road.classList.contains("own")) {
        road.classList.add("active");
        road.addEventListener("click", (e) => {
          this.state?.setNewRoad(this.player1 as IPlayerInfo, road.id);
          this.state?.updateMap();
        })
      }
    })
  }

  buildRoad(player: IPlayerInfo) {
    const roads = [...new Set(this.player1?.avalible.filter(e => e.split("_")[1] === "road"))];
    roads.forEach(e => {
      const road = document.getElementById(e);
      if(road && !road.classList.contains("own")) {
        road.classList.add("active");
        road.addEventListener("click", (e) => {
          this.state?.setNewRoad(this.player1 as IPlayerInfo, road.id);
          this.state?.updateMap();
        })
      }
    })
  }

  buildSettlement(player: IPlayerInfo) {
    const settlements = [...new Set(this.player1?.avalible.filter(e => e.split("_")[1] === "settlement"))];
    settlements.forEach(e => {
      const settlement = document.getElementById(e);
      if(settlement && !settlement.classList.contains("own")) {
        settlement.classList.add("active");
        settlement.addEventListener("click", (e) => {
          this.state?.setNewSettlement(this.player1 as IPlayerInfo, settlement.id);
          this.state?.updateMap();
        })
      }
    })
  }

  buildCity(player: IPlayerInfo) {
    const settlements = this.player1?.settlements as Array<string>;
    settlements.forEach(e => {
      const settlement = document.getElementById(e) as HTMLDivElement;
      settlement.style.transform = "scale(0.8)";
      settlement.addEventListener("click", e => {
        this.state?.setNewCity(this.player1 as IPlayerInfo, settlement.id);
        this.state?.updateMap();
      })
    })
  }

  setRobber(player: IPlayerInfo) {
    //На левой клетке в среднем ряду сыпет ошибки Uncaught TypeError: Cannot read properties of null (reading 'classList')
    this.map?.addEventListener("click", (e) => {
      if (e.target instanceof HTMLDivElement && e.target.classList.contains("hex")) {
        const settlementsToRob = this.state?.setRobber(this.player1 as IPlayerInfo, e.target.id);
        this.state?.updateMap();
        settlementsToRob?.forEach(e => {
          const settlement = document.getElementById(e) as HTMLDivElement;
          if (settlement.classList.contains("own")
          && !settlement.classList.contains("own_nobody")
          && !settlement.classList.contains(`own_${player.color}`)){
            settlement.classList.add("active");
            settlement.addEventListener("click", e => {
              this.state?.transferOneToAnother(player, settlement.classList[3])
            }, {once: true});
          }
        })
      }
    })
  }


buyDevelopCard() {}

  rollDice() {} // import from dice module?

  rollDiceTimer() {}

  turnTimer() {}

  updateState() {}

  checkIsWinner() {}

  endGame() {}
}
