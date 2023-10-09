import { useState, useEffect } from "react";

export default function DisplayImageElement({element, index, key, theme, bold, horiz}){
    const [data, setData] = useState(element)

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div>
            <img src={element.image} className="h-[3.75rem] w-auto rounded-md"/>
        </div>
    )
}