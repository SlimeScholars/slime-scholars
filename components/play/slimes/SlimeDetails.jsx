import { gameData } from "../../../data/gameData";
import AddToRoster from "./AddToRoster";
import { useState } from "react";
import PopUpDetails from "./PopUpDetails";
import { showToastError } from "../../../utils/toast";
import axios from "axios";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";

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
      }

      if (slime && slime._id != id) {
        throw new Error('Invalid slime for leveling up')
      }

      if (user.slimeGel < slime.levelUpCost) {
        throw new Error('Insufficient slime gel')
      }

      const newSlime = {
        ...slime,
        level: slime.level + 1,
        // Future slime.level - 1 as index to adjust from level to index
        // Since the slime.level does not update yet, we don't need a slime.level - 1 for level up cost
        levelUpCost: gameData.levelUpCost[slime.rarity][slime.level],
        baseProduction: slime.baseProduction + gameData.baseLevelProduction[slime.rarity],
      }
      const newUser = {
        ...user,
        slimeGel: user.slimeGel - slime.levelUpCost,
      }

      setUser(newUser)
      setSlime(newSlime)
      setRes({ slime: newSlime })
      setShowLevelUpPopup(true)

      // setLoading(true)
      axios
        .post("/api/slime/level-up", { slimeId: id }, config)
        .then((response) => {
          // refetchUser()
          // setSlime(response.data.slime);
          // setShowLevelUpPopup(true);
          // setRes(response.data);
          // setLoading(false);
        })
        .catch((error) => {
          showToastError(error.response.data.message);
        });
    } catch (error) {
      if (error?.response?.data?.message) {
        showToastError(error.response.data.message);
      }
      else {
        showToastError(error.message)
      }
      return
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

  const tiers = ['I', 'II', 'III']

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
        <div
          className="grid slime-grid"
        >
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
              <div className="w-full flex justify-center">
                <div
                  className="rounded-full w-fit py-2 px-4 flex flex-row"
                  style={{
                    backgroundColor:
                      bg === undefined ? '' : `${bg.primary1}`,
                    border:
                      bg === undefined ? '' : `3px solid ${bg.primary2}`,
                    color:
                      bg === undefined ? '' : bg.text2,
                  }}
                >
                  {Array.from({ length: 3 }).map((_, index) => {
                    return slime.starLevel > index ?
                      <FaStar
                        key={`star-${index}`}
                        className='text-yellow-300 text-2xl mx-1'
                      /> :
                      <FaRegStar
                        key={`star-${index}`}
                        style={{
                          color: bg?.text1,
                        }}
                        className="text-2xl mx-1"
                      />
                  })}
                </div>
              </div>
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
                  color: bg.text1,
                }}
              >
                {name}
              </p>
              <div
                className="text-lg"
                style={{
                  color: bg.text1,
                }}
              >
                {slime.bonusLevel ? (
                  <>
                    <p>
                      Lvl. {slime.level === slime.maxLevel ? "MAX" : `${slime.level}/${slime.maxLevel}`}{" "}
                      + {slime.bonusLevel}
                    </p>
                    <p>
                      Production: {gelProduction} + {slime.bonusProduction}
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
                      Lvl. {slime.level === slime.maxLevel ? "MAX" : `${slime.level}/${slime.maxLevel}`}
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
                {gameData.slimes[slime.slimeName]?.abilityName && (slime.starLevel > 0) && (
                  <p className="mt-3 text-[0.9rem] leading-[1.3rem]">
                    {`${gameData.slimes[slime.slimeName].abilityName} ${tiers[slime.starLevel - 1]}: ${gameData.slimes[slime.slimeName]?.abilityDesc[slime.starLevel - 1]}`}
                  </p>
                )}
                {gameData.slimes[slime.slimeName]?.effects && (
                  <p className="mt-3 text-[0.9rem] leading-[1.3rem] italic">
                    {gameData.slimes[slime.slimeName]?.effects}
                  </p>
                )}
              </div>
            </div>
            {slime.level === slime.maxLevel ? (
              <></>
            ) : (
              <>
                <div
                  className="rounded-lg items-center py-4 px-7 mt-4 text-lg"
                  style={{
                    backgroundColor: `${bg.black}88`,
                    color: bg.text1,
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
                    {`${gelProduction + gameData.baseLevelProduction[slime.rarity]} `}
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
                      className="py-1 px-4 rounded-lg inline"
                      style={{
                        backgroundColor: bg.primary1,
                      }}
                      onClick={() => {
                        setOldSlime(slime);
                        handleClick(slime._id);
                      }}
                    >
                      <div className="flex flex-row justify-center items-center">
                        <div>
                          Level up
                        </div>
                        <div className="mx-3">
                          |
                        </div>
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
      <div
        className="p-8 pt-0"
      >
        <div
          className="rounded-lg py-6 px-10"
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
              <p style={{ color: bg ? bg.text1 : "" }}>
                Current
              </p>
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  border:
                    bg === undefined
                      ? ""
                      : `5px solid ${bg.primary1}`,
                }}
              >
                {
                  <Image
                    src={"/assets/pfp/backgrounds/" + gameData.items[user.pfpBg].pfp}
                    alt={user.pfpBg}
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
              style={{ color: bg ? bg.text1 : "" }}
            >
              arrow_forward
            </span>
            <div className="flex flex-col items-center">
              <p style={{ color: bg ? bg.text1 : "" }}>
                Updated
              </p>
              <div
                className="relative rounded-full overflow-hidden"
                style={{
                  border:
                    bg === undefined
                      ? ""
                      : `5px solid ${bg.primary1}`,
                }}
              >
                <Image
                  src={
                    "/assets/pfp/backgrounds/" +
                    gameData.items[user.pfpBg].pfp
                  }
                  alt={user.pfpBg}
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full"
                />
                <Image
                  src={
                    "/assets/pfp/slimes/" +
                    gameData.slimes[slime.slimeName].pfp
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
                  backgroundColor: bg
                    ? `${bg.black}66`
                    : "",
                  color: bg ? bg.black : "",
                }}
              >
                Equipped as Profile
              </button>
            ) : (
              <button
                className="rounded-lg py-4 w-[15rem] mt-4"
                style={{
                  backgroundColor: bg ? bg.primary1 : "",
                  color: bg ? bg.text1 : "",
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
                      if (response?.data?.pfpSlime) {
                        const newUser = { ...user, pfpSlime: response.data.pfpSlime }
                        setUser(newUser)
                      }
                    })
                    .catch((error) => {
                      showToastError(error.message);
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
