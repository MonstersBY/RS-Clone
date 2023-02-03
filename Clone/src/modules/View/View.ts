import State from "../State/State";
import MapRenderer from "./MapRenderer";
import PlayerInterface from "./PlayerInterface";

export default class View {
  constructor(
    public state: State,
    private renderer?: MapRenderer,
    private ui?: PlayerInterface, 
    ) {}

    init() {
      this.renderer = new MapRenderer(this.state.mapObject);
      this.ui = new PlayerInterface(this.state.playersInfo);
    }

    firstRender() {
      this.renderFullMap(this.renderer?.getMapAsNodeTree());
      this.renderfullUI(0);
    }

    renderFullMap(template: any) {
      // transfer this.state.mapObject object to nodes
    }

    renderfullUI(player: number) {
      // transfer this.state.playersInfo[player] object to UI
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
