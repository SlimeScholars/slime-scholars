import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SlimeInventory({ user, loading, setSlime }) {
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    }
  }, [user, loading]);
  return (
    <>
      {Array.isArray(user.slimes) &&
        user.slimes.map((slime, index) => {
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
