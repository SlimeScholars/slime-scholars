import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/play/Navbar";
import { gameData } from "../../data/gameData";

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
  console.log(bg);

  return (
    <div
      className={`w-screen h-screen bg-cover bg-[url('/assets/backgrounds/${bg}')]`}
    >
      <div className="p-8 w-full h-full justify-center items-center backdrop-brightness-50">
        <Navbar current="1" className=""></Navbar>
      </div>
    </div>
  );
}
