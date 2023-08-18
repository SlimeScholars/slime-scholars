import React, { useState } from "react";
import { gameData } from "../../data/gameData";
import SearchFriends from './searchFriends';

export default function ManageFriends({ userFriends }) {

    return (
        <div className="p-8">
            <div className="flex flex-col w-full">
                <div className="flex flex-row items-center">
                    <div className="grow text-xl">
                        Manage Friends
                    </div>

                    <div className="shrink">
                        <SearchFriends />
                    </div>
                </div>
            </div>
            <div className="pt-8">
                You have {userFriends.length} friends in total
            </div>
            <div className="flex flex-col grow pt-8">
                <div className="grid grid-cols-2 gap-4">
                    {Array.isArray(userFriends) ? (
                        userFriends.map((user, index) => {

                            return (
                                <div key={index} className="bg-red-200 rounded-xl flex flex-row items-center">
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <div className="relative">
                                            <img src={"/assets/pfp/backgrounds/"+gameData.items[user.pfpBg].pfp}
                                                className="absolute inset-0"></img>
                                            <img src={"/assets/pfp/slimes/"+gameData.slimePfps[user.pfpSlime].pfp}
                                                className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"></img>
                                        </div>
                                    </div>
                                    <div className="grow px-4">{user.username}</div>
                                    <button className="bg-red-400 rounded-lg">X</button>
                                </div>
                            )
                            
                        })) : (
                            <p>No friends to display.</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}