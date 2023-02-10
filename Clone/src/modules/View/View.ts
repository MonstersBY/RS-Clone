import State from "../../backend/State/State";
import Room from "../../backend/Room";
import { IHex, ISettlement } from "../types/types";
import MapRenderer from "./MapRenderer";
import PlayerInterface from "./PlayerInterface";
import { game } from "../StartPage/templates/gamePage";

export default class View {
  constructor(
    private renderer: MapRenderer = new MapRenderer(),
    private ui?: PlayerInterface, 
    ) {}

    init(mapObject: any) {
      this.renderGamePage();
      // this.ui = new PlayerInterface(this.state?.playersInfo);
      this.renderFullMap(mapObject);
    }

    renderGamePage() {
      document.body.innerHTML = "";
      document.body.insertAdjacentHTML("beforeend", game);
    }

    renderFullMap(map: Array<IHex>) {
      const mapContainer = document.querySelector("#map");
      if (mapContainer) {
        mapContainer.innerHTML = "";
        const mapTree = this.renderer.getMapAsNodeTree(map as Array<IHex>) as string;
        mapContainer?.insertAdjacentHTML("beforeend", mapTree);
      }
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
