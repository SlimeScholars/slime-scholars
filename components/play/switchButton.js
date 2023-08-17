import { useState } from "react";
import axios from "axios";

export default function SwitchButton() {

    const onSwitchBtnPressed = () => {
        try {
            const token = localStorage.getItem("jwt");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            };
    
            let playersListings = {};
            const pathPlayers = "/api/user/leaderboard";
    
            axios.get(pathPlayers, config)
            .then((response) => {
                playersListings = response.data;
            
            })
            .catch((error) => {console.log(error.message)});
        } catch (error) {
            setLoading(false);
        }
    }

    // Change background for the button clicked
    function handleClick(e) {

        // Switch button bg
        if (currentType == "friends") {
            setSwitchBtn(playersOnClick);
            setCurrentType("players");
            // Switch listing details
            //onSwitchBtnPressed();
        } else {
            setSwitchBtn(friendsOnClick);
            setCurrentType("friends");
            //onSwitchBtnPressed();
        }
    }

    return (
        <button className="p-4" key="switch-1" 
            onClick={(e) => handleClick(e)}
            data-current="friends">
            <div className={switchBtn.friendsClassName}>Friends</div>
            <div className={switchBtn.playersClassName}>All Players</div>
        </button>
    );
}