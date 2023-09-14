import { useRouter } from "next/router";

export default function Course({ courseId, courseName, courseBadge, tier }) {
	const router = useRouter()

	// TODO: course badges
	const tierClass = {
		0: 'not-started',
		1: 'bronze',
		2: 'silver',
		3: 'gold',
	}

	return (
		<button
			className={`course-bar-default ${tierClass[tier]}`}
			onClick={() => {
				router.push(`/courses/${courseId}/units`)
			}}
		>
			<h3 className="ml-[2rem]">
				{courseName ? courseName : "[Untitled Course]"}
			</h3>
		</button>
	);
}

