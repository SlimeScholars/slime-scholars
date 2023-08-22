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
            className="font-galindo p-8"
            onClick={
                (e) => {
                    e.preventDefault()
                    router.push("/courses")
                }
            }>
            Earn Flowers

        </button>
    );
}