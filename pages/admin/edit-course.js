import React, { useState, useEffect } from "react";
import Course from "../../components/admin/course";

import { useRouter } from "next/router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../../utils/verify";
import axios from "axios";

export default function editCourse({user, loading, setLoading}) {
  const router = useRouter()

  useEffect(() => {
    if(loading) {
      return
    }
    if(!user || user.userType !== 4) {
      router.push('/')
    }
  }, [user,loading])

  const [courses, setCourses] = useState(undefined);

  useEffect(() => {
    if(!loading && courses === undefined) {
      setLoading(true)
    }
    else if(loading && courses) {
      setLoading(false)
    }
  }, [courses, loading])

  useEffect(() => {
    setLoading(true)
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
        .post("/api/admin/course/create", {}, config)
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
      showToastMessage(error.message);
      return;
    }
  }

  return (
    <div className='w-screen h-screen bg-bg-light flex'>
      <ToastContainer />
      <div className="w-2/5 h-screen bg-slate-100 overflow-y-scroll">
        <button
          className="w-full h-12 bg-green-300 font-black hover:bg-green-200 border-b-4 border-b-green-800 text-green-800"
          onClick={onAddCourse}
        >
          Add Course
        </button>
        {courses === undefined ? <></> : courses.map((course, index) => (
          <Course
            key={index}
            course={course}
            setCourse={(newCourse) => {
              let newCourses = [...courses];
              newCourses[index] = newCourse;
              setCourses(newCourses);
            }}
            setLoading={setLoading}
          />
        ))}
      </div>
    </div>
  );
}
