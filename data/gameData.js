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

    /*
    "Castle": {
      itemName: "Castle",
      rarity: "Rare",
      isBg: true,
      pfp: "castle.png",
      bg: "castle.png",
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
    */

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

    "Forest Mountains": {
      itemName: "Forest Mountains",
      rarity: "Rare",
      isBg: true,
      pfp: "forest-mountains.png",
      bg: "forest-mountains.png",
      buyPrice: 0,
      buyCurrency: 0,
      primary1: "#76ABAB",
      primary2: "#CFC420",
      secondary1: "#76BEF3",
      secondary2: "#767A02",
      white: "#FCFBEA",
      grey: "#B6B7A9",
      black: "#0C1414",
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
