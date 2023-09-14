import { gameData } from "../../../data/gameData";
import { useRouter } from "next/router";
import axios from "axios";
import { showToastError } from "../../../utils/toast";
import { useState, useEffect } from "react";
import PopUpDetails from "./PopUpDetails";
import Image from "next/image";

export default function DisplaySlimes({ user, setLoading, setUser, colorPalette, refetchUser }) {
  const router = useRouter();

  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  const [res, setRes] = useState([]);
  const [oldSlime, setOldSlime] = useState(null);

  //   handle click should automatically level up the slime and update the user
  const handleClick = (id) => {
    setLoading(true)
    try {
      const token = localStorage.getItem("jwt");

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post("/api/slime/level-up", { slimeId: id }, config)
        .then((response) => {
          console.log(response)
          refetchUser()
          setShowLevelUpPopup(true);
          setRes(response.data);
        })
        .catch((error) => {
          showToastError(error?.response?.data?.message);
        });
    } catch (error) {
      showToastError(error?.response?.data?.message);
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
            // console.log(slime._id);
            const offset = index === 1 || index === 3;

            if (slime === null)
              return (
                <button
                  key={index}
                  className={`${offset ? "transform -translate-y-16" : ""
                    } mx-auto md:h-64 md:w-64 sm:h-32 sm:w-32 no-animate-size text-5xl font-bold font-galindo`}
                  style={{
                    backgroundImage: `url('/assets/pfp/slimes/shadow-slime.png')`,
                    backgroundPosition: '0 0',
                    color: colorPalette ? colorPalette.text1 : "",
                  }}
                  onClick={() => {
                    router.push("/play/slimes");
                  }}
                >
                  +
                </button>
              );

            const slimeImg = (slime.slimeName && gameData.slimeImgs && gameData.slimeImgs[slime.slimeName] && gameData.slimeImgs[slime.slimeName].spritesheet) ? (
              "/assets/slimes/slime-spritesheet/" + gameData.slimeImgs[slime.slimeName].spritesheet
            ) : (slime.slimeName && gameData.slimeImgs && gameData.slimeImgs[slime.slimeName] && gameData.slimeImgs[slime.slimeName].static) ? (
              "/assets/slimes/slime-static/" + gameData.slimeImgs[slime.slimeName].static
            ) : ""

            return (
              <div
                key={index}
                className={`flex flex-col relative ${offset ? "transform -translate-y-16" : ""
                  }`}
              >
                <div
                  className="flex flex-row gap-1 items-center mx-auto absolute top-0 left-[50%]"
                  style={{
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="bg-black opacity-50 h-5 w-[8rem] pb-6 rounded-md mx-auto text-white text-center">
                    <div className="flex flex-row justify-center items-center pl-2">
                      <p>
                        Lv. {slime.level} &nbsp;|&nbsp; {slime.levelUpCost}
                      </p>
                      <Image
                        src="/assets/icons/slime-gel.png"
                        alt="slime gel"
                        height={0}
                        width={0}
                        sizes='100vw'
                        className="h-4 w-4 ml-1 mr-2"
                      />
                    </div>
                  </div>
                  <button
                    className={`px-1 rounded-lg transition-colors duration-150
                    ${slime.levelUpCost <= user.slimeGel && slime.level < slime.maxLevel ? "bg-green-900 hover:bg-green-600" : "bg-red-900 hover:bg-red-600"} opacity-60`}
                    onClick={() => {
                      setOldSlime(slime);
                      handleClick(slime._id, index);
                    }}
                  >
                    <span className="text-white">&nbsp;^&nbsp;</span>
                  </button>
                </div>

                <div
                  style={{
                    backgroundImage: `url(${slimeImg})`,
                  }}
                  className="mx-auto md:h-64 md:w-64 sm:h-32 sm:w-32 slime-animate slime-size"
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
