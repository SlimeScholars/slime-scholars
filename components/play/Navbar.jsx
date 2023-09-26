import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { gameData } from "../../data/gameData";
import { FaChevronLeft } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import NextRewardTimer from "./slimes/NextRewardTimer";

/*
Parameter:
  current: the id of the web page that the user is currently on
*/

export function Navbar({
  current,
  user,
  numEggs,
  setNumEggs,
  flowers,
  colorPalette,
  setColorPalette,
}) {
  const types = [
    { title: "Shopping", src: "shopping", id: 1 }, 
    { title: "Friends", src: "friends", id: 2 },
    { title: "Slimes", src: "slimes", id: 3 },
    { title: "Inventory", src: "inventory", id: 4 },
    { title: "Roll", src: "slime-egg", id: 5 },
    { title: "Settings", id: 6 },
  ];

  const router = useRouter();
  const current_id = parseInt(current, 10);

  let onHome = true;
  for (let type of types) {
    if (type.id === current_id) {
      onHome = false;
      break;
    }
  }

  useEffect(() => {
    if (user && user.items) {
      user.items.map((item) => {
        if (item.itemName === "Slime Egg") {
          setNumEggs(item.quantity);
        }
      });
    }

    if (user) {
      setColorPalette(gameData.items[user.pfpBbg]);
    }
  }, [user]);

  return (
    <div
      className="flex items-center justify-between z-20 w-full relative"
      style={{
        gridTemplateColumns: onHome ? "12rem 1fr" : "9rem 12rem 1fr",
      }}
    >
      {/* home button */}
      {!onHome && (
        <button
          className="rounded hover:opacity-80 font-galindo h-[4rem] transition-opacity duration-150 max-xl:absolute top-[4rem] p-1 max-xl:h-[3.5rem]"
          style={{
            backgroundColor:
              !colorPalette ? "" : colorPalette.primary1,
            color: !colorPalette ? "" : colorPalette.text1,
          }}
          onClick={(e) => {
            e.preventDefault();
            router.push("/play");
          }}
        >
          <FaChevronLeft className="inline text-lg max-xl:h-3 max-xl:w-3 ml-2" />
          <HiHome className="inline text-3xl ml-1 -mt-0.5 mr-3 max-xl:h-6 max-xl:w-6" />
        </button>
      )}
      {/* earn flowers button */}
      <div>
        <button
          className={`pr-8 pl-8 rounded-md brightness-[1.05] hover:brightness-[1] font-galindo text-lg h-[4rem] transition-brightness duration-150 max-xl:absolute top-2 max-xl:text-sm max-xl:p-3 max-xl:h-[3rem] ${!onHome && 'absolute left-[6rem] top-3 max-xl:left-0'}`}
          style={{
            backgroundColor:
              !colorPalette ? "" : colorPalette.primary1,
            color: !colorPalette ? "" : colorPalette.text1,
            boxShadow: !colorPalette ? "" : `0 0 2px ${colorPalette.primary2}`
          }}
          onClick={(e) => {
            e.preventDefault();
            router.push("/courses");
          }}
        >
          Earn Flowers
        </button>
      </div>
      <div className="flex flex-row items-center space-x-2 justify-end font-galindo 2xl:text-lg text-md relative">
        <div className="flex flex-col items-end mr-5 max-xl:absolute top-2 right-[12rem]">
          {/* slime gel */}
          <div
            className="flex rounded-full py-1 px-6 w-fit"
            style={{
              backgroundColor: `${colorPalette ? colorPalette.black + "55" : "#475569"
                }`,
              color: `${colorPalette ? colorPalette.text1 : "#ffffff"}`,
              boxShadow: `${colorPalette ? "0px 0px 20px " + colorPalette.white + "0F" : ""
                }`,
            }}
          >
            {user && (
              <div className="flex flex-row items-center">
                <Image
                  src="/assets/icons/slime-gel.png"
                  alt="slime gel"
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="2xl:h-[1.7rem] 2xl:w-[1.7rem] h-[1.4rem] w-[1.4rem] 2xl:ml-1 mr-2 -mt-0.5"
                />
                <p className="max-xl:pr-5 max-xl:text-sm">{user.slimeGel}</p>
              </div>
            )}
          </div>

          {/* flowers */}
          <div
            className="flex rounded-full py-1 px-6 w-fit mt-1.5"
            style={{
              backgroundColor: `${colorPalette ? colorPalette.black + "55" : "#475569"
                }`,
              color: `${colorPalette ? colorPalette.text1 : "#ffffff"}`,
              boxShadow: `${colorPalette ? "0px 0px 20px " + colorPalette.white + "0F" : ""
                }`,
            }}
          >
            {user && (
              <div className="flex flex-row items-center">
                <Image
                  src="/assets/icons/flower.png"
                  alt="flowers"
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="2xl:h-[1.7rem] 2xl:w-[1.7rem] h-[1.4rem] w-[1.4rem] 2xl:ml-1 mr-2 -mt-0.5"
                />
                <p className="max-xl:text-sm">{flowers === null ? user.flowers : flowers}</p>
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
        <div className="flex gap-[1rem] max-xl:grid max-xl:grid-cols-3 max-xl:grid-rows-2 max-xl:gap-[0.5rem]">
        {types.map((type) => {
          const imgLink = "/assets/icons/" + type.src + ".png";
          const isActive = type.id === current_id;
          return (
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/play/" + type.title.toLowerCase());
              }}
              style={
                isActive
                  ? {
                    backgroundColor: `${colorPalette ? colorPalette.primary1 : "#ffffff"
                      }`,
                    border: `${type.id === 6 && colorPalette !== undefined
                      ? `5px solid ${colorPalette.primary1}`
                      : ""
                      }`,
                    padding: type.id === 6 ? "0.7rem" : undefined, // Add padding only when type.id is 6
                  }
                  : {
                    backgroundColor: `${colorPalette ? colorPalette.white : "#ffff"
                      }88`,
                    border: `${type.id === 6 && colorPalette !== undefined
                      ? `5px solid ${colorPalette.primary1}`
                      : ""
                      }`,
                    padding: type.id === 6 ? "0.7rem" : undefined, // Add padding only when type.id is 6
                  }
              }
              className={`hover:opacity-60 rounded-full p-3 overflow-hidden relative box-border max-xl:w-[3.5rem] max-xl:h-[3.5rem]${type.id === 6 ? "2xl:w-[5.6rem] 2xl:h-[5.6rem] max-xl:w-[3.6rem] max-xl:h-[3.6rem]" : "" // Apply larger size for 2xl screen and type.id 6
                }`}
              key={type.id}
              data-tooltip-id="my-tooltip"
              data-tooltip-content={type.title}
            >
              {type.id === 6 ? (
                user && user.pfpSlime ? (
                  <div className="relative flex items-center justify-center">
                    <div className="absolute h-32 w-32 overflow-hidden"
                    >
                      <Image
                        src={
                          "/assets/pfp/backgrounds/" + gameData.items[user.pfpBg].pfp
                        }
                        alt={user.pfpBg}
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="absolute h-32 w-32"
                      />
                    </div>
                    <Image
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimes[user.pfpSlime].pfp
                      }
                      alt={user.pfpSlime}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="relative z-10 translate-y-1/3 scale-150 w-[3.5rem] h-[3.5rem] max-xl:w-[2rem] max-xl:h-[2rem] max-xl:scale-300"
                    />
                  </div>
                ) : (
                  // Handle the case when user or user.pfpSlime is null or undefined
                  <div className="default-image">
                    {"/assets/pfp/slimes/blue-slime.png"}
                  </div>
                )
              ) : (
                <Image
                  src={imgLink}
                  alt={type.src}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="h-[4rem] w-[4rem] max-xl:w-[2rem] max-xl:h-[2rem]"
                />
              )}              
            </button>
          );
        })}
        </div>
        <Tooltip
                id="my-tooltip"
                delayShow={200}
                place="bottom"
                offset={20}
                style={{
                  backgroundColor: "black",
                  fontSize: "14px",
                  zIndex: "200",
                }}
              />
        {router.asPath === "/play" && <NextRewardTimer/>}
      </div>
    </div>
  );
}

