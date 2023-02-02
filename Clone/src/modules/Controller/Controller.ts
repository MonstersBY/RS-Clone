import View from "../View/View";
import State from "../State/State";
import Timer from "../utils/timeHandler/timeHandler";

export default class Controller {
  constructor(
    public view: View,
    public state: State,
    public timer: Timer = new Timer,
    ) {}

    startGame() {}

    setFoundingStage() {}

    turnTransfer() {}

    rollDice() {} // import from dice module?

    rollDiceTimer() {}

    turnTimer() {}

    updateState() {}

    checkIsWinner() {}

    endGame() {}
}
