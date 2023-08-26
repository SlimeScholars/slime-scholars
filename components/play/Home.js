import DisplaySlimes from "./slimes/DisplaySlimes";
import { gameData } from "../../data/gameData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home({ user, setLoading, setUser, active }) {
  const router = useRouter();
  const [bg, setBg] = useState(undefined);

  useEffect(() => {
    if (user && user.bg) setBg(gameData.items[user.bg].bg);
  }, [user]);

  if (!user) {
    return <></>;
  }

  const handleNavHome = (event) => {
    if (event.target.classList.contains("home")) {
      router.push("/play");
    }
  };

  return (
    <div
      className="w-full h-screen relative bg-bottom"
      style={{
        backgroundImage:
          bg === undefined ? "" : `url('/assets/backgrounds/${bg}')`,
        backgroundSize: "cover",
      }}
    >
      <div
        className={`w-full h-full justify-center items-center ${
          !active ? "backdrop-brightness-[0.25] blur-sm" : ""
        }`}
      >
        <div className={`w-full h-full ${active ? "" : "relative"}`}>
          <DisplaySlimes
            user={user}
            setLoading={active ? setLoading : undefined}
            setUser={active ? setUser : undefined}
          />
          {!active && (
            <div
              className="fixed inset-0 backdrop-filter backdrop-brightness-[0.25] home"
              onClick={handleNavHome}
            />
          )}
        </div>
      </div>
    </div>
  );
}
