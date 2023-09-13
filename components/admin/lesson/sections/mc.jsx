import React, { useState } from "react";
import Controls from "../controls";
import { FaCaretDown } from 'react-icons/fa'

export default function MCSection({
  options,
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
  explanation,
  colorPalette
}) {
  const [selected, setSelected] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1)
  const [collapse, setCollapse] = useState(true)

  const handleClick = (option, index) => {
    setSelected(true);
    if (active) {
      if (!selected && isQuiz && option.correct) {
        addScore(1)
      }
      setCorrect(option.correct)
      setSelectedOption(index)
      increment(sectionNumber)
    }
  };

  const answers = []
  for (let i in options) {
    if (options[i].correct) {
      answers.push(options[i].option)
    }
  }

  return (
    (!active || curQuizQuestion > questionNumber || (sectionNumber >= section.sectionNumber && curQuizQuestion === questionNumber)) && (
      <div className="w-full relative py-3 px-6 flex flex-col justify-start items-start"
      style={{
        backgroundColor:!colorPalette ? "" : colorPalette.primary1
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
        <div className="w-full grid grid-cols-2 gap-3 mt-5">
          {options.map(
            (option, index) =>
              option.option.length > 0 && (
                <button
                  className={
                    "w-full ring-2 rounded-md py-2 px-4 font-averia " +
                    (selected
                      ? correct
                        ? "bg-green-100 text-green-400 ring-green-400"
                        : "bg-red-100 text-red-400 ring-red-400"
                      : "")
                  }
                  style={colorPalette && !selected ? {
                    backgroundColor:colorPalette.white,
                    color:colorPalette.black,
                  } : {}}
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClick(option, index)
                  }}
                  disabled={selected}
                >
                  {option.option}
                </button>
              )
          )}
        </div>

        {((selected && active) || (!active)) && (
          <div className={`flex justify-center w-full mt-8 flex-col select-none ${active ? 'cursor-pointer' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setCollapse(!collapse)
            }}
          >
            <div
              className={`w-full ring-2 rounded-sm py-2 px-4 font-averia text-center ${correct || !active ?
                'bg-green-100 text-green-400 ring-green-400' :
                'bg-red-100 text-red-400  ring-red-400'}`
              }
            >
              {active &&
                <div>
                  See answers <FaCaretDown className="ml-1 inline text-lg -mt-1" />
                </div>
              }
              {(!collapse || !active) && (
                <>
                  <p>
                    Answer(s): {answers.join(', ')}
                  </p>
                  <p>
                    Explanation: {explanation}
                  </p>
                </>
              )}
            </div>

          </div>
        )}
      </div>
    )
  );
}
