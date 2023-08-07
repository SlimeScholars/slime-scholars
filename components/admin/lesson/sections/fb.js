import React, { useState } from "react";
import Controls from "../controls";

export default function FBSection({
  text,
  afterBlank,
  section,
  changeSectionNumber,
  deleteSection,
  moveSection,
  active,
  sectionNumber,
  setSectionNumber,
}) {
  const [selected, setSelected] = useState(false);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(false);

  const handleSubmit = () => {
    console.log(section);
    if (active) {
      setSectionNumber(section.sectionNumber + 1);
      setSelected(true);
      setCorrect(section.blank.includes(answer));
    }
  };

  return (
    !active ||
    (sectionNumber >= section.sectionNumber && (
      <div className="w-full relative py-3 px-6 flex flex-col justify-start items-start bg-purple-50">
        {!active && (
          <Controls
            section={section}
            changeSectionNumber={changeSectionNumber}
            deleteSection={deleteSection}
            moveSection={moveSection}
          />
        )}
        <div className="w-full flex flex-row flex-wrap items-center justify-center gap-3 mt-5">
          <p className="font-averia text-lg text-pink-400">{text}</p>
          <input
            className={
              "w-32 ring-1 rounded-md py-1 px-2 font-averia " +
              (selected
                ? correct
                  ? "bg-green-100 text-green-400 ring-green-400"
                  : "bg-red-200 text-red-400 ring-red-400"
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
        {selected && active && !correct && (
          <p className="font-averia text-sm mt-1 text-green-400 w-full text-center">
            Answer: {section.blank[0]}
          </p>
        )}
      </div>
    ))
  );
}
