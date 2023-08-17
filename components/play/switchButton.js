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

                    // Fetching top 20 players in order of exp
                    try {
                        const token = localStorage.getItem("jwt");
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`, 
                            },
                        };
                
                        let playersListings
                        const pathPlayers = "/user/leaderboard";
                
                        axios.get(pathPlayers, config)
                        .then((response) => {
                            playersListings = response.data;
                            console.log("playesListings",response.data);
                        })
                        .catch((error) => {console.log("playersListings",error.message)});
                    } catch (error) {
                        console.log(error.message);
                    }

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