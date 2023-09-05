import { gameData } from "../../../data/gameData";
import AddToRoster from "./AddToRoster";
import { useState } from "react";
import PopUpDetails from "./PopUpDetails";
import { showToastError } from "../../../utils/toast";
import axios from "axios";
import Image from "next/image";

export default function SlimeDetails({
  user,
  loading,
  setLoading,
  slime,
  setUser,
  bg,
}) {
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

  if (!slime) return <></>;
  //   console.log(slime);
  const rarity = slime.rarity.toUpperCase();
  const name = slime.slimeName;
  const level = slime.level;
  const gelProduction = slime.baseProduction;
  const levelUpCost = slime.levelUpCost;
  const maxLevel = slime.maxLevel;
  const colour = gameData.rarityColours[slime.rarity].text;
  return (
    <div className="rounded-lg"
      style={{
        backgroundColor: `${bg.white}88`,
      }}>
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
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1.25fr",
          }}
        >
          <div className="flex justify-center items-center">
            <div className="w-[90%]">
              <Image
                src={"/assets/pfp/slimes/" + gameData.slimeImgs[name].static}
                alt={name}
                width={0}
                height={0}
                sizes={"100vw"}
                className="h-auto w-full"
              />
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
                  <p>
                    Lvl. {slime.level === slime.maxLevel ? "MAX" : slime.level}{" "}
                    + {slime.bonusLevel}
                  </p>
                ) : (
                  <p>
                    Lvl. {slime.level === slime.maxLevel ? "MAX" : slime.level}
                  </p>
                )}
                <p>Production: {gelProduction} SG</p>
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
                    {gelProduction} SG {`->`}{" "}
                    {gelProduction + gameData.baseLevelProduction[slime.rarity]}{" "}
                    SG
                  </p>
                  <div className="flex flex-row justify-between mt-3">
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
                        <p>Level up</p>
                      </div>
                    </button>
                    <div className="inline-flex flex-row items-center">
                      <Image
                        src="/assets/icons/slime-gel.png"
                        alt="slime gel"
                        width={0}
                        height={0}
                        sizes={"100vw"}
                        className="m-1 w-8 h-8"
                      />
                      <p className="ml-2">{levelUpCost}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <AddToRoster
        user={user}
        loading={loading}
        setLoading={setLoading}
        slime={slime}
        setUser={setUser}
        bg={bg}
      />
    </div>
  );
}
