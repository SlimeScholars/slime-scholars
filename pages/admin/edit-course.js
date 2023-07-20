import React, { useState, useEffect } from "react";
import Course from "../../components/admin/course";

import { useRouter } from "next/router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../../utils/verify";
import axios from "axios";

export default function editCourse({user, setLoading}) {
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

  useEffect(() => {
    axios
      .get("/api/course")
      .then((response) => {
        if(response.data && response.data.courses) {
          const responseCourses = []
          for(let i in response.data.courses) {
            responseCourses.push({
              ...response.data.courses[i],
              id: i,
            })
          }
          setCourses(responseCourses)
        }
      })
      .catch((error) => {
        showToastMessage(error.message)
        setLoading(false);
      });

  }, [])

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
      axios
        .post("/api/admin/create-course", {}, config)
        .then((response) => {
          if (response.data && response.data.course) {
            const newCourse = response.data.course
            setCourses([
              ...courses,
              {
                ...newCourse,
                id: courses.length,
              },
            ]);
            setLoading(false);
          }
        })
        .catch((error) => {
          showToastMessage(error.message)
          setLoading(false);
        });
      
    } catch (error) {
      // TODO: figure out why toast message is not showing
      console.error(error)
      showToastMessage(error.message);
      return;
    }
  }

  return (
    <div className="w-screen h-screen bg-bg-light flex">
      <div className="w-2/5 h-screen bg-slate-100 overflow-y-scroll">
        <button
          className="w-full h-12 bg-green-300 font-black hover:bg-green-200 border-b-4 border-b-green-800 text-green-800"
          onClick={onAddCourse}
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
