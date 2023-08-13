import React, { useState } from "react";
import Controls from "../controls";

export default function MCSection({
  options,
  section,
  changeSectionNumber,
  deleteSection,
  moveSection,
  active,
  sectionNumber,
  setSectionNumber,
}) {
  const [selected, setSelected] = useState(false);

  const handleClick = (option) => {
    setSelected(true);
    if (active) setSectionNumber(section.sectionNumber + 1);
  };

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
                      ? option.correct
                        ? "bg-green-100 text-green-400 ring-green-400"
                        : "bg-red-200 text-red-400 ring-red-400"
                      : "bg-pink-100  text-pink-400 ring-pink-400 hover:bg-pink-200 ")
                  }
                  key={index}
                  onClick={() => handleClick(option)}
                  disabled={selected}
                >
                  {option.option}
                </button>
              )
          )}
        </div>
      </div>
    )
  );
}
