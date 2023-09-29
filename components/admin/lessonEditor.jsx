import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../utils/toast";

export default function LessonEditor({ lesson, setLesson, setLoading, deleteLesson }) {
  const [lessonName, setLessonName] = useState(lesson.lessonName);
  // console.log(lesson)
  const onSave = () => {
    try {
      const token = localStorage.getItem("jwt");
      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true);

      axios
        .put(
          "/api/admin/lesson/update-name",
          { lessonId: lesson._id, lessonName },
          config
        )
        .then((response) => {
          if (response.data && response.data.lesson) {
            setLesson(response.data.lesson);
            setLoading(false);
          }
        })
        .catch((error) => {
          showToastError(error.message);
          setLoading(false);
        });
    } catch (error) {
      showToastError(error.message);
      return;
    }
  };

  const onAddActivity = () => {
    try {
      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true)

      const activityNumber = lesson.activities.length + 1

      axios
        .post("/api/admin/activity/create", { lessonId: lesson._id, activityNumber }, config)
        .then((response) => {
          if (response.data && response.data.lesson) {
            const newLesson = response.data.lesson
            setLesson(newLesson);
            setLoading(false);
          }
        })
        .catch((error) => {
          showToastError(error.message)
          setLoading(false);
        });

    } catch (error) {
      showToastError(error.message);
      return;
    }
  }

  return (
    <div className="fixed h-full w-[50%] right-0 top-0 p-10 flex flex-col space-y-7 bg-teal-300/50">
      <ToastContainer />
      <label className="text-2xl font-black">Lesson Details</label>
      <label className="text-xl font-bold">Lesson Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={lesson.lessonName}
        value={lessonName}
        onChange={(e) => {
          setLessonName(e.target.value);
        }}
      />
      <button
        className="w-full h-12 bg-purple-300 hover:bg-purple-200"
        onClick={onSave}
      >
        Save
      </button>
      <button
        className="w-full h-12 bg-pink-300 hover:bg-pink-200"
        onClick={onAddActivity}
      >
        Add Activity
      </button>
      <Link
        href={"/admin/edit-lesson/" + lesson._id}
        className="w-full h-12 bg-yellow-300 hover:bg-yellow-200 flex items-center justify-center"
        target="_blank"
      >
        Edit Lesson
      </Link>
      <button
        className="w-full h-12 bg-red-300 hover:bg-red-200"
        onClick={deleteLesson}
      >
        Delete
      </button>
    </div>
  );
}
