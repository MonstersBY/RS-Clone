import Router from "./Router";
import Room from "./Room";
import Mode from "./Mode";
import State from "./backend/State/State";
import Controller from "./Controller/Controller";
import View from "./View/View";
import { renderCore } from "./StartPage/templates/core";
import { addHelper } from "./StartPage/templates/ingamePopupHelper/helper";
import { diceRoll } from "./diceRoll/diceRoll";
import { burger } from "./hamburger/burger";
import { modificatePage } from "./StartPage/templates/modificateIngamePage";
import { costListener } from "./GameListeners/costListener";

export default class App {
  constructor(
    public router?: any,
    public state: State = new State(),
    public controller?: Controller,
    public view: View = new View(),

    public inGame: boolean = false
  ) {}

  init() {
    this.addGameListener();
    renderCore();
    addHelper();
    diceRoll();
    modificatePage();
    burger(
      ".header-menu",
      ".menu__list",
      ".hamburger",
      ".burger__logo",
      ".overlay"
    );
    // costListener();
    this.setRouter();
    this.CreateRoom();
    this.CreateMode();
  }

  setRouter() {
    this.router = new Router();
    this.router.setRoutes();
  }

  CreateRoom() {
    const room = new Room();
    room.init();
  }

  CreateMode() {
    const mode = new Mode();
    mode.init();
  }

  setPlayerNumber() {
    // add to button listener
  }

  setGameMode() {
    // add to button listener
  }

  addGameListener() {
    if (window.location.pathname === "/game") {
      this.state.view = this.view;
      this.state.initialState();

      this.view.init(this.state.getMapObject());
      if(this.controller) this.controller.state = this.state;
      this.controller?.init();
    }
  }
 /*  startGameListener() {
    if (window.location.pathname == "/game") {
      renderGamePage();

      this.view.state = this.state;
      this.view.state.initialState();
      this.view.init();
    }
  } */

  /* startGame() {
    this.state.initialState();
    // hand over map object to render
    this.view = new View(this.state); // render map and UI for every player
    this.view.init();
    // hand over view and state to controller
    this.controller = new Controller(this.view, this.state); // add listeners that set the state condition
  } */
}
