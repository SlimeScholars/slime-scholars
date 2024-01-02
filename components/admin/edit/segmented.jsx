import { useState, useEffect } from "react";

export function Segmented({options, defaultIndex, onChange, theme, input}){
    const [selectIndex, setSelectIndex] = useState(defaultIndex)

    useEffect(() => {
        setSelectIndex(defaultIndex)
    }, [defaultIndex, options, input])

    return(
        <div className="relative bg-white py-1 rounded-md text-sm px-2">
            <div className="absolute z-[50] rounded-md h-[1.75rem] w-[7rem] transition-all duration-200 ease-out"
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

export function IconSegmented({options, defaultIndex, onChange, theme, input}){
    const [selectIndex, setSelectIndex] = useState(defaultIndex)

    useEffect(() => {
        setSelectIndex(defaultIndex)
    }, [defaultIndex, options, input])

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

export function ThinSegmented({options, defaultIndex, onChange, theme, input}){
    const [selectIndex, setSelectIndex] = useState(defaultIndex)

    useEffect(() => {
        setSelectIndex(defaultIndex)
    }, [defaultIndex, options, input])

    return(
        <div className="flex relative py-[0.125rem] bg-neutral-200 rounded-md text-sm px-1">
            <div className="absolute z-[50] rounded-md h-[1.375rem] w-[4.5rem] place-self-center transition-all duration-200"
            style={{
                transform: `translateX(${selectIndex*4.75}rem)`,
                backgroundColor: theme.demi_light
            }}/>
            <div className="flex flex-row gap-1">
                {options && options.map((item, key) => 
                <button className="min-w-[4.5rem] px-3 py-1 rounded-md" key={key}
                onClick={() => {
                    setSelectIndex(key)
                    onChange(item)
                }}>
                    <span className="relative z-[100] transition-all duration-200"
                    style={{
                        color: theme.dark
                    }}>{item}</span>
                </button>)}
            </div>
        </div>
    )
}