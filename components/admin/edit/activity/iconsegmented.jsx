import { useState, useEffect } from "react";

export default function IconSegmented({options, defaultIndex, onChange, theme}){
    const [selectIndex, setSelectIndex] = useState(defaultIndex)

    useEffect(() => {
        setSelectIndex(defaultIndex)
    }, [defaultIndex])

    return(
        <div className="flex relative py-[0.125rem] bg-neutral-200 rounded-md text-sm px-1">
            <div className="absolute z-[50] rounded-md h-[1.375rem] w-[1.5rem] place-self-center transition-all duration-200"
            style={{
                transform: `translateX(${selectIndex*1.75}rem)`,
                backgroundColor: theme.medium
            }}/>
            <div className="flex flex-row gap-1">
                {options && options.map((item, key) => 
                <button className="flex justify-center items-center w-[1.5rem] py-1 rounded-md" key={key}
                onClick={() => {
                    setSelectIndex(key)
                    onChange(item.key)
                }}>
                    <span className="relative z-[100] transition-all duration-200"
                    style={{
                        color: selectIndex === key ? theme.ultra_light : theme.dark
                    }}>{item.icon}</span>
                </button>)}
            </div>
        </div>
    )
}