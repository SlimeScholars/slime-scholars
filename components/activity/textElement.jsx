import { useState, useEffect } from "react";

export default function TextElement({element, index, colorPalette, bold, horiz}){
    const [data, setData] = useState(element)

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div className={`text-md 2xl:text-[1.07em] ${bold ? "font-bold" : ""}`} 
        style={{ color:colorPalette.black}}>
            {element.text}
        </div>
    )
}