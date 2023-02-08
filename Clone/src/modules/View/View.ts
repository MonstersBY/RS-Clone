import State from "../../backend/State/State";
import Room from "../Room";
import { IHex, ISettlement } from "../types/types";
import MapRenderer from "./MapRenderer";
import PlayerInterface from "./PlayerInterface";

export default class View {
  constructor(
    private renderer: MapRenderer = new MapRenderer(),
    private ui?: PlayerInterface, 
    public state?: State,
    ) {}

    init() {
      this.renderer = new MapRenderer(this.state?.mapObject);
      this.ui = new PlayerInterface(this.state?.playersInfo);
      this.firstRender();
    }

    firstRender() {
      const mapContainer = document.querySelector("#map");
      if (mapContainer) {
        mapContainer.innerHTML = "";
        const mapTree = this.renderer?.getMapAsNodeTree(this.state?.getFullMapObject() as Array<IHex>) as string;
        mapContainer?.insertAdjacentHTML("beforeend", mapTree);
      }
    }

    renderFullMap() {
      // hey, renderer, transfer this.state.mapObject object to nodes
    }

    renderfullUI(player: number) {
      // hey, ui, transfer this.state.playersInfo[player] object to UI
      this.renderStats();
      this.renderHand(player);
    }

    renderStats() {
      // transfer this.state.playersInfo object to UI
    }

    renderHand(player: number) {
      // transfer this.state.playersInfo[player].hand object to UI
    }
}
