import React, { useState } from "react";
import { gameData } from "../../../data/gameData";
import Image from "next/image";

export default function RollSlimePopup({
  updatedSlime,
  setAfterRolling,
  originalSlime,
  router,
  index,
  slimes,
}) {
  if (!updatedSlime) {
    return;
  }

  const maxLevel = updatedSlime.maxLevel;
  const baseProduction = updatedSlime.baseProduction;
  const levelUpCost = updatedSlime.levelUpCost;

  const starLevel = updatedSlime.starLevel;
  const starProgress = updatedSlime.starProgress;
  const bonusLevel = updatedSlime.bonusLevel;
  const bonusProduction = updatedSlime.bonusProduction;

  return (originalSlime === null || originalSlime === undefined) &&
    updatedSlime !== null ? (
    // new slime is created
    <div className="flex flex-col p-4 w-[50rem] text-center items-center ">
      <h3 className="font-galindo text-green-400 text-3xl">
        New Slime Unlocked!
      </h3>
      <Image
        src={
          gameData.slimes[updatedSlime.slimeName]
            ? "/assets/pfp/slimes/" +
              gameData.slimes[updatedSlime.slimeName].pfp
            : ""
        }
        alt={updatedSlime.slimeName}
        height={0}
        width={0}
        sizes="100vw"
        className="w-2/3 h-auto pop-out-element"
      />
      <div className="flex flex-col gap-2 mb-4">
        <p className="font-galindo text-black px-2 text-2xl">
          {updatedSlime.slimeName}
        </p>
        <p
          className="text-2xl"
          style={{ color: gameData.rarityColours[updatedSlime.rarity].text }}
        >
          {updatedSlime.rarity}
        </p>
      </div>
      <div className="flex flex-col pb-4 text-black">
        <p className="text-2xl">Max Level: {maxLevel} Lvl.</p>
        <p className="text-2xl">Base Production: {baseProduction}</p>
        <p className="text-2xl">Level Up Cost: {levelUpCost}</p>
        {
          // Check if starable
          updatedSlime.abilityName && (
            <p className="text-2xl">Ability Name: {updatedSlime.abilityName}</p>
          )
        }
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        {[...Array(slimes.length).keys()].map((item, key) => (
          <div
            key={key}
            className={`w-[10px] h-[10px] rounded-full 
                        ${key == index ? "bg-black" : "bg-slate-500"}`}
          ></div>
        ))}
      </div>
    </div>
  ) : (
    // Duplicate is created
    <div className="flex flex-col p-4 w-[50rem] text-center items-center ">
      <h3 className="font-galindo text-black text-3xl">Slime Upgraded!</h3>
      <Image
        src={
          gameData.slimes[updatedSlime.slimeName]
            ? "/assets/pfp/slimes/" +
              gameData.slimes[updatedSlime.slimeName].pfp
            : ""
        }
        alt={updatedSlime.slimeName}
        height={0}
        width={0}
        sizes="100vw"
        className="w-2/3 h-auto pop-out-element"
      />
      <div className="flex flex-col">
        <p className="font-galindo text-black px-2 text-2xl">
          {updatedSlime.slimeName}
        </p>
        <p
          className="text-2xl"
          style={{ color: gameData.rarityColours[updatedSlime.rarity].text }}
        >
          {updatedSlime.rarity}
        </p>
      </div>
      <div className="grid grid-cols-1 place-content-start pb-4 gap-2 text-black">
        {starLevel !== undefined ? (
          <div>
            <p className="text-2xl">
              {"Star Level: " +
                originalSlime.starLevel +
                "/" +
                originalSlime.maxStarLevel +
                " "}
              &rarr;
              <span className="text-green-400">
                {" " + starLevel + "/" + updatedSlime.maxStarLevel}
              </span>
            </p>
          </div>
        ) : (
          <div />
        )}
        <div>
          {starProgress !== undefined && (
            <p className="text-2xl">
              {"Star Progress: " +
                originalSlime.starProgress +
                "/" +
                originalSlime.maxStarProgress +
                " "}
              &rarr;
              <span className="text-green-400">
                {" " + starProgress + "/" + updatedSlime.maxStarLevel}
              </span>
            </p>
          )}
        </div>
        <div>
          {bonusLevel !== undefined && (
            <p className="text-2xl">
              {"Bonus Level: " + originalSlime.bonusLevel + " "}&rarr;
              <span className="text-green-400">{" " + bonusLevel}</span>
            </p>
          )}
        </div>
        <div>
          {bonusProduction !== undefined && (
            <p className="text-2xl">
              {"Bonus Production: " + originalSlime.bonusProduction + " "}&rarr;
              <span className="text-green-400">{" " + bonusProduction}</span>
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        {[...Array(slimes.length).keys()].map((item, key) => (
          <div
            key={key}
            className={`w-[10px] h-[10px] rounded-full 
                        ${key == index ? "bg-black" : "bg-slate-500"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
