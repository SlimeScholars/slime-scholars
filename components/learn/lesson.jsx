import { FaStar, FaRegStar } from 'react-icons/fa'
import { BsFillPlayFill } from 'react-icons/bs'
import Image from "next/image";
import Link from "next/link";

const maxStars = [3, 3, 5]

const Activity = ({ courseId, unitId, lesson, activity, }) => {
	return (
		<Link
			className={`${activity.completion ? 'bg-gray-200 border-gray-300' : 'bg-white border-gray-30'} rounded-lg py-2 px-4 w-[95%] course-bar-default border-2 shadow-md`}
			href={`/courses/${courseId}/units/${unitId}/lessons/${lesson._id}/activity/${activity._id}`}
		>
			<div className="flex flex-row justify-between items-center">
				<span>{activity.activityName}</span>
				<span className={`flex flex-row text-gray-500`}>
					{activity.completion ? 'Completed' : ''}
				</span>
			</div>
		</Link>
	)
}

export default function Lesson({ courseId, unitId, lesson, colorPalette }) {
	if (lesson.lessonType === "lesson") {
		return (
			<div
				className={`lesson-bar-default base
		w-[calc(20%_+_500px)] m-3 py-4 px-8 flex flex-col items-center shadow-lg`}>
				<h3 className="w-full lesson-card">
					<div className="flex flex-col gap-2 justify-start text-start ">
						<span className="text-start text-xl font-bold ">
							{lesson?.lessonName}
						</span>
						<div className="flex flex-row items-center text-start text-md">
							{lesson.achievedPoints + '/' + lesson.totalPoints}
							<Image
								src="/assets/icons/flower.png"
								alt="flowers"
								height={0}
								width={0}
								sizes="100vw"
								className="h-[1.4rem] w-[1.4rem] mx-1"
							/>
							Earned
						</div>
						<div className="flex flex-col gap-2 my-4">
							{lesson?.activities && lesson?.activities.map((activity, key) => <Activity key={key} activity={activity}
								courseId={courseId} unitId={unitId} looted={lesson?.looted} lesson={lesson} />)}
						</div>
					</div>
				</h3>
			</div>
		)
	}
	else if (lesson.lessonType === "quiz") {
		return (
			<div className="flex flex-row justify-between items-center w-[calc(20%_+_500px)] m-3 py-6 px-8 relative lesson-bar-default shadow-lg"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.primary1 + "80",
					borderWidth: "4px",
					borderColor: !colorPalette ? "" : colorPalette.primary1 + "80"
				}}>
				<div className="absolute top-0 left-0 rounded-md w-full h-full bg-black/[0.45] z-[100]" />
				<section
					className={`flex flex-col items-center`}>
					<h3 className="z-[200] w-full flex text-start justify-start"
						style={{
							color: !colorPalette ? "" : colorPalette.text1
						}}>
						<div className="flex flex-col gap-2">
							<span className="text-start text-xl font-bold">
								Quiz: {lesson?.lessonName}
							</span>
							<div className="flex flex-row text-start">
								150
								<Image
									src="/assets/icons/flower.png"
									alt="flowers"
									height={0}
									width={0}
									sizes="100vw"
									className="h-[1.4rem] w-[1.4rem] mx-1"
								/>
								Available
							</div>
							<span className={`flex flex-row`}
								style={{
									color: !colorPalette ? "" : colorPalette.text1
								}}>
								{Array.from({ length: maxStars[1] }).map((_, index) => {
									return lesson?.stars > index ?
										<FaStar
											key={`star-${index}`}
											className='inline text-3xl mx-[0.25rem]'
										/> :
										<FaRegStar
											key={`star-${index}`}
											className='inline text-3xl mx-[0.25rem]'
										/>
								})}
							</span>
							<span className="italic">
								Answer 2/5 questions correctly for next star
							</span>
						</div>
					</h3>
				</section>
				<section className="z-[200]">
					<Link
						style={{
							backgroundColor: !colorPalette ? "" : colorPalette.text1,
							color: !colorPalette ? "" : colorPalette.black
						}}
						className="pr-4 py-1 pl-5 rounded-lg text-xl font-bold flex flex-row gap-2 items-center hover:brightness-[1.25] transition-all duration-150"
						href={`/courses/${courseId}/units/${unitId}/lessons/${lesson._id}/assessment/${lesson._id}`}
					>
						Start
						<BsFillPlayFill className="w-[1.5rem] h-[1.5rem]" />
					</Link>
				</section>
			</div>
		)
	}
	else if (lesson.lessonType === "test") {
		return (
			<div className="flex flex-row justify-between items-center w-[calc(20%_+_500px)] m-3 py-6 px-8 relative lesson-bar-default shadow-xl"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.primary1 + "80",
				}}>
				<div className="absolute top-0 left-0 rounded-md w-full h-full bg-black/[0.75] z-[100]"
					style={{
						borderWidth: "4px",
						borderColor: !colorPalette ? "" : colorPalette.black
					}} />
				<section
					className={`flex flex-col items-center`}>
					<h3 className="z-[200] w-full flex text-start justify-start"
						style={{
							color: !colorPalette ? "" : colorPalette.text1
						}}>
						<div className="flex flex-col gap-2">
							<span className="text-start text-xl font-bold">
								Unit Test: {lesson?.lessonName}
							</span>
							<div className="flex flex-row text-start">
								300
								<Image
									src="/assets/icons/flower.png"
									alt="flowers"
									height={0}
									width={0}
									sizes="100vw"
									className="h-[1.4rem] w-[1.4rem] mx-1"
								/>
								Available
							</div>
							<span className={`flex flex-row`}
								style={{
									color: !colorPalette ? "" : colorPalette.text1
								}}>
								{Array.from({ length: maxStars[2] }).map((_, index) => {
									return lesson?.stars > index ?
										<FaStar
											key={`star-${index}`}
											className='inline text-3xl mx-[0.25rem]'
										/> :
										<FaRegStar
											key={`star-${index}`}
											className='inline text-3xl mx-[0.25rem]'
										/>
								})}
							</span>
							<span className="italic">
								Answer 6/20 questions correctly for next star
							</span>
						</div>
					</h3>
				</section>
				<section className="z-[200]">
					<Link
						style={{
							backgroundColor: !colorPalette ? "" : colorPalette.text1,
							color: !colorPalette ? "" : colorPalette.black
						}}
						className="pr-4 py-1 pl-5 rounded-lg text-xl font-bold flex flex-row gap-2 items-center 
				hover:brightness-[1.25] transition-all duration-150"
						href={`/courses/${courseId}/units/${unitId}/lessons/${lesson._id}/assessment/${lesson._id}`}
					>
						Start
						<BsFillPlayFill className="w-[1.5rem] h-[1.5rem]" />
					</Link>
				</section>
			</div>
		)
	}
}
