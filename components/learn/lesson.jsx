import { useRouter } from "next/router";
import { FaStar, FaRegStar } from 'react-icons/fa'

export default function Lesson({ courseId, unitId, lessonId, lessonName, looted, stars }) {
	const router = useRouter()

	const maxStars = 3
	const tier = looted ? 'text-yellow-300' :
		stars > -1 ? 'text-yellow-100' : 'text-gray-400'

	return (
		<button
			className='w-[80%] h-[7rem] text-2xl flex justify-start items-center bg-slate-200 px-[4rem] mb-7'
			onClick={() => {
				router.push(`/courses/${courseId}/units/${unitId}/lessons/${lessonId}`)
			}}
		>
			<h3 className="w-full grid lesson-card">
				<span className="text-start">
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
