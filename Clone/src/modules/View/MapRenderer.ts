import { getElementBySelector, IHex } from "../types/types";

export default class MapRenderer {
  constructor(
    public mapObject?: Array<IHex>,
    private HEX_COUNT = 37,
    ) {}

    getMapAsNodeTree(mapObject: Array<IHex>) {
      let template = ``;
      for (let i = 0; i < this.HEX_COUNT; i++) {
        const hex = mapObject[i]; 
        const hexNode = `
          <div class="hex hex_${i} hex_${hex.type} ${hex.harbor ? `harbor_${hex.harbor}` : ""}">
              ${hex.token ? `<div class="hex__num_tocken">${hex.token}</div>` : ""}

              ${hex.settlement_N ? `<div class="hex_node hex__settlement_N" id="${hex.settlement_N.id}"  data-next="${hex.settlement_N.nextNodes}"></div>` : ""}
              ${hex.road_N ? `<div class="hex_node hex__road_N" id="${hex.road_N.id}" data-next="${hex.road_N.nextNodes}"></div>` : ""}
              ${hex.road_W ? `<div class="hex_node hex__road_W" id="${hex.road_W.id}" data-next="${hex.road_W.nextNodes}"></div>` : ""}
              ${hex.road_S ? `<div class="hex_node hex__road_S" id="${hex.road_S.id}" data-next="${hex.road_S.nextNodes}"></div>` : ""}
              ${hex.settlement_S ? `<div class="hex_node hex__settlement_S" id="${hex.settlement_S.id}" data-next="${hex.settlement_S.nextNodes}"></div>` : ""}
              ${hex.robber ? `<div class="hex__robber"></div>` : ""}
          </div>
        `
        template += hexNode;
    }
    return `${template}`;
  }

  private addSettlement() {

  }

  lineCounter(str: string) {
    const lines = str
    let i = 0;
    return function() {
      (i + 1 > 37) ? i = 0 : i;
      return lines[i++];
    }
  }

  getHexAsNode(hex: IHex) {
    // getElementBySelector("#map");
    // find hex with index and redraw it
  }
}
