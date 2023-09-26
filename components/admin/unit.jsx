import React, { useState, useRef } from "react";
import UnitEditor from "./unitEditor";
import Lesson from "./lesson";
import axios from "axios";

import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { showToastError } from "../../utils/toast";
import { set } from "mongoose";
import UnitQuiz from "./unitQuiz";

export default function Unit({ unit, setUnit, setLoading, }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const selectRef = useRef();
  useClickOutside(selectRef, () => {
    if (x < width * 0.4) {
      setSelected(false);
    }
  });

  const deleteLesson = (index) => {
    try {
      if (!unit?.lessons[index]?._id) {
        throw new Error('Lesson not found')
      }

      const newLessons = [...unit.lessons]
      const tempLesson = newLessons.splice(index, 1)[0]

      setUnit({ ...unit, lessons: newLessons })

      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        params: {
          lessonId: tempLesson._id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete("/api/admin/lesson/delete", config)
        .catch((error) => {
          if (error?.response?.data?.message) {
            showToastError(error.response.data.message)
          }
          else {
            showToastError(error.message)
          }
          newLessons.splice(index, 0, tempLesson)
          setUnit({ ...unit, lessons: newLessons })
        });

    } catch (error) {
      showToastError(error.message);
    }
  }

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
              <Lesson
                key={index}
                lesson={lesson}
                setLesson={(newLesson) => {
                  let newLessons = [...unit.lessons];
                  newLessons[index] = newLesson;
                  unit.lessons = newLessons;
                  setUnit(unit);
                }}
                deleteLesson={() => deleteLesson(index)}
                setLoading={setLoading}
              />
            ))}
            {unit.quizzes.map((unitQuiz, index) => (
              <UnitQuiz
                key={index}
                unitQuiz={unitQuiz}
                setUnitQuiz={(newUnitQuiz) => {
                  let newUnitQuizzes = [...unit.quizzes];
                  newUnitQuizzes[index] = newUnitQuiz;
                  unit.quizzes = newUnitQuizzes;
                  setUnit(unit);
                }}
                deleteUnitQuiz={() => deleteUnitQuiz(index)}
                setLoading={setLoading}
              />
            ))}
          </div>
        )}
      </div>
      {selected && <UnitEditor unit={unit} setUnit={setUnit} setLoading={setLoading} />}
    </>
  );
}
