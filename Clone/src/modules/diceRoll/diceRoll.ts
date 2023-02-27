import socket from "../Socket";

export default class Dice {
  constructor(
    public audio = new Audio(),
    ) {}

  init() {
    this.renderDice();
    this.serverDice();
    this.audio.currentTime = 0;
    this.audio.src = "../../assets/files/6f488185486f9cf.mp3";
  }

  serverDice() {
    socket.on("displayDiceState", (roll) => {
      this.roll(roll[0], roll[1]);
    });
  }

  renderDice() {
    const mainWrap = document.querySelector(".main__wrapper");
    const gameField = document.createElement("div");
    gameField.classList.add("game");
    gameField.setAttribute("id", "roll-dice");
    gameField.innerHTML = `
    <div class="dice__container dice__container_one">
          <div id='dice1' class="dice dice-one">
            <img class="dice__img" id="die-1">
            <div id="dice-one-side-one" class='side one'>
              <div class="dot one-1"></div>
            </div>
            <div id="dice-one-side-two" class='side two'>
              <div class="dot two-1"></div>
              <div class="dot two-2"></div>
            </div>
            <div id="dice-one-side-three" class='side three'>
              <div class="dot three-1"></div>
              <div class="dot three-2"></div>
              <div class="dot three-3"></div>
            </div>
            <div id="dice-one-side-four" class='side four'>
              <div class="dot four-1"></div>
              <div class="dot four-2"></div>
              <div class="dot four-3"></div>
              <div class="dot four-4"></div>
            </div>
            <div id="dice-one-side-five" class='side five'>
              <div class="dot five-1"></div>
              <div class="dot five-2"></div>
              <div class="dot five-3"></div>
              <div class="dot five-4"></div>
              <div class="dot five-5"></div>
            </div>
            <div id="dice-one-side-six" class='side six'>
              <div class="dot six-1"></div>
              <div class="dot six-2"></div>
              <div class="dot six-3"></div>
              <div class="dot six-4"></div>
              <div class="dot six-5"></div>
              <div class="dot six-6"></div>
            </div>
          </div>
        </div>
        <div class="dice__container dice__container_two">
          <div id='dice2' class="dice dice-two">
            <img class="dice__img" id="die-2">
            <div id="dice-two-side-one" class='side one'>
              <div class="dot one-1"></div>
            </div>
            <div id="dice-two-side-two" class='side two'>
              <div class="dot two-1"></div>
              <div class="dot two-2"></div>
            </div>
            <div id="dice-two-side-three" class='side three'>
              <div class="dot three-1"></div>
              <div class="dot three-2"></div>
              <div class="dot three-3"></div>
            </div>
            <div id="dice-two-side-four" class='side four'>
              <div class="dot four-1"></div>
              <div class="dot four-2"></div>
              <div class="dot four-3"></div>
              <div class="dot four-4"></div>
            </div>
            <div id="dice-two-side-five" class='side five'>
              <div class="dot five-1"></div>
              <div class="dot five-2"></div>
              <div class="dot five-3"></div>
              <div class="dot five-4"></div>
              <div class="dot five-5"></div>
            </div>
            <div id="dice-two-side-six" class='side six'>
              <div class="dot six-1"></div>
              <div class="dot six-2"></div>
              <div class="dot six-3"></div>
              <div class="dot six-4"></div>
              <div class="dot six-5"></div>
              <div class="dot six-6"></div>
            </div>
          </div>
        </div>
  `;
    mainWrap?.append(gameField);
  };

  randomDice() {
    const dieOneValue = Math.round(Math.random() * 5) +1;
    const dieTwoValue = Math.round(Math.random() * 5) +1;

    this.roll(dieOneValue, dieTwoValue);
    return [dieOneValue, dieTwoValue];
  }

  roll(random1: number, random2: number) {
    const images = [
      "../../assets/images/dice/dice-01.svg",
      "../../assets/images/dice/dice-02.svg",
      "../../assets/images/dice/dice-03.svg",
      "../../assets/images/dice/dice-04.svg",
      "../../assets/images/dice/dice-05.svg",
      "../../assets/images/dice/dice-06.svg",
    ];
    const sides = document.querySelectorAll(".side");
    const diceElements = document.querySelectorAll(".dice");
    diceElements.forEach(function (die) {
      die.classList.add("rolling");
    });
    sides.forEach((side) => {
      side.classList.remove("hidden");
    });

    setTimeout(() => {
      diceElements.forEach(function (die) {
        die.classList.remove("rolling");
      });
      sides.forEach((side) => {
        side.classList.add("hidden");
      });

      const dice1 = document.querySelector("#die-1");
      if (dice1) dice1.setAttribute("src", images[random1 - 1]);
      const dice2 = document.querySelector("#die-2");
      if (dice2) dice2.setAttribute("src", images[random2 - 1]);
    }, 1000);
  }

  randomDiceRoll() {
    const rollNums = this.randomDice();
    return rollNums;
  };

}
