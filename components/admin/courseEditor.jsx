import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../utils/toast";

export default function CourseEditor({ course, setCourse, setLoading }) {
  const [courseName, setCourseName] = useState(course.courseName);

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
        .put("/api/admin/course/update-name", { courseId: course._id, courseName }, config)
        .then((response) => {
          if (response.data && response.data.course) {
            setCourse(response.data.course);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error.message)
          showToastError(error.message)
          setLoading(false);
        });

    } catch (error) {
      showToastError(error.message);
      return;
    }
  }

  const onAddUnit = () => {
    try {
      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true)

      const unitNumber = course.units.length + 1
      axios
        .post("/api/admin/unit/create", { courseId: course._id, unitNumber }, config)
        .then((response) => {
          if (response.data && response.data.course) {
            const newCourse = response.data.course
            setCourse(newCourse);
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
    <div className="fixed h-full w-3/5 right-0 top-0 p-10 flex flex-col space-y-7 bg-teal-300/50">
      <ToastContainer />
      <label className="text-2xl font-black">Course Details</label>
      <label className="text-xl font-bold">Course Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={course.courseName}
        value={courseName}
        onChange={(e) => {
          setCourseName(e.target.value);
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
        onClick={onAddUnit}
      >
        Add Unit
      </button>
    </div>
  );
}
