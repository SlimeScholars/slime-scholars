import React from "react";
import TextSection from "./sections/text";
import MCSection from "./sections/mc";
import FBSection from "./sections/fb";
import ImgSection from "./sections/img";
import { showToastMessage } from "../../../utils/verify";

export default function LessonPreview({
  lesson,
  setLesson,
  maxSectionNumber,
  setMaxSectionNumber,
  maxQuizSectionNumber,
  setMaxQuizSectionNumber,
}) {
  // number refers to the ordered group number the section appears with
  const changeSectionNumber = (index, number) => {
    if (parseInt(number) < 0) {
      showToastMessage("Cannot have a negative section number");
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

  const changeQuizSectionNumber = (index, number) => {
    if (parseInt(number) < 0) {
      showToastMessage("Cannot have a negative section number");
      return;
    }
    let newQuizSections = [...lesson.quizSections];
    newQuizSections[index].sectionNumber = parseInt(number);

    // Update section number
    if (parseInt(number) > maxQuizSectionNumber) {
      setMaxQuizSectionNumber(parseInt(number));
    } else if (
      lesson.quizSections[index].sectionNumber === maxQuizSectionNumber
    ) {
      let newMax = 0;
      for (let s of newQuizSections) {
        if (s.sectionNumber > newMax) {
          newMax = s.sectionNumber;
        }
      }
      setMaxQuizSectionNumber(newMax);
    }

    updateQuizSections(newQuizSections);
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

  const deleteQuizSection = (index) => {
    let newQuizSections = [...lesson.quizSections];
    newQuizSections.splice(index, 1);

    // Update maxSectionNumber if needed
    if (lesson.quizSections[index].sectionNumber === maxQuizSectionNumber) {
      let newMax = 0;
      for (let s of newQuizSections) {
        if (s.sectionNumber > newMax) {
          newMax = s.sectionNumber;
        }
      }
      setMaxQuizSectionNumber(newMax);
    }
    updateQuizIndices(newQuizSections);
    updateQuizSections(newQuizSections);
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

  const moveQuizSection = (index, direction) => {
    if (
      index + direction < 0 ||
      index + direction >= lesson.quizSections.length
    )
      return;
    let newQuizSections = [...lesson.quizSections];
    let temp = newQuizSections[index];
    newQuizSections[index] = newQuizSections[index + direction];
    newQuizSections[index + direction] = temp;
    updateQuizIndices(newQuizSections);
    updateQuizSections(newQuizSections);
  };

  const updateIndices = (newSections) => {
    for (let i = 0; i < newSections.length; i++) {
      newSections[i].index = i;
    }
    updateSections(newSections);
  };

  const updateQuizIndices = (newQuizSections) => {
    for (let i = 0; i < newQuizSections.length; i++) {
      newQuizSections[i].index = i;
    }
    updateQuizSections(newQuizSections);
  };

  const updateSections = (newSections) => {
    let newLesson = { ...lesson };
    newLesson.sections = newSections;
    setLesson(newLesson);
  };

  const updateQuizSections = (newQuizSections) => {
    let newLesson = { ...lesson };
    newLesson.quizSections = newQuizSections;
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
                  changeSectionNumber={changeQuizSectionNumber}
                  deleteSection={deleteQuizSection}
                  moveSection={moveQuizSection}
                />
              );
            case 1:
              return (
                <ImgSection
                  key={index}
                  image={quizSection.image}
                  section={quizSection}
                  changeSectionNumber={changeQuizSectionNumber}
                  deleteSection={deleteQuizSection}
                  moveSection={moveQuizSection}
                />
              );
            case 2:
              return (
                <MCSection
                  key={index}
                  options={quizSection.options}
                  section={quizSection}
                  changeSectionNumber={changeQuizSectionNumber}
                  deleteSection={deleteQuizSection}
                  moveSection={moveQuizSection}
                />
              );
            case 3:
              return (
                <FBSection
                  key={index}
                  text={quizSection.text}
                  afterBlank={quizSection.afterBlank}
                  section={quizSection}
                  changeSectionNumber={changeQuizSectionNumber}
                  deleteSection={deleteQuizSection}
                  moveSection={moveQuizSection}
                />
              );
            default:
              return <div key={index} />;
          }
        })}
      </div>
    </div>
  );
}
