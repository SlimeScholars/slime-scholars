import React, { useEffect, useState } from "react";
import { gameData } from "../../../data/gameData";
import { showToastError } from "../../../utils/toast";
import axios from "axios";
import Image from "next/image";

export default function RequestListings({
  currentType,
  setUser,
  sentFriendRequests,
  receivedFriendRequests,
  setReceivedFriendRequests,
  setSentFriendRequests,
  refetchUser
}) {
  function handleAcceptRequest(friendId) {
    axios
      .post(
        "/api/user/friend/accept",
        {
          friendId: friendId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        refetchUser()
        setReceivedFriendRequests(response.data.receivedFriendRequests);
        showToastError("Friend request accepted.", true);
      })
      .catch((error) => { });
  }

  function handleDeleteRequest(friendId) {
    const token = localStorage.getItem("jwt");

    // Set the authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        "/api/user/friend/delete-" + currentType,
        {
          friendId: friendId,
        },
        config
      )
      .then((response) => {
        refetchUser()
        if (currentType === "received") {
          const updatedRequestListing = response.data.receivedFriendRequests;
          setReceivedFriendRequests(updatedRequestListing);
        } else {
          const updatedRequestListing = response.data.sentFriendRequests;
          setSentFriendRequests(updatedRequestListing);
        }
        showToastError("Friend request deleted.", true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className="overflow-y-auto max-h-96">
      {currentType === "received" && (
        Array.isArray(receivedFriendRequests) ? (
          receivedFriendRequests.map((friendRequest, index) => (
            <div className="flex flex-row items-center py-4" key={index}>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <div className="relative">
                  <Image
                    src={
                      "/assets/pfp/backgrounds/" +
                      gameData.items[friendRequest.pfpBg].pfp
                    }
                    alt={friendRequest.pfpBg}
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="absolute inset-0 w-full h-full"
                  />
                  <Image
                    src={
                      "/assets/pfp/slimes/" +
                      gameData.slimeImgs[friendRequest.pfpSlime].pfp
                    }
                    alt={friendRequest.pfpSlime}
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"
                  />
                </div>
              </div>
              <div className="grow px-4">
                {currentType == "received"
                  ? friendRequest.username + " requested to add you"
                  : "You requested to add " + friendRequest.username}
              </div>
              {
                // To accept friend request
                currentType == "received" ? (
                  <button
                    className="bg-none rounded-full pr-4 hover:bg-white p-3"
                    onClick={() => handleAcceptRequest(friendRequest._id)}
                  >
                    <span className="p-2 material-symbols-outlined">done</span>
                  </button>
                ) : (
                  <></>
                )
              }
              <button
                className="bg-none rounded-full pr-4 hover:bg-white p-3"
                onClick={() => handleDeleteRequest(friendRequest._id)}
              >
                <span className="p-2 material-symbols-outlined">delete</span>
              </button>
            </div>
          ))
        ) : (
          <p>No friend requests received.</p>
        )
      )}

      {currentType === 'sent' && Array.isArray(sentFriendRequests) ? (
        <>
          {sentFriendRequests.map((friendRequest, index) => (
            <div className="flex flex-row items-center py-4" key={index}>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <div className="relative">
                  <Image
                    src={
                      "/assets/pfp/backgrounds/" +
                      gameData.items[friendRequest.pfpBg].pfp
                    }
                    alt={friendRequest.pfpBg}
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="absolute inset-0 w-full h-full"
                  />
                  <Image
                    src={
                      "/assets/pfp/slimes/" +
                      gameData.slimeImgs[friendRequest.pfpSlime].pfp
                    }
                    alt={friendRequest.pfpSlime}
                    height={0}
                    width={0}
                    sizes='100vw'
                    className="relative z-10 translate-y-1/4 scale-125 h-10 w-10"
                  />
                </div>
              </div>
              <div className="grow px-4">
                {currentType == "received"
                  ? friendRequest.username + " requested to add you"
                  : "You requested to add " + friendRequest.username}
              </div>
              {
                // To accept friend request
                currentType == "received" ? (
                  <button
                    className="bg-none rounded-full pr-4 hover:bg-white p-3"
                    onClick={() => handleAcceptRequest(friendRequest._id)}
                  >
                    <span className="p-2 material-symbols-outlined">done</span>
                  </button>
                ) : (
                  <></>
                )
              }
              <button
                className="bg-none rounded-full pr-4 hover:bg-white p-3"
                onClick={() => handleDeleteRequest(friendRequest._id)}
              >
                <span className="p-2 material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </>
      ) : (
        <p>No friend requests sent.</p>
      )}
    </div>
  );
}
