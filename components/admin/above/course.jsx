import React, { useState, useRef } from "react";
import Unit from "./unit";

import { BiSolidDownArrow } from "react-icons/bi";
import { showToastError } from "../../../utils/toast";
import axios from "axios";

export default function Course({ course, setCourse, setLoading, deleteCourse, setSidePanelProperties, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  //console.log(course)

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
            `w-full h-12 flex items-center justify-between pl-4 py-1 rounded-lg transition-all duration-150 mb-2
             text-black ${(selected === course._id) ? "bg-sky-700 hover:bg-sky-700" : "bg-slate-700 hover:bg-slate-700"}`
          }
          onClick={() => {
            setSelected(course._id);
            setSidePanelProperties({type:"course", details:course})
            ;
          }}
        >
          {course.courseName ? (
            <p className={`${!(selected === course._id) ? "text-white" : "text-sky-300"} font-bold`}>
              {course.courseName}
            </p>
          ) : (
            <p className="text-white">
              New Course
              {course.courseName}
            </p>
          )}
          {course.units.length > 0 && <button className={`text-xl z-[300] p-1 pl-20 pr-4 ${!(selected === course._id) ? "text-white" : "text-sky-300"}`}
          onClick={(e) => {
            setIsOpen(!isOpen)
          }}>
            <BiSolidDownArrow className={`${!isOpen ? "rotate-90" : "rotate-0"} 
            transition-all duration-150`}/>
          </button>}
        </button>
        <div className={`${isOpen ? "scale-y-100 h-auto" : "scale-y-0 h-0"} origin-top transition-all duration-150 w-full`}>
          <div className="w-full flex flex-col pl-5 items-start justify-start">
            {course.units.map((unit, index) => (
              <div className="flex flex-row w-full gap-2">
              <span className="font-bold text-2xl">L</span>
              <Unit
                key={index}
                setSidePanelProperties={setSidePanelProperties}
            selected = {selected}
            setSelected = {setSelected}
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
            {/* {course.quizzes.map((courseQuiz, index) => (
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
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}
