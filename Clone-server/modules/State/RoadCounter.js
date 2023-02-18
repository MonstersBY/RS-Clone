export default function roadCounter(map, playerColor, roadId) {
  let roadChainLength = 1;

  // Делаем список из всех достунпых (4х) веток идущих от основного узла дороги
  nearRoads = closestRoads(map, roadId);
  rootRoad = [];
  nearRoads.forEach((road) => {
    // В каждом элементе rootRoad на 0 позиции лежит список соседних первому элементу цепи узлов
    // На 1 позиции лежит сама цепь списком
    rootRoad.push( closestRoads(map, road), recursiveCounter(map, playerColor, road, [road]) );
  })
  // Для каждой цепи
  rootRoad.forEach((majorChain) => {
    // перебираем остальные
    rootRoad.forEach((minorChain) => {
      // Если они НЕ соседи - заходим внутрь
      if ( !majorChain[0].includes(minorChain[1][0]) ) {
        // Если они длиннее текущей длинны - меняем
        const bothLength = [...majorChain[1], ...minorChain[1]].length;
        roadChainLength = roadChainLength < bothLength ? bothLength : roadChainLength;
      }
    })
  })

  return roadChainLength;
}

function closestRoads(map, id) {
  // Берём конкретный узел в map
  const hex = id.split("_")[0];
  const hode = "road_" + id.split("_")[2];

  // Делаем список соседних узлов (поселения)
  const nearNodes = map[hex][hode].nextNodes;
  // Заводим пустой список для соседних дорог
  let nearRoads = [];

  // Кладём в список nearRoads ближайщие дороги
  for (let i = 0; i < nearNodes.length; i++) {
    const hex = nearNodes[i].split("_")[0];
    const settlementId = "settlement_" + nearNodes[i].split("_")[2];
    nearRoads.push(...map[hex][settlementId].nextNodes);
  }
  const nearRoadsSet = new Set(nearRoads);

  // Убираем изначальную дорогу
  nearRoadsSet.delete(id);
  nearRoads = [...nearRoadsSet];
  return nearRoads;
}


function recursiveCounter(map, playerColor, id, initialChain, prevRoads = []) {
  // Если узел уже в цепочке - это тупик
  if (initialChain.includes(id)) { return [];}
  const chain = initialChain;

  // Берём конкретный узел
  const hex = id.split("_")[0];
  const hode = "road_" + id.split("_")[2];

  // Если там нет дороги нужного цвета - это тупик
  if (map[hex][hode].player !== playerColor) { return []; }

  // Кладём его имя в цепочку
  chain.push(id);

  // Делаем список соседних узлов (поселения)
  const nearNodes = map[hex][hode].nextNodes;
  // Заводим пустой список для соседних дорог
  let nearRoads = [];

  // Кладём в список nearRoads ближайщие дороги
  for (let i = 0; i < nearNodes.length; i++) {
    const hex = nearNodes[i].split("_")[0];
    const settlementId = "settlement_" + nearNodes[i].split("_")[2];
    nearRoads.push(...map[hex][settlementId].nextNodes);
  }
  const nearRoadsSet = new Set(nearRoads);

  nearRoadsSet.delete(id);
  nearRoads = [...nearRoadsSet];

  // Если у нас была предидущая дорога
  if (prevRoads.length) {
    // Убираем из ближайших те, которые ведут в другую сторону
    nearRoads = nearRoads.filter(road => !prevRoads.includes(road))
  }
  prevRoads = nearRoads;

  let longest = 0;
  // Проходим по ответвлениям
  nearRoads.forEach((road) => {
    const path = calculateRoadChain(map, playerColor, road, chain, prevRoads);
    // Если длинна ветки больше 0 и других
    if (path.length > longest) {
      longest = path.length;
      // Берём эту ветку(список из id дорог)
      chain.push(...path);
    }
  })
  return chain; // возвращаем список из дорог текущей ветки
}
