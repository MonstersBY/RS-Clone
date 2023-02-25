import View from "../View/View";
import Dice from "../diceRoll/diceRoll";
import { getElementBySelector, IPlayerInfo } from "../types/types";
import socket from "../Socket";

export default class Controller {
  constructor(
    public view?: View,
    public dice: Dice = new Dice(),
    public player?: IPlayerInfo,
    public map?: HTMLDivElement,
    public activePlayer?: boolean,
    public canRoll?: boolean,
    // private timer: Timer = new Timer(),
    // private master: GameMaster = new GameMaster(),
  ) 
  {}


  init() {
    this.dice.init();
    const buttons = `
    <div style="position: absolute; z-index: 10; top: 0; left: 100px; display: flex; flex-direction: column; height: 30px; gap: 20px;">
    <button id="first-set">first-set<button>
    <button id="refresh">refresh<button>
    <button id="random-number">random-number<button>
    <button id="random-dice">random-dice<button>
    </div>

    `;
    // this.dice.init();

    setTimeout(() => {
      socket.emit(
        "isYouTurnPlayer",
        localStorage.getItem("Room"),
        localStorage.getItem("Name")
      );


      socket.on("firstSettlementMode", (player, active) => {
        this.player = player;
        this.activePlayer = active;
        console.log(`${localStorage.getItem("Name")}: ${this.activePlayer}`);

        if (this.activePlayer) {
          this.buildFirstSettlementMode();
        }

      });
      socket.on("Turn-player", (player, active) => {
        this.player = player;
        this.activePlayer = active;
        this.canRoll = active;
        console.log(`${localStorage.getItem("Name")}: ${this.activePlayer}`);

        const nextBtn = document.getElementById("create-new-turn");
        nextBtn?.classList.remove("active");
        if (this.activePlayer) {
          this.addListenerDices();
        }

      });
      socket.on("Change-playerInfo", (player) => {
        this.player = player;
      });

      this.map = document.getElementById("map") as HTMLDivElement;
      document.body.insertAdjacentHTML("afterbegin", buttons);

      this.addBuildFirstSettlementListener();
      // this.addRefreshListener();
      this.createNewTurn()
      // this.addBuildAndTradeListeners();
    }, 0);
  }

  createNewTurn() {
    const btn = document.getElementById("create-new-turn");
    btn?.addEventListener("click", (e) => {
      if (btn.classList.contains("active")) {
        socket.emit(
          "Next-person",
          localStorage.getItem("Room"),
          localStorage.getItem("Name")
        );
      }
    });
    socket.on("Client-turn", () => {
      socket.emit("isYouTurnPlayer", localStorage.getItem("Room"), localStorage.getItem("Name"));
    });
  }

  addListenerDices() {
    // TODO Как типизировать callback?
    const nextBtn = document.getElementById("create-new-turn");

    if (this.canRoll) {
      document.getElementById("roll-dice")?.addEventListener(
        "click",
        (e: Event) => {
          const target = e.target as HTMLElement;
          if (target && target.closest(".dice__container") && this.dice) {
            const roll = this.dice.randomDiceRoll();
            this.dice.audio.play();
            this.canRoll = false;
            socket.emit("weRollDice", localStorage.getItem("Room"), roll);
            socket.emit('give-room-list-players', localStorage.getItem("Room"), localStorage.getItem("Name"))
            nextBtn?.classList.add("active");
            this.addBuildAndTradeListeners();
          }
        },
        { once: true }
      );
    }
  }

  addBuildFirstSettlementListener() {
    document
      .getElementById("first-set")
      ?.addEventListener("click", this.buildFirstSettlementMode.bind(this)); // , { once: true }
  }

  // addRefreshListener() {
  //   document.getElementById("refresh")?.addEventListener("click", () => { this.state?.updateMap(); })
  // }

  addBuildAndTradeListeners() {
    const btnsWrap = document.getElementById("build-trade-card-list");

    btnsWrap?.addEventListener("click", (e: Event) => {
      if (e.target instanceof HTMLElement) {
        const target = e.target.closest(".game-btn");
        if (target) {
          const name = target.className.split(" ")[1];
          switch (name) {
            case "road__btn":
              this.buildRoad(this.player as IPlayerInfo);
              break;
            case "settlement__btn":
              this.buildSettlement(this.player as IPlayerInfo);
              break;
            case "city__btn":
              this.buildCity(this.player as IPlayerInfo);
              break;
            case "construction__btn":
              this.view?.showConstructionCost();
              break;
            case "trade__btn":
              this.view?.showTradePopup();
              break;
            case "trade-devcard__btn":
              this.buyDevelopCard();
              break;
          }
        }
      }
    });
  }

