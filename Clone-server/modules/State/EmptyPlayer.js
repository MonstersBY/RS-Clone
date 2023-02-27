export const getEmptyPlayer = () => {
  return {
    name: '',
    color: '',
    longestRoad: false,
    largestArmy: false,

    hand: {
      resources: {
        brick: 100,
        grain: 100,
        lumber: 100,
        ore: 100,
        wool: 100,
      },
      development: {
        victory: 1,
        knights: 1,
        road: 1,
        plenty: 1,
        monopoly: 1,
      },
    },
    harbors: [],
    hexes: [],
    avalible: [],

    settlements: [],
    cities: [],
    roads: [],
    settlementsStock: 5,
    citiesStock: 4,
    roadsStock: 15,

    roadChain: 0,
    armySize: 0,
  }
};
