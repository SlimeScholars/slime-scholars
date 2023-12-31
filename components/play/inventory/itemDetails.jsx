import ItemInventory from "./itemInventory";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { gameData } from "../../../data/gameData";
import { showToastError } from "../../../utils/toast";
import axios from "axios";
import Image from "next/image";
import { set } from "mongoose";
import cookies from "../../../services/cookies/cookies";

export default function ItemDetails({
  item,
  user,
  setItems,
  setItemOnClick,
  setUser,
  setFlowers,
  colorPalette,
  shopping,
}) {
  const [owned, setOwned] = useState(null);
  const [sellItemsNum, setSellItemsNum] = useState(
    item && item.quantity !== undefined ? item.quantity : 0
  );
  const [buyItemsNum, setBuyItemsNum] = useState(1);

  // Check if item is purchase everytime itemOnClick changes
  useEffect(() => {
    if (user && user.items) {
      setOwned(user.items.find((userItem) => userItem.itemName === item.itemName));
    }
  }, [item, user]);

  const router = useRouter();

  const handleBuyItem = () => {
    try {
      const token = cookies.get("slime-scholars-webapp-token")

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (gameData.items[item.itemName].buyCurrency === 0) {
        if (user.slimeGel < gameData.items[item.itemName].buyPrice) {
          showToastError("Insufficient slime gel.");
          return;
        }
      } else if (gameData.items[item.itemName].buyCurrency === 1) {
        if (user.flowers < gameData.items[item.itemName].buyPrice) {
          showToastError("Insufficient flowers.");
          return;
        }
      }

      axios
        .post(
          "/api/user/buy-item",
          { itemName: item.itemName, quantity: 1 },
          config
        )
        .then((response) => {
          setUser({...user})
        })
        .catch((error) => {
          if (error?.response?.data?.message)
            showToastError(error.response.data.message);
          else if (error?.message) showToastError(error.message);
          else showToastError(error);
          ;
          return;
        });
    } catch (error) {
      if (error?.response?.data?.message)
        showToastError(error.response.data.message);
      else if (error?.message) showToastError(error.message);
      else showToastError(error);
      ;
      return;
    }
  };

  // for shopping page,only backgrounds would be displayed
  if (shopping) {
    if (gameData.items[item.itemName].isBg) {
      return (
        <div
          style={{
            backgroundColor: colorPalette ? `${colorPalette.white}88` : "",
          }}
          className="rounded-lg p-8"
        >
          <div className="2xl:grid-cols-2 grid gap-8 h-full mb-8">
            <ItemInventory
              item={item}
              displayOnly="true"
              colorPalette={colorPalette}
            />
            {/* Item description */}
            <div
              className="rounded-lg px-8 py-4 relative"
              style={{
                backgroundColor: `${colorPalette.black}88`,
              }}
            >
              <p
                className={`text-2xl font-thin`}
                style={{
                  color:
                    gameData.rarityColours[gameData.items[item.itemName].rarity]
                      .text,
                }}
              >
                {gameData.items[item.itemName].rarity}
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

              {/* Buy Item */}

              {owned ? (
                <button
                  disabled
                  className="py-1 px-4 rounded-lg 2xl:absolute 2xl:bottom-8 2xl:right-8 2xl:mt-0 mt-8"
                  style={{
                    backgroundColor: colorPalette
                      ? `${colorPalette.black}66`
                      : "",
                    color: colorPalette ? colorPalette.white + "70" : "",
                  }}
                >
                  Owned
                </button>
              ) : (
                <button
                  className={`py-1 px-4 rounded-lg 2xl:absolute 2xl:bottom-8 2xl:right-8 2xl:mt-0 mt-8 hover:brightness-110 transition-all duration-150 ${
                    gameData.items[item.itemName].buyCurrency === 0
                      ? user.slimeGel < gameData.items[item.itemName].buyPrice
                        ? "grayscale"
                        : ""
                      : user.flowers < gameData.items[item.itemName].buyPrice
                      ? "grayscale"
                      : ""
                  }`}
                  style={{
                    backgroundColor: colorPalette?.primary1,
                    color: colorPalette?.text1,
                  }}
                  onClick={handleBuyItem}
                >
                  <div className="flex flex-row justify-center items-center">
                    <div>Buy Item</div>
                    <div className="mx-3">|</div>
                    <div className="flex flex-row items-center">
                      {gameData.items[item.itemName].buyPrice}
                      {gameData.items[item.itemName].buyCurrency === 0 ? (
                        <Image
                          src="/assets/icons/slime-gel.png"
                          alt="slime gel"
                          width={0}
                          height={0}
                          sizes={"100vw"}
                          className="m-1 w-6 h-6"
                        />
                      ) : (
                        <Image
                          src="/assets/icons/flower.png"
                          alt="flower"
                          width={0}
                          height={0}
                          sizes={"100vw"}
                          className="m-1 w-6 h-6"
                        />
                      )}
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }
    // Other items
    else {
      const itemQuantity = { ...item };
      for (let userItem of user.items) {
        if (userItem.itemName === item.itemName) {
          itemQuantity.quantity = userItem.quantity;
        }
      }

      return (
        <div
          className="grid 2xl:grid-cols-2 grid-cols-1 p-8 gap-8 rounded-lg"
          style={{
            backgroundColor: colorPalette ? `${colorPalette.white}88` : "",
          }}
        >
          <ItemInventory
            item={itemQuantity}
            displayOnly="true"
            colorPalette={colorPalette}
          />
          {/* Item description */}
          <div
            className="rounded-lg px-8 py-4"
            style={{
              backgroundColor: colorPalette ? `${colorPalette.black}88` : "",
            }}
          >
            <p
              className={`text-2xl font-thin`}
              style={{
                color:
                  gameData.rarityColours[gameData.items[item.itemName].rarity]
                    .text,
              }}
            >
              {gameData.items[item.itemName].rarity}
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
            className="2xl:col-span-2 rounded-lg p-6"
            style={{
              backgroundColor: colorPalette ? `${colorPalette.black}88` : "",
              color: colorPalette ? colorPalette.text1 : "",
            }}
          >
            <div className="flex flex-row w-full items-center">
              <div className="grow">Buy Item</div>
              <div className="shrink px-1">Buy for:</div>
              {gameData.items[item.itemName].buyCurrency == 1 ? (
                <div className="text-orange-300 px-1">
                  {gameData.items[item.itemName].buyPrice + " FL each"}
                </div>
              ) : (
                <div className="text-orange-300 px-1">
                  {gameData.items[item.itemName].buyPrice + " SG each"}
                </div>
              )}
            </div>
            <div className="flex flex-row w-full items-center p-2">
              <div className="shrink px-2">{buyItemsNum}</div>
              <div className="grow">
                <input
                  type="range"
                  min="0"
                  max={
                    user
                      ? Math.max(
                          gameData.items[item.itemName].sellCurrency === 0
                            ? Math.floor(
                                user.slimeGel /
                                  gameData.items[item.itemName].buyPrice
                              )
                            : Math.floor(
                                user.flowers /
                                  gameData.items[item.itemName].buyPrice
                              ),
                          1
                        )
                      : 1
                  }
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
                  max={
                    user
                      ? Math.max(
                          gameData.items[item.itemName].sellCurrency === 0
                            ? Math.floor(
                                user.slimeGel /
                                  gameData.items[item.itemName].buyPrice
                              )
                            : Math.floor(
                                user.flowers /
                                  gameData.items[item.itemName].buyPrice
                              ),
                          1
                        )
                      : 1
                  }
                  onChange={(e) => {
                    const newItemsNum = parseInt(e.target.value);
                    if (!isNaN(newItemsNum)) {
                      // Enforce the max
                      if (
                        newItemsNum >
                        (user
                          ? Math.max(
                              gameData.items[item.itemName].sellCurrency === 0
                                ? Math.floor(
                                    user.slimeGel /
                                      gameData.items[item.itemName].buyPrice
                                  )
                                : Math.floor(
                                    user.flowers /
                                      gameData.items[item.itemName].buyPrice
                                  ),
                              1
                            )
                          : 1)
                      ) {
                        return;
                      }
                    }
                    setBuyItemsNum(
                      isNaN(newItemsNum) ? "" : newItemsNum.toString()
                    );
                  }}
                  onBlur={() => {
                    if (buyItemsNum === "") {
                      setBuyItemsNum("1");
                    }
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
                            itemName: item.itemName,
                            quantity: buyItemsNum,
                          },
                          config
                        )
                        .then((response) => {
                          ;

                          // Prompt message to gui
                          showToastError(
                            buyItemsNum === 1
                              ? "Item purchased"
                              : "Items purchased",
                            true
                          );
                        })
                        .catch((error) => {
                          if (error?.response?.data?.message)
                            showToastError(error.response.data.message);
                          else if (error?.message)
                            showToastError(error.message);
                          else showToastError(error);
                          ;
                          return;
                        });
                    }}
                  >
                    Buy
                  </button>
                </div>
                {/* Flower or Gel icon */}
                <div className="shrink px-1">
                  {gameData.items[item.itemName].buyCurrency === 1 ? (
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
                  <p>{buyItemsNum * gameData.items[item.itemName].buyPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // for background
  if (gameData.items[item.itemName] && gameData.items[item.itemName].isBg) {
    return (
      <div
        style={{
          backgroundColor: colorPalette ? `${colorPalette.white}88` : "",
        }}
        className="rounded-lg p-8"
      >
        <div className="2xl:grid-cols-2 grid gap-8 h-full mb-8">
          <ItemInventory
            item={item}
            displayOnly="true"
            colorPalette={colorPalette}
          />
          {/* Item description */}
          <div
            className="rounded-lg px-8 py-4"
            style={{
              backgroundColor: `${colorPalette.black}88`,
            }}
          >
            <p
              className={`text-2xl font-thin`}
              style={{
                color:
                  gameData.rarityColours[gameData.items[item.itemName].rarity]
                    .text,
              }}
            >
              {gameData.items[item.itemName].rarity}
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
          className="rounded-lg p-6 grid 2xl:grid-cols-2"
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
                  cursor: "pointer",
                }}
                onClick={() => {
                  router.push("/settings");
                }}
              >
                {
                  <Image
                    src={"/assets/pfp/backgrounds/" + gameData.items[user.pfpBg].bg}
                    alt={gameData.items[user.pfpBg].bg}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="absolute inset-0 w-full h-full"
                  />
                }
                <Image
                  src={
                    "/assets/pfp/slimes/" + gameData.slimes[user.pfpSlime].pfp
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
                    "/assets/pfp/slimes/" + gameData.slimes[user.pfpSlime].pfp
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
            {gameData.items[user.pfpBg].bg === item.itemName ? (
              <button
                disabled
                className="rounded-lg py-4 h-full w-[15rem] mt-4"
                style={{
                  backgroundColor: colorPalette
                    ? `${colorPalette.black}66`
                    : "",
                  color: colorPalette ? colorPalette.white + "70" : "",
                }}
              >
                Equipped as Profile
              </button>
            ) : (
              <button
                className="rounded-lg py-4 h-full w-[15rem] mt-4 hover:brightness-110 transition-all duration-150"
                style={{
                  backgroundColor: colorPalette ? colorPalette.primary1 : "",
                  color: colorPalette ? colorPalette.text1 : "",
                }}
                onClick={(e) => {
                  const token = cookies.get("slime-scholars-webapp-token")
                  axios
                    .put(
                      "/api/user/change-pfp",
                      {
                        pfpSlime: user.pfpSlime,
                        pfpBg: item.itemName,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((response) => {
                      setUser({...user})
                      showToastError("Profile background was changed.", true);
                    })
                    .catch((error) => {
                      if (error?.response?.data?.message)
                        showToastError(error.response.data.message);
                      else if (error?.message) showToastError(error.message);
                      else showToastError(error);
                      ;
                      return;
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
                  color: colorPalette ? colorPalette.white + "70" : "",
                }}
              >
                Equipped as Background
              </button>
            ) : (
              <button
                className="rounded-lg py-4 h-full w-[15rem] mt-4 hover:brightness-110 transition-all duration-150"
                style={{
                  backgroundColor: colorPalette ? colorPalette.primary1 : "",
                  color: colorPalette ? colorPalette.text1 : "",
                }}
                onClick={(e) => {
                  const token = cookies.get("slime-scholars-webapp-token")
                  axios
                    .put(
                      "/api/user/change-bg",
                      {
                        bg: item.itemName,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((response) => {
                      setUser({...user})
                    })
                    .catch((error) => {
                      if (error?.response?.data?.message)
                        showToastError(error.response.data.message);
                      else if (error?.message) showToastError(error.message);
                      else showToastError(error);
                      ;
                      return;
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
    gameData.rarityColours[gameData.items[item.itemName].rarity].text
  ) {
    return (
      <div
        className="p-8 gap-8 rounded-lg grid"
        style={{
          backgroundColor: colorPalette ? `${colorPalette.white}88` : "",
        }}
      >
        <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-8">
          <ItemInventory
            item={item}
            displayOnly="true"
            colorPalette={colorPalette}
          />
          {/* Item description */}
          <div
            className="rounded-lg px-8 py-4"
            style={{
              backgroundColor: colorPalette ? `${colorPalette.black}88` : "",
            }}
          >
            <p
              className={`text-2xl font-thin`}
              style={{
                color:
                  gameData.rarityColours[gameData.items[item.itemName].rarity]
                    .text,
              }}
            >
              {gameData.items[item.itemName].rarity}
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

        {/* Sell Item */}
        <div
          className="rounded-lg p-6"
          style={{
            backgroundColor: colorPalette ? `${colorPalette.black}88` : "",
            color: colorPalette ? colorPalette.text1 : "",
          }}
        >
          <div className="flex flex-row w-full items-center">
            <div className="grow">Sell Item</div>
            <div className="shrink px-1">Sell for:</div>
            {gameData.items[item.itemName].sellCurrency == 1 ? (
              <div className="text-orange-300 px-1">
                {gameData.items[item.itemName].sellPrice + " FL each"}
              </div>
            ) : (
              <div className="text-orange-300 px-1">
                {gameData.items[item.itemName].sellPrice + " SG each"}
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
                    const token = cookies.get("slime-scholars-webapp-token")
                    const config = {
                      headers: {
                        Authorization: `Bearer ${token}`,
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
                        const newUser = {
                          ...user,
                          flowers: response.data.flowers,
                        };
                        setUser(newUser);
                        // WHY DO WE HAVE A SEPARATE FLOWERS FROM USER.FLOWERS?
                        setFlowers(response.data.flowers);
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
                      .catch((error) => {
                        if (error?.response?.data?.message)
                          showToastError(error.response.data.message);
                        else if (error?.message) showToastError(error.message);
                        else showToastError(error);
                        ;
                        return;
                      });
                  }}
                >
                  Sell
                </button>
              </div>
              {/* Flower or Gel icon */}
              <div className="shrink px-1">
                {gameData.items[item.itemName].sellCurrency === 1 ? (
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
                <p>{sellItemsNum * gameData.items[item.itemName].sellPrice}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Open eggs */}
        <div
          className="rounded-lg p-6"
          style={{
            color: colorPalette ? colorPalette.text1 : "",
            backgroundColor: colorPalette ? `${colorPalette.black}88` : "",
          }}
        >
          <p
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
