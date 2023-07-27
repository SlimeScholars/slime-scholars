import React from "react";
import Controls from "../controls";

export default function MCSection({
  options,
  section,
  changeSectionNumber,
  deleteSection,
  moveSection,
}) {
  return (
    <div className="w-full relative py-3 px-6 flex flex-col justify-start items-start bg-purple-50">
      <Controls
        section={section}
        changeSectionNumber={changeSectionNumber}
        deleteSection={deleteSection}
        moveSection={moveSection}
      />
      <div className="w-full grid grid-cols-2 gap-3 mt-5">
        {options.map(
          (option, index) =>
            option.content.length > 0 && (
              <p
                className={
                  "w-full ring-2 rounded-lg py-2 px-4 font-averia " +
                  (option.correct
                    ? "bg-green-100 text-green-400 ring-green-400"
                    : "bg-pink-100  text-pink-400 ring-pink-400")
                }
                key={index}
              >
                {option.content}
              </p>
            )
        )}
      </div>
    </div>
  );
}
