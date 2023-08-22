import { gameData } from "../../../data/gameData";

export default function DisplaySlimes({ user }) {
  if (!user) return <></>;

  return (
    <div className="flex flex-row ">
      {Array.isArray(user.roster) &&
        user.roster.map((slime, index) => {
          return (
            <div key={index} className="w-full">
              <img
                src={
                  "/assets/pfp/slimes/" +
                  gameData.slimePfps[slime.slimeName].pfp
                }
                alt="Slime"
                className="h-full w-full mx-auto"
              />
            </div>
          );
        })}
    </div>
  );
}
