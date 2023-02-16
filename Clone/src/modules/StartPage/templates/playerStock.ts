import { IPlayerInfo } from "../../types/types";


const playerStock = (player: IPlayerInfo) => {
  const gameBtnsWrap = document.querySelector(".game-btns__wrapper");

  const stockBtns = `
    <div class="game-btn flex-bs">
      <div id="build-road" class="player-stock__icon player-stock__road_${player.color}">
        <div class="player-stock__counter flex-bs road__counter">${player.roadsStock}</div>
      </div>
    </div>
    <div class="game-btn">
      <div id="build-settlement" class="player-stock__icon player-stock__settlement_${player.color}">
        <div class="player-stock__counter flex-bs settlement__counter">${player.settlementsStock}</div>
      </div>
    </div>
    <div class="game-btn">
      <div id="build-city" class="player-stock__icon player-stock__city_${player.color}">
        <div class="player-stock__counter flex-bs city__counter">${player.cityStock}</div>
      </div>
    </div>
  `;

  if(gameBtnsWrap) gameBtnsWrap.insertAdjacentHTML("afterbegin", stockBtns)
}