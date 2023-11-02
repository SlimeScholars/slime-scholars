import { useRouter } from "next/router";
import Image from "next/image";

export default function Course({
  courseId,
  courseName,
  courseBadge,
  tier,
  colorPalette,
  course,
}) {
  const router = useRouter();

  console.log(course)

  return (
    <button
      className={`course-bar-default course-grid base
			 w-[calc(32%_-_1.5rem)] m-5 h-[125px] items-center shadow-lg hover-highlight`}
      onClick={() => {
        router.push(`/courses/${courseId}/units`);
      }}
    >
      <div
        className="justify-self-center flex items-center justify-center border-2 rounded-full
			 w-14 h-14 xl:w-[4.25rem] xl:h-[4.25rem] 2xl:w-20 2xl:h-20"
        style={{
          backgroundColor: !colorPalette ? "" : colorPalette.primary2,
        }}
      >
        <Image
          src="/assets/slimes/slime-static/blue-slime.png"
          alt="blue slime"
          width={200}
          height={200}
          className="w-[2.75rem] h-[2.75rem] xl:w-[3.25rem] xl:h-[3.25rem] 2xl:w-16 2xl:h-16"
        />
      </div>
      <div className="text-start flex flex-col gap-0 2xl:gap-2">
        <span className="text-lg 2xl:font-xl font-bold">
          {courseName ? courseName : "[Untitled Course]"}
        </span>
        <span className="text-sm 2xl:text-md font-normal">
          Progress: {course ? `${course.totalPoints > 0 ? (100 * (course.achievedPoints/course.totalPoints)).toFixed(0) : 0}%` : "Loading..."}
        </span>
        <div className="w-[90%] h-[0.5rem] bg-black/[0.4] rounded-full overflow-hidden mt-1 2xl:mt-0">
          <div
            className={`h-[0.5rem] transition-all duration-150 brightness-125`}
            style={{
              backgroundColor: !colorPalette ? "" : colorPalette.primary2,
              width: `${(course && course.totalPoints > 0) ? (100 * (course.achievedPoints/course.totalPoints)).toFixed(2) : 0}%`
            }}
          />
        </div>
      </div>
    </button>
  );
}
