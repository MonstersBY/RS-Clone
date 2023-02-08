import Router from "./Router";
import Room from "./Room";
import Controller from "./Controller/Controller";
import View from "./View/View";
import { renderCore } from "./StartPage/templates/core";
import { addHelper } from "./StartPage/templates/ingamePopupHelper/helper";
import { renderGamePage } from "./StartPage/templates/gamePage";
import State from "../backend/State/State";

export default class App {
  constructor(
    public router: Router = new Router(),
    public controller: Controller = new Controller(),
    public view: View = new View(),

    public state: State = new State(),

    public room?: Room,
    public inGame: boolean = false,
    ) {}

    init() {
      renderCore();
      addHelper();
      this.router.setRoutes();
      this.createRoomListener();
      this.createStartListener();
      this.startGameListener();
    }

    startGameListener() {
      if (window.location.pathname == "/game") {
        renderGamePage();
        this.view.state = this.state;
        this.view.state.initialState();
        this.view.init();
      }
    }
    
    createIntroListener() {
      document.addEventListener("click", (e) => {
        if ((e.target as HTMLButtonElement).classList.contains(".start__btn")) {
          e.preventDefault();
          console.log("cliсk")
        }
      })
    }

    createRoomListener() {
      document.addEventListener("click", (e) => {
        if ((e.target as HTMLButtonElement).classList.contains(".create__btn")) {
          e.preventDefault()
          this.createRoom();
        }
      })
    }

    createRoom() {
      const room = new Room(); // создаём комнату на сервере
      this.room = room;
      room.init();
    }

    createStartListener() {
      document.addEventListener("click", e => {
        if ((e.target as HTMLButtonElement).classList.contains(".start__game")) {
          e.preventDefault()
          this.startGame();
        }
      })
    }

    setPlayerNumber() {
      // add to button listener
    }

    setGameMode() {
      // add to button listener
    }

    startGame() {
      console.log("im working!")
    }
}
