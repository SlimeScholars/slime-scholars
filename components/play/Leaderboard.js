import SwitchButton from "./switchButton";
import LeadboardListing from "./leadboardListing";
import React, { useState } from "react";

export default function Leaderbaord({userFriends}) {
    const [currentType, setCurrentType] = useState("friends");

    return (
        <div className="p-8">
            <div className="flex flex-col">
                <dvi className="flex flex-row">
                    <div className="grow text-xl">
                        Leaderboard
                    </div>

                    <div className="shrink rounded-full border-2 border-red-200">
                        <SwitchButton 
                            currentType={currentType}
                            changeType={ (type) => setCurrentType(type) }
                        />
                    </div>
                </dvi>
            </div>
            <div className="flex flex-col grow">
                <LeadboardListing 
                    users={userFriends}
                    currentType={currentType}
                />
            </div>
        </div>
    )
}