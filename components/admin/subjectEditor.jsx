import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../utils/toast";

export default function SubjectEditor({ subject, setSubject, setLoading }) {
  const [subjectName, setSubjectName] = useState(subject.subjectName);

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
        .put("/api/admin/subject/update-name", { subjectId: subject._id, subjectName }, config)
        .then((response) => {
            console.log(response.data)
          if (response.data && response.data.subject) {
            setSubject(response.data.subject);
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

  const onAddCourse = () => {
    try {
      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setLoading(true)

      const courseNumber = subject.courses.length + 1
      axios
        .post("/api/admin/course/create", { subjectId: subject._id, courseNumber }, config)
        .then((response) => {
          if (response.data && response.data.subject) {
            const newSubject = response.data.subject
            setSubject(newSubject);
            setLoading(false);
            // something is wrong with this loading requires hard refresh
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
      <label className="text-2xl font-black">Subject Details</label>
      <label className="text-xl font-bold">Subject Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={subject.subjectName}
        value={subjectName}
        onChange={(e) => {
          setSubjectName(e.target.value);
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
        onClick={onAddCourse}
      >
        Add Course
      </button>
    </div>
  );
}
