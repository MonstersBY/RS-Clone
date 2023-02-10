import { intro } from "./StartPage/templates/introPage";
import { mode } from "./StartPage/templates/modePage";
import { room } from "./StartPage/templates/roomPage";
import { game } from "./StartPage/templates/gamePage";
import { errorPage } from "./StartPage/templates/errorPage";
import { getElementBySelector } from "./types/types";

class Router {
  constructor(
    private routes: any = {
      "/intro": {
        title: "Intro",
        template: intro,
      },
      "/mode": {
        title: "Main",
        template: mode,
      },
      "/room": {
        title: "Room",
        template: room,
      },
      "/game": {
        title: "Game",
        template: game,
      },
      "/404": {
        title: "Page not found",
        template: errorPage,
      },
    },
  ) {}

  addRoute(route: string) {
    getElementBySelector("#main").innerHTML = "";
    getElementBySelector("#main").insertAdjacentHTML(
      "afterbegin",
      this.routes[route as keyof typeof this.routes].template
    );
    getElementBySelector("#browser_tab").innerHTML =
    `Colonist | ${this.routes[route as keyof typeof this.routes].title}`;
  }

  setRoutes() {
    switch (window.location.pathname) {
      case "/":
      case "/intro":
        this.addRoute("/intro");
        break;
      case "/mode":
        this.addRoute("/mode");
        break;
      case "/room":
        this.addRoute("/room");
        break;
      case "/game":
        this.addRoute("/game");
        // this.gameStartEvent();
        break;
      default:
        this.addRoute("/404");
    }
  }

  // gameStartEvent() {
  //   let event = new Event("gamestart", {bubbles: true});
  //   document.body.dispatchEvent(event);
  // }
}

export default Router;
