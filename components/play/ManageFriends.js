import React, { useState } from "react";
import SearchFriends from './searchFriends';

export default function ManageFriends() {

    return (
        <div className="flex flex-row">
            <div className="grow text-xl">
                Manage Friends
            </div>

            <div className="grow-0">
                <SearchFriends />
            </div>
        </div>
    )
}