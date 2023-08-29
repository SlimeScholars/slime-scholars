import React, { useState } from 'react';
import { gameData } from '../../../data/gameData';

export default function RollSlimePopup({ updatedSlime, setAfterRolling, originalSlime, router }) {

    const maxLevel = updatedSlime.maxLevel;
    const baseProduction = updatedSlime.baseProduction;
    const levelUpCost= updatedSlime.levelUpCost;

    // new slime is created
    if (originalSlime === undefined && updatedSlime !== null) {

        console.log("In slime popup, new slime created");

        return (
            <div 
                className="fixed inset-0 z-50 text-white flex items-center justify-center brightness-100">
                <div className="grid grid-rows-2 place-content-center m-20 rounded-lg p-8 bg-slate-400  w-1/3 h-1/2">
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
                </div>
            </div>
    );
    // duplicate is created
    } else if (originalSlime) {

        console.log("In slime popup, duplicate is created");

        const starLevel = updatedSlime.starLevel;
        const starProgress = updatedSlime.starProgress;
        const bonusLevel = updatedSlime.bonusLevel;
        const bonusProduction = updatedSlime.bonusProduction;

        return (
            <div 
                className="fixed inset-0 z-50 text-white flex items-center justify-center brightness-100">
                <div className="grid grid-rows-2 place-content-center m-20 rounded-lg p-8 bg-slate-400  w-1/3 h-1/2">
                    <div className="flex flex-col p-4 w-full text-center items-center">
                        <h3 className="font-galindo text-black text-lg">Slime Updated</h3>
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
                    </div>
                </div>
            </div>
        )
    }
}