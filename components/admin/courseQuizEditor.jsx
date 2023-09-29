import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../utils/toast";

export default function CourseQuizEditor({ courseQuiz, setCourseQuiz, setLoading }) {
  const [courseQuizName, setCourseQuizName] = useState(courseQuiz.quizName);

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
        .put("/api/admin/course-quiz/update-name", { courseQuizId: courseQuiz._id, courseQuizName }, config)
        .then((response) => {
        //   if (response.data && response.data.unit) {
        //     setUnit(response.data.unit);
        //     setLoading(false);
        //   }
            console.log(response.data)
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
      <label className="text-2xl font-black">Course Quiz Details</label>
      <label className="text-xl font-bold">Course Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={courseQuiz.quizName}
        value={courseQuizName}
        onChange={(e) => {
          setUnitName(e.target.value);
        }}
      />
      <button
        className="w-full h-12 bg-purple-300 hover:bg-purple-200"
        onClick={onSave}
      >
        Save
      </button>
      <Link
        href={"/admin/edit-course-quiz/" + courseQuiz._id}
        target="_blank"
      >
        <button
          className="w-full h-12 bg-yellow-300 hover:bg-yellow-200"
        >
          Edit Course Quiz
        </button>
      </Link>
    </div>
  );
}
