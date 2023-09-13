import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../../../../../utils/toast"
import axios from "axios"
import Lesson from "../../../../../../components/learn/lesson"
import UnitTest from "../../../../../../components/learn/unitTest"

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
	const [unitTestStars, setUnitTestStars] = useState(-1)

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
					setUnitTestStars(response.data.unitTestStars)
					if (response?.data?.lessons) {
						setCourseName(response.data.courseName)
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
		<div className='w-full min-h-screen flex items-center justify-center' style={{
			backgroundImage:
				!colorPalette ? "" : `url('/assets/backgrounds/${colorPalette.bg}')`,
			backgroundSize: "cover",
		}}>
			<div className='flex flex-col items-center justify-start w-[60%] min-h-screen'
			style={{
				backgroundColor:!colorPalette ? "" : colorPalette.primary1
			}}>
				<header className="w-full h-30 flex items-center justify-start flex-col font-galindo"
				style={{
					color:!colorPalette ? "" : colorPalette.text1
				}}>
					<div className="w-full h-15 flex items-center justify-between px-6 py-3"
					style={{
						backgroundColor:!colorPalette ? "" : colorPalette.black
					}}>
						<p className="text-lg cursor-pointer"
							onClick={() => router.push('/play')
							}
						>
							Home
						</p>
						<p className="text-right text-lg cursor-pointer">
							<span
							className="hover:brightness-[0.8] transition-all duration-150"
							onClick={() => {
								router.push(`/courses/${courseId}/units`)
							}}>{courseName}</span>
							{courseName && unitName ? " / " : ""}
							<span
							onClick={() => {
							}}>{unitName}</span>
						</p>
					</div>
					<h1 className="text-3xl mt-8 mb-4">
						Lesson Select
					</h1>
					<div className="w-full h-[1px] mt-3"
					style={{
						backgroundColor:!colorPalette ? "" : colorPalette.primary2
					}}>&nbsp;</div>
				</header>
				<div className="w-full h-full flex flex-col justify-start items-center pt-8 pb-16 gap-4 font-galindo"
				style={{
					backgroundColor:!colorPalette ? "" : colorPalette.primary2
				}}>
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
					<UnitTest
						key={unitId}
						courseId={courseId}
						unitId={unitId}
						unitName={unitName}
						stars={unitTestStars}
					/>
				</div>
			</div>
		</div >
	)
}
