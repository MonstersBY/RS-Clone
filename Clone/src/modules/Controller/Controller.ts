import View from "../View/View";
import Room from "../../backend/Room";
// import Timer from "./Timer";
import GameMaster from "../../backend/GameMaster";
import { IPlayerInfo } from "../types/types";
import State from "../../backend/State/State";

export default class Controller {
  constructor(
    // public view?: View,
    public state?: State,
    // public room?: Room,
    public player1?: IPlayerInfo,
    // private timer: Timer = new Timer(),
    // private master: GameMaster = new GameMaster(),
    ) {}

    init() {
      // this.addAvaliableListener(this.player1 as IPlayerInfo);
      this.player1 = this.state?.playersInfo[0];
      this.addBuildSettlementListener();
      // this.addBuildSettlementListener();
    }

    addAvaliableListener(player: IPlayerInfo) {
      const mapContainer = document.querySelector("#map");
      mapContainer?.addEventListener("click", e => {
        if (e.target instanceof HTMLDivElement) {
          if (e.target.classList.contains("hex_node")) {
            if (e.target.classList.contains("active")) {
              player.avalible.push(...e.target.dataset.next?.split(",") as Array<string>);
            }
          }
        }
      })
    }

    addBuildSettlementListener() {
      document.querySelector(".hex_0")?.addEventListener("click", this.buildFirstSettlementMode.bind(this))
    }

    buildFirstSettlementMode() {
      const places = [...document.querySelectorAll(".hex__settlement_N"), ...document.querySelectorAll(".hex__settlement_S")];
      places.forEach((e) => {
        if (!e.classList.contains("own")) {
          e.classList.add("active");
        }
      })
      document.addEventListener("click", this.choosePlaceSettlement.bind(this));
    }

    choosePlaceSettlement(e: Event) {
      if (e.target instanceof HTMLDivElement && !e.target.classList.contains("own")) {
        if (e.target.classList.contains("hex__settlement_N") || e.target.classList.contains("hex__settlement_S")) {
          const chousen = e.target;
          document.removeEventListener("click", this.choosePlaceSettlement);

          const places = [...document.querySelectorAll(".hex__settlement_N"), ...document.querySelectorAll(".hex__settlement_S")];
          places.forEach((e) => {
            if (!e.classList.contains("own")) {
              e.classList.remove("active");
            }
          })
          this.state?.setNewSettlement(this.player1 as IPlayerInfo, chousen.id);
        }
      }
    }

    buildFirstRoadMode() {
      const places = this.player1?.avalible || [];
      places.forEach((e) => {
        // if (!e.classList.contains("own")) {
        //   e.classList.add("active");
        // }
      })
      
    }

    buildRoad(player: IPlayerInfo) {
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
