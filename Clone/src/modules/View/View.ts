import State from "../State/State";

export default class View {
  constructor(
    public state: State,
    ) {}

    renderMap() {
      // transfer this.state.mapObject object to nodes
    }

    renderUI(player: number) {
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
