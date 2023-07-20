import React, { useState } from "react";
import axios from "axios";

export default function CourseEditor({ newCourse, courseId, setCourse, setLoading }) {
  const [courseName, setCourseName] = useState(newCourse.courseName);

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
        .put("/api/admin/update-course", {courseId, courseName}, config)
        .then((response) => {
          if (response.data && response.data.course) {
            setCourse(response.data.course);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error.message)
          // showToastMessage(error.message)
          setLoading(false);
        });
      
    } catch (error) {
      // TODO: figure out why toast message is not showing
      console.error(error)
      // showToastMessage(error.message);
      return;
    }
  }


  return (
    <div className="fixed h-full w-3/5 right-0 top-0 p-10 flex flex-col space-y-7 bg-teal-300/50">
      <label className="text-2xl font-black">Course Details</label>
      <label className="text-xl font-bold">Course Name</label>
      <input
        className="w-full h-12 p-2 ring-1 ring-black"
        placeholder={newCourse.courseName}
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
        onClick={() => {
          newCourse.units.push({
            name: "New Unit",
            number: newCourse.units.length + 1,
            lessons: [],
          });
          setCourse(newCourse);
        }}
      >
        Add Unit
      </button>
    </div>
  );
}
