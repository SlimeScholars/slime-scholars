import React, { useState, useRef } from "react";
import Lesson from "./lesson";
import axios from "axios";

import { BiSolidDownArrow } from "react-icons/bi";
import { showToastError } from "../../../utils/toast";

export default function Unit({ unit, setUnit, setLoading, deleteUnit, setSidePanelProperties, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);

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
          apiKey: process.env.API_KEY,
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
      <div className="w-full flex flex-col justify-start items-start overflow-hidden">
        <button
          className={
            `w-full h-12 flex items-center justify-between pl-4 py-1 rounded-lg transition-all duration-150 mb-2
             text-black ${(selected === unit._id) ? "bg-sky-700 hover:bg-sky-700" : "bg-slate-600 hover:bg-slate-600"}`
          }
          onClick={() => {
            setSelected(unit._id);
            setSidePanelProperties({ type: "unit", details: unit })
          }}
        >
          {
            unit.unitName ? (
              <p className={`${!(selected === unit._id) ? "text-white" : "text-sky-300"} font-bold`}>
                {unit.unitNumber}. {unit.unitName}
              </p>
            ) : (
              <p className="text-white">
                {unit.unitNumber}. New Unit
              </p>
            )
          }
          {unit.lessons.length > 0 && <button className={`text-xl z-[300] p-1 pl-20 pr-4 ${!(selected === unit._id) ? "text-white" : "text-sky-300"}`}
            onClick={(e) => {
              setIsOpen(!isOpen)
            }}>
            <BiSolidDownArrow className={`${!isOpen ? "rotate-90" : "rotate-0"} 
            transition-all duration-150`} />
          </button>}
        </button>
        <div className={`${isOpen ? "scale-y-100 h-auto" : "scale-y-0 h-0"} origin-top transition-all duration-150 w-full`}>
          <div className="w-full flex flex-col pl-10 items-start justify-start">
            {unit.lessons.map((lesson, index) => (
              <div className="flex flex-row w-full gap-2">
                <span className="font-bold text-2xl">L</span>
                <Lesson
                  key={index}
                  setSidePanelProperties={setSidePanelProperties}
                  selected={selected}
                  setSelected={setSelected}
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
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
}
