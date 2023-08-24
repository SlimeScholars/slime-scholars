import React, { Fragment } from "react";
import TextSection from "./sections/text";
import MCSection from "./sections/mc";
import FBSection from "./sections/fb";
import ImgSection from "./sections/img";
import { showToastError } from "../../../utils/toast";

export default function LessonPreview({
  lesson,
  setLesson,
  maxSectionNumber,
  setMaxSectionNumber,
  maxQuizSectionNumbers,
  setMaxQuizSectionNumbers,

  curQuizQuestion,
  setCurQuizQuestion,
}) {
  // number refers to the ordered group number the section appears with
  const changeSectionNumber = (index, number) => {
    if (parseInt(number) < 0) {
      showToastError("Cannot have a negative section number");
      return;
    }
    let newSections = [...lesson.sections];
    newSections[index].sectionNumber = parseInt(number);

    // Update section number
    if (parseInt(number) > maxSectionNumber) {
      setMaxSectionNumber(parseInt(number));
    } else if (lesson.sections[index].sectionNumber === maxSectionNumber) {
      let newMax = 0;
      for (let s of newSections) {
        if (s.sectionNumber > newMax) {
          newMax = s.sectionNumber;
        }
      }
      setMaxSectionNumber(newMax);
    }

    updateSections(newSections);
  };

  const changeQuizSectionNumber = (index, number, questionIndex) => {
    if (parseInt(number) < 0) {
      showToastError("Cannot have a negative section number");
      return;
    }
    //
    let newQuizQuestions = [...lesson.quizQuestions]
    newQuizQuestions[questionIndex][index].sectionNumber = parseInt(number)

    // Update section number
    if (parseInt(number) > maxQuizSectionNumbers[questionIndex]) {
      const newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
      newMaxQuizSectionNumbers[questionIndex] = parseInt(number)
    }
    else if (lesson.quizQuestions[questionIndex][index].sectionNumber === maxQuizSectionNumbers[questionIndex]) {
      let newMax = 0
      for (let s of newQuizQuestions[questionIndex]) {
        if (s.sectionNumber > newMax) {
          newMax = s.sectionNumber
        }
      }
      const newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
      newMaxQuizSectionNumbers[questionIndex] = newMax
    }

    updateQuizQuestions(newQuizQuestions);
  };

  const deleteSection = (index) => {
    let newSections = [...lesson.sections];
    newSections.splice(index, 1);

    // Update maxSectionNumber if needed
    if (lesson.sections[index].sectionNumber === maxSectionNumber) {
      let newMax = 0;
      for (let s of newSections) {
        if (s.sectionNumber > newMax) {
          newMax = s.sectionNumber;
        }
      }
      setMaxSectionNumber(newMax);
    }
    updateIndices(newSections);
    updateSections(newSections);
  };

  const deleteQuizSection = (index, questionIndex) => {
    const newQuizQuestions = [...lesson.quizQuestions];
    const newQuizSections = [...newQuizQuestions[questionIndex]]
    newQuizSections.splice(index, 1);

    // Update maxSectionNumber if needed
    if (lesson.quizQuestions[questionIndex][index].sectionNumber === maxQuizSectionNumbers[questionIndex]) {
      let newMax = 0;
      for (let s of newQuizSections) {
        if (s.sectionNumber > newMax) {
          newMax = s.sectionNumber;
        }
      }
      const newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
      newMaxQuizSectionNumbers[questionIndex] = newMax
      setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)
    }
    newQuizQuestions[questionIndex] = newQuizSections
    updateQuizIndices(newQuizQuestions, questionIndex);
    updateQuizQuestions(newQuizQuestions);
  };

  const moveSection = (index, direction) => {
    if (index + direction < 0 || index + direction >= lesson.sections.length)
      return;
    let newSections = [...lesson.sections];
    let temp = newSections[index];
    newSections[index] = newSections[index + direction];
    newSections[index + direction] = temp;
    updateIndices(newSections);
    updateSections(newSections);
  };

  const moveQuizSection = (index, direction, questionIndex) => {
    if (
      index + direction < 0 ||
      index + direction >= lesson.quizQuestions[questionIndex].length
    )
      return;


    const newQuizQuestions = [...lesson.quizQuestions];
    const newQuizSections = newQuizQuestions[questionIndex]
    let temp = newQuizSections[index];
    newQuizSections[index] = newQuizSections[index + direction];
    newQuizSections[index + direction] = temp;
    updateQuizIndices(newQuizQuestions, questionIndex);
    updateQuizQuestions(newQuizQuestions);
  };

  const updateIndices = (newSections) => {
    for (let i = 0; i < newSections.length; i++) {
      newSections[i].index = i;
    }
    updateSections(newSections);
  };

  const updateQuizIndices = (newQuizQuestions, questionIndex) => {
    const newQuizSections = newQuizQuestions[questionIndex]
    for (let i = 0; i < newQuizSections.length; i++) {
      newQuizSections[i].index = i;
    }
    updateQuizQuestions(newQuizQuestions);
  };

  const updateSections = (newSections) => {
    let newLesson = { ...lesson };
    newLesson.sections = newSections;
    setLesson(newLesson);
  };

  const updateQuizQuestions = (newQuizQuestions) => {
    let newLesson = { ...lesson };
    newLesson.quizQuestions = newQuizQuestions;
    setLesson(newLesson);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-start bg-purple-50">
      <header className="w-full h-36 text-pink-400 flex items-center justify-start flex-col font-galindo">
        <div className="w-full h-12 flex items-center justify-between px-6 py-3 bg-pink-200">
          <p className="text-xl">{lesson.course}</p>
          <p className="text-xl">{lesson.unit}</p>
        </div>
        <h1 className="text-3xl mt-3 mb-1">{lesson.name}</h1>
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
                  changeSectionNumber={changeSectionNumber}
                  deleteSection={deleteSection}
                  moveSection={moveSection}
                  active={false}
                />
              );
            case 1:
              return (
                <ImgSection
                  key={index}
                  image={section.image}
                  section={section}
                  changeSectionNumber={changeSectionNumber}
                  deleteSection={deleteSection}
                  moveSection={moveSection}
                  active={false}
                />
              );
            case 2:
              return (
                <MCSection
                  key={index}
                  options={section.options}
                  section={section}
                  changeSectionNumber={changeSectionNumber}
                  deleteSection={deleteSection}
                  moveSection={moveSection}
                  active={false}
                />
              );
            case 3:
              return (
                <FBSection
                  key={index}
                  text={section.text}
                  afterBlank={section.afterBlank}
                  section={section}
                  changeSectionNumber={changeSectionNumber}
                  deleteSection={deleteSection}
                  moveSection={moveSection}
                  active={false}
                />
              );
            default:
              return <div key={index} />;
          }
        })}

        <div className="w-full text-pink-400 flex items-center justify-start flex-col font-galindo mt-10">
          <div className="w-full h-[1px] bg-pink-200 mb-3" />
          <h1 className="text-3xl mt-3 mb-1">
            Quiz
          </h1>
          <div className="w-full h-[1px] bg-pink-200 mt-3" />
        </div>
        {lesson.quizQuestions.map((quizQuestion, questionIndex) => (
          <Fragment
            key={`quiz-question-${questionIndex}`}
          >
            <div className="w-full text-pink-400 flex items-center justify-start flex-col font-galindo mt-10">
              <div className="w-full h-[1px] bg-pink-200 mb-3" />
              <h1 className="text-2xl mt-2 mb-0.5 cursor-pointer"
                onClick={() => {
                  setCurQuizQuestion(questionIndex)
                }}
              >
                Question {questionIndex + 1}.
              </h1>
            </div>
            {quizQuestion.map((quizSection, index) => {
              // 0 is text, 1 is img, 2 is mc, 3 is fill in the blank
              switch (quizSection.sectionType) {
                case 0:
                  return (
                    <TextSection
                      key={`quiz-section-${questionIndex}-${index}`}
                      text={quizSection.text}
                      section={quizSection}
                      changeSectionNumber={changeQuizSectionNumber}
                      deleteSection={deleteQuizSection}
                      moveSection={moveQuizSection}
                      active={false}
                      questionIndex={questionIndex}
                    />
                  );
                case 1:
                  return (
                    <ImgSection
                      key={`quiz-section-${questionIndex}-${index}`}
                      image={quizSection.image}
                      section={quizSection}
                      changeSectionNumber={changeQuizSectionNumber}
                      deleteSection={deleteQuizSection}
                      moveSection={moveQuizSection}
                      active={false}
                      questionIndex={questionIndex}
                    />
                  );
                case 2:
                  return (
                    <MCSection
                      key={`quiz-section-${questionIndex}-${index}`}
                      options={quizSection.options}
                      section={quizSection}
                      changeSectionNumber={changeQuizSectionNumber}
                      deleteSection={deleteQuizSection}
                      moveSection={moveQuizSection}
                      active={false}
                      questionIndex={questionIndex}
                    />
                  );
                case 3:
                  return (
                    <FBSection
                      key={`quiz-section-${questionIndex}-${index}`}
                      text={quizSection.text}
                      afterBlank={quizSection.afterBlank}
                      section={quizSection}
                      changeSectionNumber={changeQuizSectionNumber}
                      deleteSection={deleteQuizSection}
                      moveSection={moveQuizSection}
                      active={false}
                      questionIndex={questionIndex}
                    />
                  );
                default:
                  return <div key={index} />;
              }
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
