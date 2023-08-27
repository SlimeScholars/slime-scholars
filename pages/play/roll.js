import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { gameData } from '../../data/gameData';
import { showToastError } from '../../utils/toast';
import axios from 'axios';

export default function Roll({ loading, user, setUser }) {

    const router = useRouter();
    const [eggsLacked, setEggsLacked] = useState(0); // Used only if user does not have enough to buy eggs
    const [eggsOwned, setEggsOwned] = useState(0);
    const [flowersOwned, setFlowersOwned] = useState(0);

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user || user.userType !== 1) {
            router.push("/");
        } else if (user.items) {

            // Set # eggs owned
            user.items.map(item => {
                if (item.itemName === "Slime Egg") {
                    setEggsOwned(item.quantity);
                }
            });

            // Set # flowers owned
            setFlowersOwned(user.flowers);
        }

    }, [user, loading]);

    const handleNavHome = (event) => {
        if (event.target.classList.contains("home")) {
            router.push("/play");
        }
    };

    const handlePurchaseEggs = (numToPurchase) => {

        // Check if user has enough flowers
        if (gameData.items['Slime Egg'].buyPrice * numToPurchase > flowersOwned) {

            setEggsLacked(0);
            showToastError("Sorry, you need to earn more flowers.");
            return ;
        }

        const config = {
            headers: {
                Authorization : `Bearer ${localStorage.getItem('jwt')}`
            }
        }

        axios
            .post('/api/user/buy-item', {
                itemName: 'Slime Egg',
                quantity: numToPurchase
            }, config)
            .then(response => {
                
                // Close popup dialog
                setEggsLacked(0);

                // Update user items and flowers
                setUser(response.data.user);

                showToastError("Purchased successfully.", true);
            })
            .catch(error => showToastError(error.message));
    }

    const handleRollBtnClick = (eggsNeed) => {

        // user does not have enough eggs
        if (eggsNeed-eggsOwned > 0) {
            setEggsLacked(eggsNeed-eggsOwned);
        } else {
            // user does have enough
            showToastError("Having enough eggs.", true);
        }
    };

    return (
        <div 
            className="pt-5 home w-full h-full"
            onClick={handleNavHome}>
            {/* Popup Message */}
            {
                eggsLacked>0 && (
                    <div 
                        className="fixed inset-0 z-50 text-white flex items-center justify-center">
                        <div className="grid grid-rows-2 place-content-center m-20 rounded-lg p-8 bg-slate-400">
                            <div className="flex flex-col p-4 w-full text-center">
                                <h3 className="font-galindo text-black text-lg">{ "You need " + eggsLacked + " more slime egg" + ((eggsLacked!==1)? "s":"") +" to roll" }</h3>
                                <p className="text-sm">{ "Purchase " + eggsLacked + " slime egg" + ((eggsLacked!==1)? "s":"") + " with " + eggsLacked*gameData.items['Slime Egg'].buyPrice + " flowers." }</p>
                            </div>
                            <div className="flex flex-row justify-center items-center">
                                <button 
                                    className="rounded-sm bg-white text-black mr-2 p-2 hover:bg-white/75"
                                    onClick={(e) => {
                                        setEggsLacked(0);
                                    }}>
                                    Cancel</button>
                                <button 
                                    className="rounded-sm bg-red-300 text-white p-2 hover:bg-red-300/75"
                                    onClick={() => {
                                        handlePurchaseEggs(eggsLacked);
                                    }}>Purchase</button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div 
                className={
                    eggsLacked>0? ("w-full h-full brightness-75"): ("w-full h-full")
                }>
                <div className="relative">
                    {/* Image as background */}
                    <img className="bg-cover w-full h-auto inset-0"
                        src="/assets/roll-bg/genshin.png"></img>
                    {/* Buttons to roll */}
                    <div className="absolute bottom-0 z-3 p-20">
                        <div className="grid grid-cols-1 gap-4 content-end">
                            <button
                                className="rounded-lg bg-red-400 text-white p-4 hover:bg-red-300"
                                onClick={() => handleRollBtnClick(1)}>
                                <div className="flex flex-row font-galindo">
                                    <p>Roll with 1 </p>
                                    <img src="/assets/icons/slime-egg.png" className="h-6 w-auto px-2"></img>
                                    <p>{ "( " + gameData.items['Slime Egg'].buyPrice + " FL )"}</p>
                                </div>
                            </button>
                            <button 
                                className="rounded-lg bg-red-400 text-white p-4 hover:bg-red-300"
                                onClick={() => handleRollBtnClick(10)}>
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
                    </div>
                </div>
            </div>
        </div>
   );
}  