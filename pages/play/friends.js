import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/play/Navbar";
import Leaderboard from "../../components/play/friends/Leaderboard";
import ManageFriends from "../../components/play/friends/ManageFriends";
import FriendRequestsEditor from "../../components/play/friends/FriendRequestsEditor";
import { gameData } from "../../data/gameData";
import axios from "axios";
import { gameData } from "../../data/gameData";
import Home from "../../components/play/Home";

export default function Friends({ loading, user }) {
  const router = useRouter();

  const [userFriends, setUserFriends] = useState("empty for now");
  const [allPlayers, setAllPlayers] = useState("empty for now");
  const [toDo, setToDo] = useState("manage");
  const [userId, setUserId] = useState("empty for now");
  const [sentFriendRequests, setSentFriendRequests] = useState("empty for now");
  const [receivedFriendRequests, setReceivedFriendRequests] =
    useState("empty for now");
  const [bg, setBg] = useState("bg-beach.png"); // Default background

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    } else {
      if (user.bg && gameData.items[user.bg].bg) {
        setBg(gameData.items[user.bg].bg);
      }
    }

    // Get userfriends for userfriendListings in leaderboard
    setUserFriends(user.friends);

    // Record user id for leaderboard listing background highlight
    setUserId(user._id);

    // Initialize friend requests
    setSentFriendRequests(user.sentFriendRequests);
    setReceivedFriendRequests(user.receivedFriendRequests);

    // Get allplayers for playerListings in leaderboard
    // Fetching top 20 players in order of exp
    const token = localStorage.getItem("jwt");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("/api/user/leaderboard", config)
      .then((response) => {
        setAllPlayers(response.data.leaderboard);
      })
      .catch((error) => {
        console.log("playersListings", error.message);
      });
  }, [user, loading]);

  return (
    <div
      className="w-screen h-screen"
      style={{
        backgroundImage: `url('/assets/backgrounds/${bg}')`,
        backgroundSize: "cover",
      }}
    >
      <div className="p-8 w-full h-full justify-center items-center backdrop-brightness-50">
        <Navbar current="2" className=""></Navbar>
        <div className="pt-5">
          <div className="items-center justify-between">
            {/*  Add Friend  and others */}
            <div className="flex flex-row bg-white/75 rounded-lg items-center">
              <div className="grow-0 pl-4">
                <img
                  src="/assets/icons/friends.png"
                  className="h-20 w-20"
                ></img>
              </div>
              <div className="grow pl-4 font-galindo text-xl">Friends</div>
              <div className="grow-0 flex grow pr-4">
                <button
                  className="p-2 text-xl bg-red-300 hover:bg-red-300/50 rounded-lg font-galindo"
                  onClick={() => {
                    if (toDo === "manage") {
                      setToDo("add");
                    } else {
                      setToDo("manage");
                    }
                  }}
                >
                  {toDo == "manage" ? "Add Friends" : "Manage Friends"}
                </button>
              </div>
            </div>

            {/* Default: leaderboard and managing friends */}
            <div className="pt-8 flex flex-row gap-4 items-start font-galindo">
              {/* Leaderboard */}
              <div className="pr-4 basis-1/2 ">
                <div className="bg-white/75 rounded-lg">
                  {toDo == "manage" ? (
                    <Leaderboard
                      userFriends={userFriends}
                      allPlayers={allPlayers}
                      userId={userId}
                    />
                  ) : (
                    <FriendRequestsEditor
                      currentUser={user}
                      sentFriendRequests={sentFriendRequests}
                      receivedFriendRequests={receivedFriendRequests}
                      setReceivedFriendRequests={setReceivedFriendRequests}
                      setSentFriendRequests={setSentFriendRequests}
                    />
                  )}
                </div>
              </div>

              {/* Manage Friends */}
              <div className="basis-1/2 bg-white/75 rounded-lg h-full">
                <div className="flex flex-row">
                  <ManageFriends
                    userFriends={userFriends}
                    toDo={toDo}
                    setUserFriends={setUserFriends}
                    setSentFriendRequests={setSentFriendRequests}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
