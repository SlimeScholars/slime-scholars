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
  setUserFriends,
  toDo,
  setUser,
  setSentFriendRequests,
  colorPalette,
  refetch
}) {
  const [searchContent, setSearchContent] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  useEffect(() => {
    if (user && toDo == "manage") {
      const searchUsers = user.friends.filter((friend) => {
        const usernameMatches = friend.username.toLowerCase().includes(searchContent.toLowerCase());
        return usernameMatches
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
    <div
      className="p-8 w-full"
      style={{
        color: colorPalette ? colorPalette.text1 : "",
      }}
    >
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
            <div className="grow-0 flex">
              <div
                style={{
                  border:
                    colorPalette === undefined
                      ? ""
                      : `3px solid ${colorPalette.primary1}`,
                  color: colorPalette === undefined ? "" : colorPalette.primary1,
                  backgroundColor:
                    colorPalette === undefined ? "" : `${colorPalette.white}88`,
                }}
                className="rounded-md flex flex-row py-1 px-3 text-lg"
              >
                <input
                  type="text"
                  placeholder={"Search for a friend"}
                  className="p-1 grow bg-transparent font-galindo ml-2 w-[14rem] focus:outline-0"
                  onChange={(e) => setSearchContent(e.target.value)}
                ></input>
                <button className="h-full flex p-1 cursor-default">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toDo == "manage" ? (
        <div className="pt-8">
          You have {userFriends.length-1} friends in total
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col pt-8">
        <FriendsEditor
          userFriends={userFriends}
          setUserFriends={setUserFriends}
          usersOnlist={foundUsers}
          toDo={toDo}
          setUser={setUser}
          user={user}
          setSentFriendRequests={setSentFriendRequests}
          colorPalette={colorPalette}
          refetch={refetch}
        />
      </div>
    </div>
  );
}
