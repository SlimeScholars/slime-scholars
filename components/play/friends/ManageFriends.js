import React, { useState, useEffect } from "react";
import SearchFriends from "./searchFriends";
import FriendsEditor from "./friendsEditor";
import SearchBar from "../searchBar";
import axios from "axios";

/**
 * @param   {table} userFriends - friends of current user
 * @param   {string} toDo - acts as a flag indicating the functionality of ManageFriends Board
 *                          - "manage": return manage friends board on default
 *                          - "add": allow search across entire user database
 */

export default function ManageFriends({
  user,
  userFriends,
  toDo,
  setUserFriends,
  setCurrentUser,
  setSentFriendRequests,
}) {
  const [searchContent, setSearchContent] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  useEffect(() => {
    if (user && toDo == "manage") {
      const searchUsers = user.friends.filter((friend) => {
        return friend.username
          .toLowerCase()
          .includes(searchContent.toLowerCase());
      });
      setFoundUsers(searchUsers);
    } else if (user && toDo == "add") {
      const token = localStorage.getItem("jwt");

      // Set the authorization header
      const config = {
        params: {
          username: searchContent,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("/api/user/search", config)
        .then((response) => {
          setFoundUsers(response.data.users);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [searchContent, userFriends, toDo]);

  return (
    <div className="p-8 w-full">
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <div className="grow text-xl">
            {toDo == "add" ? "Add Friends" : "Manage Friends"}
          </div>

          <div className="shrink">
            {/* <SearchFriends
              setFriends={setMatchingFriends}
              toDo={toDo}
              placeHolder={
                toDo == "add" ? "Search username" : "Search friend username"
              }
              setSearchContent={setSearchContent}
            /> */}
            <div className="grow-0 flex pr-4">
              <form
                className="border-2 border-black flex bg-transparent rounded"
                // onSubmit={() => {}}
              >
                <input
                  type="text"
                  // value={"Search for a slime"}
                  placeholder={"Search for a username"}
                  className="p-1 grow bg-transparent text-m font-galindo ml-2"
                  onChange={(e) => setSearchContent(e.target.value)}
                ></input>
                <button type="submit" className="h-full flex p-1">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {toDo == "manage" ? (
        <div className="pt-8">
          You have {userFriends.length} friends in total
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col pt-8">
        <FriendsEditor
          userFriends={userFriends}
          usersOnlist={foundUsers}
          toDo={toDo}
          setCurrentUser={setCurrentUser}
          setUserFriends={setUserFriends}
          setSentFriendRequests={setSentFriendRequests}
        />
      </div>
    </div>
  );
}
