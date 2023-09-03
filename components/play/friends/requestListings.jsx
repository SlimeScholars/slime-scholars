import React, { useEffect, useState } from "react";
import { gameData } from "../../../data/gameData";
import { showToastError } from "../../../utils/toast";
import axios from "axios";
import { set } from "mongoose";

export default function RequestListings({
  currentType,
  currentUser,
  setUser,
  sentFriendRequests,
  receivedFriendRequests,
  setReceivedFriendRequests,
  setSentFriendRequests,
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
        const newUser = {
          ...user,
          receivedFriendRequests: response.data.receivedFriendRequests,
          friends: response.data.friends,
        };
        setUser(newUser);
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
        if (currentType === "received") {
          const newUser = {
            ...user,
            receivedFriendRequests: response.data.receivedFriendRequests,
          };
          setUser(newUser);
          const updatedRequestListing = response.data.receivedFriendRequests;
          setReceivedFriendRequests(updatedRequestListing);
        } else {
          const newUser = {
            ...user,
            sentFriendRequests: response.data.sentFriendRequests,
          };
          setUser(newUser);
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
      {currentType == "received" ? (
        Array.isArray(receivedFriendRequests) ? (
          receivedFriendRequests.map((user, index) => (
            <div className="flex flex-row items-center py-4" key={index}>
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <div className="relative">
                  <img
                    src={
                      "/assets/pfp/backgrounds/" +
                      gameData.items[user.pfpBg].pfp
                    }
                    className="absolute inset-0"
                  ></img>
                  <img
                    src={
                      "/assets/pfp/slimes/" +
                      gameData.slimeImgs[user.pfpSlime].pfp
                    }
                    className="relative z-10 translate-y-1/4 scale-125"
                  ></img>
                </div>
              </div>
              <div className="grow px-4">
                {currentType == "received"
                  ? user.username + " requested to add you"
                  : "You requested to add " + user.username}
              </div>
              {
                // To accept friend request
                currentType == "received" ? (
                  <button
                    className="bg-none rounded-full pr-4 hover:bg-white p-3"
                    onClick={() => handleAcceptRequest(user._id)}
                  >
                    <span className="p-2 material-symbols-outlined">done</span>
                  </button>
                ) : (
                  <></>
                )
              }
              <button
                className="bg-none rounded-full pr-4 hover:bg-white p-3"
                onClick={() => handleDeleteRequest(user._id)}
              >
                <span className="p-2 material-symbols-outlined">delete</span>
              </button>
            </div>
          ))
        ) : (
          <p>No friend requests received.</p>
        )
      ) : Array.isArray(sentFriendRequests) ? (
        sentFriendRequests.map((user, index) => (
          <div className="flex flex-row items-center py-4" key={index}>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <div className="relative">
                <img
                  src={
                    "/assets/pfp/backgrounds/" + gameData.items[user.pfpBg].pfp
                  }
                  className="absolute inset-0"
                ></img>
                <img
                  src={
                    "/assets/pfp/slimes/" +
                    gameData.slimeImgs[user.pfpSlime].pfp
                  }
                  className="relative z-10 translate-y-1/4 scale-125"
                ></img>
              </div>
            </div>
            <div className="grow px-4">
              {currentType == "received"
                ? user.username + " requested to add you"
                : "You requested to add " + user.username}
            </div>
            {
              // To accept friend request
              currentType == "received" ? (
                <button
                  className="bg-none rounded-full pr-4 hover:bg-white p-3"
                  onClick={() => handleAcceptRequest(user._id)}
                >
                  <span className="p-2 material-symbols-outlined">done</span>
                </button>
              ) : (
                <></>
              )
            }
            <button
              className="bg-none rounded-full pr-4 hover:bg-white p-3"
              onClick={() => handleDeleteRequest(user._id)}
            >
              <span className="p-2 material-symbols-outlined">delete</span>
            </button>
          </div>
        ))
      ) : (
        <p>No friend requests sent.</p>
      )}
    </div>
  );
}
