import { gameData } from "../../../data/gameData";
import AddToRoster from "./AddToRoster";
import { useState } from "react";
import PopUpDetails from "./PopUpDetails";
import { showToastError } from "../../../utils/toast";
import axios from "axios";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { playSound } from "../../../utils/playSound";

export default function SlimeDetails({
  user,
  loading,
  setLoading,
  slime,
  setSlime,
  setUser,
  bg,
  refetchUser,
}) {
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  const [res, setRes] = useState([]);
  const [oldSlime, setOldSlime] = useState(null);

  //   handle click should automatically level up the slime and update the user
  const handleClick = (id) => {
    try {
      const token = localStorage.getItem("jwt");

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (slime && slime._id != id) {
        throw new Error("Invalid slime for leveling up");
      }

      if (user.slimeGel < slime.levelUpCost) {
        throw new Error("Insufficient slime gel");
      }

      if (slime.level === slime.maxLevel) {
        throw new Error("The slime is already at max level");
      }

      const newSlime = {
        ...slime,
        level: slime.level + 1,
        // Future slime.level - 1 as index to adjust from level to index
        // Since the slime.level does not update yet, we don't need a slime.level - 1 for level up cost
        levelUpCost: gameData.levelUpCost[slime.rarity][slime.level],
        baseProduction:
          slime.baseProduction + gameData.baseLevelProduction[slime.rarity],
      };
      const newUser = {
        ...user,
        slimeGel: user.slimeGel - slime.levelUpCost,
      };

      setUser(newUser);
      setSlime(newSlime);
      setRes({ slime: newSlime });
      setShowLevelUpPopup(true);

      // setLoading(true)
      axios
        .post("/api/slime/level-up", { slimeId: id }, config)
        .then((response) => {
          refetchUser(false)
          setSlime(response.data.slime);
          setShowLevelUpPopup(true);
          setRes(response.data);
          setTimeout(() => {setLoading(false)}, 150);
        })
        .catch((error) => {
          showToastError(error.response.data.message);
        });
    } catch (error) {
      if (error?.response?.data?.message) {
        showToastError(error.response.data.message);
      } else {
        showToastError(error.message);
      }
      return;
    } finally {
      setUser({ ...user });
    }
  };
  const handleClosePopup = () => {
    setShowLevelUpPopup(false); // Set showLevelUpPopup to false to close the popup
  };

  if (!slime) return <></>;
  const rarity = slime.rarity.toUpperCase();
  const name = slime.slimeName;
  const level = slime.level;
  const gelProduction = slime.baseProduction;
  const levelUpCost = slime.levelUpCost;
  const maxLevel = slime.maxLevel;
  const colour = gameData.rarityColours[slime.rarity].text;

  return (
    <div
      style={{
        backgroundColor: `${bg.white}88`,
      }}
      className="rounded-lg"
    >
      <div>
        {showLevelUpPopup && (
          <PopUpDetails
            user={user}
            res={res}
            onClose={handleClosePopup}
            oldSlime={oldSlime}
          />
        )}
        <div className="grid slime-grid">
          <div className="flex justify-center items-center flex-col relative p-8">
            <div className="w-[80%]">
              <Image
                src={"/assets/pfp/slimes/" + gameData.slimes[name].static}
                alt={name}
                width={0}
                height={0}
                sizes={"100vw"}
                className="h-auto w-full"
              />
              {/* Stars */}
              {gameData.canStar.includes(((str) => str.replace(
                  /\w\S*/g,
                  function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                  }
                )
              )(rarity)) &&
              <div className="w-full flex justify-center">
                <div
                  className="rounded-full w-fit py-2 px-4 flex flex-row"
                  style={{
                    backgroundColor: bg === undefined ? "" : `${bg.primary1}`,
                    border: bg === undefined ? "" : `3px solid ${bg.primary2}`,
                    color: bg === undefined ? "" : bg.text2,
                  }}
                >
                  {Array.from({ length: 3 }).map((_, index) => {
                    return slime.starLevel > index ? (
                      <FaStar
                        key={`star-${index}`}
                        className="text-yellow-300 text-2xl mx-1"
                      />
                    ) : (
                      <FaRegStar
                        key={`star-${index}`}
                        style={{
                          color: bg?.text1,
                        }}
                        className="text-2xl mx-1"
                      />
                    );
                  })}
                </div>
              </div>}
            </div>
          </div>
          <div className="p-8">
            <div
              className="rounded-lg py-4 px-7"
              style={{
                backgroundColor: `${bg.black}88`,
              }}
            >
              <p className="text-xl" style={{ color: colour }}>
                {rarity}
              </p>
              <p
                className="text-3xl pb-1"
                style={{
                  color: "white",
                }}
              >
                {name}
              </p>
              <div
                className="text-lg"
                style={{
                  color: "white",
                }}
              >
                {slime.bonusLevel ? (
                  <>
                    <p>
                      Lvl.{" "}
                      {slime.level === slime.maxLevel
                        ? <span>MAX</span>
                        : <span>{slime.level}/{slime.maxLevel}</span>}
                      {" "}
                      <span className="text-sky-300">(+{slime.bonusLevel})</span>
                    </p>
                    <p>
                      Production: {gelProduction} <span className="text-sky-300">(+{slime.bonusProduction})</span>
                      <Image
                        src="/assets/icons/slime-gel.png"
                        alt="slime gel"
                        width={0}
                        height={0}
                        sizes={"100vw"}
                        className="-mt-1 ml-3 w-6 h-6 inline"
                      />
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Lvl.{" "}
                      {slime.level === slime.maxLevel
                        ? "MAX"
                        : `${slime.level}/${slime.maxLevel}`}
                    </p>
                    <p>
                      Production: {gelProduction}
                      <Image
                        src="/assets/icons/slime-gel.png"
                        alt="slime gel"
                        width={0}
                        height={0}
                        sizes={"100vw"}
                        className="-mt-1 ml-3 w-6 h-6 inline"
                      />
                    </p>
                  </>
                )}
              </div>
            </div>
            {gameData.slimes[slime.slimeName]?.abilityName &&
              slime.starLevel > 0 && 
            <div className="rounded-lg mb-2 py-4 px-7 mt-3 text-white"
            style={{
              backgroundColor: `${bg.black}88`,
            }}>
              <div className="flex flex-col">
                <span className="text-xl text-indigo-300">{`${gameData.slimes[slime.slimeName].abilityName}`}</span>
                <span className="flex flex-row gap-[0.35em]">
                {[...Array(slime.starLevel).keys()].map((index, key) => <div key={key}><FaStar/></div>)}
                </span>
              </div>
              <span className="text-md">
                <div className="mt-3">{gameData.slimes[slime.slimeName]?.abilityDesc[
                  slime.starLevel - 1
                ]}</div>
              </span>
              {gameData.slimes[slime.slimeName]?.effects && (
              <p className="italic text-sm mt-3">
                {gameData.slimes[slime.slimeName]?.effects}
              </p>
              )}
            </div>}
            {slime.level === slime.maxLevel ? (
              <></>
            ) : (
              <>
                <div
                  className="rounded-lg items-center py-4 px-7 mt-4 text-lg"
                  style={{
                    backgroundColor: `${bg.black}88`,
                    color: "white",
                  }}
                >
                  <p>
                    Production:
                    {` ${gelProduction}`}
                    <Image
                      src="/assets/icons/slime-gel.png"
                      alt="slime gel"
                      width={0}
                      height={0}
                      sizes={"100vw"}
                      className="m-1 -mt-1 w-6 h-6 inline"
                    />
                    <FaAnglesRight className="inline mb-1 mx-1" />
                    {`${
                      gelProduction + gameData.baseLevelProduction[slime.rarity]
                    } `}
                    <Image
                      src="/assets/icons/slime-gel.png"
                      alt="slime gel"
                      width={0}
                      height={0}
                      sizes={"100vw"}
                      className="m-1 -mt-1 w-6 h-6 inline"
                    />
                  </p>
                  <div className="flex flex-row mt-3">
                    <button
                      className="py-1 px-4 rounded-lg inline hover:scale-105 transition-all duration-150 ease-out"
                      style={{
                        backgroundColor: bg.primary1,
                      }}
                      onClick={() => {
                        setOldSlime(slime);
                        handleClick(slime._id);
                      }}
                      onMouseEnter={() => {
                        playSound("boop");
                      }}
                    >
                      <div className="flex flex-row justify-center items-center font-galindo">
                        <div>Level up</div>
                        <div className="mx-3">|</div>
                        <div className="flex flex-row items-center">
                          {levelUpCost}
                          <Image
                            src="/assets/icons/slime-gel.png"
                            alt="slime gel"
                            width={0}
                            height={0}
                            sizes={"100vw"}
                            className="m-1 w-6 h-6"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-8 pt-0">
        <div
          className="rounded-lg pt-6 pb-8 px-10"
          style={{
            backgroundColor: `${bg.black}88`,
          }}
        >
          <AddToRoster
            user={user}
            loading={loading}
            setLoading={setLoading}
            slime={slime}
            setUser={setUser}
            bg={bg}
            refetchUser={refetchUser}
          />
        </div>

        {/* Change pfp comparison start */}
        <div
          className="col-span-3 rounded-lg p-6 mt-8 grid 2xl:grid-cols-2"
          style={{
            backgroundColor: `${bg.black}88`,
          }}
        >
          <div className="flex flex-row w-full items-center flex-wrap justify-center -mt-1.5">
            <div className="flex flex-col items-center">
              {/* Display current profile picture */}
              <p style={{ color: bg ? "white" : "" }}>Current</p>
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  border: bg === undefined ? "" : `5px solid ${bg.primary1}`,
                }}
              >
                {
                  <Image
                    src={
                      "/assets/pfp/backgrounds/" +
                      gameData.items[user.pfpBg].bg
                    }
                    alt={user.pfpBg}
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
              style={{ color: bg ? "white" : "" }}
            >
              arrow_forward
            </span>
            <div className="flex flex-col items-center">
              <p style={{ color: bg ? "white" : "" }}>Updated</p>
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  border: bg === undefined ? "" : `5px solid ${bg.primary1}`,
                }}
              >
                <Image
                  src={
                    "/assets/pfp/backgrounds/" + gameData.items[user.pfpBg].bg
                  }
                  alt={user.pfpBg}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full"
                />
                <Image
                  src={
                    "/assets/pfp/slimes/" + gameData.slimes[slime.slimeName].pfp
                  }
                  alt={slime.slimeName}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="relative z-10 translate-y-1/4 scale-125 w-[5.5rem] h-[5.5rem]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            {user.pfpSlime === slime.slimeName ? (
              <button
                disabled
                className="rounded-lg py-4 w-[15rem] mt-4"
                style={{
                  backgroundColor: bg ? `${bg.black}66` : "",
                  color: bg ? bg.white + "70" : "",
                }}
              >
                Equipped as Profile
              </button>
            ) : (
              <button
                className="rounded-lg py-4 w-[15rem] mt-4 hover:scale-105 transition-all duration-150 ease-out"
                style={{
                  backgroundColor: bg ? bg.primary1 : "",
                  color: bg ? "white" : "",
                }}
                onMouseEnter={() => {
                  playSound("boop");
                }}
                onClick={(e) => {
                  axios
                    .put(
                      "/api/user/change-pfp",
                      {
                        pfpSlime: slime.slimeName,
                        pfpBg: user.pfpBg,
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
                      if (response?.data.pfpSlime) {
                        const newUser = {
                          ...user,
                          pfpSlime: response.data.pfpSlime,
                        };
                        setUser(newUser);
                      }
                    })
                    .catch((error) => {
                      error?.response?.data?.message
                        ? showToastError(error.response.data.message)
                        : error?.message
                        ? showToastError(error.message)
                        : showToastError(error);
                    });
                }}
              >
                Equip to Profile
              </button>
            )}
          </div>
        </div>

        {/* Change pfp comparison end */}
      </div>
    </div>
  );
}
