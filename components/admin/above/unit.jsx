import React, { useState, useRef } from "react";
import Lesson from "./lesson";
import axios from "axios";
import cookies from "../../../services/cookies/cookies";

import { BiSolidDownArrow } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { showToastError } from "../../../utils/toast";
import { unitService } from "../../../services";
export default function Unit({ unit, setUnit, setLoading, deleteUnit, setSidePanelProperties, selected, setSelected, handleUnitSwap }) {
  const [isOpen, setIsOpen] = useState(false);

  const deleteLesson = (index) => {
    try {
      if (!unit?.lessons[index]?._id) {
        throw new Error('Lesson not found')
      }

      const newLessons = [...unit.lessons]
      const tempLesson = newLessons.splice(index, 1)[0]

      setUnit({ ...unit, lessons: newLessons })

      const token = cookies.get("slime-scholars-webapp-token")

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

  const handleLessonSwap = async(lessonIndex, swapIndex) => {
    console.log(lessonIndex, swapIndex);
    const swap = (arr, index1, index2) => {
        let clone = [...arr]
        let output = [...arr]
        output[index1] = {...clone[index2]}
        console.log(output[index1].lessonIndex);
        console.log(clone[index1].lessonIndex);
        output[index1].lessonIndex = clone[index1].lessonIndex
        output[index1].lessonNumber = clone[index1].lessonNumber
        output[index2] = {...clone[index1]}
        output[index2].lessonIndex = clone[index2].lessonIndex
        output[index2].lessonNumber = clone[index2].lessonNumber
        return output
    }

    setLoading(true)
    try{
      console.log(unit.lessons)
      const newLessonsArray = swap(unit.lessons, lessonIndex, swapIndex);
      console.log(newLessonsArray);
      await unitService.update(unit._id, newLessonsArray, unit.lessons[lessonIndex]._id, unit.lessons[swapIndex]._id, unit.lessons[lessonIndex].lessonNumber, unit.lessons[swapIndex].lessonNumber);
      setUnit({...unit, lessons: newLessonsArray,});
      setTimeout(() => {
        setLoading(false);
      }, 150);
    }
    catch(err){
        console.log(err)
        setTimeout(() => {setLoading(false)}, 150) 
    }
  }

  return (
    <>
      <div className="w-full flex flex-col justify-start items-start overflow-hidden">
        <button
          disabled={unit.unitNumber === 1}
          className={`${unit.unitNumber === 1 ? "text-neutral-500 cursor-not-allowed" : "hover:text-neutral-500"}`}
          onClick={() => {
            handleUnitSwap(unit.unitNumber - 1, unit.unitNumber - 2)
          }}>
          <IoIosArrowUp />
        </button>
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
                  handleLessonSwap={handleLessonSwap}
                />
              </div>
            ))}

          </div>
        </div>

      </div>
    </>
  );
}
