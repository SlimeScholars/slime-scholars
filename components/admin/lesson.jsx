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
    if (x < width * 0.4) {
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
      <div
        className={
          "w-full flex flex-col " + (isOpen ? "max-h-max" : "max-h-12")
        }
        ref={clickRef}
      >
        <button
          className={
            "w-full h-12 flex items-center justify-between px-4 py-1 hover:bg-red-400/50 " +
            (selected ? "bg-red-400/50" : "bg-red-600/50")
          }
          onClick={() => {
            if (!selected && !isOpen) {
              setIsOpen(true);
              setSelected(true);
            }
          }}
        >
          {
            lesson.lessonName ? (
              <p className="text-white">
                {lesson.lessonNumber}. {lesson.lessonName}
              </p>
            ) : (
              <p className="text-gray">
                {lesson.lessonNumber}. New Lesson
              </p>
            )
          }
        </button>
      </div>
      {isOpen && (
          <div className="w-full flex flex-col pl-10 items-start justify-start">
            {lesson.activities.map((activity, index) => (
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
            ))}
          </div>
        )}
      {selected && <LessonEditor
        lesson={lesson}
        setLesson={setLesson}
        setLoading={setLoading}
        deleteLesson={deleteLesson}
      />}
    </>
  );
}

