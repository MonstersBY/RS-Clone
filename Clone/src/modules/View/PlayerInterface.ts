import { IPlayerInfo } from "../utils/types/types";

export default class PlayerInterface {
  constructor(
    public players?: Array<IPlayerInfo>,
    ) {}

    getUIAsNodeTree(){
      return 0;
    }
}