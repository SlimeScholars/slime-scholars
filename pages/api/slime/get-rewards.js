import { gameData } from "../../../data/gameData";
import { authenticate } from "../../../utils/authenticate";
import { checkUserType } from "../../../utils/checkUserType";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import Slime from "../../../models/slimeModel";

export default async function (req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method`);
    }

    // Connect to the database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure the user is a student
    checkUserType(user, 1);

    if (
      user.lastSlimeRewards &&
      isSameDay(new Date(user.lastSlimeRewards), new Date())
    ) {
      return res.status(400).json({ message: "Rewards already claimed today" });
    }
    await User.findByIdAndUpdate(user._id, {
      lastSlimeRewards: new Date(),
    });

    // Assuming you want to fetch rewards for the user's roster or perform some other logic
    const rewards = await fetchRewardsForUser(user);

    // Send a successful response with the rewards
    res.status(200).json({ rewards });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

function isSameDay(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

async function fetchRewardsForUser(user) {
  const foundUser = await User.findById(user._id).exec();
  if (!foundUser) {
    throw new Error("User not found");
  }
  const rewards = await fetchRewardsBasedOnRoster(foundUser.roster);
  console.log("rewards " + rewards);

  return rewards;
}

async function fetchRewardsBasedOnRoster(roster) {
  let res = 0;
  let slimes = [];
  let baseProd = []; // to handle abilities that increase the production
  let abilityProd = [0, 0, 0, 0]; // production from abilities so they don't stack
  for (let i = 0; i < roster.length; i++) {
    if (roster[i] === null) {
      continue;
    }
    const slime = await Slime.findById(roster[i]._id);
    slimes[i] = slime;
    baseProd[i] = slime.baseProduction;
  }
  checkNebula(slimes);
  // check slimes for abilities give add ons
  for (let i = 0; i < slimes.length; i++) {
    abilityChangeBaseProd(slimes[i], slimes, baseProd, abilityProd, i);
  }
  for (let i = 0; i < slimes.length; i++) {
    res +=
      slimes[i].baseProduction + abilityProd[i] + slimes[i].bonusProduction;
  }
  return res;
}

// checking Rainbow ability, which rarity should Prismatic slime count as?
// rarity only affects Iridescent Slime (Star Level 2: +50% GP production for each unique rarity)
// maximizing GP:

// Nebula Slime Star Level Abilities: Plus levels for all other active slimes are (2, 3, 5)x more effective
// first check if this activated and get the multiplier
// add this multiplier for Robo, Black Hole, and Scholar.
var bonusLvlMultiplier = 1;
function checkNebula(slimes) {
  const rand = Math.random();
  for (let i = 0; i < slimes.length; i++) {
    if (slimes[i].slimeName === "Nebula Slime") {
      if (starLevel === 1) {
        bonusLvlMultiplier = 2;
      } else if (starLevel === 2) {
        bonusLvlMultiplier = 3;
      } else if (starLevel === 3) {
        if (rand <= 0.42) {
          bonusLvlMultiplier = 5;
        } else {
          bonusLvlMultiplier = 3;
        }
      }
      break;
    }
  }
}

// calculate the gel production with
function abilityChangeBaseProd(slime, slimes, baseProd, abilityProd, id) {
  if (
    slime.rarity === "Common" ||
    slime.rarity === "Uncommon" ||
    slime.rarity === "Rare"
  ) {
    return;
  }
  const starLevel = slime.starLevel;
  const rand = Math.random();
  let maxGP = 0;
  let maxID = 0;
  for (let i = 0; i < baseProd.length; i++) {
    if (baseProd[i] > maxGP) {
      maxGP = baseProd[i];
      maxID = i;
    }
  }
  let totalGP = 0;
  for (let i = 0; i < slimes.length; i++) {
    totalGP += slimes[i].baseProduction;
  }
  switch (slime.slimeName) {
    case "Prismatic Slime":
      if (starLevel >= 1) {
        // Rainbow: This slime can count as any rarity for roster bonuses
      }
      if (starLevel === 2) {
        // Roster bonus 10 percent more effective
      } else if (starLevel === 3) {
        // Roster bonus 20 percent more effective
      }
      break;
    case "Lucky Slime":
      // could put it in one if statement but this is more readable
      if (starLevel === 1 && rand <= 0.25) {
        abilityProd[id] += 2 * baseProd[id];
      } else if (starLevel === 2 && rand <= 0.5) {
        abilityProd[id] += 2 * baseProd[id];
      } else if (starLevel === 3 && rand <= 0.25) {
        for (let i = 0; i < abilityProd.length; i++) {
          abilityProd[i] += 2 * baseProd[i];
        }
      }
      break;
    case "Nuclear Slime":
      if (starLevel === 1) {
        for (let i = 0; i < abilityProd.length; i++) {
          if (i !== id) {
            abilityProd[i] += 10;
          }
        }
      } else if (starLevel === 2) {
        for (let i = 0; i < abilityProd.length; i++) {
          if (i !== id) {
            abilityProd[i] += 20;
          }
        }
      } else if (starLevel === 3) {
        for (let i = 0; i < abilityProd.length; i++) {
          if (i !== id) {
            abilityProd[i] += 30;
          }
        }
      }
      break;
    case "Vantablack Slime":
      if (starLevel === 1) {
        for (let i = 0; i < baseProd.length; i++) {
          if (i !== id) {
            abilityProd[i] += Math.round(baseProd[i] * 0.1);
          }
        }
      } else if (starLevel === 2) {
        for (let i = 0; i < baseProd.length; i++) {
          if (i !== id) {
            abilityProd[i] += Math.round(baseProd[i] * 0.2);
          }
        }
      } else if (starLevel === 3) {
        for (let i = 0; i < baseProd.length; i++) {
          if (i !== id) {
            abilityProd[i] += Math.round(baseProd[i] * 0.4);
          }
        }
      }
      break;
    case "Silver Slime":
      if (starLevel >= 1) {
        abilityProd[id] += Math.round(totalGP * 1.075);
      }
      if (starLevel === 2 && rand <= 0.25) {
        abilityProd[id] += 92;
      } else if (starLevel === 3 && rand <= 0.75) {
        abilityProd[id] += 92;
      }
      break;
    case "Block Slime":
      if (rand > 0.1666) break;
      if (starLevel === 1) {
        abilityProd[id] += 2 * baseProd[id];
      } else if (starLevel === 2) {
        abilityProd[id] += 4 * baseProd[id];
      } else if (starLevel === 3) {
        abilityProd[id] += 6 * baseProd[id];
      }
      break;
    case "Robo Slime":
      if (starLevel === 1) {
        for (let i = 0; i < slimes.length; i++) {
          abilityProd[id] += slimes[i].bonusLevel * bonusLvlMultiplier;
        }
      } else if (starLevel === 2) {
        for (let i = 0; i < slimes.length; i++) {
          abilityProd[id] += 2 * slimes[i].bonusLevel * bonusLvlMultiplier;
        }
      } else if (starLevel === 3) {
        for (let i = 0; i < slimes.length; i++) {
          abilityProd[id] += 3 * slimes[i].bonusLevel * bonusLvlMultiplier;
        }
      }
      break;
    case "Crystal Slime":
      if (starLevel === 1) {
        for (let i = 0; i < baseProd.length; i++) {
          if (i !== id) {
            abilityProd[i] += Math.round(baseProd[i] * 0.08);
          }
        }
      } else if (starLevel === 2) {
        for (let i = 0; i < baseProd.length; i++) {
          if (i !== id) {
            abilityProd[i] += Math.round(baseProd[i] * 0.12);
          }
        }
      } else if (starLevel === 3) {
        for (let i = 0; i < baseProd.length; i++) {
          if (i !== id) {
            abilityProd[i] += Math.round(baseProd[i] * 0.16);
          }
        }
      }
      break;
    case "Sakura Slime":
      if (starLevel === 1) {
        abilityProd[maxID] += Math.round(baseProd[maxID] * 0.25);
      } else if (starLevel === 2) {
        abilityProd[maxID] += Math.round(baseProd[maxID] * 0.4);
      } else if (starLevel === 3) {
        if (rand <= 0.5) {
          abilityProd[maxID] += baseProd[maxID];
        } else {
          abilityProd[maxID] += Math.round(baseProd[maxID] * 0.5);
        }
      }
      break;
    case "Hypno Slime":
      if (starLevel === 1) {
        abilityProd[id] += Math.round(baseProd[maxID] * 0.2);
      } else if (starLevel === 2) {
        abilityProd[id] += Math.round(baseProd[maxID] * 0.4);
      } else if (starLevel === 3) {
        abilityProd[id] += Math.round(baseProd[maxID] * 0.8);
      }
      break;
    case "Golden Slime":
      if (starLevel >= 1) {
        abilityProd[id] += Math.round(baseProd[id] * 0.24);
      }
      if (starLevel === 2 && rand <= 0.24) {
        abilityProd[id] += 240;
      } else if (starLevel === 3 && rand <= 0.24) {
        abilityProd[id] += 777;
      }
      break;
    case "Black Hole Slime":
      if (starLevel >= 1) {
        for (let i = 0; i < baseProd.length; i++) {
          if (i !== id) {
            abilityProd[i] += baseProd[i];
          }
        }
      }
      if (starLevel === 2) {
        for (let i = 0; i < slimes.length; i++) {
          if (i !== id) {
            abilityProd[id] += Math.round(
              baseProd[i] * (0.02 * slimes[i].bonusLevel * bonusLvlMultiplier)
            );
          }
        }
      } else if (starLevel === 3) {
        for (let i = 0; i < slimes.length; i++) {
          if (i !== id) {
            abilityProd[id] += Math.round(
              baseProd[i] * (0.05 * slimes[i].bonusLevel * bonusLvlMultiplier)
            );
          }
        }
      }
      break;
    case "Scholar Slime":
      if (starLevel >= 1) {
        for (let i = 0; i < slimes.length; i++) {
          if (i !== id) {
            abilityProd[id] += Math.round(
              baseProd[i] * (0.02 * slimes[i].bonusLevel * bonusLvlMultiplier)
            );
          }
        }
      }
      if (starLevel >= 2) {
        for (let i = 0; i < slimes.length; i++) {
          if (i !== id) {
            if (slimes[i].rarity === "Commoon") {
              abilityProd[id] += slimes[i].level;
            } else if (
              slimes[i].rarity === "Uncommon" ||
              slimes[i].rarity === "Rare"
            ) {
              abilityProd[id] += 2 * slimes[i].level;
            } else {
              abilityProd[id] += 3 * slimes[i].level;
            }
          }
        }
      }
      if (starLevel === 3) {
        scholar = true;
        for (let i = 0; i < slimes.length; i++) {
          scholarPercent += slimes[i].bonusLevel * bonusLvlMultiplier;
        }
        abilityProd[id] += Math.round(totalGP * (scholarPercent / 100));
      }
      break;
    case "Iridescent Slime":
      if (starLevel >= 1) {
        // Flex: All active slimes can count as any rarity for roster bonuses
      }
      if (starLevel >= 2) {
        const uniqueRarities = new Set();
        for (let i = 0; i < slimes.length; i++) {
          if (!uniqueRarities.has(slimes[i].rarity)) {
            // right now it gets the first slime of the unique rarity, should get maximum GP slime
            abilityProd[id] += Math.round(baseProd[i] * 0.5);
          }
          uniqueRarities.add(slimes[i].rarity);
        }
      }
      if (starLevel === 3) {
        // 50 percent for the roster bonus to be 80 percent more effective
      }
      break;
  }
}
