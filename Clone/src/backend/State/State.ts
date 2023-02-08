import { IPlayerInfo, IHex, IPlayerHand } from "../../modules/types/types";
import MapGenerator from "./MapGenerator"

export default class State {
  constructor(
    public players: number = 4,
    public gameMode: string = "newbie",
    public foundingStage: boolean = true,
    public activePlayer: number = 0,
    public diceRoll: [number, number] = [1, 1],
    public playersInfo: Array<IPlayerInfo> = [],
    public mapObject?: any, //IHex[]
    private generator: MapGenerator = new MapGenerator(),
    private HEX_COUNT = 37,
    ) {}

    initialState() {
      this.generateMap();
      this.generatePlayers();
    }

    getFullMapObject() {
      return this.mapObject
    }

    generateMap() {
      if (this.gameMode === "newbie") {
        this.mapObject = this.generator.getNewbieMap();
      } else if (this.gameMode === "normal") {
        this.mapObject = this.generator.getRandomMap();
      }
    }

    generatePlayers() {
      for (let i = 0; i < this.players; i++) {
        this.playersInfo.push(this.getEmptyPlayer(i));
      }
    }

    private getEmptyPlayer(i: number) {
      return <IPlayerInfo>{
        id: i,
        longestRoad: false,
        largestArmy: false,

        hand: {
          resources: {
            brick: 0,
            grain: 0,
            lumber: 0,
            ore: 0,
            wool: 0, 
          },
          development: {
            victory: 0,
            knights: 0,
            road: 0,
            plenty: 0,
            monopoly: 0,
          },
        },
        harbors: [],
        hexes: [],

        settlements: [],
        cities: [],
        roads: [],

        roadChain: 0,
        armySize: 0,
      }
    }

    isWinner(player: IPlayerInfo) {
      let points = 0;
      points = player.longestRoad ? points + 2 : points;
      points = player.largestArmy ? points + 2 : points;
      player.settlements;
    }

    public addResourses(dice: number) {
      if (this.mapObject && this.playersInfo) {

        let currentHexes = []
        for (let i = 0; i < this.HEX_COUNT; i++) {
          if (this.mapObject[i].token === dice) currentHexes.push(i);
        }

        for (const player of this.playersInfo) {
          for (let i = 0; i < player.hexes.length; i++) {
            for (let j = 0; j < currentHexes.length; j++) {
              if (player.hexes[i] === currentHexes[j]) {
                switch (this.mapObject[j].type) {
                  case "hills":
                    player.hand.resources.brick += 1;
                  break;
                  case "fields":
                    player.hand.resources.grain += 1;
                  break;
                  case "forest":
                    player.hand.resources.lumber += 1;
                  break;
                  case "mountains":
                    player.hand.resources.ore += 1;
                  break;
                  case "pasture":
                    player.hand.resources.wool += 1;
                  break;
                }
              }
            }
          }
        }
      }
    }

    isDiscount(player: IPlayerInfo, type: string) {
      return player.harbors.some(harbor => harbor === type);
    }

    exchangeResourse(player: IPlayerInfo, lose: keyof IPlayerHand, get: keyof IPlayerHand) {
      let number = 4;
      if (this.isDiscount(player, "all")) {
        number = 3;
      }
      if (this.isDiscount(player, lose)) {
        number = 2;
      }

      player.hand.resources[lose as keyof typeof player.hand.resources] -= number;
      player.hand.resources[get as keyof typeof player.hand.resources] += 1;
    } 

    setDiceRoll(roll: [number, number]) {
      this.diceRoll = roll;
    }

    setRobber(i: number) {
      if (this.mapObject) {
        this.mapObject.forEach((hex: IHex) => {
          hex.robber = false;
        })
        this.mapObject[i] = true;
      }
    }

    setNewSettlment(player: number, ) {}

    setNewCity(player: number, coords?: Array<number>) {}

    setNewRoad(player: number, coords?: Array<number>) {}

    createDefaultPlayer() {
      return [];
    }
}
