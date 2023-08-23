import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../../components/play/Navbar";
import { gameData } from "../../data/gameData";
import DisplaySlimes from "../../components/play/slimes/DisplaySlimes";
import Home from "../../components/play/Home";

export default function Shopping({ loading, user }) {
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
    <div>
      <Home user={user} />
      <div className="absolute top-0 left-0 p-8 w-full h-full justify-center items-center ">
        <Navbar current={1} user={user} />
      </div>
    </div>
  );
}
