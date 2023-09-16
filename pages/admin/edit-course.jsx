import React, { useState, useEffect } from "react";
import Course from "../../components/admin/course";

import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../utils/toast";
import axios from "axios";

export default function EditCourse({ user, setUser, loading, setLoading }) {
  const router = useRouter()

  useEffect(() => {
    if (loading) {
      return
    }
    if (!user || user.userType !== 4) {
      router.push('/')
    }
  }, [user, loading])

  const [initialLoad, setInitialLoad] = useState(true)
  const [courses, setCourses] = useState(undefined);

  useEffect(() => {
    if (!loading && courses === undefined) {
      setLoading(true)
    }
    else if (loading && courses && initialLoad) {
      setInitialLoad(false)
      setLoading(false)
    }
  }, [courses, loading, initialLoad])

  useEffect(() => {
    setLoading(true)
    axios
      .get("/api/course")
      .then((response) => {
        if (response.data && response.data.courses) {
          const responseCourses = []
          for (let i in response.data.courses) {
            responseCourses.push({
              ...response.data.courses[i],
              id: i,
            })
          }
          setCourses(responseCourses)
        }
      })
      .catch((error) => {
        showToastError(error.message)
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
          showToastError(error.message)
          setLoading(false);
        });

    } catch (error) {
      showToastError(error.message);
      return;
    }
  }

  const onLogOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
    }
    setUser(null);
  }


  return (
    <div className='w-screen h-screen bg-bg-light flex'>
      <div className="w-2/5 h-screen bg-slate-100 overflow-y-scroll">
        <button
          className="w-full h-12 bg-red-300 font-black hover:bg-red-200 border-b-4 border-b-red-800 text-red-800 mb-5"
          onClick={onLogOut}
        >
          Log Out
        </button>
        <button
          className="w-full h-12 bg-green-300 font-black hover:bg-green-200 border-y-4 border-y-green-800 text-green-800"
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
