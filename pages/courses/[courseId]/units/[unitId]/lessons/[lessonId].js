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

  const [delayedIncrement, setDelayedIncrement] = useState(false)

  const clickIncrement = () => {
    const sections = lesson.sections
    if (!delayedIncrement) {
      for (let i in sections) {
        if (
          sections[i].sectionNumber === sectionNumber &&
          (sections[i].sectionType === 2 || sections[i].sectionType === 3)
        ) {
          return
        }
      }
    }
    else {
      setDelayedIncrement(false)
    }
    setSectionNumber(sectionNumber + 1)
  }

  const questionIncrement = (questionSectionNumber) => {
    if (questionSectionNumber === sectionNumber) {
      setDelayedIncrement(true)
    }
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-screen h-screen flex items-center justify-center bg-red-50"
      onClick={clickIncrement}
    >
      <Head></Head>
      <div className="flex flex-col items-center justify-start lg:w-1/3 h-full bg-purple-50">
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
        <div className="w-full h-full flex flex-col justify-start items-start bg-purple-50">
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

          <div>Quiz</div>
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
                    quizSectionNumber={quizSectionNumber}
                  />
                );
              case 1:
                return (
                  <ImgSection
                    key={index}
                    image={quizSection.image}
                    section={quizSection}
                    active={true}
                    quizSectionNumber={quizSectionNumber}
                  />
                );
              case 2:
                return (
                  <MCSection
                    key={index}
                    options={quizSection.options}
                    section={quizSection}
                    active={true}
                    quizSectionNumber={quizSectionNumber}
                    setQuizSectionNumber={setQuizSectionNumber}
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
                    quizSectionNumber={quizSectionNumber}
                    setQuizSectionNumber={setQuizSectionNumber}
                  />
                );
              default:
                return <div key={`quizSection-${index}`} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
