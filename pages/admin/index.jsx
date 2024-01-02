import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { subjectService } from "../../services";

import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../utils/toast";
import axios from "axios";
import Subject from "../../components/admin/above/subject";
import SidePanel from "../../components/admin/above/sidePanel";
import useLogout from "../../hooks/useLogout";
import cookies from "../../services/cookies/cookies";

export default function AdminHomepage({ user, setUser, loading, setLoading }) {
  const router = useRouter()

  const [initialLoad, setInitialLoad] = useState(true)
  const [sidePanelProperties, setSidePanelProperties] = useState({ type: "blank", details: null })
  const [selected, setSelected] = useState(null);
  const [subjects, setSubjects] = useState(undefined);

  useEffect(() => {
    if (!loading && subjects === undefined) {
      setLoading(true)
    }
    else if (loading && subjects && initialLoad) {
      setInitialLoad(false)
      setTimeout(() => { setLoading(false) }, 150)
    }
  }, [subjects, loading, initialLoad])

  const refetch = () => {
    setLoading(true)

    const config = {
      headers: {
      },
    }

    axios
      .get("/api/subject", config)
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
          setTimeout(() => { setLoading(false) }, 150)
        }
      })
      .catch((error) => {
        showToastError(error.message)
        setTimeout(() => { setLoading(false) }, 150);
      });
  }

  useEffect(() => {
    refetch()
  }, [])

  const onAddSubject = () => {
    try {
      const token = cookies.get("slime-scholars-webapp-token")

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
            setTimeout(() => { setLoading(false) }, 150);
          }
        })
        .catch((error) => {
          showToastError(error.message)
          setTimeout(() => { setLoading(false) }, 150);
        });

    } catch (error) {
      showToastError(error.message);
      return;
    }
  }

  const { logout } = useLogout()

  const onLogOut = () => {
    logout()
    setUser(null);
    //router.push('/login')
  }

  return (
    <div className='w-screen h-screen bg-bg-light flex flex-row'>
      <div className="w-[50%] h-screen bg-slate-100 overflow-y-scroll pl-10 pt-10 pb-[10rem] pr-[4rem]">
        <div className="grid grid-cols-3 gap-4">
          <button
            className="w-full h-12 bg-teal-100 font-black hover:bg-teal-50 border-2 border-teal-300 
            hover:border-teal-200 text-teal-800 mb-4 transition-all duration-150 rounded-lg"
            onClick={refetch}
          >
            Refresh
          </button>
          <button
            className="w-full h-12 bg-indigo-100 font-black hover:bg-indigo-50 border-2 border-indigo-300 
            hover:border-indigo-200 text-indigo--800 mb-4 transition-all duration-150 rounded-lg"
            onClick={() => { router.push('/') }}
          >
            Home
          </button>
          <button
            className="w-full h-12 bg-red-100 font-black hover:bg-red-50 border-2 border-red-300 
            hover:border-red-200 text-red-800 mb-4 transition-all duration-150 rounded-lg"
            onClick={onLogOut}
          >
            Log Out
          </button>

        </div>
        {subjects === undefined ? <></> : subjects.map((subject, index) => (
          <Subject
            key={index}
            setSidePanelProperties={setSidePanelProperties}
            selected={selected}
            setSelected={setSelected}
            subject={subject}
            setSubject={(newSubject) => {
              let newSubjects = [...subjects];
              newSubjects[index] = newSubject;
              setSubjects(newSubjects);
            }}
            setLoading={setLoading}
          />
        ))}
        <button
          className="w-full h-12 bg-teal-500 font-semibold hover:bg-teal-400
           text-white transition-all duration-150 rounded-lg text-xl mt-4"
          onClick={async () => {
            setLoading(true)
            await subjectService.post()

          }}
        >
          + New Subject
        </button>
      </div>
      <div className="h-full w-[50%] bg-sky-200">
      </div>
      <SidePanel
        {...sidePanelProperties}
        setSidePanelProperties={setSidePanelProperties}
        setLoading={setLoading}
        refreshPanel={refetch} />
    </div>
  );
}
