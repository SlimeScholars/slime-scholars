import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../../../../../utils/toast"
import axios from "axios"
import Lesson from "../../../../../../components/learn/lesson"

export default function Lessons({ user, loading, setLoading, colorPalette }) {
	const router = useRouter()

	useEffect(() => {
		if (loading) {
			return
		}
		if (!user || user.userType !== 1) {
			router.push('/')
		}
	}, [user, loading])

	const [courseId, setCourseId] = useState(router.query.courseId)
	const [unitId, setUnitId] = useState(router.query.unitId)
	const [lessons, setLessons] = useState([])
	const [courseName, setCourseName] = useState(null)
	const [unitName, setUnitName] = useState(null)
	const [unitNumber, setUnitNumber] = useState(null)

	useEffect(() => {
		try {
			if (!router.query.courseId || !router.query.unitId) {
				return
			}
			setCourseId(router.query.courseId)
			setUnitId(router.query.unitId)

			const token = localStorage.getItem('jwt')
			if (!token) {
				return
			}

			// Set the authorization header
			const config = {
				params: {
					courseId: router.query.courseId,
					unitId: router.query.unitId,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			setLoading(true)
			axios
				.get("/api/learn/lessons", config)
				.then((response) => {
					console.log(response)
					if (response?.data?.lessons) {
						setCourseName(response.data.courseName)
						setUnitNumber(response.data.unitNumber)
						setUnitName(response.data.unitName)
						setLessons(response.data.lessons)
						setLoading(false);
					}
				})
				.catch((error) => {
					if (error?.response?.data?.message) {
						showToastError(error.response.data.message)
					}
					setLoading(false);
				})

		} catch (error) {
			showToastError(error.message);
			return;
		}
	}, [router.query.courseId, router.query.unitId])

	return (
		<div
		style={{
			backgroundColor: !colorPalette ? "" : colorPalette.primary2 + "50"
		}}>
		<div className="h-[2.5rem] bg-white flex flex-row gap-3 items-center pl-[4rem]">
			<span className="hover:text-blue-400 transition-all duration-150"
			onClick={() => {
				router.push(`/courses`)
			}}>Courses </span>
			<span>{">>"}</span>
			<span className="hover:text-blue-400 transition-all duration-150"
			onClick={() => {
				router.push(`/courses/${courseId}/units`)
			}}>{unitName}</span>
			<span>{">>"}</span>
			<span className="hover:text-blue-400 transition-all duration-150"
			onClick={() => {
				router.push(`/courses/${courseId}/units/${unitId}/lessons`)
			}}>{unitName}</span>
		</div>
		<div className="w-full h-screen flex flex-col pl-[4rem] pr-[1rem] overflow-y-scroll">
			<div className="pt-[1.5rem] pb-[1.5rem]">
				<section className="text-4xl font-bold flex flex-col gap-2"
				style={{
					color: !colorPalette ? "" : colorPalette.black
				}}>
					Unit {unitNumber}: {unitName}
					{/* <span 
					className="brightness-[0.5] text-lg italic font-normal"
					style={{
					color: !colorPalette ? "" : colorPalette.primary1
					}}>135 lessons • 15 quizzes • 6,250 flowers</span> */}
				</section>
			</div>
			<div className="flex flex-col">
				{lessons.map((lesson) => (
					<Lesson
						key={lesson._id}
						courseId={courseId}
						unitId={unitId}
						lessonId={lesson._id}
						lessonName={lesson.lessonName}
						looted={lesson.looted}
						stars={lesson.stars}
					/>
				))}
			</div>
		</div>
		</div>
	)
}