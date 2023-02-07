// Map
interface IHex {
  type: string,
  token: number,
  settlement_N: ISettlement | boolean,
  road_N: IRoad | boolean,
  road_W: IRoad | boolean,
  road_S: IRoad | boolean,
  settlement_S: ISettlement | boolean,
  robber: boolean,
  harbor: string | boolean,
}

interface ISettlement {
  id: string,
  player: string | boolean,
  city: boolean,
  nextHexes: Array<number>,
  nextNodes: Array<string>,
}

interface IRoad {
  id: string,
  player: string | boolean,
  nextNodes: Array<string>,
}

// Player
interface IPlayerInfo {
  id: number,
  longestRoad: boolean,
  largestArmy: boolean,

  hand: IPlayerHand,
  harbors: Array<string>,
  hexes: Array<number>,

  settlements: Array<string>,
  cities: Array<string>,
  roads:  Array<string>,

  roadChain: number,
  armySize: number,
}

interface IPlayerHand {
  resources: IResources,
  development: IDevCards,
}

interface IResources {
  brick: number,
  grain: number,
  lumber: number,
  ore: number,
  wool: number, 
}

interface IDevCards {
  victory: number,
  knights: number,
  road: number,
  plenty: number,
  monopoly: number,
}

function getElementBySelector<T extends HTMLElement>(
  selector: string,
  parent: HTMLElement | HTMLInputElement | DocumentFragment | Document = document
): T {
  const element: T | null = parent.querySelector(selector);
  if (element === null)
    throw new Error(`Could not find element with ${selector} selector`);
  return element;
}

export { IHex, IPlayerInfo, getElementBySelector}
