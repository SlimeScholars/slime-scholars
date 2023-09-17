import DisplaySlimes from "./slimes/DisplaySlimes";
import { gameData } from "../../data/gameData";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home({ user, setLoading, setUser, active, colorPalette, setColorPalette, refetchUser }) {
  const router = useRouter();

  useEffect(() => {
    if (user && user.bg && gameData.items[user.bg] && setColorPalette) {
      setColorPalette(gameData.items[user.bg]);
    }
  });

  if (!user) {
    return <></>;
  }

  return (
    <div
      className="w-full h-screen relative bg-bottom"
      style={{
        backgroundImage:
          colorPalette && colorPalette.bg ? `url('/assets/backgrounds/${colorPalette.bg}')` : '',
        backgroundSize: "cover",
      }}
    >
      <div
        className={`w-full h-full justify-center items-center ${!active ? "backdrop-brightness-[0.25] blur-sm" : ""
          }`}
      >
        <div className={`w-full h-full ${active ? "" : "relative"}`}>
          <DisplaySlimes
            user={user}
            setLoading={active ? setLoading : undefined}
            setUser={active ? setUser : undefined}
            colorPalette={colorPalette}
            refetchUser={refetchUser}
          />
          {!active && (
            <div
              className="fixed inset-0 backdrop-filter backdrop-brightness-[0.25] home"
            />
          )}
        </div>
      </div>
    </div>
  );
}
