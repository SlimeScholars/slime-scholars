import React, { useState } from 'react';
import { gameData } from '../../../data/gameData';

export default function RollSlimePopup({ updatedSlime, setAfterRolling, originalSlime, router }) {

    console.log(updatedSlime);

    const maxLevel = updatedSlime.maxLevel;
    const baseProduction = updatedSlime.baseProduction;
    const levelUpCost= updatedSlime.levelUpCost;

    const starLevel = updatedSlime.starLevel;
    const starProgress = updatedSlime.starProgress;
    const bonusLevel = updatedSlime.bonusLevel;
    const bonusProduction = updatedSlime.bonusProduction;


    return (
    ((originalSlime === null || originalSlime === undefined) && updatedSlime !== null)? (
        // new slime is created
        <div className="flex flex-col p-4 w-full text-center items-center">
            <h3 className="font-galindo text-black text-lg">New Slime Unlocked</h3>
            <img src={ "/assets/pfp/slimes/" + gameData.slimePfps[updatedSlime.slimeName].pfp}
                className="w-1/3 h-auto"></img>
            <div className="flex flex-row">
                <p className="font-galindo text-white px-2">{ updatedSlime.slimeName }</p>
                <p className=""
                    style={{ color: gameData.rarityColours[updatedSlime.rarity].text }}>{ updatedSlime.rarity }</p>
            </div>
            <div className="flex flex-col pb-4">
                <p>Max Level: { maxLevel } Lvl.</p>
                <p>Base Production: { baseProduction }</p>
                <p>Level Up Cost: { levelUpCost }</p>
                {
                    // Check if starable
                    updatedSlime.abilityName&& (
                        <p>Ability Name: { updatedSlime.abilityName }</p>
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
    ): (
        // Duplicate is created
        <div className="flex flex-col p-4 w-full text-center items-center">
            <h3 className="font-galindo text-black text-lg">Slime Upgraded</h3>
            <img src={ "/assets/pfp/slimes/" + gameData.slimePfps[updatedSlime.slimeName].pfp}
                className="w-1/3 h-auto"></img>
            <div className="flex flex-row">
                <p className="font-galindo text-white px-2">{ updatedSlime.slimeName }</p>
                <p className=""
                    style={{ color: gameData.rarityColours[updatedSlime.rarity].text }}>{ updatedSlime.rarity }</p>
            </div>
            <div className="grid grid-cols-1 place-content-start pb-4 gap-4">
                <div>
                {
                    starLevel&& (
                        <p>{ "Star Level: "+originalSlime.starLevel+" -> "+starLevel}</p>
                    )
                }
                </div>
                <div>
                    {
                    starProgress&& (
                        <p>{ "Star Progress: "+originalSlime.starProgress+" -> "+starProgress}</p>
                    )
                    }   
                </div>
                <div>
                    {bonusLevel&& (
                        <p>{ "Bonus Level: "+originalSlime.bonusLevel+" -> "+bonusLevel }</p>
                    )}
                </div>
                <div>
                    {bonusProduction&& (
                        <p>{ "Bonus Production: "+originalSlime.bonusProduction+" -> "+bonusProduction}</p>
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