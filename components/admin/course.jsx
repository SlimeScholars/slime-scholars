import React, { useState, useRef } from "react";
import CourseEditor from "./courseEditor";
import Unit from "./unit";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CourseQuiz from "./courseQuiz";
import { showToastError } from "../../utils/toast";
import axios from "axios";

export default function Course({ course, setCourse, setLoading, deleteCourse }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  //console.log(course)
  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const selectRef = useRef();
  useClickOutside(selectRef, () => {
    if (x < width * 0.5) {
      setSelected(false);
    }
  });

  const deleteUnit = (index) => {
    try {
      if (!course?.units[index]?._id) {
        throw new Error('Unit not found')
      }

      const newUnits = [...course.units]
      const tempUnit = newUnits.splice(index, 1)[0]

      setCourse({ ...course, units: newUnits })

      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        params: {
          unitId: tempUnit._id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete("/api/admin/unit/delete", config)
        .catch((error) => {
          if (error?.response?.data?.message) {
            showToastError(error.response.data.message)
          }
          else {
            showToastError(error.message)
          }
          newUnits.splice(index, 0, tempUnit)
          setCourse({ ...course, units: newUnits })
        });

    } catch (error) {
      showToastError(error.message);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col justify-start items-start overflow-hidden">
        <button
          className={
            `w-full h-12 flex items-center justify-between px-4 py-1 rounded-lg transition-all duration-150 mb-2
             text-black ${selected ? "bg-sky-700 hover:bg-sky-900" : "bg-slate-400 hover:bg-slate-400"}`
          }
          onClick={() => {
            setSelected(true);
            setIsOpen(!isOpen);
          }}
          ref={selectRef}
        >
          {course.courseName ? (
            <p className={`${!selected ? "text-white" : "text-sky-300"} font-bold`}>
              {course.courseName}
            </p>
          ) : (
            <p className="text-white">
              New Course
              {course.courseName}
            </p>
          )}
        </button>
        {isOpen && (
          <div className="w-full flex flex-col pl-5 items-start justify-start">
            {course.units.map((unit, index) => (
              <div className="flex flex-row w-full gap-2">
              <span className="font-bold text-2xl">L</span>
              <Unit
                key={index}
                unit={unit}
                setUnit={(newUnit) => {
                  let newUnits = [...course.units];
                  newUnits[index] = newUnit;
                  course.units = newUnits;
                  setCourse(course);
                }}
                deleteUnit={() => deleteUnit(index)}
                setLoading={setLoading}
              />
              </div>
            ))}
            {course.quizzes.map((courseQuiz, index) => (
              <div className="flex flex-row w-full gap-2">
              <span className="font-bold text-2xl">L</span>
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
              </div>
            ))}
          </div>
        )}
      </div>
      {selected && <CourseEditor course={course} setCourse={setCourse} setLoading={setLoading} deleteCourse={deleteCourse}/>}
    </>
  );
}
