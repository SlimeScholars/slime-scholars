import React, { useState, useEffect } from "react";
import SearchFriends from "./searchFriends";
import FriendsEditor from "./friendsEditor";
import SearchBar from "../searchBar";
import axios from "axios";
import cookies from "../../../services/cookies/cookies";

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
  toDoChanged,
  setToDoChanged,
}) {
  const [searchContent, setSearchContent] = useState("");
  const [foundUsers, setFoundUsers] = useState([]);
  const [findingLoading, setFindingLoading] = useState(false);
  const [findingLoading2, setFindingLoading2] = useState(false);
  const [lastSearch, setLastSearch] = useState("");
  const [timer, setTimer] = useState(0);

  const timeDelay = 1200;

  //   TODO:
  //   useEffect(() => {
  //     console.log(foundUsers)
  //     console.log(searchContent)
  //     // Why is this not setting search content
  //     // setSearchContent('')
  //     setFoundUsers([])
  //   }, [toDo])

  useEffect(() => {
    if (toDoChanged) {
      setSearchContent("");
      if (toDo == "add") {
        setFoundUsers([]);
      }
      setToDoChanged(false);
    }
    if (user && toDo == "manage") {
      const searchUsers = user.friends.filter((friend) => {
        const usernameMatches = friend.username
          .toLowerCase()
          .includes(searchContent.toLowerCase());
        return usernameMatches;
      });
      setFoundUsers(searchUsers);
    } else if (user && toDo == "add") {
      //   console.log(timer)
      if (timer > 0) {
        return;
      }
      if (!findingLoading) {
        return;
      } else {
        setFindingLoading2(true);
        setFindingLoading(false);
      }

      if (searchContent.trim().length === 0) {
        setLastSearch("");
        setFoundUsers([]);
        return;
      }

      const token = cookies.get("slime-scholars-webapp-token");

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
          const newFoundUsers = response.data.users.filter((foundUser) => {
            return !user.friends.some((friend) => friend._id === foundUser._id);
          });
          setUser({...user})
          setFoundUsers(newFoundUsers);
          setFindingLoading2(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [searchContent, userFriends, toDo, user, timer, findingLoading]);

  useEffect(() => {
    if (toDo !== "add") {
      //   this seems wrong??
      //   setTimer(0)
      //   setSearchContent('')
      setFindingLoading(false);
      setFindingLoading2(false);
      return;
    }

    const decreaseTimer = async () => {
      await delay(10);
      setTimer(timer - 10);
    };

    if (searchContent !== lastSearch) {
      setLastSearch(searchContent);
      setFindingLoading2(true);
      setFindingLoading(true);
      setTimer(timeDelay);
    }

    if (timer > 0) {
      setFindingLoading2(true);
      setFindingLoading(true);
      decreaseTimer();
    }
  }, [timer, searchContent]);

  const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

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
                  backgroundColor: !colorPalette
                    ? ""
                    : `${colorPalette.white}88`,
                }}
                className="rounded-md flex flex-row py-1 px-3 text-lg"
              >
                <input
                  type="text"
                  placeholder={"Search for a friend"}
                  className="p-1 grow bg-transparent font-galindo ml-2 w-[14rem] focus:outline-0 search"
                  value={searchContent}
                  onChange={(e) => {
                    if (toDo === "add") {
                      setTimer(timeDelay);
                      setFindingLoading2(true);
                      setFindingLoading(true);
                    }
                    setSearchContent(e.target.value);
                  }}
                  style={{
                    color: colorPalette ? colorPalette.black : "",
                  }}
                />
                <button
                  className="h-full flex p-1 cursor-default"
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
          searchContent={searchContent}
          findingLoading={findingLoading || findingLoading2}
        />
      </div>
    </div>
  );
}
