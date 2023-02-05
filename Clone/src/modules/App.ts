import State from "./State/State";
import Controller from "./Controller/Controller";
import View from "./View/View";

export default class App {
  constructor(
    public state?: State,
    public controller?: Controller,
    public view?: View,
    // may be another module for start pages
    public inGame: boolean = false,
    public players: number = 4,
    public gameMode: string = "newbie",
    ) {}

    init() {
      // dowload initial page
      // when we know what mode and players count we need - we can generate map and put it into State module
      document.querySelector(".get-map")?.addEventListener("click", e => {
        const main = document.querySelector(".main-content")
        if (main) {
          main.innerHTML = "";
          main.insertAdjacentHTML("beforeend", `<div class="map__container" id="map"></div>`);
        }
        this.startGame();
      })
    }

    setPlayerNumber() {
      // add to button listener
    }

    setGameMode() {
      // add to button listener
    }

    startGame() {
      this.state = new State(this.players, this.gameMode); // generate map with generator help
      this.state.initialState();
      // hand over map object to render
      this.view = new View(this.state); // render map and UI for every player
      this.view.init();

      // hand over view and state to controller
      this.controller = new Controller(this.view, this.state); // add listeners that set the state condition
    }
}