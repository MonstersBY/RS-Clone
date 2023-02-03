import { IPlayerInfo, IHex } from "../types/types";
import MapGenerator from "./MapGenerator"

export default class State {
  constructor(
    public players: number,
    public gameMode: string,
    public foundingStage: boolean = true,
    public activePlayer: number = 0,
    public diceRoll: number | undefined = undefined,
    public playersInfo?: Array<IPlayerInfo>,
    public mapObject?: Array<IHex>,
    private generator: MapGenerator = new MapGenerator(),
    ) {}

    initialState() {
      // generate map with generator help
      // set default parameters
      this.mapObject = this.generator.getRandomMap();
      this.playersInfo = this.createDefaultPlayer();
    }

    getFullMapObject() {
      return this.mapObject;
    }

    asd(){}

    getPlayerinfo(player: number) {
      // return one playerInfo object
    }

    addResouses(token: number) {
      // look at all playerinfo objects settlements with current token number
    }

    setDiceRoll(roll: [number, number]) {
      // ?
    }

    setRobber(coords?: Array<number>) {
      // change robber coords
    }

    setNewSettlment(player: number, coords?: Array<number>) {}

    setNewCity(player: number, coords?: Array<number>) {}

    setNewRoad(player: number, coords?: Array<number>) {}

    createDefaultPlayer() {
      return [];
    }


}