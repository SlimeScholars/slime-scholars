import React, { useState, useRef } from "react";
import CourseEditor from "./courseEditor";
import Unit from "./unit";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function Course({ course, setCourse }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const clickRef = React.useRef();
  useClickOutside(clickRef, () => {
    if (x < width * 0.4) {
      setIsOpen(false);
      setSelected(false);
    }
  });

  let newCourse = { ...course };
  let units = [...newCourse.units];

  return (
    <>
      <div
        className={
          "w-full flex flex-col " + (isOpen ? "max-h-max" : "max-h-12")
        }
        ref={clickRef}
      >
        <button
          className={
            "w-full h-12 flex items-center justify-between px-4 py-1 hover:bg-gray-400 " +
            (selected ? "bg-gray-400" : "bg-gray-500")
          }
          onClick={() => {
            if (!selected && !isOpen) {
              setIsOpen(true);
              setSelected(true);
            }
          }}
        >
          <p className="text-white">{newCourse.name}</p>
        </button>
        {selected && (
          <div className="w-full flex flex-col pl-5 items-start justify-start bg-gray-300">
            {units.map((unit, index) => (
              <Unit
                key={index}
                unit={unit}
                setUnit={(newUnit) => {
                  let newUnits = [...units];
                  newUnits[index] = newUnit;
                  newCourse.units = newUnits;
                  setCourse(newCourse);
                }}
              />
            ))}
          </div>
        )}
      </div>
      {selected && <CourseEditor newCourse={newCourse} setCourse={setCourse} />}
    </>
  );
}
