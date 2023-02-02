import { IPlayerInfo, IHex } from "../utils/types/types";
import MapGenerator from "../utils/mapGenerator/MapGenerator"

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
      this.generator.getRandomMap();
    }

    getMap() {
      return this.mapObject;
    }

    createDefaultPlayer() {}

    transferTurn() {
      this.activePlayer < this.players ? this.activePlayer += 1 : this.activePlayer = 0;
    }

}