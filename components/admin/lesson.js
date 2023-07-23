import React, { useState, useRef } from "react";
import LessonEditor from "./lessonEditor";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function Lesson({ lesson, setLesson, setLoading, }) {
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
            lesson.lessonName ? (
              <p className="text-white">
                {lesson.lessonNumber}. {lesson.lessonName}
              </p>
            ) : (
              <p className="text-gray">
                {lesson.lessonNumber}. New Lesson
              </p>
            )
          }
        </button>
      </div>
      {selected && <LessonEditor lesson={lesson} setLesson={setLesson} setLoading={setLoading} />}
    </>
  );
}

