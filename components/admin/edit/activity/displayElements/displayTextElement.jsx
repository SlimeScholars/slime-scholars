import { useState, useEffect, Fragment } from "react";
import ReactHtmlParser from 'react-html-parser';

export default function DisplayTextElement({ element, index, theme, bold, horiz }) {
    // Not sure why we did this:
    // const [data, setData] = useState(element)

    // useEffect(() => {
    //     setData(element)
    // }, [element])

    const [parsedText, setParsedText] = useState(<Fragment></Fragment>)

    useEffect(() => {
        setParsedText(ReactHtmlParser(element.text))
    }, [element])

    return (
        <div className={`text-xs ${bold ? "font-bold" : ""}`} style={{ color: theme.dark }}>{parsedText}</div>
    )
}