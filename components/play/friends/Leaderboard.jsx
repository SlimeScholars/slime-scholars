import SwitchButton from "./switchButton";
import LeadboardListing from "./leadboardListing";
import React, { useState } from "react";

export default function Leaderbaord({ user, userRank, userFriends, allPlayers, userId, colorPalette }) {
  const [currentType, setCurrentType] = useState("friends");
  return (
    <div
      className="p-8"
      style={{
        color: colorPalette === undefined ? "" : colorPalette.text1,
      }}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <div className="grow text-2xl">
            Leaderboard
          </div>

          <div
            className="shrink rounded-full"
            style={{
              border: `3px solid ${colorPalette ? colorPalette.primary2 : ""}`,
            }}
          >
            <SwitchButton
              currentType={currentType}
              changeType={(type) => setCurrentType(type)}
              leftType="friends"
              rightType="players"
              leftText="Friends"
              rightText="All Players"
              colorPalette={colorPalette}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col grow pt-8">
        {currentType === "friends" ? (
          <LeadboardListing
            user={user}
            users={userFriends}
            currentType={currentType}
            userId={userId}
            colorPalette={colorPalette}
          />
        ) : (
          <LeadboardListing
            user={user}
            userRank={userRank}
            users={allPlayers}
            currentType={currentType}
            userId={userId}
            colorPalette={colorPalette}
          />
        )}
      </div>
    </div>
  );
}
