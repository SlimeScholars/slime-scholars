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

  // Home will be rendered via the Home component found on app. This is to prevent a rerendering of home when switching between pages
  return (
    <></>
  )
}
