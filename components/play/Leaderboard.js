import React from "react";
import SwitchButton from "./switchButton";
import LeadboardListing from "./leadboardListing";

export function Leaderboard({ userFriends }) {

    return (
        <div className="p-8">
            <div className="flex flex-col">
                <div className="grow text-xl">
                    Leaderboard
                </div>

                <div className="grow-0">
                    <div className="rounded-full border-4 border-red-200">
                        <SwitchButton />
                    </div>
                </div>
            </div>
            <div className="flex flex-col grow">
                <LeadboardListing users={userFriends} />
            </div>
        </div>
    )
}