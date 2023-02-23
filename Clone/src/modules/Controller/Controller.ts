import View from "../View/View";
import Dice from "../diceRoll/diceRoll";
import { getElementBySelector, IPlayerInfo, IResources, IOffer } from "../types/types";
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
    this.chatMessages()
    this.createMessage()

    const buttons = `
    <div style="position: absolute; z-index: 10; top: 0; left: 100px; display: flex; flex-direction: column; height: 30px; gap: 20px;">
    <button id="first-set" style='display: none'>first-set<button>
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
        this.view?.resources(this.player as IPlayerInfo);
        this.view?.buildingStock(this.player as IPlayerInfo);
        this.view?.devCardStock(this.player as IPlayerInfo);
        this.view?.constructionConst(this.player as IPlayerInfo);
      });

      this.map = document.getElementById("map") as HTMLDivElement;
      document.body.insertAdjacentHTML("afterbegin", buttons);

      this.addBuildFirstSettlementListener(); //DELETE?
      // this.addBuildAndTradeListeners();

      // error of type
      // this.addPlayCardsListener(this.player); // don't work???, Type 'undefined' is not assignable to type 'IPlayerInfo'.
      this.createNewTurn()
    }, 0);
  }

  chatMessages() {
    const room = localStorage.getItem('Room')
    const chatBtn = document.querySelector('.form-send__btn')
    const msg = <HTMLInputElement>document.querySelector('.chat__input')
    chatBtn?.addEventListener('click', e => {
      if (msg?.value === '') return
      socket.emit('game-chatMessage', msg?.value, room, this.player?.name)
      msg.value = ''
      msg.focus()
    })
    msg?.addEventListener('keypress', (e) => {
      if(e.key === 'Enter'){
        const msg = <HTMLInputElement>document.querySelector('.chat__input')
        if (msg?.value === '') return
        socket.emit('chatMessage', msg?.value, room, this.player?.name)
        msg.value = ''
        msg.focus()
      }
    })
  }
  createMessage() {
    socket.on('game-message', (user, message) => {
      const chatMessages = document.querySelector('.chat__messages')
      this.outputMessage(user, message);
    })
  }
  outputMessage(user: string, message: string) {
    const div = document.createElement('div')
    div.classList.add('message__post')
    div.innerHTML = `
    <img src="assets/images/icons/icon_player.svg" alt="icon" class="nick">
    <b>${user}:</b> ${message}`;
    document.querySelector('.chat__messages')?.appendChild(div)
  }

  createNewTurn() {
    const btn = document.getElementById("create-new-turn");
    btn?.addEventListener("click", (e) => {
      if (btn.classList.length == 3) {
        socket.emit("Next-person",localStorage.getItem("Room"));
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

            this.addBuildAndTradeListeners();
            nextBtn?.classList.add("active");
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

  // NEED add listener to construction cost - it independent from turn listener

  //this listener add only in turn of active player
  addBuildAndTradeListeners() {
    const btnsWrap = document.getElementById("build-trade-card-list");

    btnsWrap?.addEventListener("click", (e: Event) => {
      if (e.target instanceof HTMLElement && this.activePlayer) {
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
              this.view?.showTradePopup(this.player as IPlayerInfo); // class modal toggle(maybe need only add class? or also clear curentState)
              // if(tradeWithPlayers)
              this.tradeWithPlayers(this.player as IPlayerInfo);
              break
            case "trade-devcard__btn":
              this.buyDevelopCard(this.player as IPlayerInfo);
              break;
          }
        }
      }
    });
  }

  /* addRobberListener() {
    document.getElementById("robber")?.addEventListener("click", () => { this.setRobber(this.player1 as IPlayerInfo); })
  } */

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

        // chousen.classList.add("moveDown"); // Не добавляется анимация постройки города и дорог

        if (this.map) {
          this.map.onclick = () => this.buildFirstRoadMode(chousen.dataset.next || "");
        }

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
          socket.emit('Next-person', localStorage.getItem('Room'))
          if (this.map) this.map.onclick = null;
        })
      }
    })
  }

  // Building
  buildRoad(player: IPlayerInfo) {
    const roads = [
      ...new Set(
        this.player?.avalible.filter((e) => e.split("_")[1] === "road")
      ),
    ];
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
          if (road && !road.classList.contains("own" ) ) {
            road.classList.add("select");
            road.addEventListener("click", (e) => {
              socket.emit(
                "setNewRoad",
                this.player,
                road.id,
                localStorage.getItem("Room")
              );
              socket.emit('updateMap', localStorage.getItem('Room'))
              socket.emit('give-room-list-players', localStorage.getItem("Room"), localStorage.getItem("Name"))
              road.classList.add("moveDown"); // need add class after render map (can add movedown class)
            });
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

  // TRADE LOGIC

  tradeWithPlayers(player: IPlayerInfo) {
    const offerContainer = document.getElementById("offer__container");
    const wishContainer = document.getElementById("wish__container");
    const positiveCheck = document.getElementById("offer__positive");
    const negativeCheck = document.getElementById("offer__negative");

    if (offerContainer)
      offerContainer.addEventListener("click", (e) => {
        this.offerHandler(e, player);
      });
    if (wishContainer)
      wishContainer.addEventListener("click", (e) => {
        this.wishHandler(e);
      });

    if (positiveCheck) positiveCheck.addEventListener("click", () => {
      this.makeOffer();
    });
    if (negativeCheck) negativeCheck.addEventListener("click", () => {

      this.view?.showTradePopup(this.player as IPlayerInfo);
    });
  }

  offerHandler(e: Event, player: IPlayerInfo) {
    if (e.target instanceof HTMLElement) {
      const target = e.target.closest(".trade__resource");
      if (target) {
        const resource = target.className.split(" ")[0] as keyof IResources;
        const id = target.id;
        if (target.classList.contains("empty")) {
          // когда старт, в любом случае класс удаляю, счетчик увеличиваю до 1
          target.classList.remove("empty");
          target.classList.add("offer");
          this.increaseCounter(id); //must be 1 in result
        } else {
          const counterNumber = this.getCounterNumber(id);
          if (counterNumber && counterNumber < player.hand.resources[resource]) {
            this.increaseCounter(id);
          } else {
            return;
          }
        }
      }
    }
  }
  wishHandler(e: Event) {
    if (e.target instanceof HTMLElement) {
      const target = e.target.closest(".trade__resource");
      if (target) {
        const id = target.id;
        if (target.classList.contains("empty")) {
          // когда старт, в любом случае класс удаляю, счетчик увеличиваю до 1
          target.classList.remove("empty");
          target.classList.add("wish");
          this.increaseCounter(id); //must be 1 in result
        } else {
          this.increaseCounter(id);
        }
      }
    }
  }

  makeOffer() {
    const offerContainer = document.getElementById("offer__container"); // maybe must get by class?
    const wishContainer = document.getElementById("wish__container"); // to have opportunity to call this function
    // when hadle counteroffer popup

    if (offerContainer && wishContainer) {
      // Здесь делаю объект
      const currentOffer: IOffer = {
        have: {
          brick: 0,
          grain: 0,
          lumber: 0,
          ore: 0,
          wool: 0,
        },
        wish: {
          brick: 0,
          grain: 0,
          lumber: 0,
          ore: 0,
          wool: 0,
        },
      };
      const offerResources = offerContainer.querySelectorAll(".offer");
      const wishResources = wishContainer.querySelectorAll(".wish");

      this.addToCurrentOffer(offerResources, currentOffer.have);
      this.addToCurrentOffer(wishResources, currentOffer.wish);
    }
    // need make offer another players => render counterOfferPopup (gamePage modal-trade__counteroffer)acording currentOfferState ???
    this.showSentOfferMessage();
    this.view?.showTradePopup(this.player as IPlayerInfo);
  }

  addToCurrentOffer(arr: NodeListOf<Element>, offerSide: IResources) {
    arr.forEach((item) => {
      const id = item.id;
      const resource = item.className.split(" ")[0];
      const counterNumber = this.getCounterNumber(id);
      offerSide[resource as keyof typeof offerSide] = Number(counterNumber);
    });
  }

  showSentOfferMessage() {
    const offerMes = document.querySelector(".offer-message"); // show message about sending of offer
    if (offerMes) {
      offerMes.classList.add("moveDown");
      setTimeout(() => {
        offerMes.classList.remove("moveDown");
        offerMes.classList.add("slideInUp");
      }, 3000);
    }
  }

  getCounterNumber(id: string) {
    const counterParent = document.getElementById(id);
    if (counterParent) {
      const counter = counterParent.querySelector(".resource-counter");
      if (counter) {
        const counterTextContent = Number(counter.textContent);
        return counterTextContent;
      }
    }
  }

  increaseCounter(id: string) {
    const counterParent = document.getElementById(id);
    if (counterParent) {
      const counter = counterParent.querySelector(".resource-counter");
      counter?.classList.remove("invisible");
      let number = this.getCounterNumber(id) as number;
      if (counter) {
        counter.textContent = `${++number}`;
      }
    }
  }


  // Development cards
  buyDevelopCard(player: IPlayerInfo) {
    const buildConst = {
      ore: 1,
      grain: 1,
      wool: 1,
    }
    const hand = {
      ore: player.hand.resources.ore,
      grain: player.hand.resources.grain,
      wool: player.hand.resources.wool,
    }
    if (buildConst.ore <= hand.ore && buildConst.grain <= hand.grain && buildConst.wool <= hand.wool) {
      console.log('BUY DEV CARD')
      socket.emit('buy-develop-card', player, localStorage.getItem('Room'))
    } else {
      console.log('not money')
    }
  }

  addPlayCardsListener(player: IPlayerInfo) {
    document
      .getElementById("develop-card-list")
      ?.addEventListener("click", (e) => {
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
                  "road-builded", // this event doesn't generate
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
