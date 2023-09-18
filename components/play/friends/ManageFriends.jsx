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
  refetchUser,
}) {
  const [searchContent, setSearchContent] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [findingLoading, setFindingLoading] = useState(false)
  const [lastSearch, setLastSearch] = useState("")
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    console.log(foundUsers)
    console.log(searchContent)
    // Why is this not setting search content
    setSearchContent('')
    setFoundUsers([])
  }, [toDo])

  useEffect(() => {
    if (user && toDo == "manage") {
      const searchUsers = user.friends.filter((friend) => {
        const usernameMatches = friend.username.toLowerCase().includes(searchContent.toLowerCase());
        return usernameMatches
      });
      setFoundUsers(searchUsers);
    }

    else if (user && toDo == "add") {
      if (timer > 0) {
        return
      }
      if (!findingLoading) {
        return
      }

      const token = localStorage.getItem("jwt");

      // Set the authorization header
      const config = {
        params: {
          username: searchContent,
          userId: user._id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get("/api/user/search", config)
        .then((response) => {
          setFoundUsers(response.data.users);
          setFindingLoading(false)
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [searchContent, userFriends, toDo, user, timer, findingLoading]);

  useEffect(() => {
    if (toDo !== 'add') {
      setTimer(0)
      setSearchContent('')
      setFindingLoading(false)
      return
    }

    const decreaseTimer = async () => {
      await delay(10)
      setTimer(timer - 10)
    }

    if (searchContent !== lastSearch) {
      setLastSearch(searchContent)
      setFindingLoading(true)
      setTimer(800)
    }

    if (timer > 0) {
      setFindingLoading(true)
      decreaseTimer()
    }

    else {
      if (searchContent.trim().length === 0) {
        setLastSearch("")
        setFoundUsers([])
        setFindingLoading(false)
        return
      }
      if (searchContent === lastSearch) {
        return
      }
    }
  }, [timer, searchContent])

  const delay = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

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
                  color: !colorPalette ? "" : colorPalette.primary1,
                  backgroundColor:
                    !colorPalette ? "" : `${colorPalette.white}88`,
                }}
                className="rounded-md flex flex-row py-1 px-3 text-lg"
              >
                <input
                  type="text"
                  placeholder={"Search for a friend"}
                  className="p-1 grow bg-transparent font-galindo ml-2 w-[14rem] focus:outline-0"
                  value={searchContent}
                  onChange={(e) => {
                    if (toDo === 'add') {
                      setTimer(800)
                      setFindingLoading(true)
                    }
                    setSearchContent(e.target.value)
                  }}
                  style={{
                    color: colorPalette ? colorPalette.black : "",
                  }}
                />
                <button className="h-full flex p-1 cursor-default"
                  style={{
                    color: colorPalette ? colorPalette.black : "",
                  }}
                >
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {toDo == "manage" ? (
        <div className="pt-8">
          You have {Math.max(0, userFriends.length - 1)} friends in total
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
          refetchUser={refetchUser}
          searchContent={searchContent}
          findingLoading={findingLoading}
        />
      </div>
    </div>
  );
}
