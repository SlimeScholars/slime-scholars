import { useEffect, useState } from "react"
import DisplayFreeResponseElement from "./displayElements/displayFreeResponseElement"
import DisplayImageElement from "./displayElements/displayImageElement"
import DisplayTextElement from "./displayElements/displayTextElement"
import DisplayMultipleChoiceElement from "./displayElements/displayMultipleChoiceElement"

const verticalMapMethod = (arr, extprops) => {
    return <div className="flex flex-col gap-2">
        {arr.map((element, key) => {
        const props = {key:key, index:key+1, element:element, horiz:false}
        return(
            element.elementType === 0 ? <DisplayTextElement {...props} {...extprops}/> : 
            element.elementType === 1 ? <DisplayImageElement {...props} {...extprops}/> : 
            element.elementType === 2 ? <DisplayMultipleChoiceElement {...props} {...extprops}/> : 
            element.elementType === 3 ? <DisplayFreeResponseElement {...props} {...extprops}/> : 
            <></>
        )})}
    </div>
}

const horizontalMapMethod = (arr, extprops) => {
    const pairs = []

    for (let i = 0; i < arr.length; i += 2) {
        if (i + 1 < arr.length) {
          const pair = [arr[i], null, arr[i + 1]];
          pairs.push(pair);
        } else {
          pairs.push([arr[i]]);
        }
    }

    return <div className="flex flex-col gap-2">
    {pairs.map((pair, key) => {
        return(
            <div className="horizontal-display-grid">
                {pair.map((element) => {
                    const props = {key:2*key+1, index:key+1, element:element, horiz:true}
                    return(
                        element ? 
                        element.elementType === 0 ? <DisplayTextElement {...props} {...extprops}/> : 
                        element.elementType === 1 ? <DisplayImageElement {...props} {...extprops}/> : 
                        element.elementType === 2 ? <DisplayMultipleChoiceElement {...props} {...extprops}/> : 
                        element.elementType === 3 ? <DisplayFreeResponseElement {...props} {...extprops}/> : 
                        <></>:
                        <section/>
                    )}
                )}
            </div>
        )
    })}
</div>
}

export default function DisplaySection({section, theme}){
    const [data, setData] = useState(section)

    useEffect(() => {
        setData(section)
    }, [section])

    return data.sectionStyle.toLowerCase() === "plain" ? 
    (
        <div className="relative rounded-md p-4" style={{
            backgroundColor: theme.ultra_light
        }}>
            {data.sectionDirection.toLowerCase() === "vertical" ? 
                verticalMapMethod(data.elements, {theme:theme})
                :
                horizontalMapMethod(data.elements, {theme:theme})
            }
        </div>
    ):
    (
        <div className="relative rounded-md p-4 border-double" style={{
            backgroundColor: theme.ultra_light,
            borderColor: theme.semi_dark,
            borderWidth: 6
        }}>
            <div className="absolute top-0 left-0 w-full h-full"/>
            <div className="relative z-[200]">
                {data.sectionDirection.toLowerCase() === "vertical" ? 
                    verticalMapMethod(data.elements, {theme:theme})
                    :
                    horizontalMapMethod(data.elements, {theme:theme})
                }
            </div>
        </div>
    )
}