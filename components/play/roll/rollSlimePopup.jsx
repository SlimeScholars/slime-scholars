import React, { useState } from 'react';
import { gameData } from '../../../data/gameData';
import Image from 'next/image';

export default function RollSlimePopup({ updatedSlime, setAfterRolling, originalSlime, router }) {
    if(!updatedSlime){
        return
    }

    const maxLevel = updatedSlime.maxLevel;
    const baseProduction = updatedSlime.baseProduction;
    const levelUpCost = updatedSlime.levelUpCost;

    const starLevel = updatedSlime.starLevel;
    const starProgress = updatedSlime.starProgress;
    const bonusLevel = updatedSlime.bonusLevel;
    const bonusProduction = updatedSlime.bonusProduction;


    return (
        ((originalSlime === null || originalSlime === undefined) && updatedSlime !== null) ? (
            // new slime is created
            <div className="flex flex-col p-4 w-full text-center items-center">
                <h3 className="font-galindo text-black text-lg">New Slime Unlocked</h3>
                <Image
                    src={
                        gameData.slimeImgs[updatedSlime.slimeName] ? (
                            "/assets/pfp/slimes/" + gameData.slimeImgs[updatedSlime.slimeName].pfp
                        ) : ("")
                    }
                    alt={updatedSlime.slimeName}
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="w-1/3 h-auto"
                />
                <div className="flex flex-row">
                    <p className="font-galindo text-white px-2">{updatedSlime.slimeName}</p>
                    <p className=""
                        style={{ color: gameData.rarityColours[updatedSlime.rarity].text }}>{updatedSlime.rarity}</p>
                </div>
                <div className="flex flex-col pb-4">
                    <p>Max Level: {maxLevel} Lvl.</p>
                    <p>Base Production: {baseProduction}</p>
                    <p>Level Up Cost: {levelUpCost}</p>
                    {
                        // Check if starable
                        updatedSlime.abilityName && (
                            <p>Ability Name: {updatedSlime.abilityName}</p>
                        )
                    }
                </div>
                <div className="flex flex-row justify-center items-center">
                    <button
                        className="rounded-sm bg-white text-black mr-2 p-2 hover:bg-white/75"
                        onClick={(e) => {
                            setAfterRolling(0);
                        }}>
                        Got it</button>
                    <button
                        className="rounded-sm bg-red-300 text-white p-2 hover:bg-red-300/75"
                        onClick={() => {
                            router.push("/play/slimes");
                        }}>Take a look</button>
                </div>
            </div>
        ) : (
            // Duplicate is created
            <div className="flex flex-col p-4 w-full text-center items-center">
                <h3 className="font-galindo text-black text-lg">Slime Upgraded</h3>
                <Image
                    src={
                        gameData.slimeImgs[updatedSlime.slimeName] ? (
                            "/assets/pfp/slimes/" + gameData.slimeImgs[updatedSlime.slimeName].pfp
                        ) : ("")
                    }
                    alt={updatedSlime.slimeName}
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="w-1/3 h-auto"
                />
                <div className="flex flex-row">
                    <p className="font-galindo text-white px-2">{updatedSlime.slimeName}</p>
                    <p className=""
                        style={{ color: gameData.rarityColours[updatedSlime.rarity].text }}>{updatedSlime.rarity}</p>
                </div>
                <div className="grid grid-cols-1 place-content-start pb-4 gap-4">
                    <div>
                        {
                            starLevel !== undefined && (
                                <p>{"Star Level: " + originalSlime.starLevel + "/" + originalSlime.maxStarLevel + " -> " + starLevel + "/" + updatedSlime.maxStarLevel}</p>
                            )
                        }
                    </div>
                    <div>
                        {
                            starProgress !== undefined && (
                                <p>{"Star Progress: " + originalSlime.starProgress + "/" + originalSlime.maxStarProgress + " -> " + starProgress + "/" + updatedSlime.maxStarLevel}</p>
                            )
                        }
                    </div>
                    <div>
                        {bonusLevel !== undefined && (
                            <p>{"Bonus Level: " + originalSlime.bonusLevel + " -> " + bonusLevel}</p>
                        )}
                    </div>
                    <div>
                        {bonusProduction !== undefined && (
                            <p>{"Bonus Production: " + originalSlime.bonusProduction + " -> " + bonusProduction}</p>
                        )}
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <button
                        className="rounded-sm bg-white text-black mr-2 p-2 hover:bg-white/75"
                        onClick={(e) => {
                            setAfterRolling(0);
                        }}>
                        Got it</button>
                    <button
                        className="rounded-sm bg-red-300 text-white p-2 hover:bg-red-300/75"
                        onClick={() => {
                            router.push("/play/slimes");
                        }}>Take a look</button>
                </div>
            </div>)
    );
}