  buildFirstSettlementMode() {
    const places = [
      ...document.querySelectorAll(".hex__settlement_N"),
      ...document.querySelectorAll(".hex__settlement_S"),
    ];
    places.forEach((e) => {
      if (!e.classList.contains("own")) {
        e.classList.add("select");
      }
    });
    if (this.map) {
      this.map.onclick = this.choosePlaceSettlement.bind(this);
    }
  }

  choosePlaceSettlement(e: Event) {
    const chousen = e.target;
    if (
      chousen instanceof HTMLDivElement
      && chousen.classList.contains("select")
      && (chousen.classList.contains("hex__settlement_N")
          || chousen.classList.contains("hex__settlement_S"))
    ) {
      if (
        chousen.classList.contains("hex__settlement_N") ||
        chousen.classList.contains("hex__settlement_S")
      ) {
        const places = [
          ...document.querySelectorAll(".hex__settlement_N"),
          ...document.querySelectorAll(".hex__settlement_S"),
        ];

        places.forEach((e) => { e.classList.remove("select") });

        socket.emit("setNewSettlement", this.player, chousen.id, localStorage.getItem("Room"));
        socket.emit('updateMap', localStorage.getItem('Room'))
        socket.emit('give-room-list-players', localStorage.getItem("Room"), localStorage.getItem("Name"))

        window.addEventListener("settlementSet", () => {
          window.addEventListener("mapLoaded", () => {
            this.buildFirstRoadMode(chousen.dataset.next || "")
          }, {once: true})
        }, {once: true})

        let settlementSetEvent = new CustomEvent('settlementSet');
        window.dispatchEvent(settlementSetEvent);
      }
    }
  }

  buildFirstRoadMode(next: string) {
    next.split(",").forEach((e) => {
      const road = document.getElementById(e) as HTMLDivElement;
      if (!road.classList.contains("own")) {
        road.classList.add("select");
        road.addEventListener("click", (e) => {
          socket.emit("setNewRoad", this.player, road.id, localStorage.getItem("Room"));
          socket.emit('updateMap', localStorage.getItem('Room'))
          socket.emit('give-room-list-players', localStorage.getItem("Room"), localStorage.getItem("Name"))
          socket.emit('Next-person', localStorage.getItem('Room'), localStorage.getItem('Name'))
          if (this.map) this.map.onclick = null;
        })
      }
    })
  }

  // Building
  buildRoad(player: IPlayerInfo) {
    console.log("road: im in!")
    const roads = [
      ...new Set(
        this.player?.avalible.filter((e) => e.split("_")[1] === "road")
      ),
    ];
    console.log(roads);
    const buildConst = {
      lumber: 1,
      brick: 1,
    }
    const hand = {
      lumber: player.hand.resources.lumber,
      brick: player.hand.resources.brick,
    }
    if (player.roadsStock) {
      roads.forEach((e) => {
        const road = document.getElementById(e);
        if (buildConst.lumber <= hand.lumber && buildConst.brick <= hand.brick) {
          if (road && !road.classList.contains("own")) {
            road.classList.add("select");
            road.addEventListener("click", (e) => {
              console.log("im in road.eventListener!")
              socket.emit(
                "setNewRoad",
                this.player,
                road.id,
                localStorage.getItem("Room")
              );
              socket.emit('updateMap', localStorage.getItem('Room'))
              socket.emit('roadCounter', localStorage.getItem('Room'), this.player, road.id);
              socket.emit('give-room-list-players', localStorage.getItem("Room"), localStorage.getItem("Name"))
            }); //, {once: true}
          }
        } else {
          console.log('not money')
        }
      })
    } else {console.log('no road')};
  }

  buildSettlement(player: IPlayerInfo) {
    const settlements = [
      ...new Set(
        this.player?.avalible.filter((e) => e.split("_")[1] === "settlement")
      ),
    ];
    const buildConst = {
      lumber: 1,
      brick: 1,
      wool: 1,
      grain: 1,
    }
    const hand = {
      lumber: player.hand.resources.lumber,
      brick: player.hand.resources.brick,
      wool: player.hand.resources.wool,
      grain: player.hand.resources.grain,
    }
    if (player.settlementsStock) {
      settlements.forEach((e) => {
        const settlement = document.getElementById(e);
        if (buildConst.lumber <= hand.lumber && 
            buildConst.brick <= hand.brick && 
            buildConst.wool <= hand.wool && 
            buildConst.grain <= hand.grain) {
          if (settlement && !settlement?.classList.contains("own")) {
            settlement.classList.add("select");
            settlement.addEventListener("click", (x) => {
              const chousen = x.target as HTMLDivElement;
              socket.emit(
                "setNewSettlement",
                this.player,
                chousen.id,
                localStorage.getItem("Room")
              );
              socket.emit('updateMap', localStorage.getItem('Room'))
              socket.emit('give-room-list-players', localStorage.getItem("Room"), localStorage.getItem("Name"))
              // this.updateBuildCounter(".settlement__counter"); // unused function
              // settlement.classList.add("moveDown"); //need add class after render map
            });
          }
        } else {
          console.log('not money')
        }
      });
    } else {console.log('no settlements')}
  }

