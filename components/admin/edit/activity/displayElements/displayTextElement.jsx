import { useState, useEffect } from "react";

export default function DisplayTextElement({element, index, key, theme, bold, horiz}){
    const [data, setData] = useState(element)

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div className={`text-xs ${bold ? "font-bold" : ""}`} style={{color:theme.dark}}>{element.text}</div>
    )
}