import React from "react";
import TextSection from "./sections/text";
import MCSection from "./sections/mc";
import FBSection from "./sections/fb";
import { showToastMessage } from "../../../utils/verify";

export default function LessonPreview({ lesson, setLesson, maxSectionNumber, setMaxSectionNumber }) {
  // number refers to the ordered group number the section appears with
  const changeSectionNumber = (index, number) => {
    if(parseInt(number) < 0) {
      showToastMessage('Cannot have a negative section number')
      return
    }
    let newContent = [...lesson.sections];
    newContent[index].sectionNumber = parseInt(number);

    // Update section number
    if(parseInt(number) > maxSectionNumber) {
      setMaxSectionNumber(parseInt(number))
    }
    else if(lesson.sections[index].sectionNumber === maxSectionNumber) {
      let newMax = 0
      for(let s of newContent) {
        if(s.sectionNumber > newMax) {
          newMax = s.sectionNumber
        }
      }
      setMaxSectionNumber(newMax)
    }

    updateContent(newContent);
  };

  const deleteSection = (index) => {
    let newContent = [...lesson.sections];
    newContent.splice(index, 1);

    // Update maxSectionNumber if needed
    if(lesson.sections[index].sectionNumber === maxSectionNumber) {
      let newMax = 0
      for(let s of newContent) {
        if(s.sectionNumber > newMax) {
          newMax = s.sectionNumber
        }
      }
      setMaxSectionNumber(newMax)
    }
    updateIndices(newContent);
    updateContent(newContent);
  };

  const moveSection = (index, direction) => {
    if (index + direction < 0 || index + direction >= lesson.sections.length)
      return;
    let newContent = [...lesson.sections];
    let temp = newContent[index];
    newContent[index] = newContent[index + direction];
    newContent[index + direction] = temp;
    updateIndices(newContent);
    updateContent(newContent);
  };

  const updateIndices = (newContent) => {
    for (let i = 0; i < newContent.length; i++) {
      newContent[i].index = i;
    }
  };

  const updateContent = (newContent) => {
    let newLesson = { ...lesson };
    newLesson.sections = newContent;
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
      </div>
    </div>
  );
}
