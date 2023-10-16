import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RollResult from '../../components/play/roll/rollResult';
import { gameData } from '../../data/gameData';
import { showToastError } from '../../utils/toast';
import axios from 'axios';
import Image from 'next/image';

export default function Roll({ loading, user, setUser, setLoading, colorPalette, setColorPalette, refetchUser }) {

    const router = useRouter();
    const [eggsLacked, setEggsLacked] = useState(0); // Used only if user does not have enough to buy eggs
    const [eggsOwned, setEggsOwned] = useState(0);
    const [flowersOwned, setFlowersOwned] = useState(0);
    const [afterRolling, setAfterRolling] = useState(0); // Flag used for showing rolling information
    const [slimes, setSlimes] = useState({});
    const [originalSlimes, setOriginalSlimes] = useState({});

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

    const handlePurchaseEggs = (numToPurchase) => {

        // Check if user has enough flowers
        if (gameData.items['Slime Egg'].buyPrice * numToPurchase > flowersOwned) {

            setEggsLacked(0);
            showToastError("Sorry, you need to earn more flowers.");
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                apiKey: process.env.API_KEY,
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
                if (user) {
                    setOriginalSlimes(user.slimes);
                }
                refetchUser()
                showToastError("Purchased successfully.", true);
            })
            .catch(error => showToastError(error.message));
    }

    const handleRollBtnClick = (eggsNeed) => {

        // user does not have enough eggs
        if (eggsNeed - eggsOwned > 0) {
            setEggsLacked(eggsNeed - eggsOwned);
        } else {
            // user does have enough

            // only 1 egg works for now
            if (eggsNeed === 1) {
                setLoading(true)
                axios
                    .post('/api/slime/open-egg', {
                        itemName: 'Slime Egg'
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                            apiKey: process.env.API_KEY,
                        }
                    })
                    .then(response => {

                        // Show popup
                        setAfterRolling(2);

                        // Setup slimes for RollResult component
                        let newSlimes = new Array();
                        newSlimes.push(response.data.slime);
                        setSlimes(newSlimes);
                        setOriginalSlimes(response.data.originSlimeObjects);
                        refetchUser()
                        setLoading(false)

                    })
                    .catch(error => {
                        showToastError(error.message)
                        setLoading(false)
                    });
            } else {

                // Rolling 10 slimes
                axios
                    .post('/api/slime/open-10eggs', {
                        itemName: 'Slime Egg'
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                            apiKey: process.env.API_KEY,
                        }
                    })
                    .then(response => {

                        setSlimes(response.data.slimeObjects);
                        setOriginalSlimes(response.data.originSlimeObjects);
                        setAfterRolling(2);

                        refetchUser()
                        setLoading(false)
                    })
                    .catch(error => showToastError(error.message));
            }
        }
    };

    return (
        <div
            className="w-full h-full"
        >
            {/* Popup Message for Lacking Eggs */}
            {
                eggsLacked > 0 && (
                    <div
                        className="fixed inset-0 z-40 text-white flex items-center justify-center">
                        <div className="grid grid-rows-2 place-content-center m-20 rounded-lg p-8 bg-slate-400">
                            <div className="flex flex-col p-4 w-full text-center">
                                <h3 className="font-galindo text-black text-lg">{"You need " + eggsLacked + " more slime egg" + ((eggsLacked !== 1) ? "s" : "") + " to roll"}</h3>
                                <p className="text-sm">{"Purchase " + eggsLacked + " slime egg" + ((eggsLacked !== 1) ? "s" : "") + " with " + eggsLacked * gameData.items['Slime Egg'].buyPrice + " flowers."}</p>
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
            {
                // Popup Message for Rolling Result
                (afterRolling !== 0 && slimes) && (
                    <RollResult
                        setAfterRolling={setAfterRolling}
                        slimes={slimes}
                        originalSlimes={originalSlimes}
                        router={router}
                        refetchUser={refetchUser} />
                )
            }
            <div
                className={
                    (eggsLacked > 0 || afterRolling) ? ("w-full h-full brightness-75") : ("w-full h-full")
                }>
                <div className="relative ">
                    {/* Image as background */}
                    <div className="flex justify-center">

                        <Image
                            src="/assets/roll-bg/primary-banner.png"
                            alt='slime banner'
                            height={0}
                            width={0}
                            sizes='100vw'
                            className="bg-cover w-[60%] h-auto inset-0 "
                        />
                    </div>
                    {/* Buttons to roll */}
                    <div className="absolute bottom--30 w-full mt-20">
                        <div className="flex justify-center">
                            <div className="flex gap-4 content-en">
                                <button
                                    style={{
                                        backgroundColor: colorPalette ? colorPalette.primary1 : "",
                                        color: colorPalette ? colorPalette.text1 : "",
                                        border: colorPalette ? `3px solid ${colorPalette.primary2}` : ""
                                    }}
                                    className="hover:brightness-110 pr-[5vw] flex flex-col justify-between rounded-lg text-white p-4 "
                                    onClick={() => handleRollBtnClick(10)}>
                                    <div className="flex flex-row font-galindo text-lg">
                                        <p>Roll x1</p>
                                        <Image
                                            src="/assets/icons/slime-egg.png"
                                            alt='slime egg'
                                            height={0}
                                            width={0}
                                            sizes='100vw'
                                            className="h-6 w-auto px-2"
                                        />
                                    </div>
                                    <p className=" text-xl font-galindo text-left">{gameData.items['Slime Egg'].buyPrice + " FL"}</p>
                                </button>
                                <button
                                    style={{
                                        backgroundColor: colorPalette ? colorPalette.primary1 : "",
                                        color: colorPalette ? colorPalette.text1 : "",
                                        border: colorPalette ? `3px solid ${colorPalette.primary2}` : ""
                                    }}
                                    className="hover:brightness-110 pr-[5vw] flex flex-col justify-between rounded-lg bg-red-400 text-white p-4 hover:bg-red-300"
                                    onClick={() => handleRollBtnClick(10)}>
                                    <div className="flex flex-row font-galindo text-lg">
                                        <p>Roll x10</p>
                                        <Image
                                            src="/assets/icons/slime-egg.png"
                                            alt='slime egg'
                                            height={0}
                                            width={0}
                                            sizes='100vw'
                                            className="h-6 w-auto px-2"
                                        />
                                    </div>

                                    <div className="flex flex-row text-left">
                                        <p className="pr-1">GUARANTEED </p>
                                        <p className="font-bold" style={{ color: gameData.rarityColours['Epic'].text }}>EPIC</p>
                                    </div>

                                    <p className="text-xl font-galindo text-left pt-1">{gameData.items['Slime Egg'].buyPrice * 10 + " FL"}</p>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}  