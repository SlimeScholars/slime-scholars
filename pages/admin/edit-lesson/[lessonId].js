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
      sectionNumber: 0,
    },
  ],
};

export default function EditLesson() {
  const router = useRouter();
  const [lessonId, setLessonId] = useState(router.query.lessonId);
  const [lesson, setLesson] = useState(sampleLesson);

  useEffect(() => {
    setLessonId(router.query.lessonId);
    // TODO: Fetch lesson from database
  }, [router.query.lessonId]);

  return (
    <div className="w-screen h-screen flex flex-row flex-nowrap">
      <div className="w-3/5 h-full p-10 bg-purple-100 ">
        <h1 className="text-2xl font-black font-averia text-purple-500/70">
          Edit lesson {lessonId}
        </h1>
      </div>
      <div className="w-2/5 h-full">
        <LessonPreview lesson={lesson} />
      </div>
    </div>
  );
}
