import React, { useState, useRef } from "react";
import UnitEditor from "./unitEditor";
import Link from "next/link";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function Unit({ unit, setUnit, setLoading, }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    if (x < width * 0.4) {
      setIsOpen(false);
      setSelected(false);
    }
  });

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
            "w-full h-12 flex items-center justify-between px-4 py-1 hover:bg-red-400/50 " +
            (selected ? "bg-red-400/50" : "bg-red-600/50")
          }
          onClick={() => {
            if (!selected && !isOpen) {
              setIsOpen(true);
              setSelected(true);
            }
          }}
        >
          {
            unit.unitName ? (
              <p className="text-white">
                {unit.unitNumber}. {unit.unitName}
              </p>
            ) : (
              <p className="text-gray">
                {unit.unitNumber}. New Unit
              </p>
            )
          }
        </button>
        {isOpen && (
          <div className="w-full flex flex-col pl-10 items-start justify-start">
            {unit.lessons.map((lesson, index) => (
              <Link
                href={"/admin/editLesson/"}
                key={index}
                className="w-full h-12 flex items-center justify-between px-4 py-1 bg-red-600/50 hover:bg-red-400/50 text-bg-light"
              >
                {lesson.lessonName ? (
                  <p className="text-white">
                    {lesson.lessonNumber}. {lesson.lessonName}
                  </p>
                ) : (
                  <p className="text-gray">
                    {lesson.lessonNumber}. New Lesson
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
      {selected && <UnitEditor unit={unit} setUnit={setUnit} setLoading={setLoading} />}
    </>
  );
}
