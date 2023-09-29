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
          console.log(responseSubjects)
          setSubjects(responseSubjects)
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
      <div className="w-2/5 h-screen bg-slate-100 overflow-y-scroll">
        <button
          className="w-full h-12 bg-red-300 font-black hover:bg-red-200 border-b-4 border-b-red-800 text-red-800 mb-5"
          onClick={onLogOut}
        >
          Log Out
        </button>
        <button
          className="w-full h-12 bg-green-300 font-black hover:bg-green-200 border-y-4 border-y-green-800 text-green-800"
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
