import { useState } from "react";
import axios from "axios";

export default function SwitchButton({ currentType, changeType }) {

    const friendsOnClick = {
        friendsClassName: "pr-4 bg-red-200 rounded-full p-1",
        playersClassName: "rounded-full p-1"
    };
    const playersOnClick = {
        friendsClassName: "rounded-full p-1",
        playersClassName: "pr-4 bg-red-200 rounded-full p-1"
    };

    const [switchBtn, setSwitchBtn] = useState(friendsOnClick);

    return (
        <button className="grid grid-cols-2"
            onClick={() => {

                if (currentType === "friends") {
                    // Change bg
                    setSwitchBtn(playersOnClick);

                    // Defer currentType change to upper level (Leaderboard)
                    changeType("players");

                } else {
                    setSwitchBtn(friendsOnClick);
                    changeType("friends");
                }
            }}>
            <div className={switchBtn.friendsClassName}>Friends</div>
            <div className={switchBtn.playersClassName}>All Players</div>
        </button>
    );
}