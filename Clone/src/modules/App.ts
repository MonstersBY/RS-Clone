import Router from "./Router";
import Room from "./Room";
import State from "./State/State";
import Controller from "./Controller/Controller";
import View from "./View/View";
import { renderCore } from "./StartPage/templates/core";
import { addHelper } from "./StartPage/templates/ingamePopupHelper/helper";
import { diceRoll } from "./diceRoll/diceRoll";

export default class App {
  constructor(
    public router?: any,
    public state: State = new State(),
    public controller?: Controller,
    public view?: View,
    public room?: Room,

    public inGame: boolean = false,
    ) {}

    init() {
      renderCore();
      addHelper();
      diceRoll();
      this.setRouter();
    }

    setRouter() {
      this.router = new Router();
      this.router.setRoutes();
    }

    setPlayerNumber() {
      // add to button listener
    }

    setGameMode() {
      // add to button listener
    }

    startGame() {
      this.state.initialState();
      // hand over map object to render
      this.view = new View(this.state); // render map and UI for every player
      this.view.init();
      // hand over view and state to controller
      this.controller = new Controller(this.view, this.state); // add listeners that set the state condition
    }
}