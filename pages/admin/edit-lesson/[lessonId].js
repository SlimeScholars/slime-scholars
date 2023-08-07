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
  sections: [],
  quizSections: [],
};

const emptyMC = [
  {
    option: "",
    correct: false,
  },
  {
    option: "",
    correct: false,
  },
  {
    option: "",
    correct: false,
  },
  {
    option: "",
    correct: false,
  },
];

export default function EditLesson({ user, loading, setLoading }) {
  // 0 is text, 1 is img, 2 is mc, 3 is fill in the blank
  const router = useRouter();
  const [lessonId, setLessonId] = useState(router.query.lessonId);
  const [lesson, setLesson] = useState(sampleLesson);

  const [text, setText] = useState("");
  const [textIsQuiz, setTextIsQuiz] = useState(false);
  const [mc, setMC] = useState(emptyMC);
  const [mcIsQuiz, setMCIsQuiz] = useState(false);
  const [blank, setBlank] = useState({ text: "", afterBlank: "", blank: "" });
  const [fbIsQuiz, setFBIsQuiz] = useState(false);
  const [image, setImage] = useState(null);
  const [imageIsQuiz, setImageIsQuiz] = useState(false);

  const [maxSectionNumber, setMaxSectionNumber] = useState(0);
  const [maxQuizSectionNumber, setMaxQuizSectionNumber] = useState(0);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 4) {
      router.push("/");
    }
  }, [user, loading]);

  const [initialLoad, setInitialLoad] = useState(true);
  useEffect(() => {
    if (
      !loading &&
      lesson &&
      lesson.course === sampleLesson.course &&
      lesson.unit === sampleLesson.unit &&
      lesson.name === sampleLesson.name &&
      lesson.sections === sampleLesson.sections &&
      lesson.quizSections === sampleLesson.quizSections
    ) {
      setLoading(true);
    } else if (
      loading &&
      initialLoad &&
      lesson &&
      (lesson.course !== sampleLesson.course ||
        lesson.unit !== sampleLesson.unit ||
        lesson.name !== sampleLesson.name ||
        lesson.sections !== sampleLesson.sections ||
        lesson.quizSections !== sampleLesson.quizSections)
    ) {
      setInitialLoad(false);
      setLoading(false);
    }
  }, [lesson, loading, initialLoad]);

  useEffect(() => {
    if (!router.query.lessonId) {
      return;
    }
    setLessonId(router.query.lessonId);
    axios
      .get("/api/course")
      .then((response) => {
        let flag = false;
        if (response.data && response.data.courses) {
          for (let c of response.data.courses) {
            for (let u of c.units) {
              for (let l of u.lessons) {
                if (l._id === router.query.lessonId) {
                  const newLesson = {
                    course: c.courseName,
                    unit: u.unitName,
                    name: l.lessonName,
                    sections: l.sections,
                    quizSections: l.quizSections,
                  };

                  let newMax = 0;
                  for (let s of l.sections) {
                    if (s.sectionType === 3) {
                      newLesson.sections[s.index] = {
                        index: s.index,
                        sectionType: s.sectionType,
                        sectionNumber: s.sectionNumber,
                        text: s.text,
                        blank: s.blank.join(", "),
                        afterBlank: s.afterBlank,
                      };
                    }

                    if (s.sectionNumber > newMax) {
                      newMax = s.sectionNumber;
                    }
                  }
                  setMaxSectionNumber(newMax);

                  newMax = 0;
                  for (let s of l.quizSections) {
                    if (s.sectionType === 3) {
                      newLesson.quizSections[s.index] = {
                        index: s.index,
                        sectionType: s.sectionType,
                        sectionNumber: s.sectionNumber,
                        text: s.text,
                        blank: s.blank.join(", "),
                        afterBlank: s.afterBlank,
                      };
                    }
                    if (s.sectionNumber > newMax) {
                      newMax = s.sectionNumber;
                    }
                  }
                  setMaxQuizSectionNumber(newMax);
                  setLesson(newLesson);
                  flag = true;
                }
              }
            }
          }
        }
        if (!flag) {
          router.push("/admin/edit-course");
        }
      })
      .catch((error) => {
        showToastMessage(error.message);
        setLoading(false);
      });
  }, [router.query.lessonId]);

  const addText = () => {
    let newText = {
      sectionType: 0,
      text: text,
    };
    let newLesson = { ...lesson };
    if (textIsQuiz) {
      newText.sectionNumber = maxQuizSectionNumber + 1;
      newText.index = lesson.quizSections.length;
      newLesson.quizSections.push(newText);
      setMaxQuizSectionNumber(maxQuizSectionNumber + 1);
    } else {
      newText.sectionNumber = maxSectionNumber + 1;
      newText.index = lesson.sections.length;
      newLesson.sections.push(newText);
      setMaxSectionNumber(maxSectionNumber + 1);
    }
    setLesson(newLesson);
  };

  const addMC = () => {
    if (mc.every((option) => option.option.length === 0 || !option.correct)) {
      showToastMessage(
        "You must have at least one option and one correct option."
      );
      return;
    }
    let newMC = {
      sectionType: 2,
      options: [...mc],
      index: lesson.sections.length,
    };

    let newLesson = { ...lesson };
    if (mcIsQuiz) {
      newMC.sectionNumber = maxQuizSectionNumber + 1;
      newMC.index = lesson.quizSections.length;
      newLesson.quizSections.push(newMC);
      setMaxQuizSectionNumber(maxQuizSectionNumber + 1);
    } else {
      newMC.sectionNumber = maxSectionNumber + 1;
      newMC.index = lesson.sections.length;
      newLesson.sections.push(newMC);
      setMaxSectionNumber(maxSectionNumber + 1);
    }
    setLesson(newLesson);
  };

  const onMCChange = (index, value) => {
    let newMC = [...mc];
    newMC[index] = {
      option: value,
      correct: false,
    };
    setMC(newMC);
  };

  const onMCClick = (event, index) => {
    event.preventDefault();
    if (mc[index].option.length === 0) {
      showToastMessage("Enter some text first.");
      return;
    }
    let newMC = [...mc];
    newMC[index].correct = !newMC[index].correct;
    setMC(newMC);
  };

  const addFB = () => {
    if (blank.blank.length === 0) {
      showToastMessage("Answer is required.");
      return;
    }
    let newFB = {
      sectionType: 3,
      text: blank.text,
      blank: blank.blank,
      afterBlank: blank.afterBlank,
      index: lesson.sections.length,
    };
    let newLesson = { ...lesson };
    if (fbIsQuiz) {
      newFB.sectionNumber = maxQuizSectionNumber + 1;
      newFB.index = lesson.quizSections.length;
      newLesson.quizSections.push(newFB);
      setMaxQuizSectionNumber(maxQuizSectionNumber + 1);
    } else {
      newFB.sectionNumber = maxSectionNumber + 1;
      newFB.index = lesson.sections.length;
      newLesson.sections.push(newFB);
      setMaxSectionNumber(maxSectionNumber + 1);
    }
    setLesson(newLesson);
  };

  const addImage = () => {
    if (!image) {
      showToastMessage("Image is required.");
      return;
    }
    let newImage = {
      sectionType: 1,
      image: image,
    };
    let newLesson = { ...lesson };
    if (imageIsQuiz) {
      newImage.sectionNumber = maxQuizSectionNumber + 1;
      newImage.index = lesson.quizSections.length;
      newLesson.quizSections.push(newImage);
      setMaxQuizSectionNumber(maxQuizSectionNumber + 1);
    } else {
      newImage.sectionNumber = maxSectionNumber + 1;
      newImage.index = lesson.sections.length;
      newLesson.sections.push(newImage);
      setMaxSectionNumber(maxSectionNumber + 1);
    }
    setLesson(newLesson);
  };

  const save = () => {
    try {
      const token = localStorage.getItem("jwt");

      // Set the authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      setLoading(true);

      const formData = new FormData();

      let newLesson = { ...lesson };
      let imageFiles = [];
      for (let i in newLesson.sections) {
        if (
          newLesson.sections[i].sectionType === 1 &&
          typeof newLesson.sections[i].image !== "string"
        ) {
          imageFiles.push(newLesson.sections[i].image);
          newLesson.sections[i].image = imageFiles.length - 1;
        }
      }
      for (let i in newLesson.quizSections) {
        if (
          newLesson.quizSections[i].sectionType === 1 &&
          typeof newLesson.quizSections[i].image !== "string"
        ) {
          imageFiles.push(newLesson.quizSections[i].image);
          newLesson.quizSections[i].image = imageFiles.length - 1;
        }
      }

      formData.append(
        "data",
        JSON.stringify({
          lessonId,
          sections: lesson.sections,
          quizSections: lesson.quizSections,
          imageLength: imageFiles.length,
        })
      );

      for (let i in imageFiles) {
        formData.append(`image${i}`, imageFiles[i]);
      }

      axios
        .put("/api/admin/lesson/update-sections", formData, config)
        .then((response) => {
          if (response.data && response.data.lesson) {
            const newLesson = {
              ...lesson,
              sections: response.data.lesson.sections,
              quizSections: response.data.lesson.quizSections,
            };

            let newMax = 0;
            for (let s of response.data.lesson.sections) {
              if (s.sectionType === 3) {
                newLesson.sections[s.index] = {
                  index: s.index,
                  sectionType: s.sectionType,
                  sectionNumber: s.sectionNumber,
                  text: s.text,
                  blank: s.blank.join(", "),
                  afterBlank: s.afterBlank,
                };
              }

              if (s.sectionNumber > newMax) {
                newMax = s.sectionNumber;
              }
            }
            setMaxSectionNumber(newMax);

            newMax = 0;
            for (let s of response.data.lesson.quizSections) {
              if (s.sectionType === 3) {
                newLesson.quizSections[s.index] = {
                  index: s.index,
                  sectionType: s.sectionType,
                  sectionNumber: s.sectionNumber,
                  text: s.text,
                  blank: s.blank.join(", "),
                  afterBlank: s.afterBlank,
                };
              }

              if (s.sectionNumber > newMax) {
                newMax = s.sectionNumber;
              }
            }
            setMaxQuizSectionNumber(newMax);
            setLesson(newLesson);
            showToastMessage("Lesson updated successfully.", true);
          }
          setLoading(false);
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            showToastMessage(error.response.data.message);
          } else {
            showToastMessage(error.message);
          }
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      showToastMessage(error.message);
      return;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row flex-nowrap">
      <ToastContainer />
      <div className="w-3/5 h-full p-10 pr-40 bg-purple-100 font-averia ">
        <h1 className="text-2xl font-black text-purple-500/70 mb-10">
          Edit lesson {lesson.name}
        </h1>
        <div className="w-full flex flex-row items-center justify-start mt-10">
          <button
            className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
            onClick={addText}
          >
            Add text
          </button>
          <input
            type="checkbox"
            className="w-5 h-5 ml-10 mr-2"
            checked={textIsQuiz}
            onChange={() => setTextIsQuiz(!textIsQuiz)}
          />
          <p className="text-lg">Quiz</p>
        </div>
        <textarea
          className="w-full bg-purple-50 p-3 mt-3"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Enter text here..."
        />
        <div className="w-full flex flex-row items-center justify-start mt-10">
          <button
            className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
            onClick={addMC}
          >
            Add MC
          </button>
          <input
            type="checkbox"
            className="w-5 h-5 ml-10 mr-2"
            checked={mcIsQuiz}
            onChange={() => setMCIsQuiz(!mcIsQuiz)}
          />
          <p className="text-lg">Quiz</p>
        </div>
        <div className="w-full grid grid-cols-2 gap-5 mt-5">
          {[1, 2, 3, 4].map((i) => (
            <input
              className={
                "w-full ring-2 rounded-lg p-3 " +
                (mc[i - 1].correct
                  ? "bg-green-200 text-green-800 ring-green-400 placeholder:text-green-600"
                  : mc[i - 1].option.length > 0
                  ? "bg-purple-200 text-purple-800 ring-purple-400"
                  : "bg-gray-200 ring-gray-400 placeholder:text-gray-400")
              }
              onChange={(e) => onMCChange(i - 1, e.target.value)}
              value={mc[i - 1].option}
              placeholder={`Option ${i}`}
              onContextMenu={(event) => onMCClick(event, i - 1)}
              key={i}
            />
          ))}
        </div>
        <div className="w-full flex flex-row items-center justify-start mt-10">
          <button
            className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
            onClick={addFB}
          >
            Add FB
          </button>
          <input
            type="checkbox"
            className="w-5 h-5 ml-10 mr-2"
            checked={fbIsQuiz}
            onChange={() => setFBIsQuiz(!fbIsQuiz)}
          />
          <p className="text-lg">Quiz</p>
        </div>
        <div className="w-full grid grid-cols-5 gap-2 mt-1">
          <p className="text-base col-span-2 text-center">Before</p>
          <p className="text-base text-center">Answer(s)</p>
          <p className="text-base col-span-2 text-center">After</p>
          <textarea
            className="w-full col-span-2 ring-2 ring-purple-200 rounded-lg p-3"
            onChange={(e) => setBlank({ ...blank, text: e.target.value })}
            value={blank.text}
            placeholder="Enter text here..."
          />
          <textarea
            className="w-full ring-2 ring-purple-200 rounded-lg p-3"
            onChange={(e) => setBlank({ ...blank, blank: e.target.value })}
            value={blank.blank}
            placeholder="Enter text here..."
          />
          <textarea
            className="w-full col-span-2 ring-2 ring-purple-200 rounded-lg p-3"
            onChange={(e) => setBlank({ ...blank, afterBlank: e.target.value })}
            value={blank.afterBlank}
            placeholder="Enter text here..."
          />
        </div>
        <div className="w-full flex flex-row items-center justify-start mt-10">
          <button
            className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
            onClick={addImage}
          >
            Add image
          </button>
          <input
            type="checkbox"
            className="w-5 h-5 ml-10 mr-2"
            checked={imageIsQuiz}
            onChange={() => setImageIsQuiz(!imageIsQuiz)}
          />
          <p className="text-lg">Quiz</p>
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
            className="w-1/2 ml-10"
            accept="image/gif, image/jpeg, image/png"
          />
        </div>
        <button
          className="bg-pink-400 hover:bg-pink-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md mt-10"
          onClick={save}
        >
          Save
        </button>
      </div>
      <div className="w-2/5 h-full">
        <LessonPreview
          lesson={lesson}
          setLesson={setLesson}
          maxSectionNumber={maxSectionNumber}
          setMaxSectionNumber={setMaxSectionNumber}
          maxQuizSectionNumber={maxQuizSectionNumber}
          setMaxQuizSectionNumber={setMaxQuizSectionNumber}
        />
      </div>
    </div>
  );
}
