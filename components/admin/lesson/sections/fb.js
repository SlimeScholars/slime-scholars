import React from "react";
import Controls from "../controls";

export default function FBSection({
  content,
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
      <div className="w-full flex flex-row flex-wrap items-center justify-center gap-3 mt-5">
        <p className="font-averia text-lg text-pink-400">{content.before}</p>
        <input className="w-32 ring-1 rounded-md py-1 px-2 font-averia bg-pink-50/50 text-pink-400 ring-pink-400" />
        <p className="font-averia text-lg text-pink-400">{content.after}</p>
      </div>
    </div>
  );
}
