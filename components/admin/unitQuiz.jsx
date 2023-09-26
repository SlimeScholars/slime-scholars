import React, { useState, useRef } from "react";
import LessonEditor from "./lessonEditor";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Activity from "./activity"; 
import UnitQuizEditor from "./unitQuizEditor";

export default function UnitQuiz({ unitQuiz, setUnitQuiz, setLoading, deleteUnitQuiz }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    if (x < width * 0.4) {
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
            unitQuiz.quizName ? (
              <p className="text-white">
                {unitQuiz.quizNumber}. {unitQuiz.quizName}
              </p>
            ) : (
              <p className="text-gray">
                {unitQuiz.quizNumber}. New Unit Quiz
              </p>
            )
          }
        </button>
      </div>
      {selected && <UnitQuizEditor
        unitQuiz={unitQuiz}
        setUnitQuiz={setUnitQuiz}
        setLoading={setLoading}
        deleteUnitQuiz={deleteUnitQuiz}
      />}
    </>
  );
}
