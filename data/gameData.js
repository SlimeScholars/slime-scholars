export const gameData = {
  rarities: ["Common", "Uncommon", "Rare", "Epic", "Legendary"],
  openingOdds: {
    // TODO: Reset slime egg rarity after getting spritesheets
    "Slime Egg": [1, 0, 0, 0, 0],
    // "Slime Egg": [0, 0, 0, 1, 0],
    // "Slime Egg": [0, 0, 0, 0, 1],
    // "Slime Egg": [0.2, 0.2, 0.2, 0.2, 0.2],
    // "Rotten Egg": [0.6, 0.1, 0.1, 0.1, 0.1]
  },

  items: {
    // TODO: Write prices and currency
    // Eggs
    "Slime Egg": {
      itemName: "Slime Egg",
      rarity: "Rare",
      isBg: false,
      icon: "slime-egg.png",
      buyPrice: 1,
      sellPrice: 1,
      buyCurrency: 1,
      sellCurrency: 1,
    },
    /*
    "Rotten Egg": {
      itemName: "Rotten Egg",
      rarity: "Uncommon",
      isBg: false,
      buyPrice: 1,
      sellPrice: 1,
      buyCurrency: 0,
      sellCurrency: 0
    },
    */

    // Backgrounds
    // TODO: Write bgs
    "Blue Planet": {
      itemName: "Blue Planet",
      rarity: "Rare",
      isBg: true,
      pfp: "blue-planet.png",
      bg: "blue-planet.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#510E34",
      primary2: "#0A155E",
      secondary1: "#63ABF1",
      secondary2: "#21073E",
      white: "#f4fdff",
      grey: "#272B3A",
      black: "#131520",
    },


    "Blue Space": {
      itemName: "Blue Space",
      rarity: "Rare",
      isBg: true,
      pfp: "blue-space.png",
      bg: "blue-space.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#1B2E80",
      primary2: "#401DB5",
      secondary1: "#340069",
      secondary2: "#111E7E",
      white: "#DFE3F8",
      grey: "#5E6968",
      black: "#0D1616",
    },


    "Castle": {
      itemName: "Castle",
      rarity: "Rare",
      isBg: true,
      pfp: "castle.png",
      bg: "castle.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#B7AB44",
      primary2: "#4CBFE9",
      secondary1: "#ECD49F",
      secondary2: "#F5594D",
      white: "#F5594D",
      grey: "#E4E3E2",
      black: "#141C1C",
    },


    "Cosmic Lights": {
      itemName: "Cosmic Lights",
      rarity: "Rare",
      isBg: true,
      pfp: "cosmic-lights.png",
      bg: "cosmic-lights.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#270F55",
      primary2: "#CE4091",
      secondary1: "#320340",
      secondary2: "#3D4597",
      white: "#EEEFF8",
      grey: "#616375",
      black: "#070811",
    },


    "Day Sakura": {
      itemName: "Day Sakura",
      rarity: "Rare",
      isBg: true,
      pfp: "day-sakura.png",
      bg: "day-sakura.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#FED9E0",
      primary2: "#BA92B6",
      secondary1: "#4BC595",
      secondary2: "#A74553",
      white: "#F4FBF9",
      grey: "#7F9089",
      black: "#2E0109",
    },


    "Fall Castle": {
      itemName: "Fall Castle",
      rarity: "Rare",
      isBg: true,
      pfp: "fall-castle.png",
      bg: "fall-castle.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#F28206",
      primary2: "#AEA3F2",
      secondary1: "#87382E",
      secondary2: "#FE5260",
      white: "#FFF6E3",
      grey: "#C7C5CD",
      black: "#0D0605",
    },


    "Fall Forest": {
      itemName: "Fall Forest",
      rarity: "Rare",
      isBg: true,
      pfp: "fall-forest.png",
      bg: "fall-forest.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#DAEEFE",
      primary2: "#FF9A13",
      secondary1: "#53231D",
      secondary2: "#AA1402",
      white: "#F8EBE6",
      grey: "#DCE0E5",
      black: "#0F0200",
    },


    "Fence Garden": {
      itemName: "Fence Garden",
      rarity: "Rare",
      isBg: true,
      pfp: "fence-garden.png",
      bg: "fence-garden.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#439D00",
      primary2: "#A0F7EB",
      secondary1: "#C09256",
      secondary2: "#116015",
      white: "#F6F9EE",
      grey: "#C5D3D1",
      black: "#0E1206",
    },


    "Flower Field": {
      itemName: "Flower Field",
      rarity: "Rare",
      isBg: true,
      pfp: "flower-field.png",
      bg: "flower-field.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#CBF9EC",
      primary2: "#87DFEB",
      secondary1: "#E2A065",
      secondary2: "#ECC23E",
      white: "#F1FDFC",
      grey: "#E1E5E4",
      black: "#050D03",
    },


    "Forest Jungle": {
      itemName: "Florest Jungle",
      rarity: "Rare",
      isBg: true,
      pfp: "forest-jungle.png",
      bg: "forest-jungle.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#D1CE01",
      primary2: "#7C3741",
      secondary1: "#1A6D89",
      secondary2: "#385825",
      white: "#F1F0F0",
      grey: "#6E6D6D",
      black: "#0B0506",
    },


    "Forest Mountains": {
      itemName: "Forest Mountains",
      rarity: "Rare",
      isBg: true,
      pfp: "forest-mountains.png",
      bg: "forest-mountains.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#76ABAB",
      primary2: "#CFC420",
      secondary1: "#76BEF3",
      secondary2: "#767A02",
      white: "#FCFBEA",
      grey: "#B6B7A9",
      black: "#0C1414",
    },


    "Gem Space": {
      itemName: "Gem Space",
      rarity: "Rare",
      isBg: true,
      pfp: "gem-space.png",
      bg: "gem-space.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#300F87",
      primary2: "#42CCF7",
      secondary1: "#88DBF9",
      secondary2: "#250980",
      white: "#EBFDFF",
      grey: "#93A0A4",
      black: "#04010C",
    },


    "Green Field": {
      itemName: "Green Field",
      rarity: "Rare",
      isBg: true,
      pfp: "green-field.png",
      bg: "green-field.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#71BCF3",
      primary2: "#AEAD0A",
      secondary1: "#6E7001",
      secondary2: "#E9FEDD",
      white: "#F6FBFD",
      grey: "#ADB3B8",
      black: "#28221D",
    },


    "Ice City": {
      itemName: "Ice City",
      rarity: "Rare",
      isBg: true,
      pfp: "ice-city.png",
      bg: "ice-city.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#678CCA",
      primary2: "#93BEEA",
      secondary1: "#7D8DC7",
      secondary2: "#6091D8",
      white: "#F4F9FD",
      grey: "#94989E",
      black: "#06111D",
    },


    "Japan Vibes": {
      itemName: "Japan Vibes",
      rarity: "Rare",
      isBg: true,
      pfp: "japan-vibes.png",
      bg: "japan-vibes.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#FECFF2",
      primary2: "#A372F2",
      secondary1: "#EEA5FD",
      secondary2: "#6D45ED",
      white: "#F8F4FE",
      grey: "#C9C5CE",
      black: "#0D031D",
    },


    "Magma Caverns": {
      itemName: "Magma Caverns",
      rarity: "Rare",
      isBg: true,
      pfp: "magma-caverns.png",
      bg: "magma-caverns.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#66061D",
      primary2: "#A72A29",
      secondary1: "#ED2F18",
      secondary2: "#FF8A06",
      white: "#F9E7E7",
      grey: "#6F6262",
      black: "#070011",
    },


    "Neon City": {
      itemName: "Neon City",
      rarity: "Rare",
      isBg: true,
      pfp: "neon-city.png",
      bg: "neon-city.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#D944AA",
      primary2: "#3B1E6E",
      secondary1: "#A93FDB",
      secondary2: "#3D27B7",
      white: "#FBECF6",
      grey: "#968792",
      black: "#06030B",
    },


    "Night Sakura": {
      itemName: "Night Sakura",
      rarity: "Rare",
      isBg: true,
      pfp: "night-sakura.png",
      bg: "night-sakura.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#531068",
      primary2: "#171C6C",
      secondary1: "#FDC5E1",
      secondary2: "#DE528A",
      white: "#FFF9FC",
      grey: "#3E3F47",
      black: "#09020B",
    },


    "Night View": {
      itemName: "Night View",
      rarity: "Rare",
      isBg: true,
      pfp: "night-view.png",
      bg: "night-view.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#1A1440",
      primary2: "#113374",
      secondary1: "#1A1C74",
      secondary2: "#2F64B5",
      white: "#FEFEFD",
      grey: "#C3BDE8",
      black: "#07071B",
    },


    "Ocean City": {
      itemName: "Ocean City",
      rarity: "Rare",
      isBg: true,
      pfp: "ocean-city.png",
      bg: "ocean-city.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#6BA3F0",
      primary2: "#00A1D2",
      secondary1: "#A4DCEC",
      secondary2: "#845D6F",
      white: "#F6FBFD",
      grey: "#A7ACB3",
      black: "#001217",
    },


    "Orange Desert": {
      itemName: "Orange Desert",
      rarity: "Rare",
      isBg: true,
      pfp: "orange-desert.png",
      bg: "orange-desert.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#E35B00",
      primary2: "#8B2100",
      secondary1: "#FEB300",
      secondary2: "#581000",
      white: "#FFF0E6",
      grey: "#8C8573",
      black: "#0E0300",
    },


    "Orange Sunset": {
      itemName: "Orange Sunset",
      rarity: "Rare",
      isBg: true,
      pfp: "orange-sunset.png",
      bg: "orange-sunset.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#B32D48",
      primary2: "#6A3A53",
      secondary1: "#F8BA67",
      secondary2: "#E07F57",
      white: "#FCF2EE",
      grey: "#A29995",
      black: "#110C07",
    },


    "Pillar Space": {
      itemName: "Pillar Space",
      rarity: "Rare",
      isBg: true,
      pfp: "pillar-space.png",
      bg: "pillar-space.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#B970E9",
      primary2: "#2C1C67",
      secondary1: "#40059E",
      secondary2: "#00D9FD",
      white: "#EEEBFE",
      grey: "#403E46",
      black: "#19063B",
    },


    "Pink Candy": {
      itemName: "Pink Candy",
      rarity: "Rare",
      isBg: true,
      pfp: "pink-candy.png",
      bg: "pink-candy.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#FEACC8",
      primary2: "#FF5D68",
      secondary1: "#9CB770",
      secondary2: "#FE8593",
      white: "#F9E9F1",
      grey: "#C7BCBE",
      black: "#230002",
    },


    "Pink Pyramid": {
      itemName: "Pink Pyramid",
      rarity: "Rare",
      isBg: true,
      pfp: "pink-pyramid.png",
      bg: "pink-pyramid.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#F73F7B",
      primary2: "#12BABE",
      secondary1: "#624667",
      secondary2: "#BB4487",
      white: "#F2D5C3",
      grey: "#585558",
      black: "#110E0F",
    },


    "Rainy City": {
      itemName: "Rainy City",
      rarity: "Rare",
      isBg: true,
      pfp: "rainy-city.png",
      bg: "rainy-city.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#5F2D6D",
      primary2: "#646DD3",
      secondary1: "#632543",
      secondary2: "#4A42B2",
      white: "#EFF0FB",
      grey: "#9697A1",
      black: "#09040A",
    },


    "Rainy Forest": {
      itemName: "Rainy Forest",
      rarity: "Rare",
      isBg: true,
      pfp: "rainy-forest.png",
      bg: "rainy-forest.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#728148",
      primary2: "#8097D3",
      secondary1: "#B2816B",
      secondary2: "#3D282D",
      white: "#F1F3FA",
      grey: "#A4A6AD",
      black: "#0B0D07",
    },


    "Rainy Town": {
      itemName: "Rainy Town",
      rarity: "Rare",
      isBg: true,
      pfp: "rainy-town.png",
      bg: "rainy-town.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#82A2BD",
      primary2: "#B7ACC1",
      secondary1: "#E4E4EF",
      secondary2: "#AEC8E4",
      white: "#E5F1F8",
      grey: "#6C7192",
      black: "#0A0A0D",
    },


    "Red Space": {
      itemName: "Red Space",
      rarity: "Rare",
      isBg: true,
      pfp: "red-space.png",
      bg: "red-space.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#943737",
      primary2: "#D44934",
      secondary1: "#F13425",
      secondary2: "#692426",
      white: "#FEE2B5",
      grey: "#DDDAD4",
      black: "#1E111A",
    },


  },

  baseProduction: {
    Common: 5,
    Uncommon: 10,
    Rare: 15,
    Epic: 20,
    Legendary: 25,
  },
  baseLevelProduction: {
    Common: 1,
    Uncommon: 2,
    Rare: 3,
    Epic: 4,
    Legendary: 5,
  },
  bonusLevelProduction: {
    Common: 2,
    Uncommon: 2,
    Rare: 3,
    Epic: 5,
    Legendary: 10,
  },

  // TODO: Sort out levelUpCost
  levelUpCost: {
    Common: [
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30,
    ],
    Uncommon: [
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30,
    ],
    Rare: [
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30,
    ],
    Epic: [
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30,
    ],
    Legendary: [
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
      28, 29, 30,
    ],
  },
  maxLevel: {
    Common: 50,
    Uncommon: 25,
    Rare: 15,
    Epic: 10,
    Legendary: 10,
  },

  canStar: ["Epic", "Legendary"],
  maxStarLevel: {
    Epic: 3,
    Legendary: 3,
  },
  starProgress: {
    Epic: [2, 4],
    Legendary: [1, 2],
  },

  slimePfps: {
    "Blue Slime": {
      slimeName: "Blue Slime",
      pfp: "blue-slime.png",
    },
    "Green Slime": {
      slimeName: "Green Slime",
      pfp: "green-slime.png",
    },
    "Grey Slime": {
      slimeName: "Grey Slime",
      pfp: "grey-slime.png",
    },
    "Orange Slime": {
      slimeName: "Orange Slime",
      pfp: "orange-slime.png",
    },
    "Pink Slime": {
      slimeName: "Pink Slime",
      pfp: "pink-slime.png",
    },
    "Purple Slime": {
      slimeName: "Purple Slime",
      pfp: "purple-slime.png",
    },
    "Red Slime": {
      slimeName: "Red Slime",
      pfp: "red-slime.png",
    },
    "Turquoise Slime": {
      slimeName: "Turquoise Slime",
      pfp: "turquoise-slime.png",
    },
    "White Slime": {
      slimeName: "White Slime",
      pfp: "white-slime.png",
    },
    "Yellow Slime": {
      slimeName: "Yellow Slime",
      pfp: "yellow-slime.png",
    },
    "Puppy Slime": {
      slimeName: "Puppy Slime",
      pfp: "puppy-slime.png",
    },
  },

  // Slime data
  slimes: {
    // TODO: Write pfps
    Common: [
      {
        slimeName: "Blue Slime",
      },
      {
        slimeName: "Green Slime",
      },
      {
        slimeName: "Grey Slime",
      },
      {
        slimeName: "Orange Slime",
      },
      {
        slimeName: "Pink Slime",
      },
      {
        slimeName: "Purple Slime",
      },
      {
        slimeName: "Red Slime",
      },
      {
        slimeName: "Turquoise Slime",
      },
      {
        slimeName: "White Slime",
      },
      {
        slimeName: "Yellow Slime",
      },
    ],

    Uncommon: [
      {
        slimeName: "Puppy Slime",
      },
    ],

    Rare: [
      {
        slimeName: "Mochi Slime",
      },
    ],
    Epic: [
      {
        slimeName: "Lucky Slime",
        abilityName: "Charm",
        abilityDescriptions: [
          "25% chance to produce double this slime's GP.",
          "50% chance to produce double this slime's GP.",
          "50% chance to produce double this slime's GP plus 25% chance to double the GP of all other active slimes.",
        ],
      },
    ],
    Legendary: [
      {
        slimeName: "Scholar Slime",
        effects: ["Max level is level 25"],
        abilityName: "Wisdom",
        abilityDescription: [
          "All other active slimes gain 2 extra GP per level (1 for commons).",
          "All other active slimes gain 2 extra GP per level (1 for commons). Gain an extra +3 GP/level itself.",
          "All other active slimes gain 2 extra GP per level (1 for commons). Gain an extra +7 GP/level itself.",
        ],
        maxLevel: 25,
      },
    ],
  },

  // map rarity to colour
  rarityColours: {
    Common: {
      text: "#8A8A8A",
      bord: "common-gradient-border",
      bg: "common-gradient-background",
    },
    Uncommon: {
      text: "#14DC24",
      bord: "uncommon-gradient-border",
      bg: "uncommon-gradient-background",
    },
    Rare: {
      text: "#0061ff",
      bord: "rare-gradient-border",
      bg: "rare-gradient-background",
    },
    Epic: {
      text: "#BC19F7",
      bord: "epic-gradient-border",
      bg: "epic-gradient-background",
    },
    Legendary: {
      text: "#F7E818",
      bord: "legendary-gradient-border",
      bg: "legendary-gradient-background",
    },
  },
};
