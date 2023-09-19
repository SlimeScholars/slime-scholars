import { useState, useEffect } from "react";

export default function NextRewardTimer() {
  const [msToNext, setMsToNext] = useState(() => {
    const currentDate = new Date();
    const nextMidnight = new Date(currentDate);
    nextMidnight.setHours(24, 0, 0, 0);
    return Math.floor((nextMidnight - currentDate) / 1000);
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMsToNext((prev) => {
        if (prev >= 1) {
          return prev - 1;
        } else {
          const currentDate = new Date();
          const nextMidnight = new Date(currentDate);
          nextMidnight.setHours(24, 0, 0, 0);
          return Math.floor((nextMidnight - currentDate) / 1000);
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const convertToDisplay = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <div className="bg-white/[0.55] py-2 px-3 rounded-full text-slate-900">
        Next Reward in {convertToDisplay(msToNext)}
    </div>
  )
}
