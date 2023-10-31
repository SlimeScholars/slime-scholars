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
                    <div className="flex flex-row items-center gap-4 z-[100]">
                        <div className="mc-button z-[100] cursor-pointer"
                        style={{
                            width: "16px",
                            height: "16px",
                            backgroundColor: key === selectedIndex ? theme.semi_dark : "transparent"
                        }}
                        onClick={() => {
                            setSelectedIndex(key)
                        }}/>
                        {item.option}
                    </div>
                )
            })}
            </div>
        </div>
    )
}