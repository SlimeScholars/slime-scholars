import React, { useCallback, useState } from "react";
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

  const opacityProps = useCallback((name) => {
    return {opacity: updatedSlime?.rarity === name ? 1 : 0}
  }, [updatedSlime])

  return (
    <div
      className={`fixed inset-0 w-full h-full flex items-center justify-center`}
    >
      <div className="absolute top-0 left-0 w-screen h-screen overflow-x-hidden">
        <div className="roll-slide z-[-1]">
          <div className="w-screen h-screen common-gradient-background"/>
          <div className="w-screen h-screen common-gradient-background"/>
        </div>

        <div className="roll-slide">
          <div className="w-screen h-screen common-gradient-background"
          style={opacityProps("Common")}/>
          <div className="w-screen h-screen common-gradient-background"
          style={opacityProps("Common")}/>
        </div>
        <div className="roll-slide">
          <div className="w-screen h-screen uncommon-gradient-background"
          style={opacityProps("Uncommon")}/>
          <div className="w-screen h-screen uncommon-gradient-background"
          style={opacityProps("Uncommon")}/>
        </div>
        <div className="roll-slide">
          <div className="w-screen h-screen rare-gradient-background"
          style={opacityProps("Rare")}/>
          <div className="w-screen h-screen rare-gradient-background"
          style={opacityProps("Rare")}/>
        </div>
        <div className="roll-slide">
          <div className="w-screen h-screen epic-gradient-background"
          style={opacityProps("Epic")}/>
          <div className="w-screen h-screen epic-gradient-background"
          style={opacityProps("Epic")}/>
        </div>
        <div className="roll-slide">
          <div className="w-screen h-screen legendary-gradient-background"
          style={opacityProps("Legendary")}/>
          <div className="w-screen h-screen legendary-gradient-background"
          style={opacityProps("Legendary")}/>
        </div>
      </div>
      <button
        className="text-black hover:text-slate-500 absolute top-[1rem] right-[2rem] text-[2.5rem] transition-colors"
        onClick={() => {
          setAfterRolling(0);
        }}
      >
        &times;
      </button>
      <div className="relative flex items-center justify-center z-10">
        {(originalSlime === null || originalSlime === undefined) &&
        updatedSlime !== null ?
        <div className="flex flex-col p-4 w-[40rem] text-center items-center">
          <h3 className="font-galindo font-semibold text-black text-4xl">
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
            className="w-2/3 h-auto pop-out-element slime-animate"
          />
          <div className="flex flex-col gap-2 mb-4">
            <p className="font-galindo text-black px-2 text-2xl">
              {updatedSlime.slimeName}
            </p>
            <p
              className="text-3xl font-galindo"
              style={{ color: gameData.rarityColours[updatedSlime.rarity].blacktext }}
            >
              {updatedSlime.rarity}
            </p>
          </div>
          <div className="mt-2 flex flex-col pb-4 text-black">
            <p className="text-xl font-galindo">Max Level: {maxLevel} Lvl.</p>
            <p className="text-xl font-galindo">Base Production: {baseProduction}</p>
            <p className="text-xl font-galindo">Level Up Cost: {levelUpCost}</p>
            {
              // Check if starable
              updatedSlime.abilityName && (
                <p className="text-2xl font-galindo">
                  Ability Name: {updatedSlime.abilityName}
                </p>
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
        :
        <div className="flex flex-col p-4 w-[40rem] text-center items-center ">
          <h3 className="font-galindo text-black text-4xl">Slime Upgraded!</h3>
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
            className="w-2/3 h-auto pop-out-element slime-animate"
          />
          <div className="flex flex-col">
            <p className="font-galindo text-black px-2 text-2xl">
              {updatedSlime.slimeName}
            </p>
            <p
              className="text-3xl font-galindo"
              style={{ color: gameData.rarityColours[updatedSlime.rarity].blacktext }}
            >
              {updatedSlime.rarity}
            </p>
          </div>
          <div className="mt-2 grid grid-cols-1 place-content-start pb-4 gap-2 text-black">
            {starLevel !== undefined ? (
              <div>
                <p className="text-xl font-galindo">
                  {"Star Level: " +
                    originalSlime.starLevel +
                    "/" +
                    originalSlime.maxStarLevel +
                    " "}
                  &rarr;
                  <span className="font-semibold text-green-800">
                    {" " + starLevel + "/" + updatedSlime.maxStarLevel}
                  </span>
                </p>
              </div>
            ) : (
              <div />
            )}
            {starProgress !== undefined && (
              <div>
                <p className="text-xl font-galindo">
                  {"Star Progress: " +
                    originalSlime.starProgress +
                    "/" +
                    originalSlime.maxStarProgress +
                    " "}
                  &rarr;
                  <span className="font-semibold text-green-800">
                    {" " + starProgress + "/" + updatedSlime.maxStarLevel}
                  </span>
                </p>
            </div>)}
            {bonusLevel !== undefined && (
              <div>
                <p className="text-xl font-galindo mt-4">
                  {"Bonus Level: " + originalSlime.bonusLevel + " "}&rarr;
                  <span className="font-semibold text-green-800">{" " + bonusLevel}</span>
                </p>
            </div>)}
            {bonusProduction !== undefined && (
              <div>
                <p className="text-xl font-galindo">
                  {"Bonus Production: " + originalSlime.bonusProduction + " "}
                  &rarr;
                  <span className="font-semibold text-green-800">{" " + bonusProduction}</span>
                </p>
            </div>)}
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
        </div>}
      </div>
    </div>
  )
}
