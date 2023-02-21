import MapGenerator from "./MapGenerator.js"

export default class State {
  constructor () {
    this.playersCount = 4;
    this.gameMode = "classic";
    this.gameMap = "newbie";
    this.turn = -1;
    this.foundingStage = true;
    this.activePlayer = 0;
    this.diceRoll = [1, 1];
    this.playersInfo = [];
    this.mapObject = [];
    this.developmentDeck = [];
    this.largestArmy = 0;
    this.longestRoad = 0;
    this.HEX_COUNT = 37;
  }

  initialState() {
    const generator = new MapGenerator(); //
    this.mapObject = JSON.parse(JSON.stringify(generator.generateMap(this.gameMap))); //разрываем связь
    this.playersInfo = JSON.parse(JSON.stringify(generator.generatePlayers(this.playersCount)));
    this.developmentDeck = JSON.parse(JSON.stringify(generator.generateDevelopmentDeck()));
    this.activePlayer = 0;
    this.foundingStage = true;
  }

  // Turn based events
<<<<<<< HEAD
  // setDiceRoll(roll) {
  //   this.diceRoll = roll;
  // }
=======
  /* setDiceRoll(roll) {
    this.diceRoll = roll;
    this.addResoursesThisTurn(roll[0]+roll[1]);
  }
 */
  addResoursesThisTurn(dice, map, players) {
    if (map && players) {
>>>>>>> d55dad2f8a60d0e06a590b2ac220178d826648a3

  addResoursesThisTurn(dice, map, players) {
    if (map  && players) {
      let currentHexes = []
      for (let i = 0; i < this.HEX_COUNT; i++) {
        if (map[i].token === dice && !map[i].robber) {
          currentHexes.push(i);
        }
      }
<<<<<<< HEAD
=======

>>>>>>> d55dad2f8a60d0e06a590b2ac220178d826648a3
      for (const player of players) {
        for (let i = 0; i < player.hexes.length; i++) {
          for (let j = 0; j < currentHexes.length; j++) {
            if (player.hexes[i] === currentHexes[j]) {
<<<<<<< HEAD
              switch (map[currentHexes[j]].type) {
=======
              switch (map[j].type) {
>>>>>>> d55dad2f8a60d0e06a590b2ac220178d826648a3
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

  addResoursesFirstSettlement(map, player) {
    // console.log(map[0])
    let hex
    for (let i = 0; i < map.length; i++) {
      const arrMap = [this.mapObject[i].settlement_N, this.mapObject[i].settlement_S]
      for (let i = 0; i < arrMap.length; i++) {
        if (arrMap[i]){
          if (arrMap[i].id == player.settlements[1]) {
            hex = arrMap[i].nextHexes
            break
          }
        }    
      }
    }
    
    for (let i = 0; i < hex.length; i++) {
      switch (map[hex[i]].type) {
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

  isWinner(player) {
    let points = 0;
    points = player.longestRoad ? points + 2 : points;
    points = player.largestArmy ? points + 2 : points;
    points += player.settlements.length;
    points += player.cities.length * 2;
    points += player.hand.development.victory;
    return points >= 10;
  }

  isDiscount(player, type) {
    return player.harbors.some(harbor => harbor === type);
  }

  // Player actions
  setRobber(player, id) {
    const i = id.split("_")[1];
    if (this.mapObject) {
      this.mapObject.forEach((hex) => {
        hex.robber = false;
      })
      this.mapObject[i].robber = true;
    }
    let roads = [...this.mapObject[i].settlement_N.nextNodes, ...this.mapObject[i].settlement_S.nextNodes];
    roads = roads.filter(e => e.split("_")[2] !== "W");
    let settlementsToRob = [];
    roads.forEach(road => {
      const hex = road.split("_")[0];
      const hode = "road_" + road.split("_")[2];
      settlementsToRob.push(...this.mapObject[hex][hode].nextNodes);
    })
    settlementsToRob = [...new Set(settlementsToRob)];
    return settlementsToRob;
  }

  exchangeResourseBank(player, lose, get) {
    let number = 4;
    if (this.isDiscount(player, "all")) {
      number = 3;
    }
    if (this.isDiscount(player, lose)) {
      number = 2;
    }
    player.hand.resources[lose] -= number;
    player.hand.resources[get] += 1;
  }

  makeExchangeProposal(player) {}// !!!

  // Building
  setNewSettlement(player, id) {
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
      // console.log('hex: '+ hex)
      // console.log('roadId: '+ roadId)
      // console.log(this.mapObject[hex][roadId].id)
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
    // console.log(player)
    const nextHexes = this.mapObject[hex][hode].nextHexes;
    player.hexes.push(...nextHexes);
    // player.hexes.sort();
    player.avalible.push(...nearNodes);
    // console.log(player.avalible);
  }

  setNewCity(player, id) {
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

  setNewRoad(player, id) {
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

    this.calculateRoadChain(player, id, nearNodes);
  }

  // Development
  buyDevelopmentCard(player) {
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

  playKnigthCard(player) {}// !!!

  playMonopolyCard(player) {}// !!!

  playPlentyCard(player) {}// !!!

  playRoadCard(player) {}// !!!

  // Tecnical checks and events
  isAnyResourse(res) {
    return res.brick + res.grain + res.lumber + res.ore + res.wool;
  }

  chooseRandomResourse(res) {
    const randomNumber = new MapGenerator().randomNumber;
    const resources = ["grain", "wool", "ore", "lumber", "brick"];
    let chosen = 0;
    let i;
    do {
      i = randomNumber(0, 4);
      chosen = res[resources[i]];
    }
    while (!chosen)
    return resources[i];
  }

  transferOneToAnother(player, victimColor) {
    for (const playerVictim of this.playersInfo) {
      if (playerVictim.color === victimColor) {
        if (this.isAnyResourse(playerVictim.hand.resources)) {
          const type = this.chooseRandomResourse(playerVictim.hand.resources);
          playerVictim.hand.resources[type] -= 1;
          player.hand.resources[type] += 1;
        };
      }
    }
  }

  calculateRoadChain(player, id) {
    if (player.roads.length > 4) {
      // better start from top-left
    }
  }

  calculateMaxRoadChain() {
    for (const player of this.playersInfo) {
      if (this.longestRoad < 5 && player.roadChain === 5) {
        player.longestRoad = true;
        this.longestRoad = 5;
      }
      if (this.longestRoad >= 5 && player.roadChain > this.longestRoad) {
        for (const player of this.playersInfo) {
          player.longestRoad = false;
        }
        this.longestRoad = player.roadChain;
        player.longestRoad = true;
      }
    }
  }

  calculateMaxArmySize() {
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
        player.largestArmy = true;
      }
    }
  }

}

