import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { showToastError } from "../../../../../../../../../utils/toast";
import axios from "axios";
import { activityService } from "../../../../../../../../../services";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { AiOutlineRedo } from "react-icons/ai";
import Section from "../../../../../../../../../components/activity/section";
import Image from "next/image";

const LOADIN_MAXFRAMES = 9;
const LOADIN_DELAY = 150;
const LOADIN_INCREMENT = 15;

export default function Activity({ user, loading, setLoading, colorPalette }) {
  const router = useRouter();

  // useEffect(() => {
  // 	if (loading) {
  // 		return
  // 	}
  // 	if (!user || user.userType !== 1) {
  // 		router.push('/')
  // 	}
  // }, [user, loading])

  useEffect(() => {
    setActivityId(router.query.activityId);
  }, [router.query.activityId]);

  const [loadState, setLoadState] = useState(-1);

  const [activityId, setActivityId] = useState(router.query.activityId);
  const [activity, setActivity] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [unitName, setUnitName] = useState(null);
  const [unitLessons, setUnitLessons] = useState(null);
  const [lessonName, setLessonName] = useState(null);
  const [lessonActivities, setLessonActivities] = useState([]);

  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(0);
  const [maxPage, setMaxPage] = useState(0);

  const [updateFlowers, setUpdateFlowers] = useState({
    old: user?.flowers,
    new: user?.flowers,
    inc: 0,
  });

  useEffect(() => {
    if (activity) {
      if (page === null && activity.pages.length > 0) {
        setPage(0);
      }
    }
  }, [activity]);

  useEffect(() => {
    setMaxPage((prev) => {
      setOpen(page < prev ? activity.pages[page].sections.length - 1 : 0);
      return Math.max(prev, page);
    });
    if (page < maxPage) {
      var scrollContainer = document.getElementById("container-activity-index");
      setTimeout(() => {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
    }
  }, [page]);

  useEffect(() => {
    setPage(0);
    setOpen(0);
    setMaxPage(0);
    if (activityId) {
      setLoadState(LOADIN_MAXFRAMES);
      setTimeout(() => {
        fetch();
      }, 500);
    }
  }, [activityId]);

  useEffect(() => {
    if (loadState >= 0) {
      setTimeout(() => {
        setLoadState((prev) => prev - 1);
      }, LOADIN_DELAY + loadState * LOADIN_INCREMENT);
    }
  }, [loadState]);

  const fetch = async () => {
    try {
      const response = await activityService.get(activityId);
      setActivity(response.data.activity[0]);
      //console.log(response.data.activity[0])

      const token = localStorage.getItem("jwt");
      if (!token) {
        return;
      }
      const config = {
        params: {
          courseId: router.query.courseId,
          unitId: router.query.unitId,
          lessonId: router.query.lessonId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .get("/api/learn/activities", config)
        .then((response) => {
          console.log(response.data);
          setCourseName(response.data.courseName);
          setUnitName(response.data.unitName);
          setUnitLessons(response.data.lessons);
          setLessonName(response.data.lessonName);
          setLessonActivities(response.data.activities);
        })
        .catch((error) => {
          if (error?.response?.data?.message) {
            showToastError(error.response.data.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const arrows = {
      ArrowLeft: 37,
      ArrowUp: 38,
      ArrowRight: 39,
      ArrowDown: 40,
    };

    const handleKeyDown = (e) => {
      if (
        e.code === "Enter" ||
        e.keyCode === arrows["ArrowRight"] ||
        e.keyCode === arrows["ArrowUp"] ||
        e.code === "Space"
      ) {
        setOpen((prev) => {
          var scrollContainer = document.getElementById(
            "container-activity-index"
          );
          setTimeout(() => {
            scrollContainer.scrollTo({
              top: scrollContainer.scrollHeight,
              behavior: "smooth",
            });
          }, 200);
          if (
            activity &&
            activity.pages &&
            activity.pages[page] &&
            activity.pages[page].sections &&
            prev + 1 > activity.pages[page].sections.length - 1
          ) {
            setPage((prev) => {
              return prev + 1 > activity.pages.length ? prev : prev + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      } else if (
        e.code === "Backspace" ||
        e.keyCode === arrows["ArrowLeft"] ||
        e.keyCode === arrows["ArrowDown"]
      ) {
        setOpen((prev) => {
          var scrollContainer = document.getElementById(
            "container-activity-index"
          );
          setTimeout(() => {
            scrollContainer.scrollTo({
              top: prev - 1 <= 0 ? 0 : scrollContainer.scrollHeight,
              behavior: "smooth",
            });
          }, 200);
          if (
            activity &&
            activity.pages &&
            activity.pages[page] &&
            prev - 1 < 0
          ) {
            setPage((prev) => {
              return prev - 1 < 0 ? prev : prev - 1;
            });
            return 0;
          }
          return prev - 1;
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activity, page]);

  useEffect(() => {
    if (activity && page === activity.pages.length) {
      const token = localStorage.getItem("jwt");
      if (!token) {
        return;
      }
      axios
        .post(
          "/api/learn/activity/complete",
          {
            courseId: router.query.courseId,
            unitId: router.query.unitId,
            activityId: activityId,
            score: 1, //change this for partial completions
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setUpdateFlowers({
            old: response.data.oldFlowers,
            new: response.data.newFlowers,
            inc: response.data.score,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [page]);

  const fullLoad = () =>
    activity &&
    courseName &&
    unitName &&
    lessonName &&
    lessonActivities &&
    lessonActivities.length > 0;

  if (loading) {
    return;
  }
  return (
    <>
      <div
        className={`absolute top-[-6rem] left-0 w-full h-[calc(100vh_+_6rem)] bg-black text-white 
		${!fullLoad() || loadState > -1 ? "z-[500] opacity-1" : "z-[-1] opacity-0"} 
		flex flex-col gap-8 items-center justify-center text-4xl`}
      >
        <div className="flex flex-col gap-2 items-center justify-center font-galindo">
          <img
            src="/assets/misc/slime-loader.gif"
            className="mt-[-200px] w-[400px] h-[400px]"
          />
          <div className="flex flex-row gap-2">
            Building Activity
            <div id="loading-wave">
              <span className="dot bg-white"></span>
              <span className="dot bg-white"></span>
              <span className="dot bg-white"></span>
            </div>
          </div>
          <div className="relative rounded-full w-[350px] h-[12px] bg-neutral-500 overflow-hidden z-[510] mt-5">
            <div
              className="absolute top-0 left-0 z-[520] h-full transition-all duration-[0.18s] ease-in-out"
              style={{
                backgroundColor: colorPalette.text1,
                width: `${(
                  (loadState > -1
                    ? (170 * (LOADIN_MAXFRAMES - loadState)) / LOADIN_MAXFRAMES
                    : fullLoad()
                      ? 170
                      : 0) +
                  100 * (activity ? 1 : 0) +
                  20 * (courseName ? 1 : 0) +
                  20 * (unitName ? 1 : 0) +
                  20 * (lessonName ? 1 : 0) +
                  20 * (lessonActivities && lessonActivities.length > 0 ? 1 : 0)
                ).toFixed(0)}px`,
              }}
            />
          </div>
        </div>
      </div>
      <div
        className="relative"
        style={{
          backgroundColor: !colorPalette ? "" : colorPalette.primary2 + "50",
          display: "grid",
          gridTemplateColumns:
            window.innerWidth > 1536 ? "300px auto" : "240px auto",
        }}
      >
        <div
          className="absolute w-full h-full"
          style={{
            backgroundColor: !colorPalette ? "" : colorPalette.primary1 + "60",
          }}
        />
        <div
          className="absolute w-full h-full"
          style={{
            backgroundColor: !colorPalette ? "" : colorPalette.black + "90",
          }}
        />
        <div className="flex flex-col">
          <div
            className="w-full h-1"
            style={{
              backgroundColor: !colorPalette
                ? ""
                : colorPalette.primary1 + "80",
            }}
          />
          <div
            className="relative z-[1] w-full h-[calc(100vh_-_5rem)] flex flex-col py-4 pl-8 pr-8 rounded-r-md"
            style={{
              backgroundColor: !colorPalette ? "" : colorPalette.black + "80",
              color: colorPalette.white,
            }}
          >
            <div
              className="text-[0.8em] 2xl:text-sm mb-2 hover:text-blue-400 transition-all duration-150"
              onClick={() => {
                router.push(`/courses/${router.query.courseId}/units/
						${router.query.unitId}/lessons`);
              }}
            >
              &lt;&lt; Back to Lessons
            </div>
            <div className="text-lg 2xl:text-2xl font-bold">{lessonName}</div>
            <div className="text-sm 2xl:text-md ml-1 2xl:ml-2">
              {courseName}
            </div>
            <div className="text-sm 2xl:text-md ml-1 2xl:ml-2">{unitName}</div>
            <div
              className="flex flex-col gap-3 2xl:gap-4 mt-4 px-3 2xl:px-4 py-2 2xl:py-3 rounded-md"
              style={{
                backgroundColor: colorPalette.primary1 + "60",
              }}
            >
              {lessonActivities.map((item, key) => {
                return (
                  <button
                    className={`flex flex-row justify-between items-center text-sm 2xl:text-md`}
                    onClick={() => {
                      router.push(`/courses/${router.query.courseId}/units/
								${router.query.unitId}/lessons/
								${router.query.lessonId}/activity/${item._id}`);
                    }}
                    key={key}
                  >
                    <span
                      className={`text-left text-md ${item._id === activityId
                        ? "font-extrabold 2xl:font-black"
                        : ""
                        }`}
                    >
                      {item.activityName}
                    </span>
                    {item._id !== activityId && (
                      <div
                        className={`relative transition-all duration-150 arrow-container px-1 py-1 
								arrow-container cursor-pointer`}
                      >
                        <div className="z-[40] transition-all duration-150 sub-arrow">
                          <BiSolidRightArrow />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="relative z-[1] w-full h-[calc(100vh_-_5rem)]">
          {activity && (
            <div
              className={`flex flex-col gap-4 w-full h-full transition-colors duration-300`}
            >
              {activity.pages.length > 0 ? (
                <div
                  className="w-full px-[calc(1vw_+_16px)] xl:px-[calc(2vw_+_32px)] 3xl:px-[calc(3vw_+_48px)] h-full"
                  style={{
                    display: "grid",
                    gridTemplateRows: "93% 7%",
                  }}
                >
                  <section className="relative z-[5] p-2">
                    <div
                      className="absolute top-0 left-0 w-full h-full"
                      style={{
                        backgroundColor: colorPalette.text1 + "A0",
                      }}
                    />
                    <div
                      id="container-activity-index"
                      className="relative overflow-y-scroll h-full flex flex-col gap-3 pb-10 z-[15]"
                    >
                      {page < activity.pages.length &&
                        activity.pages[page].sections.length > 0 && (
                          <div
                            className="rounded-md text-center transition-all duration-150 
										origin-center animate-pulse"
                            style={{
                              backgroundColor: colorPalette.white + "A0",
                              color: colorPalette.black,
                              transform: `scaleY(${open === 0 ? 1 : 0})`,
                              height: open === 0 ? "auto" : "0px",
                              paddingTop: open === 0 ? "0.25rem" : "0px",
                            }}
                          >
                            <div
                              className="text-sm activity-helper-text"
                              style={{
                                color: colorPalette.primary1,
                              }}
                            >
                              Press ENTER to continue
                            </div>
                          </div>
                        )}
                      {page < activity.pages.length ? (
                        activity.pages[page].sections.map((section, key) => (
                          <div key={key}>
                            {open >= key ? (
                              <Section
                                section={section}
                                colorPalette={colorPalette}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        ))
                      ) : (
                        <div
                          className="relative flex items-center justify-center rounded-md p-4 text-center w-full h-full overflow-hidden"
                          style={{
                            backgroundColor: colorPalette.white,
                          }}
                        >
                          <div>
                            <img
                              src={"/assets/misc/minion-happy.gif"}
                              className="absolute top-0 left-0 rounded-md fade-in-element"
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div
                            className="z-[250] absolute top-[-35%] left-[20%]
										rounded-md rounded-l-full w-[80%] h-[170%] fade-in-right-index bg-gradient-to-r from-black/[0.55] to-black/[0.9]"
                            style={{
                              backgroundColor: colorPalette.primary1 + "90",
                            }}
                          ></div>
                          <div className="z-[350] w-full fade-in-right-index">
                            <div className="flex flex-row justify-end w-full px-8">
                              <section className="flex flex-col gap-8 text-right fade-in-bottom-index text-white">
                                <div className="flex flex-col gap-1">
                                  <span className="text-4xl font-extrabold">
                                    Activity Complete!
                                  </span>
                                  <span className="text-xl italic">
                                    {activity.activityName}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-lg">
                                    Daily Rewards Claimed
                                  </span>
                                  <span className="flex flex-row justify-end">
                                    <Image
                                      src="/assets/icons/flower.png"
                                      alt="flowers"
                                      height={0}
                                      width={0}
                                      sizes="100vw"
                                      className="2xl:h-[1.7rem] 2xl:w-[1.7rem] h-[1.4rem] w-[1.4rem] 2xl:ml-1 mr-2 -mt-0.5"
                                    />
                                    {updateFlowers.old || 0} &rarr;{" "}
                                    {updateFlowers.new || 0}
                                    <span className="ml-2 text-green-400">
                                      +{updateFlowers.inc || 0}
                                    </span>
                                  </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <div
                                    className="flex flex-row gap-1 items-center justify-end hover:text-blue-400 transition-all duration-200 text-right"
                                    onClick={() => {
                                      setPage(0);
                                      setOpen(0);
                                      setMaxPage(0);
                                      setLoadState(LOADIN_MAXFRAMES);
                                    }}
                                  >
                                    <span>Retry This Activity</span>
                                    <AiOutlineRedo className="rotate-90" />
                                  </div>
                                  {(() => {
                                    for (let i in lessonActivities) {
                                      if (
                                        lessonActivities[i]._id ===
                                        activity._id &&
                                        i < lessonActivities.length - 1
                                      ) {
                                        return (
                                          <span
                                            onClick={() => {
                                              router.push(`/courses/${router.query.courseId
                                                }/units/
																		${router.query.unitId}/lessons/${router.query.lessonId}/activity/${lessonActivities[Number(i) + 1]
                                                  ._id
                                                }`);
                                            }}
                                            className="hover:text-blue-400 transition-all duration-200"
                                          >
                                            Next Activity:{" "}
                                            <b>
                                              {
                                                lessonActivities[Number(i) + 1]
                                                  .activityName
                                              }
                                            </b>{" "}
                                            &gt;&gt;
                                          </span>
                                        );
                                      }
                                    }
                                    return (
                                      <span
                                        onClick={() => {
                                          router.push(`/courses/${router.query.courseId}/units/
																${router.query.unitId}/lessons`);
                                        }}
                                        className="hover:text-blue-400 transition-all duration-200"
                                      >
                                        Back to Lessons &gt;&gt;
                                      </span>
                                    );
                                  })()}
                                </div>
                              </section>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                  <section
                    className="relative z-[20] flex flex-row justify-between items-center shadow-lg px-5"
                    style={{
                      backgroundColor: colorPalette.primary1 + "A0",
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-white/[0.35] z-[21]" />
                    <section className="flex flex-row items-center gap-2 z-[22]">
                      <div
                        className="relative rounded-full w-[200px] h-[0.5rem]"
                        style={{
                          backgroundColor: colorPalette.text1 + "A0",
                        }}
                      >
                        <div
                          className="absolute top-[0px] left-[0px] rounded-full h-[0.5rem] transition-all duration-150 ease-out"
                          style={{
                            backgroundColor: colorPalette.text1,
                            width: `${(200 * page) / activity.pages.length}px`,
                          }}
                        />
                      </div>
                      <span
                        className="font-semibold text-sm"
                        style={{ color: colorPalette.white }}
                      >
                        {`${activity.pages && activity.pages.length > 0
                          ? ((100 * page) / activity.pages.length).toFixed(0)
                          : 100
                          }`}
                        %
                      </span>
                    </section>
                    <section className="flex flex-row gap-2 items-center text-md origin-center scale-90 z-[22]">
                      <button
                        className="text-md"
                        disabled={page === 0}
                        onClick={() => {
                          setPage((prev) => prev - 1);
                        }}
                      >
                        <BiSolidLeftArrow
                          className={
                            (page === 0
                              ? "text-neutral-400 cursor-not-allowed"
                              : "text-neutral-100 hover:text-white") +
                            " transition-all duration-150"
                          }
                        />
                      </button>
                      <input
                        className="text-md w-[4rem] text-center font-semibold rounded-md"
                        value={
                          activity.pages
                            ? page < activity.pages.length
                              ? page + 1
                              : "✓"
                            : ""
                        }
                        disabled={true}
                        style={{
                          color: colorPalette.black,
                          backgroundColor: colorPalette.white,
                        }}
                      ></input>
                      <button
                        className="text-md"
                        disabled={page === activity.pages.length}
                        onClick={() => {
                          setPage((prev) => prev + 1);
                        }}
                      >
                        <BiSolidRightArrow
                          className={
                            (page === activity.pages.length
                              ? "text-neutral-400 cursor-not-allowed"
                              : "text-neutral-100 hover:text-white") +
                            " transition-all duration-150"
                          }
                        />
                      </button>
                    </section>
                  </section>
                </div>
              ) : (
                <div className="w-full rounded-md px-[calc(8vw_+_40px)] h-full">
                  <section
                    className="flex flex-col gap-2 items-center justify-center relative z-[5] 
							rounded-t-md p-4 h-full"
                  >
                    <div
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      style={{
                        backgroundColor: colorPalette.text1 + "C0",
                      }}
                    />
                    <span className="text-black text-2xl z-[10]">
                      This activity is empty!
                    </span>
                    <span className="text-black text-lg z-[10]">
                      Someone must fill this up with pages, sections, elements,
                      etc...
                    </span>
                  </section>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}