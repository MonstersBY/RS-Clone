// import State from "../../backend/State/State";
// import Room from "../../backend/Room";
import { IHex, ISettlement } from "../types/types";
import MapRenderer from "./MapRenderer";
import PlayerInterface from "./PlayerInterface";
import { game } from "../StartPage/templates/gamePage";

export default class View {
  constructor(
    private renderer: MapRenderer = new MapRenderer(),
    private ui?: PlayerInterface
  ) {}

    init(mapObject: any, playersInfo: any) {
      setTimeout(() => {
      this.renderFullMap(mapObject);
      // add renderfullUI(player: number)
      }, 0);
    }

  // Possable useless function
  //   renderGamePage() {
  //     const container = document.getElementById("main");
  //     if (container) container.innerHTML = "";
  //     container?.insertAdjacentHTML("afterbegin", game);

  //   //   if (container) {
  //   //     container.addEventListener("click", (e: Event) => {
  //   //       const constructionBlock = document.querySelector(".construction-cost");
  //   //       console.log(e.target);
  //   //       if (
  //   //         e.target instanceof HTMLDivElement &&
  //   //         e.target.classList.contains("cost__btn")
  //   //       ) {
  //   //         constructionBlock?.classList.toggle("cost");
  //   //       }
  //   //     });
  //   // }
  // }

  renderFullMap(map: Array<IHex>) {
    const mapContainer = document.getElementById("map");
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
