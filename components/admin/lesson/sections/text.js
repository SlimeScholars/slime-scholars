import React, { useEffect, useState } from "react";
import Controls from "../controls";
import ReactHtmlParser from 'react-html-parser'
import { showToastMessage } from "../../../../utils/verify";

export default function TextSection({
  text,
  section,
  changeSectionNumber,
  deleteSection,
  moveSection,
}) {
  const [parsedText, setParsedText] = useState(<></>)

  useEffect(() => {
    try {
      setParsedText(ReactHtmlParser(text))
    } catch (error) { 
      showToastMessage('Parsing error')
    }
  }, [text])
  return (
    <div className="w-full relative py-3 px-6 flex flex-col justify-start items-start bg-purple-50">
      <Controls
        section={section}
        changeSectionNumber={changeSectionNumber}
        deleteSection={deleteSection}
        moveSection={moveSection}
      />
      <div className="text-xl w-full text-center py-3 font-averia text-pink-400">
        {parsedText}
      </div>
    </div>
  );
}
