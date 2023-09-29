import React, { useState, useEffect } from "react";
import Course from "../../components/admin/course";

import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../utils/toast";
import axios from "axios";
import Subject from "../../components/admin/subject";

export default function EditSubject({ user, setUser, loading, setLoading }) {
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
  const [subjects, setSubjects] = useState(undefined);

  useEffect(() => {
    if (!loading && subjects === undefined) {
      setLoading(true)
    }
    else if (loading && subjects && initialLoad) {
      setInitialLoad(false)
      setLoading(false)
    }
  }, [subjects, loading, initialLoad])

  useEffect(() => {
    setLoading(true)
    axios
      .get("/api/subject")
      // change everything to subject
      .then((response) => {
        if (response.data && response.data.subjects) {
          const responseSubjects = []
          for (let i in response.data.subjects) {
            responseSubjects.push({
              ...response.data.subjects[i],
              id: i,
            })
          }
          //console.log(responseSubjects)
          setSubjects(responseSubjects)
          setLoading(false)
        }
      })
      .catch((error) => {
        showToastError(error.message)
        setLoading(false);
      });

  }, [])

  const onAddSubject = () => {
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
        .post("/api/admin/subject/create", {}, config)
        .then((response) => {
          if (response.data && response.data.subject) {
            const newSubject = response.data.subject
            setSubjects([
              ...subjects,
              {
                ...newSubject,
                id: subjects.length,
              },
            ]);
            setLoading(false);
            console.log(loading)
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
      <div className="w-[50%] h-screen bg-slate-100 overflow-y-scroll pl-10 pt-10 pb-[10rem] pr-[4rem]">
        <button
          className="w-full h-12 bg-red-200 font-black hover:bg-red-100 border-2 border-red-500 
          hover:border-red-300 text-red-500 mb-4 transition-all duration-150 rounded-lg"
          onClick={onLogOut}
        >
          Log Out
        </button>
        <button
          className="w-full h-12 bg-green-200 font-black hover:bg-green-100 border-2
           border-green-500 hover:border-green-300 mb-4 text-green-500 transition-all duration-150 rounded-lg"
          onClick={onAddSubject}
        >
          Add Subject
        </button>
        {subjects === undefined ? <></> : subjects.map((subject, index) => (
          <Subject
            key={index}
            subject={subject}
            setSubject={(newSubject) => {
              let newSubjects = [...subjects];
              newSubjects[index] = newSubject;
              setSubjects(newSubjects);
            }}
            setLoading={setLoading}
          />
        ))}
      </div>
    </div>
  );
}
