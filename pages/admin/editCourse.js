import React, { useState } from "react";
import Course from "../../components/admin/course";

export default function editCourse() {
  const [courses, setCourses] = useState([]);

  return (
    <div className="w-screen h-screen bg-bg-light flex">
      <div className="w-2/5 h-full flex flex-col items-start justify-start bg-gray-300">
        <button
          className="w-full h-10 bg-green-300 font-bold hover:bg-green-200 border-b-4 border-b-black"
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
