const newbieMap = [
  // 0 line
  {// 0
    type: "harbor",
    token: 0,
    settlement_N: false,
    road_N: false,
    road_W: false,
    road_S: false,
    settlement_S: {
      id: "0_settlement_S",
      player: false,
      city: false,
      nextHexes: [5],
      nextNodes: ["5_road_N", "5_road_W"],
    },
    robber: false,
    harbor: "all",
  },
  {// 1
    type: "sea",
    token: 0,
    settlement_N: false,
    road_N: false,
    road_W: false,
    road_S: {
      id: "1_road_S",
      player: false,
      nextNodes: ["5_settlement_N", "1_settlement_S"],
    },
    settlement_S: {
      id: "1_settlement_S",
      player: false,
      city: false,
      nextHexes: [5, 6],
      nextNodes: ["1_road_S", "6_road_N", "6_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {// 2
    type: "harbor",
    token: 0,
    settlement_N: false,
    road_N: false,
    road_W: false,
    road_S: {
      id: "2_road_S",
      player: false,
      nextNodes: ["6_settlement_N", "2_settlement_S"],
    },
    settlement_S: {
      id: "2_settlement_S",
      player: false,
      city: false,
      nextHexes: [6, 7],
      nextNodes: ["2_road_S", "7_road_N", "7_road_W"],
    },
    robber: false,
    harbor: "grain",
  },
  {//3
    type: "sea",
    token: 0,
    settlement_N: false,
    road_N: false,
    road_W: false,
    road_S: {
      id: "3_road_S",
      player: false,
      nextNodes: ["7_settlement_N", "3_settlement_S"],
    },
    settlement_S: {
      id: "3_settlement_S",
      player: false,
      city: false,
      nextHexes: [7],
      nextNodes: ["3_road_S", "8_road_W"],
    },
    robber: false,
    harbor: false,
  },
  // 1 line
  {//4
    type: "sea",
    token: 0,
    settlement_N: false,
    road_N: false,
    road_W: false,
    road_S: false,
    settlement_S: {
      id: "4_settlement_S",
      player: false,
      city: false,
      nextHexes: [10],
      nextNodes: ["10_road_N", "10_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//5
    type: "mountains",
    token: 10,
    settlement_N: {
      id: "5_settlement_N",
      player: false,
      city: false,
      nextHexes: [5],
      nextNodes: ["5_road_N", "1_road_S"],
    },
    road_N: {
      id: "5_road_N",
      player: false,
      nextNodes: ["5_settlement_N", "0_settlement_S"],
    },
    road_W: {
      id: "5_road_W",
      player: false,
      nextNodes: ["0_settlement_S", "10_settlement_N"],
    },
    road_S: {
      id: "5_road_S",
      player: false,
      nextNodes: ["10_settlement_N", "5_settlement_S"],
    },
    settlement_S: {
      id: "5_settlement_S",
      player: false,
      city: false,
      nextHexes: [5, 10, 11],
      nextNodes: ["5_road_S", "11_road_N", "11_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//6
    type: "pasture",
    token: 2,
    settlement_N: {
      id: "6_settlement_N",
      player: false,
      city: false,
      nextHexes: [6],
      nextNodes: ["6_road_N", "2_road_S"],
    },
    road_N: {
      id: "6_road_N",
      player: false,
      nextNodes: ["6_settlement_N", "1_settlement_S"],
    },
    road_W: {
      id: "6_road_W",
      player: false,
      nextNodes: ["1_settlement_S", "11_settlement_N"],
    },
    road_S: {
      id: "6_road_S",
      player: false,
      nextNodes: ["11_settlement_N", "6_settlement_S"],
    },
    settlement_S: {
      id: "6_settlement_S",
      player: false,
      city: false,
      nextHexes: [6, 11, 12],
      nextNodes: ["6_road_S", "12_road_N", "12_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//7
    type: "forest",
    token: 9,
    settlement_N: {
      id: "7_settlement_N",
      player: false,
      city: false,
      nextHexes: [6],
      nextNodes: ["7_road_N", "3_road_S"],
    },
    road_N: {
      id: "7_road_N",
      player: false,
      nextNodes: ["7_settlement_N", "2_settlement_S"],
    },
    road_W: {
      id: "7_road_W",
      player: false,
      nextNodes: ["2_settlement_S", "12_settlement_N"],
    },
    road_S: {
      id: "7_road_S",
      player: false,
      nextNodes: ["12_settlement_N", "7_settlement_S"],
    },
    settlement_S: {
      id: "7_settlement_S",
      player: false,
      city: false,
      nextHexes: [7, 12, 13],
      nextNodes: ["7_road_S", "13_road_N", "13_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//8
    type: "harbor",
    token: 0,
    settlement_N: false,
    road_N: false,
    road_W: {
      id: "8_road_W",
      player: false,
      nextNodes: ["3_settlement_S", "13_settlement_N"],
    },
    road_S: {
      id: "8_road_S",
      player: false,
      nextNodes: ["13_settlement_N", "8_settlement_S"],
    },
    settlement_S: {
      id: "8_settlement_S",
      player: false,
      city: false,
      nextHexes: [13],
      nextNodes: ["8_road_S", "14_road_W"],
    },
    robber: false,
    harbor: "ore",
  },
  // 2 line
  {//9
    type: "harbor",
    token: 0,
    settlement_N: false,
    road_N: false,
    road_W: false,
    road_S: false,
    settlement_S: {
      id: "9_settlement_S",
      player: false,
      city: false,
      nextHexes: [16],
      nextNodes: ["16_road_N", "16_road_W"],
    },
    robber: false,
    harbor: "lumber",
  },
  {//10
    type: "fields",
    token: 12,
    settlement_N: {
      id: "10_settlement_N",
      player: false,
      city: false,
      nextHexes: [6, 10],
      nextNodes: ["10_road_N", "5_road_W", "5_road_S"],
    },
    road_N: {
      id: "10_road_N",
      player: false,
      nextNodes: ["10_settlement_N", "4_settlement_S"],
    },
    road_W: {
      id: "10_road_W",
      player: false,
      nextNodes: ["4_settlement_S", "16_settlement_N"],
    },
    road_S: {
      id: "10_road_S",
      player: false,
      nextNodes: ["16_settlement_N", "10_settlement_S"],
    },
    settlement_S: {
      id: "10_settlement_S",
      player: false,
      city: false,
      nextHexes: [10, 16, 17],
      nextNodes: ["10_road_S", "17_road_N", "17_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//11
    type: "hills",
    token: 6,
    settlement_N: {
      id: "11_settlement_N",
      player: false,
      city: false,
      nextHexes: [6],
      nextNodes: ["11_road_N", "6_road_W", "6_road_S"],
    },
    road_N: {
      id: "11_road_N",
      player: false,
      nextNodes: ["11_settlement_N", "5_settlement_S"],
    },
    road_W: {
      id: "11_road_W",
      player: false,
      nextNodes: ["5_settlement_S", "17_settlement_N"],
    },
    road_S: {
      id: "11_road_S",
      player: false,
      nextNodes: ["17_settlement_N", "11_settlement_S"],
    },
    settlement_S: {
      id: "11_settlement_S",
      player: false,
      city: false,
      nextHexes: [11, 16, 17],
      nextNodes: ["11_road_S", "18_road_N", "18_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//12
    type: "pasture",
    token: 4,
    settlement_N: {
      id: "12_settlement_N",
      player: false,
      city: false,
      nextHexes: [6],
      nextNodes: ["12_road_N", "7_road_W", "7_road_S"],
    },
    road_N: {
      id: "12_road_N",
      player: false,
      nextNodes: ["12_settlement_N", "6_settlement_S"],
    },
    road_W: {
      id: "12_road_W",
      player: false,
      nextNodes: ["6_settlement_S", "18_settlement_N"],
    },
    road_S: {
      id: "12_road_S",
      player: false,
      nextNodes: ["18_settlement_N", "12_settlement_S"],
    },
    settlement_S: {
      id: "12_settlement_S",
      player: false,
      city: false,
      nextHexes: [12, 18, 19],
      nextNodes: ["12_road_S", "19_road_N", "19_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//13
    type: "hills",
    token: 10,
    settlement_N: {
      id: "13_settlement_N",
      player: false,
      city: false,
      nextHexes: [6],
      nextNodes: ["13_road_N", "8_road_W", "8_road_S"],
    },
    road_N: {
      id: "13_road_N",
      player: false,
      nextNodes: ["13_settlement_N", "7_settlement_S"],
    },
    road_W: {
      id: "13_road_W",
      player: false,
      nextNodes: ["7_settlement_S", "19_settlement_N"],
    },
    road_S: {
      id: "13_road_S",
      player: false,
      nextNodes: ["19_settlement_N", "13_settlement_S"],
    },
    settlement_S: {
      id: "13_settlement_S",
      player: false,
      city: false,
      nextHexes: [13, 18, 19],
      nextNodes: ["13_road_S", "20_road_N", "20_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//14
    type: "sea",
    token: 0,
    settlement_N: false,
    road_N: false,
    road_W: {
      id: "14_road_W",
      player: false,
      nextNodes: ["8_settlement_S", "20_settlement_N"],
    },
    road_S: {
      id: "14_road_S",
      player: false,
      nextNodes: ["20_settlement_N", "14_settlement_S"],
    },
    settlement_S: {
      id: "14_settlement_S",
      player: false,
      city: false,
      nextHexes: [20],
      nextNodes: ["14_road_S", "21_road_W"],
    },
    robber: false,
    harbor: false,
  },
  // 3 line
  {//15
    type: "sea",
    token: 0,
    settlement_N: false,
    road_N: false,
    road_W: false,
    road_S: false,
    settlement_S: false,
    robber: false,
    harbor: false,
  },
  {//16
    type: "fields",
    token: 9,
    settlement_N: {
      id: "16_settlement_N",
      player: false,
      city: false,
      nextHexes: [10, 16],
      nextNodes: ["16_road_N", "10_road_W", "10_road_S"],
    },
    road_N: {
      id: "16_road_N",
      player: false,
      nextNodes: ["16_settlement_N", "9_settlement_S"],
    },
    road_W: {
      id: "16_road_W",
      player: false,
      nextNodes: ["9_settlement_S", "22_settlement_N"],
    },
    road_S: {
      id: "16_road_S",
      player: false,
      nextNodes: ["22_settlement_N", "16_settlement_S"],
    },
    settlement_S: {
      id: "16_settlement_S",
      player: false,
      city: false,
      nextHexes: [16, 23],
      nextNodes: ["16_road_S", "23_road_N", "23_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//17
    type: "forest",
    token: 11,
    settlement_N: {
      id: "17_settlement_N",
      player: false,
      city: false,
      nextHexes: [10, 11, 17],
      nextNodes: ["17_road_N", "11_road_W", "11_road_S"],
    },
    road_N: {
      id: "17_road_N",
      player: false,
      nextNodes: ["17_settlement_N", "10_settlement_S"],
    },
    road_W: {
      id: "17_road_W",
      player: false,
      nextNodes: ["10_settlement_S", "23_settlement_N"],
    },
    road_S: {
      id: "17_road_S",
      player: false,
      nextNodes: ["23_settlement_N", "17_settlement_S"],
    },
    settlement_S: {
      id: "17_settlement_S",
      player: false,
      city: false,
      nextHexes: [17, 23, 24],
      nextNodes: ["17_road_S", "24_road_N", "24_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//18
    type: "desert",
    token: 0,
    settlement_N: {
      id: "18_settlement_N",
      player: false,
      city: false,
      nextHexes: [11, 12, 18],
      nextNodes: ["18_road_N", "12_road_W", "12_road_S"],
    },
    road_N: {
      id: "18_road_N",
      player: false,
      nextNodes: ["18_settlement_N", "11_settlement_S"],
    },
    road_W: {
      id: "18_road_W",
      player: false,
      nextNodes: ["11_settlement_S", "24_settlement_N"],
    },
    road_S: {
      id: "18_road_S",
      player: false,
      nextNodes: ["24_settlement_N", "18_settlement_S"],
    },
    settlement_S: {
      id: "18_settlement_S",
      player: false,
      city: false,
      nextHexes: [18, 24, 25],
      nextNodes: ["18_road_S", "25_road_N", "25_road_W"],
    },
    robber: true,
    harbor: false,
  },
  {//19
    type: "forest",
    token: 3,
    settlement_N: {
      id: "19_settlement_N",
      player: false,
      city: false,
      nextHexes: [12, 13, 19],
      nextNodes: ["19_road_N", "13_road_W", "13_road_S"],
    },
    road_N: {
      id: "19_road_N",
      player: false,
      nextNodes: ["19_settlement_N", "12_settlement_S"],
    },
    road_W: {
      id: "19_road_W",
      player: false,
      nextNodes: ["12_settlement_S", "25_settlement_N"],
    },
    road_S: {
      id: "19_road_S",
      player: false,
      nextNodes: ["25_settlement_N", "19_settlement_S"],
    },
    settlement_S: {
      id: "19_settlement_S",
      player: false,
      city: false,
      nextHexes: [19, 25, 26],
      nextNodes: ["19_road_S", "26_road_N", "26_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//20
    type: "mountains",
    token: 8,
    settlement_N: {
      id: "20_settlement_N",
      player: false,
      city: false,
      nextHexes: [13, 20],
      nextNodes: ["20_road_N", "14_road_W", "14_road_S"],
    },
    road_N: {
      id: "20_road_N",
      player: false,
      nextNodes: ["20_settlement_N", "13_settlement_S"],
    },
    road_W: {
      id: "20_road_W",
      player: false,
      nextNodes: ["13_settlement_S", "26_settlement_N"],
    },
    road_S: {
      id: "20_road_S",
      player: false,
      nextNodes: ["26_settlement_N", "20_settlement_S"],
    },
    settlement_S: {
      id: "20_settlement_S",
      player: false,
      city: false,
      nextHexes: [20, 26],
      nextNodes: ["20_road_S", "27_road_N", "27_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//21
    type: "harbor",
    token: 0,
    settlement_N: false,
    road_N: false,
    road_W: {
      id: "21_road_W",
      player: false,
      nextNodes: ["14_settlement_S", "27_settlement_N"],
    },
    road_S: false,
    settlement_S: false,
    robber: false,
    harbor: "all",
  },
  // 4 line
  {//22
    type: "harbor",
    token: 0,
    settlement_N: {
      id: "21_settlement_N",
      player: false,
      city: false,
      nextHexes: [16],
      nextNodes: ["16_road_W", "16_road_S"],
    },
    road_N: false,
    road_W: false,
    road_S: false,
    settlement_S: false,
    robber: false,
    harbor: "brick",
  },
  {//23
    type: "forest",
    token: 8,
    settlement_N: {
      id: "23_settlement_N",
      player: false,
      city: false,
      nextHexes: [16, 17, 23],
      nextNodes: ["23_road_N", "17_road_W", "17_road_S"],
    },
    road_N: {
      id: "23_road_N",
      player: false,
      nextNodes: ["23_settlement_N", "16_settlement_S"],
    },
    road_W: {
      id: "23_road_W",
      player: false,
      nextNodes: ["16_settlement_S", "28_settlement_N"],
    },
    road_S: {
      id: "23_road_S",
      player: false,
      nextNodes: ["28_settlement_N", "23_settlement_S"],
    },
    settlement_S: {
      id: "23_settlement_S",
      player: false,
      city: false,
      nextHexes: [23, 29],
      nextNodes: ["23_road_S", "29_road_N", "29_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//24
    type: "mountains",
    token: 3,
    settlement_N: {
      id: "24_settlement_N",
      player: false,
      city: false,
      nextHexes: [17, 18, 24],
      nextNodes: ["24_road_N", "18_road_W", "18_road_S"],
    },
    road_N: {
      id: "24_road_N",
      player: false,
      nextNodes: ["24_settlement_N", "17_settlement_S"],
    },
    road_W: {
      id: "24_road_W",
      player: false,
      nextNodes: ["17_settlement_S", "29_settlement_N"],
    },
    road_S: {
      id: "24_road_S",
      player: false,
      nextNodes: ["29_settlement_N", "24_settlement_S"],
    },
    settlement_S: {
      id: "24_settlement_S",
      player: false,
      city: false,
      nextHexes: [24, 29, 30],
      nextNodes: ["24_road_S", "30_road_N", "30_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//25
    type: "fields",
    token: 4,
    settlement_N: {
      id: "25_settlement_N",
      player: false,
      city: false,
      nextHexes: [18, 19, 25],
      nextNodes: ["25_road_N", "19_road_W", "19_road_S"],
    },
    road_N: {
      id: "25_road_N",
      player: false,
      nextNodes: ["25_settlement_N", "18_settlement_S"],
    },
    road_W: {
      id: "25_road_W",
      player: false,
      nextNodes: ["18_settlement_S", "30_settlement_N"],
    },
    road_S: {
      id: "25_road_S",
      player: false,
      nextNodes: ["30_settlement_N", "25_settlement_S"],
    },
    settlement_S: {
      id: "25_settlement_S",
      player: false,
      city: false,
      nextHexes: [25, 30, 31],
      nextNodes: ["25_road_S", "31_road_N", "31_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//26
    type: "pasture",
    token: 5,
    settlement_N: {
      id: "26_settlement_N",
      player: false,
      city: false,
      nextHexes: [19, 20, 26],
      nextNodes: ["26_road_N", "20_road_W", "20_road_S"],
    },
    road_N: {
      id: "26_road_N",
      player: false,
      nextNodes: ["26_settlement_N", "19_settlement_S"],
    },
    road_W: {
      id: "26_road_W",
      player: false,
      nextNodes: ["19_settlement_S", "31_settlement_N"],
    },
    road_S: {
      id: "26_road_S",
      player: false,
      nextNodes: ["31_settlement_N", "26_settlement_S"],
    },
    settlement_S: {
      id: "26_settlement_S",
      player: false,
      city: false,
      nextHexes: [26, 30, 31],
      nextNodes: ["26_road_S", "32_road_N", "32_road_W"],
    },
    robber: false,
    harbor: false,
  },
  {//27
    type: "sea",
    token: 0,
    settlement_N: {
      id: "27_settlement_N",
      player: false,
      city: false,
      nextHexes: [20],
      nextNodes: ["21_road_W", "27_road_N"],
    },
    road_N: {
      id: "27_road_N",
      player: false,
      nextNodes: ["27_settlement_N", "20_settlement_S"],
    },
    road_W: {
      id: "27_road_W",
      player: false,
      nextNodes: ["20_settlement_S", "33_settlement_N"],
    },
    road_S: false,
    settlement_S: false,
    robber: false,
    harbor: false,
  },
  // 5 line
  {//28
    type: "sea",
    token: 0,
    settlement_N: {
      id: "28_settlement_N",
      player: false,
      city: false,
      nextHexes: [23],
      nextNodes: ["23_road_W", "23_road_S"],
    },
    road_N: false,
    road_W: false,
    road_S: false,
    settlement_S: false,
    robber: false,
    harbor: false,
  },
  {//29
    type: "hills",
    token: 5,
    settlement_N: {
      id: "29_settlement_N",
      player: false,
      city: false,
      nextHexes: [23, 24, 29],
      nextNodes: ["29_road_N", "24_road_W", "24_road_S"],
    },
    road_N: {
      id: "29_road_N",
      player: false,
      nextNodes: ["29_settlement_N", "23_settlement_S"],
    },
    road_W: {
      id: "29_road_W",
      player: false,
      nextNodes: ["23_settlement_S", "33_settlement_N"],
    },
    road_S: {
      id: "29_road_S",
      player: false,
      nextNodes: ["33_settlement_N", "29_settlement_S"],
    },
    settlement_S: {
      id: "29_settlement_S",
      player: false,
      city: false,
      nextHexes: [29],
      nextNodes: ["29_road_S", "34_road_N"],
    },
    robber: false,
    harbor: false,
  },
  {//30
    type: "fields",
    token: 6,
    settlement_N: {
      id: "30_settlement_N",
      player: false,
      city: false,
      nextHexes: [24, 25, 30],
      nextNodes: ["30_road_N", "25_road_W", "25_road_S"],
    },
    road_N: {
      id: "30_road_N",
      player: false,
      nextNodes: ["30_settlement_N", "24_settlement_S"],
    },
    road_W: {
      id: "30_road_W",
      player: false,
      nextNodes: ["24_settlement_S", "34_settlement_N"],
    },
    road_S: {
      id: "30_road_S",
      player: false,
      nextNodes: ["34_settlement_N", "30_settlement_S"],
    },
    settlement_S: {
      id: "30_settlement_S",
      player: false,
      city: false,
      nextHexes: [30],
      nextNodes: ["30_road_S", "35_road_N"],
    },
    robber: false,
    harbor: false,
  },
  {//31
    type: "pasture",
    token: 11,
    settlement_N: {
      id: "31_settlement_N",
      player: false,
      city: false,
      nextHexes: [25, 26, 31],
      nextNodes: ["31_road_N", "26_road_W", "26_road_S"],
    },
    road_N: {
      id: "31_road_N",
      player: false,
      nextNodes: ["31_settlement_N", "25_settlement_S"],
    },
    road_W: {
      id: "31_road_W",
      player: false,
      nextNodes: ["25_settlement_S", "35_settlement_N"],
    },
    road_S: {
      id: "31_road_S",
      player: false,
      nextNodes: ["35_settlement_N", "31_settlement_S"],
    },
    settlement_S: {
      id: "31_settlement_S",
      player: false,
      city: false,
      nextHexes: [31],
      nextNodes: ["31_road_S", "36_road_N"],
    },
    robber: false,
    harbor: false,
  },
  {//32
    type: "harbor",
    token: 0,
    settlement_N: {
      id: "32_settlement_N",
      player: false,
      city: false,
      nextHexes: [26],
      nextNodes: ["32_road_N", "27_road_W"],
    },
    road_N: {
      id: "32_road_N",
      player: false,
      nextNodes: ["31_settlement_N", "26_settlement_S"],
    },
    road_W: {
      id: "32_road_W",
      player: false,
      nextNodes: ["26_settlement_S", "36_settlement_N"],
    },
    road_S: false,
    settlement_S: false,
    robber: false,
    harbor: "wool",
  },
  // 6 line
  {//33
    type: "harbor",
    token: 0,
    settlement_N:  {
      id: "33_settlement_N",
      player: false,
      city: false,
      nextHexes: [29],
      nextNodes: ["29_road_W", "29_road_S"],
    },
    road_N: false,
    road_W: false,
    road_S: false,
    settlement_S: false,
    robber: false,
    harbor: "all",
  },
  {//34
    type: "sea",
    token: 0,
    settlement_N: {
      id: "34_settlement_N",
      player: false,
      city: false,
      nextHexes: [29, 30],
      nextNodes: ["34_road_N", "30_road_W", "30_road_S"],
    },
    road_N: {
      id: "34_road_N",
      player: false,
      nextNodes: ["29_settlement_S", "34_settlement_N"],
    },
    road_W: false,
    road_S: false,
    settlement_S: false,
    robber: false,
    harbor: false,
  },
  {//35
    type: "harbor",
    token: 0,
    settlement_N: {
      id: "35_settlement_N",
      player: false,
      city: false,
      nextHexes: [30, 31],
      nextNodes: ["35_road_N", "31_road_W", "31_road_S"],
    },
    road_N: {
      id: "35_road_N",
      player: false,
      nextNodes: ["30_settlement_S", "35_settlement_N"],
    },
    road_W: false,
    road_S: false,
    settlement_S: false,
    robber: false,
    harbor: "all",
  },
  {//36
    type: "sea",
    token: 0,
    settlement_N: {
      id: "36_settlement_N",
      player: false,
      city: false,
      nextHexes: [31],
      nextNodes: ["36_road_N", "32_road_S"],
    },
    road_N: {
      id: "36_road_N",
      player: false,
      nextNodes: ["31_settlement_S", "36_settlement_N"],
    },
    road_W: false,
    road_S: false,
    settlement_S: false,
    robber: false,
    harbor: false,
  },
]

export default newbieMap;
