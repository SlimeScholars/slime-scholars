import { useState, useEffect } from "react";

export default function DisplayFreeResponseElement({element, index, theme, bold, horiz}){
    const [data, setData] = useState(element)

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div className={`flex flex-col gap-1 text-xs ${bold ? "font-black" : "font-semibold"} rounded-md py-2 px-4`} style={{
            color:theme.dark,
            backgroundColor: theme.demi_light + "40"
        }}>
            <span className="underline">Fill in the Blank:</span>
            <div className={`flex flex-row gap-2 ${bold ? "font-bold" : "font-normal"}`}>
                <span>{data.text}</span> 
                <input className="rounded-md px-1 w-[100px]"/>
                <span>{data.afterBlank}</span>
            </div>
        </div>
    )
}