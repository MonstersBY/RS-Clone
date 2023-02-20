import Router from "./Router";
import Room from "./Room";
import Mode from "./Mode";
import Controller from "./Controller/Controller";
import View from "./View/View";
import { renderCore } from "./StartPage/templates/core";
import { addHelper } from "./StartPage/templates/ingamePopupHelper/helper";
import  Dice  from "./diceRoll/diceRoll";
import createModal from "./StartPage/templates/gameOverPopup/gameOver";

import socket from "./Socket";
import { modificatePage } from "./StartPage/templates/modificateIngamePage";

export default class App {
  constructor(
    public router: Router = new Router(),
    public controller: Controller = new Controller(),
    public view: View = new View(),
    // public dice: Dice = new Dice,

    // public state: State = new State(),

    public inGame: boolean = false, // unused
    ) {}

  init() {
    this.addGameListener();
    renderCore();
    addHelper();
    modificatePage();
    this.setRouter();
    this.router.setRoutes();
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
      socket.emit('join-game-room', localStorage.getItem('Room'))

      socket.on('Map-object', (obj, players) => {
        this.view.init();
        this.controller.view = this.view;
        // console.log(this.controller.view)
        this.controller.init();
      })
      setTimeout(() => {
        addHelper();
      }, 0)
    }
  }
}
