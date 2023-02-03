import View from "../View/View";
import State from "../State/State";
import Timer from "./Timer";
import GameMaster from "./GameMaster";

export default class Controller {
  constructor(
    public view: View,
    public state: State,

    private timer: Timer = new Timer(),
    private master: GameMaster = new GameMaster(),
    ) {}

    startGame() {}

    startTurn() {
      this.timer.setDiceTimer();
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
