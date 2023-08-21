import React, { useState } from "react";
import { showToastError } from "../../utils/toast";
import axios from "axios";

export default function SearchFriends({ setFriends }) {
    const [searchContent, setSearchContent] = useState("Search Friends");

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
        axios
            .get("/api/user/friend/search", config)
            .then(response => {
                setFriends(response.data.matchingFriends);
            })
            .catch(error => 
                console.error(error.message));
        e.preventDefault();
    };

    return (
        <form
            className="border-2 border-red-300 flex bg-transparent rounded"
            onSubmit={(e) => handleSubmit(e)}>
            <input
                type="text"
                value={searchContent}
                placeholder="Search Friends"
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