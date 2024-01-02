import SwitchButton from "./switchButton";
import LeadboardListing from "./leadboardListing";
import React, { useState } from "react";

export default function Leaderbaord({
  user,
  userRank,
  userFriends,
  allPlayers,
  userId,
  colorPalette,
}) {
  const [currentType, setCurrentType] = useState("friends");
  const [fold, setFold] = useState(false);
  return (
    <div
      className="p-8 max-xl:w-full cursor-pointer"
      style={{
        color: !colorPalette ? "" : colorPalette.text1,
      }}
      onClick={() => setFold((prevFold) => !prevFold)}
    >
      <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <div className="grow text-2xl">Leaderboard</div>
          <div
            className={`${fold && "max-xl" ? "hidden" : ""}`}
            onClick={() => setFold(true)}
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
      <div
        className={`flex flex-col grow pt-8 ${
          fold && "max-xl" ? "hidden" : ""
        }`}
      >
        {currentType === "friends" ? (
          <LeadboardListing
            user={user}
            users={userFriends}
            userId={userId}
            colorPalette={colorPalette}
          />
        ) : (
          <LeadboardListing
            user={user}
            userRank={userRank}
            users={allPlayers}
            userId={userId}
            colorPalette={colorPalette}
          />
        )}
      </div>
    </div>
  );
}
