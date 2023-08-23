import { gameData } from "../../../data/gameData";

export default function DisplaySlimes({ user }) {
  if (!user) return <></>;

  return (
    <div className="flex flex-row absolute bottom-0 items-center justify-center w-full">
      <div className="flex flex-row ">
        {Array.isArray(user.roster) &&
          user.roster.map((slime, index) => {
            const offset = index === 1 || index === 3;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  offset ? "transform -translate-y-16" : ""
                }`}
              >
                <div className="bg-[#5A5A5A] opacity-60 h-5 w-28 pb-6 rounded-md mx-auto text-white text-center">
                  <div className="flex flex-row justify-center items-center pl-2">
                    <p>
                      Lv. {slime.level} | {slime.maxLevel}
                    </p>
                    <img
                      src="/assets/icons/slimeGel.png"
                      alt="Icon"
                      className="h-4 w-4 ml-1 mr-2"
                    />
                  </div>
                </div>
                <img
                  src={
                    "/assets/pfp/slimes/" +
                    gameData.slimePfps[slime.slimeName].pfp
                  }
                  alt="Slime"
                  className="md:h-64 md:w-64 sm:h-32 sm:w-32 mx-auto"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
