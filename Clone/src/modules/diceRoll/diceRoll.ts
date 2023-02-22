// import { randomDiceRoll } from './randomDiceRoll'

export default class Dice {
  constructor(
    public audio = new Audio(),
    ) {}

  init() {
    this.renderDice();
    this.audio.currentTime = 0;
    this.audio.src = "../../assets/files/6f488185486f9cf.mp3";
    // this.randomDiceRoll
  }

  renderDice = () => {
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

  randomDiceRoll = () => {
    const images = [
      "../../assets/images/dice/dice-01.svg",
      "../../assets/images/dice/dice-02.svg",
      "../../assets/images/dice/dice-03.svg",
      "../../assets/images/dice/dice-04.svg",
      "../../assets/images/dice/dice-05.svg",
      "../../assets/images/dice/dice-06.svg",
    ];
    const diceElements = document.querySelectorAll(".dice");

    /* const audio = new Audio();
    audio.currentTime = 0;
    audio.src = "../../assets/files/6f488185486f9cf.mp3"; */

    function randomDice() {
      // Маргарита говорила  Math.round(Math.random() * 10)
      const dieOneValue = Math.round(Math.random() * 5) +1;
      const dieTwoValue = Math.round(Math.random() * 5) +1;

      console.log(`2ROLL: ${dieOneValue} - ${dieTwoValue}`)
      roll(dieOneValue, dieTwoValue);

      return [dieOneValue, dieTwoValue];
      // console.log({dieOneValue, dieTwoValue})
      // if (
      //   dieOneValue >= 1 &&
      //   dieOneValue <= 6 &&
      //   dieTwoValue >= 1 &&
      //   dieTwoValue <= 6
      // ) {

      // } else {
      //   randomDice();
      // }
    }

    function roll(random1: number, random2: number) {
      const sides = document.querySelectorAll(".side");
      diceElements.forEach(function (die) {
        die.classList.add("rolling");
      });
      sides.forEach((side) => {
        side.classList.remove("hidden");
      });

      // console.log({ random1, random2 });
      setTimeout(function () {
        diceElements.forEach(function (die) {
          die.classList.remove("rolling");
        });
        sides.forEach((side) => {
          side.classList.add("hidden");
        });

        const die1 = document.querySelector("#die-1");
        if (die1) die1.setAttribute("src", images[random1 - 1]);
        const die2 = document.querySelector("#die-2");
        if (die2) die2.setAttribute("src", images[random2 - 1]);
      }, 1000);
    }


     const rollNums = randomDice();
     return rollNums;
   /*  gameField?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target && target.closest(".dice__container")) {
        randomDice();
        audio.play();
      }
    }); */
    
  };
}


/* export const diceRoll = () => {
  renderDice();
  randomDiceRoll();
} */
