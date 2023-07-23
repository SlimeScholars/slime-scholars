import React, { useState, useRef } from "react";
import UnitEditor from "./unitEditor";
import Lesson from "./lesson";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function Unit({ unit, setUnit, setLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const selectRef = useRef();
  useClickOutside(selectRef, () => {
    if (x < width * 0.4) {
      setSelected(false);
    }
  });

  console.log(unit);

  return (
    <>
      <div
        className={
          "w-full flex flex-col justify-start items-start overflow-hidden " +
          (isOpen ? "" : "h-12")
        }
      >
        <button
          className={
            "w-full h-12 flex items-center justify-between px-4 py-1 hover:bg-red-400/50 " +
            (selected ? "bg-red-400/50" : "bg-red-600/50")
          }
          onClick={() => {
            setSelected(true);
            setIsOpen(!isOpen);
          }}
          ref={selectRef}
        >
          {unit.unitName ? (
            <p className="text-white">
              {unit.unitNumber}. {unit.unitName}
            </p>
          ) : (
            <p className="text-gray">{unit.unitNumber}. New Unit</p>
          )}
        </button>
        {isOpen && (
          <div className="w-full flex flex-col pl-10 items-start justify-start">
            {unit.lessons.map((lesson, index) => (
              <Lesson
                key={index}
                lesson={lesson}
                setLesson={(newLesson) => {
                  let newLessons = [...unit.lessons];
                  newLessons[index] = newLesson;
                  unit.lessons = newLessons;
                  setUnit(unit);
                }}
                setLoading={setLoading}
              />
            ))}
          </div>
        )}
      </div>
      {selected && (
        <UnitEditor unit={unit} setUnit={setUnit} setLoading={setLoading} />
      )}
    </>
  );
}
