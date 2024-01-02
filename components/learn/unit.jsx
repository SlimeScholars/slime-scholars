import Image from "next/image";
import Link from "next/link";

export default function Unit({
  colorPalette,
  courseId,
  unitId,
  unitName,
  unitNumber,
  unitPoints,
  unitCount,
  attempted,
}) {

  return (
    <Link
      className={`course-bar-default base
		w-[calc(25%_+_500px)] m-3 h-[100px] p-4 flex flex-col shadow-lg hover-highlight hover:opacity-100 ${!attempted && "opacity-[0.8]"
        }`}
      href={`/courses/${courseId}/units/${unitId}/lessons`}
    >
      <div className="w-full flex items-center justify-between">
        <span className="text-start font-bold text-lg 2xl:text-xl">
          Unit {unitNumber}: {unitName}
        </span>
        <span className="text-end italic font-normal text-gray-400 text-lg 2xl:text-xl">
          {!attempted && "Not started"}
        </span>
      </div>
      <span className="text-start text-md flex flex-row">
        {unitCount.lessons} lessons • {unitCount.quizzes} quizzes •{" "}
        {unitCount.tests} tests • {unitPoints}
        <Image
          src="/assets/icons/flower.png"
          alt="flowers"
          height={0}
          width={0}
          sizes="100vw"
          className="h-[1.4rem] w-[1.4rem] mx-1"
        />
      </span>
    </Link>
  );
}
