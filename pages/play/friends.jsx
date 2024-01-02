import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Leaderboard from "../../components/play/friends/Leaderboard";
import ManageFriends from "../../components/play/friends/ManageFriends";
import FriendRequestsEditor from "../../components/play/friends/FriendRequestsEditor";
import axios from "axios";
import Image from "next/image";
import cookies from "../../services/cookies/cookies";

export default function Friends({
  loading,
  setLoading,
  user,
  setUser,
  colorPalette,
}) {
  const router = useRouter();

  const [userFriends, setUserFriends] = useState("empty for now");
  const [userRank, setUserRank] = useState(0);
  const [allPlayers, setAllPlayers] = useState("empty for now");
  const [toDo, setToDo] = useState("manage");
  const [toDoChanged, setToDoChanged] = useState(false);
  const [userId, setUserId] = useState("empty for now");
  const [sentFriendRequests, setSentFriendRequests] = useState("empty for now");
  const [receivedFriendRequests, setReceivedFriendRequests] =
    useState("empty for now");

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      return
    }

    // Get userfriends for userfriendListings in leaderboard
    const friends = [...user.friends];
    let userInFriends = false;
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].exp < user.exp) {
        friends.splice(i, 0, user);
        userInFriends = true;
        break;
      }
    }
    if (!userInFriends) {
      friends.push(user);
    }
    setUserFriends(friends);

    // Record user id for leaderboard listing background highlight
    setUserId(user._id);

    // Initialize friend requests
    setSentFriendRequests(user.sentFriendRequests);
    setReceivedFriendRequests(user.receivedFriendRequests);

    // Get allplayers for playerListings in leaderboard
    // Fetching top 20 players in order of exp
    const token = cookies.get("slime-scholars-webapp-token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("/api/user/leaderboard", config)
      .then((response) => {
        console.log(response.data);
        setUserRank(response.data.userRank);
        setAllPlayers(response.data.leaderboard);
      })
      .catch((error) => {});
  }, [user, loading]);

  return (
    <>
      {/* Header */}
      <div
        style={{
          backgroundColor: !colorPalette ? "" : `${colorPalette.white}88`,
          color: !colorPalette ? "" : colorPalette.text1,
        }}
        className="flex flex-row rounded-lg items-center py-2 pl-6 pr-10"
      >
        <div className="grow-0 pl-4">
          <Image
            src="/assets/icons/friends.png"
            alt="friends"
            height={0}
            width={0}
            sizes="100vw"
            className="w-[4.5rem] h-[4.5rem]"
          />
        </div>
        <h2 className="grow pl-4 font-galindo text-2xl">Friends</h2>
        <div className="grow-0 flex pr-4">
          <div
            className="shrink rounded-full font-galindo"
            style={{
              border: `3px solid ${colorPalette ? colorPalette.primary2 : ""}`,
            }}
          >
            <div className="flex flex-row cursor-pointer">
              <div
                onClick={() => {
                  if (toDo === "add") {
                    setToDoChanged(true);
                  } else {
                    setToDoChanged(false);
                  }
                  setToDo("manage");
                }}
                style={{
                  background:
                    toDo === "manage" && colorPalette
                      ? colorPalette.primary1
                      : "none",
                }}
                className={`py-2 pl-3 rounded-full text-center ${
                  toDo === "manage" ? "pr-4 " : "pr-2 pulse"
                }`}
              >
                Manage Friends
              </div>
              <div
                onClick={() => {
                  if (toDo === "manage") {
                    setToDoChanged(true);
                  } else {
                    setToDoChanged(false);
                  }
                  setToDo("add");
                }}
                style={{
                  background:
                    toDo === "add" && colorPalette
                      ? colorPalette.primary1
                      : "none",
                }}
                className={`py-2 pr-3 rounded-full text-center ${
                  toDo === "add" ? "pl-4 " : "pl-2 pulse"
                }`}
              >
                Add Friends
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Default: leaderboard and managing friends */}
      <div className="pt-8 flex xl:flex-row gap-8 items-start font-galindo flex-col max-xl:gap-[0]">
        {/* Leaderboard */}
        <div
          className="basis-1/2 rounded-lg mb-10 w-full"
          style={{
            backgroundColor: !colorPalette ? "" : `${colorPalette.white}88`,
          }}
        >
          {toDo == "manage" ? (
            <Leaderboard
              user={user}
              userRank={userRank}
              userFriends={userFriends}
              allPlayers={allPlayers}
              userId={userId}
              colorPalette={colorPalette}
            />
          ) : (
            <FriendRequestsEditor
              currentUser={user}
              setUser={setUser}
              sentFriendRequests={sentFriendRequests}
              receivedFriendRequests={receivedFriendRequests}
              setReceivedFriendRequests={setReceivedFriendRequests}
              setSentFriendRequests={setSentFriendRequests}
              colorPalette={colorPalette}
            />
          )}
        </div>

        {/* Manage Friends */}
        <div
          className="basis-1/2 rounded-lg h-full w-full"
          style={{
            backgroundColor: !colorPalette ? "" : `${colorPalette.white}88`,
          }}
        >
          <div className="flex flex-row w-full">
            <ManageFriends
              user={user}
              userFriends={userFriends}
              setUserFriends={setUserFriends}
              toDo={toDo}
              setUser={setUser}
              setSentFriendRequests={setSentFriendRequests}
              colorPalette={colorPalette}
              toDoChanged={toDoChanged}
              setToDoChanged={setToDoChanged}
            />
          </div>
        </div>
      </div>
    </>
  );
}
