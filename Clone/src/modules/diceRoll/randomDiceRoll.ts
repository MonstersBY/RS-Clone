export const randomDiceRoll = () => {
  const images = [
    "../../assets/images/dice/dice-01.svg",
    "../../assets/images/dice/dice-02.svg",
    "../../assets/images/dice/dice-03.svg",
    "../../assets/images/dice/dice-04.svg",
    "../../assets/images/dice/dice-05.svg",
    "../../assets/images/dice/dice-06.svg",
  ];
  const gameField = document.querySelector(".game");
  const diceElements = document.querySelectorAll(".dice");

   const audio = new Audio();
    audio.currentTime = 0;
    audio.src = '../../assets/files/6f488185486f9cf.mp3';


  const randomDice = () => {
    const dieOneValue = Math.floor(Math.random() * 10);
    const dieTwoValue = Math.floor(Math.random() * 10);

    if ((dieOneValue >= 1 && dieOneValue <= 6) && (dieTwoValue >= 1 && dieTwoValue <= 6)) {
      roll(dieOneValue, dieTwoValue);
    } else {
      randomDice();
    }
  };

  function roll(random1: number, random2: number) {
    const sides = document.querySelectorAll(".side");
    diceElements.forEach(function (die) {
      die.classList.add("rolling");
    });
    sides.forEach((side) => {
      side.classList.remove("hidden");
    });

    setTimeout(function () {
      diceElements.forEach(function (die) {
        die.classList.remove("rolling");
      });
      sides.forEach((side) => {
        side.classList.add('hidden');
      })

      console.log(random1, random2);

      const die1 = document.querySelector("#die-1")
        if(die1) die1.setAttribute("src", images[random1-1]);
      const die2 = document.querySelector("#die-2")
        if(die2) die2.setAttribute("src", images[random2-1]);
    }, 1000);
  }
   gameField?.addEventListener("click", (e) => {
     const target = e.target as HTMLElement;
     if (target && target.closest(".dice__container")) {
       randomDice();
       audio.play();
     }
   });
  randomDice();
}



