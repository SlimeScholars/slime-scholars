export const gameData = {
  rarities: ["Common", "Uncommon", "Rare", "Epic", "Legendary"],
  openingOdds: {
    "Slime Egg": [0, 0, 0, 0, 1],
    //"Slime Egg": [0.2, 0.2, 0.2, 0.2, 0.2],
    "Rotten Egg": [0.6, 0.1, 0.1, 0.1, 0.1]
  },
  slimes: {
    Common: [
      "Red Slime",
      "Blue Slime"
    ],
    Uncommon: [
      "Puppy Slime"
    ],
    Rare: [
      "Mochi Slime"
    ],
    Epic: [
      "Lucky Slime"
    ],
    Legendary: [
      "Scholar Slime"
    ]
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
  basePower: {
    Common: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Uncommon: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Rare: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Epic: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Legendary: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  },
  levelUpCost: {
    Common: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Uncommon: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Rare: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Epic: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    Legendary: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  },
  maxLevel: {
    Common: 30,
    Uncommon: 30,
    Rare: 20,
    Epic: 15,
    Legendary: 10
  },
  canStar: ["Legendary"],
  maxStarLevel: {
    Legendary: 3
  },
  starProgress: {
    Legendary: [1, 2, 3]
  }
}
