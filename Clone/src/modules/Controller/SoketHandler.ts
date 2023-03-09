import socket from "../Socket";
import { IPlayerInfo } from "../types/types";

export default class SocketHandler {
  constructor() {}

  setRoad(player: IPlayerInfo, id: number, isFree: boolean) {
    socket.emit(
      "player:setRoad",
      localStorage.getItem("Room"),
      player,
      id,
      isFree
    );
  }

  setSettlement(player: IPlayerInfo, id: number) {
    socket.emit(
      "player:setSettlement",
      localStorage.getItem("Room"),
      player,
      id
    );
  }

  setCity(player: IPlayerInfo, id: string) {
    socket.emit("player:setCity", localStorage.getItem("Room"), player, id);
  }

  renderHex(id: number) {
    socket.emit("map:renderHex", localStorage.getItem("Room"), id);
  }

  giveRoomListPlayers() {
    socket.emit("give-room-list-players", localStorage.getItem("Room"));
  }
}
