import React, { useState, useRef } from "react";

import Unit from "./unit";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import CourseQuiz from "./courseQuiz";
import Course from "./course";
import SubjectEditor from "./subjectEditor";
import { showToastError } from "../../utils/toast";
import axios from "axios";

export default function Subject({ subject, setSubject, setLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);
//   console.log(subject)
  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const selectRef = useRef();
  useClickOutside(selectRef, () => {
    if (x < width * 0.5) {
      setSelected(false);
    }
  });

  const deleteCourse = (index) => {
    try {
      if (!subject?.courses[index]?._id) {
        throw new Error('Course not found')
      }

      const newCourses = [...subject.courses]
      const tempCourse = newCourses.splice(index, 1)[0]

      setSubject({ ...subject, courses: newCourses })

      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        params: {
          courseId: tempCourse._id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete("/api/admin/course/delete", config)
        .catch((error) => {
          if (error?.response?.data?.message) {
            showToastError(error.response.data.message)
          }
          else {
            showToastError(error.message)
          }
          newCourses.splice(index, 0, tempCourse)
          setSubject({ ...subject, courses: newCourses })
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
          {subject.subjectName ? (
            <p className={`${!selected ? "text-white" : "text-sky-300"} font-bold`}>
              {subject.subjectName}
            </p>
          ) : (
            <p className="text-white font-bold">
              New Subject
              {subject.subjectName}
            </p>
          )}
        </button>
        {isOpen && (
          <div className="w-full flex flex-col pl-5 items-start justify-start">
            {subject.courses.map((course, index) => (
              <div className="flex flex-row w-full gap-2">
              <span className="font-bold text-2xl">L</span>
              <Course
                key={index}
                course={course}
                setCourse={(newCourse) => {
                  let newCourses = [...subject.courses];
                  newCourses[index] = newCourse;
                  subject.courses = newCourses;
                  setSubject(subject);
                }}
                setLoading={setLoading}
                deleteCourse={() => deleteCourse(index)}
              />
              </div>
            ))}
          </div>
        )}
      </div>
      {selected && <SubjectEditor subject={subject} setSubject={setSubject} setLoading={setLoading} />}
    </>
  );
}
