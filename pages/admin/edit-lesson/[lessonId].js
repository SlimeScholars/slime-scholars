import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LessonPreview from "../../../components/admin/lesson/preview";
import TextSection from "../../../components/admin/lesson/sections/text";

const sampleLesson = {
  course: "Course1",
  unit: "Unit1",
  name: "Lesson1",
  description: "This is a sample lesson",
  content: [
    {
      type: "text",
      content: "This is a sample text section",
      sectionNumber: 1,
      index: 0,
    },
  ],
};

export default function EditLesson() {
  const router = useRouter();
  const [lessonId, setLessonId] = useState(router.query.lessonId);
  const [lesson, setLesson] = useState(sampleLesson);

  const [text, setText] = useState("");

  useEffect(() => {
    setLessonId(router.query.lessonId);
    // TODO: Fetch lesson from database
  }, [router.query.lessonId]);

  const addText = () => {
    let newText = {
      type: "text",
      content: text,
      sectionNumber: lesson.content.length + 1,
      index: lesson.content.length,
    };
    lesson.content.push(newText);
    let newLesson = { ...lesson };
    setLesson(newLesson);
  };

  return (
    <div className="w-screen h-screen flex flex-row flex-nowrap">
      <div className="w-3/5 h-full p-10 pr-40 bg-purple-100 font-averia ">
        <h1 className="text-2xl font-black text-purple-500/70 mb-10">
          Edit lesson {lessonId}
        </h1>
        <button
          className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
          onClick={addText}
        >
          Add text
        </button>
        <textarea
          className="w-full bg-purple-50 p-3 mt-3"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter text here..."
        />
      </div>
      <div className="w-2/5 h-full">
        <LessonPreview lesson={lesson} setLesson={setLesson} />
      </div>
    </div>
  );
}
