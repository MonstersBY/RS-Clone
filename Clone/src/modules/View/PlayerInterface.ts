import { IPlayerInfo } from "../types/types";

export default class PlayerInterface {
  constructor(
    public players?: Array<IPlayerInfo>,
    ) {}

    getUIAsNodeTree(){
      return 0;
    }
}
