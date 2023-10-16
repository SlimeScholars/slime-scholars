import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../utils/toast"
import axios from "axios"
import Course from "../../components/learn/course"

export default function Courses({ user, loading, setLoading, colorPalette }) {
	const router = useRouter()

	useEffect(() => {
		if (loading) {
			return
		}
		if (!user || user.userType !== 1) {
			//router.push('/')
		}
	}, [user, loading])

	const [courses, setCourses] = useState([])

	useEffect(() => {
		setLoading(true)
		try {
			const token = localStorage.getItem('jwt')
			if (!token) {
				return
			}

			// Set the authorization header
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					apiKey: process.env.API_KEY,
				},
			};
			axios
				.get("/api/learn/courses", config)
				.then((response) => {
					if (response?.data?.courses) {
						setCourses(response.data.courses)
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
	}, [])

	useEffect(() => {
		if (courses.length > 0) {
			setLoading(false)
		}
	}, [courses])

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
			</div>
			<div className="relative z-[1] w-full h-[calc(100vh_-_5rem_-_2.5rem)] flex flex-col pl-[4rem] pr-[1rem] pb-[15rem] overflow-y-scroll"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.text1 + "C0"
				}}>
				<div className="pt-[1.5rem] pb-[1.5rem]">
					<section className="text-4xl font-bold"
						style={{
							color: !colorPalette ? "" : colorPalette.black
						}}>
						Courses
					</section>
				</div>
				<div className="flex flex-row flex-wrap">
					{courses.map((course) => (
						//TRIPLE THE COURSES FOR VIEW

						<Course
							key={course._id}
							courseId={course._id}
							courseName={course.courseName}
							courseBadge={course.courseBadge}
							colorPalette={colorPalette}
							tier={course.tier}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
