import { useState, useEffect } from "react"

export default function Section({section, index, theme}){
    const [data, setData] = useState(section)

    useEffect(() => {
        setData(section)
    }, [section])
 
    return(
        <div className="w-full p-3 rounded-md shadow-md flex flex-col items-start gap-3"
        style={{backgroundColor: theme.ultra_light}}>
            <span className="font-bold">
                Section {index}: <span className="font-normal">{data.elements.length} elements</span>
            </span>
            <span>
                Style: {data.sectionStyle}
            </span>
            <span>
                Direction: {data.sectionDirection}
            </span>
            <button className="px-8 py-1 rounded-md text-sm hover:brightness-[1.25]"
            style={{backgroundColor: theme.semi_dark, color: theme.ultra_light}}>
                + Add Element
            </button>
        </div>
    )
}