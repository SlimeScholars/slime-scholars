import React, { useState, useRef } from "react";
import CourseEditor from "./courseEditor";
import Unit from "./unit";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function Course({ course, setCourse, setLoading }) {
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

  let newCourse = { ...course };
  let units = [...newCourse.units];

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
          {newCourse.courseName ? (
            <p className="text-white">
              {newCourse.courseName}
            </p>
          ) : (
            <p className="text-gray">
              New Course
              {newCourse.courseName}
            </p>
          )}
        </button>
        {isOpen && (
          <div className="w-full flex flex-col pl-5 items-start justify-start">
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
      {selected && <CourseEditor course={newCourse} setCourse={setCourse} courseId={course._id} setLoading={setLoading} />}
    </>
  );
}
