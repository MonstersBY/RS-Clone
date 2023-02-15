import { IHex } from "../types/types";

export default class MapRenderer {
  constructor(
    private HEX_COUNT = 37,
    ) {}

  getMapAsNodeTree(mapObject: Array<IHex>) {
    let template = ``;

    const types = {
      fields: 1,
      mountains: 1,
      forest: 1,
      pasture: 1,
      hills: 1,
    }

    for (let i = 0; i < this.HEX_COUNT; i++) {
      const hex = mapObject[i];

      const hexToken = hex.token ? `<div class="hex__num_tocken">${hex.token}</div>` : "";

      const settlement_N = hex.settlement_N ?
      `<div class="hex_node hex__settlement_N ${
        hex.settlement_N.player ? `own own_${hex.settlement_N.player}` : ""} ${
        hex.settlement_N.city ? "city" : ""}" id="${hex.settlement_N.id}" data-next="${hex.settlement_N.nextNodes}">
      </div>` : "";

      const road_N = hex.road_N ?
        `<div class="hex_node hex__road_N${hex.road_N.player ? ` own own_${hex.road_N.player}` : ""}" id="${hex.road_N.id}" data-next="${hex.road_N.nextNodes}"></div>` : "";

      const road_W = hex.road_W ?
      `<div class="hex_node hex__road_W${hex.road_W.player ? ` own own_${hex.road_W.player}` : ""}" id="${hex.road_W.id}" data-next="${hex.road_W.nextNodes}"></div>` : "";

      const road_S = hex.road_S ?
      `<div class="hex_node hex__road_S${hex.road_S.player ? ` own own_${hex.road_S.player}` : ""}" id="${hex.road_S.id}" data-next="${hex.road_S.nextNodes}"></div>` : "";

      const settlement_S = hex.settlement_S ?
        `<div class="hex_node hex__settlement_S ${
          hex.settlement_S.player ? `own own_${hex.settlement_S.player}` : ""} ${
          hex.settlement_S.city ? "city" : ""}" id="${hex.settlement_S.id}" data-next="${hex.settlement_S.nextNodes}">
        </div>` : "";

      const robber = hex.robber ? `<div class="robber moveDown"></div>` : "";

      const hexNode = `
        <div class="hex hex_${hex.type} ${
          hex.type in types ? `version_${types[hex.type as keyof typeof types]}` : ""}${
          hex.harbor ? `harbor_${hex.harbor}` : ""}"
          id="hex_${i}">
          ${hexToken}
          ${settlement_N}
          ${road_N}
          ${road_W}
          ${road_S}
          ${settlement_S}
          ${robber}
        </div>
      `
      if (typeof types[hex.type as keyof typeof types] !== "undefined") {
        types[hex.type as keyof typeof types] += 1;
      }
      template += hexNode;
    }
    return `${template}`;
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
