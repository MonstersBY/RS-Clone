import socket from "../Socket";
import { IPlayerInfo } from "../types/types";

export default class BuildHandler {
  constructor() {}

  addRoadPointer(player: IPlayerInfo, isFree = false) {
    const availablePlaces = [
      ...new Set(
        player?.avalible.filter((node: string) => node.split("_")[1] === "road")
      ),
    ];

    availablePlaces.forEach((id: string) => {
      const road = document.getElementById(id);
      if (road && !road.classList.contains("own")) {
        road.classList.add("select");
      }
    });

    document.getElementById("map")?.addEventListener(
      "click",
      (e: MouseEvent) => {
        if (
          e.target instanceof HTMLDivElement &&
          e.target.classList.contains("select")
        ) {
          const chousen = e.target as HTMLDivElement;

          socket.emit(
            "player:setRoad",
            player,
            chousen.id,
            localStorage.getItem("Room"),
            isFree
          );

          socket.emit(
            "map:renderHex",
            localStorage.getItem("Room"),
            Number(chousen.id.split("_")[0])
          );

          socket.emit("give-room-list-players", localStorage.getItem("Room"));

          new Audio("../../assets/files/Building_1.wav").play();
          this.#deleteClassOnAllNodes("select");

          let roadBuildedEvent = new CustomEvent("road-builded");
          document.dispatchEvent(roadBuildedEvent);
        }
      },
      { once: true }
    );
  }

  addSettlementPointer(player: IPlayerInfo) {
    const availablePlaces = [
      ...new Set(
        player.avalible.filter((node) => node.split("_")[1] === "settlement")
      ),
    ];

    availablePlaces.forEach((id: string) => {
      const settlement = document.getElementById(id);
      if (settlement && !settlement?.classList.contains("own")) {
        settlement.classList.add("select");
      }
    });

    document.getElementById("map")?.addEventListener(
      "click",
      (e: MouseEvent) => {
        if (
          e.target instanceof HTMLDivElement &&
          e.target.classList.contains("select")
        ) {
          const chousen = e.target as HTMLDivElement;

          new Audio("../../assets/files/BuildingComplete_1.wav").play();

          socket.emit(
            "player:setSettlement",
            player,
            chousen.id,
            localStorage.getItem("Room")
          );

          socket.emit(
            "map:renderHex",
            localStorage.getItem("Room"),
            Number(chousen.id.split("_")[0])
          );

          socket.emit("give-room-list-players", localStorage.getItem("Room"));

          const nearSettlementsSet = new Set();
          chousen.dataset.next?.split(",").forEach((roadId) => {
            const nearSettlementsIds = document
              .getElementById(roadId)
              ?.dataset.next?.split(",");
            nearSettlementsIds?.forEach((settlementId) => {
              nearSettlementsSet.add(settlementId);
            });
          });
          nearSettlementsSet.delete(chousen.id);

          const nearSettlementsList = [...nearSettlementsSet];
          nearSettlementsList.forEach((settlementId) => {
            const settlementNode = document.getElementById(
              settlementId as string
            );
            settlementNode?.classList.add("own");
            settlementNode?.classList.add("own_nobody");
          });

          this.#deleteClassOnAllNodes("select");
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
        if (
          e.target instanceof HTMLElement &&
          e.target.classList.contains("own")
        ) {
          const chousen = e.target as HTMLDivElement;

          socket.emit(
            "player:setCity",
            player,
            chousen.id,
            localStorage.getItem("Room")
          );

          socket.emit(
            "map:renderHex",
            localStorage.getItem("Room"),
            Number(chousen.id.split("_")[0])
          );

          socket.emit("give-room-list-players", localStorage.getItem("Room"));

          new Audio("../../assets/files/Upgrade_1.wav").play();
          this.#deleteClassOnAllNodes("ready-to-upgrade");
        }
      },
      { once: true }
    );
  }

  #deleteClassOnAllNodes = (className: string) => {
    document.querySelectorAll(className).forEach((element) => {
      element.classList.remove(className);
    });
  };
}
