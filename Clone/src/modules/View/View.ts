import State from "../backend/State/State";
// import Room from "../backend/Room";
import { IHex, ISettlement } from "../types/types";
import MapRenderer from "./MapRenderer";
import PlayerInterface from "./PlayerInterface";
import { game } from "../StartPage/templates/gamePage";

export default class View {
  constructor(
    public state?: State,
    private renderer: MapRenderer = new MapRenderer(),
    private ui?: PlayerInterface
  ) {}

  init(mapObject: any) {
    this.renderGamePage();
    // this.ui = new PlayerInterface(this.state?.playersInfo);
    this.renderFullMap(mapObject);
    // this.costListener();
  }

  renderGamePage() {
    const container = document.querySelector(".container");
    if (container) container.innerHTML = "";
    container?.insertAdjacentHTML("beforeend", game);

    if (container) {
      container.addEventListener("click", (e: Event) => {
        const constructionBlock = document.querySelector(".construction-cost");
        console.log(e.target);
        if (
          e.target instanceof HTMLDivElement &&
          e.target.classList.contains("cost__btn")
        ) {
          constructionBlock?.classList.toggle("cost");
        }
      });
    }

    /* document.body.innerHTML = "";
    document.body.insertAdjacentHTML("beforeend", game); */
  }

  renderFullMap(map: Array<IHex>) {
    const mapContainer = document.querySelector("#map");
    if (mapContainer) {
      mapContainer.innerHTML = "";
      const mapTree = this.renderer.getMapAsNodeTree(
        map as Array<IHex>
      ) as string;
      mapContainer?.insertAdjacentHTML("beforeend", mapTree);
    }
  }
 /*  costListener = () => {
    const mainContent = document.querySelector(".main-content");
    const constructionBlock = document.querySelector(".construction-cost");
    console.log({ mainContent });
    if (mainContent)
      mainContent.addEventListener("click", (e: Event) => {
        console.log(e.target);
        if (
          e.target instanceof HTMLDivElement &&
          e.target.classList.contains("cost__btn")
        ) {
          constructionBlock?.classList.toggle("cost");
        }
      });
  }; */

  /*  init() {
      this.renderer = new MapRenderer(this.state?.mapObject);
      this.ui = new PlayerInterface(this.state?.playersInfo);
      this.firstRender();
    }

    firstRender() {
      const mapContainer = document.querySelector("#map");
      console.log(mapContainer)
      if(mapContainer) {
        mapContainer.innerHTML = "";
        const mapTree = this.renderer?.getMapAsNodeTree(this.state?.getFullMapObject() as Array<IHex>) as string;
        mapContainer?.insertAdjacentHTML("beforeend", mapTree);
      }
    }
 */
  /*  renderFullMap() {
    // hey, renderer, transfer this.state.mapObject object to nodes
  } */

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
