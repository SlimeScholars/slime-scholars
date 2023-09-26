import React, { useState, useRef } from "react";
import CourseEditor from "./courseEditor";
import Unit from "./unit";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CourseQuiz from "./courseQuiz";

export default function Course({ course, setCourse, setLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  // console.log(course)
  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const selectRef = useRef();
  useClickOutside(selectRef, () => {
    if (x < width * 0.4) {
      setSelected(false);
    }
  });


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
          {course.courseName ? (
            <p className="text-white">
              {course.courseName}
            </p>
          ) : (
            <p className="text-gray">
              New Course
              {course.courseName}
            </p>
          )}
        </button>
        {isOpen && (
          <div className="w-full flex flex-col pl-5 items-start justify-start">
            {course.units.map((unit, index) => (
              <Unit
                key={index}
                unit={unit}
                setUnit={(newUnit) => {
                  let newUnits = [...course.units];
                  newUnits[index] = newUnit;
                  course.units = newUnits;
                  setCourse(course);
                }}
                setLoading={setLoading}
              />
            ))}
            {course.quizzes.map((courseQuiz, index) => (
              <CourseQuiz
                key={index}
                courseQuiz={courseQuiz}
                setCourseQuiz={(newCourseQuiz) => {
                  let newCourseQuizzes = [...course.quizzes];
                  newCourseQuizzes[index] = newCourseQuiz;
                  course.quizzes = newCourseQuizzes;
                  setCourse(course);
                }}
                setLoading={setLoading}
              />
            ))}
          </div>
        )}
      </div>
      {selected && <CourseEditor course={course} setCourse={setCourse} setLoading={setLoading} />}
    </>
  );
}
