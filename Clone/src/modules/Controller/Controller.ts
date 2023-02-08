import View from "../View/View";
import Room from "../Room";
// import Timer from "./Timer";
import GameMaster from "../../backend/GameMaster";

export default class Controller {
  constructor(
    // public view: View,
    // public room: Room,

    // private timer: Timer = new Timer(),
    private master: GameMaster = new GameMaster(),
    ) {}

    init() {
      this.addNextListener();
    }

    addNextListener() {
      const mapContainer = document.querySelector("#map");
      mapContainer?.addEventListener("click", e => {
        if (e.target instanceof HTMLDivElement) {
          if (e.target.classList.contains("hex_node")) {
            e.target.classList.add("active");
            const next = e.target.dataset.next?.split(",");
            next?.forEach((e) => {
              document.getElementById(`${e}`)?.classList.add("active");
            })
          }
        }
      })
    }

    startGame() {}

    startTurn() {
      // this.timer.setDiceTimer();
    }

    setFoundingStage() {}

    turnTransfer() {}

    rollDice() {} // import from dice module?

    rollDiceTimer() {}

    turnTimer() {}

    updateState() {}

    checkIsWinner() {}

    endGame() {}
}
