import { useState, useEffect } from "react";

export default function DisplayImageElement({element, index, key, theme, bold, horiz}){
    const [data, setData] = useState(element)

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div>
            <img src={element.image}
            style={{
                height: `${3.5 + 1.5 * element.size}rem`,
                width: "auto",
                borderWidth: element.border ? `${2 + 1 * element.size}px` : "0px",
                borderColor: theme.dark,
                borderRadius: `${element.rounded * 0.45}rem`
            }}/>
        </div>
    )
}