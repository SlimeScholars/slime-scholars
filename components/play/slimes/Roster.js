export default function Roster({ user, loading }) {
  console.log(user);

  if (loading) {
    return
  }

  return (
    <>
      {Array.isArray(user.roster) &&
        user.roster.map((slime, index) => {
          if (slime === null) {
            return <div>+</div>
          }
          return (
            <div className="flex flex-col border-2 border-gray-400 rounded-md p-1 bg-green-400 relative flex-wrap w-32">
              <button
                onClick={() => {
                  setSlime(slime);
                }}
                className="mb-3"
              >
                <img
                  src="/assets/graphics/slimes/slime-blue.png"
                  alt="Slime"
                  className="h-20 w-20 mx-auto"
                />
              </button>
              <div className="absolute bg-gray-400 h-5 w-10 bottom-0 inset-x-0 mx-auto rounded-md items-center mt-2">
                <p className="text-center text-xs mt-1">Lvl. {slime.level}</p>
              </div>
            </div>
          );
        })}
    </>
  );
}
