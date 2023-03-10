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
  ) {}

  init() {
    this.dice.init();
    this.chatMessages()
    this.createMessage()

    socket.emit('give-room-list-players', localStorage.getItem('Room'))

    setTimeout(() => {
      socket.emit(
        "isYouTurnPlayer",
        localStorage.getItem("Room"),
        localStorage.getItem("Name")
      );

    socket.on("firstSettlementMode", (player, active) => {
      this.player = player;
      this.activePlayer = active;

      if (this.activePlayer) {
        this.buildFirstSettlementMode();
      }
    });

    socket.on("Turn-player", (player, active) => {
      this.player = player;
      this.activePlayer = active;
      this.canRoll = active;
      if (this.activePlayer) {
        const dices = document.querySelectorAll(".dice");
        if (dices) dices.forEach(dice => {
          dice.classList.add("select");
        });
        const audio = new Audio('../../assets/files/NextTurn.mov')
        audio.play();
      }

      const nextBtn = document.getElementById("create-new-turn");
      nextBtn?.classList.remove("active");
    });

    this.addListenerDices();
    this.observerOfPlayersToRob();

    socket.on("Change-playerInfo", (players) => {
      const indexUser = players.findIndex((findUser: { name: string | undefined; }) => findUser.name === this.player?.name)
      this.player = players[indexUser];
      if (this.player){
        this.view?.resources(this.player as IPlayerInfo);
        this.view?.buildingStock(this.player as IPlayerInfo);
        this.view?.devCardStock(this.player as IPlayerInfo);
        this.view?.constructionConst(this.player as IPlayerInfo);
      }
      this.view?.createPlayers(players as [IPlayerInfo])
    });

    socket.on("displayDiceState", (roll) => {
      this.view?.highlighHexesWithCurrentRollNumber(roll[0] + roll[1]);
    });

    this.map = document.getElementById("map") as HTMLDivElement;

    this.addPlayCardsListener();
    this.addBuildAndTradeListeners();
    this.createNewTurn();
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
      if(e.key === 'Enter') {
        const msg = <HTMLInputElement>document.querySelector('.chat__input')
        if (msg?.value === '') return
        socket.emit('game-chatMessage', msg?.value, room, this.player?.name)
        msg.value = ''
        msg.focus()
      }
    })
  }

  createMessage() {
    socket.on('game-message', (user, message) => {
      const chatMessages = document.querySelector('.chat__messages')
      if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
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
      if (btn.classList.contains('active') && this.activePlayer) {
        socket.emit("Next-person",localStorage.getItem("Room"));
      }
    });
    socket.on("Client-turn", () => {
      socket.emit(
        "isYouTurnPlayer",
        localStorage.getItem("Room"),
        localStorage.getItem("Name")
      );
    });
  }

  addListenerDices() {
    document.getElementById("roll-dice")?.addEventListener(
      "click",
      (e: Event) => {
        if (this.canRoll && this.activePlayer) {
          const dices = document.querySelectorAll(".dice");
          if (dices) dices.forEach((dice) => {
              dice.classList.remove("select");
            });
          const target = e.target as HTMLElement;
          if (target && target.closest(".dice__container") && this.dice) {
            const roll = this.dice.randomDiceRoll();
            this.dice.audio.play();
            this.canRoll = false;
            socket.emit("weRollDice", localStorage.getItem("Room"), roll);
            socket.emit('give-room-list-players', localStorage.getItem("Room"))

            if((roll[0] + roll[1]) === 7){
              socket.emit('robberCheckCards', localStorage.getItem("Room"))
              this.setRobber(this.player as IPlayerInfo, false)
            } else {
              this.view?.highlighHexesWithCurrentRollNumber(roll[0] + roll[1]);
              this.activePlayerPlay();
            }
          }
        }
      },
    );
  }

  activePlayerPlay() {
    setTimeout(() => {
      const nextBtn = document.getElementById("create-new-turn");
      nextBtn?.classList.add("active");
    }, 1500);
  }

  //this listener add only in turn of active player
  addBuildAndTradeListeners() {
    const btnsWrap = document.getElementById("build-trade-card-list");

    btnsWrap?.addEventListener("click", (e: Event) => {
      if (e.target instanceof HTMLElement && this.activePlayer && !this.canRoll) {
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
              this.view?.showTradePopup(this.player as IPlayerInfo);
              this.tradeWithBank(this.player as IPlayerInfo);
              break;
            case "trade-devcard__btn":
              this.buyDevelopCard(this.player as IPlayerInfo);
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
      chousen instanceof HTMLDivElement &&
      chousen.classList.contains("select") &&
      (chousen.classList.contains("hex__settlement_N") ||
        chousen.classList.contains("hex__settlement_S"))
    ) {
      if (
        chousen.classList.contains("hex__settlement_N") ||
        chousen.classList.contains("hex__settlement_S")
      ) {
        const places = [
          ...document.querySelectorAll(".hex__settlement_N"),
          ...document.querySelectorAll(".hex__settlement_S"),
        ];

        places.forEach((e) => {
          e.classList.remove("select");
        });

        const audio = new Audio('../../assets/files/BuildingComplete_1.wav');
        audio.play();
        socket.emit("setNewSettlement", this.player, chousen.id, localStorage.getItem("Room"));
        socket.emit('updateMap', localStorage.getItem('Room'))
        socket.emit('give-room-list-players', localStorage.getItem("Room"))

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
        road.addEventListener("click", () => {
          const audio = new Audio('../../assets/files/Building_1.wav');
          audio.play();
          socket.emit("setNewRoad", this.player, road.id, localStorage.getItem("Room"));
          socket.emit('updateMap', localStorage.getItem('Room'))
          socket.emit('give-room-list-players', localStorage.getItem("Room"))
          socket.emit('Next-person', localStorage.getItem('Room'))
          if (this.map) this.map.onclick = null;
        });
      }
    });
  }

  // Building
  buildRoad(player: IPlayerInfo, isFree = false) {
    const roads = [
      ...new Set(
        this.player?.avalible.filter((e) => e.split("_")[1] === "road")
      ),
    ];
    const buildConst = {
      lumber: 1,
      brick: 1,
    };
    const hand = {
      lumber: player.hand.resources.lumber,
      brick: player.hand.resources.brick,
    };
    if (player.roadsStock) {
      roads.forEach((e) => {
        const road = document.getElementById(e);
        if ((buildConst.lumber <= hand.lumber && buildConst.brick <= hand.brick) || isFree) {
          if (road && !road.classList.contains("own")) {
            road.classList.add("select");
            road.addEventListener("click", (e) => {
              socket.emit(
                "setNewRoad",
                this.player,
                road.id,
                localStorage.getItem("Room"),
                isFree,
              );
              const audio = new Audio('../../assets/files/Building_1.wav');
              audio.play();
              socket.emit('updateMap', localStorage.getItem('Room'))
              socket.emit('give-room-list-players', localStorage.getItem("Room"))

              let roadBuildedEvent = new CustomEvent("road-builded");
              document.dispatchEvent(roadBuildedEvent);
            });
          }
        }
      });
    }
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
    };
    const hand = {
      lumber: player.hand.resources.lumber,
      brick: player.hand.resources.brick,
      wool: player.hand.resources.wool,
      grain: player.hand.resources.grain,
    };
    if (player.settlementsStock) {
      settlements.forEach((e) => {
        const settlement = document.getElementById(e);
        if (
          buildConst.lumber <= hand.lumber &&
          buildConst.brick <= hand.brick &&
          buildConst.wool <= hand.wool &&
          buildConst.grain <= hand.grain
        ) {
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
              const audio = new Audio('../../assets/files/BuildingComplete_1.wav');
              audio.play();
              socket.emit('updateMap', localStorage.getItem('Room'))
              socket.emit('give-room-list-players', localStorage.getItem("Room"))
            });
          }
        }
      });
    }
  }

  buildCity(player: IPlayerInfo) {
    const settlements = this.player?.settlements as Array<string>;
    const buildConst = {
      ore: 3,
      grain: 2,
    };
    const hand = {
      ore: player.hand.resources.ore,
      grain: player.hand.resources.grain,
    };
    if (player.settlementsStock) {
      settlements.forEach((e) => {
        const settlement = document.getElementById(e) as HTMLDivElement;

        if (buildConst.ore <= hand.ore && buildConst.grain <= hand.grain) {
          settlement.style.transform = "scale(1.5)";
          settlement.addEventListener("click", (e) => {
            if (e.target && e.target instanceof HTMLElement)
              socket.emit(
                "setNewCity",
                this.player,
                settlement.id,
                localStorage.getItem("Room")
              );
              const audio = new Audio('../../assets/files/Upgrade_1.wav');
              audio.play();
              socket.emit('updateMap', localStorage.getItem('Room'))
              socket.emit('give-room-list-players', localStorage.getItem("Room"))
          });
        }
      });
    }
  }

  // Trade logic
  tradeWithBank(player: IPlayerInfo) {
    const offerContainer = document.getElementById("offer__container");
    const wishContainer = document.getElementById("wish__container");
    const positiveCheck = document.getElementById("offer__positive");
    const negativeCheck = document.getElementById("offer__negative");

    if (offerContainer)
      offerContainer.addEventListener("click", (e) => {
        this.giveHandler(e, player);
      });

    if (wishContainer)
      wishContainer.addEventListener("click", (e) => {
        this.wishHandler(e);
      });

    if (positiveCheck)
      positiveCheck.addEventListener("click", () => {
        this.makeDeal(player);
      });

    if (negativeCheck)
      negativeCheck.addEventListener("click", () => {
        this.view?.showTradePopup(this.player as IPlayerInfo);
      });
  }

  giveHandler(e: Event, player: IPlayerInfo) {
    if (e.target instanceof HTMLElement) {
      const target = e.target.closest(".trade__resource");
      if (target) {
        const resource = target.className.split(" ")[0] as keyof IResources;
        const modificator = Number(`${document.getElementById(`${resource}-cost`)?.innerText || 4}`)
        if (player.hand.resources[resource] >= modificator) {
          if (target.classList.contains("empty")) {
            target.classList.remove("empty");
            target.classList.add("offer");
          }

          const countDisplay = target.querySelector(".resource-counter");
          countDisplay?.classList.remove("invisible");
          let currentNumber = Number(countDisplay?.textContent);

          if (countDisplay) {
            countDisplay.textContent = `${currentNumber + modificator}`;
          }
        }
      }
    }
  }

  wishHandler(e: Event) {
    if (e.target instanceof HTMLElement) {
      const target = e.target.closest(".trade__resource");
      if (target) {
        if (target.classList.contains("empty")) {
          target.classList.remove("empty");
          target.classList.add("wish");
        }
        const counter = target.querySelector(".resource-counter");
        counter?.classList.remove("invisible");
        let currentNumber = Number(counter?.textContent);
        if (counter && currentNumber < 10) {
          counter.textContent = `${++currentNumber}`;
        }

      }
    }
  }

  makeDeal(player: IPlayerInfo) {
      const currentOffer: IOffer = {
        have: {
          brick:  Number(document.getElementById("brick-give")?.innerText)  || 0,
          grain:  Number(document.getElementById("grain-give")?.innerText)  || 0,
          lumber: Number(document.getElementById("lumber-give")?.innerText) || 0,
          ore:    Number(document.getElementById("ore-give")?.innerText)    || 0,
          wool:   Number(document.getElementById("wool-give")?.innerText)   || 0,
        },
        wish: {
          brick:  Number(document.getElementById("brick-wish")?.innerText)  || 0,
          grain:  Number(document.getElementById("grain-wish")?.innerText)  || 0,
          lumber: Number(document.getElementById("lumber-wish")?.innerText) || 0,
          ore:    Number(document.getElementById("ore-wish")?.innerText)    || 0,
          wool:   Number(document.getElementById("wool-wish")?.innerText)   || 0,
        },
      };

      if (this.isTheDealFair(player, currentOffer)) {
        for (const [resource, count] of Object.entries(currentOffer.have)) {
          player.hand.resources[resource as keyof IResources] -= count;
        }

        for (const [resource, count] of Object.entries(currentOffer.wish)) {
          player.hand.resources[resource as keyof IResources] += count;
        }
        this.view?.showTradePopup(this.player as IPlayerInfo);
        socket.emit('updateHand', player, localStorage.getItem('Room'));
      } else {
        alert("Deal is not fair! Add more");
      }
  }

  isTheDealFair(player: IPlayerInfo, offer: IOffer) {
    let giveValue = 0;
    let wishValue = 0;
    const allCost = player.harbors.includes("all") ? 3 : 4;
    for (const [resource, count] of Object.entries(offer.have)) {
      const modificator = player.harbors.includes(`${resource}`) ? 2 : allCost;
      giveValue += Number(count) / modificator;
    }

    for (const count of Object.values(offer.wish)) {
      wishValue += count;
    }

    return giveValue >= wishValue;
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
      socket.emit('buy-develop-card', player, localStorage.getItem('Room'))
    }
  }

  addPlayCardsListener() {
    document
      .getElementById("develop-card-list")
      ?.addEventListener("click", (e) => {
        if (e.target instanceof HTMLElement && this.activePlayer && !this.canRoll) {
          const target = e.target.closest(".game-btn");
          if (target) {
            const name = target.className.split(" ")[1];
            switch (name) {
              case "knights-develop__btn":
                if(this.player?.hand.development.knights){
                  this.setRobber(this.player as IPlayerInfo, true);
                }
                break;
              case "monopoly-develop__btn":
                if(this.player?.hand.development.monopoly){
                  this.view?.showMonopolyPopup();
                  this.playMonopolyCard(this.player as IPlayerInfo)
                }
                break;
              case "plenty-develop__btn":
                if(this.player?.hand.development.plenty){
                  this.view?.showPlentyPopup();
                  this.playPlentyCard(this.player as IPlayerInfo)
                }
                break;
              case "road-develop__btn":
                if (this.player?.hand.development.road) {
                  this.buildRoad(this.player as IPlayerInfo, true);
                  document.addEventListener(
                    "road-builded",
                    () => {
                      window.addEventListener('mapLoaded', ()=>{
                        this.buildRoad(this.player as IPlayerInfo, true);
                      }, { once: true })
                    },
                    { once: true }
                  );
                  socket.emit("playDevelopRoads", localStorage.getItem("Room"), this.player)
                }
                break;
            }
          }
        }
      });
  }

  playMonopolyCard(player: IPlayerInfo){
    const monopolyScreen = document.querySelector('.monopoly-choose')
    const ready = getElementBySelector('.monopoly_check')
    ready.onclick = function(){
      const checkedInputs = monopolyScreen?.querySelector<HTMLInputElement>(
        "input.choose-checkbox:checked"
      );
      socket.emit('playMonopolyCard', localStorage.getItem('Room'), player, checkedInputs?.value)
      const modalMonopoly = document.querySelector(".monopoly-choose");
      modalMonopoly?.classList.toggle("modal");
    }
  }

  playPlentyCard(player: IPlayerInfo){
    const plentyScreen = document.querySelector('.plenty-choose')
    const ready = getElementBySelector('.plenty_check')
    ready.onclick = function() {
      const checkedInputs = plentyScreen?.querySelectorAll<HTMLInputElement>(
        "input.choose-checkbox:checked"
      );
      if(checkedInputs) {
        const resources = [checkedInputs[0].value, checkedInputs[1].value]
        socket.emit('playPlentyCard', localStorage.getItem('Room'), player, resources)
      }
      const modalPlenty = document.querySelector(".plenty-choose");
      modalPlenty?.classList.toggle("modal");
    }
  }

  setRobber(player: IPlayerInfo, knight: boolean) {
    const hexs = document.querySelectorAll('.hex')
    hexs.forEach((e) =>{
      if (!e.querySelector('#robberIcon') && !e.classList.contains('hex_sea') && !e.classList.contains('hex_harbor')) {
        e.classList.add('active_hex')
        e.addEventListener('click', (e) =>{
          if (e.target && e.target instanceof HTMLElement)
          socket.emit(
            "setRobber",
            this.player,
            (e.target as HTMLDivElement)?.id,
            localStorage.getItem("Room"),
            knight
          );
          const audio = new Audio(`${
            knight ? '../../assets/files/Knight_1.wav' : '../../assets/files/Bandit_1.wav'
          }`)
          audio.play();
          socket.emit('give-room-list-players', localStorage.getItem("Room"))
          this.activePlayerPlay();
        }, {once: true})
      }
    })
  }

  observerOfPlayersToRob() {
    socket.on('take-one-res', (settlement) => {
      const colors: string[] = [];
      settlement.forEach((e: string) => {
        const div = document.getElementById(e) as HTMLDivElement
        if (div?.classList.contains('own') && !div?.classList.contains(`own_${this.player?.color}`)) {
          if (div?.classList[3].split("_")[1] != 'nobody') {
            colors.push(div?.classList[3].split("_")[1])
          }
        }
      })
      socket.emit('transfer-one-to-another', this.player,localStorage.getItem("Room"), colors[Math.floor(Math.random() * colors.length)])
    })
  }
}
