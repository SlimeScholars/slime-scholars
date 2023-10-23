import { gameData } from "../../../data/gameData";
import { useRouter } from "next/router";
import axios from "axios";
import { showToastError } from "../../../utils/toast";
import { useState, useEffect } from "react";
import PopUpDetails from "./PopUpDetails";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";

export default function DisplaySlimes({
  user,
  setLoading,
  setUser,
  colorPalette,
  refetchUser,
  bg,
}) {
  const router = useRouter();

  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  const [res, setRes] = useState([]);
  const [oldSlime, setOldSlime] = useState(null);

  //handle click should automatically level up the slime and update the user
  const handleClick = (id) => {
    try {
      const token = localStorage.getItem("jwt");

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let slime;
      for (let i in user.roster) {
        if (user.roster[i]?._id == id) {
          slime = user.roster[i];
          break;
        }
      }
      if (!slime) throw new Error("Invalid slime for leveling up");

      if (slime && slime._id != id) {
        throw new Error("Invalid slime for leveling up");
      }

      if (user.slimeGel < slime.levelUpCost) {
        throw new Error("Insufficient slime gel");
      }

      setOldSlime(slime);
      const newSlime = {
        ...slime,
        level: slime.level + 1,
        // Future slime.level - 1 as index to adjust from level to index
        // Since the slime.level does not update yet, we don't need a slime.level - 1 for level up cost
        levelUpCost: gameData.levelUpCost[slime.rarity][slime.level],
        baseProduction:
          slime.baseProduction + gameData.baseLevelProduction[slime.rarity],
      };
      const newRoster = [...user.roster];
      for (let i in user.roster) {
        if (user.roster[i]?._id == id) {
          newRoster[i] = newSlime;
        }
      }
      const newSlimes = [...user.slimes];
      for (let i in user.slimes) {
        if (user.slimes[i]?._id == id) {
          newSlimes[i] = newSlime;
        }
      }

      const newUser = {
        ...user,
        slimeGel: user.slimeGel - slime.levelUpCost,
        roster: newRoster,
        slimes: newSlimes,
      };

      setUser(newUser);
      setRes({ slime: newSlime });
      setShowLevelUpPopup(true);

      axios
        .post("/api/slime/level-up", { slimeId: id }, config)
        .then((response) => {
          // refetchUser()
          // setShowLevelUpPopup(true);
          // setRes(response.data);
        })
        .catch((error) => {
          refetchUser();
          showToastError(error?.response?.data?.message);
        });
    } catch (error) {
      if (error?.response?.data?.message) {
        showToastError(error?.response?.data?.message);
      } else if (error?.message) {
        showToastError(error?.message);
      } else {
        showToastError(error);
      }
      return;
    }
  };
  const handleClosePopup = () => {
    setShowLevelUpPopup(false); // Set showLevelUpPopup to false to close the popup
  };

  // ************ Mobile View ************
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [currentSlimeIndex, setCurrentSlimeIndex] = useState(0);

  const handlePrevClick = () => {
    if (currentSlimeIndex > 0) {
      setCurrentSlimeIndex(currentSlimeIndex - 1);
    } else {
      setCurrentSlimeIndex(currentSlimeIndex + user.roster.length - 1);
    }
  };

  const handleNextClick = () => {
    if (currentSlimeIndex < user.roster.length - 1) {
      setCurrentSlimeIndex(currentSlimeIndex + 1);
    } else {
      setCurrentSlimeIndex(0);
    }
  };

  if (!user) return <></>;

  return (
    <div className="flex flex-row fixed bottom-0 items-center justify-center w-full">
      <div className="flex flex-row ">
        {showLevelUpPopup && (
          <PopUpDetails
            user={user}
            res={res}
            onClose={handleClosePopup}
            oldSlime={oldSlime}
          />
        )}
        {Array.isArray(user.roster) &&
          user.roster.map((slime, index) => {
            const offset = index === 1 || index === 3;

            if (slime === null)
              return (
                <button
                  key={index}
                  className={`${
                    offset ? "transform -translate-y-16" : ""
                  } mx-auto md:h-64 md:w-64 sm:h-32 sm:w-32 no-animate-size text-5xl font-bold font-galindo`}
                  style={{
                    backgroundImage: `url('/assets/pfp/slimes/shadow-slime.png')`,
                    backgroundPosition: "0 0",
                    color: colorPalette ? colorPalette.text1 : "",
                  }}
                  onClick={() => {
                    router.push("/play/slimes");
                  }}
                >
                  +
                </button>
              );

            const slimeImg =
              slime.slimeName &&
              gameData.slimes &&
              gameData.slimes[slime.slimeName] &&
              gameData.slimes[slime.slimeName].spritesheet
                ? "/assets/slimes/slime-spritesheet/" +
                  gameData.slimes[slime.slimeName].spritesheet
                : slime.slimeName &&
                  gameData.slimes &&
                  gameData.slimes[slime.slimeName] &&
                  gameData.slimes[slime.slimeName].static
                ? "/assets/slimes/slime-static/" +
                  gameData.slimes[slime.slimeName].static
                : "";

            return (
              <div
                key={index}
                className={`flex flex-col relative ${
                  offset ? "transform -translate-y-16" : ""
                }`}
              >
                <div
                  className="flex flex-row gap-1 items-center mx-auto absolute top-0 left-[50%]"
                  style={{
                    transform: "translateX(-50%)",
                  }}
                >
                  <div
                    className="flex flex-col flex-wrap min-w-[12rem] max-w-full rounded-full phase px-1 py-1"
                    style={{
                      border:
                        colorPalette !== undefined
                          ? `5px solid ${colorPalette.primary2}`
                          : "",
                      background:
                        colorPalette !== undefined ? colorPalette.primary1 : "",
                    }}
                  >
                    <div
                      style={{ color: colorPalette ? colorPalette.text1 : "" }}
                      className="flex flex-row justify-center items-center pl-1 font-galindo text-sm"
                    >
                      {slime.bonusLevel ? (
                        <p>
                          Lvl.{" "}
                          {slime.level === slime.maxLevel
                            ? "MAX"
                            : `${slime.level}/${slime.maxLevel}`}{" "}
                          + {slime.bonusLevel}
                        </p>
                      ) : (
                        <p>
                          Lvl.{" "}
                          {slime.level === slime.maxLevel
                            ? "MAX"
                            : `${slime.level}/${slime.maxLevel}`}
                        </p>
                      )}
                      <span className="mx-2">|</span>
                      <p>{slime.levelUpCost}</p>
                      <Image
                        src="/assets/icons/slime-gel.png"
                        alt="slime gel"
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="h-4 w-4 ml-1"
                      />
                    </div>
                  </div>
                  {slime.level < slime.maxLevel && (
                    <button
                      disabled={slime.levelUpCost > user.slimeGel}
                      className={`px-1.5 py-1.5 ml-2 rounded-lg transition-all duration-150 opacity-80
                      ${
                        slime.levelUpCost <= user.slimeGel
                          ? "bg-green-500 hover:bg-green-400 ring-green-300 hover:ring-green-400 ring-4"
                          : "bg-red-500 hover:bg-red-400 ring-red-300 hover:ring-red-400 ring-4"
                      }`}
                      onClick={() => {
                        setOldSlime(slime);
                        handleClick(slime._id, index);
                      }}
                    >
                      <span className="text-white">
                        <FaArrowUp />
                      </span>
                    </button>
                  )}
                </div>
                <div
                  style={{
                    backgroundImage: `url(${slimeImg})`,
                  }}
                  className="mx-auto mb-2 md:h-60 md:w-60 sm:h-28 sm:w-28 slime-animate slime-size cursor-pointer"
                  onClick={() => {
                    router.push("/play/slimes");
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
