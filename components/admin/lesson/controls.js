import React from "react";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";

export default function SectionControls({
  section,
  changeSectionNumber,
  deleteSection,
  moveSection,
}) {
  return (
    <div>
      <input
        className="bg-purple-500 flex items-center justify-center absolute -left-12 w-12 h-12"
        onChange={(e) => changeSectionNumber(section.index, e.target.value)}
        value={section.sectionNumber}
      />
      <button
        className="bg-pink-500 flex items-center justify-center absolute -left-24 w-12 h-12"
        onClick={() => deleteSection(section.index)}
      >
        <FaTrashAlt />
      </button>
      <div className="bg-green-400 flex flex-col absolute -left-36 w-12 h-12">
        <button
          className="w-full bg-green-400 h-1/2 flex items-center justify-center"
          onClick={() => moveSection(section.index, -1)}
        >
          <FaChevronUp />
        </button>
        <button
          className="w-full bg-blue-400 h-1/2 flex items-center justify-center"
          onClick={() => moveSection(section.index, 1)}
        >
          <FaChevronDown />
        </button>
      </div>
    </div>
  );
}
