import { gameData } from "../../../data/gameData";
export default function SlimeInventory({ user, loading, setSlime }) {
  return (
    <>
      {Array.isArray(user.slimes) &&
        user.slimes.map((slime, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col gradient-border rounded-md p-1 relative flex-wrap w-full`}
              style={{ backgroundColor: gameData.rarityColours[slime.rarity] }}
            >
              <button
                onClick={() => {
                  setSlime(slime);
                }}
                className="mb-3"
              >
                <img
                  src={
                    "/assets/pfp/slimes/" +
                    gameData.slimePfps[slime.slimeName].pfp
                  }
                  alt="Slime"
                  className="h-20 w-20 mx-auto"
                />
              </button>
              <div className="absolute bg-gray-400 h-5 w-10 -bottom-2.5 inset-x-0 mx-auto rounded-md items-center mt-2">
                {slime.level === slime.maxLevel ? (
                  <p className="text-center text-xs mt-1">Lvl. MAX </p>
                ) : (
                  <p className="text-center text-xs mt-1">Lvl. {slime.level}</p>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
}
