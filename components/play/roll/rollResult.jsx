import React, { useState, useEffect } from "react";
import RollSlimePopup from "./rollSlimePopup";
import { gameData } from "../../../data/gameData";

/**
 *
 * @param {function} setAfterRolling: set to 0 to close popup message
 * @param {array} slimes: list of slimes to dispay using rollSlimePopup component
 */

export default function RollResult({
  setAfterRolling,
  slimes,
  originalSlimes,
  router,
  colorPalette,
  item,
}) {
  const [updatedSlime, setUpdatedSlime] = useState(null);
  const [originalSlime, setOriginalSlime] = useState(null);
  const [index, setIndex] = useState(0); // index of slime in "slimes"

  if (updatedSlime === null) {
    // Display the first slime in default
    setUpdatedSlime(slimes[0]);
    setIndex(0);
  }

  useEffect(() => {
    // If is duplicate, reset originalSlime
    if(originalSlimes && originalSlimes.find){
      if (
        originalSlimes.find(
          (slime) => slime.slimeName === updatedSlime?.slimeName
        )
      ) {
        const newOriginalSlime = originalSlimes.find(
          (slime) => slime.slimeName === updatedSlime.slimeName
        );
        setOriginalSlime(newOriginalSlime);
      } else {
        setOriginalSlime(null);
      }
    }
  }, [updatedSlime, originalSlimes]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="relative grid rollgrid place-content-center m-10 p-10">
        {index > 0 ? (
          <button
            className=""
            onClick={(e) => {
              setUpdatedSlime(slimes[index - 1]);
              setIndex(index - 1);
            }}
          >
            <span className="text-black material-symbols-outlined text-[2.5rem] z-40 absolute -left-[9.5rem] -top-[2rem]">
              arrow_back_ios
            </span>
          </button>
        ) : (
          <div />
        )}
        <RollSlimePopup
          updatedSlime={updatedSlime}
          setAfterRolling={setAfterRolling}
          originalSlime={originalSlime}
          router={router}
          index={index}
          slimes={slimes}
        ></RollSlimePopup>
        {index < slimes.length - 1 ? (
          <button
            className=""
            onClick={(e) => {
              setUpdatedSlime(slimes[index + 1]);
              setIndex(index + 1);
            }}
          >
            <span className="text-black material-symbols-outlined text-[2.5rem] z-997 absolute -right-[10rem] -top-[2rem]">
              arrow_forward_ios
            </span>
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
