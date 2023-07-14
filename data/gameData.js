export const gameData = {
  rarities: ["Common", "Uncommon", "Rare", "Epic", "Legendary"],
  openingOdds: {
    "Slime Egg": [0.2, 0.2, 0.2, 0.2, 0.2],
    "Rotten Egg": [0.6, 0.1, 0.1, 0.1, 0.1]
  },
  slimes: [
    {
      slimeName: "Red Slime",
      maxLevel: 30,
      rarity: "Common",
      sellPrice: 30,
      sellCurrency: 0
    },
    {
      slimeName: "Blue Slime",
      maxLevel: 30,
      rarity: "Common",
      sellPrice: 30,
      sellCurrency: 0
    },
    {
      slimeName: "Puppy Slime",
      maxLevel: 30,
      rarity: "Uncommon",
      sellPrice: 30,
      sellCurrency: 0
    },
    {
      slimeName: "Mochi Slime",
      maxLevel: 30,
      rarity: "Rare",
      sellPrice: 30,
      sellCurrency: 0
    },
    {
      slimeName: "Lucky Slime",
      maxLevel: 30,
      rarity: "Epic",
      sellPrice: 30,
      sellCurrency: 0
    },
    {
      slimeName: "EDU Slime",
      maxLevel: 30,
      rarity: "Legendary",
      sellPrice: 30,
      sellCurrency: 0
    }
  ],
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
  basePowers: {
    Common: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Uncommon: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Rare: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Epic: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Legendary: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  },
  levelUpCosts: {
    Common: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Uncommon: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Rare: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Epic: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Legendary: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  }
}
