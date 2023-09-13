import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Stars from "../../../../../../components/learn/stars";
import { HiHome } from 'react-icons/hi'
import { TbReload } from 'react-icons/tb'
import { FaArrowRight } from 'react-icons/fa'

import axios from "axios";

import TextSection from "../../../../../../components/admin/lesson/sections/text";
import ImgSection from "../../../../../../components/admin/lesson/sections/img";
import MCSection from "../../../../../../components/admin/lesson/sections/mc";
import FBSection from "../../../../../../components/admin/lesson/sections/fb";
import { showToastError } from "../../../../../../utils/toast";
import Modal from "../../../../../../components/learn/modal";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function Lesson({ user, setUser, loading, setLoading, setAxiosLoading, colorPalette }) {
  const router = useRouter();
  const { courseId, unitId, lessonId } = router.query;
  const [lesson, setLesson] = useState({});

  const [sectionNumber, setSectionNumber] = useState(1);
  const [maxSectionNumber, setMaxSectionNumber] = useState(Number.MAX_SAFE_INTEGER)
  const [quizSectionNumber, setQuizSectionNumber] = useState(-1)
  const [maxQuizSectionNumbers, setMaxQuizSectionNumbers] = useState(Number.MAX_SAFE_INTEGER)
  const [curQuizQuestion, setCurQuizQuestion] = useState(-1)

  const [courseName, setCourseName] = useState('Loading...')
  const [unitName, setUnitName] = useState('Loading...')

  useEffect(() => {
    if (loading) {
      return
    }
    if (!user || user.userType !== 1) {
      router.push('/')
    }
  }, [user, loading])

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (lessonId && token) {
      setAxiosLoading(true)
      axios
        .get(
          "/api/learn/lesson",
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
            setLesson(res.data.lesson)
            setUnitName(res.data.unitName)
            setCourseName(res.data.courseName)

            let newMax = 0
            for (let i in res.data.lesson.sections) {
              if (res.data.lesson.sections[i].sectionNumber > newMax) {
                newMax = res.data.lesson.sections[i].sectionNumber
              }
            }
            setMaxSectionNumber(newMax)

            const newMaxQuizSectionNumbers = []
            for (let i in res.data.lesson.quizQuestions) {
              newMax = 0
              for (let section of res.data.lesson.quizQuestions[i]) {
                if (section.sectionNumber > newMax) {
                  newMax = section.sectionNumber
                }
              }
              newMaxQuizSectionNumbers.push(newMax)
            }
            setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)

            setAxiosLoading(false);
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
      if (curQuizQuestion === -1) {
        setCurQuizQuestion(0)
      }
      if (curQuizQuestion === lesson.quizQuestions.length) {
        return
      }
      if (quizSectionNumber === maxQuizSectionNumbers[curQuizQuestion] + 1
        || (quizSectionNumber === maxQuizSectionNumbers[curQuizQuestion] && delayedIncrement)
      ) {
        setDelayedIncrement(false)
        setCurQuizQuestion(curQuizQuestion + 1)
        setQuizSectionNumber(0)
        return
      }
      if (delayedIncrement) {
        setDelayedIncrement(false)
        setQuizSectionNumber(quizSectionNumber + 1)
        return
      }
      else {
        const quizSections = lesson.quizQuestions[curQuizQuestion]
        for (let i in quizSections) {
          if (
            quizSections[i].sectionNumber === quizSectionNumber &&
            (quizSections[i].sectionType === 2 || quizSections[i].sectionType === 3)
          ) {
            return
          }
        }
        setQuizSectionNumber(quizSectionNumber + 1)
      }
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
  }, [sectionNumber, quizSectionNumber, curQuizQuestion])

  const questionIncrement = () => {
    setDelayedIncrement(true)
  }

  const quizQuestionIncrement = (questionSectionNumber) => {
    if (questionSectionNumber === quizSectionNumber) {
      setDelayedIncrement(true)
    }
  }

  const [quizScore, setQuizScore] = useState(0)
  const [updatedUser, setUpdatedUser] = useState(user)
  const [completed, setCompleted] = useState(false)

  const addScore = (points) => {
    setQuizScore(quizScore + points)
  }

  const [stars, setStars] = useState(0)

  const submitQuiz = (e) => {
    e.preventDefault()
    if (completed) {
      return
    }
    try {
      const token = localStorage.getItem('jwt')

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setAxiosLoading(true)
      axios
        .post("/api/learn/lesson/complete", { lessonId, score: quizScore }, config)
        .then((response) => {
          if (response.data) {
            const newUser = {
              ...user,

              exp: response.data.exp,
              flowers: response.data.flowers,
              lastRewards: response.data.lastRewards,
            }
            setStars(response.data.stars)
            setUpdatedUser(newUser)
            setCompleted(true)
            setAxiosLoading(false);
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message) {
            showToastError(error.response.data.message)
          }
          setAxiosLoading(false);
        });

    } catch (error) {
      showToastError(error.message);
      return;
    }
  }

  return (
    <div className='w-full min-h-screen flex items-center justify-center' style={{
      backgroundImage:
        !colorPalette ? "" : `url('/assets/backgrounds/${colorPalette.bg}')`,
      backgroundSize: "cover",
    }}
      onClick={clickIncrement}
    >
      <Head></Head>
      {completed && !loading &&
        <div
          className='bg-bg-completed text-bg-light w-screen h-screen fixed inset-0 flex justify-center items-center'
        >
          <div className="font-galindo flex items-center flex-col">
            <h2 className="text-3xl">
              Lesson Completed
            </h2>
            <Stars stars={stars} />
            <div className="text-xl my-2">
              {user.exp} Exp &nbsp;
              <FaArrowRight className="inline" /> &nbsp;
              {updatedUser.exp} Exp &nbsp;
              <Modal
                preview={
                  <AiOutlineQuestionCircle className="text-xl" />
                }
                content={
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-2xl mb-2 text-bg-completed">Earn Exp by scoring well on lesson quizes, unit tests, completing units, and completing courses.</p>
                  </div>
                }
              />
            </div>
            <div className="text-xl my-2">
              {user.flowers} F &nbsp;
              <FaArrowRight className="inline" /> &nbsp;
              {updatedUser.flowers} F &nbsp;
              <Modal
                preview={
                  <AiOutlineQuestionCircle className="text-xl" />
                }
                content={
                  <div className="flex flex-col items-start justify-center">
                    <p className="text-2xl mb-2 text-bg-completed">Earn Flowers by scoring well on lesson quizzes two times a day, or by completing units and courses.</p>
                  </div>
                }
              />
            </div>

            <div className="mt-8 grid grid-cols-2 w-[22rem] gap-x-5">
              <button
                className="bg-bg-light text-bg-completed rounded-lg py-2 px-2 text-xl duration-300 hover:scale-110"
                onClick={() => {
                  setUpdatedUser(updatedUser)
                  // TODO: Keep track of the latest lessons page that they were on so that they can go back to it
                  router.push('/play')
                }}
              >
                Home
                <HiHome className="inline text-2xl -mt-1 ml-1" />
              </button>
              <button
                className="bg-bg-light text-bg-completed rounded-lg py-2 px-2 text-xl duration-300 hover:scale-110"
                onClick={() => {
                  setLoading(true)
                  setUser(updatedUser)
                  window.location.reload()
                }}
              >
                Try Again
                <TbReload className="inline text-2xl ml-1" />
              </button>
            </div>
          </div>
        </div>
      }
      <form
        className={`flex flex-col items-center justify-start w-[40rem] min-h-screen bg-purple-50 ${completed ? 'hidden' : ''}`}
        onSubmit={(e) => submitQuiz(e)}
      >
        <header className="w-full h-44 text-pink-400 flex items-center justify-start flex-col font-galindo">
          <div className="w-full h-20 flex items-center justify-between px-6 py-3 bg-pink-200">
            <p className="text-lg cursor-pointer"
              onClick={(e) => {
                if (!completed) {
                  e.stopPropagation()
                  const confirmed = window.confirm('Are you sure you want to exit the lesson. Your question responses will NOT be saved.')
                  if (confirmed) {
                    router.push('/play')
                  }
                }
                else {
                  router.push('/play')
                }
              }}
            >
              Back
            </p>
            <p className="text-lg text-right">
              {courseName}
              <br />
              {unitName}
            </p>
          </div>
          <h1 className="text-3xl mt-3 mb-1">
            {lesson ? lesson.lessonName : "Loading..."}
          </h1>
          <div className="w-full h-[1px] bg-pink-200 mt-3" />
        </header>
        <div className="w-full h-full flex flex-col justify-start items-start bg-purple-50 pb-[20vh]">
          {lesson && lesson.sections && lesson.sections.map((section, index) => {
            // 0 is text, 1 is img, 2 is mc, 3 is fill in the blank
            switch (section.sectionType) {
              case 0:
                return (
                  <TextSection
                    key={`lesson-section-${index}`}
                    text={section.text}
                    section={section}
                    active={true}
                    sectionNumber={sectionNumber}
                  />
                );
              case 1:
                return (
                  <ImgSection
                    key={`lesson-section-${index}`}
                    image={section.image}
                    section={section}
                    active={true}
                    sectionNumber={sectionNumber}
                  />
                );
              case 2:
                return (
                  <MCSection
                    key={`lesson-section-${index}`}
                    options={section.options}
                    section={section}
                    active={true}
                    sectionNumber={sectionNumber}
                    increment={questionIncrement}
                    explanation={section.explanation}
                  />
                );
              case 3:
                return (
                  <FBSection
                    key={`lesson-section-${index}`}
                    text={section.text}
                    afterBlank={section.afterBlank}
                    section={section}
                    active={true}
                    sectionNumber={sectionNumber}
                    increment={questionIncrement}
                    explanation={section.explanation}
                  />
                );
              default:
                return <div key={`lessonSection-${index}`} />;
            }
          })}

          {
            quizSectionNumber !== -1 ?
              <>
                <div className="w-full text-pink-400 flex items-center justify-start flex-col font-galindo mt-10">
                  <div className="w-full h-[1px] bg-pink-200 mb-3" />
                  <h1 className="text-3xl mt-3 mb-1">
                    Quiz
                  </h1>
                  <div className="w-full h-[1px] bg-pink-200 mt-3" />
                </div>
                {lesson && lesson.quizQuestions && lesson.quizQuestions.map((quizQuestion, questionIndex) => (
                  <Fragment key={`quiz-question-${questionIndex}`}>
                    {curQuizQuestion >= questionIndex ?
                      <div className='w-full flex items-center justify-start flex-col font-galindo mt-10 text-pink-400'>
                        <h3 className="text-2xl mt-2 mb-0.5">
                          Question {questionIndex + 1}.
                        </h3>
                      </div> : <></>
                    }
                    {quizQuestion.map((quizSection, index) => {
                      // 0 is text, 1 is img, 2 is mc, 3 is fill in the blank
                      switch (quizSection.sectionType) {
                        case 0:
                          return (
                            <TextSection
                              key={`quiz-section-${questionIndex}-${index}`}
                              text={quizSection.text}
                              section={quizSection}
                              active={true}
                              sectionNumber={quizSectionNumber}
                              questionNumber={questionIndex}
                              curQuizQuestion={curQuizQuestion}
                            />
                          );
                        case 1:
                          return (
                            <ImgSection
                              key={`quiz-section-${questionIndex}-${index}`}
                              image={quizSection.image}
                              section={quizSection}
                              active={true}
                              sectionNumber={quizSectionNumber}
                              questionNumber={questionIndex}
                              curQuizQuestion={curQuizQuestion}
                            />
                          );
                        case 2:
                          return (
                            <MCSection
                              key={`quiz-section-${questionIndex}-${index}`}
                              options={quizSection.options}
                              section={quizSection}
                              active={true}
                              sectionNumber={quizSectionNumber}
                              increment={quizQuestionIncrement}
                              isQuiz={true}
                              addScore={addScore}
                              questionNumber={questionIndex}
                              curQuizQuestion={curQuizQuestion}
                              explanation={quizSection.explanation}
                            />
                          );
                        case 3:
                          return (
                            <FBSection
                              key={`quiz-section-${questionIndex}-${index}`}
                              text={quizSection.text}
                              afterBlank={quizSection.afterBlank}
                              section={quizSection}
                              active={true}
                              sectionNumber={quizSectionNumber}
                              increment={quizQuestionIncrement}
                              isQuiz={true}
                              addScore={addScore}
                              questionNumber={questionIndex}
                              curQuizQuestion={curQuizQuestion}
                              explanation={quizSection.explanation}
                            />
                          );
                        default:
                          return <div key={`quizSection-${index}`} />;
                      }
                    })}

                  </Fragment>
                ))}
              </> : <></>
          }

          {
            lesson && lesson.quizQuestions && curQuizQuestion === lesson.quizQuestions.length ?
              <div className="w-full flex justify-center mt-5 font-bold">
                <button
                  className="w-48 ring-2 rounded-lg py-2 px-4 font-averia bg-pink-100 text-pink-400 ring-pink-400"
                  type='submit'
                >
                  Complete Lesson
                </button>
              </div> : <></>
          }
        </div>
      </form>
    </div>
  );
}
