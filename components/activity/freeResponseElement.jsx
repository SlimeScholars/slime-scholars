import { useState, useEffect } from "react";

export default function FreeResponseElement({element, index, colorPalette, bold, horiz}){
    const [data, setData] = useState(element)

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div className={`flex flex-col gap-1 text-md ${bold ? "font-black" : "font-semibold"} rounded-md py-2 px-4`} style={{
            color:colorPalette.black,
            backgroundColor: colorPalette.primary2 + "28"
        }}>
            <span className="underline">Fill in the Blank:</span>
            <div className={`${bold ? "font-bold" : "font-normal"}`}>
                <span>{data.text}</span> 
                <input className="mx-1 rounded-sm px-1 w-[7.5rem] focus:outline-none"
                style={{
                    backgroundColor: "#ffffff80",
                    color: colorPalette.black
                }}/>
                <span>{data.afterBlank}</span>
            </div>
        </div>
    )
}