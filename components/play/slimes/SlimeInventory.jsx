import Image from "next/image";
import { gameData } from "../../../data/gameData";
export default function SlimeInventory({ slimes, loading, setSlime, bg, searchContent }) {
  return (
    <>
      {slimes.length === 0 && (
        <p
          className="col-span-4"
          style={{
            color: bg ? bg.text1 : "",
          }}
        >
          No slimes found by the name "{searchContent}"
        </p>
      )}
      {Array.isArray(slimes) &&
        slimes.map((slime, index) => {
          return (
            <div className="relative" key={index}>
              <div
                className={`flex flex-col flex-wrap w-full rounded-2xl ${gameData.rarityColours[slime.rarity].bg}`}
                style={{
                  border:
                    bg === undefined ? '' : `5px solid ${bg.primary1}`,
                }}
              >
                <button
                  onClick={() => {
                    setSlime(slime);
                  }}
                  className="mb-3"
                >
                  <Image
                    src={
                      gameData.slimes[slime.slimeName] ? (
                        "/assets/pfp/slimes/" + gameData.slimes[slime.slimeName].static
                      ) : ("")
                    }
                    alt={slime.slimeName}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className="h-auto w-[80%] mx-auto"
                  />
                </button>
              </div>
              <div
                className="absolute -bottom-2.5 inset-x-0 mx-auto rounded-full items-center mt-2 w-fit justify-center px-3"
                style={{
                  backgroundColor:
                    bg === undefined ? '' : `${bg.primary1}`,
                  border:
                    bg === undefined ? '' : `3px solid ${bg.primary2}`,
                  color:
                    bg === undefined ? '' : bg.text2,
                }}
              >
                {slime.bonusLevel ? (
                  <p className="text-center text-sm mt-1">
                    Lvl. {slime.level === slime.maxLevel ? 'MAX' : slime.level} + {slime.bonusLevel}
                  </p>
                ) : (
                  <p className="text-center text-sm mt-1">
                    Lvl. {slime.level === slime.maxLevel ? 'MAX' : slime.level}
                  </p>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
}
