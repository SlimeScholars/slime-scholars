import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Leaderboard from "../../components/play/friends/Leaderboard";
import ManageFriends from "../../components/play/friends/ManageFriends";
import FriendRequestsEditor from "../../components/play/friends/FriendRequestsEditor";
import axios from "axios";
import Image from "next/image";

export default function Friends({ loading, setLoading, user, setUser, colorPalette }) {
  const router = useRouter();

  const [userFriends, setUserFriends] = useState("empty for now");
  const [userRank, setUserRank] = useState(0);
  const [allPlayers, setAllPlayers] = useState("empty for now");
  const [toDo, setToDo] = useState("manage");
  const [userId, setUserId] = useState("empty for now");
  const [sentFriendRequests, setSentFriendRequests] = useState("empty for now");
  const [receivedFriendRequests, setReceivedFriendRequests] =
    useState("empty for now");

  const refetchUser = async() => {
    setLoading(true)
    try{
      const token = localStorage.getItem('jwt')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
      .get("/api/user", config)
      .then((response) => {
        console.log(response)
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err)
        // If the json web token is invalid, remove it so no more requests will be made with the same token
        localStorage.removeItem("jwt");
        setUser(null);
        setLoading(false);
      });
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    }

    // Get userfriends for userfriendListings in leaderboard
    const friends = [...user.friends];
    friends.push(user)
    setUserFriends(friends);

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
        console.log(response.data);
        setUserRank(response.data.userRank);
        setAllPlayers(response.data.leaderboard);
      })
      .catch((error) => {
      });
  }, [user, loading]);

  return (
    <>
      {/* Header */}
      <div
        style={{
          backgroundColor:
            colorPalette === undefined ? "" : `${colorPalette.white}88`,
          color: colorPalette === undefined ? "" : colorPalette.text1,
        }}
        className="flex flex-row rounded-lg items-center py-2 pl-6 pr-10"
      >
        <div className="grow-0 pl-4">
          <Image
            src="/assets/icons/friends.png"
            alt='slimes'
            height={0}
            width={0}
            sizes='100vw'
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
                  setToDo('manage')
                }}
                style={{
                  background: toDo === 'manage' && colorPalette ? colorPalette.primary1 : "none",
                }}
                className={`py-2 pl-3 rounded-full text-center ${toDo === 'manage' ? 'pr-4' : 'pr-2'}`}
              >
                Manage Friends
              </div>
              <div
                onClick={() => {
                  setToDo('add')
                }}
                style={{
                  background: toDo === 'add' && colorPalette ? colorPalette.primary1 : "none",
                }}
                className={`py-2 pr-3 rounded-full text-center ${toDo === 'add' ? 'pl-4' : 'pl-2'}`}
              >
                Add Friends
              </div>
            </div >
          </div>

        </div>
      </div>

      {/* Default: leaderboard and managing friends */}
      <div
        className="pt-8 flex flex-row gap-8 items-start font-galindo"
      >
        {/* Leaderboard */}
        <div
          className="basis-1/2 rounded-lg mb-10"
          style={{
            backgroundColor:
              colorPalette === undefined ? "" : `${colorPalette.white}88`,
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
              refetchUser={refetchUser}
            />
          )}
        </div>

        {/* Manage Friends */}
        <div className="basis-1/2 bg-white/50 rounded-lg h-full">
          <div className="flex flex-row">
            <ManageFriends
              user={user}
              userFriends={userFriends}
              setUserFriends={setUserFriends}
              toDo={toDo}
              setUser={setUser}
              setSentFriendRequests={setSentFriendRequests}
              colorPalette={colorPalette}
              refetchUser={refetchUser}
            />
          </div>
        </div>
      </div>
    </>
  );
}
