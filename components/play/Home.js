import DisplaySlimes from "./slimes/DisplaySlimes";
import { gameData } from "../../data/gameData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home({ user, setLoading, setUser, active }) {
  const [bg, setBg] = useState(undefined)

  useEffect(() => {
    if (user)
      setBg(gameData.items[user.bg].bg)
  }, [user])

  if (!user) {
    return <></>
  }
  return (
    <div
      className="w-screen h-screen relative bg-bottom"
      style={{
        backgroundImage: `url('/assets/backgrounds/${bg}')`,
        backgroundSize: "cover",
      }}
    >
      <div className={`w-full h-full justify-center items-center ${!active ? 'backdrop-brightness-[0.25] blur-sm' : ''}`}>
        <div className={`w-full h-full ${active ? '' : 'relative'}`}>
          <DisplaySlimes
            user={user}
            setLoading={active ? setLoading : undefined}
            setUser={active ? setUser : undefined}
          />
          {!active && (
            <div className="fixed inset-0 backdrop-filter backdrop-brightness-[0.25]"></div>
          )}
        </div>
      </div>
    </div >
  );
}
