import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { showToastError } from "../../../../utils/toast";
import axios from "axios";
import Unit from "../../../../components/learn/unit";
import Image from "next/image";

export default function Units({
  user,
  loading,
  setLoading,
  setAxiosLoading,
  colorPalette,
}) {
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
  const [units, setUnits] = useState([]);
  const [courseName, setCourseName] = useState(null);
  const [counts, setCounts] = useState({ lessons: 0, quizzes: 0, tests: 0 });

  useEffect(() => {
    setLoading(true);
    try {
      if (!router.query.courseId) {
        return;
      }
      setCourseId(router.query.courseId);

      const token = localStorage.getItem("jwt");
      if (!token) {
        return;
      }

      // Set the authorization header
      const config = {
        params: {
          courseId: router.query.courseId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setAxiosLoading(true);
      axios
        .get("/api/learn/units", config)
        .then((response) => {
          if (response?.data?.units) {
            setCourseName(response.data.courseName);
            setUnits(response.data.units);
            setTimeout(() => {setLoading(false)}, 150);
          }
        })
        .catch((error) => {
          if (error?.response?.data?.message) {
            showToastError(error.response.data.message);
          }
          setTimeout(() => {setLoading(false)}, 150);
        });
    } catch (error) {
      showToastError(error.message);
      setTimeout(() => {setLoading(false)}, 150);
      return;
    }
  }, [router.query.courseId]);

  useEffect(() => {
    if (units.length === 0) {
      return;
    }
    setCounts(sumLessonsAndQuizzes(units));
  }, [units]);

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
      </div>
      <div
        className="relative z-[1] w-full h-[calc(100vh_-_5rem_-_2.5rem)] flex flex-col pl-[3rem] 2xl:pl-[3.75rem] pr-[1rem] pb-[15rem] overflow-y-scroll"
        style={{
          backgroundColor: !colorPalette ? "" : colorPalette.black + "C0",
        }}
      >
        <div className="flex flex-row gap-4 pt-[1.5rem] pb-[1.5rem]">
          <div
            className="justify-self-center flex items-center justify-center border-2 rounded-full
				w-20 h-20"
            style={{
              backgroundColor: !colorPalette ? "" : colorPalette.primary2,
            }}
          >
            <Image
              src="/assets/slimes/slime-static/blue-slime.png"
              alt="blue slime"
              width={200}
              height={200}
              className="w-16 h-16"
            />
          </div>
          <section
            className="text-4xl font-bold flex flex-col justify-center h-full"
            style={{
              color: !colorPalette ? "" : colorPalette.white,
            }}
          >
            {courseName}
            <div className="flex flex-row">
              <span
                className="text-lg italic font-normal"
                style={{
                  color: !colorPalette ? "" : colorPalette.text1 + "C0",
                }}
              >
                {units.length} units • {sumPoints(units)}
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
          {units.map((unit) => (
            <Unit
              key={unit._id}
              unitId={unit._id}
              courseId={courseId}
              unitName={unit.unitName}
              unitNumber={unit.unitNumber}
              unitPoints={unit.totalPoints}
              unitCount={unit.count}
              colorPalette={colorPalette}
              tier={unit.tier}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const sumLessonsAndQuizzes = (units) => {
  let lessons = 0;
  let quizzes = 0;
  let tests = 0;
  console.log(units);
  units.forEach((unit) => {
    lessons += unit.count.lessons;
    quizzes += unit.count.quizzes;
    tests += unit.count.tests;
  });
  return { lessons, quizzes, tests };
};

const sumPoints = (units) => {
  return units.reduce((accumulator, unit) => {
    return accumulator + unit.totalPoints;
  }, 0);
};
