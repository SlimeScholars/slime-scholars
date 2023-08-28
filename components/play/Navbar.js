import React, { useState, useEffect } from "react";
import EarnFlwrBtn from "./earnFlwrBtn";
import { useRouter } from "next/router";
import axios from "axios";

/*
Parameter:
  current: the id of the web page that the user is currently on
*/

export function Navbar({ current, user, numEggs, setNumEggs, flowers }) {
  const types = [
    { title: "shopping", src: "shopping", id: 1 },
    { title: "friends", src: "friends", id: 2 },
    { title: "slimes", src: "slimes", id: 3 },
    { title: "inventory", src: "inventory", id: 4 },
    { title: "roll", src: "slime-egg", id: 5 },
  ];

  const router = useRouter();
  const current_id = parseInt(current, 10);

  useEffect(() => {

    if (user && user.items) {
      user.items.map(item => {
        if (item.itemName === "Slime Egg") {
          setNumEggs(item.quantity);
        }
      });
    } 
    
  }, [user]);

  return (
    <div className="flex flex-row items-center justify-between z-20 w-full">
      {/* earn flowers button */}
      <div className=" bg-red-300 hover:bg-red-300/75 rounded text-lg">
        <EarnFlwrBtn />
      </div>
      <div className="flex flex-row space-x-2">
        <div className="flex flex-col justify-end content-start p-4">
          <div className="flex bg-white/50 opacity-60 rounded-md p-1">
            {/* slime gel */}
            {user && (
              <div className="flex flex-row items-center">
                <img
                  src="/assets/icons/slime-gel.png"
                  alt="Icon"
                  className="h-4 w-4 ml-1 mr-2"
                />
                <p className="text-black text-sm">{user.slimeGel}</p>
              </div>
            )}
          </div>
          <div className="flex bg-white/50 opacity-60 rounded-md mt-1 p-1">
            {/* flowers */}
            {user && (
              <div className="flex flex-row items-center">
                <img
                  src="/assets/icons/slime-gel.png"
                  alt="Icon"
                  className="h-4 w-4 ml-1 mr-2"
                />
                <p className="text-black text-sm">{flowers===null? (user.flowers) : (flowers)}</p>
              </div>
            )}
          </div>
          {/* Slime egg */}
          {
            (user && current_id===5) && (
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
        </div>
        {/* buttons and icons */}
        {types.map((type) => {
          const imgLink = "/assets/icons/" + type.src + ".png";
          const commonButtonClasses =
            "p-2 md:p-8 rounded-full hover:bg-red-300/75";
          const isActive = type.id === current_id;

          return (
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/play/" + type.title);
              }}
              className={`${isActive ? "bg-red-300" : "bg-white/50"
                } ${commonButtonClasses}`}
              key={type.id}
            >
              <img src={imgLink} className="h-10 w-10 md:h-14 md:w-14" alt="" />
            </button>
          );
        })}
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
      </div>
    </div>
  );
}
