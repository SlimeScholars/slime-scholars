import { useState, useEffect } from "react";

export default function DisplayMultipleChoiceElement({element, index, key, theme, bold, horiz}){
    const [data, setData] = useState(element)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    useEffect(() => {
        setData(element)
    }, [element])

    return(
        <div className={`text-xs ${bold ? "font-black" : "font-semibold"} rounded-md py-2 px-4`} style={{
            color:theme.dark,
            backgroundColor: theme.demi_light + "40"
        }}>
            <span>{data.text}</span>
            <div className="mt-2 flex flex-col gap-1">
            {data.options && data.options.map((item, key) => {
                return(
                    <div key={key} className={`w-full rounded-md px-3 py-1 transition-all duration-200 ${bold ? "font-bold" : "font-normal"}`}
                    style={{
                        backgroundColor: key === selectedIndex ? theme.medium + "C0" : theme.demi_light + "A0",
                        color: key === selectedIndex ? theme.ultra_light: theme.dark,
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