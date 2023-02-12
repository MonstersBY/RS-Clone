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
    public developmentDeck: Array<string> = [],
    public largestArmy = 0,
    public longestRoad = 0,
    private HEX_COUNT = 37,
  ) {}

  public initialState() {
    this.mapObject = this.generateMap(this.gameMode);
    this.playersInfo = this.generatePlayers(this.playersCount);
    this.developmentDeck = this.generateDevelopmentDeck();

    this.activePlayer = 0;
    this.foundingStage = true;
  }

  public updateMap() {
    this.view?.renderFullMap(this.mapObject);
  }

  // Generation. Works 1 time
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

  private generateDevelopmentDeck() {
    const development = ["road", "plenty", "monopoly"];
    const victory = Array(5).fill("victory");
    const knights = Array(14).fill("knights");
    const deck = [...knights, ...victory, ...development, ...development];
    const shuffle = new MapGenerator().shuffle;
    return shuffle(deck);
  }

  // Turn based events
  public setDiceRoll(roll: [number, number]) {
    this.diceRoll = roll;
  }

  public addResoursesThisTurn(dice: number) {
    if (this.mapObject && this.playersInfo) {

      let currentHexes = []
      for (let i = 0; i < this.HEX_COUNT; i++) {
        if (this.mapObject[i].token === dice && !this.mapObject[i].robber) {
          currentHexes.push(i);
        }
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

  public isWinner(player: IPlayerInfo) {
    let points = 0;
    points = player.longestRoad ? points + 2 : points;
    points = player.largestArmy ? points + 2 : points;
    points += player.settlements.length;
    points += player.cities.length * 2;
    points += player.hand.development.victory;
    return points >= 10;
  }

  public isDiscount(player: IPlayerInfo, type: string) {
    return player.harbors.some(harbor => harbor === type);
  }

  // Player actions
  public setRobber(player: IPlayerInfo, id: string) {
    const i = id.split("_")[1];
    if (this.mapObject) {
      this.mapObject.forEach((hex: IHex) => {
        hex.robber = false;
      })
      this.mapObject[i].robber = true;
    }
    let roads = [...this.mapObject[i].settlement_N.nextNodes, ...this.mapObject[i].settlement_S.nextNodes];
    roads = roads.filter(e => e.split("_")[2] !== "W");
    let settlementsToRob: Array<string> = [];
    roads.forEach(road => {
      const hex = road.split("_")[0];
      const hode = "road_" + road.split("_")[2];
      settlementsToRob.push(...this.mapObject[hex][hode].nextNodes);
    })
    settlementsToRob = [...new Set(settlementsToRob)];
    return settlementsToRob;
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

  public makeExchangeProposal(player: IPlayerInfo) {}// !!!

  public setNewSettlement(player: IPlayerInfo, id: string) {
    // add to mapObject
    const hex = id.split("_")[0];
    const hode = "settlement_" + id.split("_")[2];
    this.mapObject[hex][hode].player = String(player.color);

    //block near settlments
    const nearNodes = this.mapObject[hex][hode].nextNodes;

    let nearSettlments = [];
    for (let i = 0; i < nearNodes.length; i++) {
      const hex = nearNodes[i].split("_")[0];
      const roadId = "road_" + nearNodes[i].split("_")[2];
      nearSettlments.push(...this.mapObject[hex][roadId].nextNodes);
    }
    const nearSettlmentsSet = new Set(nearSettlments);
    nearSettlmentsSet.delete(id);
    nearSettlments = [...nearSettlmentsSet]
    for (let j = 0; j < nearSettlments.length; j++) {
      const hex = nearSettlments[j].split("_")[0];
      const settlmentId = "settlement_" + nearSettlments[j].split("_")[2];
      if (!this.mapObject[hex][settlmentId].player) {
        this.mapObject[hex][settlmentId].player = "nobody";
      }
    }

    // add to playerInfo
    player.settlements.push(id);
    const nextHexes = this.mapObject[hex][hode].nextHexes;
    player.hexes.push(...nextHexes);
    // player.hexes.sort();
    player.avalible.push(...nearNodes);
    // console.log(player.avalible);
  }

  public setNewCity(player: IPlayerInfo, id: string) {
    // add to mapObject
    const hex = id.split("_")[0];
    const hode = "settlement_" + id.split("_")[2];
    this.mapObject[hex][hode].city = true;

    // add to playerInfo
    player.settlements.splice(player.settlements.indexOf(id), 1);
    player.cities.push(id);
    const nextHexes = this.mapObject[hex][hode].nextHexes;
    player.hexes.push(...nextHexes);
    // player.hexes.sort();

    console.log(player.hexes, "hexes")
    console.log(player.cities, "cities")
    console.log(player.settlements, "settlements")
  }

  public setNewRoad(player: IPlayerInfo, id: string) {
    // add to mapObject
    const hex = id.split("_")[0];
    const hode = "road_" + id.split("_")[2];
    this.mapObject[hex][hode].player = player.color;

    const nearNodes = this.mapObject[hex][hode].nextNodes;

    let nearRoads = [];
    for (let i = 0; i < nearNodes.length; i++) {
      const hex = nearNodes[i].split("_")[0];
      const settlementId = "settlement_" + nearNodes[i].split("_")[2];
      nearRoads.push(...this.mapObject[hex][settlementId].nextNodes);
    }
    const nearRoadsSet = new Set(nearRoads);
    nearRoadsSet.delete(id);
    nearRoads = [...nearRoadsSet];

    // add to playerInfo
    player.roads.push(id);
    player.avalible.push(...nearRoads, ...nearNodes);
    // console.log(player.avalible);
  }

  public buyDevelopmentCard(player: IPlayerInfo) {
    const resources = player.hand.resources;
    const development = player.hand.development;
    if (resources.grain > 0 &&
        resources.ore > 0 &&
        resources.wool > 0) {
          resources.grain -= 1;
          resources.ore -= 1;
          resources.wool -= 1;
          const topCard = this.developmentDeck.pop();
          switch (topCard) {
            case "road":
              development.road += 1;
            break;
            case "plenty":
              development.plenty += 1;
            break;
            case "monopoly":
              development.monopoly += 1;
            break;
            case "knights":
              development.knights += 1;
            break;
            case "victory":
              development.victory += 1;
            break;
          }
    }
  }

  public playKnigthCard(player: IPlayerInfo) {}// !!!

  public playMonopolyCard(player: IPlayerInfo) {}// !!!

  public playPlentyCard(player: IPlayerInfo) {}// !!!

  public playRoadCard(player: IPlayerInfo) {}// !!!

  // Tecnical checks and events
  private isAnyResourse(res: IPlayerHand["resources"]) {
    return res.brick + res.grain + res.lumber + res.ore + res.wool;
  }

  private chooseRandomResourse(res: IPlayerHand["resources"]) {
    const randomNumber = new MapGenerator().randomNumber;
    const resources = ["grain", "wool", "ore", "lumber", "brick"];
    let chosen = 0;
    let i: number;
    do {
      i = randomNumber(0, 4);
      chosen = res[resources[i] as keyof typeof res];
    }
    while (!chosen)
    return resources[i];
  }

  public transferOneToAnother(player: IPlayerInfo, victimColor: string) {
    for (const playerVictim of this.playersInfo) {
      if (playerVictim.color === victimColor) {
        if (this.isAnyResourse(playerVictim.hand.resources)) {
          const type = this.chooseRandomResourse(playerVictim.hand.resources);
          playerVictim.hand.resources[type as keyof IPlayerHand["resources"]] -= 1;
          player.hand.resources[type as keyof IPlayerHand["resources"]] += 1;
        };
      }
    }
  }

  public calculateRoadChain(player: IPlayerInfo) {// !!!
    if (player.roads.length > 4) {
      // better start from top-left
    }
  }

  public calculateArmySize() {
    for (const player of this.playersInfo) {
      if (this.largestArmy < 3 && player.armySize === 3) {
        player.largestArmy = true;
        this.largestArmy = 3;
      }
      if (this.largestArmy >= 3 && player.armySize > this.largestArmy) {
        for (const player of this.playersInfo) {
          player.largestArmy = false;
        }
        this.largestArmy = player.armySize;
        player.largestArmy = false;
      }
    }
  }

}
