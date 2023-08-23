import ItemInventory from './itemInventory';
import React, { useState } from 'react';
import { gameData } from '../../../data/gameData';
import { showToastError } from '../../../utils/toast';
import axios from 'axios';

export default function ItemDetails({ item, user, pfpBg, setpfpBg, bg, setBg }) {

    // for background
    if (item.isBg && gameData.items[item.itemName]) {
        return (
            <div className="grid grid-cols-3 p-4 gap-4">
                <ItemInventory
                    item={item}
                    displayOnly="true"
                />
                {/* Item description */}
                <div className="col-span-2 bg-black/40 rounded-lg p-8">
                    <p className="text-yellow-300 text-2xl font-thin">
                        {item.rarity}
                    </p>
                    <p className="text-white text-2xl font-bold">
                        {item.itemName}
                    </p>
                    {
                        item.description && (
                            <p className="text-grey text-sm">{item.description}</p>
                        )
                    }
                </div>
                {/* Change pfp comparison */}
                <div className="col-span-3 bg-black/40 rounded-lg p-6">
                    <div className="flex flex-row w-full items-center">
                        <div className="basis-1/5">
                            <div className="flex flex-col items-center">
                                <p>Current</p>
                                <div className="relative rounded-full overflow-hidden  border-4 border-red-300">
                                    <img src={"/assets/pfp/backgrounds/" + gameData.items[pfpBg].pfp}
                                        className="absolute inset-0"></img>
                                    <img src={"/assets/pfp/slimes/" + gameData.slimePfps[user.pfpSlime].pfp}
                                        className="relative z-10 translate-y-1/4 scale-125"></img>
                                </div>
                            </div>
                        </div>
                        <div className="basis-1/5">
                            <span className="text-red-300 material-symbols-outlined scale-150 p-10">
                                arrow_forward
                            </span>
                        </div>
                        <div className="basis-1/5">
                            <div className="flex flex-col items-center">
                                <p>Updated</p>
                                <div className="relative rounded-full overflow-hidden border-4 border-red-300">
                                    <img src={"/assets/pfp/backgrounds/" + gameData.items[item.itemName].pfp}
                                        className="absolute inset-0"></img>
                                    <img src={"/assets/pfp/slimes/" + gameData.slimePfps[user.pfpSlime].pfp}
                                        className="relative z-10 translate-y-1/4 scale-125"></img>
                                </div>
                            </div>
                        </div>
                        <div className="basis-2/5 p-4" dir="rtl">
                            {
                                pfpBg === item.itemName ? (
                                    <button className="rounded-s-lg p-4 bg-black/20" disabled>
                                        Equipped Already
                                    </button>
                                ) : (
                                    <button className="rounded-s-lg p-4 bg-red-300 hover:bg-red-300/75 h-full"
                                        onClick={(e) => {
                                            axios
                                                .put('/api/user/change-pfp', {
                                                    pfpBg: item.itemName,
                                                    pfpSlime: user.pfpSlime,
                                                }, {
                                                    headers: {
                                                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                                                    }
                                                })
                                                .then(response => { 
                                                    setpfpBg(item.itemName);
                                                    showToastError("Profile background was changed.", true);
                                                 })
                                                .catch(error => { });
                                        }}>
                                        Equip as Profile Background
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="bg-black/40 rounded-lg p-8 col-span-3">
                    {
                        gameData.items[item.itemName].bg === bg ? (
                            <button className="text-black" disabled>Equipped as background</button>
                        ) : (
                            <button className="text-red-300 hover:text-red-300/75 p-4"
                                onClick={(e) => {
                                    axios
                                        .put('/api/user/change-bg', {
                                            bg: item.itemName
                                        }, {
                                            headers: {
                                                Authorization: `Bearer ${localStorage.getItem('jwt')}`
                                            }
                                        })
                                        .then(response => {
                                            setBg(gameData.items[item.itemName].bg);
                                        })
                                        .catch(error => {
                                            console.log(error);
                                            showToastError(error.message);
                                        });
                                }}>
                                Equip as background
                            </button>
                        )
                    }
                </div>
            </div>
        )
        // for eggs
    } else {

        const [sellItemsNum, setSellItemsNum] = useState(item.quantity);

        return (
            <div className="grid grid-cols-3 p-4 gap-4">
                <ItemInventory
                    item={item}
                    displayOnly="true"
                />
                {/* Item description */}
                <div className="col-span-2 bg-black/40 rounded-lg p-8">
                    <p className="text-yellow-300 text-2xl font-thin">
                        {item.rarity}
                    </p>
                    <p className="text-white text-2xl font-bold">
                        {item.itemName}
                    </p>
                    {
                        item.description && (
                            <p className="text-grey text-sm">{item.description}</p>
                        )
                    }
                </div>
                {/* Sell Item */}
                <div className="col-span-3 bg-black/40 rounded-lg p-6">
                    <div className="flex flex-row w-full items-center">
                        <div className="grow">Sell Item</div>
                        <div className="shrink text-white px-1">
                            Sell for: 
                        </div>
                        {
                            item.sellCurrency==1? (
                                <div className="text-orange-300 px-1">
                                    {item.sellPrice + " flowers each"}
                                </div>
                            ) : (
                                <div className="text-orange-300 px-1">
                                    {item.sellPrice + " flowers each"}
                                </div>
                            )
                        }
                        
                    </div>
                    <div class="flex flex-row w-full items-center p-2">
                        <div className="shrink px-2">0</div>
                        <div className="grow">
                            <input
                                type="range"
                                min="0"
                                max={item.quantity}
                                step="1"
                                className="w-full"
                                value={sellItemsNum}
                                onChange={ (e) =>
                                    {
                                        setSellItemsNum(e.target.value);
                                    }
                                }
                            />
                        </div>
                        <div className="px-2">{sellItemsNum}</div>
                    </div>
                    <div className="flex flex-row">
                        <div className="px-1">
                            <input
                                type="text"
                                className="p-2 border-2 border-red-300 bg-white rounded-lg"
                                value={sellItemsNum}
                                onChange={(e) => {
                                    setSellItemsNum(e.target.value);
                                }}
                            ></input>
                        </div>
                        <div className="shrink px-1">
                            <button
                                className="bg-red-300 hover:bg-red-300/75 rounded-lg p-2"
                                onClick={(e) => {
                                    setSellItemsNum(item.quantity-1);
                                }}>
                                    All but 1
                            </button>
                        </div>
                        <div className="shrink px-1">
                            <button
                                className="bg-red-300 hover:bg-red-300/75 rounded-lg p-2"
                                onClick={(e) => {
                                    setSellItemsNum(item.quantity);
                                }}>
                                    All
                            </button>
                        </div>
                        <div className="shrink px-1">
                            <button 
                                className="bg-red-300 hover:bg-red-300/75 rounded-lg p-2"
                                onClick={(e) => {

                                }}>
                                Sell
                            </button>
                        </div>
                        <div className="shrink px-1">
                            <img src="/assets/icons/slimeGel.png" className="scale-75"></img>
                        </div>
                        <div className="shrink p-3 text-center">
                            <p>{sellItemsNum * item.sellPrice}</p>
                        </div>
                    </div>
                </div>
                {/* Open eggs */}
                <div className="col-span-3 bg-black/40 rounded-lg p-6">
                    <p onClick={(e) => {
                        
                    }}>
                        Open Egg
                    </p>
                </div>
            </div>
        );
    }
}