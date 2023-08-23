import React, { useState } from "react";
import SearchFriends from './searchFriends';
import FriendsEditor from "./friendsEditor";

/**
 * @param   {table} userFriends - friends of current user
 * @param   {string} toDo - acts as a flag indicating the functionality of ManageFriends Board
 *                          - "manage": return manage friends board on default
 *                          - "add": allow search across entire user database
 */

export default function ManageFriends({ userFriends, toDo, setUserFriends, setCurrentUser, setSentFriendRequests }) {

    const [matchingFriends, setMatchingFriends] = useState("empty for now");

    return (
        <div className="p-8 w-full">
            <div className="flex flex-col">
                <div className="flex flex-row items-center">
                    <div className="grow text-xl">
                        {
                            toDo=="add"? ("Add Friends") : ("Manage Friends")
                        }
                    </div>

                    <div className="shrink">
                        <SearchFriends
                            setFriends={setMatchingFriends}
                            toDo={toDo}
                            placeHolder={
                                toDo=="add"? ("Search username") : ("Search friend username")
                            }
                        />
                    </div>
                </div>
            </div>
            {
                toDo=="manage"? (
                    <div className="pt-8">
                        You have {userFriends.length} friends in total
                    </div>
                ) : (
                    <></>
                )
            }
            <div className="flex flex-col pt-8">
                <FriendsEditor
                    userFriends={userFriends}
                    usersOnlist={matchingFriends}
                    toDo={toDo}
                    setCurrentUser={setCurrentUser}
                    setUserFriends={setUserFriends}
                    setSentFriendRequests={setSentFriendRequests}
                />
            </div>
        </div>
    );
}