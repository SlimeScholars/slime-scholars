import { useState, useEffect, Fragment } from "react";
import parse from 'html-react-parser'

export default function TextElement({ element, index, colorPalette, bold, horiz }) {
    // Not sure why we did this:
    // const [data, setData] = useState(element)

    // useEffect(() => {
    //     setData(element)
    // }, [element])

    const [parsedText, setParsedText] = useState(<Fragment></Fragment>)

    useEffect(() => {
        setParsedText(parse(element.text))
    }, [element])

    return (
        <div className={`text-md 2xl:text-[1.07em] ${bold ? "font-bold" : ""}`}
            style={{ color: colorPalette.black }}>
            {parsedText}
        </div>
    )
}