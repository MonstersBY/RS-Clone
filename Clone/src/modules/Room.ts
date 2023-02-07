import State from "../backend/State/State";

export default class Room {
  constructor(
    // private params: string,
    public state?: State,
    ) {}

  init() {
    this.state = new State();
    this.addStartListerer();
  }

  addStartListerer() {
    // document.addEventListener("click", e => {
    //   if ((e.target as Element).classList.contains(".start__game")) {
    //     app.startGame();
    //   }
    // })
  }

  getRandomHash() {}

}
