import React, { useState, useRef } from "react";
import LessonEditor from "./lessonEditor";
import axios from "axios"
import useMousePosition from "../../hooks/useMousePosition";
import useClickOutside from "../../hooks/useClickOutside";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Activity from "./activity"; 
import { showToastError } from "../../utils/toast";

export default function Lesson({ lesson, setLesson, setLoading, deleteLesson }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const { x, y } = useMousePosition();
  const { width, height } = useWindowDimensions();

  const clickRef = useRef();
  useClickOutside(clickRef, () => {
    if (x < width * 0.5) {
      setSelected(false);
    }
  });

  const deleteActivity = (index) => {
    try {
      if (!lesson?.activities[index]?._id) {
        throw new Error('Activity not found')
      }
      const newActivities = [...lesson.activities]
      const tempActivity = newActivities.splice(index, 1)[0]
      console.log(tempActivity._id)
      setLesson({ ...lesson, activities: newActivities })

      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        params: {
          activityId: tempActivity._id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete("/api/admin/activity/delete", config)
        .catch((error) => {
          if (error?.response?.data?.message) {
            showToastError(error.response.data.message)
          }
          else {
            showToastError(error.message)
          }
          newActivities.splice(index, 0, tempActivity)
          setLesson({ ...lesson, activities: newActivities })
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
            if (!selected && !isOpen) {
              setIsOpen(true);
              setSelected(true);
            }
          }}
          ref={clickRef}
        >
          {
            lesson.lessonName ? (
              <p className={`${!selected ? "text-white" : "text-sky-300"} font-bold`}>
                {lesson.lessonNumber}. {lesson.lessonName}
              </p>
            ) : (
              <p className="text-white">
                {lesson.lessonNumber}. New Lesson
              </p>
            )
          }
        </button>
        {isOpen && (
          <div className="w-full flex flex-col pl-10 items-start justify-start">
            {lesson.activities.map((activity, index) => (
              <div className="flex flex-row w-full gap-2">
              <span className="font-bold text-2xl">L</span>
              <Activity
                key={index}
                activity={activity}
                setActivity={(newActivity) => {
                  let newActivities = [...lesson.activities];
                  newActivities[index] = newActivity;
                  lesson.activities = newActivities;
                  setLesson(lesson);
                }}
                deleteActivity={() => deleteActivity(index)}
                setLoading={setLoading}
              />
              </div>
            ))}
          </div>
        )}
      </div>
      {selected && <LessonEditor
        lesson={lesson}
        setLesson={setLesson}
        setLoading={setLoading}
        deleteLesson={deleteLesson}
      />}
    </>
  );
}

