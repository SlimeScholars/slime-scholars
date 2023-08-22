import { FaStar, FaRegStar } from 'react-icons/fa'
import Modal from './modal'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

export default function Stars({ stars }) {
	const maxStars = 3
	return (
		<div className='my-2'>
			{Array.from({ length: maxStars }).map((_, index) => {
				return stars > index ?
					<FaStar
						key={`star-${index}`}
						className='inline text-3xl m-2 text-yellow-300'
					/> :
					<FaRegStar
						key={`star-${index}`}
						className='inline text-3xl m-2'
					/>
			})}
			<Modal
				preview={
					<AiOutlineQuestionCircle className="text-xl" />
				}
				content={
					<div className="flex flex-col items-start justify-center">
						<p className="text-2xl mb-2">Requirements for each star level:</p>
						<ul className="list-disc text-left text-lg pl-6">
							<li>1 star: 2/4 questions correct</li>
							<li>2 stars: 3/4 questions correct</li>
							<li>3 stars: 4/4 questions correct</li>
						</ul>
					</div>
				}
			/>
		</div>
	)
}

