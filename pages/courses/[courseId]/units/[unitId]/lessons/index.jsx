import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../../../../../utils/toast"
import axios from "axios"
import Lesson from "../../../../../../components/learn/lesson"
import Image from "next/image"

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
		setLoading(true)
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
			setLoading(false)
			return;
		}
	}, [router.query.courseId, router.query.unitId])

	if (loading) { return }
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
					}}>{courseName}</span>
				<span>{">>"}</span>
				<span className="hover:text-blue-400 transition-all duration-150"
					onClick={() => {
						router.push(`/courses/${courseId}/units/${unitId}/lessons`)
					}}>{unitName}</span>
			</div>
			<div className="relative z-[1] w-full h-[calc(100vh_-_5rem_-_2.5rem)] flex flex-col pl-[4rem] pr-[1rem] pb-[15rem] overflow-y-scroll"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.text1 + "C0"
				}}>
				<div className="pt-[1.5rem] pb-[1.5rem]">
					<section className="text-4xl font-bold flex flex-col gap-2"
						style={{
							color: !colorPalette ? "" : colorPalette.black
						}}>
						{unitName}
						<div className="flex flex-row">
							<span
								className="brightness-[0.5] text-lg italic font-normal"
								style={{
									color: !colorPalette ? "" : colorPalette.primary1
								}}>27 lessons • 3 quizzes • 1,810</span>
							<Image
								src="/assets/icons/flower.png"
								alt="flowers"
								height={0}
								width={0}
								sizes="100vw"
								className="h-[1.4rem] w-[1.4rem] mx-1 brightnes"
							/>
						</div>
					</section>
				</div>
				<div className="flex flex-col">
					{lessons.map((lesson) => (
						<Lesson
							key={lesson._id}
							courseId={courseId}
							unitId={unitId}
							lesson={lesson}
							colorPalette={colorPalette}
						/>
					))}
				</div>
			</div>
		</div>
	)
}