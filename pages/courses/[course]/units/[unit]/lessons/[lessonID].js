import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import axios from "axios";

export default function Lesson() {
  const router = useRouter();
  const { course, unit, lessonID } = router.query;
  const [lesson, setLesson] = React.useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (lessonID && token) {
      console.log(lessonID, token);
      axios
        .get(
          "/api/lesson",
          {
            params: {
              lessonId: lessonID,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data.lesson);
            setLesson(res.data.lesson);
          } else {
            throw new Error("Failed to fetch lesson");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [lessonID]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-red-50">
      <Head></Head>
      <div className="flex flex-col items-center justify-start lg:w-1/3 h-full bg-purple-50">
        <header className="w-full h-36 text-pink-400 flex items-center justify-start flex-col font-galindo">
          <div className="w-full h-12 flex items-center justify-between px-6 py-3 bg-pink-200">
            <p className="text-xl">{course}</p>
            <p className="text-xl">{unit}</p>
          </div>
          <h1 className="text-3xl mt-3 mb-1">
            {lesson ? lesson.lessonName : "Loading..."}
          </h1>
          <div className="w-full h-[1px] bg-pink-200 mt-3" />
        </header>
      </div>
    </div>
  );
}
