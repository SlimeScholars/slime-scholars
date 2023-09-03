import React, { useState } from "react";
import RequestListings from "./requestListings";
import SwitchButton from "./switchButton";
import axios from "axios";

export default function FriendRequestsEditor({
  currentUser,
  setUser,
  sentFriendRequests,
  receivedFriendRequests,
  setReceivedFriendRequests,
  setSentFriendRequests,
}) {
  const [currentType, setCurrentType] = useState("received");

  return (
    <div className="p-8">
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <div className="grow text-xl">Friend Requests</div>

          <div className="shrink rounded-full border-2 border-red-200">
            <SwitchButton
              currentType={currentType}
              changeType={(type) => setCurrentType(type)}
              leftType="received"
              rightType="sent"
              leftText="Received"
              rightText="Sent"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-8">
        <RequestListings
          currentType={currentType}
          currentUser={currentUser}
          setUser={setUser}
          sentFriendRequests={sentFriendRequests}
          receivedFriendRequests={receivedFriendRequests}
          setReceivedFriendRequests={setReceivedFriendRequests}
          setSentFriendRequests={setSentFriendRequests}
        />
      </div>
    </div>
  );
}
