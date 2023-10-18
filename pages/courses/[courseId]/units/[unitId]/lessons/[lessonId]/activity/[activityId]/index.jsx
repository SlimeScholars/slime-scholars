import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../../../../../../../../utils/toast"
import axios from "axios"
import { activityService } from "../../../../../../../../../services"
import DisplayActivity from "../../../../../../../../../components/learn/display/displayActivity"

export default function Activity({ user, loading, setLoading, colorPalette }) {
	const router = useRouter()

	// useEffect(() => {
	// 	if (loading) {
	// 		return
	// 	}
	// 	if (!user || user.userType !== 1) {
	// 		router.push('/')
	// 	}
	// }, [user, loading])

	useEffect(() => {
		setActivityId(router.query.activityId)
	}, [router.query.activityId])

	const [activityId, setActivityId] = useState(router.query.activityId)
	const [activity, setActivity] = useState(null)
	const [courseName, setCourseName] = useState(null)
	const [unitName, setUnitName] = useState(null)
	const [lessonName, setLessonName] = useState(null)
	const [lessonActivities, setLessonActivities] = useState([])

	useEffect(() => {
		if (activityId) { fetch() }
	}, [activityId])

	const fetch = async () => {
		setLoading(true)
		try {
			const response = await activityService.get(activityId)
			setActivity(response.data.activity[0])
			console.log(response.data.activity[0])

			const token = localStorage.getItem('jwt')
			if (!token) {
				return
			}
			const config = {
				params: {
					courseId: router.query.courseId,
					unitId: router.query.unitId,
					lessonId: router.query.lessonId
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			axios
				.get("/api/learn/activities", config)
				.then((response) => {
					console.log(response.data)
					setCourseName(response.data.courseName)
					setUnitName(response.data.unitName)
					setLessonName(response.data.lessonName)
					setLessonActivities(response.data.activities)
					setLoading(false);
				})
				.catch((error) => {
					if (error?.response?.data?.message) {
						showToastError(error.response.data.message)
					}
					setLoading(false);
				})
			setLoading(false)
		}
		catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

	if (loading) { return }
	return (
		<div
			style={{
				backgroundColor: !colorPalette ? "" : colorPalette.primary2 + "50",
				display: "grid",
				gridTemplateColumns: "300px auto"
			}}>
			<div className="relative z-[1] w-full h-[calc(100vh_-_5rem)] flex flex-col p-4 text-black"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.white + "D0"
				}}>
				<div>
					{courseName}
				</div>
				<div>
					{unitName}
				</div>
				<div className="mb-4">
					{lessonName}
				</div>
				{lessonActivities.map((item, key) => {
					return (
						<span className={`text-sm italic ${item._id === activityId ? "font-black" : ""}`} key={key}>
							{item.activityName}
						</span>
					)
				})}
			</div>
			<div className="relative z-[1] w-full h-[calc(100vh_-_5rem)]"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.text1 + "80"
				}}>
				{activity &&
					<div>
						<DisplayActivity activity={activity} colorPalette={colorPalette} displayOpen={false}
							setDisplayOpen={() => { }} />
					</div>
				}
			</div>
		</div>
	)
}