import React, { useState } from "react";
import Controls from "../controls";
import { FaCaretDown } from 'react-icons/fa'

export default function FBSection({
  text,
  afterBlank,
  section,
  changeSectionNumber,
  deleteSection,
  moveSection,
  active,
  sectionNumber,
  increment,
  isQuiz,
  addScore,
  questionIndex,
  questionNumber,
  curQuizQuestion,
}) {
  const [selected, setSelected] = useState(false);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(false);
  const [collapse, setCollapse] = useState(true)

  const handleSubmit = () => {
    if (active) {
      if (!selected && isQuiz && section.blank.includes(answer.trim())) {
        addScore(1)
      }
      increment(sectionNumber)
      setSelected(true);
      setCorrect(section.blank.includes(answer.trim()));
    }
  }

  return (
    (!active || curQuizQuestion > questionNumber || (sectionNumber >= section.sectionNumber && curQuizQuestion === questionNumber)) && (
      <div className="w-full relative py-3 px-6 flex flex-col justify-start items-start bg-purple-50">
        {!active && (
          <Controls
            section={section}
            changeSectionNumber={changeSectionNumber}
            deleteSection={deleteSection}
            moveSection={moveSection}
            questionIndex={questionIndex}
          />
        )}
        <div className="w-full flex flex-row flex-wrap items-center justify-center gap-3 mt-5">
          <p className="font-averia text-lg text-pink-400">{text}</p>
          <input
            onClick={(e) => e.stopPropagation()}
            className={
              "w-32 ring-1 rounded-md py-1 px-2 font-averia " +
              (selected
                ? correct
                  ? "bg-green-100 text-green-400 ring-green-400"
                  : "bg-red-100 text-red-400 ring-red-400"
                : "bg-pink-100  text-pink-400 ring-pink-400 hover:bg-pink-200 ")
            }
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
            disabled={selected}
          />
          <p className="font-averia text-lg text-pink-400">{afterBlank}</p>
        </div>
        {selected && active && (
          <div className="flex justify-center w-full mt-8 flex-col select-none cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setCollapse(!collapse)
            }}
          >
            <div
              className={`w-full ring-2 rounded-sm py-2 px-4 font-averia text-center ${correct ?
                'bg-green-100 text-green-400 ring-green-400' :
                'bg-red-100 text-red-400  ring-red-400'}`
              }
            >
              <div>
                See answers <FaCaretDown className="ml-1 inline text-lg -mt-1" />
              </div>
              {!collapse && (
                <p>
                  Answer(s): {section.blank.join(', ')}
                </p>
              )}
            </div>

          </div>
        )}
      </div>
    )
  );
}