  buildCity(player: IPlayerInfo) {
    const settlements = this.player?.settlements as Array<string>;
    const buildConst = {
      ore: 3,
      grain: 2,
    }
    const hand = {
      ore: player.hand.resources.ore,
      grain: player.hand.resources.grain,
    }
    if (player.settlementsStock) {
      settlements.forEach((e) => {
        const settlement = document.getElementById(e) as HTMLDivElement;
        
        if (buildConst.ore <= hand.ore && buildConst.grain <= hand.grain) {
          settlement.style.transform = "scale(1.5)";
          settlement.addEventListener("click", (e) => {
            // this.updateBuildCounter(".city__counter"); //unused function
            // this.state?.setNewCity(this.player1 as IPlayerInfo, settlement.id);
            // this.state?.updateMap();
            if (e.target && e.target instanceof HTMLElement)
              socket.emit(
                "setNewCity",
                this.player,
                settlement.id,
                localStorage.getItem("Room")
              );
              socket.emit('updateMap', localStorage.getItem('Room'))
              socket.emit('give-room-list-players', localStorage.getItem("Room"), localStorage.getItem("Name"))
              // e.target.classList.add("city", "moveDown"); //need add animation,
              // maybe city need add in another place
          });
        } else {
          console.log('not money')
        }
      });
    } else {console.log('no city')}
  }


  // Development cards
  buyDevelopCard() {
    // this.state?.buyDevelopmentCard(this.player1 as IPlayerInfo);
  }

  addPlayCardsListener(player: IPlayerInfo) {
    document.getElementById("develop-card-list")?.addEventListener("click", (e) => {
        if (e.target instanceof HTMLElement) {
          const target = e.target.closest(".game-btn");
          if (target) {
            const name = e.target.className.split(" ")[1];
            switch (name) {
              case "knight":
                console.log(name, "knight");
                // this.state?.playKnigthCard(player);
                this.playKnightCard(player);
                this.setRobber(player);
                break;
              case "monopoly":
                this.view?.showMonopolyPopup();
                // this.state?.playMonopolyCard(player);
                // this.state?.useMonopolyEffect(player, this.choiceHandler());
                break;
              case "plenty":
                this.view?.showPlentyPopup();
                // this.state?.playPlentyCard(player);
                break;
              case "road":
                // this.state?.playRoadCard(player);
                this.buildRoad(player);
                window.addEventListener(
                  "road-builded",
                  () => {
                    this.buildRoad(player);
                  },
                  { once: true }
                );
                break;
            }
          }
        }
      });
  }

  playKnightCard(player: IPlayerInfo) {
    player.hand.development.knights -= 1;
    player.armySize += 1;
    // this.state?.calculateArmySize();
    // this.setRobber(player);
  }

  setRobber(player: IPlayerInfo) {
    //На левой клетке в среднем ряду сыпет ошибки Uncaught TypeError: Cannot read properties of null (reading 'classList')
    this.map?.addEventListener("click", (e: MouseEvent) => {
      if (e.target instanceof HTMLDivElement) {
        const target = e.target.closest(".hex");
        if (target && target.classList.contains("hex")) {
          // const settlementsToRob = this.state?.setRobber(this.player1 as IPlayerInfo, String(target.id)); //this.player1 as IPlayerInfo,
          // this.state?.updateMap();

          const robber = document.querySelector(".robber");
          if (robber) robber.classList.add("moveDown"); //need add class after render map

          /*           settlementsToRob?.forEach((e) => {
            const settlement = document.getElementById(e) as HTMLDivElement;
            if (
              settlement.classList.contains("own") &&
              !settlement.classList.contains("own_nobody") &&
              !settlement.classList.contains(`own_${player.color}`)
            ) {
              settlement.classList.add("select");
              settlement.addEventListener(
                "click",
                (e) => {
                  this.state?.transferOneToAnother(
                    player,
                    settlement.classList[3]
                  );
                },
                { once: true }
              );
            }
          }); */
        }
      }
    });
  }

  choiceHandler() {
    // add listener on "accept choice btn"
    getElementBySelector("accept-choice-btn").addEventListener(
      "click",
      (e) => {
        let res;
        if (e.target instanceof HTMLDivElement) {
          if (e.target.classList.contains("resourse-for-choice")) {
            res = e.target.dataset.resource;
          }
        }
      },
      { once: true }
    );
    return "here will be string with resourse";
  }

  rollDiceTimer() {}

  turnTimer() {}

  updateState() {}

  checkIsWinner() {}

  endGame() {}

  // Maybe need modal with game over??
}
