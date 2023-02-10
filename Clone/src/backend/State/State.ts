import { IPlayerInfo, IHex, IPlayerHand } from "../../modules/types/types";
import MapGenerator from "./MapGenerator"
import { getEmptyPlayer } from "./EmptyPlayer"
import View from "../../modules/View/View";

export default class State {
  constructor(
    public view?: View,
    public playersCount: number = 4,
    public gameMode: string = "newbie",
    public foundingStage: boolean = true,
    public activePlayer: number = 0,
    public diceRoll: [number, number] = [1, 1],
    public playersInfo: Array<IPlayerInfo> = [],
    public mapObject: any = [],
    private HEX_COUNT = 37,
    ) {}

    public initialState() {
      this.mapObject = this.generateMap(this.gameMode);
      this.playersInfo = this.generatePlayers(this.playersCount);
      this.activePlayer = 0;
      this.foundingStage = true;
    }

    public updateMap() {
      this.view?.renderFullMap(this.mapObject);
    }

    public mainState() {
      this.foundingStage = false;
    }

    public getMapObject() {
      return this.mapObject;
    }

    private generateMap(mode: string) {
      const generator = new MapGenerator();
      return mode === "newbie" ? generator.getNewbieMap() : generator.getRandomMap();
    }

    private generatePlayers(players: number) {
      const colors = ["red", "blue", "green", "orange"];
      const playersInfo = [];
      for (let i = 0; i < players; i++) {
        playersInfo.push(getEmptyPlayer(i, colors[i]));
      }
      return playersInfo;
    }

    public isWinner(player: IPlayerInfo) {
      let points = 0;
      points = player.longestRoad ? points + 2 : points;
      points = player.largestArmy ? points + 2 : points;
      points += player.settlements.length;
      points += player.cities.length * 2;
      points += player.hand.development.victory;
    }

    public addResoursesThisTurn(dice: number) {
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

    public isDiscount(player: IPlayerInfo, type: string) {
      return player.harbors.some(harbor => harbor === type);
    }

    public exchangeResourseBank(player: IPlayerInfo, lose: keyof IPlayerHand, get: keyof IPlayerHand) {
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

    public setDiceRoll(roll: [number, number]) {
      this.diceRoll = roll;
    }

    public setRobber(i: number) {
      if (this.mapObject) {
        this.mapObject.forEach((hex: IHex) => {
          hex.robber = false;
        })
        this.mapObject[i].robber = true;
      }
    }

    public setNewSettlement(player: IPlayerInfo, id: string) { // вызывается дважды !!! ???
      // add to mapObject
      const hex = id.split("_")[0];
      const hode = "settlement_" + id.split("_")[2];
      this.mapObject[hex][hode].player = player.color;

      //block near settlments
      const nearRoads = this.mapObject[hex][hode].nextNodes;

      let nearSettlments = [];
      for (let i = 0; i < nearRoads.length; i++) {
        const hex = nearRoads[i].split("_")[0];
        const roadId = "road_" + nearRoads[i].split("_")[2];
        nearSettlments.push(...this.mapObject[hex][roadId].nextNodes);
      }
      const nearSettlmentsSet = new Set(nearSettlments);
      nearSettlmentsSet.delete(id);
      nearSettlments = [...nearSettlmentsSet]
      for (let j = 0; j < nearSettlments.length; j++) {
        const hex = nearSettlments[j].split("_")[0];
        const settlmentId = "settlement_" + nearSettlments[j].split("_")[2];
        if (!this.mapObject[hex][settlmentId].player) {
          this.mapObject[hex][settlmentId] = false;
        }
      }

      // add to playerInfo
      player.settlements.push(id);
      const nextHexes = this.mapObject[hex][hode].nextHexes;
      player.hexes.push(nextHexes);
      player.hexes.sort();
      player.avalible.push(...nearRoads);

      console.log(player.avalible);
      this.updateMap();
    }

    public setNewCity(player: IPlayerInfo, id: string) {
      // add to mapObject
      const hex = id.split("_")[0];
      const hode = "settlment_" + id.split("_")[2];
      this.mapObject[hex][hode].city = true;

      // add to playerInfo
      player.settlements.splice(player.settlements.indexOf(id), 1);
      player.cities.push(id);
      const nextHexes = this.mapObject[hex][hode].nextHexes;
      player.hexes.push(nextHexes);
      player.hexes.sort();
    }

    public setNewRoad(player: IPlayerInfo, id: string) {
      // add to mapObject
      const hex = id.split("_")[0];
      const hode = "road_" + id.split("_")[2];
      this.mapObject[hex][hode].player = player.color;

      // add to playerInfo
      player.roads.push(id);
    }

    calculateRoadChain(player: IPlayerInfo) {
      if (player.roads.length > 4) {
        // better start from top-left
      }
    }

    calculateArmySize(player: IPlayerInfo) {
      if (player.armySize > 3) {
        // ???
      }
    }

}
