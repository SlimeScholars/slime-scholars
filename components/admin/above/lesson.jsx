import React, { useState } from "react";
import Activity from "./activity"; 
import { BiSolidDownArrow } from "react-icons/bi";

export default function Lesson({ lesson, setLesson, setLoading, setSidePanelProperties, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col justify-start items-start overflow-hidden">
        <button
          className={
            `w-full h-12 flex items-center justify-between pl-4 py-1 rounded-lg transition-all duration-150 mb-2
             text-black ${(selected === lesson._id) ? "bg-sky-700 hover:bg-sky-700" : "bg-slate-500 hover:bg-slate-500"}`
          }
          onClick={() => {
            setSelected(lesson._id);
            setSidePanelProperties({type:"lesson", details:lesson})
          }}

        >
        <p className={`${!(selected === lesson._id) ? "text-white" : "text-sky-300"} font-bold`}>
          {lesson.lessonType !== "test" ? 
          <>
          {lesson.lessonNumber}.{" "}
          {lesson.lessonType === "quiz" && <span className="text-cyan-400 font-black">(QUIZ){"  "}</span>}
          {lesson.lessonName ? lesson.lessonName : "New Lesson"}
          </> :  
          <>
          <span className="text-cyan-100 font-black text-lg text-center">Unit Test:{"  "}</span>
          {lesson.lessonName ? lesson.lessonName : ""}
          </>}
        </p>
          {lesson.activities.length > 0 && lesson.lessonType === "lesson" && 
          <button className={`text-xl z-[300] p-1 pl-20 pr-4 ${!(selected === lesson._id) ? "text-white" : "text-sky-300"}`}
          onClick={(e) => {
            setIsOpen(!isOpen)
          }}>
            <BiSolidDownArrow className={`${!isOpen ? "rotate-90" : "rotate-0"} 
            transition-all duration-150`}/>
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
                selected = {selected}
                setSelected = {setSelected}
                activity={activity}
              />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

