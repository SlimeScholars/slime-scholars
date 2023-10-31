import { useEffect, useState } from "react"
import FreeResponseElement from "./freeResponseElement"
import ImageElement from "./imageElement"
import TextElement from "./textElement"
import MultipleChoiceElement from "./multipleChoiceElement"

const verticalMapMethod = (arr, extprops) => {
    return <div className="flex flex-col gap-2">
        {arr.map((element, key) => {
        const props = {key:key, index:key+1, element:element, horiz:false}
        return(
            element.elementType === 0 ? <TextElement {...props} {...extprops}/> : 
            element.elementType === 1 ? <ImageElement {...props} {...extprops}/> : 
            element.elementType === 2 ? <MultipleChoiceElement {...props} {...extprops}/> : 
            element.elementType === 3 ? <FreeResponseElement {...props} {...extprops}/> : 
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
                {pair.map((element, parity) => {
                    const props = {key:2 * key + parity, index:key+1, element:element, horiz:true}
                    return(
                        element ? 
                        element.elementType === 0 ? <TextElement {...props} {...extprops}/> : 
                        element.elementType === 1 ? <ImageElement {...props} {...extprops}/> : 
                        element.elementType === 2 ? <MultipleChoiceElement {...props} {...extprops}/> : 
                        element.elementType === 3 ? <FreeResponseElement {...props} {...extprops}/> : 
                        <></>:
                        <section/>
                    )}
                )}
            </div>
        )
    })}
</div>
}

export default function Section({section, colorPalette}){
    const [data, setData] = useState(section)

    useEffect(() => {
        setData(section)
    }, [section])

    return data.sectionStyle.toLowerCase() === "plain" ? 
    (
        <div className="relative p-4 fade-in-bottom-index-fast" style={{
            backgroundColor: colorPalette.white + "A0"
        }}>
            {data.sectionDirection.toLowerCase() === "vertical" ? 
                verticalMapMethod(data.elements, {colorPalette:colorPalette})
                :
                horizontalMapMethod(data.elements, {colorPalette:colorPalette})
            }
        </div>
    ):
    (
        <div className="relative p-4 border-double fade-in-bottom-index-fast" style={{
            backgroundColor: colorPalette.white + "B0",
            borderColor: colorPalette.primary1 + "A0",
            borderWidth: 6
        }}>
            <div className="absolute top-0 left-0 w-full h-full"/>
            <div className="relative z-[200]">
                {data.sectionDirection.toLowerCase() === "vertical" ? 
                    verticalMapMethod(data.elements, {colorPalette:colorPalette})
                    :
                    horizontalMapMethod(data.elements, {colorPalette:colorPalette})
                }
            </div>
        </div>
    )
}