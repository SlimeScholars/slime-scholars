import gameData from "../data/gameData";

// maps name to slime image
// maps pfp background string to actual backgorund image
// maps game background string to actual game background image
export const nameToSlime = () => {
  const slimes = gameData.slimePfps;
  const slimeNames = Object.keys(slimes);
  const slimeImages = Object.values(slimes);
  const nameToSlime = {};
  for (let i = 0; i < slimeNames.length; i++) {
    nameToSlime[slimeNames[i]] = slimeImages[i];
  }

  return nameToSlime;
};
export const nameToPfpBg = () => {};
export const nameToGameBg = () => {};
