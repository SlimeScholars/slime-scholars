import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/play/Navbar";
import { gameData } from "../../data/gameData";
import DisplaySlimes from "../../components/play/slimes/DisplaySlimes";
import Home from "../../components/play/Home";

export default function Shopping({ loading, user }) {
  const router = useRouter();
  const [bg, setBg] = useState("bg-beach.png"); // Default background

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    } else {
      if (user.bg && gameData.items[user.bg].bg) {
        setBg(gameData.items[user.bg].bg);
      }
    }
  }, [user, loading]);

  return (
    <div>
      <Home user={user} bg={bg} />
      <div className="absolute top-0 left-0 p-8 w-full h-full justify-center items-center ">
        <Navbar current={1} className=""></Navbar>
      </div>
    </div>
  );
}
