export const gameData = {
  rarities: ["Common", "Uncommon", "Rare", "Epic", "Legendary"],
  openingOdds: {
    //"Slime Egg": [1, 0, 0, 0, 0],
    //"Slime Egg": [0, 0, 0, 1, 0],
    "Slime Egg": [0, 0, 0, 0, 1],
    //"Slime Egg": [0.2, 0.2, 0.2, 0.2, 0.2],
    "Rotten Egg": [0.6, 0.1, 0.1, 0.1, 0.1]
  },
  items: {
    "Slime Egg": {
      itemName: "Slime Egg",
      rarity: "Rare",
      buyPrice: 1,
      sellPrice: 1,
      buyCurrency: 1,
      sellCurrency: 1
    },
    "Rotten Egg": {
      itemName: "Rotten Egg",
      rarity: "Uncommon",
      buyPrice: 1,
      sellPrice: 1,
      buyCurrency: 0,
      sellCurrency: 0
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
    Common: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Uncommon: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Rare: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Epic: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Legendary: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  },
  maxLevel: {
    Common: 50,
    Uncommon: 25,
    Rare: 15,
    Epic: 10,
    Legendary: 10,
  },

  canStar: ["Epic", "Legendary",],
  maxStarLevel: {
    Epic: 3,
    Legendary: 3,
  },
  starProgress: {
    Epic: [2, 4],
    Legendary: [1, 2],
  },

  // Slime data LOL

  slimes: {
    Common: [
      {
        slimeName: "Red Slime",
      },
      {
        slimeName: "Blue Slime",
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
        effects: [
          "Max level is level 25"
        ],
        abilityName: "Wisdom",
        abilityDescription: [
          "All other active slimes gain 2 extra GP per level (1 for commons).",
          "All other active slimes gain 2 extra GP per level (1 for commons). Gain an extra +3 GP/level itself.",
          "All other active slimes gain 2 extra GP per level (1 for commons). Gain an extra +7 GP/level itself.",
        ],
        maxLevel: 25,
      },
    ]
  },
}
