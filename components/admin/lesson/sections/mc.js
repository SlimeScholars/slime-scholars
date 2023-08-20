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
}) {
  const [selected, setSelected] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1)
  const [collapse, setCollapse] = useState(true)

  const handleClick = (option, index) => {
    setSelected(true);
    if (active) {
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
    (!active || sectionNumber >= section.sectionNumber) && (
      <div className="w-full relative py-3 px-6 flex flex-col justify-start items-start bg-purple-50">
        {!active && (
          <Controls
            section={section}
            changeSectionNumber={changeSectionNumber}
            deleteSection={deleteSection}
            moveSection={moveSection}
          />
        )}
        <div className="w-full grid grid-cols-2 gap-3 mt-5">
          {options.map(
            (option, index) =>
              option.option.length > 0 && (
                <button
                  className={
                    "w-full ring-2 rounded-lg py-2 px-4 font-averia " +
                    (selected
                      ? correct
                        ? selectedOption === index ? 'bg-green-300 text-green-700 ring-green-700 font-bold' : "bg-green-100 text-green-400 ring-green-400"
                        : selectedOption === index ? 'bg-red-300 text-red-700 ring-red-700 font-bold' : "bg-red-100 text-red-400 ring-red-400"
                      : "bg-pink-100  text-pink-400 ring-pink-400 hover:bg-pink-200 ")
                  }
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
                  Answer(s): {answers.join(', ')}
                </p>
              )}
            </div>

          </div>
        )}
      </div>
    )
  );
}
