import React, { useState} from "react";
import Course from "./course";
import { showToastError } from "../../utils/toast";
import axios from "axios";
import {BiSolidDownArrow} from "react-icons/bi"

export default function Subject({ subject, setSubject, setLoading, setSidePanelProperties, selected, setSelected}) {
  const [isOpen, setIsOpen] = useState(false);

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
            `w-full h-12 flex items-center justify-between pl-4 py-1 rounded-lg transition-all duration-150 mb-2
             text-black ${(selected === subject._id) ? "bg-sky-700 hover:bg-sky-700" : "bg-slate-800 hover:bg-slate-800"}`
          }
          onClick={() => {
            setSelected(subject._id);
            setSidePanelProperties({type:"subject", details:subject})
          }}
        >
          {subject.subjectName ? (
            <p className={`${!(selected === subject._id) ? "text-white" : "text-sky-300"} font-bold`}>
              {subject.subjectName}
            </p>
          ) : (
            <p className="text-white font-bold">
              New Subject
              {subject.subjectName}
            </p>
          )}
          {subject.courses.length > 0 && <button className={`text-xl z-[300] p-1 pl-20 pr-4 ${!(selected === subject._id) ? "text-white" : "text-sky-300"}`}
          onClick={(e) => {
            setIsOpen(!isOpen)
          }}>
            <BiSolidDownArrow className={`${!isOpen ? "rotate-90" : "rotate-0"} 
            transition-all duration-150`}/>
          </button>}
        </button>
        <div className={`${isOpen ? "scale-y-100 h-auto" : "scale-y-0 h-0"} origin-top transition-all duration-150 w-full`}>
          <div className={`w-full flex flex-col pl-5 items-start justify-start`}>
            {subject.courses.map((course, index) => (
              <div className="flex flex-row w-full gap-2">
              <span className="font-bold text-2xl">L</span>
              <Course
                key={index}
                setSidePanelProperties={setSidePanelProperties}
                selected = {selected}
                setSelected = {setSelected}
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
        </div>
      </div>
    </>
  );
}
