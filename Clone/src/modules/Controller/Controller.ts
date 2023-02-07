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
