import { useState, useEffect, Fragment } from "react";
import parse from 'html-react-parser'

export default function DisplayTextElement({ element, index, theme, bold, horiz }) {
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
        <div className={`text-xs ${bold ? "font-bold" : ""}`} style={{ color: theme.dark }}>{parsedText}</div>
    )
}