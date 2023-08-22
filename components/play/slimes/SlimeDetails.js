import { gameData } from "../../../data/gameData";
import AddToRoster from "./AddToRoster";

export default function SlimeDetails({
  user,
  loading,
  setLoading,
  slime,
  setUser,
}) {
  if (!slime) return <></>;
  //   console.log(slime);
  const rarity = slime.rarity.toUpperCase();
  const name = slime.slimeName;
  const level = slime.level;
  const gelProduction = slime.baseProduction;
  const levelUpCost = slime.levelUpCost;
  const maxLevel = slime.maxLevel;
  const colour = gameData.rarityColours[slime.rarity];
  return (
    <div>
      <div className="flex flex-row gap-2 justify-around p-2">
        <div className="flex">
          {/* TODO create something to map slime names to images */}
          <img
            src={"/assets/pfp/slimes/" + gameData.slimePfps[name].pfp}
            alt="Slime"
            className="h-32 w-full"
          />
        </div>
        <div className="flex flex-col flex-wrap">
          <p className={`text-[${colour}]`}>{rarity}</p>
          <p>{name}</p>
          <p className="text-xs">
            Level {level}/{maxLevel}
          </p>
          <p className="text-xs">Gel production: {gelProduction} SG</p>
          <button className="bg-pink-400 p-1 text-xs">
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
