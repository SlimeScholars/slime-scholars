import ItemInventory from "./itemInventory";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { gameData } from "../../../data/gameData";
import { showToastError } from "../../../utils/toast";
import axios from "axios";
import Image from "next/image";

export default function ItemDetails({
  item,
  user,
  pfpBg,
  setPfpBg,
  setItems,
  setItemOnClick,
  setUser,
  setNumEggs,
  setFlowers,
  colorPalette,
  setColorPalette,
  shopping,
  refetchUser,
}) {
  const [owned, setOwned] = useState(null);
  const [sellItemsNum, setSellItemsNum] = useState(
    item && item.quantity !== undefined ? item.quantity : 0
  );
  const [buyItemsNum, setBuyItemsNum] = useState(
    user ? user.flowers : 0
  )

  // Check if item is purchase everytime itemOnClick changes
  useEffect(() => {
    if (user && user.items) {
      if (user.items.find((userItem) => userItem.itemName === item.itemName)) {
        setOwned(true);
      } else {
        setOwned(false);
      }
    }
  }, [item, user]);

  const router = useRouter();

  // for shopping page,only backgrounds would be displayed
  if (shopping) {
    if (item.isBg) {
      return (
        <div className="rounded-lg p-8"
          style={{
            backgroundColor: colorPalette ? `${colorPalette.white}88` : "",
          }}>
          <div className="grid grid-cols-3 gap-8 h-full mb-8">
            <ItemInventory item={item} displayOnly="true" colorPalette={colorPalette} />
            {/* Item description */}
            <div className="col-span-2 rounded-lg px-8 py-4"
              style={{
                backgroundColor: `${colorPalette.black}88`,
              }}>
              <p
                style={{ color: gameData.rarityColours[item.rarity].text }}
                className={`text-2xl font-thin`}
              >
                {item && item.rarity}
              </p>
              <p className="text-2xl font-bold"
                style={{ color: colorPalette ? colorPalette.text1 : "" }}>{item.itemName}
              </p>
              {gameData.items[item.itemName].desc && (
                <p
                  className="text-md mt-3"
                  style={{ color: colorPalette ? colorPalette.text1 : "" }}
                >
                  {gameData.items[item.itemName].desc}
                </p>
              )}
              <div className="flex flex-row items-center p-4">
                <img
                  src="/assets/icons/slime-gel.png"
                  className="w-6 h-6 m-2"
                ></img>
                <p
                  style={{ color: `${colorPalette ? colorPalette.text1 : "#ffffff"}` }}>
                  {item.buyPrice}</p>
              </div>
            </div>
            {/* pfp comparison */}
            <div className="col-span-3 rounded-lg p-6"
              style={{
                backgroundColor: `${colorPalette.black}88`,
              }}>
              <div className="flex flex-row w-full items-center flex-wrap justify-center">
                <div className="flex flex-col items-center">
                  {/* Display current profile picture */}
                  <p style={{ color: colorPalette ? colorPalette.text1 : "" }}>
                    Current</p>
                  <div
                    className="relative rounded-full overflow-hidden"
                    style={{
                      border:
                        colorPalette === undefined
                          ? ""
                          : `5px solid ${colorPalette.primary1}`,
                    }}
                  >
                    {
                      <Image
                        src={
                          "/assets/pfp/backgrounds/" +
                          gameData.items[user.pfpBg].bg
                        }
                        alt={pfpBg}
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="absolute inset-0 w-full h-full"
                      />
                    }
                    <Image
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimes[user.pfpSlime].pfp
                      }
                      alt={user.pfpSlime}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="relative z-10 translate-y-1/4 scale-125 w-[5.5rem] h-[5.5rem]"
                    />
                  </div>
                </div>
                <div>
                  <span
                    className="material-symbols-outlined scale-150 mx-6"
                    style={{ color: colorPalette ? colorPalette.text1 : "" }}
                  >
                    arrow_forward
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <p style={{ color: colorPalette ? colorPalette.text1 : "" }}>
                    Updated</p>
                  <div
                    className="relative rounded-full overflow-hidden"
                    style={{
                      border:
                        colorPalette === undefined
                          ? ""
                          : `5px solid ${colorPalette.primary1}`,
                    }}
                  >
                    <Image
                      src={"/assets/pfp/backgrounds/" + item.pfp}
                      alt={item.itemName}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="absolute inset-0 w-full h-full"
                    />
                    <Image
                      src={
                        "/assets/pfp/slimes/" +
                        gameData.slimes[user.pfpSlime].pfp
                      }
                      alt={user.pfpSlime}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="relative z-10 translate-y-1/4 scale-125 w-[5.5rem] h-[5.5rem]"
                    />
                  </div>
                </div>
                <div className="flex flex-col ml-5">
                  {owned ? (
                    <button className="rounded-s-lg py-4 h-full w-[15rem]" disabled
                      style={{
                        backgroundColor: colorPalette
                          ? `${colorPalette.black}66`
                          : "",
                        color: colorPalette ? colorPalette.black : "",
                      }}>
                      Purchased Already
                    </button>
                  ) : (
                    <button
                      className="rounded-s-lg py-4 h-full w-[15rem]"
                      style={{
                        backgroundColor: colorPalette ? colorPalette.primary1 : "",
                        color: colorPalette ? colorPalette.text1 : "",
                      }}
                      onClick={(e) => {
                        // Check if user has enough slime gels
                        if (user) {
                          if (user.slimeGel < item.buyPrice) {
                            showToastError("You do not have enough slime gels.");
                            return;
                          }
                        }
                        axios
                          .post(
                            "/api/user/buy-item",
                            {
                              itemName: item.itemName,
                              quantity: 1,
                            },
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "jwt"
                                )}`,
                              },
                            }
                          )
                          .then((response) => {
                            refetchUser()
                            setOwned(true);
                            showToastError(
                              "Picture purchased successfully.",
                              true
                            );
                          })
                          .catch((error) => {
                            showToastError(error.message);
                          });
                      }}
                    >
                      Purchase Picture
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="grid grid-cols-3 p-8 gap-8 rounded-lg"
          style={{
            backgroundColor: colorPalette ? `${colorPalette.white}88` : "",
          }}
        >
          <ItemInventory
            item={item}
            displayOnly="true"
            colorPalette={colorPalette}
          />
          {/* Item description */}
          <div
            className="col-span-2 rounded-lg px-8 py-4"
            style={{
              backgroundColor: colorPalette ? `${colorPalette.black}88` : "",
            }}
          >
            <p
              className={`text-2xl font-thin`}
              style={{ color: gameData.rarityColours[item.rarity].text }}
            >
              {item.rarity}
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: colorPalette ? colorPalette.text1 : "" }}
            >
              {item.itemName}
            </p>
            {gameData.items[item.itemName].desc && (
              <p
                className="text-md mt-3"
                style={{ color: colorPalette ? colorPalette.text1 : "" }}
              >
                {gameData.items[item.itemName].desc}
              </p>
            )}
          </div>
          {/* Buy Item */}
          <div
            className="col-span-3 rounded-lg p-6"
            style={{
              backgroundColor: colorPalette ? `${colorPalette.black}88` : "",
              color: colorPalette ? colorPalette.text1 : "",
            }}
          >
            <div className="flex flex-row w-full items-center">
              <div className="grow">Buy Item</div>
              <div className="shrink px-1">Buy for:</div>
              {item.buyCurrency == 1 ? (
                <div className="text-orange-300 px-1">
                  {item.buyPrice + " FL each"}
                </div>
              ) : (
                <div className="text-orange-300 px-1">
                  {item.buyPrice + " SG each"}
                </div>
              )}
            </div>
            <div className="flex flex-row w-full items-center p-2">
              <div className="shrink px-2">{buyItemsNum}</div>
              <div className="grow">
                <input
                  type="range"
                  min="0"
                  max={user ? user.flowers : 0}
                  step="1"
                  className="w-full"
                  value={buyItemsNum}
                  onChange={(e) => {
                    setBuyItemsNum(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="mx-1 shrink">
                <input
                  type="number"
                  className="p-2 rounded-lg w-[7rem]"
                  style={{
                    border:
                      colorPalette === undefined
                        ? ""
                        : `5px solid ${colorPalette.primary1}`,
                    backgroundColor: colorPalette
                      ? `${colorPalette.white}88`
                      : "",
                    color: colorPalette ? colorPalette.primary1 : "",
                  }}
                  value={buyItemsNum}
                  onChange={(e) => {
                    setBuyItemsNum(e.target.value);
                  }}
                ></input>
              </div>
              <div className="flex-row flex ml-auto">
                {/* Buy button */}
                <div className="shrink px-1">
                  <button
                    className="rounded-lg px-4 h-full"
                    style={{
                      backgroundColor: colorPalette
                        ? colorPalette.secondary1
                        : "",
                    }}
                    onClick={(e) => {
                      const config = {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                        },
                      };
                      axios
                        .post(
                          "/api/user/buy-item",
                          {
                            itemName: item.itemName,
                            quantity: buyItemsNum,
                          },
                          config
                        )
                        .then((response) => {

                          refetchUser()

                          // Prompt message to gui
                          showToastError(
                            buyItemsNum === 1 ? "Item purchased" : "Items purchased",
                            true
                          );
                        })
                        .catch((error) => showToastError(error.message));
                    }}
                  >
                    Buy
                  </button>
                </div>
                {/* Flower or Gel icon */}
                <div className="shrink px-1">
                  {item.buyCurrency === 1 ? (
                    <Image
                      src="/assets/icons/flower.png"
                      alt="flowers"
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="w-10 h-10 y-10 brightness-75"
                    />
                  ) : (
                    <Image
                      src="/assets/icons/slime-gel.png"
                      alt="slime gel"
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="w-10 h-10 y-10 brightness-75"
                    />
                  )}
                </div>
                <div className="shrink p-3 text-center">
                  <p>{buyItemsNum * item.buyPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

  }

  // for background
  if (item.isBg && gameData.items[item.itemName]) {
    return (
      <div
        style={{
          backgroundColor: colorPalette ? `${colorPalette.white}88` : "",
        }}
        className="rounded-lg p-8"
      >
        <div className="grid-cols-3 grid gap-8 h-full mb-8">
          <ItemInventory
            item={item}
            displayOnly="true"
            colorPalette={colorPalette}
          />
          {/* Item description */}
          <div
            className="col-span-2 rounded-lg px-8 py-4"
            style={{
              backgroundColor: `${colorPalette.black}88`,
            }}
          >
            <p
              className={`text-2xl font-thin`}
              style={{ color: gameData.rarityColours[item.rarity].text }}
            >
              {item.rarity}
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: colorPalette ? colorPalette.text1 : "" }}
            >
              {item.itemName}
            </p>
            {gameData.items[item.itemName].desc && (
              <p
                className="text-md mt-3"
                style={{ color: colorPalette ? colorPalette.text1 : "" }}
              >
                {gameData.items[item.itemName].desc}
              </p>
            )}
          </div>
        </div>

        {/* Change pfp comparison */}
        <div
          className="col-span-3 rounded-lg p-6 grid 2xl:grid-cols-2"
          style={{
            backgroundColor: `${colorPalette.black}88`,
          }}
        >
          <div className="flex flex-row w-full items-center flex-wrap justify-center -mt-1.5">
            <div className="flex flex-col items-center">
              {/* Display current profile picture */}
              <p style={{ color: colorPalette ? colorPalette.text1 : "" }}>
                Current
              </p>
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  border:
                    colorPalette === undefined
                      ? ""
                      : `5px solid ${colorPalette.primary1}`,
                  cursor: "pointer"
                }}
                onClick={() => {
                  router.push("/settings");
                }}
              >
                {
                  <Image
                    src={"/assets/pfp/backgrounds/" + gameData.items[pfpBg].pfp}
                    alt={pfpBg}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="absolute inset-0 w-full h-full"
                  />
                }
                <Image
                  src={
                    "/assets/pfp/slimes/" +
                    gameData.slimes[user.pfpSlime].pfp
                  }
                  alt={user.pfpSlime}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="relative z-10 translate-y-1/4 scale-125 w-[5.5rem] h-[5.5rem]"
                />
              </div>
            </div>
            <span
              className="material-symbols-outlined scale-150 mx-6"
              style={{ color: colorPalette ? colorPalette.text1 : "" }}
            >
              arrow_forward
            </span>
            <div className="flex flex-col items-center">
              <p style={{ color: colorPalette ? colorPalette.text1 : "" }}>
                Updated
              </p>
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  border:
                    colorPalette === undefined
                      ? ""
                      : `5px solid ${colorPalette.primary1}`,
                }}
              >
                <Image
                  src={
                    "/assets/pfp/backgrounds/" +
                    gameData.items[item.itemName].pfp
                  }
                  alt={item.itemName}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full"
                />
                <Image
                  src={
                    "/assets/pfp/slimes/" +
                    gameData.slimes[user.pfpSlime].pfp
                  }
                  alt={user.pfpSlime}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="relative z-10 translate-y-1/4 scale-125 w-[5.5rem] h-[5.5rem]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            {pfpBg === item.itemName ? (
              <button
                disabled
                className="rounded-lg py-4 h-full w-[15rem] mt-4"
                style={{
                  backgroundColor: colorPalette
                    ? `${colorPalette.black}66`
                    : "",
                  color: colorPalette ? colorPalette.black : "",
                }}
              >
                Equipped as Profile
              </button>
            ) : (
              <button
                className="rounded-lg py-4 h-full w-[15rem] mt-4"
                style={{
                  backgroundColor: colorPalette ? colorPalette.primary1 : "",
                  color: colorPalette ? colorPalette.text1 : "",
                }}
                onClick={(e) => {
                  axios
                    .put(
                      "/api/user/change-pfp",
                      {
                        pfpSlime: user.pfpSlime,
                        pfpBg: item.itemName,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "jwt"
                          )}`,
                        },
                      }
                    )
                    .then((response) => {
                      refetchUser()
                      setPfpBg(response.data.pfpBg);
                      showToastError("Profile background was changed.", true);
                    })
                    .catch((error) => {
                      showToastError(error.message);
                    });
                }}
              >
                Equip to Profile
              </button>
            )}

            {gameData.items[item.itemName].bg === colorPalette.bg ? (
              <button
                disabled
                className="rounded-lg py-4 h-full w-[15rem] mt-4"
                style={{
                  backgroundColor: colorPalette
                    ? `${colorPalette.black}66`
                    : "",
                  color: colorPalette ? colorPalette.black : "",
                }}
              >
                Equipped as Background
              </button>
            ) : (
              <button
                className="rounded-lg py-4 h-full w-[15rem] mt-4"
                style={{
                  backgroundColor: colorPalette ? colorPalette.primary1 : "",
                  color: colorPalette ? colorPalette.text1 : "",
                }}
                onClick={(e) => {
                  axios
                    .put(
                      "/api/user/change-bg",
                      {
                        bg: item.itemName,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "jwt"
                          )}`,
                        },
                      }
                    )
                    .then((response) => {
                      refetchUser()
                      setColorPalette(gameData.items[item.itemName]);
                    })
                    .catch((error) => {
                      console.log(error)
                      showToastError(error.message);
                    });
                }}
              >
                Equip as background
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // for eggs
  if (
    gameData.items[item.itemName] &&
    gameData.rarityColours[item.rarity].text
  ) {
    return (
      <div
        className="grid grid-cols-3 p-8 gap-8 rounded-lg"
        style={{
          backgroundColor: colorPalette ? `${colorPalette.white}88` : "",
        }}
      >
        <ItemInventory
          item={item}
          displayOnly="true"
          colorPalette={colorPalette}
        />
        {/* Item description */}
        <div
          className="col-span-2 rounded-lg px-8 py-4"
          style={{
            backgroundColor: colorPalette ? `${colorPalette.black}88` : "",
          }}
        >
          <p
            className={`text-2xl font-thin`}
            style={{ color: gameData.rarityColours[item.rarity].text }}
          >
            {item.rarity}
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: colorPalette ? colorPalette.text1 : "" }}
          >
            {item.itemName}
          </p>
          {gameData.items[item.itemName].desc && (
            <p
              className="text-md mt-3"
              style={{ color: colorPalette ? colorPalette.text1 : "" }}
            >
              {gameData.items[item.itemName].desc}
            </p>
          )}
        </div>
        {/* Sell Item */}
        <div
          className="col-span-3 rounded-lg p-6"
          style={{
            backgroundColor: colorPalette ? `${colorPalette.black}88` : "",
            color: colorPalette ? colorPalette.text1 : "",
          }}
        >
          <div className="flex flex-row w-full items-center">
            <div className="grow">Sell Item</div>
            <div className="shrink px-1">Sell for:</div>
            {item.sellCurrency == 1 ? (
              <div className="text-orange-300 px-1">
                {item.sellPrice + " FL each"}
              </div>
            ) : (
              <div className="text-orange-300 px-1">
                {item.sellPrice + " SG each"}
              </div>
            )}
          </div>
          <div className="flex flex-row w-full items-center p-2">
            <div className="shrink px-2">{sellItemsNum}</div>
            <div className="grow">
              <input
                type="range"
                min="0"
                max={item.quantity}
                step="1"
                className="w-full"
                value={sellItemsNum}
                onChange={(e) => {
                  setSellItemsNum(e.target.value);
                }}
              />
            </div>
            <div className="px-2">{item.quantity}</div>
          </div>
          <div className="flex flex-row w-full">
            <div className="mx-1 shrink">
              <input
                type="number"
                className="p-2 rounded-lg w-[7rem]"
                style={{
                  border:
                    colorPalette === undefined
                      ? ""
                      : `5px solid ${colorPalette.primary1}`,
                  backgroundColor: colorPalette
                    ? `${colorPalette.white}88`
                    : "",
                  color: colorPalette ? colorPalette.primary1 : "",
                }}
                value={sellItemsNum}
                onChange={(e) => {
                  setSellItemsNum(e.target.value);
                }}
              ></input>
            </div>
            <div className="px-1">
              <button
                className="whitespcace-no-wrap rounded-lg px-4 h-full"
                style={{
                  backgroundColor: colorPalette ? colorPalette.primary1 : "",
                }}
                onClick={(e) => {
                  setSellItemsNum(item.quantity - 1);
                }}
              >
                All but 1
              </button>
            </div>
            <div className="shrink px-1">
              <button
                className="rounded-lg px-4 h-full"
                style={{
                  backgroundColor: colorPalette ? colorPalette.primary1 : "",
                }}
                onClick={(e) => {
                  setSellItemsNum(item.quantity);
                }}
              >
                All
              </button>
            </div>
            <div className="flex-row flex ml-auto">
              {/* Sell button */}
              <div className="shrink px-1">
                <button
                  className="rounded-lg px-4 h-full"
                  style={{
                    backgroundColor: colorPalette
                      ? colorPalette.secondary1
                      : "",
                  }}
                  onClick={(e) => {
                    const config = {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                      },
                    };
                    axios
                      .post(
                        "/api/user/sell-item",
                        {
                          itemName: item.itemName,
                          quantity: sellItemsNum,
                        },
                        config
                      )
                      .then((response) => {
                        // Inluding flowers, slimeGel, items

                        // if all of the current item is sold, show details of the first item returned
                        let numItemsLeft = 0;

                        // Reset the current item to update the item quantity
                        response.data.items.map((returnedItem) => {
                          if (returnedItem.itemName === item.itemName) {
                            numItemsLeft = returnedItem.quantity;
                            setItemOnClick(returnedItem);
                          }
                        });

                        // Sync # flowers and eggs data with navbar
                        setFlowers(response.data.flowers);
                        if (item.itemName === "Slime Egg") {
                          setNumEggs(numItemsLeft);
                        }

                        if (numItemsLeft === 0) {
                          setItemOnClick(response.data.items[0]);
                        }

                        setItems(response.data.items);

                        // Prompt message to gui
                        showToastError(
                          sellItemsNum === 1 ? "Item sold" : "Items sold",
                          true
                        );
                      })
                      .catch((error) => showToastError(error.message));
                  }}
                >
                  Sell
                </button>
              </div>
              {/* Flower or Gel icon */}
              <div className="shrink px-1">
                {item.sellCurrency === 1 ? (
                  <Image
                    src="/assets/icons/flower.png"
                    alt="flowers"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="w-10 h-10 y-10 brightness-75"
                  />
                ) : (
                  <Image
                    src="/assets/icons/slime-gel.png"
                    alt="slime gel"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="w-10 h-10 y-10 brightness-75"
                  />
                )}
              </div>
              <div className="shrink p-3 text-center">
                <p>{sellItemsNum * item.sellPrice}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Open eggs */}
        <div className="col-span-3 bg-black/40 rounded-lg p-6">
          <p
            className="text-red-300 hover:text-red-300/75"
            onClick={(e) => {
              router.push("/play/roll");
            }}
          >
            Open Egg
          </p>
        </div>
      </div>
    );
  }
}
