import { useRouter } from "next/router";
import { FaStar, FaRegStar } from 'react-icons/fa'

export default function Lesson({ courseId, unitId, lessonId, lessonName, looted, stars }) {
	const router = useRouter()

	const maxStars = 3
	const tier = looted ? 'text-yellow-300' :
		stars > -1 ? 'text-yellow-100' : 'text-gray-400'

	// TODO: unit badges
	const tierClass = {
		0: 'not-started',
		1: 'bronze',
		2: 'silver',
		3: 'gold',
	}

	return (
		<button
		className={`course-bar-default ${tierClass[0]}
		w-[calc(25%_+_500px)] m-3 h-[100px] px-8 flex flex-col items-center`}
			onClick={() => {
				router.push(`/courses/${courseId}/units/${unitId}/lessons/${lessonId}`)
			}}
		>
			<h3 className="w-full grid lesson-card">
				<span className="text-start text-xl font-bold ">
					{lessonName}
				</span>
				<span className={`flex items-center ${tier}`}>
					{Array.from({ length: maxStars }).map((_, index) => {
						return stars > index ?
							<FaStar
								key={`star-${index}`}
								className='inline text-4xl m-[0.2rem] -mt-2'
							/> :
							<FaRegStar
								key={`star-${index}`}
								className='inline text-4xl m-[0.2rem] -mt-2'
							/>
					})}
				</span>
			</h3>
		</button>
	);
}
