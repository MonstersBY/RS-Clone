export const helperNode = `
  <div class="helper__wrapper hidden"></div>
  <button class="helper___button btn">?</button>
  <div class="helper__body hidden">
    <p>The game is designed for 2-4 players</p>
    <h5 class="helper__title">The goal of the game</h5>
    <p>You need to score 10 victory points (VP). The first player to do so is the winner and the game ends. Players receive points:</p>
      <ul>
        <li class="helper__li">1 point for each settlement;</li>
        <li class="helper__li">2 points for each city;</li>
        <li class="helper__li">2 points for "The longest path";</li>
        <li class="helper__li">2 points for "The largest army";</li>
        <li class="helper__li">1 point per victory point card (5 total);</li>
      </ul>
    <h5 class="helper__title">Field</h5>
    <p>The playing field consists of hexes: hills, forests, mountains, fields, pastures, desert, surrounded by the sea. They can be laid out randomly, or you can choose a layout.</p>
    <p>Numbers are randomly placed on resource hexes. Every time a hexa number is rolled, it brings resources to all adjacent settlements. The desert brings nothing.</p>
    <p>There are harbors along the coast. A player who has built a settlement near the harbor can exchange resources at a specified, more favorable rate.</p>

    <h5 class="helper__title">Foundation stage</h5>
    <p>Everyone gets a color and gets a figurine: 4 cities, 5 settlements, 15 roads.</p>
    <p>Starting with the first player, everyone places 1 settlement and a road next to it. After the last player has placed his settlement and road, the cycle repeats from him. As a result, each puts 2 settlements and 2 roads.</p>
    <p>Settlements can be placed no closer than two roads from each other - this rule is valid for the entire game.</p>
    <p>Once all settlements have been placed, players receive resources from the hexes adjacent to the last settlement they placed.</p>

    <h5 class="helper__title">Player turn</h5>
      <ul>
        <li>
          <h6 class="helper__subtitle">Dice roll</h6>
          <p>First, the player rolls two dice. Hexes with the same number of dice bring 1 resource card to all adjacent settlements. For cities - 2 cards.</p>
          <p>If the sum of the dice is 7, the rogue is played.
            If at the same time someone has more than 7 resource cards in his hand, he will discard half, rounding down.
            The player who rolled a 7 moves the rogue to any hex, blocking it. While the rogue is on the hex, he does not bring resources.
            Also, the active player takes 1 resource card from the hand of any player whose settlement / city is adjacent to the hex occupied by the robber.</p>
        </li>

        <li>
          <h6 class="helper__subtitle">Trade</h6>
          <p>Each player in his turn can change 4 identical resources for another without the participation of players. If he has a settlement near the harbor, he can exchange resources at the rate indicated on the harbor.</p>
        </li>

        <li>
          <h6 class="helper__subtitle">Construction</h6>
          <p>On your turn, if you have the necessary resources, you can build:</p>
            <ul>
              <li class="helper__li">
                <b>road (requires 1 lumber, and 1 brick)</b>
                <p>Roads can be built from settlements or as extensions of one's own roads. Can be used to block the development of other players The first player to build a tract of 5 roads (roads without branching counts) gets the card "Longest tract". Now the other to get this card needs to build a tract of 1 the road is longer</p>
              </li>
              <li class="helper__li">
                <b>settlement (requires 1 lumber, 1 brick, 1 wool, 1 grain)</b>
                <p>Settlements must be separated by at least two roads Settlement also provides resources from surrounding hexes, 1 VP It can be upgraded to a city</p>
              </li>
              <li class="helper__li">
                <b>city (requires 2 grain, 3 ores)</b>
                <p>The city gives 2 VP and 2 resource cards from the hex</p>
              </li>
            </ul>
        </li>
        <li>
          <h6 class="helper__subtitle">Development cards</h6>
          <p>You can also buy a development card for 1 wool, 1 grain and 1 ore. There are 25 cards in total. They don't replenish. They consist of:</p>
            <ul>
              <li class="helper__li">
                <b>14 knights</b>
                <p>When a player plays a knight card, he moves a rogue to any hex and takes 1 resource from any player whose settlement is adjacent to that hex. After that, the played card remains with the player. The first player to play 3 knight cards receives the “Largest Army” card. Now the other player needs to play 1 more knight to receive this card</p>
              </li>
              <li class="helper__li">
                <b>5 victory point cards</b>
                <p>Adds 1 VP to the total points. Other players do not know about the increase</p>
              </li>

              <li class="helper__li">
                <b>6 breakthrough cards</b>
                <ul>
                  <li class="helper__li">
                    <b>2 road construction cards</b>
                    <p>Allows you to build two roads for free</p>
                  </li>
                  <li class="helper__li">
                    <b>2 invention cards</b>
                    <p>Allows you to take any 2 resource cards for free</p>
                  </li>
                  <li class="helper__li">
                    <b>2 monopoly cards</b>
                    <p>By playing this card, the player takes any one type of resource from the others from their hand.</p>
                  </li>
                </ul>
              </li>

            </ul>
        </li>
      </ul>
    </div>
`;

export const addHelper = () => {
  if (window.location.pathname === "/game") {
    const gameMenuWrap = document.getElementById("game-menu__wrap");
    gameMenuWrap?.insertAdjacentHTML("beforeend", helperNode);
  } else {
    const logoWrap = document.querySelector(".logo__wrap");
    logoWrap?.insertAdjacentHTML("beforeend", helperNode);
  }

  const helperWrapper = document.querySelector(".helper__wrapper");
  const helperBtn = document.querySelector(".helper___button");
  const helperBody = document.querySelector(".helper__body");

  document.addEventListener("click", (e) => {
    if (e.target === helperBtn) {
      helperBody?.classList.toggle("hidden");
      helperBody?.classList.toggle("moveDown");
      helperWrapper?.classList.toggle("hidden");
      helperWrapper?.classList.toggle("moveDown");
    }
    if (e.target === helperWrapper) {
      helperBody?.classList.add("hidden");
      helperBody?.classList.toggle("moveDown");
      helperWrapper?.classList.add("hidden");
      helperWrapper?.classList.toggle("moveDown");
    }
  })
}
