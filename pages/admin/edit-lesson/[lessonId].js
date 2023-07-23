import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditLesson() {
  const router = useRouter();
  const [lessonId, setLessonId] = useState(router.query.lessonId);

  useEffect(() => {
    setLessonId(router.query.lessonId);
  }, [router.query.lessonId]);

  return (
    <div className="w-screen h-screen">
      <h1>Edit Lesson</h1>
      <p>Lesson ID: {lessonId}</p>
    </div>
  );
}
