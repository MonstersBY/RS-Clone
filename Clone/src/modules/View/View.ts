// import State from "../../backend/State/State";
// import Room from "../../backend/Room";
import { IHex, ISettlement, IResources, IDevCards } from "../types/types";
import MapRenderer from "./MapRenderer";
import PlayerInterface from "./PlayerInterface";
import { game } from "../StartPage/templates/gamePage";
import socket from "../Socket";
import { IPlayerInfo } from "../types/types";

export default class View {
  constructor(
    private renderer: MapRenderer = new MapRenderer(),
    private ui?: PlayerInterface
  ) // public dice: Dice = new Dice,
  {}

  init() {
    setTimeout(() => {
      // this.renderStaticUI(playerInfo, player) //need player and playerINfo[]
      this.renderFullMap();
      socket.emit("updateMap", localStorage.getItem("Room"));
      this.createPlayers();
      this.resources();
      this.buildingStock();

      // add renderfullUI(player: number)
    }, 0);
  }

  renderFullMap() {
    socket.on("renderFullMapView", (mapObj) => {
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        mapContainer.innerHTML = "";
        const mapTree = this.renderer.getMapAsNodeTree(
          mapObj as Array<IHex>
        ) as string;
        mapContainer?.insertAdjacentHTML("beforeend", mapTree);

        let mapLoadedEvent = new CustomEvent("mapLoaded");
        window.dispatchEvent(mapLoadedEvent);
        console.log("mapLoaded");
      }
    });
  }

  renderfullUI(playerInfo: IPlayerInfo[], player: number) {
    // hey, ui, transfer this.state.playersInfo[player] object to UI
    this.renderStaticUI(playerInfo, player);
    // Fthis.renderDynamicUI(playerInfo);
  }

  renderStaticUI(playerInfo: IPlayerInfo[], player: number) {
    this.renderStock(playerInfo[player]);
    // transfer this.state.playersInfo object to UI
  }

  renderDynamicUI(player: IPlayerInfo) {
    // transfer this.state.playersInfo[player].hand object to UI
  }

  renderStock(player: IPlayerInfo) {
    //Вариант, где есть вопросы с типами

    const ids = ["build-road", "build-settlement", "build-city"];
    const stockElements: any = []; // what type?
    ids.forEach((id) => {
      stockElements.push(document.getElementById(id));
    });

    for (let i = 0; i < stockElements; i++) {
      switch (stockElements[i].id) {
        case "build-road":
          stockElements[i].classList.add(`player-stock__road_${player.color}`);
          break;
        case "build-settlement":
          stockElements[i].classList.add(
            `player-stock__settlement_${player.color}`
          );
          break;
        case "build-city":
          stockElements[i].classList.add(`player-stock__city_${player.color}`);
          break;
      }
    }
    // Точно рабочий вариант
    /* const stockRoad = document.getElementById("build-road");
    stockRoad?.classList.add(`player-stock__road_${player.color}`);
    const stockSettlement = document.getElementById("build-settlement");
    stockSettlement?.classList.add(`player-stock__settlement_${player.color}`);
    const stockCity = document.getElementById("build-city");
    stockCity?.classList.add(`player-stock__city_${player.color}`); */
  }

  renderErrorMessage() {
    const errorMessage = `
    <div class="error-message moveDown flex-bs">
      <h3 class="error-message__text">You should choose correct number of resources</h3>
    </div>
    `;
    const mainWrap = document.querySelector(".main__wrapper");
    mainWrap?.insertAdjacentHTML("afterbegin", errorMessage);

    setTimeout(() => {
      const error = document.querySelector(".error-message");
      error?.remove();
     }, 3000)

  }
  showPlentyPopup() {
    const modalPlenty = document.querySelector(".plenty-choose");
    const checkedInputs = modalPlenty?.querySelectorAll<HTMLInputElement>(
      "input.choose-checkbox:checked"
    );
    checkedInputs?.forEach((item) => {
      item.checked = false;
    });
    modalPlenty?.classList.toggle("modal");
  }

  showMonopolyPopup() {
    const modalMonopoly = document.querySelector(".monopoly-choose");
    const checkedInputs = modalMonopoly?.querySelectorAll<HTMLInputElement>(
      "input.choose-checkbox:checked"
    );
    checkedInputs?.forEach((item) => {
      item.checked = false;
    });
    modalMonopoly?.classList.toggle("modal");
  }

  showTradePopup(player: IPlayerInfo) {
    const modalTradeWrap = `
          <div class="modal-trade__wrap">
            <div class="trade-container__wrap flex-row">
              <div class="trade-offer">
                <h4 class="trade__subtitle">Give</h4>
                <div id="offer__container" class="resources trade__resources">
                 <div id="trade__offer_lumber" class="lumber resource__container resource trade__resource empty flex-bs">
                 ${
                   player.hand.resources.lumber
                     ? `
                    <div class="arrow_left"></div>
                    <div class="resource-icon trade__resource-icon icon-lumber"></div>
                    <div id="trade__offer-counter_lumber" class="resource-counter invisible flex-bs">0</div>
                  `
                     : ""
                 }
                 </div>
                 <div id="trade__offer_brick" class="brick resource__container resource trade__resource flex-bs empty">
                  ${
                    player.hand.resources.brick
                      ? `
                      <div class="arrow_left"></div>
                    <div class="resource-icon trade__resource-icon icon-brick"></div>
                    <div id="trade__offer-counter_brick" class="resource-counter invisible flex-bs">0</div>
                    `
                      : ""
                  }
                    </div>
                  <div id="trade__offer_wool" class="wool resource__container resource trade__resource flex-bs empty">
                    ${
                      player.hand.resources.wool
                        ? `
                    <div class="arrow_left"></div>
                    <div class="resource-icon trade__resource-icon icon-wool"></div>
                    <div id="trade__offer-counter_wool" class="resource-counter invisible flex-bs">0</div>
                      `
                        : ""
                    }
                    </div>
                  <div id="trade__offer_grain" class="grain resource__container resource trade__resource empty flex-bs">
                    ${
                      player.hand.resources.grain
                        ? `
                    <div class="arrow_left"></div>
                    <div class="resource-icon trade__resource-icon icon-grain"></div>
                    <div id="trade__offer-counter_grain" class="resource-counter invisible flex-bs">0</div>
                    `
                        : ""
                    }
                    </div>
                 <div id="trade__offer_ore" class="ore resource__container resource trade__resource flex-bs empty">
                     ${
                       player.hand.resources.ore
                         ? `
                    <div class="arrow_left"></div>
                    <div class="resource-icon trade__resource-icon icon-ore"></div>
                    <div id="trade__offer-counter_ore" class="resource-counter invisible flex-bs">0</div>
                      `
                         : ""
                     }
                    </div>
                </div>
              </div>
              <div class="trade-wish">
                <h4 class="trade__subtitle">Get</h4>
                <div id="wish__container" class="resources trade__resources">
                  <div id="trade__wish_lumber" class="lumber resource resource__container trade__resource empty flex-bs">
                    <div class="resource-icon trade__resource-icon icon-lumber"></div>
                    <div id="trade__wish-counter_lumber" class="resource-counter invisible flex-bs">0</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="trade__wish_brick" class="brick resource resource__container trade__resource flex-bs empty">
                    <div class="resource-icon trade__resource-icon icon-brick"></div>
                    <div id="trade__wish-counter_brick" class="resource-counter invisible flex-bs">0</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="trade__wish_wool" class="wool resource resource__container trade__resource flex-bs empty">
                    <div class="resource-icon trade__resource-icon icon-wool"></div>
                    <div id="trade__wish-counter_wool" class="resource-counter invisible flex-bs">0</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="trade__wish_grain" class="grain resource resource__container trade__resource empty flex-bs">
                    <div class="resource-icon trade__resource-icon icon-grain"></div>
                    <div id="trade__wish-counter_grain" class="resource-counter invisible flex-bs">0</div>
                    <div class="arrow_right"></div>
                  </div>
                  <div id="trade__wish_ore" class="ore resource resource__container trade__resource flex-bs empty">
                    <div class="resource-icon trade__resource-icon icon-ore"></div>
                    <div id="trade__wish-counter_ore" class="resource-counter invisible flex-bs">0</div>
                    <div class="arrow_right"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="trade__btns flex-row">
              <img id="offer__positive" src="assets/images/icons/icon_check.svg" alt="ready" class="status__icon">
              <img id="offer__negative" src="assets/images/icons/icon_x.svg" alt="close icon" class="status__icon">
            </div>
          </div>
    `;

    const modalTrade = document.querySelector(".modal-trade");
    if (modalTrade) modalTrade.innerHTML = "";
    modalTrade?.classList.toggle("modal");
    modalTrade?.insertAdjacentHTML("afterbegin", modalTradeWrap);
  }

  showConstructionCost() {
    const constructionBlock = document.querySelector(".construction-cost");
    constructionBlock?.classList.toggle("modal");
  }

  createPlayers() {
    socket.emit(
      "give-room-list-players",
      localStorage.getItem("Room"),
      localStorage.getItem("Name")
    );
    socket.on("list-players", (usersInfo) => {
      const list = document.querySelector(".all-player-board");

      const color = ["red", "blue", "green", "orange"];
      while (list?.firstChild) {
        list.removeChild(list.firstChild);
      }

      for (let i = 0; i < usersInfo.length; i++) {
        const allRes = this.SummCards(usersInfo[i].hand.resources);
        const allDev = this.SummCards(usersInfo[i].hand.development);
        const div = document.createElement("div");
        div.classList.add("player-board");
        div.innerHTML = `
            <div class="player-board">
            <div class="nickname__wrap flex-bs">
              <div class="avatar__wrap avatar__${color[i]} flex-bs">
                <img src="assets/images/icons/icon_player.svg" alt="avatar" class="player__icon">
              </div>
              <div class="nickname">${usersInfo[i].name}</div>
              <div class="player-score flex-bs">
                <span>${usersInfo[i].settlements.length}</span>
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
          </div>`;

        list?.appendChild(div);
      }
    });
  }

  resources() {
    socket.on("players-hand", (resources) => {
      const lumbCount = document.getElementById("hand-counter_lumber");
      if (lumbCount != null) lumbCount.innerHTML = `${resources.lumber}`;
      const brickCount = document.getElementById("hand-counter_brick");
      if (brickCount != null) brickCount.innerHTML = `${resources.brick}`;
      const woolCount = document.getElementById("hand-counter_wool");
      if (woolCount != null) woolCount.innerHTML = `${resources.wool}`;
      const grainCount = document.getElementById("hand-counter_grain");
      if (grainCount != null) grainCount.innerHTML = `${resources.grain}`;
      const oreCount = document.getElementById("hand-counter_ore");
      if (oreCount != null) oreCount.innerHTML = `${resources.ore}`;
    });
  }
  buildingStock() {
    socket.on("players-stock", (players) => {
      const road = document
        .getElementById("build-road")
        ?.querySelector(".player-stock__counter");
      if (road != null) road.innerHTML = `${players.roadsStock}`;
      const settlement = document
        .getElementById("build-settlement")
        ?.querySelector(".player-stock__counter");
      if (settlement != null)
        settlement.innerHTML = `${players.settlementsStock}`;
      const city = document
        .getElementById("build-city")
        ?.querySelector(".player-stock__counter");
      if (city != null) city.innerHTML = `${players.citiesStock}`;
    });
  }

  SummCards(obj: IResources | IDevCards) {
    let sum = 0;
    for (let cards of Object.values(obj)) {
      sum += cards;
    }
    return sum;
  }
}

// Classes: _animation.scss

// city - меняет поселение на город надо добавлять, когда строим город уже
// select - для подсветки поля, где нужно построить поселение
// select__road - для подстветки дороги, которую можно построить
// moveDown - нужно добавлять robber после отрисовки карты (иначе будет срабатывать не на том гексе), в функции где его переставляют
// этот же класс можно добавлять и для поселений, городов, дорог при строительстве(или есть класс build - но он не очень)
//  modal - для появления окошка встречной торговли