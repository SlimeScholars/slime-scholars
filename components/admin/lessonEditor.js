import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export default function LessonEditor({ lesson, setLesson, setLoading }) {
  const [lessonName, setLessonName] = useState(lesson.lessonName);

  const onSave = () => {
    try {
      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true)

      axios
        .put("/api/admin/update-lesson", {lessonId: lesson._id, lessonName}, config)
        .then((response) => {
          if (response.data && response.data.lesson) {
            setLesson(response.data.lesson);
            setLoading(false);
          }
        })
        .catch((error) => {
          showToastMessage(error.message)
          setLoading(false);
        });
      
    } catch (error) {
      showToastMessage(error.message);
      return;
    }
  }

  return (
    <div className="fixed h-full w-3/5 right-0 top-0 p-10 flex flex-col space-y-7 bg-teal-300/50">
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
        className="w-full h-12 bg-yellow-300 hover:bg-yellow-200"
      >
        <Link
          href={{
            pathname: "/admin/edit-lesson/",
            query: {lessonId: lesson._id}
          }}
          target="_blank"
        >
          Edit Lesson
        </Link>
      </button>
    </div>
  );
}

