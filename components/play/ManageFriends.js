import React, { useState } from "react";
import SearchFriends from './searchFriends';
import { showToastError } from "../../utils/verify";
import FriendsEditor from "./friendsEditor";
import axios from "axios";

export default function ManageFriends({ userFriends }) {

    const [matchingFriends, setMatchingFriends] = useState("empty for now");

    const handleDeleteFriend = (friendId) => {
        const token = localStorage.getItem('jwt')

        // Set the authorization header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post('/api/user/friend/remove', {
                friendId
            }, config)
            .then(response => {

            })
            .catch(error => {
                if (error && error.response && error.response.data && error.response.data.message)
                    showToastError(error.response.data.message);
                else
                    console.error('Error removing friend')
            });
    }

    return (
        <div className="p-8 w-full">
            <div className="flex flex-col">
                <div className="flex flex-row items-center">
                    <div className="grow text-xl">
                        Manage Friends
                    </div>

                    <div className="shrink">
                        <SearchFriends
                            setFriends={setMatchingFriends}
                        />
                    </div>
                </div>
            </div>
            <div className="pt-8">
                You have {userFriends.length} friends in total
            </div>
            <div className="flex flex-col pt-8">
                <FriendsEditor
                    userFriends={userFriends}
                    friendsOnlist={matchingFriends}
                />
            </div>
        </div>
    );
}