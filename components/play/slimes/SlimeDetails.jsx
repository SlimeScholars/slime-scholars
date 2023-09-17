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

      if (slime.level === slime.maxLevel) {
        throw new Error('The slime is already at max level')
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
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1.25fr",
          }}
        >
          <div className="flex justify-center items-center">
            <div className="w-[90%]">
              <Image
                src={"/assets/pfp/slimes/" + gameData.slimes[name].static}
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
        refetchUser={refetchUser}
      />
    </div>
  );
}
