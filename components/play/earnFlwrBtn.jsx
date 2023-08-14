import React from "react"
/*
Button to earn flowers

Bg Color:
    Red: 228
    Green: 117
    Blue: 136
*/

export default function EarnFlwrBtn() {
    return (
        <button id="earnFlwr" 
            className="font-galindo"
            onClick = {
            () => function() {
                return (
                    <a
                        href={"/earn_flowers"}
                        className={
                        "text-xl font-bold py-3 px-8 mx-2 rounded-lg duration-300 hover:scale-105 ease-in-out " +
                        styleClass
                        }
                    >
                    </a>
                )
            }
        }>
            Earn Flowers
            
        </button>
    );
}