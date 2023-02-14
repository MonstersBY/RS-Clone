import Router from "./Router";
// import Room from "./Room";
// import Mode from "./Mode";
import State from "../backend/State/State";
import Controller from "./Controller/Controller";
import View from "./View/View";
import { renderCore } from "./StartPage/templates/core";
import { addHelper } from "./StartPage/templates/ingamePopupHelper/helper";
import { diceRoll } from "./diceRoll/diceRoll";
import { burger } from "./hamburger/burger";
import { modificatePage } from "./StartPage/templates/modificateIngamePage";
import { costListener, tradeListener } from "./GameListeners/modalListeners";

export default class App {
  constructor(
    public router: Router = new Router(),
    public controller: Controller = new Controller(),
    public view: View = new View(),
    public state: State = new State(),

    public inGame: boolean = false, // unused
    ) {}

  init() {
    this.addGameListener();
    // renderCore();
    addHelper();
    // this.setRouter();
    // this.router.setRoutes();
    diceRoll();
    modificatePage();
    burger(
      ".header-menu",
      ".menu__list",
      ".hamburger",
      ".burger__logo",
      ".overlay"
    );
    // temp disabled
    costListener();
    tradeListener();
    // this.CreateRoom();
    // this.CreateMode();
  }

/*   setRouter() {
    this.router = new Router();
    this.router.setRoutes();
  }
 */
  // temp disabled
  // CreateRoom() {
  //   const room = new Room();
  //   room.init();
  // }

  // temp disabled
  // CreateMode() {
  //   const mode = new Mode();
  //   mode.init();
  // }

  addGameListener() {
    if (window.location.pathname === "/game") {
      this.state.view = this.view;
      this.state.initialState();

      this.view.init(this.state.mapObject);
      this.controller.state = this.state;
      this.controller.init();
    }
  }
}
