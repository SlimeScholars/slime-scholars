import React, { useState } from "react";
import SearchBar from "../searchBar";
import axios from "axios";
import cookies from "../../../services/cookies/cookies";

/**
 * @param   {function} setFriends - can change the matching friends variable in upper level (ManageFriends.js)
 * @param   {string} toDo - acts as a flag indicating the functionality of ManageFriends Board
 *                          - "manage": return search friends bar on default
 *                          - "add": allow search across entire user database
 * @param   {string} placeHolder - placeholder for the search bar
 **/

export default function SearchFriends({ setFriends, toDo, placeHolder }) {
    const [searchContent, setSearchContent] = useState("");

    const handleSubmit = (e) => {
        const token = cookies.get("slime-scholars-webapp-token")

        // Set the authorization header
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                username: searchContent,
            }
        };

        if (toDo === "add") {
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
    };

    return (
        <SearchBar
            handleSubmit={handleSubmit}
            placeHolder={placeHolder}
            setFriends={setFriends}
            setSearchContent={setSearchContent}
            searchContent={searchContent}
            toDO={toDo}
        />
    )
}