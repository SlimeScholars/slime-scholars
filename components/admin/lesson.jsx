import React, { useState, useRef } from "react";
import LessonEditor from "./lessonEditor";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Activity from "./activity"; 

export default function Lesson({ lesson, setLesson, setLoading, deleteLesson }) {
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
      {isOpen && (
          <div className="w-full flex flex-col pl-10 items-start justify-start">
            {lesson.activities.map((activity, index) => (
              <Activity
                key={index}
                activity={activity}
                setActivity={(newActivity) => {
                  let newActivities = [...lesson.activities];
                  newActivities[index] = newActivity;
                  lesson.activities = newActivities;
                  setLesson(lesson);
                }}
                deleteActivity={() => deleteActivity(index)}
                setLoading={setLoading}
              />
            ))}
          </div>
        )}
      {selected && <LessonEditor
        lesson={lesson}
        setLesson={setLesson}
        setLoading={setLoading}
        deleteLesson={deleteLesson}
      />}
    </>
  );
}

