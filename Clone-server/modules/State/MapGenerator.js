import newbieMap from "./newbieMap.js";
import { getEmptyPlayer } from "./emptyPlayer.js";

export default class MapGenerator {
  constructor() {
    this.tokens = [3, 4, 5, 6, 8, 9, 10, 11];
    this.hexes = ["hills", "forest", "mountains", "fields", "pasture"];
    this.harbors = [
      "all",
      "all",
      "all",
      "all",
      "brick",
      "grain",
      "lumber",
      "ore",
      "wool",
    ];
    this.HEX_COUNT = 37;
  }

  generateMap(type) {
    return type === "newbie" ? this.#getNewbieMap() : this.#getRandomMap();
  }

  generatePlayers(players) {
    const playersInfo = [];
    for (let i = 0; i < players; i++) {
      playersInfo.push(getEmptyPlayer());
    }
    return playersInfo;
  }

  generateDevelopmentDeck() {
    const development = ["road", "plenty", "monopoly"];
    const victory = Array(5).fill("victory");
    const knights = Array(14).fill("knights");
    const deck = [...knights, ...victory, ...development, ...development];
    return this.#shuffle(deck);
  }

  #getNewbieMap() {
    return newbieMap;
  }

  #getRandomMap() {
    const newMap = [...newbieMap];

    const tokens = this.#shuffle([...this.tokens, ...this.tokens, 2, 12]);
    const types = this.#shuffle([
      ...this.hexes,
      ...this.hexes,
      ...this.hexes,
      "forest",
      "fields",
      "pasture",
    ]);

    const desertIndex = this.#randomNumber(0, 18);
    tokens.splice(desertIndex, 0, 0);
    types.splice(desertIndex, 0, "desert");

    const harbors = this.#shuffle([...this.harbors]);

    let t = 0;
    let h = 0;
    for (let i = 0; i < this.HEX_COUNT; i++) {
      if (newMap[i].type === "harbor") {
        newMap[i].harbor = harbors[h];
        h++;
      } else if (newMap[i].type !== "sea") {
        newMap[i].token = tokens[t];
        newMap[i].type = types[t];
        newMap[i].robber = false;
        t++;
        if (newMap[i].type === "desert") {
          newMap[i].robber = true;
        }
      }
    }

    this.#addHarborsToSettlementNodes(newMap);

    return newMap;
  }

  #addHarborsToSettlementNodes(map) {
    const dependencies = {
      0: ["0_S", "5_N"],
      2: ["2_S", "6_N", "7_N"],
      8: ["8_S", "3_S", "13_N"],
      9: ["9_S", "16_N", "4_S"],
      21: ["14_S", "27_N"],
      22: ["22_N", "28_N", "16_S"],
      32: ["32_N", "26_S", "36_N"],
      33: ["33_N", "29_S"],
      35: ["35_N", "30_S", "31_S"],
    };

    for (const [hex, nodes] of Object.entries(dependencies)) {
      for (const hode of nodes) {
        map[hode.split("_")[0]][`settlement_${hode.split("_")[1]}`].harbor =
          map[hex].harbor;
      }
    }
  }

  #randomNumber(min, max) {
    let number = min + Math.random() * (max + 1 - min);
    return Math.floor(number);
  }

  #shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
