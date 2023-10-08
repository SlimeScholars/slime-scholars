import { useState, useEffect } from "react";

export default function Segmented({options, defaultIndex, onChange, theme}){
    const [selectIndex, setSelectIndex] = useState(defaultIndex)

    useEffect(() => {
        setSelectIndex(defaultIndex)
    }, [defaultIndex])

    return(
        <div className="relative bg-white py-1 rounded-md text-sm px-2">
            <div className="absolute z-[50] rounded-md h-[1.75rem] w-[7rem] transition-all duration-200"
            style={{
                transform: `translateX(${selectIndex*7.5}rem)`,
                backgroundColor: theme.medium
            }}/>
            <div className="flex flex-row gap-2">
                {options && options.map((item, key) => 
                <button className="min-w-[7rem] px-3 py-1 rounded-md" key={key}
                onClick={() => {
                    setSelectIndex(key)
                    onChange(item)
                }}>
                    <span className="relative z-[100] transition-all duration-200"
                    style={{
                        color: selectIndex === key ? theme.ultra_light : theme.dark
                    }}>{item}</span>
                </button>)}
            </div>
        </div>
    )
}