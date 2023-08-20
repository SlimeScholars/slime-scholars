import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import axios from "axios";

import TextSection from "../../../../../../components/admin/lesson/sections/text";
import ImgSection from "../../../../../../components/admin/lesson/sections/img";
import MCSection from "../../../../../../components/admin/lesson/sections/mc";
import FBSection from "../../../../../../components/admin/lesson/sections/fb";
import { showToastError } from "../../../../../../utils/toast";

export default function Lesson() {
  const router = useRouter();
  const { courseId, unitId, lessonId } = router.query;
  const [lesson, setLesson] = useState({});
  const [loading, setLoading] = useState(true);

  const [sectionNumber, setSectionNumber] = useState(1);
  const [maxSectionNumber, setMaxSectionNumber] = useState(Number.MAX_SAFE_INTEGER)
  const [quizSectionNumber, setQuizSectionNumber] = useState(-1)
  const [maxQuizSectionNumber, setMaxQuizSectionNumber] = useState(Number.MAX_SAFE_INTEGER)

  const [courseName, setCourseName] = useState('')
  const [unitName, setUnitName] = useState('')

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (lessonId && token) {
      axios
        .get(
          "/api/lesson",
          {
            params: {
              lessonId,
              unitId,
              courseId,
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
            setLesson(res.data.lesson);
            setUnitName(res.data.unitName)
            setCourseName(res.data.courseName)
            let newMax = 0
            for (let i in res.data.lesson.sections) {
              if (res.data.lesson.sections[i].sectionNumber > newMax) {
                newMax = res.data.lesson.sections[i].sectionNumber
              }
            }
            setMaxSectionNumber(newMax)

            newMax = 0
            for (let i in res.data.lesson.quizSections) {
              if (res.data.lesson.quizSections[i].sectionNumber > newMax) {
                newMax = res.data.lesson.quizSections[i].sectionNumber
              }
            }
            setMaxQuizSectionNumber(newMax)
            setLoading(false);
          } else {
            throw new Error("Failed to fetch lesson");
          }
        })
        .catch((err) => {
          showToastError(err.response.data.message)
          console.log(err);
        });
    }
  }, [lessonId])

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth' // Use 'auto' for instant scrolling
    });
  }

  const [delayedIncrement, setDelayedIncrement] = useState(false)

  const clickIncrement = () => {
    if (sectionNumber === maxSectionNumber + 1) {
      if (quizSectionNumber === maxQuizSectionNumber + 1) {
        return
      }
      if (delayedIncrement) {
        setDelayedIncrement(false)
      }
      else {
        const quizSections = lesson.quizSections
        for (let i in quizSections) {
          if (
            quizSections[i].sectionNumber === quizSectionNumber &&
            (quizSections[i].sectionType === 2 || quizSections[i].sectionType === 3)
          ) {
            return
          }
        }
      }
      setQuizSectionNumber(quizSectionNumber + 1)
    }

    else {
      if (delayedIncrement) {
        setDelayedIncrement(false)
      }
      else {
        const sections = lesson.sections
        for (let i in sections) {
          if (
            sections[i].sectionNumber === sectionNumber &&
            (sections[i].sectionType === 2 || sections[i].sectionType === 3)
          ) {
            return
          }
        }
      }
      if (sectionNumber === maxSectionNumber) {
        setQuizSectionNumber(0)
      }
      setSectionNumber(sectionNumber + 1)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [sectionNumber, quizSectionNumber])

  const questionIncrement = (questionSectionNumber) => {
    if (questionSectionNumber === sectionNumber) {
      setDelayedIncrement(true)
    }
  }

  const quizQuestionIncrement = (questionSectionNumber) => {
    if (questionSectionNumber === quizSectionNumber) {
      setDelayedIncrement(true)
    }
  }

  const [quizScore, setQuizScore] = useState(0)

  const addScore = (points) => {
    setQuizScore(quizScore + points)
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center bg-red-50"
      onClick={clickIncrement}
    >
      <Head></Head>
      <div className="flex flex-col items-center justify-start lg:w-1/3 min-h-screen bg-purple-50">
        <header className="w-full h-36 text-pink-400 flex items-center justify-start flex-col font-galindo">
          <div className="w-full h-12 flex items-center justify-between px-6 py-3 bg-pink-200">
            <p className="text-xl">{courseName}</p>
            <p className="text-xl">{unitName}</p>
          </div>
          <h1 className="text-3xl mt-3 mb-1">
            {lesson ? lesson.lessonName : "Loading..."}
          </h1>
          <div className="w-full h-[1px] bg-pink-200 mt-3" />
        </header>
        <div className="w-full h-full flex flex-col justify-start items-start bg-purple-50 pb-[20vh]">
          {lesson.sections.map((section, index) => {
            // 0 is text, 1 is img, 2 is mc, 3 is fill in the blank
            switch (section.sectionType) {
              case 0:
                return (
                  <TextSection
                    key={index}
                    text={section.text}
                    section={section}
                    active={true}
                    sectionNumber={sectionNumber}
                  />
                );
              case 1:
                return (
                  <ImgSection
                    key={index}
                    image={section.image}
                    section={section}
                    active={true}
                    sectionNumber={sectionNumber}
                  />
                );
              case 2:
                return (
                  <MCSection
                    key={index}
                    options={section.options}
                    section={section}
                    active={true}
                    sectionNumber={sectionNumber}
                    increment={questionIncrement}
                  />
                );
              case 3:
                return (
                  <FBSection
                    key={index}
                    text={section.text}
                    afterBlank={section.afterBlank}
                    section={section}
                    active={true}
                    sectionNumber={sectionNumber}
                    increment={questionIncrement}
                  />
                );
              default:
                return <div key={`lessonSection-${index}`} />;
            }
          })}

          {
            quizSectionNumber !== -1 ?
              <div className="w-full text-pink-400 flex items-center justify-start flex-col font-galindo mt-10">
                <div className="w-full h-[1px] bg-pink-200 mb-3" />
                <h1 className="text-3xl mt-3 mb-1">
                  Quiz
                </h1>
                <div className="w-full h-[1px] bg-pink-200 mt-3" />
              </div> : <></>
          }
          {lesson.quizSections.map((quizSection, index) => {
            // 0 is text, 1 is img, 2 is mc, 3 is fill in the blank
            switch (quizSection.sectionType) {
              case 0:
                return (
                  <TextSection
                    key={index}
                    text={quizSection.text}
                    section={quizSection}
                    active={true}
                    sectionNumber={quizSectionNumber}
                  />
                );
              case 1:
                return (
                  <ImgSection
                    key={index}
                    image={quizSection.image}
                    section={quizSection}
                    active={true}
                    sectionNumber={quizSectionNumber}
                  />
                );
              case 2:
                return (
                  <MCSection
                    key={index}
                    options={quizSection.options}
                    section={quizSection}
                    active={true}
                    sectionNumber={quizSectionNumber}
                    increment={quizQuestionIncrement}
                    isQuiz={true}
                    addScore={addScore}
                  />
                );
              case 3:
                return (
                  <FBSection
                    key={index}
                    text={quizSection.text}
                    afterBlank={quizSection.afterBlank}
                    section={quizSection}
                    active={true}
                    sectionNumber={quizSectionNumber}
                    increment={quizQuestionIncrement}
                    isQuiz={true}
                    addScore={addScore}
                  />
                );
              default:
                return <div key={`quizSection-${index}`} />;
            }
          })}

          {
            quizSectionNumber === maxQuizSectionNumber + 1 ?
              <div className="w-full flex justify-center mt-5 font-bold">
                <button
                  className="w-48 ring-2 rounded-lg py-2 px-4 font-averia bg-pink-100 text-pink-400 ring-pink-400"
                  onClick={() => console.log(quizScore)}
                >
                  Complete Lesson
                </button>
              </div> : <></>
          }
        </div>
      </div>
    </div>
  );
}
