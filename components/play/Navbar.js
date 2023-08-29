import React, { useState, useEffect } from "react";
import EarnFlwrBtn from "./earnFlwrBtn";
import { useRouter } from "next/router";
import { gameData } from "../../data/gameData";

/*
Parameter:
  current: the id of the web page that the user is currently on
*/

export function Navbar({ current, user }) {
  const types = [
    { title: "shopping", src: "shopping", id: 1 },
    { title: "friends", src: "friends", id: 2 },
    { title: "slimes", src: "slimes", id: 3 },
    { title: "inventory", src: "inventory", id: 4 },
    { title: "roll", src: "slime-egg", id: 5 },
  ];

  const router = useRouter();
  const current_id = parseInt(current, 10);
  const [numEggs, setNumEggs] = useState(0);

  // Custom color palette
  const [bg, setBg] = useState({})

  useEffect(() => {

    if (user && user.items) {
      user.items.map(item => {
        if (item.itemName === "Slime Egg") {
          setNumEggs(item.quantity);
        }
      });
    }

    if (user && user.bg) {
      const newBg = gameData.items[user.bg]
      if (newBg) {
        setBg(newBg)
      }
    }
  }, [user]);


  return (
    <div
      className="grid items-center justify-between z-20 w-full relative"
      style={{
        gridTemplateColumns: "14rem 1fr",
      }}
    >
      {/* earn flowers button */}
      <button
        className="rounded hover:opacity-80 h-full font-galindo text-xl"
        style={{
          backgroundColor: bg.primary1,
          color: bg.text1,
        }}
        onClick={
          (e) => {
            e.preventDefault()
            router.push("/courses")
          }
        }
      >
        Earn Flowers
      </button>
      <div className="flex flex-row items-center space-x-2 justify-end font-galindo text-lg">
        <div className="flex flex-col items-end">
          <div
            className="flex rounded-[5rem] py-1 px-6 w-fit"
            style={{
              backgroundColor: `${bg.black}55`,
              color: bg.text1,
              boxShadow: `0px 0px 20px ${bg.white}0F`
            }}
          >
            {/* slime gel */}
            {user && (
              <div className="flex flex-row items-center">
                <img
                  src="/assets/icons/slime-gel.png"
                  alt="Icon"
                  className="h-[1.7rem] w-[1.7rem] ml-1 mr-3"
                />
                <p className="">{user.slimeGel}</p>
              </div>
            )}
          </div>
          <div
            className="flex rounded-[5rem] py-1 px-6 w-fit mt-2"
            style={{
              backgroundColor: `${bg.black}55`,
              color: bg.text1,
              boxShadow: `0px 0px 20px ${bg.white}0F`
            }}
          >
            {/* flowers */}
            {user && (
              <div className="flex flex-row items-center">
                <img
                  src="/assets/icons/flower.png"
                  alt="Icon"
                  className="h-[1.7rem] w-[1.7rem] ml-1 mr-3"
                />
                <p className="">{user.flowers}</p>
              </div>
            )}
          </div>
          {/*
          FIXME
          Slime Egg
          {
            (user && current_id === 5) && (
              <div className="flex bg-white/50 opacity-60 rounded-md mt-1 p-1">
                {user && (
                  <div className="flex flex-row items-center">
                    <img
                      src="/assets/icons/slime-egg.png"
                      alt="Icon"
                      className="h-4 w-4 ml-1 mr-2"
                    />
                    <p className="text-black text-sm">{numEggs}</p>
                  </div>
                )}
              </div>
            )
          }
        */}
        </div>

        {/* buttons and icons */}
        {types.map((type) => {
          const imgLink = "/assets/icons/" + type.src + ".png";
          const commonButtonClasses =
            "p-4 rounded-full";
          const isActive = type.id === current_id;

          return (
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/play/" + type.title);
              }}
              style={
                isActive ? {
                  backgroundColor: `${bg.primary1}`,
                } : {
                  backgroundColor: `${bg.white}88`,
                }
              }
              className={`hover:opacity-60 ${commonButtonClasses}`}
              key={type.id}
            >
              <img src={imgLink} className="h-[4rem] w-[4rem]" alt={type.src} />
            </button>
          );
        })}
        {/* settings
        FIXME
        <div>
          <button
            className="p-2 bg-white"
            onClick={() => {
              router.push("/settings");
            }}
          >
            Settings
          </button>
        </div>
        */}
      </div>
    </div >
  );
}
