import React, { useState, useEffect } from "react";
import Course from "../../components/admin/course";

import { useRouter } from "next/router";

export default function editCourse({user}) {
  const router = useRouter()

  useEffect(() => {
    if(!user) {
      router.push('/')
    }
    if(user.userType !== 4) {
      router.push('/')
    }
  }, [user])

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
                name: "",
                author: user && user.firstName ? `${user.firstName} ${user.lastName}` : 'Loading...',
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
