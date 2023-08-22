import React, { useState } from "react";
import axios from "axios";

/**
 * @param   {function} setFriends - can change the matching friends variable in upper level (ManageFriends.js)
 * @param   {string} toDo - acts as a flag indicating the functionality of ManageFriends Board
 *                          - "manage": return search friends bar on default
 *                          - "add": allow search across entire user database
 * @param   {string} placeHolder - placeholder for the search bar
 */

export default function SearchFriends({ setFriends, toDo, placeHolder }) {
    const [searchContent, setSearchContent] = useState("");

    const handleSubmit = (e) => {
        const token = localStorage.getItem('jwt')

        // Set the authorization header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                username: searchContent,
            }
        };
        
        if ( toDo === "add") {
            axios
                .get("/api/user/search", config)
                .then(response => {
                    setFriends(response.data.users);
                })
                .catch(error => {
                    console.log(error.message);
                });
        } else {
            axios
            .get("/api/user/friend/search", config)
            .then(response => {
                setFriends(response.data.matchingFriends);
            })
            .catch(error => 
                console.error()
                //console.error(error.message)
                );
        }
        
        e.preventDefault();
    };

    return (
        <form
            className="border-2 border-red-300 flex bg-transparent rounded"
            onSubmit={(e) => handleSubmit(e)}>
            <input
                type="text"
                value={searchContent}
                placeholder={placeHolder}
                className="p-1 grow bg-transparent text-m"
                onChange={(e) => setSearchContent(e.target.value)}>
            </input>
            <button
                type="submit"
                className="h-full flex p-1">
                <span className="material-symbols-outlined">
                    search
                </span>
            </button>
        </form>
    )
}