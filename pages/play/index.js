import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Navbar } from "../../components/play/Navbar";
import Home from "../../components/play/Home";
import { gameData } from "../../data/gameData";
import DisplaySlimes from "../../components/play/slimes/DisplaySlimes";

export default function Play({ loading, user }) {
  const router = useRouter();
  const [bg, setBg] = useState(""); // Default background

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

  console.log(bg);

  return (
    <div
      className="p-8 w-screen h-screen"
      style={{
        backgroundImage: `url('/assets/backgrounds/${bg}')`,
        backgroundSize: "cover",
      }}
    >
      <Navbar current="0"></Navbar>
      {/* slimes */}
      <DisplaySlimes user={user} />
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
