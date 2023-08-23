import { gameData } from "../../../data/gameData";
import { useRouter } from "next/router";
import axios from "axios";
import { showToastError } from "../../../utils/toast";
import { useState } from "react";
import PopUpDetails from "./PopUpDetails";

export default function DisplaySlimes({ user, setLoading, setUser }) {
  if (!user) return <></>;

  const router = useRouter();
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false);
  const [res, setRes] = useState([]);
  const [oldSlime, setOldSlime] = useState(null);

  //   handle click should automatically level up the slime and update the user
  const handleClick = (id) => {
    console.log(id);
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
          console.log(response.data);
          const newUser = {
            ...user,
            roster: response.data.roster,
            slimeGel: response.data.slimeGel,
            slimes: response.data.slimes,
          };
          setUser(newUser);
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
  // const [currentSlimeIndex, setCurrentSlimeIndex] = useState(0);

  // const handlePrevClick = () => {
  //   if (currentSlimeIndex > 0) {
  //     setCurrentSlimeIndex(currentSlimeIndex - 1);
  //   }
  // };

  // const handleNextClick = () => {
  //   if (currentSlimeIndex < user.roster.length - 1) {
  //     setCurrentSlimeIndex(currentSlimeIndex + 1);
  //   }
  // };
  // return (
  //   <div className="flex flex-row absolute bottom-0 items-center justify-center w-full">
  //     {/* Arrow buttons for mobile navigation */}
  //     {user.roster.length > 1 && (
  //       <div className="flex justify-between w-full px-4">
  //         <button
  //           className="p-2 bg-gray-200 rounded-full"
  //           onClick={handlePrevClick}
  //         >
  //           &lt;
  //         </button>
  //         <button
  //           className="p-2 bg-gray-200 rounded-full"
  //           onClick={handleNextClick}
  //         >
  //           &gt;
  //         </button>
  //       </div>
  //     )}

  //     <div className="flex flex-row ">
  //       {Array.isArray(user.roster) &&
  //         user.roster.map((slime, index) => {
  //           if (index === currentSlimeIndex) {
  //             console.log(index, slime);
  //             return (
  //               <img
  //                 src={
  //                   "/assets/pfp/slimes/" +
  //                   gameData.slimePfps[slime.slimeName].pfp
  //                 }
  //                 alt="Slime"
  //                 className="md:h-64 md:w-64 sm:h-32 sm:w-32 mx-auto"
  //                 onClick={() => {
  //                   router.push("/play/slimes");
  //                 }}
  //               />
  //             );
  //           }
  //         })}
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-row fixed -bottom-4 items-center justify-center w-full">
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
            if (slime === null)
              return (
                <button
                  onClick={() => {
                    router.push("/play/slimes");
                  }}
                >
                  +
                </button>
              );
            // console.log(slime._id);
            const offset = index === 1 || index === 3;

            return (
              <div
                key={index}
                className={`flex flex-col ${offset ? "transform -translate-y-16" : ""
                  }`}
              >
                <div className="flex flex-row items-center mx-auto">
                  <div className="bg-[#5A5A5A] opacity-60 h-5 w-auto pb-6 rounded-md mx-auto text-white text-center">
                    <div className="flex flex-row justify-center items-center pl-2">
                      <p>
                        Lv. {slime.level} &nbsp;|&nbsp; {slime.levelUpCost}
                      </p>
                      <img
                        src="/assets/icons/slime-gel.png"
                        alt="Icon"
                        className="h-4 w-4 ml-1 mr-2"
                      />
                    </div>
                  </div>
                  <button
                    className="p-1 rounded-full bg-red-300"
                    onClick={() => {
                      setOldSlime(slime);
                      handleClick(slime._id, index);
                    }}
                  >
                    &nbsp;^&nbsp;
                  </button>
                </div>
                <img
                  src={
                    "/assets/pfp/slimes/" +
                    gameData.slimePfps[slime.slimeName].pfp
                  }
                  alt="Slime"
                  className="md:h-64 md:w-64 sm:h-32 sm:w-32 mx-auto"
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
