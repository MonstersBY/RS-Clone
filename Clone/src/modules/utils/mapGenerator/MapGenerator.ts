export default class MapGenerator {
  constructor(
    private numberTokens: Array<number> = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 12, 11, 10, 9, 8, 6, 5, 4, 3, 2],
    private hexes: Array<any> = ["hills", "forest", "mountains", "fields", "pasture", "desert","sea"],
    ) {}

    public getNewbieMap() {
      // returns simply map object
    }

    public getRandomMap() {
      // generate random map object
    }

    private generateHexes() {}

    private generateTokens() {}
}
