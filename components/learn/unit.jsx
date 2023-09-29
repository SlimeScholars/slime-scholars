import { useRouter } from "next/router";
import Image from "next/image";

export default function Unit({ colorPalette, courseId, unitId, unitName, unitNumber, unitBadge, tier }) {
	const router = useRouter()

	// TODO: unit badges
	const tierClass = {
		0: 'not-started',
		1: 'bronze',
		2: 'silver',
		3: 'gold',
	}

	return (
		<button
		className={`course-bar-default base
		w-[calc(25%_+_500px)] m-3 h-[100px] p-4 flex flex-col`}
			onClick={() => {
				router.push(`/courses/${courseId}/units/${unitId}/lessons`)
			}}
		>
			<span className="text-start font-bold text-xl">
				Unit {unitNumber}: {unitName}
			</span>
			<span className="text-start text-md flex flex-row">
				27 lessons • 3 quizzes • 1,250 
				<Image
				src="/assets/icons/flower.png"
				alt="flowers"
				height={0}
				width={0}
				sizes="100vw"
				className="h-[1.4rem] w-[1.4rem] mx-1"
				/>
			</span>
		</button>
	);
}
