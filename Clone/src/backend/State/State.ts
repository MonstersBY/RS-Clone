import { IPlayerInfo, IHex } from "../../modules/types/types";
import MapGenerator from "./MapGenerator"

export default class State {
  constructor(
    public players: number = 4,
    public gameMode: string = "newbie",
    public foundingStage: boolean = true,
    public activePlayer: number = 0,
    public diceRoll: number | undefined = undefined,
    public playersInfo: Array<IPlayerInfo> = [],
    public mapObject?: Array<IHex>,
    private generator: MapGenerator = new MapGenerator(),
    private HEX_COUNT = 37,
    ) {}

    initialState() {
      this.generateMap();
      this.generatePlayers();
    }

    getFullMapObject() {
      return this.mapObject as Array<IHex>;
    }

    generateMap() {
      if (this.gameMode === "newbie") {
        this.mapObject = this.generator.getNewbieMap();
      } else {
        this.mapObject = this.generator.getRandomMap();
      }
    }

    generatePlayers() {
      for (let i = 0; i < this.players; i++) {
        this.playersInfo.push(this.getEmptyPlayer(i));
      }
    }

    isWinner(player: IPlayerInfo) {
      let points = 0;
      points = player.longestRoad ? points + 2 : points;
      points = player.largestArmy ? points + 2 : points;
      player.settlements;
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

    addResouses(token: number) {
      if (this.mapObject && this.playersInfo) {
        let current = []
        for (let i = 0; i < this.HEX_COUNT; i++) {
          if (this.mapObject[i].token === token) current.push(i);
        }
        for (const player of this.playersInfo) {
          player.settlements.adjacent
        }
      }
    }

    setDiceRoll(roll: [number, number]) {
      // ?
    }

    setRobber(coords?: Array<number>) {
      // change robber coords
    }

    setNewSettlment(player: number, ) {}

    setNewCity(player: number, coords?: Array<number>) {}

    setNewRoad(player: number, coords?: Array<number>) {}

    createDefaultPlayer() {
      return [];
    }
}
