import { gameData } from "../../../data/gameData";
import { authenticate } from "../../../utils/authenticate";
import { checkUserType } from "../../../utils/checkUserType";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import Slime from "../../../models/slimeModel";
import { areDifferentDays } from "../../../utils/areDifferentDays";

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

    // if (
    //   user.lastSlimeRewards &&
    //   !areDifferentDays(new Date(user.lastSlimeRewards), new Date())
    // ) {
    //   return res.status(400).json({ message: "Rewards already claimed today" });
    // }

    const rewardMessages = [];
    const rewards = await fetchRewardsForUser(user, rewardMessages);

    user.slimeGel += rewards;
    await User.findByIdAndUpdate(user._id, {
      lastSlimeRewards: new Date(),
      slimeGel: user.slimeGel,
    });

    res.status(200).json({
      lastSlimeRewards: user.lastSlimeRewards,
      slimeGel: user.slimeGel,
      rewardMessages,
      rewards,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function fetchRewardsForUser(user, rewardMessages) {
  const foundUser = await User.findById(user._id).exec();
  if (!foundUser) {
    throw new Error("User not found");
  }
  const rewards = await fetchRewardsBasedOnRoster(
    foundUser.roster,
    rewardMessages
  );

  return rewards;
}

// roster bonus, for each day/week if you have e.g 2 rares, 1 epic, 1 legendary in your active roster
// you get a roster bonus. Check if the user has a roster bonus, if so, add it to res and give a message
// if (rosterBonus) { rewardMessages.push({slimeName: "rosterBonus", message: "Roster bonus activated!" }); }
// just check from the frontend, if slimeName === rosterBonus put an image of a star instead of slime
var rosterBonus = false;
var rainbowStarAbility = false;
var rosterBonusPercent = 0;
var rosterBonusGP = 100;
//var rosterBonusReq = ["Uncommon", "Rare", "Epic", "Legendary"]; // will be a given value
var rosterBonusReq = [0, 1, 1, 1, 1]; // converting it like this is easier
async function fetchRewardsBasedOnRoster(roster, rewardMessages) {
  let res = 0;
  let slimes = [];
  let baseProd = []; // to handle abilities that increase the production
  let abilityProd = [0, 0, 0, 0]; // production from abilities so they don't stack
  let rosterRarities = [0, 0, 0, 0, 0];
  for (let i = 0; i < roster.length; i++) {
    if (roster[i] === null) {
      continue;
    }
    const slime = await Slime.findById(roster[i]._id);
    slimes[i] = slime;
    baseProd[i] = slime.baseProduction;
    // handle roster rarities
    if (slime.rarity === "Common") {
      rosterRarities[0]++;
    } else if (slime.rarity === "Uncommon") {
      rosterRarities[1]++;
    } else if (slime.rarity === "Rare") {
      rosterRarities[2]++;
    } else if (slime.rarity === "Epic") {
      rosterRarities[3]++;
    } else if (slime.rarity === "Legendary") {
      rosterRarities[4]++;
    }
  }

  checkNebula(slimes, rewardMessages);
  // check slimes for abilities give add ons
  for (let i = 0; i < slimes.length; i++) {
    console.log(slimes[i].slimeName);
    abilityChangeBaseProd(
      slimes[i],
      slimes,
      baseProd,
      abilityProd,
      i,
      rewardMessages
    );
  }
  for (let i = 0; i < slimes.length; i++) {
    res +=
      slimes[i].baseProduction + abilityProd[i] + slimes[i].bonusProduction;
  }
  // check roster bonus with rainbow abilities
  let flag = true;
  let need = [0, 0, 0, 0, 0];
  for (let i = 0; i < rosterRarities.length; i++) {
    let diff = rosterRarities[i] - rosterBonusReq[i];
    if (diff < 0) {
      flag = false;
    }
    need[i] = -diff;
  }
  if (flag) {
    rosterBonus = true;
  } else if (!flag && rainbowStarAbility && need[3] < 0) {
    let total_need = 0;
    for (let i = 0; i < need.length; i++) {
      total_need += need[i];
    }
    if (total_need > 1) {
      rosterBonus = false;
    } else {
      rosterBonus = true;
    }
  }
  if (rosterBonus) {
    let totalRosterBonus = rosterBonusGP * (1 + rosterBonusPercent);
    res += totalRosterBonus;
    rewardMessages.push({
      slimeName: "rosterBonus",
      message: "Roster bonus activated! +" + totalRosterBonus + " GP!",
    });
  }
  return res;
}

// Nebula Slime Star Level Abilities: Plus levels for all other active slimes are (2, 3, 5)x more effective
// first check if this activated and get the multiplier
// add this multiplier for Robo, Black Hole, and Scholar.
var bonusLvlMultiplier = 1;
function checkNebula(slimes, rewardMessages) {
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
          rewardMessages.push({
            slimeName: "Nebula Slime",
            message:
              "Nebula Slime Star Level 3 chance ability activated! All other active slimes' bonus levels are 5x more effective!",
          });
        } else {
          bonusLvlMultiplier = 3;
        }
      }
      break;
    }
  }
}

