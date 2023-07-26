import React from "react";
import Controls from "../controls";

export default function TextSection({
  text,
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
      <p className="text-xl w-full text-center py-3 font-averia text-pink-400">
        {text}
      </p>
    </div>
  );
}
