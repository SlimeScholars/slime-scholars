import { useState, useEffect } from "react";

export default function ImageElement({element, index, colorPalette, bold, horiz}){
    const [data, setData] = useState(element)

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div>
            <img src={element.image}
            style={{
                height: `${5 + 2.25 * element.size}rem`,
                width: "auto",
                borderWidth: element.border ? `${2 + 1 * element.size}px` : "0px",
                borderColor: colorPalette.dark,
                borderRadius: `${element.rounded * 0.45}rem`
            }}/>
        </div>
    )
}