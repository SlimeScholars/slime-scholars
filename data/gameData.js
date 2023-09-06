export const gameData = {
  rarities: ["Common", "Uncommon", "Rare", "Epic", "Legendary"],
  openingOdds: {
    // TODO: Reset slime egg rarity after getting spritesheets
    //"Slime Egg": [1, 0, 0, 0, 0],
    // "Slime Egg": [0, 0, 0, 1, 0],
    // "Slime Egg": [0, 0, 0, 0, 1],
    // "Slime Egg": [0.2, 0.2, 0.2, 0.2, 0.2],
    "Slime Egg": [0.25, 0.35, 0.25, 0.10, 0.05],
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
      primary1: "#5A1A3C",
      primary2: "#8a285d",
      secondary1: "#5A1A3C",
      secondary2: "#21073E",
      white: "#f4fdff",
      grey: "#272B3A",
      black: "#131520",
      text1: "#F8EBE6",
      text2: "#f9ebf3",
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
      primary2: "#2844bd",
      secondary1: "#1B2E80",
      secondary2: "#111E7E",
      white: "#DFE3F8",
      grey: "#5E6968",
      black: "#0D1616",
      text1: "#eaedfb",
      text2: "#eaedfb",

    },

    "Castle": {
      itemName: "Castle",
      rarity: "Rare",
      isBg: true,
      pfp: "castle.png",
      bg: "castle.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#4CBFE9",
      primary2: "#8ed6f1",
      secondary1: "#4CBFE9",
      secondary2: "#4CBFE9",
      white: "#e8f7fc",
      grey: "#E4E3E2",
      black: "#141C1C",
      text1: "#e8f7fc",
      text2: "#e8f7fc",

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
      primary2: "#471b98",
      secondary1: "#270F55",
      secondary2: "#3D4597",
      white: "#EEEFF8",
      grey: "#616375",
      black: "#070811",
      text1: "#f0e9fb",
      text2: "#f0e9fb",
    },

    "Day Sakura": {
      itemName: "Day Sakura",
      rarity: "Rare",
      isBg: true,
      pfp: "day-sakura.png",
      bg: "day-sakura.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#FE80AF",
      primary2: "#fecddf",
      secondary1: "#FE80AF",
      secondary2: "#A74553",
      white: "#F4FBF9",
      grey: "#7F9089",
      black: "#2E0109",
      text1: "#fecddf",
      text2: "#fecddf",

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
      primary2: "#fa9f38",
      secondary1: "#F28206",
      secondary2: "#FE5260",
      white: "#FFF6E3",
      grey: "#C7C5CD",
      black: "#0D0605",
      text1: "#fef3e6",
      text2: "#fef3e6",

    },

    "Fall Forest": {
      itemName: "Fall Forest",
      rarity: "Rare",
      isBg: true,
      pfp: "fall-forest.png",
      bg: "fall-forest.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#FF9A13",
      primary2: "#ffb24d",
      secondary1: "#FF9A13",
      secondary2: "#AA1402",

      white: "#fedecd",
      grey: "#DCE0E5",
      black: "#0F0200",

      text1: "#fff4e6",
      text2: "#fff4e6",
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
      primary2: "#63e600",
      secondary1: "#439D00",
      secondary2: "#116015",
      white: "#F6F9EE",
      grey: "#C5D3D1",
      black: "#0E1206",
      text1: "#f1ffe6",
      text2: "#f1ffe6",
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
      secondary1: "#CBF9EC",
      secondary2: "#ECC23E",
      white: "#F1FDFC",
      grey: "#E1E5E4",
      black: "#FFFFFF",
      text1: "#084433",
      text2: "#084433",
    },

    "Forest Jungle": {
      itemName: "Forest Jungle",
      rarity: "Rare",
      isBg: true,
      pfp: "forest-jungle.png",
      bg: "forest-jungle.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#D1CE01",
      primary2: "#fefa1b",
      secondary1: "#D1CE01",
      secondary2: "#385825",
      white: "#F1F0F0",
      grey: "#6E6D6D",
      black: "#0B0506",
      text1: "#fffee6",
      text2: "#fffee6",
    },

    "Forest Mountains": {
      itemName: "Forest Mountains",
      rarity: "Rare",
      isBg: true,
      pfp: "forest-mountains.png",
      bg: "forest-mountains.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#73BEF5",
      primary2: "#b7defa",
      secondary1: "#73BEF5",
      secondary2: "#767A02",
      white: "#FCFBEA",
      grey: "#B6B7A9",
      black: "#0C1414",
      text1: "#e7f4fd",
      text2: "#e7f4fd",

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
      primary2: "#4314b8",
      secondary1: "#300F87",
      secondary2: "#250980",
      white: "#EBFDFF",
      grey: "#93A0A4",
      black: "#04010C",
      text1: "#eee8fc",
      text2: "#eee8fc",
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
      primary2: "#b9def9",
      secondary1: "#71BCF3",
      secondary2: "#E9FEDD",
      white: "#F6FBFD",
      grey: "#ADB3B8",
      black: "#28221D",
      text1: "#e8f4fd",
      text2: "#e8f4fd",
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
      primary2: "#a1b7de",
      secondary1: "#678CCA",
      secondary2: "#6091D8",
      white: "#F4F9FD",
      grey: "#94989E",
      black: "#06111D",
      text1: "#ecf1f8",
      text2: "#ecf1f8",
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
      primary2: "#fc82de",
      secondary1: "#FECFF2",
      secondary2: "#6D45ED",
      white: "#F8F4FE",
      grey: "#C9C5CE",
      black: "#FFFFFF",
      text1: "#4b0239",
      text2: "#4b0239",
    },

    "Magma Caverns": {
      itemName: "Magma Caverns",
      rarity: "Rare",
      isBg: true,
      pfp: "magma-caverns.png",
      bg: "magma-caverns.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#97022c",
      primary2: "#e20343",
      secondary1: "#97022c",
      secondary2: "#FF8A06",
      white: "#F9E7E7",
      grey: "#6F6262",
      black: "#070011",

      text1: "#F9E7E7",
      text2: "#ffcccc",
    },

    "Neon City": {
      itemName: "Neon City",
      rarity: "Rare",
      isBg: true,
      pfp: "neon-city.png",
      bg: "neon-city.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#730099",
      primary2: "#ac00e6",
      secondary1: "#A93FDB",
      secondary2: "#3D27B7",
      white: "#FBECF6",
      grey: "#968792",
      black: "#06030B",

      text1: "#ffccff",
      text2: "#ffccff",
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
      primary2: "#7c189a",
      secondary1: "#531068",
      secondary2: "#DE528A",
      white: "#FFF9FC",
      grey: "#3E3F47",
      black: "#09020B",

      text1: "#ffccff",
      text2: "#ffccff",
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
      primary2: "#2f2574",
      secondary1: "#1A1C74",
      secondary2: "#2F64B5",
      white: "#FEFEFD",
      grey: "#C3BDE8",
      black: "#07071B",

      text1: "#ccffff",
      text2: "#ccffff",
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
      primary2: "#a2c5f6",
      secondary1: "#6BA3F0",
      secondary2: "#845D6F",
      white: "#F6FBFD",
      grey: "#A7ACB3",
      black: "#001217",

      text1: "#ccffff",
      text2: "#ccffff",
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
      primary2: "#ff8533",
      secondary1: "#E35B00",
      secondary2: "#581000",
      white: "#FFF0E6",
      grey: "#8C8573",
      black: "#0E0300",

      text1: "#ffffcc",
      text2: "#ffffcc",
    },

    "Orange Sunset": {
      itemName: "Orange Sunset",
      rarity: "Rare",
      isBg: true,
      pfp: "orange-sunset.png",
      bg: "orange-sunset.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#ff3300",
      primary2: "#ff704d",
      secondary1: "#ff3300",
      secondary2: "#E07F57",
      white: "#FCF2EE",
      grey: "#A29995",
      black: "#110C07",

      text1: "#ffcccc",
      text2: "#ffcccc",
    },

    "Pillar Space": {
      itemName: "Pillar Space",
      rarity: "Rare",
      isBg: true,
      pfp: "pillar-space.png",
      bg: "pillar-space.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#bf00ff",
      primary2: "#d24dff",
      secondary1: "#bf00ff",
      secondary2: "#00D9FD",
      white: "#EEEBFE",
      grey: "#403E46",
      black: "#19063B",

      text1: "#ccccff",
      text2: "#ccccff",
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
      primary2: "#fee6ee",
      secondary1: "#FEACC8",
      secondary2: "#FE8593",
      white: "#F9E9F1",
      grey: "#C7BCBE",
      black: "#230002",

      text1: "#ffccff",
      text2: "#cc0099",
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
      primary2: "#fa85ac",
      secondary1: "#F73F7B",
      secondary2: "#BB4487",
      white: "#F2D5C3",
      grey: "#585558",
      black: "#110E0F",

      text1: "#ffccff",
      text2: "#ffccff",
    },

    "Rainy City": {
      itemName: "Rainy City",
      rarity: "Rare",
      isBg: true,
      pfp: "rainy-city.png",
      bg: "rainy-city.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#7e3b91",
      primary2: "#a85cbc",
      secondary1: "#7e3b91",
      secondary2: "#4A42B2",
      white: "#EFF0FB",
      grey: "#9697A1",
      black: "#09040A",

      text1: "#ccccff",
      text2: "#ccccff",
    },

    "Rainy Forest": {
      itemName: "Rainy Forest",
      rarity: "Rare",
      isBg: true,
      pfp: "rainy-forest.png",
      bg: "rainy-forest.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#738349",
      primary2: "#9aac6c",
      secondary1: "#738349",
      secondary2: "#3D282D",
      white: "#F1F3FA",
      grey: "#A4A6AD",
      black: "#0B0D07",

      text1: "#ccffcc",
      text2: "#ccffcc",
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
      primary2: "#abc1d3",
      secondary1: "#82A2BD",
      secondary2: "#AEC8E4",
      white: "#E5F1F8",
      grey: "#6C7192",
      black: "#0A0A0D",

      text1: "#ccffff",
      text2: "#ccffff",
    },

    "Red Space": {
      itemName: "Red Space",
      rarity: "Rare",
      isBg: true,
      pfp: "red-space.png",
      bg: "red-space.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#a83e3e",
      primary2: "#c86a6a",
      secondary1: "#a83e3e",
      secondary2: "#692426",
      white: "#FEE2B5",
      grey: "#DDDAD4",
      black: "#1E111A",

      text1: "#ffcccc",
      text2: "#ffcccc",
    }
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

  slimeImgs: {
    "Blue Slime": {
      slimeName: "Blue Slime",
      pfp: "blue-slime.png",
      spritesheet: "blue-slime.png",
      static: "blue-slime.png",
    },
    "Green Slime": {
      slimeName: "Green Slime",
      pfp: "green-slime.png",
      spritesheet: "green-slime.png",
      static: "green-slime.png",
    },
    "Grey Slime": {
      slimeName: "Grey Slime",
      pfp: "grey-slime.png",
      spritesheet: "grey-slime.png",
      static: "grey-slime.png",
    },
    "Orange Slime": {
      slimeName: "Orange Slime",
      pfp: "orange-slime.png",
      spritesheet: "orange-slime.png",
      static: "orange-slime.png",
    },
    "Pink Slime": {
      slimeName: "Pink Slime",
      pfp: "pink-slime.png",
      spritesheet: "pink-slime.png",
      static: "pink-slime.png",
    },
    "Purple Slime": {
      slimeName: "Purple Slime",
      pfp: "purple-slime.png",
      spritesheet: "purple-slime.png",
      static: "purple-slime.png",
    },
    "Red Slime": {
      slimeName: "Red Slime",
      pfp: "red-slime.png",
      spritesheet: "red-slime.png",
      static: "red-slime.png",
    },
    "Turquoise Slime": {
      slimeName: "Turquoise Slime",
      pfp: "turquoise-slime.png",
      spritesheet: "turquoise-slime.png",
      static: "turquoise-slime.png",
    },
    "White Slime": {
      slimeName: "White Slime",
      pfp: "white-slime.png",
      spritesheet: "white-slime.png",
      static: "white-slime.png",
    },
    "Yellow Slime": {
      slimeName: "Yellow Slime",
      pfp: "yellow-slime.png",
      spritesheet: "yellow-slime.png",
      static: "yellow-slime.png",
    },
    "Puppy Slime": {
      slimeName: "Puppy Slime",
      pfp: "puppy-slime.png",
      spritesheet: "puppy-slime.png",
      static: "puppy-slime.png",
    },
    // FIXME: Update slime pictures to actual picture
    "Ice Cream Slime": {
      slimeName: "Ice Cream Slime",
      pfp: 'ice-cream-slime.png',
      spritesheet: "ice-cream-slime.png",
      static: "ice-cream-slime.png",
    },
    "Lucky Slime": {
      slimeName: "Lucky Slime",
      pfp: 'lucky-slime.png',
      spritesheet: "lucky-slime.png",
      static: "lucky-slime.png",
    },
    "Nebula Slime": {
      slimeName: "Nebula Slime",
      pfp: 'nebula-slime.png',
      spritesheet: "nebula-slime.png",
      static: "nebula-slime.png",
    },
  },

  // Slime data
  slimes: {
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
        slimeName: "Ice Cream Slime",
      },
    ],
    Epic: [
      {
        slimeName: "Lucky Slime",
        abilityName: "Charm",
        abilityDescriptions: [
          "25% chance to produce double this slime's GP.",
          "50% chance to produce double this slime's GP.",
          "50% chance to produce double this slime's GP. 25% chance to double the GP of all other active slimes.",
        ],
      },
    ],
    Legendary: [
      {
        slimeName: "Nebula Slime",
        abilityName: "Cosmic",
        abilityDescription: [
          "Bonus levels for all other active slimes are 2x more effective.",
          "Bonus levels for all other active slimes are 3x more effective.",
          "Bonus levels for all other active slimes are 3x more effective. 42% chance for bonus levels for all other active slimes to be 5x more effective instead of 3x.",
        ],
        maxLevel: 25,
      },
      // {
      //   slimeName: "Scholar Slime",
      //   effects: ["Max level is level 25"],
      //   abilityName: "Wisdom",
      //   abilityDescription: [
      //     "All other active slimes gain 2 extra GP per level (1 for commons).",
      //     "All other active slimes gain 2 extra GP per level (1 for commons). Gain an extra +3 GP/level itself.",
      //     "All other active slimes gain 2 extra GP per level (1 for commons). Gain an extra +7 GP/level itself.",
      //   ],
      //   maxLevel: 25,
      // },
    ],
  },

  // map rarity to colour
  rarityColours: {
    Common: {
      text: "#fff",
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
