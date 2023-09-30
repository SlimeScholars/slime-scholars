import React, { useState, useRef } from "react";
import CourseQuizEditor from "./courseQuizEditor";
import Lesson from "./lesson";
import axios from "axios";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { showToastError } from "../../utils/toast";
import { set } from "mongoose";

export default function CourseQuiz({ courseQuiz, setCourseQuiz, setLoading, }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const selectRef = useRef();
  useClickOutside(selectRef, () => {
    if (x < width * 0.5) {
      setSelected(false);
    }
  });

//   change to deleteCourseQuiz
//   const deleteLesson = (index) => {
//     try {
//       if (!unit?.lessons[index]?._id) {
//         throw new Error('Lesson not found')
//       }

//       const newLessons = [...unit.lessons]
//       const tempLesson = newLessons.splice(index, 1)[0]

//       setUnit({ ...unit, lessons: newLessons })

//       const token = localStorage.getItem('jwt')

//       // Set the authorization header
//       const config = {
//         params: {
//           lessonId: tempLesson._id,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       axios
//         .delete("/api/admin/lesson/delete", config)
//         .catch((error) => {
//           if (error?.response?.data?.message) {
//             showToastError(error.response.data.message)
//           }
//           else {
//             showToastError(error.message)
//           }
//           newLessons.splice(index, 0, tempLesson)
//           setUnit({ ...unit, lessons: newLessons })
//         });

//     } catch (error) {
//       showToastError(error.message);
//     }
//   }

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
          {
            courseQuiz.lessonName ? (
              <p className={`${!selected ? "text-white" : "text-sky-300"} font-bold`}>
                {courseQuiz.lessonNumber}. {courseQuiz.lessonName}
              </p>
            ) : (
              <p className="text-white">
                {courseQuiz.lessonNumber}. New Course Quiz
              </p>
            )
          }
        </button>
      </div>
      {selected && <CourseQuizEditor courseQuiz={courseQuiz} setCourseQuiz={setCourseQuiz} setLoading={setLoading} />}
    </>
  );
}