// calculate the gel production with
function abilityChangeBaseProd(
  slime,
  slimes,
  baseProd,
  abilityProd,
  id,
  rewardMessages
) {
  // test
  rewardMessages.push({
    slimeName: slime.slimeName,
    message: "Ability activated!",
  });

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
        rainbowStarAbility = true;
      }
      if (starLevel === 2) {
        rosterBonusPercent = 0.1;
      } else if (starLevel === 3) {
        rosterBonusPercent = 0.2;
      }
      break;
    case "Lucky Slime":
      // could put it in one if statement but this is more readable
      if (starLevel === 1 && rand <= 0.25) {
        abilityProd[id] += 2 * baseProd[id];
        rewardMessages.push({
          slimeName: "Lucky Slime",
          message:
            "Lucky Slime Star Level 1 chance ability activated! Gel production doubled!",
        });
      } else if (starLevel >= 2 && rand <= 0.5) {
        abilityProd[id] += 2 * baseProd[id];
        rewardMessages.push({
          slimeName: "Lucky Slime",
          message:
            "Lucky Slime Star Level 2 chance ability activated! Gel production doubled!",
        });
      }
      if (starLevel === 3 && rand <= 0.25) {
        for (let i = 0; i < abilityProd.length; i++) {
          abilityProd[i] += 2 * baseProd[i];
        }
        rewardMessages.push({
          slimeName: "Lucky Slime",
          message:
            "Lucky Slime Star Level 3 chance ability activated! Gel production doubled for all active slimes!",
        });
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
        rewardMessages.push({
          slimeName: "Slive Slime",
          message:
            "Slive Slime Star Level 2 chance ability activated! Gain 92GP!",
        });
      } else if (starLevel === 3 && rand <= 0.75) {
        abilityProd[id] += 92;
        rewardMessages.push({
          slimeName: "Silver Slime",
          message:
            "Silver Slime Star Level 3 chance ability activated! Gain 92!",
        });
      }
      break;
    case "Block Slime":
      if (rand > 0.1666) break;
      if (starLevel === 1) {
        abilityProd[id] += 2 * baseProd[id];
        rewardMessages.push({
          slimeName: "Block Slime",
          message:
            "Block Slime Star Level 1 chance ability activated! 2x gel production!",
        });
      } else if (starLevel === 2) {
        abilityProd[id] += 4 * baseProd[id];
        rewardMessages.push({
          slimeName: "Block Slime",
          message:
            "Block Slime Star Level 2 chance ability activated! 4x gel production!",
        });
      } else if (starLevel === 3) {
        abilityProd[id] += 6 * baseProd[id];
        rewardMessages.push({
          slimeName: "Block Slime",
          message:
            "Block Slime Star Level 3 chance ability activated! 6x gel production!",
        });
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
          rewardMessages.push({
            slimeName: "Sakura Slime",
            message:
              "Sakura Slime Star Level 3 chance ability activated! Gain 100% gel production from your highest base GP active slime!",
          });
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
        rewardMessages.push({
          slimeName: "Golden Slime",
          message:
            "Golden Slime Star Level 1 chance ability activated! Gain 240GP!",
        });
      } else if (starLevel === 3 && rand <= 0.24) {
        abilityProd[id] += 777;
        rewardMessages.push({
          slimeName: "Golden Slime",
          message:
            "Golden Slime Star Level 2 chance ability activated! Gain 777GP!",
        });
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
        let scholarPercent = 0;
        for (let i = 0; i < slimes.length; i++) {
          scholarPercent += slimes[i].bonusLevel * bonusLvlMultiplier;
        }
        abilityProd[id] += Math.round(totalGP * (scholarPercent / 100));
      }
      break;
    case "Iridescent Slime":
      if (starLevel >= 1) {
        // Flex: All active slimes can count as any rarity for roster bonuses
        // meaning get roster bonus no matter what
        rosterBonus = true;
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
        if (rand <= 0.5) {
          rosterBonusPercent = 0.8;
          rewardMessages.push({
            slimeName: "Iridescent Slime",
            message:
              "Iridescent Slime Star Level 3 chance ability activated! Roster bonus is 80% more effective!",
          });
        }
      }
      break;
  }
}
