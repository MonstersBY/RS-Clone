import Router from "./Router";
import Room from "./Room";
import Mode from "./Mode";
import Controller from "./Controller/Controller";
import View from "./View/View";
import { renderCore } from "./StartPage/templates/core";
import { addHelper } from "./StartPage/templates/ingamePopupHelper/helper";
import { diceRoll } from "./diceRoll/diceRoll";
import { burger } from "./hamburger/burger";
import { modificatePage } from "./StartPage/templates/modificateIngamePage";
import { costListener, monopolyListener, plentyListener, tradeListener } from "./GameListeners/modalListeners";

import socket from "./Socket";

export default class App {
  constructor(
    public router: Router = new Router(),
    public controller: Controller = new Controller(),
    public view: View = new View(),

    public inGame: boolean = false, // unused
    ) {}

  init() {
    this.addGameListener();
    renderCore();
    addHelper();
    this.setRouter();
    this.router.setRoutes();
    diceRoll();
    burger(
      ".header-menu",
      ".menu__list",
      ".hamburger",
      ".burger__logo",
      ".overlay"
    );
    costListener();
    tradeListener();
    monopolyListener();
    plentyListener();
    this.CreateRoom();
    this.CreateMode();
  }

  setRouter() {
    this.router = new Router();
    this.router.setRoutes();
  }

  CreateRoom() {
    if (window.location.pathname === "/room") {
      const room = new Room();
      room.init();
    }
  }

  CreateMode() {
    if (window.location.pathname === "/mode") {
      const mode = new Mode();
      mode.init();
    }
  }

  addGameListener() {
    if (window.location.pathname === "/game") {

      socket.emit('create-game', localStorage.getItem('Room'))

      socket.on('Map-object', (obj, players) => {
        this.view.init(obj, players);
        this.controller.init();
      })
    }
  }
}
