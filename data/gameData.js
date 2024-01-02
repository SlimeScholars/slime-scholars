export const gameData = {
  rarities: ["Common", "Uncommon", "Rare", "Epic", "Legendary"],
  openingOdds: {
    // TODO: Reset slime egg rarity after getting spritesheets
    //"Slime Egg": [1, 0, 0, 0, 0],
    // "Slime Egg": [0, 0, 0, 1, 0],
    // "Slime Egg": [0, 0, 0, 0, 1],
    // "Slime Egg": [0.2, 0.2, 0.2, 0.2, 0.2],
    "Slime Egg": [0.3, 0.3, 0.25, 0.1, 0.05],
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
      buyPrice: 300,
      sellPrice: 300,
      buyCurrency: 1,
      sellCurrency: 1,
      desc: "A slime egg. It's a bit slimy. I wonder what's inside?",
    },

    // Backgrounds
    "Blue Planet": {
      itemName: "Blue Planet",
      rarity: "Rare",
      desc: "A planet in a galaxy far, far away. Legend has it that the Slimes came from this planet.",
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
      track: "pillar-space",
    },

    "Blue Space": {
      itemName: "Blue Space",
      rarity: "Rare",
      desc: "Gaze upon the planet of the Slimes from its single moon. It's a bit chilly here.",
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
      track: "pillar-space",
    },

    Castle: {
      itemName: "Castle",
      rarity: "Rare",
      desc: "A majestic castle fit for a king, or a slime, or a kingly slime.",
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
      track: "forest-jungle",
    },

    "Cosmic Lights": {
      itemName: "Cosmic Lights",
      rarity: "Rare",
      desc: "You won't beat this view on Earth.",
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
      track: "pillar-space",
    },

    "Day Sakura": {
      itemName: "Day Sakura",
      rarity: "Rare",
      desc: "The cherry blossom is the national flower of Japan. It's falling petals cover the ground in pink.",
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
      track: "forest-jungle",
    },

    "Fall Castle": {
      itemName: "Fall Castle",
      rarity: "Rare",
      desc: "What's better than a castle? A castle in the fall! The leaves are so pretty.",
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
      track: "forest-jungle",
    },

    "Fall Forest": {
      itemName: "Fall Forest",
      rarity: "Rare",
      desc: "The changing seasons paint the forest in gold. It's getting chilly though - better put on a jacket.",
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
      track: "forest-jungle",
    },

    "Fence Garden": {
      itemName: "Fence Garden",
      rarity: "Rare",
      desc: "It's a fence. And a garden.",
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
      track: "forest-mountains",
    },

    "Flower Field": {
      itemName: "Flower Field",
      rarity: "Rare",
      desc: "Endless flower fields, a sea of vibrant colors and soothing tranquility.",
      isBg: true,
      pfp: "flower-field.png",
      bg: "flower-field.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#084433",
      primary2: "#106644",
      secondary1: "#CBF9EC",
      secondary2: "#ECC23E",
      white: "#F1FDFC",
      grey: "#E1E5E4",
      black: "#000000",
      text1: "#CBF9EC",
      text2: "#87DFEB",
      track: "forest-mountains",
    },

    "Forest Jungle": {
      itemName: "Forest Jungle",
      rarity: "Rare",
      desc: "A lush and dense jungle teeming with life, a terra incognita of hidden secrets.",
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
      track: "forest-jungle",
    },

    "Forest Mountains": {
      itemName: "Forest Mountains",
      rarity: "Rare",
      desc: "Majestic forested mountains, where nature's secrets are waiting to be discovered.",
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
      track: "forest-mountains",
    },

    "Gem Space": {
      itemName: "Gem Space",
      rarity: "Rare",
      desc: "An alien planet adorned with shimmering gems. I wonder how much these are worth?",
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
      track: "pillar-space",
    },

    "Green Field": {
      itemName: "Green Field",
      rarity: "Rare",
      desc: "It's pretty green. And empty.",
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
      track: "forest-mountains",
    },

    "Ice City": {
      itemName: "Ice City",
      rarity: "Rare",
      desc: "A shimmering city of ice, belonging to some advanced civilization on a snowy planet. Talk about cool!",
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
      track: "ice-city",
    },

    "Japan Vibes": {
      itemName: "Japan Vibes",
      rarity: "Rare",
      desc: "Ramen shops, cherry blossoms, and neon lights. What more could you want?",
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
      track: "ice-city",
    },

    "Magma Caverns": {
      itemName: "Magma Caverns",
      rarity: "Rare",
      desc: "A fiery cavern deep beneath the earth. Watch your step!",
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
      track: "magma-caverns",
    },

    "Neon City": {
      itemName: "Neon City",
      rarity: "Rare",
      desc: "The party never ends.",
      isBg: true,
      pfp: "neon-city.png",
      bg: "neon-city.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#7344c9",
      primary2: "#61468a",
      secondary1: "#3337b0",
      secondary2: "#3b299e",
      white: "#f3edff",
      grey: "#756d85",
      black: "#06030B",
      text1: "#cdb6fc",
      text2: "#cdb6fc",
      track: "pillar-space",
    },

    "Night Sakura": {
      itemName: "Night Sakura",
      rarity: "Rare",
      desc: "They're even prettier at night.",
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
      track: "ice-city",
    },

    "Night View": {
      itemName: "Night View",
      rarity: "Rare",
      desc: "They say that the werewolf slime emerges every full moon. Watch out!",
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
      track: "ice-city",
    },

    "Ocean City": {
      itemName: "Ocean City",
      rarity: "Rare",
      desc: "One look at the skyscrapers and beach and you know it's expensive.",
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
      track: "forest-mountains",
    },

    "Orange Desert": {
      itemName: "Orange Desert",
      rarity: "Rare",
      desc: "Nothing but land and sand. Don't know why you'd want to live here.",
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
      track: "sandy-ruins",
    },

    "Orange Sunset": {
      itemName: "Orange Sunset",
      rarity: "Rare",
      desc: "The vibrant sun casts a warm glow on the glittering landscape.",
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
      track: "sandy-ruins",
    },

    "Pillar Space": {
      itemName: "Pillar Space",
      rarity: "Rare",
      desc: "It looks almost as if someone tore a hole in space. It sure looks cool though.",
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
      track: "pillar-space",
    },

    "Pink Candy": {
      itemName: "Pink Candy",
      rarity: "Rare",
      desc: "Yummy, yummy, yummy, yummy, yummy. It's YUMMY!",
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
      track: "forest-jungle",
    },

    "Pink Pyramid": {
      itemName: "Pink Pyramid",
      rarity: "Rare",
      desc: "It's rumored that this pyramid was built by ancient alien slimes. I wonder why?",
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
      track: "sandy-ruins",
    },

    "Rainy City": {
      itemName: "Rainy City",
      rarity: "Rare",
      desc: "It's soothing to listen to the sound of rain. You should try it sometime.",
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
      track: "ice-city",
    },

    "Rainy Forest": {
      itemName: "Rainy Forest",
      rarity: "Rare",
      desc: "Wet socks are the worst. Luckily, slimes don't wear them.",
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
      track: "ice-city",
    },

    "Rainy Town": {
      itemName: "Rainy Town",
      rarity: "Rare",
      desc: "This is what it's ACTUALLY like living by the ocean. It's not all tropical beaches and sunshine.",
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
      track: "ice-city",
    },

    "Red Space": {
      itemName: "Red Space",
      rarity: "Rare",
      desc: "It's eerily quiet here. I wonder what's behind those mountains.",
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
      track: "pillar-space",
    },

    // CHANGE UP COLOR PALETTE AND TRACKS OF THESE BELOW

    "Sandy Ruins": {
      itemName: "Sandy Ruins",
      rarity: "Rare",
      desc: "The ruins of an ancient civilization. A dangerous place to be, but fit for adventure.",
      isBg: true,
      pfp: "sandy-ruins.png",
      bg: "sandy-ruins.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#e0bba2",
      primary2: "#bd9479",
      secondary1: "#7a5a42",
      secondary2: "#4d3625",
      white: "#faf6f2",
      grey: "#aba39b",
      black: "#0a0704",
      text1: "#f5efe9",
      text2: "#f5efe9",
      track: "sandy-ruins",
    },

    "Stony Beach": {
      itemName: "Stony Beach",
      rarity: "Rare",
      desc: "You know that feeling you get when you step on rocks while at the beach? Yeah, that's what this is.",
      isBg: true,
      pfp: "stony-beach.png",
      bg: "stony-beach.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#97d651",
      primary2: "#6ba621",
      secondary1: "#CBF9EC",
      secondary2: "#ECC23E",
      white: "#F1FDFC",
      grey: "#E1E5E4",
      black: "#000000",
      text1: "#e8fad2",
      text2: "#c9d9b6",
      track: "forest-mountains",
    },

    "Thunder City": {
      itemName: "Thunder City",
      rarity: "Rare",
      desc: "Some people hate the rain. Most people hate standing in a thunderstorm. But not you apparently.",
      isBg: true,
      pfp: "thunder-city.png",
      bg: "thunder-city.png",
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
      track: "ice-city",
    },

    "Underwater Shipwreck": {
      itemName: "Underwater Shipwreck",
      rarity: "Rare",
      desc: "It's said that this ship was once belonged to the legendary pirate slime, Captain Slimebeard.",
      isBg: true,
      pfp: "underwater-shipwreck.png",
      bg: "underwater-shipwreck.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#3d428a",
      primary2: "#262875",
      secondary1: "#1A1C74",
      secondary2: "#2F64B5",
      white: "#FEFEFD",
      grey: "#C3BDE8",
      black: "#07071B",
      text1: "#ccffff",
      text2: "#ccffff",
      track: "magma-caverns",
    },

    "Underwater Ruins": {
      itemName: "Underwater Ruins",
      rarity: "Rare",
      desc: "A shrine for Poslimedon, slime of the sea.",
      isBg: true,
      pfp: "underwater-ruins.png",
      bg: "underwater-ruins.png",
      buyPrice: 1000,
      buyCurrency: 0,
      primary1: "#3d428a",
      primary2: "#262875",
      secondary1: "#1A1C74",
      secondary2: "#2F64B5",
      white: "#FEFEFD",
      grey: "#C3BDE8",
      black: "#07071B",
      text1: "#ccffff",
      text2: "#ccffff",
      track: "magma-caverns",
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

  slimes: {
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
    "Ice Cream Slime": {
      slimeName: "Ice Cream Slime",
      pfp: "ice-cream-slime.png",
      spritesheet: "ice-cream-slime.png",
      static: "ice-cream-slime.png",
    },
    "Bubble Slime": {
      slimeName: "Bubble Slime",
<<<<<<< HEAD
      pfp: 'bubble-slime.png',
=======
      pfp: "bubble-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "bubble-slime.png",
      static: "bubble-slime.png",
    },
    "Cat Slime": {
      slimeName: "Cat Slime",
<<<<<<< HEAD
      pfp: 'cat-slime.png',
=======
      pfp: "cat-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "cat-slime.png",
      static: "cat-slime.png",
    },
    "Cherry Slime": {
      slimeName: "Cherry Slime",
<<<<<<< HEAD
      pfp: 'cherry-slime.png',
=======
      pfp: "cherry-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "cherry-slime.png",
      static: "cherry-slime.png",
    },
    "Cool Slime": {
      slimeName: "Cool Slime",
<<<<<<< HEAD
      pfp: 'cool-slime.png',
=======
      pfp: "cool-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "cool-slime.png",
      static: "cool-slime.png",
    },
    "Earth Slime": {
      slimeName: "Earth Slime",
<<<<<<< HEAD
      pfp: 'earth-slime.png',
=======
      pfp: "earth-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "earth-slime.png",
      static: "earth-slime.png",
    },
    "Electric Slime": {
      slimeName: "Electric Slime",
<<<<<<< HEAD
      pfp: 'electric-slime.png',
=======
      pfp: "electric-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "electric-slime.png",
      static: "electric-slime.png",
    },
    "Fire Slime": {
      slimeName: "Fire Slime",
<<<<<<< HEAD
      pfp: 'fire-slime.png',
=======
      pfp: "fire-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "fire-slime.png",
      static: "fire-slime.png",
    },
    "Flower Slime": {
      slimeName: "Flower Slime",
<<<<<<< HEAD
      pfp: 'flower-slime.png',
=======
      pfp: "flower-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "flower-slime.png",
      static: "flower-slime.png",
    },
    "Frost Slime": {
      slimeName: "Frost Slime",
<<<<<<< HEAD
      pfp: 'frost-slime.png',
=======
      pfp: "frost-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "frost-slime.png",
      static: "frost-slime.png",
    },
    "Glass Slime": {
      slimeName: "Glass Slime",
<<<<<<< HEAD
      pfp: 'glass-slime.png',
=======
      pfp: "glass-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "glass-slime.png",
      static: "glass-slime.png",
    },
    "Glow Slime": {
      slimeName: "Glow Slime",
<<<<<<< HEAD
      pfp: 'glow-slime.png',
=======
      pfp: "glow-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "glow-slime.png",
      static: "glow-slime.png",
    },
    "Hypno Slime": {
<<<<<<< HEAD
      slimeName: "Hypbo Slime",
      pfp: 'hypno-slime.png',
=======
      slimeName: "Hypno Slime",
      pfp: "hypno-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "hypno-slime.png",
      static: "hypno-slime.png",
    },
    "Jello Slime": {
      slimeName: "Jello Slime",
<<<<<<< HEAD
      pfp: 'jello-slime.png',
=======
      pfp: "jello-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "jello-slime.png",
      static: "jello-slime.png",
    },
    "Lava Slime": {
      slimeName: "Lava Slime",
<<<<<<< HEAD
      pfp: 'lava-slime.png',
      spritesheet: "lava-slime.png",
      static: "lava-slime.png",
    },
    "Metal Slime": {
      slimeName: "Metal Slime",
      pfp: 'metal-slime.png',
=======
      pfp: "lava-slime.png",
      spritesheet: "lava-slime.png",
      static: "lava-slime.png",
    },
    "Mercury Slime": {
      slimename: "Mercury Slime",
      pfp: "mercury-slime.png",
      spritesheet: "mercury-slime.png",
      static: "mercury-slime.png",
    },
    "Metal Slime": {
      slimeName: "Metal Slime",
      pfp: "metal-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "metal-slime.png",
      static: "metal-slime.png",
    },
    "Pineapple Slime": {
      slimeName: "Pineapple Slime",
<<<<<<< HEAD
      pfp: 'pineapple-slime.png',
=======
      pfp: "pineapple-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "pineapple-slime.png",
      static: "pineapple-slime.png",
    },
    "Pixel Slime": {
      slimeName: "Pixel Slime",
<<<<<<< HEAD
      pfp: 'pixel-slime.png',
=======
      pfp: "pixel-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "pixel-slime.png",
      static: "pixel-slime.png",
    },
    "Rock Slime": {
      slimeName: "Rock Slime",
<<<<<<< HEAD
      pfp: 'rock-slime.png',
=======
      pfp: "rock-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "rock-slime.png",
      static: "rock-slime.png",
    },
    "Sleepy Slime": {
      slimeName: "Sleepy Slime",
<<<<<<< HEAD
      pfp: 'sleepy-slime.png',
=======
      pfp: "sleepy-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "sleepy-slime.png",
      static: "sleepy-slime.png",
    },
    "Sparkle Slime": {
      slimeName: "Sparkle Slime",
<<<<<<< HEAD
      pfp: 'sparkle-slime.png',
=======
      pfp: "sparkle-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "sparkle-slime.png",
      static: "sparkle-slime.png",
    },
    "Spike Slime": {
      slimeName: "Spike Slime",
<<<<<<< HEAD
      pfp: 'spike-slime.png',
=======
      pfp: "spike-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "spike-slime.png",
      static: "spike-slime.png",
    },
    "Strawbunny Slime": {
      slimeName: "Strawbunny Slime",
<<<<<<< HEAD
      pfp: 'strawbunny-slime.png',
=======
      pfp: "strawbunny-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "strawbunny-slime.png",
      static: "strawbunny-slime.png",
    },
    "Tanuki Slime": {
      slimeName: "Tanuki Slime",
<<<<<<< HEAD
      pfp: 'tanuki-slime.png',
=======
      pfp: "tanuki-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "tanuki-slime.png",
      static: "tanuki-slime.png",
    },
    "Water Slime": {
      slimeName: "Water Slime",
<<<<<<< HEAD
      pfp: 'water-slime.png',
=======
      pfp: "water-slime.png",
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
      spritesheet: "water-slime.png",
      static: "water-slime.png",
    },
    "Whale Slime": {
      slimeName: "Whale Slime",
<<<<<<< HEAD
      pfp: 'whale-slime.png',
      spritesheet: "whale-slime.png",
      static: "whale-slime.png",
    },
    "Acid Slime": {
      slimeName: "Acid Slime",
      pfp: 'acid-slime.png',
      spritesheet: "acid-slime.png",
      static: "acid-slime.png",
    },
    "Block Slime": {
      slimeName: "Block Slime",
      pfp: 'block-slime.png',
      spritesheet: "block-slime.png",
      static: "block-slime.png",
    },
    "Neon Slime": {
      slimeName: "Neon Slime",
      pfp: 'neon-slime.png',
      spritesheet: "neon-slime.png",
      static: "neon-slime.png",
    },
    "Octopus Slime": {
      slimeName: "Octopus Slime",
      pfp: 'octopus-slime.png',
      spritesheet: "octopus-slime.png",
      static: "octopus-slime.png",
    },
    "Prismatic Slime": {
      slimeName: "Prismatic Slime",
      pfp: 'prismatic-slime.png',
      spritesheet: "prismatic-slime.png",
      static: "prismatic-slime.png",
    },
    "Robot Slime": {
      slimeName: "Robot Slime",
      pfp: 'robot-slime.png',
      spritesheet: "robot-slime.png",
      static: "robot-slime.png",
    },
    "Sakura Slime": {
      slimeName: "Sakura Slime",
      pfp: 'sakura-slime.png',
      spritesheet: "sakura-slime.png",
      static: "sakura-slime.png",
    },
    "Silver Slime": {
      slimeName: "Silver Slime",
      pfp: 'silver-slime.png',
      spritesheet: "silver-slime.png",
      static: "silver-slime.png",
    },
    "Vantablack Slime": {
      slimeName: "Vantablack Slime",
      pfp: 'vantablack-slime.png',
      spritesheet: "vantablack-slime.png",
      static: "ventablack-slime.png",
=======
      pfp: "whale-slime.png",
      spritesheet: "whale-slime.png",
      static: "whale-slime.png",
    },

    // Epic and legendary slimes

    "Acid Slime": {
      slimeName: "Acid Slime",
      pfp: "acid-slime.png",
      spritesheet: "acid-slime.png",
      static: "acid-slime.png",
      abilityName: "Fallout",
      abilityDesc: [
        "All other active slimes gain 10 GP.",
        "All other active slimes gain 20 GP.",
        "All other active slimes gain 30 GP.",
      ],
    },
    "Block Slime": {
      slimeName: "Block Slime",
      pfp: "block-slime.png",
      spritesheet: "block-slime.png",
      static: "block-slime.png",
      abilityName: "6 Face",
      abilityDesc: [
        "16.66 percent chance to produce 2x base GP.",
        "16.66 percent chance to produce 4x base GP.",
        "16.66 percent chance to produce 6x base GP.",
      ],
    },
    "Neon Slime": {
      slimeName: "Neon Slime",
      pfp: "neon-slime.png",
      spritesheet: "neon-slime.png",
      static: "neon-slime.png",
      abilityName: "Fluorescent",
      abilityDesc: [
        "All other active slimes gain 8 percent more base GP.",
        "All other active slimes gain 12 percent more base GP.",
        "All other active slimes gain 16 percent more base GP.",
      ],
    },
    "Octopus Slime": {
      slimeName: "Octopus Slime",
      pfp: "octopus-slime.png",
      spritesheet: "octopus-slime.png",
      static: "octopus-slime.png",
      // TODO: Octopus slime ability
    },
    "Prismatic Slime": {
      slimeName: "Prismatic Slime",
      pfp: "prismatic-slime.png",
      spritesheet: "prismatic-slime.png",
      static: "prismatic-slime.png",
      abilityName: "Rainbow",
      abilityDesc: [
        "This slime can count as any rarity for roster bonuses.",
        "Roster bonus 10 percent more effective.",
        "Roster bonus 20 percent more effective.",
      ],
    },
    "Robo Slime": {
      slimeName: "Robo Slime",
      pfp: "robo-slime.png",
      spritesheet: "robo-slime.png",
      static: "robo-slime.png",
      abilityName: "Compute",
      abilityDesc: [
        "Gain 1 GP for every plus level on all active slimes.",
        "Gain 2 GP for every plus level on all active slimes.",
        "Gain 3 GP for every plus level on all active slimes.",
      ],
    },
    "Sakura Slime": {
      slimeName: "Sakura Slime",
      pfp: "sakura-slime.png",
      spritesheet: "sakura-slime.png",
      static: "sakura-slime.png",
      abilityName: "Blossom",
      abilityDesc: [
        "Highest base GP slime gains + 25 percent GP.",
        "Highest base GP slime gains + 40 percent GP.",
        "50 percent for the highest base GP slime to gain 100 percent GP (If not, 50 percent).",
      ],
    },
    "Silver Slime": {
      slimeName: "Silver Slime",
      pfp: "silver-slime.png",
      spritesheet: "silver-slime.png",
      static: "silver-slime.png",
      abilityName: "Sterling",
      abilityDesc: [
        "Total GP increased by 7.5 percent.",
        "25 percent to gain 92.5 GP.",
        "25 percent to gain 92.5 GP.",
      ],
    },
    "Vantablack Slime": {
      slimeName: "Vantablack Slime",
      pfp: "vantablack-slime.png",
      spritesheet: "vantablack-slime.png",
      static: "vantablack-slime.png",
      abilityName: "Shadow",
      abilityDesc: [
        "Base GP of all other slimes is increased by 10 percent (rounded up to whole number).",
        "Base GP of all other slimes is increased by 20 percent (rounded up to whole number).",
        "Base GP of all other slimes is increased by 40 percent (rounded up to whole number).",
      ],
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
    },
    "Lucky Slime": {
      slimeName: "Lucky Slime",
      pfp: "lucky-slime.png",
      spritesheet: "lucky-slime.png",
      static: "lucky-slime.png",
      abilityName: "Charm",
      abilityDesc: [
        "25% chance to produce double this slime's GP.",
        "50% chance to produce double this slime's GP.",
        "50% chance to produce double this slime's GP. 25% chance to double the GP of all other active slimes.",
      ],
    },
    "Gold Slime": {
      slimeName: "Gold Slime",
      pfp: "gold-slime.png",
      spritesheet: "gold-slime.png",
      static: "gold-slime.png",
      abilityName: "24K",
      abilityDesc: [
        "GP increased by 24 percent.",
        "24 percent to gain 240 GP.",
        "24 percent to gain 777 GP.",
      ],
      effects: "This slime's max level is 1 and has 100 base production.",
    },
    "Black Hole Slime": {
      slimeName: "Black Hole Slime",
      pfp: "black-hole-slime.png",
      spritesheet: "black-hole-slime.png",
      static: "black-hole-slime.png",
      abilityName: "Singularity",
      abilityDesc: [
        "Its GP is equivalent to 100 percent of total base GP of all other active slimes.",
        "Every plus level on all other active slimes causes an increase of 2 percent to the total base GP this slime absorbs.",
        "Every plus level on this slime causes an increase of 5 percent to the base GP the slime absorbs.",
      ],
      effects: "This slime's max level is 1 and has 0 base production.",
    },
    "Iridescent Slime": {
      slimeName: "Iridescent Slime",
      pfp: "iridescent-slime.png",
      spritesheet: "iridescent-slime.png",
      static: "iridescent-slime.png",
      abilityName: "Flex",
      abilityDesc: [
        "All active slimes can count as any rarity for roster bonuses.",
        "All other unique rarity (Only one on the roster with that rarity) slimes get 50 percent more GP",
        "50 percent for the roster bonus to be 80 percent more effective.",
      ],
    },
    "Scholar Slime": {
      slimeName: "Scholar Slime",
      pfp: "scholar-slime.png",
      spritesheet: "scholar-slime.png",
      static: "scholar-slime.png",
      abilityName: "Wisdom",
      abilityDesc: [
        "Scholar Slime gains 2 percent more GP for all plus levels on all other active slimes.",
        "All other active slimes gain 2 extra GP per level (1 for common) (3 for epic/legendary).",
        "Total GP production increased by 1 percent for all plus levels on all active slimes.",
      ],
      effects: "This slime's max level is 20 and has 0 base production.",
    },
    "Gold Slime": {
      slimeName: "Gold Slime",
      pfp: 'gold-slime.png',
      spritesheet: "gold-slime.png",
      static: "gold-slime.png",
    },
    "Iridiscent Slime": {
      slimeName: "Irdiscent Slime",
      pfp: 'iridiscent-slime.png',
      spritesheet: "iridiscent-slime.png",
      static: "iridiscent-slime.png",
    },
    "Scholar Slime": {
      slimeName: "Scholar Slime",
      pfp: 'scholar-slime.png',
      spritesheet: "scholar-slime.png",
      static: "scholar-slime.png",
    },
    "Nebula Slime": {
      slimeName: "Nebula Slime",
      pfp: "nebula-slime.png",
      spritesheet: "nebula-slime.png",
      static: "nebula-slime.png",
      abilityName: "Cosmic",
      abilityDesc: [
        "Bonus levels for all other active slimes are 2x more effective.",
        "Bonus levels for all other active slimes are 3x more effective.",
        "Bonus levels for all other active slimes are 3x more effective. 42% chance for bonus levels for all other active slimes to be 5x more effective instead of 3x.",
      ],
    },
  },

  // Slime data
  raritySlimes: {
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
      {
        slimeName: "Cat Slime",
      },
      {
        slimeName: "Cherry Slime",
      },
      {
        slimeName: "Earth Slime",
      },
      {
        slimeName: "Fire Slime",
      },
      {
        slimeName: "Flower Slime",
      },
      {
        slimeName: "Hypno Slime",
      },
      {
        slimeName: "Jello Slime",
      },
      {
        slimeName: "Pineapple Slime",
      },
      {
        slimeName: "Pixel Slime",
      },
      {
        slimeName: "Rock Slime",
      },
      {
        slimeName: "Strawbunny Slime",
      },
      {
        slimeName: "Tanuki Slime",
      },
      {
        slimeName: "Water Slime",
      },
      {
        slimeName: "Whale Slime",
      },
    ],

    Rare: [
      {
        slimeName: "Ice Cream Slime",
      },
      {
        slimeName: "Bubble Slime",
      },
      {
        slimeName: "Sleepy Slime",
      },
      {
        slimeName: "Sparkle Slime",
      },
      {
        slimeName: "Spike Slime",
      },
      {
        slimeName: "Frost Slime",
      },
      {
        slimeName: "Glass Slime",
      },
      {
        slimeName: "Cool Slime",
      },
      {
        slimeName: "Electric Slime",
      },
      {
        slimeName: "Glow Slime",
      },
      {
        slimeName: "Lava Slime",
      },
      {
        slimeName: "Metal Slime",
      },
    ],
    Epic: [
      {
        slimeName: "Lucky Slime",
      },
      {
        slimeName: "Prismatic Slime",
      },
      {
        slimeName: "Acid Slime",
      },
      {
        slimeName: "Vantablack Slime",
      },
      {
        slimeName: "Silver Slime",
      },
      {
        slimeName: "Block Slime",
      },
      {
        slimeName: "Robo Slime",
      },
      {
        slimeName: "Neon Slime",
      },
      {
        slimeName: "Sakura Slime",
      },
      {
        slimeName: "Hypno Slime",
        abilityName: "Brainwash",
        abilityDesc: [
          "Gain GP equal to 20 percent of the slime with the highest active base GP.",
          "Gain GP equal to 40 percent of the slime with the highest active base GP.",
          "Gain GP equal to 80 percent of the slime with the highest active base GP.",
        ],
      },
      {
        slimeName: "Prismatic Slime",
        abilityName: "Rainbow",
        abilityDescriptions: [
          "This slime can count as any rarity for roster bonuses.",
          "Roster bonus 10 percent more effective.",
          "Roster bonus 20 percent more effective.",
        ],
      },
      {
        slimeName: "Acid Slime",
        abilityName: "Fallout",
        abilityDescriptions: [
          "All other active slimes gain 10 GP.",
          "All other active slimes gain 20 GP.",
          "All other active slimes gain 30 GP.",
        ],
      },
      {
        slimeName: "Vantablack Slime",
        abilityName: "Shadow",
        abilityDescriptions: [
          "Base GP of all other slimes is increased by 10 percent (rounded up to whole number).",
          "Base GP of all other slimes is increased by 20 percent (rounded up to whole number).",
          "Base GP of all other slimes is increased by 40 percent (rounded up to whole number).",
        ],
      },
      {
        slimeName: "Silver Slime",
        abilityName: "Sterling",
        abilityDescriptions: [
          "Total GP increased by 7.5 percent.",
          "25 percent to gain 92.5 GP.",
          "25 percent to gain 92.5 GP.",
        ],
      },
      {
        slimeName: "Block Slime",
        abilityName: "6 Face",
        abilityDescriptions: [
          "16.66 percent chance to produce 2x base GP.",
          "16.66 percent chance to produce 4x base GP.",
          "16.66 percent chance to produce 6x base GP.",
        ],
      },
      {
        slimeName: "Robo Slime",
        abilityName: "Compute",
        abilityDescriptions: [
          "Gain 1 GP for every plus level on all active slimes.",
          "Gain 2 GP for every plus level on all active slimes.",
          "Gain 3 GP for every plus level on all active slimes.",
        ],
      },
      {
        slimeName: "Neon Slime",
        abilityName: "Fluorescent",
        abilityDescriptions: [
          "All other active slimes gain 8 percent more base GP.",
          "All other active slimes gain 12 percent more base GP.",
          "All other active slimes gain 16 percent more base GP.",
        ],
      },
      {
        slimeName: "Sakura Slime",
        abilityName: "Blossom",
        abilityDescriptions: [
          "Highest base GP slime gains + 25 percent GP.",
          "Highest base GP slime gains + 40 percent GP.",
          "50 percent for the highest base GP slime to gain 100 percent GP (If not, 50 percent).",
        ],
      },
      {
        slimeName: "Hypno Slime",
        abilityName: "Brainwash",
        abilityDescriptions: [
          "Gain GP equal to 20 percent of the slime with the highest active base GP.",
          "Gain GP equal to 40 percent of the slime with the highest active base GP.",
          "Gain GP equal to 80 percent of the slime with the highest active base GP.",
        ],
      },
    ],
    Legendary: [
      {
        slimeName: "Nebula Slime",
<<<<<<< HEAD
        abilityName: "Cosmic",
        abilityDescription: [
          "Bonus levels for all other active slimes are 2x more effective.",
          "Bonus levels for all other active slimes are 3x more effective.",
          "Bonus levels for all other active slimes are 3x more effective. 42% chance for bonus levels for all other active slimes to be 5x more effective instead of 3x.",
        ],
        maxLevel: 10,
      },
      {
        slimeName: "Gold Slime",
        abilityName: "24K",
        abilityDescription: [
          "GP increased by 24 percent.",
          "24 percent to gain 240 GP.",
          "24 percent to gain 777 GP.",
        ],
        maxLevel: 0,
        baseGP: 100,
      },
      {
        slimeName: "Black Hole Slime",
        abilityName: "Singularity",
        abilityDescription: [
          "Its GP is equivalent to 100 percent of total base GP of all other active slimes.",
          "Every plus level on all other active slimes causes an increase of 2 percent to the total base GP this slime absorbs.",
          "Every plus level on this slime causes an increase of 5 percent to the base GP the slime absorbs.",
        ],
        maxLevel: 0,
        baseGP: 0,
      },
      {
        slimeName: "Iridiscent Slime",
        abilityName: "Flex",
        abilityDescription: [
          "All active slimes can count as any rarity for roster bonuses.",
          "All other unique rarity (Only one on the roster with that rarity) slimes get 50 percent more GP",
          "50 percent for the roster bonus to be 80 percent more effective.",
        ],
        maxLevel: 10,
        baseGP: 25,
      },
      {
        slimeName: "Scholar Slime",
        abilityName: "Wisdom",
        abilityDescription: [
          "Scholar Slime gains 2 percent more GP for all plus levels on all other active slimes.",
          "All other active slimes gain 2 extra GP per level (1 for common) (3 for epic/legendary)",
          "Total GP production increased by 1 percent for all plus levels on all active slimes.",
        ],
        maxLevel: 20,
        baseGP: 0,
      },
      // 
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
=======
      },
      {
        slimeName: "Gold Slime",
        maxLevel: 1,
        baseProduction: 100,
      },
      {
        slimeName: "Black Hole Slime",
        maxLevel: 1,
        baseProduction: 0,
      },
      {
        slimeName: "Iridescent Slime",
      },
      {
        slimeName: "Scholar Slime",
        maxLevel: 20,
        baseProduction: 0,
      },
>>>>>>> de3ed96c70003792d4119736b20216817d531fa6
    ],
  },

  // map rarity to colour
  rarityColours: {
    Common: {
      text: "#fff",
      blacktext: "#2B2B2B",
      bord: "common-gradient-border",
      bg: "common-gradient-background",
    },
    Uncommon: {
      text: "#14DC24",
      blacktext: "#105201",
      bord: "uncommon-gradient-border",
      bg: "uncommon-gradient-background",
    },
    Rare: {
      text: "#0061ff",
      blacktext: "#013452",
      bord: "rare-gradient-border",
      bg: "rare-gradient-background",
    },
    Epic: {
      text: "#BC19F7",
      blacktext: "#430152",
      bord: "epic-gradient-border",
      bg: "epic-gradient-background",
    },
    Legendary: {
      text: "#F7E818",
      blacktext: "#524101",
      bord: "legendary-gradient-border",
      bg: "legendary-gradient-background",
    },
  },
};
