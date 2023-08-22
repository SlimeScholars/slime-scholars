import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../utils/toast"
import axios from "axios"
import Course from "../../components/learn/course"

export default function Courses({ user, loading, setLoading }) {
	const router = useRouter()

	useEffect(() => {
		if (loading) {
			return
		}
		if (!user || user.userType !== 1) {
			// router.push('/')
		}
	}, [user, loading])

	const [courses, setCourses] = useState([])

	useEffect(() => {
		try {
			const token = localStorage.getItem('jwt')
			if (!token) {
				return
			}

			// Set the authorization header
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			setLoading(true)
			axios
				.get("/api/learn/courses", config)
				.then((response) => {
					if (response?.data?.courses) {
						setCourses(response.data.courses)
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
	}, [])

	return (
		<div className='w-full min-h-screen flex items-center justify-center bg-red-50'>
			<div className='flex flex-col items-center justify-start w-[40rem] min-h-screen bg-purple-50'>
				<header className="w-full h-30 text-pink-400 flex items-center justify-start flex-col font-galindo">
					<div className="w-full h-15 flex items-center justify-between px-6 py-3 bg-pink-200">
						<p className="text-lg cursor-pointer"
							onClick={() => router.push('/play')
							}
						>
							Back
						</p>
					</div>
					<h1 className="text-3xl mt-8 mb-4">
						Course Select
					</h1>
					<div className="w-full h-[1px] bg-pink-200 mt-3">&nbsp;</div>
				</header>
				<div className="w-full h-full flex flex-col justify-start items-center bg-purple-50 pt-[8vh] pb-[20vh] font-galindo">
					{courses.map((course) => (
						<Course
							key={course._id}
							courseId={course._id}
							courseName={course.courseName}
							courseBadge={course.courseBadge}
							tier={course.tier}
						/>
					))}
				</div>
			</div>
		</div >
	)
}
