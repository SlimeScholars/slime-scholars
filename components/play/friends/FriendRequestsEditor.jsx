import React, { useState } from "react";
import RequestListings from "./requestListings";
import SwitchButton from "./switchButton";

export default function FriendRequestsEditor({
  currentUser,
  setUser,
  sentFriendRequests,
  receivedFriendRequests,
  setReceivedFriendRequests,
  setSentFriendRequests,
  colorPalette,
  refetch
}) {
  const [currentType, setCurrentType] = useState("received");

  return (
    <div
      className="p-8"
      style={{
        color: colorPalette ? colorPalette.text1 : "",
      }}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <div className="grow text-xl">Friend Requests</div>

          <SwitchButton
            currentType={currentType}
            changeType={(type) => setCurrentType(type)}
            leftType="received"
            rightType="sent"
            leftText="Received"
            rightText="Sent"
            colorPalette={colorPalette}
          />
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
          refetch={refetch}
        />
      </div>
    </div>
  );
}
