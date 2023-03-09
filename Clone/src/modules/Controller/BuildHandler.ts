import { IPlayerInfo } from "../types/types";
import SocketHandler from "./SoketHandler";

export default class BuildHandler {
  constructor(public socket: SocketHandler) {}

  addRoadPointer(player: IPlayerInfo, isFree = false) {
    this.#markAvalibleNodesOf(player, "road");

    document.getElementById("map")?.addEventListener(
      "click",
      (e: MouseEvent) => {
        if (this.#isDivHaveClass(e.target, "select")) {
          const chousen = e.target as HTMLDivElement;

          this.socket.setRoad(player, Number(chousen.id), isFree);
          this.socket.renderHex(Number(chousen.id.split("_")[0]));
          this.socket.giveRoomListPlayers();

          this.#deleteClassOnAllNodes("select");
          new Audio("../../assets/files/Building_1.wav").play();

          let roadBuildedEvent = new CustomEvent("road-builded");
          document.dispatchEvent(roadBuildedEvent);
        }
      },
      { once: true }
    );
  }

  addSettlementPointer(player: IPlayerInfo) {
    this.#markAvalibleNodesOf(player, "settlement");

    document.getElementById("map")?.addEventListener(
      "click",
      (e: MouseEvent) => {
        if (this.#isDivHaveClass(e.target, "select")) {
          const chousen = e.target as HTMLDivElement;

          this.socket.setSettlement(player, Number(chousen.id));
          this.socket.renderHex(Number(chousen.id.split("_")[0]));
          this.socket.giveRoomListPlayers();

          this.#blockNearSettlements(chousen);
          this.#deleteClassOnAllNodes("select");
          new Audio("../../assets/files/BuildingComplete_1.wav").play();
        }
      },
      { once: true }
    );
  }

  addCityPointer(player: IPlayerInfo) {
    const playerSettlements = player.settlements as Array<string>;

    playerSettlements.forEach((id: string) => {
      document.getElementById(id)?.classList.add("ready-to-upgrade");
    });

    document.getElementById("map")?.addEventListener(
      "click",
      (e: MouseEvent) => {
        if (this.#isDivHaveClass(e.target, "ready-to-upgrade")) {
          const chousen = e.target as HTMLDivElement;

          this.socket.setCity(player, chousen.id);
          this.socket.renderHex(Number(chousen.id.split("_")[0]));
          this.socket.giveRoomListPlayers();

          this.#deleteClassOnAllNodes("ready-to-upgrade");
          new Audio("../../assets/files/Upgrade_1.wav").play();
        }
      },
      { once: true }
    );
  }

  #isDivHaveClass(target: EventTarget | null, className: string) {
    return (
      target instanceof HTMLDivElement && target.classList.contains(className)
    );
  }

  #markAvalibleNodesOf(player: IPlayerInfo, type: string) {
    const availablePlaces = [
      ...new Set(
        player?.avalible.filter((node: string) => node.split("_")[1] === type)
      ),
    ];

    availablePlaces.forEach((id: string) => {
      const node = document.getElementById(id);
      if (node && !node.classList.contains("own")) {
        node.classList.add("select");
      }
    });
  }

  #blockNearSettlements(node: HTMLDivElement) {
    const nearSettlementsSet = new Set();
    node.dataset.next?.split(",").forEach((roadId) => {
      const nearSettlementsIds = document
        .getElementById(roadId)
        ?.dataset.next?.split(",");
      nearSettlementsIds?.forEach((settlementId) => {
        nearSettlementsSet.add(settlementId);
      });
    });
    nearSettlementsSet.delete(node.id);

    const nearSettlementsList = [...nearSettlementsSet];
    nearSettlementsList.forEach((settlementId) => {
      const settlementNode = document.getElementById(settlementId as string);
      settlementNode?.classList.add("own");
      settlementNode?.classList.add("own_nobody");
    });
  }

  #deleteClassOnAllNodes = (className: string) => {
    document.querySelectorAll(className).forEach((element) => {
      element.classList.remove(className);
    });
  };
}
