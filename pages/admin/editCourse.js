import React, { useState } from "react";
import Course from "../../components/admin/course";

export default function editCourse() {
  const [courses, setCourses] = useState([]);

  return (
    <div className="w-screen h-screen bg-bg-light flex">
      <div className="w-2/5 h-screen bg-slate-100 overflow-y-scroll">
        <button
          className="w-full h-12 bg-green-300 font-black hover:bg-green-200 border-b-4 border-b-green-800 text-green-800"
          onClick={() => {
            setCourses([
              ...courses,
              {
                name: "New Course",
                code: "Unknown Code",
                author: "<current username>",
                units: [],
                id: courses.length,
              },
            ]);
          }}
        >
          Add Course
        </button>
        {courses.map((course, index) => (
          <Course
            key={index}
            course={course}
            setCourse={(newCourse) => {
              let newCourses = [...courses];
              newCourses[index] = newCourse;
              setCourses(newCourses);
            }}
          />
        ))}
      </div>
    </div>
  );
}
