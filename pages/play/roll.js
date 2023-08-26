import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { gameData } from '../../data/gameData';

export default function Roll({ loading, user, setUser }) {

    const router = useRouter();
    const [bg, setBg] = useState("bg-beach.png"); // Default background

    useEffect(() => {
        if (loading) {
            return;
        }
        if (!user || user.userType !== 1) {
            router.push("/");
        } else if (user.bg && gameData.items[user.bg].bg) {
            setBg(gameData.items[user.bg].bg);
        }

        if (user.bg && gameData.items[user.bg].bg) {
            setBg(gameData.items[user.bg].bg);
        }
    }, [user, loading]);

    const handleNavHome = (event) => {
        if (event.target.classList.contains("home")) {
            router.push("/play");
        }
    };

    return (
        <div className="pt-5 home w-full h-full" onClick={handleNavHome}>
            {/* Image as background */}
            <img src="/assets/roll-bg/genshin.png" className="z-20 bg-cover"></img>
            <button className="rounded-lg bg-red-500 text-white p-4">5 FL for 1 Roll</button>
        </div>
    );
}