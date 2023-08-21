import React, { useEffect, useState } from 'react';
import { gameData } from '../../../data/gameData';
import { showToastError } from '../../../utils/toast';
import axios from 'axios';

export default function RequestListings({
    currentType,
    currentUser,
    setCurrentUser
}) {

    const [usersOnlist, setUsersOnlist] = useState("empty for now");
    useEffect(() => {
        try {
            if (currentType === "received") {
                setUsersOnlist(currentUser.receivedFriendRequests);
            } else {
                setUsersOnlist(currentUser.sentFriendRequests);
            }
        }
        catch {}
        
    });

    function handleAcceptRequest(friendId) {

        axios
            .post('/api/user/friend/accept', {
                friendId: friendId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(response => {
                setUsersOnlist(response.data.receivedFriendRequests);
                showToastError("Friend request accepted.", true);
            })
            .catch(error => {});
    }

    function handleDeleteRequest(friendId) {

        const token = localStorage.getItem('jwt')

        // Set the authorization header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        axios
            .post('/api/user/friend/delete-'+currentType, {
                friendId: friendId
            }, config)
            .then(response => {
                if (currentType === "received") {
                    setUsersOnlist(response.receivedFriendRequests);
                    console.log(response.data);
                }
                else {
                    setUsersOnlist(response.data.sentFriendRequests);
                    console.log(response.data);
                }
                showToastError("Friend request deleted.", true);
            })
            .catch(error => {
                
            });
    }

    return (
        <div 
            className="overflow-y-auto max-h-96">
            {Array.isArray(usersOnlist) ? (
                usersOnlist.map((user, index) => (
                    <div className="flex flex-row items-center py-4" key={index}>
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <div className="relative">
                                <img src={"/assets/pfp/backgrounds/"+gameData.items[user.pfpBg].pfp}
                                    className="absolute inset-0"></img>
                                <img src={"/assets/pfp/slimes/"+gameData.slimePfps[user.pfpSlime].pfp}
                                    className="relative z-10 translate-y-1/4 scale-125"></img>
                            </div>
                        </div>
                        <div className="grow px-4">{
                            currentType=="received"? (user.username+" requested to add you") : 
                            ("You requested to add "+user.username)
                        }</div>
                        { // To accept friend request
                            currentType=="received"?(
                                <button className="bg-none rounded-lg pr-4" onClick={() => handleAcceptRequest(user._id)}>
                                    <span class="material-symbols-outlined">done</span>
                                </button>
                            ) : (<></>)
                        }
                        <button className="bg-none rounded-lg pr-4" onClick={() => handleDeleteRequest(user._id)}>
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                        
                    </div>
                ))
            ) : (
                <p>No users to display.</p>
            )}
        </div>
    )
}