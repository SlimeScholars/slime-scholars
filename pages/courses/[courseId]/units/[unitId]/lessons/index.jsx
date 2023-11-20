import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { showToastError } from "../../../../../../utils/toast";
import axios from "axios";
import Lesson from "../../../../../../components/learn/lesson";
import Image from "next/image";
import cookies from "../../../../../../services/cookies/cookies";

export default function Lessons({ user, loading, setLoading, colorPalette }) {
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user || user.userType !== 1) {
      router.push("/");
    }
  }, [user, loading]);

  const [courseId, setCourseId] = useState(router.query.courseId);
  const [unitId, setUnitId] = useState(router.query.unitId);
  const [lessons, setLessons] = useState([]);
  const [courseName, setCourseName] = useState(null);
  const [unitName, setUnitName] = useState(null);
  const [unitNumber, setUnitNumber] = useState(null);
  const [counts, setCounts] = useState({ lessons: 0, quizzes: 0, tests: 0 });

  useEffect(() => {
    setLoading(true);
    try {
      if (!router.query.courseId || !router.query.unitId) {
        return;
      }
      setCourseId(router.query.courseId);
      setUnitId(router.query.unitId);

      const token = cookies.get("slime-scholars-webapp-token")
      if (!token) {
        return;
      }
      // Set the authorization header
      const config = {
        params: {
          courseId: router.query.courseId,
          unitId: router.query.unitId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get("/api/learn/lessons", config)
        .then((response) => {
          if (response?.data?.lessons) {
            setCourseName(response.data.courseName);
            setUnitNumber(response.data.unitNumber);
            setUnitName(response.data.unitName);
            setLessons(response.data.lessons);
            setTimeout(() => {
              setLoading(false);
            }, 150);
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message) {
            showToastError(error.response.data.message);
          }
          setTimeout(() => {
            setLoading(false);
          }, 150);
        });

      const postConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          "/api/learn/units/add",
          {
            courseId: router.query.courseId,
            unitId: router.query.unitId,
          },
          postConfig
        )
        .catch((error) => {
          if (error?.response?.data?.message) {
            showToastError(error.response.data.message);
          }
        });
    } catch (error) {
      showToastError(error.message);
      setTimeout(() => {
        setLoading(false);
      }, 150);
      return;
    }
  }, [router.query.courseId, router.query.unitId]);

  useEffect(() => {
    if (lessons.length === 0) {
      return;
    }
    setCounts(lessonCounter(lessons));
  }, [lessons]);

  if (loading) {
    return;
  }
  return (
    <div
      style={{
        backgroundColor: !colorPalette ? "" : colorPalette.primary2 + "50",
      }}
    >
      <div className="h-[2.5rem] bg-white flex flex-row gap-3 items-center pl-[4rem]">
        <span
          className="hover:text-blue-400 transition-all duration-150"
          onClick={() => {
            router.push(`/courses`);
          }}
        >
          Courses{" "}
        </span>
        <span>{">>"}</span>
        <span
          className="hover:text-blue-400 transition-all duration-150"
          onClick={() => {
            router.push(`/courses/${courseId}/units`);
          }}
        >
          {courseName}
        </span>
        <span>{">>"}</span>
        <span
          className="hover:text-blue-400 transition-all duration-150"
          onClick={() => {
            router.push(`/courses/${courseId}/units/${unitId}/lessons`);
          }}
        >
          {unitName}
        </span>
      </div>
      <div
        className="relative z-[1] w-full h-[calc(100vh_-_5rem_-_2.5rem)] flex flex-col pl-[3rem] 2xl:pl-[3.75rem] pr-[1rem] pb-[15rem] overflow-y-scroll"
        style={{
          backgroundColor: !colorPalette ? "" : colorPalette.black + "C0",
        }}
      >
        <div className="pt-[1.5rem] pb-[1.5rem]">
          <section
            className="text-4xl font-bold flex flex-col justify-center h-full"
            style={{
              color: !colorPalette ? "" : colorPalette.white,
            }}
          >
            {unitName}
            <div className="flex flex-row">
              <span
                className="text-lg italic font-normal"
                style={{
                  color: !colorPalette ? "" : colorPalette.text1 + "C0",
                }}
              >
                {counts.lessons} lessons • {counts.quizzes} quizzes •{" "}
                {counts.tests} tests • {sumPoints(lessons)}
              </span>
              <Image
                src="/assets/icons/flower.png"
                alt="flowers"
                height={0}
                width={0}
                sizes="100vw"
                className="h-[1.4rem] w-[1.4rem] mx-1 brightnes"
              />
            </div>
          </section>
        </div>
        <div className="flex flex-col">
          {lessons.map((lesson) => (
            <Lesson
              key={lesson._id}
              courseId={courseId}
              unitId={unitId}
              lesson={lesson}
              colorPalette={colorPalette}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const lessonCounter = (list) => {
  let lessons = 0;
  let quizzes = 0;
  let tests = 0;

  for (const lesson of list) {
    if (lesson.lessonType === "lesson") {
      lessons++;
    } else if (lesson.lessonType === "quiz") {
      quizzes++;
    } else if (lesson.lessonType === "test") {
      tests++;
    }
  }
  return { lessons, quizzes, tests };
};

const sumPoints = (lessons) => {
  let points = 0;
  for (const lesson of lessons) {
    points += lesson.totalPoints;
  }
  return points;
};
