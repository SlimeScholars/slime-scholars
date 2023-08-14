import React from "react"
import { useRouter } from 'next/router'
/*
Button to earn flowers

Bg Color:
    Red: 228
    Green: 117
    Blue: 136
*/

export default function EarnFlwrBtn() {
    const router = useRouter()

    return (
        <button id="earnFlwr" 
            className="font-galindo"
            onClick = {
            (e) => {
                e.preventDefault()
                router.push("/courses/index")
            }
        }>
            Earn Flowers
            
        </button>
    );
}