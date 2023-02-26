export default function roadCounter(map, player) {
  const allPathsLength = [] // Al paths leads to conflict 🐱‍🏍

  // console.log(player.color, "имеет такие дороги: ", player.roads);
  player.roads.forEach((road) => {
    allPathsLength.push( recursiveCounter(map, player.color, road, []).length );
  })

  // console.log("Вот список из всех дорог: ", allPathsLength.sort((a, b) => b - a));
  return allPathsLength.sort((a, b) => b - a)[0];
}

function recursiveCounter(map, playerColor, id, initialChain = [], prevRoads = [], n = 0) {
  // console.log(" ".repeat(n),"_________________________________________")
  // console.log(" ".repeat(n),"Я дорога:", id);
  // Если узел уже в цепочке - это тупик
  if (initialChain.includes(id)) {
    // console.log(" ".repeat(n), "eat my tail")
    // console.log(" ".repeat(n),"_________________________________________")
    return []
  }
  const chain = [...initialChain];

  // Берём конкретный узел
  const hex = id.split("_")[0];
  const hode = "road_" + id.split("_")[2];

  // Если там нет дороги нужного цвета - это тупик
  if (map[hex][hode].player !== playerColor) { 
    // console.log(" ".repeat(n), "dead end")
    // console.log(" ".repeat(n),"_________________________________________")
    return [];
  }

  // Кладём его имя в цепочку
  chain.push(id);
  // console.log(" ".repeat(n), "Моя цепь:", chain);

  // Делаем список соседних узлов (поселения)
  const nearNodes = map[hex][hode].nextNodes;
  // Заводим пустой список для соседних дорог
  const nearRoadsSet = new Set();

  // Кладём в set nearRoads ближайщие дороги
  for (let i = 0; i < nearNodes.length; i++) {
    const hex = nearNodes[i].split("_")[0];
    const settlementId = "settlement_" + nearNodes[i].split("_")[2];
    for (const node of map[hex][settlementId].nextNodes) {
      nearRoadsSet.add(node);
    }
  }

  // Эти ближайшие дороги передадим следующему узлу чтобы он шёл правильно
  const nearRoadsToTransfer = [...nearRoadsSet];

  // А проверять будем тех соседей, которых не было у предыдущего узла
  const nearRoadsToUse = []; 
  // Поэтому удаляем из set дороги которые были у родителя
  for (const node of prevRoads) {
    nearRoadsSet.delete(node);
  }
  // // И удаляем из него текущую дорогу
  // nearRoadsSet.delete(id);
  // Кладём это всё в array
  nearRoadsToUse.push(...nearRoadsSet);

  // Добавляем в предидущие дороги текущих соседей, чтобы следующие пошли в правильную сторону
  // prevRoads.push(...nearRoads);
  // prevRoads.push(id);
  // console.log(" ".repeat(n), "Я проверю:", nearRoadsToUse);

 const allPaths = [];
  // Проходим по ответвлениям
  nearRoadsToUse.forEach((road) => {
    // console.log("NEW: ", road);
    const path = recursiveCounter(map, playerColor, road, chain, nearRoadsToTransfer, n + 4);
    // console.log(" ".repeat(n), "Вот путь от меня:", path)
    // Если длинна ветки больше 0 и других
    // console.log(" ".repeat(n), "моя текущая длинна: ", path.length);
    allPaths.push(path);
  })
  // console.log(" ".repeat(n), "Вот все пути:", allPaths.sort((pathCurr, pathNext) => pathCurr.length - pathNext.length))
  chain.push(...allPaths.sort((pathCurr, pathNext) => pathNext.length - pathCurr.length)[0]);

  // console.log(" ".repeat(n), "Я возвращаю:", [...new Set(chain)]);
  // console.log(" ".repeat(n),"_________________________________________")
  return [...new Set(chain)]; // возвращаем список из дорог текущей ветки без совпадений
}
