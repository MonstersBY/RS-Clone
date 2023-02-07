import newbieMap from "./newbieMap"

export default class MapGenerator {
  constructor(
    private tokens: Array<number> = [3, 4, 5, 6, 8, 9, 10, 11],
    private hexes: Array<string> = ["hills", "forest", "mountains", "fields", "pasture"],
    private harbors: Array<string> = ["all", "all", "all", "all", "brick", "grain", "lumber", "ore", "wool"],
    private HEX_COUNT = 37,
    ) {}

    public getNewbieMap() {
      return newbieMap;
    }

    public getRandomMap() {
      let newMap = newbieMap;

      let tokens = this.shuffle([...this.tokens, ...this.tokens, 2, 12]);
      let types = this.shuffle([...this.hexes, ...this.hexes, ...this.hexes, "forest", "fields", "pasture"]);

      const desertIndex = this.randomNumber(0, 18);
      tokens.splice(desertIndex, 0, 0);
      types.splice(desertIndex, 0, "desert");

      let harbors = this.shuffle([...this.harbors]);

      let t = 0;
      let h = 0;
      for (let i = 0; i < this.HEX_COUNT; i++) {
        if (newMap[i].type === "harbor") {
          newMap[i].harbor = harbors[h];
          h++;
        } else if(newMap[i].type !== "sea") {
          newMap[i].token = tokens[t];
          newMap[i].type = types[t];
          t++;
        }
      }

      return newMap;
    }

    private randomNumber(min: number, max: number) {
      let number = min + Math.random() * (max + 1 - min);
      return Math.floor(number);
    }

    private shuffle(array: Array<any>) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
}
