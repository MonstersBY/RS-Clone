export default function roadCounter(map, player) {
  const allPathsLength = [] // Al paths leads to conflict 🐱‍🏍

  player.roads.forEach((road) => {
    allPathsLength.push( recursiveCounter(map, player.color, road, []).length );
  })

  return allPathsLength.sort((a, b) => b - a)[0];
}

function recursiveCounter(map, playerColor, id, initialChain = [], prevRoads = []) {
  /* Получаем карту, цвет игрока, id текущей дороги, цепь её предков и соседей ближайшего предка, чтобы не ходить кругами */
  if (initialChain.includes(id)) {
    return [] // dead end
  }
  const chain = [...initialChain];

  const hex = id.split("_")[0];
  const hode = "road_" + id.split("_")[2];

  if (map[hex][hode].player !== playerColor) { 
    return []; // dead end
  }
  // Отсекаем тупики и моменты когда наступаем себе на хвост, кладём дорогу в цепь
  chain.push(id);

  const nearNodes = map[hex][hode].nextNodes;
  const nearRoadsSet = new Set();

  for (let i = 0; i < nearNodes.length; i++) {
    const hex = nearNodes[i].split("_")[0];
    const settlementId = "settlement_" + nearNodes[i].split("_")[2];
    for (const node of map[hex][settlementId].nextNodes) {
      nearRoadsSet.add(node);
    }
  }
  // Находим ближайших соседей которые ведут в нужную сторону
  const nearRoadsToTransfer = [...nearRoadsSet];
  const nearRoadsToUse = []; 
  for (const node of prevRoads) {
    nearRoadsSet.delete(node);
  }
  nearRoadsToUse.push(...nearRoadsSet);
  // И высчитываем для них цепь
 const allPaths = [];
  nearRoadsToUse.forEach((road) => {
    const path = recursiveCounter(map, playerColor, road, chain, nearRoadsToTransfer);
    allPaths.push(path);
  })
  chain.push(...allPaths.sort((pathCurr, pathNext) => pathNext.length - pathCurr.length)[0]);

  return [...new Set(chain)];
}
