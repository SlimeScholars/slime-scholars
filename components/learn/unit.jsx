import { useRouter } from "next/router";

export default function Unit({ courseId, unitId, unitName, unitBadge, tier }) {
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
			className={`w-[80%] h-[7rem] text-3xl flex justify-start items-center ${tierClass[tier]} mb-7`}
			onClick={() => {
				router.push(`/courses/${courseId}/units/${unitId}/lessons`)
			}}
		>
			<h3 className="ml-[4rem]">
				{unitName}
			</h3>
		</button>
	);
}
