import React, { useState } from "react";

export default function SearchFriends() {
    const [searchContent, setSearchContent] = useState("Search Friends");

    const handleSubmit = () => {

    };

    return (
        <form
            className="border-2 border-red-300 flex bg-transparent rounded"
            onSubmit={handleSubmit}>
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