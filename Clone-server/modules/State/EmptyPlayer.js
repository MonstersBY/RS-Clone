export const getEmptyPlayer = () => {
  return {
    name: '',
    color: '',
    longestRoad: false,
    largestArmy: false,

    hand: {
      resources: {
        brick: 10,
        grain: 10,
        lumber: 10,
        ore: 10,
        wool: 10,
      },
      development: {
        victory: 0,
        knights: 0,
        road: 0,
        plenty: 0,
        monopoly: 0,
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
