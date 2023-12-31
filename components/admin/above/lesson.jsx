import React, { useState } from "react";
import Activity from "./activity";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { lessonService } from "../../../services";

export default function Lesson({ lesson, setLesson, setLoading, setSidePanelProperties, selected, setSelected, handleLessonSwap }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleActivitySwap = async (activityIndex, swapIndex) => {
    const swap = (arr, index1, index2) => {
      let clone = [...arr]
      let output = [...arr]
      output[index1] = { ...clone[index2] }
      output[index1].activityIndex = clone[index1].activityIndex
      output[index1].activityNumber = clone[index1].activityNumber
      output[index2] = { ...clone[index1] }
      output[index2].activityIndex = clone[index2].activityIndex
      output[index2].activityNumber = clone[index2].activityNumber
      return output
    }

    setLoading(true)
    try {
      const newActivitiesArray = swap(lesson.activities, activityIndex, swapIndex);
      await lessonService.update(lesson._id, newActivitiesArray, lesson.activities[activityIndex]._id, lesson.activities[swapIndex]._id, lesson.activities[activityIndex].activityNumber, lesson.activities[swapIndex].activityNumber);
      setLesson({ ...lesson, activities: newActivitiesArray, });
      setTimeout(() => {
        setLoading(false);
      }, 150);
    }
    catch (err) {
      setTimeout(() => { setLoading(false) }, 150)
    }
  }

  return (
    <>
      <div className="w-full flex flex-col justify-start items-start overflow-hidden">
        <button
          disabled={lesson.lessonNumber === 1}
          className={`${lesson.lessonNumber === 1 ? "text-neutral-500 cursor-not-allowed" : "hover:text-neutral-500"}`}
          onClick={() => {
            handleLessonSwap(lesson.lessonNumber - 1, lesson.lessonNumber - 2)
          }}>
          <IoIosArrowUp />
        </button>
        <button
          className={
            `w-full h-12 flex items-center justify-between pl-4 py-1 rounded-lg transition-all duration-150 mb-2
             text-black ${(selected === lesson._id) ? "bg-sky-700 hover:bg-sky-700" : "bg-slate-500 hover:bg-slate-500"}`
          }
          onClick={() => {
            setSelected(lesson._id);
            setSidePanelProperties({ type: "lesson", details: lesson })
          }}

        >
          <p className={`${!(selected === lesson._id) ? "text-white" : "text-sky-100"} font-bold`}>
            {lesson.lessonType !== "test" ?
              <>
                {lesson.lessonType === "quiz" && <span className="text-cyan-100 text-lg font-extrabold">Quiz: {"  "}</span>}
                {lesson.lessonName ? lesson.lessonName : "New Lesson"}
              </> :
              <>
                <span className="text-cyan-100 font-extrabold text-lg">Unit Test:{"  "}</span>
                {lesson.lessonName ? lesson.lessonName : ""}
              </>}
          </p>
          {lesson.activities.length > 0 && lesson.lessonType === "lesson" &&
            <button className={`text-xl z-[300] p-1 pl-20 pr-4 ${!(selected === lesson._id) ? "text-white" : "text-sky-300"}`}
              onClick={(e) => {
                setIsOpen(!isOpen)
              }}>
              <BiSolidDownArrow className={`${!isOpen ? "rotate-90" : "rotate-0"} 
            transition-all duration-150`} />
            </button>}
        </button>
        <div className={`${isOpen ? "scale-y-100 h-auto" : "scale-y-0 h-0"} origin-top transition-all duration-150 w-full`}>
          <div className="w-full flex flex-col pl-10 items-start justify-start">
            {lesson.activities.map((activity, index) => (
              <div className="flex flex-row w-full gap-2">
                <span className="font-bold text-2xl">L</span>
                <Activity
                  key={index}
                  setSidePanelProperties={setSidePanelProperties}
                  selected={selected}
                  setSelected={setSelected}
                  activity={activity}
                  handleActivitySwap={handleActivitySwap}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

