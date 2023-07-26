import React, { useState } from "react";
import TextSection from "./sections/text";

export default function LessonPreview({ lesson }) {
  const [content, setContent] = useState(lesson.content);

  // number refers to the ordered group number the section appears with
  const changeSectionNumber = (index, number) => {
    let newContent = [...content];
    newContent[index].sectionNumber = number;
    setContent(newContent);
  };

  const deleteSection = (index) => {
    let newContent = [...content];
    newContent.splice(index, 1);
    setContent(newContent);
  };

  const moveSection = (index, direction) => {
    if (index + direction < 0 || index + direction >= content.length) return;
    let newContent = [...content];
    let temp = newContent[index];
    newContent[index] = newContent[index + direction];
    newContent[index + direction] = temp;
    for (let i = 0; i < newContent.length; i++) {
      newContent[i].sectionNumber = i;
    }
    setContent(newContent);
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
        {content.map((section, index) => {
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
            default:
              return <div key={index} />;
          }
        })}
      </div>
    </div>
  );
}
