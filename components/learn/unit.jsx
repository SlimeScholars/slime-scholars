import { useRouter } from "next/router";

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
		className={`course-bar-default ${tierClass[tier]}
		w-[calc(25%_+_500px)] m-3 h-[100px] p-4 flex flex-col`}
			onClick={() => {
				router.push(`/courses/${courseId}/units/${unitId}/lessons`)
			}}
		>
			<span className="text-start font-bold text-xl">
				Unit {unitNumber}: {unitName}
			</span>
			<span className="text-start text-md">
				27 lessons • 3 quizzes • 1,250 flowers
			</span>
		</button>
	);
}
