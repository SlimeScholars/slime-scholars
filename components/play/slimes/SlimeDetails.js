import { gameData } from "../../../data/gameData";
import AddToRoster from "./AddToRoster";
import { useState } from "react";
import PopUpDetails from "./PopUpDetails";
import { showToastError } from "../../../utils/toast";
import axios from "axios";
import { set } from "mongoose";

export default function SlimeDetails({
  user,
  loading,
  setLoading,
  slime,
  setUser,
}) {
  if (!slime) return <></>;

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
      setLoading(true);
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
          setLoading(false);
        })
        .catch((error) => {
          showToastError(error.response.data.message);
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      showToastError(error.response.data.message);
      return;
    }
  };
  const handleClosePopup = () => {
    setShowLevelUpPopup(false); // Set showLevelUpPopup to false to close the popup
  };

  //   console.log(slime);
  const rarity = slime.rarity.toUpperCase();
  const name = slime.slimeName;
  const level = slime.level;
  const gelProduction = slime.baseProduction;
  const levelUpCost = slime.levelUpCost;
  const maxLevel = slime.maxLevel;
  const colour = gameData.rarityColours[slime.rarity].text;
  return (
    <div>
      {showLevelUpPopup && (
        <PopUpDetails
          user={user}
          res={res}
          onClose={handleClosePopup}
          oldSlime={oldSlime}
        />
      )}
      <div className="flex flex-row gap-2 justify-around p-2">
        <div className="flex">
          <img
            src={"/assets/pfp/slimes/" + gameData.slimePfps[name].pfp}
            alt="Slime"
            className="h-32 w-full"
          />
        </div>
        <div className="flex flex-col flex-wrap">
          <p className="" style={{ color: colour }}>
            {rarity}
          </p>
          <p>{name}</p>
          {level === maxLevel ? (
            <p className="text-xs">Level MAX </p>
          ) : (
            <p className="text-xs">
              Level {level}/{maxLevel}{" "}
            </p>
          )}
          <p className="text-xs">Gel production: {gelProduction} SG</p>
          <button
            className="bg-pink-400 p-1 text-xs"
            onClick={() => {
              setOldSlime(slime);
              handleClick(slime._id);
            }}
          >
            <div className="flex flex-row justify-center items-center">
              <p className="">Level up</p>
              <img
                src="/assets/icons/slimeGel.png"
                alt="Icon"
                className="h-3 w-3 m-1"
              />
              <p className="">{levelUpCost}</p>
            </div>
          </button>
        </div>
      </div>
      {/* Add slimes to roster */}
      <div className=" bg-white/75 rounded-lg h-full">
        <div className="">
          {/* Add to Roster component */}
          <AddToRoster
            user={user}
            loading={loading}
            setLoading={setLoading}
            slime={slime}
            setUser={setUser}
          />
        </div>
      </div>
    </div>
  );
}
