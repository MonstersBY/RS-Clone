import { IHex } from "../types/types";

export default class MapRenderer {
  constructor(
    public mapObject?: Array<IHex>
    ) {}

    getMapAsNodeTree() {
      // return map as node tree
    }

    udateOneHex(index: number) {
      // find hex with index and redraw it
    }
}