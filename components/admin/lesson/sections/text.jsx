import React, { useEffect, useState } from "react";
import Controls from "../controls";
import ReactHtmlParser from "react-html-parser";
import { showToastError } from "../../../../utils/toast";

export default function TextSection({
  text,
  section,
  changeSectionNumber,
  deleteSection,
  moveSection,
  active,
  sectionNumber,
  questionIndex,
  questionNumber,
  curQuizQuestion,
  colorPalette
}) {
  const [parsedText, setParsedText] = useState(<></>);
  console.log(colorPalette)

  useEffect(() => {
    try {
      setParsedText(ReactHtmlParser(text));
    } catch (error) {
      showToastError("Parsing error");
    }
  }, [text]);
  return (
    (!active || curQuizQuestion > questionNumber || (sectionNumber >= section.sectionNumber && curQuizQuestion === questionNumber)) && (
      <div className="w-full relative py-3 px-6 flex flex-col justify-start items-start"
      style={{
        backgroundColor:!colorPalette ? "" : colorPalette.secondary1
      }}>
        {!active && (
          <Controls
            section={section}
            changeSectionNumber={changeSectionNumber}
            deleteSection={deleteSection}
            moveSection={moveSection}
            questionIndex={questionIndex}
          />
        )}
        <div className="text-xl w-full text-center py-3 font-averia"
        style={{
          color:!colorPalette ? "" : colorPalette.text2
        }}>
          {parsedText}
        </div>
      </div>
    )
  );
}
