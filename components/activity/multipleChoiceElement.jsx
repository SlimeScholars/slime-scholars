import { useState, useEffect } from "react";

export default function MultipleChoiceElement({element, index, key, colorPalette, bold, horiz}){
    const [data, setData] = useState(element)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div className={`text-md ${bold ? "font-black" : "font-semibold"} rounded-md py-2 px-4`} style={{
            color:colorPalette.black,
            backgroundColor: colorPalette.primary2 + "28"
        }}>
            <span>{data.text}</span>
            <div className="mt-2 flex flex-col gap-1">
            {data.options && data.options.map((item, key) => {
                return(
                    <div key={key} className={`w-full rounded-md px-3 py-1 transition-colors duration-200 ${bold ? "font-bold" : "font-normal"}`}
                    style={{
                        backgroundColor: key === selectedIndex ? colorPalette.primary2 + "C0" : colorPalette.text1 + "A0",
                        color: key === selectedIndex ? colorPalette.white: colorPalette.black,
                        width: horiz ? "100%" : "50%",
                        fontWeight: key === selectedIndex ? 700 : 500
                    }}
                    onClick={() => {
                        setSelectedIndex(key)
                    }}>
                        {item.option}
                    </div>
                )
            })}
            </div>
        </div>
    )
}