import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { gameData } from '../../data/gameData';
import { showToastError } from '../../utils/toast';

export default function Roll({ loading, user, setUser }) {

    const router = useRouter();
    const [flowersLacked, setFlowersLacked] = useState(0); // Used only if user does not have enough to buy eggs

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user || user.userType !== 1) {
            router.push("/");
        }

        console.log("here i am ");
    }, [user, loading]);

    const handleNavHome = (event) => {
        if (event.target.classList.contains("home")) {
            router.push("/play");
        }
    };

    const handleOpenEgg = (e) => {

        // If user does not have enough flowers
        const flowersNeed = Number(e.target.value);
        if (user.flowers < flowersNeed) {
            setFlowersLacked(flowersNeed-users.flowers);
        }
        else {
            // Open eggs api
            showToastError("You have enough eggs!", true);
        }
    };

    return (
        <div className="pt-5 home w-full h-full" onClick={handleNavHome}>
            <div className="w-full h-full">
                <div className="relative">
                    {/* Image as background */}
                    <img className="bg-cover w-full h-auto inset-0"
                        src="/assets/roll-bg/genshin.png"></img>
                    {/* Buttons to roll */}
                    <div className="absolute bottom-0 z-30 p-20">
                        <div className="grid grid-cols-1 gap-4 content-end">
                            <button
                                className="rounded-lg bg-red-400 text-white p-4 hover:bg-red-300"
                                value="1"
                                onClick={(e) => handleOpenEgg(e)}>
                                <div className="flex flex-row font-galindo">
                                    <p>Roll with 1 </p>
                                    <img src="/assets/icons/slime-egg.png" className="h-6 w-auto px-2"></img>
                                    <p>{ "( " + gameData.items['Slime Egg'].buyPrice + " FL )"}</p>
                                </div>
                            </button>
                            <button 
                                className="rounded-lg bg-red-400 text-white p-4 hover:bg-red-300"
                                value="10"
                                onClick={(e) => handleOpenEgg(e)}>
                                <div className="flex flex-row font-galindo">
                                    <p>Roll with 10</p>
                                    <img src="/assets/icons/slime-egg.png" className="h-6 w-auto px-2"></img>
                                    <p>{ "( " + gameData.items['Slime Egg'].buyPrice*10 + " FL )"}</p>
                                </div>
                                <div className="flex flex-row pt-1">
                                    <p className="pr-2">GUARANTEED</p>
                                    <p style={{ color: gameData.rarityColours['Epic'].text }}>EPIC</p>
                                </div>
                            </button>
                        </div>

                        {/* Popup Message */}
                        {
                            flowersLacked>0 && (
                                <div className="absolute inset-0 rounded-lg brightness-75">
                                    <div className="flex flex-row p-4">
                                        <p>{ "Earn " + flowersLacked + " more flowers to roll for slime eggs." }</p>
                                    </div>
                                    <div className="flex flex-row p-4">
                                        <button 
                                            className="rounded-lg bg-white text-black"
                                            onClick={(e) => {
                                                setFlowersLacked(0);
                                            }}>
                                            Cancel</button>
                                        <button 
                                            className="rounded-lg bg-red-300 text-white"
                                            onClick={(e) => {
                                                showToastError("Handling earn more onclick", true);
                                            }}>Earn more</button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
   );
}  