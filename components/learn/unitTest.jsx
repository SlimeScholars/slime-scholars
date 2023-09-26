import { useRouter } from "next/router";
import { FaStar, FaRegStar } from 'react-icons/fa'

export default function UnitTest({ courseId, unitId, unitName, stars }) {
	const router = useRouter()

	const maxStars = 3
	const tier = stars > -1 ? 'text-yellow-300' : 'text-gray-400'

	return (
		<button
			className={`course-bar-default bg-slate-300 border-2 border-slate-400`}
			onClick={() => {
				router.push(`/courses/${courseId}/units/${unitId}/unit-test`)
			}}
		>
			<h3 className="w-full grid lesson-card">
				<span className="text-start">
					Unit Test: {unitName}
				</span>
				<span className={`flex items-center base`}>
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

