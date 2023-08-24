import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LessonPreview from "../../../components/admin/lesson/preview";
import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../../utils/toast";
import axios from "axios";

const sampleLesson = {
  course: "Loading",
  unit: "Loading",
  name: "Loading",
  sections: [],
  quizQuestions: [[]],
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
  const [maxQuizSectionNumbers, setMaxQuizSectionNumbers] = useState([]);

  const [curQuizQuestion, setCurQuizQuestion] = useState(0)

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
      lesson.quizQuestions === sampleLesson.quizQuestions
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
        lesson.quizQuestions !== sampleLesson.quizQuestions)
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

    const config = {
      params: {
        lessonId: router.query.lessonId,
      }
    };

    axios
      .get("/api/admin/lesson", config)
      .then((response) => {
        const resLesson = response?.data?.lesson
        if (!lesson) {
          throw new Error("Lesson not found")
        }
        const newLesson = {
          course: 'Course Name',
          unit: 'Unit Name',
          name: resLesson.lessonName,
          sections: resLesson.sections,
          quizQuestions: resLesson.quizQuestions,
        }

        let newMax = 0
        for (let section of resLesson.sections) {
          // Join the blank array into a string
          if (section.sectionType === 3) {
            newLesson.sections[section.index] = {
              index: section.index,
              sectionType: section.sectionType,
              sectionNumber: section.sectionNumber,
              text: section.text,
              blank: section.blank.join(", "),
              afterBlank: section.afterBlank,
            };
          }

          // Get the max section number
          if (section.sectionNumber > newMax) {
            newMax = section.sectionNumber
          }
        }
        setMaxSectionNumber(newMax);

        //
        newMax = 0;
        const newMaxQuizSectionNumbers = []
        for (let i in resLesson.quizQuestions) {
          newMax = 0
          for (let section of resLesson.quizQuestions[i]) {
            if (section.sectionType === 3) {
              newLesson.quizQuestions[i][section.index] = {
                index: section.index,
                sectionType: section.sectionType,
                sectionNumber: section.sectionNumber,
                text: section.text,
                blank: section.blank.join(", "),
                afterBlank: section.afterBlank,
              }
            }

            if (section.sectionNumber > newMax) {
              newMax = section.sectionNumber
            }
          }
          newMaxQuizSectionNumbers.push(newMax)
        }
        setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)

        setLesson(newLesson);
      })
      .catch((error) => {
        showToastError(error?.response?.data?.message || error.message)
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
      newText.sectionNumber = maxQuizSectionNumbers[curQuizQuestion] + 1;
      newText.index = lesson.quizQuestions[curQuizQuestion].length;
      newLesson.quizQuestions[curQuizQuestion].push(newText);
      let newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
      newMaxQuizSectionNumbers[curQuizQuestion] = maxQuizSectionNumbers[curQuizQuestion] + 1
      setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)
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
      showToastError(
        "You must have at least one option and one correct option."
      );
      return;
    }
    let newMC = {
      sectionType: 2,
      options: [],
      index: lesson.sections.length,
    };
    for (let i in mc) {
      newMC.options.push({ ...mc[i] })
    }

    let newLesson = { ...lesson };
    if (mcIsQuiz) {
      newMC.sectionNumber = maxQuizSectionNumbers[curQuizQuestion] + 1;
      newMC.index = lesson.quizQuestions[curQuizQuestion].length;
      newLesson.quizQuestions[curQuizQuestion].push(newMC);
      let newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
      newMaxQuizSectionNumbers[curQuizQuestion] = maxQuizSectionNumbers[curQuizQuestion] + 1
      setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)
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
      showToastError("Enter some text first.");
      return;
    }
    let newMC = [...mc];
    newMC[index].correct = !newMC[index].correct;
    setMC(newMC);
  };

  const addFB = () => {
    if (blank.blank.length === 0) {
      showToastError("Answer is required.");
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
      newFB.sectionNumber = maxQuizSectionNumbers[curQuizQuestion] + 1;
      newFB.index = lesson.quizQuestions[curQuizQuestion].length;
      newLesson.quizQuestions[curQuizQuestion].push(newFB);
      let newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
      newMaxQuizSectionNumbers[curQuizQuestion] = maxQuizSectionNumbers[curQuizQuestion] + 1
      setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)
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
      showToastError("Image is required.");
      return;
    }
    let newImage = {
      sectionType: 1,
      image: image,
    };
    let newLesson = { ...lesson };
    if (imageIsQuiz) {
      newImage.sectionNumber = maxQuizSectionNumbers[curQuizQuestion] + 1;
      newImage.index = lesson.quizQuestions[curQuizQuestion].length;
      newLesson.quizQuestions[curQuizQuestion].push(newImage);
      let newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
      newMaxQuizSectionNumbers[curQuizQuestion] = maxQuizSectionNumbers[curQuizQuestion] + 1
      setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)
    } else {
      newImage.sectionNumber = maxSectionNumber + 1;
      newImage.index = lesson.sections.length;
      newLesson.sections.push(newImage);
      setMaxSectionNumber(maxSectionNumber + 1);
    }
    setLesson(newLesson);
  };

  const addQuizQuestion = () => {
    const newLesson = { ...lesson };
    newLesson.quizQuestions.push([]);
    setLesson(newLesson);
    setCurQuizQuestion(newLesson.quizQuestions.length - 1)
    setMaxQuizSectionNumbers([...maxQuizSectionNumbers, 0])
  }

  const save = () => {
    try {
      // Make sure there are at least 4 questions on the quiz
      if (lesson.quizQuestions.length < 4) {
        throw new Error(`There must be at least 4 quiz questions. There are currently ${lesson.quizQuestions.length}.`)
      }

      // Make sure there is only one question max section number
      const sectionsOverlap = {}
      for (let i in lesson.sections) {
        if (lesson.sections.sectionType === 2 || lesson.sections.sectionType === 3) {
          if (sectionsOverlap[lesson.sections[i].sectionNumber]) {
            throw new Error(`There can only one question max per section number. On lesson section number ${lesson.sections[i].sectionNumber} there is an overlap.`)
          }
          sectionsOverlap[lesson.sections[i].sectionNumber] = true
        }
      }

      // Make sure there is only one question per quiz question
      for (let i in lesson.quizQuestions) {
        let flag = false
        for (let section in lesson.quizQuestions[i]) {
          if (section.sectionType === 2 || section.sectionType === 3) {
            if (flag) {
              throw new Error(`There can only one question per quiz question. On quiz question number ${j} there is are multiple questions.`)
            }
            flag = true
          }
        }
      }

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

      for (let i in newLesson.quizQuestions) {
        for (let section of newLesson.quizQuestions[i]) {
          if (
            section.sectionType === 1 &&
            typeof section.image !== "string"
          ) {
            imageFiles.push(section.image);
            section.image = imageFiles.length - 1;
          }
        }
      }

      formData.append(
        "data",
        JSON.stringify({
          lessonId,
          sections: newLesson.sections,
          quizQuestions: newLesson.quizQuestions,
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
            const resLesson = response.data.lesson
            const newLesson = {
              ...lesson,
              sections: resLesson.sections,
              quizQuestions: resLesson.quizQuestions,
            };

            let newMax = 0
            for (let section of resLesson.sections) {
              // Join the blank array into a string
              if (section.sectionType === 3) {
                newLesson.sections[section.index] = {
                  index: section.index,
                  sectionType: section.sectionType,
                  sectionNumber: section.sectionNumber,
                  text: section.text,
                  blank: section.blank.join(", "),
                  afterBlank: section.afterBlank,
                };
              }

              // Get the max section number
              if (section.sectionNumber > newMax) {
                newMax = section.sectionNumber
              }
            }
            setMaxSectionNumber(newMax);

            //
            newMax = 0;
            const newMaxQuizSectionNumbers = []
            for (let i in resLesson.quizQuestions) {
              newMax = 0
              for (let section of resLesson.quizQuestions[i]) {
                if (section.sectionType === 3) {
                  newLesson.quizQuestions[i][section.index] = {
                    index: section.index,
                    sectionType: section.sectionType,
                    sectionNumber: section.sectionNumber,
                    text: section.text,
                    blank: section.blank.join(", "),
                    afterBlank: section.afterBlank,
                  }
                }

                if (section.sectionNumber > newMax) {
                  newMax = section.sectionNumber
                }
              }
              newMaxQuizSectionNumbers.push(newMax)
            }
            setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)

            setLesson(newLesson);

            setLesson(newLesson);
            showToastError("Lesson updated successfully.", true);
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
            showToastError(error.response.data.message);
          } else {
            showToastError(error.message);
          }
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      showToastError(error.message);
      return;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-row flex-nowrap">
      <div className="w-3/5 min-h-full p-10 pr-40 bg-purple-100 font-averia ">
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
        <div className="w-full flex flex-row items-center justify-start mt-10">
          <button
            className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
            onClick={addQuizQuestion}
          >
            Add Quiz Question
          </button>
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
          maxQuizSectionNumbers={maxQuizSectionNumbers}
          setMaxQuizSectionNumbers={setMaxQuizSectionNumbers}
          curQuizQuestion={curQuizQuestion}
          setCurQuizQuestion={setCurQuizQuestion}
        />
      </div>
    </div>
  );
}
