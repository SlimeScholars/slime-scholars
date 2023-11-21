import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { gameData } from "../../data/gameData";
import { FaChevronLeft } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import NextRewardTimer from "./slimes/NextRewardTimer";
import { playSound } from "../../utils/playSound";
import { AiFillQuestionCircle } from "react-icons/ai";
import ProfilePicture from "../main/profilePicture";

/*
Parameter:
  current: the id of the web page that the user is currently on
*/

export function Navbar({
  current,
  user,
  colorPalette,
  setPanelsVisible,
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

  const tutRef = useRef(null);

  const onHome = () => router.asPath == "/play";

  return (
    <div
      className="flex items-center justify-between z-20 w-full relative"
      style={{
        gridTemplateColumns: !onHome() ? "12rem 1fr" : "9rem 12rem 1fr",
      }}
    >
      <div className="flex flex-row gap-2 items-center">
        {/* home button */}
        {!onHome() && (
          <button
            className="rounded hover:opacity-80 font-galindo h-[4rem] transition-opacity duration-300 max-xl:absolute top-[4rem] p-1 max-xl:h-[3.5rem] mt-[0.5rem]"
            style={{
              color: !colorPalette ? "" : colorPalette.text1,
            }}
            onClick={(e) => {
              e.preventDefault();
              router.push("/play");
            }}
          >
            <FaChevronLeft className="inline text-lg max-2xl:h-3 max-xl:w-3 ml-2" />
            <HiHome className="inline text-5xl ml-1 -mt-0.5 mr-10 max-xl:h-6 max-xl:w-6" />
          </button>
        )}
        {/* earn flowers button */}
        <div>
          <button
            className={`pr-16 pl-16 rounded-md shake brightness-105 hover:brightness-110 font-galindo text-lg h-[4rem] transition-brightness duration-150 max-xl:absolute top-2 max-xl:text-md max-xl:p-3 max-xl:h-[3.5rem] 
            ${onHome() ? "left-0 top-3" : "left-0"}`}
            style={{
              backgroundColor: !colorPalette ? "" : colorPalette.primary2,
              color: !colorPalette ? "" : colorPalette.text2,
              boxShadow: !colorPalette
                ? ""
                : `0 0 2px ${colorPalette.primary2}`,
              background: `linear-gradient(90deg, ${
                !colorPalette ? "" : colorPalette.primary2
              } 0%, ${!colorPalette ? "" : colorPalette.primary1} 100%)`,
            }}
            onClick={(e) => {
              e.preventDefault();
              router.push("/courses");
            }}
          >
            Earn Flowers
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-2 justify-end font-galindo 2xl:text-lg text-md relative">
        <div className="flex flex-col items-end mr-[4rem] max-xl:absolute top-2 right-[12rem] cursor-default">
          {/* slime gel */}
          <div
            className="flex rounded-full pt-2 pb-1 pl-3 pr-5 w-fit"
            style={{
              backgroundColor: `${
                colorPalette ? colorPalette.black + "55" : "#475569"
              }`,
              color: `${colorPalette ? colorPalette.text1 : "#ffffff"}`,
              boxShadow: `${
                colorPalette ? "0px 0px 20px " + colorPalette.white + "0F" : ""
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
                <p className="max-xl:pr-5 max-xl:text-md">{user.slimeGel}</p>
              </div>
            )}
          </div>

          {/* flowers */}
          <div
            className="flex rounded-full pt-2 pb-1 pl-3 pr-5 w-fit mt-1.5 cursor-default"
            style={{
              backgroundColor: `${
                colorPalette ? colorPalette.black + "55" : "#475569"
              }`,
              color: `${colorPalette ? colorPalette.text1 : "#ffffff"}`,
              boxShadow: `${
                colorPalette ? "0px 0px 20px " + colorPalette.white + "0F" : ""
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
                <p className="max-xl:text-md">{user.flowers}</p>
              </div>
            )}
          </div>
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
                  if (type.id === 6) {
                    router.push("/settings");
                    return;
                  } else {
                    router.push("/play/" + type.title.toLowerCase());
                  }
                }}
                style={
                  isActive
                    ? {
                        backgroundColor: `${
                          colorPalette ? colorPalette.primary1 : "#ffffff"
                        }`,
                        border: `${
                          type.id === 6 && colorPalette !== undefined
                            ? `5px solid ${colorPalette.primary1}`
                            : ""
                        }`,
                        padding: type.id === 6 ? "0.7rem" : undefined,
                      }
                    : {
                        backgroundColor: `${
                          colorPalette ? colorPalette.white : "#ffff"
                        }88`,
                        border: `${
                          type.id === 6 && colorPalette !== undefined
                            ? `5px solid ${colorPalette.primary1}`
                            : ""
                        }`,
                        padding: type.id === 6 ? "0.7rem" : undefined,
                      }
                }
                className={`hover:opacity-100 hover:brightness-110 brightness-90 opacity-75 transition-all duration-300 rounded-full p-3 overflow-hidden relative box-border max-xl:w-[4.5rem] max-xl:h-[4.5rem] ${
                  type.id === 6
                    ? "2xl:w-[5.6rem] 2xl:h-[5.6rem] max-xl:w-[4.6rem] max-xl:h-[4.6rem] do-a-spin"
                    : "wiggle" // Apply larger size for 2xl screen and type.id 6
                }`}
                key={type.id}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={type.title}
                onMouseEnter={() => {
                  type.id === 6
                    ? playSound("whoop", 200)
                    : playSound("chch", 0);
                }}
              >
                {type.id === 6 ? (
                  <ProfilePicture user={user} />
                ) : (
                  <Image
                    src={imgLink}
                    alt={type.src}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-[4rem] w-[4rem] max-xl:w-[3rem] max-xl:h-[3rem]"
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
        {router.asPath === "/play" && (
          <div className="absolute top-[6.5rem] max-xl:top-[11rem] max-xl:text-sm">
            <div className="flex flex-row gap-4 items-center">
              <NextRewardTimer />
              <button
                className="flex items-center justify-center text-white/[0.65] hover:text-white/[0.8] text-[2.25em]"
                onClick={() => {
                  setTimeout(() => {
                    setPanelsVisible(true);
                  }, 150);
                }}
                ref={tutRef}
              >
                <AiFillQuestionCircle />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
