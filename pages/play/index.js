import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Navbar } from "../../components/play/Navbar";
import Home from "../../components/play/Home";
import { gameData } from "../../data/gameData";
import DisplaySlimes from "../../components/play/slimes/DisplaySlimes";
import PopUpDetails from "../../components/play/slimes/PopUpDetails";

export default function Play({ loading, user, setLoading, setUser }) {
  const router = useRouter();

  const [bg, setBg] = useState(undefined)

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    }
    setBg(gameData.items[user.bg].bg)
  }, [user, loading]);

  return (
    <div
      className="p-8 w-screen h-screen bg-bottom"
      style={{
        backgroundImage: `url('/assets/backgrounds/${bg}')`,
        backgroundSize: "cover",
      }}
    >
      <Navbar current={0} user={user} />
      {/* slimes */}
      <DisplaySlimes user={user} setLoading={setLoading} setUser={setUser} />
    </div>
  );
  return (
    <div>
      <button onClick={() => console.log(user)}>
        Click me to see the information on user (open console to see the
        console.log)
      </button>
    </div>
  );
}
