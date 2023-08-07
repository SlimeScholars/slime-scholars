import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import axios from "axios";

import TextSection from "../../../../../../components/admin/lesson/sections/text";
import ImgSection from "../../../../../../components/admin/lesson/sections/img";
import MCSection from "../../../../../../components/admin/lesson/sections/mc";
import FBSection from "../../../../../../components/admin/lesson/sections/fb";

export default function Lesson() {
  const router = useRouter();
  const { course, unit, lessonID } = router.query;
  const [lesson, setLesson] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const [sectionNumber, setSectionNumber] = React.useState(1);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (lessonID && token) {
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
            setLoading(false);
          } else {
            throw new Error("Failed to fetch lesson");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [lessonID]);

  return loading ? (
    <div>Loading...</div>
  ) : (
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
                    setSectionNumber={setSectionNumber}
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
                    setSectionNumber={setSectionNumber}
                  />
                );
              default:
                return <div key={index} />;
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
                    sectionNumber={sectionNumber}
                  />
                );
              case 1:
                return (
                  <ImgSection
                    key={index}
                    image={quizSection.image}
                    section={quizSection}
                    active={true}
                    sectionNumber={sectionNumber}
                  />
                );
              case 2:
                return (
                  <MCSection
                    key={index}
                    options={quizSection.options}
                    section={quizSection}
                    active={true}
                    sectionNumber={sectionNumber}
                    setSectionNumber={setSectionNumber}
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
                    sectionNumber={sectionNumber}
                    setSectionNumber={setSectionNumber}
                  />
                );
              default:
                return <div key={index} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}
