import Image from "next/image"
import Navbar from "../../components/main/navbar"
import { useState } from "react"

export default function Classroom({user, setUser, colorPalette}){
    const [SCARY, setSCARY] = useState(false)

    return(
        <div className="flex flex-col w-full h-full">
            {SCARY ? 
            <>
            <Image
            src="/assets/secrets/haha.jpeg"
            width={0}
            height={0}
            sizes="100vw"
            className="w-[100vw] h-[100vh] HAHA"
            />
            </>:
            <>
            <Navbar user={user} setUser={setUser} colorPalette={colorPalette}/>
            <div className="w-full h-[calc(100vh_-_5rem)] bg-neutral-100 flex flex-col items-center 
            justify-center font-galindo text-4xl">
                <span>Classrooms</span>
                <span className="text-xl">Coming Soon...</span>
                <button className="border-2 rounded-md border-neutral-500 bg-neutral-200 px-10 py-2 mt-8 flex 
                flex-col text-center items-center hover:brightness-90"
                onClick={() => {
                    setSCARY(true)
                }}>
                    <span className="text-sm">Click Me!</span>
                    <span className="text-sm">(Epilepsy Warning)</span>
                </button>
            </div>
            </>}
        </div>
    )
}