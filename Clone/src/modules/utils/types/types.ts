// Map
interface IHex {
  type: string,
  token: number,
  settlement_N: ISettlement,
  road_N: number,
  road_W: number,
  road_S: number,
  settlement_S: ISettlement,
  robber: boolean,
}

interface ISettlement {
  player: number,
  type: string,
}

// Player
interface IPlayerInfo {
  id: number,
  hand: IPlayerHand,
  settlements: IPlayerSettlements,
  harbors: IPlayerHarbors,
  roads: IPlayerRoads,
  army: number,
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
  breakthrough: {
    road: number,
    plenty: number,
    monopoly: number,
  }
}

interface IPlayerSettlements {
  [settlement: number]: {
    isCity: boolean,
    adjacent: [number, number, number],
  }
}

interface IPlayerRoads {
  [road: number]: {
    adjacent: [number, number],
  }
}

interface IPlayerHarbors {
  all: boolean,
  brick: boolean,
  grain: boolean,
  lumber: boolean,
  ore: boolean,
  wool: boolean, 
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
