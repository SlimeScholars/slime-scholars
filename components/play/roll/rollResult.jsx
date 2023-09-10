import React, { useState, useEffect } from 'react';
import RollSlimePopup from './rollSlimePopup';

/**
 * 
 * @param {function} setAfterRolling: set to 0 to close popup message
 * @param {array} slimes: list of slimes to dispay using rollSlimePopup component
 */

export default function RollResult({ setAfterRolling, slimes, originalSlimes, router }) {

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
        if (originalSlimes.find(slime => slime.slimeName === updatedSlime.slimeName)) {
            const newOriginalSlime = originalSlimes.find(slime => slime.slimeName === updatedSlime.slimeName)
            setOriginalSlime(newOriginalSlime);
        } else {
            setOriginalSlime(null);
        }
    }, [updatedSlime]);

    return (
        <div 
            className="fixed inset-0 z-50 text-white flex items-center justify-center brightness-100">
            <div className="grid grid-cols-3 place-content-center m-10 rounded-lg p-8 bg-slate-400  w-auto h-1/2">
                { index === 0&& (
                    <button className="brightness-125"
                        onClick={(e) => {
                            setUpdatedSlime(slimes[index-1]);
                            setIndex(index-1);
                        }}>
                        <span className="material-symbols-outlined">
                        arrow_back_ios
                        </span>
                    </button>
                )
                }  
                <RollSlimePopup
                    updatedSlime={updatedSlime}
                    setAfterRolling={setAfterRolling}
                    originalSlime={originalSlime}
                    router={router}></RollSlimePopup>
                {
                    index === slimes.length-1&&(
                        <button className="brightness-125"
                            onClick={(e) => {
                                setUpdatedSlime(slimes[index+1]);
                                setIndex(index+1);
                            }}>
                            <span className="material-symbols-outlined">
                            arrow_forward_ios
                            </span>
                        </button>
                    )
                }
            </div>
        </div>
    )
}