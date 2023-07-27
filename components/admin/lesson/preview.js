import React from "react";
import TextSection from "./sections/text";
import MCSection from "./sections/mc";

export default function LessonPreview({ lesson, setLesson }) {
  // number refers to the ordered group number the section appears with
  const changeSectionNumber = (index, number) => {
    let newContent = [...lesson.content];
    newContent[index].sectionNumber = parseInt(number);
    updateContent(newContent);
  };

  const deleteSection = (index) => {
    let newContent = [...lesson.content];
    newContent.splice(index, 1);
    updateIndices(newContent);
    updateContent(newContent);
  };

  const moveSection = (index, direction) => {
    if (index + direction < 0 || index + direction >= lesson.content.length)
      return;
    let newContent = [...lesson.content];
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
    newLesson.content = newContent;
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
        <p className="text-xl">{lesson.description}</p>
        <div className="w-full h-[1px] bg-pink-200 mt-3" />
      </header>
      <div className="w-full h-full flex flex-col justify-start items-start bg-purple-50">
        {lesson.content.map((section, index) => {
          switch (section.type) {
            case "text":
              return (
                <TextSection
                  key={index}
                  text={section.content}
                  section={section}
                  changeSectionNumber={changeSectionNumber}
                  deleteSection={deleteSection}
                  moveSection={moveSection}
                />
              );
            case "mc":
              return (
                <MCSection
                  key={index}
                  options={section.content}
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
