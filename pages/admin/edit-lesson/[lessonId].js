import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LessonPreview from "../../../components/admin/lesson/preview";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToastMessage } from "../../../utils/verify";
import axios from "axios";

const sampleLesson = {
  course: "Loading",
  unit: "Loading",
  name: "Loading",
  content: [],
};

const emptyMC = [
  {
    content: "",
    correct: false,
  },
  {
    content: "",
    correct: false,
  },
  {
    content: "",
    correct: false,
  },
  {
    content: "",
    correct: false,
  },
];

export default function EditLesson() {
  // 0 is text, 1 is img, 2 is mc, 3 is fill in the blank
  const router = useRouter();
  const [lessonId, setLessonId] = useState(router.query.lessonId);
  const [lesson, setLesson] = useState(sampleLesson);

  const [text, setText] = useState("");
  const [mc, setMC] = useState(emptyMC);
  const [mcIsQuiz, setMCIsQuiz] = useState(false);

  useEffect(() => {
    if(!router.query.lessonId) {
      return
    }
    setLessonId(router.query.lessonId);
    axios
      .get("/api/course")
      .then((response) => {
        let flag = false
        if(response.data && response.data.courses) {
          for(let c of response.data.courses) {
            for(let u of c.units) {
              for(let l of u.lessons) {
                if(l._id === router.query.lessonId) {
                  const newLesson = {...lesson}
                  newLesson.course = c.courseName
                  newLesson.unit = u.unitName
                  newLesson.name = l.lessonName
                  // TODO: Add content to lesson
                  setLesson(newLesson)
                  flag = true
                }
              }
            }
          }
        }
        if(!flag) {
          showToastMessage('Could not find lesson.')
        }
      })
      .catch((error) => {
        showToastMessage(error.message)
        setLoading(false);
      });

    // TODO: Fetch lesson from database
  }, [router.query.lessonId]);

  const addText = () => {
    let newText = {
      type: 0,
      content: text,
      sectionNumber: lesson.content.length + 1,
      index: lesson.content.length,
    };
    lesson.content.push(newText);
    let newLesson = { ...lesson };
    setLesson(newLesson);
  };

  const addMC = () => {
    if (mc.every((option) => option.content.length === 0 || !option.correct)) {
      showToastMessage(
        "You must have at least one option and one correct option."
      );
      return;
    }
    let newMC = {
      type: 2,
      content: mc,
      sectionNumber: lesson.content.length + 1,
      index: lesson.content.length,
      quiz: mcIsQuiz,
    };
    lesson.content.push(newMC);
    let newLesson = { ...lesson };
    setLesson(newLesson);
  };

  const onMCChange = (index, value) => {
    let newMC = [...mc];
    newMC[index] = {
      content: value,
      correct: false,
    };
    setMC(newMC);
  };

  const onMCClick = (event, index) => {
    event.preventDefault();
    if (mc[index].content.length === 0) {
      showToastMessage("Enter some text first.");
      return;
    }
    let newMC = [...mc];
    newMC[index].correct = !newMC[index].correct;
    console.log("right click");
    setMC(newMC);
  };

  return (
    <div className="w-screen h-screen flex flex-row flex-nowrap">
      <ToastContainer />
      <div className="w-3/5 h-full p-10 pr-40 bg-purple-100 font-averia ">
        <h1 className="text-2xl font-black text-purple-500/70 mb-10">
          Edit lesson {lesson.name}
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
        <button
          className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md mt-10"
          onClick={addMC}
        >
          Add MC
        </button>
        <div className="w-full grid grid-cols-2 gap-5 mt-5">
          {[1, 2, 3, 4].map((i) => (
            <input
              className={
                "w-full ring-2 rounded-lg p-3 " +
                (mc[i - 1].correct
                  ? "bg-green-200 text-green-800 ring-green-400 placeholder:text-green-600"
                  : mc[i - 1].content.length > 0
                  ? "bg-purple-200 text-purple-800 ring-purple-400"
                  : "bg-gray-200 ring-gray-400 placeholder:text-gray-400")
              }
              onChange={(e) => onMCChange(i - 1, e.target.value)}
              value={mc[i - 1].content}
              placeholder={`Option ${i}`}
              onContextMenu={(event) => onMCClick(event, i - 1)}
              key={i}
            />
          ))}
        </div>
        <button
          onClick={() => {
            console.log(lesson.content)
          }}
        >
          Show content
        </button>
      </div>
      <div className="w-2/5 h-full">
        <LessonPreview lesson={lesson} setLesson={setLesson} />
      </div>
    </div>
  );
}
