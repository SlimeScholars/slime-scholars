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
			router.push('/')
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

	return (
		<div className='w-full min-h-screen flex items-center justify-center' style={{
			backgroundImage:
				!colorPalette ? "" : `url('/assets/backgrounds/${colorPalette.bg}')`,
			backgroundSize: "cover",
		}}>
			<div className='flex flex-col items-center justify-start w-[60%] min-h-screen'
			style={{
				backgroundColor:!colorPalette ? "" : colorPalette.primary1 + "F0"
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
					</div>
					<h1 className="text-3xl mt-8 mb-4">
						Course Select
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
