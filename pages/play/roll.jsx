import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RollResult from "../../components/play/roll/rollResult";
import { gameData } from "../../data/gameData";
import { showToastError } from "../../utils/toast";
import axios from "axios";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import cookies from "../../services/cookies/cookies";

export default function Roll({
  loading,
  user,
  setUser,
  setLoading,
  colorPalette,
}) {
  const router = useRouter();
  const [eggsLacked, setEggsLacked] = useState(0); // Used only if user does not have enough to buy eggs
  const [eggsOwned, setEggsOwned] = useState(0);
  const [flowersOwned, setFlowersOwned] = useState(0);
  const [afterRolling, setAfterRolling] = useState(0); // Flag used for showing rolling information
  const [slimes, setSlimes] = useState({});
  const [originalSlimes, setOriginalSlimes] = useState({});
  const [rolling, setRolling] = useState(false);

  const rollAnimationTimeout = 2900;

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    } else if (user.items) {
      // Set # eggs owned
      user.items.map((item) => {
        if (item.itemName === "Slime Egg") {
          setEggsOwned(item.quantity);
        }
      });

      // Set # flowers owned
      setFlowersOwned(user.flowers);
    }
  }, [user, loading]);

  const handlePurchaseEggs = (numToPurchase) => {
    // Check if user has enough flowers
    if (gameData.items["Slime Egg"].buyPrice * numToPurchase > flowersOwned) {
      setEggsLacked(0);
      showToastError("Sorry, you need to earn more flowers.");
      return;
    }

    const token = cookies.get("slime-scholars-webapp-token")

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(
        "/api/user/buy-item",
        {
          itemName: "Slime Egg",
          quantity: numToPurchase,
        },
        config
      )
      .then((response) => {
        setEggsLacked(0);
        if (user) {
          setOriginalSlimes(user.slimes);
        };
        setUser({...user})
        showToastError("Purchased successfully.", true);
      })
      .catch((error) => showToastError(error.message));
  };

  const handleRollBtnClick = (eggsNeed) => {
    // user does not have enough eggs
    if (eggsNeed - eggsOwned > 0) {
      setEggsLacked(eggsNeed - eggsOwned);
    } else {
      // user does have enough

      // only 1 egg works for now
      if (eggsNeed === 1) {
        const token = cookies.get("slime-scholars-webapp-token")
        setLoading(true);
        axios
          .post(
            "/api/slime/open-egg",
            {
              itemName: "Slime Egg",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setRolling(true);
            // Setup slimes for RollResult component
            let newSlimes = new Array();
            newSlimes.push(response.data.slime);
            setSlimes(newSlimes);
            setOriginalSlimes(response.data.originSlimeObjects);
            setUser({...user})
            setTimeout(() => {
              setLoading(false);
              setTimeout(() => {
                setRolling(false);
                setAfterRolling(2);
              }, rollAnimationTimeout);
            }, 150);
          })
          .catch((error) => {
            error?.response?.data?.message
              ? showToastError(error.response.data.message)
              : error?.message
              ? showToastError(error.message)
              : showToastError(error);
            setTimeout(() => {
              setLoading(false);
            }, 150);
          });
      } else {
        const token = cookies.get("slime-scholars-webapp-token")
        axios
          .post(
            "/api/slime/open-10eggs",
            {
              itemName: "Slime Egg",
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setSlimes(response.data.slimeObjects);
            setOriginalSlimes(response.data.originSlimeObjects);
            setRolling(true);
            setUser({...user})
            ;
            setTimeout(() => {
              setLoading(false);
              setTimeout(() => {
                setRolling(false);
                setAfterRolling(2);
              }, rollAnimationTimeout);
            }, 150);
          })
          .catch((error) => showToastError(error.message));
      }
    }
  };

  return (
    <div className="w-full h-full">
      {/* Popup Message for Lacking Eggs */}
      <div className="fixed inset-0 z-40 text-white flex items-center justify-center transition-opacity duration-300
      bg-black/[0.4]"
      style={{
        opacity: eggsLacked > 0 ? 1 : 0,
        zIndex: eggsLacked > 0 ? 2000 : -100,
      }}>
        <div className="relative flex flex-col gap-4 text-center bg-black/[0.8] px-12 pt-16 pb-12 rounded-lg">
          <div className="absolute top-0 right-0 m-4">
            <button className="text-2xl"
            onClick={() => {
              setEggsLacked(0)
            }}>
              <AiOutlineClose/>
            </button>
          </div>
          <div className="flex flex-row gap-[0.25em] font-galindo text-white text-2xl items-center">
            <span className="">
             You're missing {eggsLacked}
            </span>
            <Image
                src="/assets/items/slime-egg.png"
                alt="slime gel"
                height={0}
                width={0}
                sizes="100vw"
                className="w-[2rem] h-[2rem]"
            />
          </div>
          <button
            className="px-8 py-1 rounded-md bg-neutral-700/[0.6] text-white"
            onClick={() => {
              handlePurchaseEggs(eggsLacked);
            }}
          >
            <div className="flex flex-col gap-1 items-center">
              <span className="text-lg">Purchase</span>
              <div className="flex flex-row gap-[0.35em] text-md items-center justify-center">
                {eggsLacked * gameData.items["Slime Egg"].buyPrice}
                <Image
                  src="/assets/icons/flower.png"
                  alt="slime gel"
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="w-[1.5rem] h-[1.5rem]"
                />
              </div>
            </div>
          </button>
        </div>
      </div>
      {rolling && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white">
          <img src="/assets/misc/egg_rolling.gif" alt="Rolling Egg" />
        </div>
      )}
      {
        // Popup Message for Rolling Result
        afterRolling !== 0 && slimes && (
          <RollResult
            setAfterRolling={setAfterRolling}
            slimes={slimes}
            originalSlimes={originalSlimes}
            router={router}
          />
        )
      }
      <div
        className={
          eggsLacked > 0 || afterRolling
            ? "w-full h-full brightness-75"
            : "w-full h-full"
        }
      >
        <div className="flex flex-col items-center justify-center relative">
          <div className="flex flex-row gap-2 items-center font-galindo text-[1.75em]"
          style={{
            color: colorPalette ? colorPalette.text1 : "white"
          }}>
            Slime Eggs: {eggsOwned}
            {/* <Image
                src="/assets/items/slime-egg.png"
                alt="slime gel"
                height={0}
                width={0}
                sizes="100vw"
                className="w-[1.5em] h-[1.5em]"
            /> */}
          </div>
          {/* Image as background */}
          <Image
            src="/assets/roll-bg/primary-banner.png"
            alt="slime banner"
            height={0}
            width={0}
            sizes="100vw"
            className="ml-[50px] bg-cover w-[60%] h-auto inset-0 "
          />
          </div>
          {/* Buttons to roll */}
          <div className="w-full mt-5">
            <div className="flex justify-center">
              <div className="flex gap-8 content-en">
                <button
                  style={{
                    backgroundColor: colorPalette ? colorPalette.primary1 : "",
                    color: colorPalette ? colorPalette.text1 : "",
                    border: colorPalette
                      ? `3px solid ${colorPalette.primary2}`
                      : "",
                  }}
                  className="roll-button-animate pr-[5vw] w-[300px] flex flex-col justify-between rounded-lg text-white p-4 "
                  onClick={() => handleRollBtnClick(1)}
                >
                  <div className="flex flex-row font-galindo text-lg">
                    <p>Roll x1</p>
                    <Image
                      src="/assets/icons/slime-egg.png"
                      alt="slime egg"
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="h-6 w-auto px-2"
                    />
                  </div>
                  <p className=" text-xl font-galindo text-left">
                    {gameData.items["Slime Egg"].buyPrice + " FL"}
                  </p>
                </button>
                <button
                  style={{
                    backgroundColor: colorPalette ? colorPalette.primary1 : "",
                    color: colorPalette ? colorPalette.text1 : "",
                    border: colorPalette
                      ? `3px solid ${colorPalette.primary2}`
                      : "",
                  }}
                  className="roll-button-animate pr-[5vw] w-[300px] flex flex-col justify-between rounded-lg bg-red-400 text-white p-4 hover:bg-red-300"
                  onClick={() => handleRollBtnClick(10)}
                >
                  <div className="flex flex-row font-galindo text-lg">
                    <p>Roll x10</p>
                    <Image
                      src="/assets/icons/slime-egg.png"
                      alt="slime egg"
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="h-6 w-auto px-2"
                    />
                  </div>

                  <div className="flex flex-row text-left">
                    <p className="pr-1">GUARANTEED </p>
                    <p
                      className="font-bold"
                      style={{ color: gameData.rarityColours["Epic"].text }}
                    >
                      EPIC
                    </p>
                  </div>

                  <p className="text-xl font-galindo text-left pt-1">
                    {gameData.items["Slime Egg"].buyPrice * 10 + " FL"}
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
