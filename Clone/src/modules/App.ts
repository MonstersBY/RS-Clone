import Router from "./Router";
// import Room from "../backend/Room";
import Controller from "./Controller/Controller";
import View from "./View/View";
import State from "../backend/State/State";
import { renderCore } from "./StartPage/templates/core";
import { addHelper } from "./StartPage/templates/ingamePopupHelper/helper";

export default class App {
  constructor(
    public router: Router = new Router(),
    public controller: Controller = new Controller(),
    public view: View = new View(),
    public state: State = new State(),

    // public room: Room = new Room(),
    ) {}

  init() {
    renderCore();
    addHelper();
    this.router.setRoutes();
    this.addGameListener();
  }

  addGameListener() {
    if (window.location.pathname === "/game") {
      this.state.view = this.view;
      this.state.initialState();

      this.view.init(this.state.getMapObject());
      this.controller.state = this.state;
      this.controller.init();
    }
  }
}
