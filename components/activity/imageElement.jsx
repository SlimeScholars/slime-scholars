import { useState, useEffect } from "react";
import { Image } from "antd";

export default function ImageElement({element, index, colorPalette, bold, horiz}){
    const [data, setData] = useState(element)

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div>
            <Image src={element.image}
            style={{
                height: `${7 + 3.25 * element.size}rem`,
                width: "auto",
                borderWidth: element.border ? `${2 + 1 * element.size}px` : "0px",
                borderColor: colorPalette.dark,
                borderRadius: `${element.rounded * 0.45}rem`
            }}/>
        </div>
    )
}