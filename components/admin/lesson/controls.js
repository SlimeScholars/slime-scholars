import React from "react";
import { FaChevronDown, FaChevronUp, FaTrashAlt } from "react-icons/fa";

export default function SectionControls({
  section,
  changeSectionNumber,
  deleteSection,
  moveSection,
  questionIndex,
}) {
  return (
    <div className="text-bg-light">
      <input
        className="bg-purple-500/80 hover:bg-purple-400/80 font-averia font-bold text-xl flex text-center items-center justify-center absolute -left-12 w-12 h-12"
        onChange={(e) => {
          if (questionIndex === undefined) {
            changeSectionNumber(section.index, e.target.value)
          }
          else {
            changeSectionNumber(section.index, e.target.value, questionIndex)
          }
        }}
        value={section.sectionNumber}
        type="number"
      />
      <button
        className="bg-pink-500/80 hover:bg-pink-400/80 flex items-center justify-center absolute -left-24 w-12 h-12"
        onClick={() => {
          if (questionIndex === undefined) {
            deleteSection(section.index)
          }
          else {
            deleteSection(section.index, questionIndex)
          }
        }}
      >
        <FaTrashAlt />
      </button>
      <div className="flex flex-col absolute -left-36 w-12 h-12">
        <button
          className="w-full bg-green-400/80 hover:bg-green-300/80 h-1/2 flex items-center justify-center"
          onClick={() => {
            if (questionIndex === undefined) {
              moveSection(section.index, -1)
            }
            else {
              moveSection(section.index, -1, questionIndex)
            }
          }}
        >
          <FaChevronUp />
        </button>
        <button
          className="w-full bg-blue-400/80 hover:bg-blue-300/80 h-1/2 flex items-center justify-center"
          onClick={() => {
            if (questionIndex === undefined) {
              moveSection(section.index, 1)
            }
            else {
              moveSection(section.index, 1, questionIndex)
            }
          }}
        >
          <FaChevronDown />
        </button>
      </div>
    </div>
  );
}
