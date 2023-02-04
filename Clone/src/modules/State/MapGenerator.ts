import newbieMap from "./newbieMap"

export default class MapGenerator {
  constructor(
    private numberTokens: Array<number> = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 12, 11, 10, 9, 8, 6, 5, 4, 3, 2],
    private hexes: Array<any> = ["hills", "forest", "mountains", "fields", "pasture", "desert","sea"],
    ) {}

    public getNewbieMap() {
      return newbieMap;
    }

    public getRandomMap() {
      return [];
      // return generated random map object
    }

    private generateHexes() {
      let hex = {
        type: "wood",
        number: 3,
        settment_N: false,
        road_N: false,
        road_W: false,
        road_S: false,
        settment_S: {
          player: null,
          type: null,
        },
        robber: false,
      }
    }

    private shuffle(array: Array<any>) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    private generateTokens() {}
}
