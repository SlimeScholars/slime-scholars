import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../../../utils/toast"
import axios from "axios"
import Unit from "../../../../components/learn/unit"

export default function Units({ user, loading, setLoading, colorPalette }) {
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
	const [units, setUnits] = useState([])
	const [courseName, setCourseName] = useState(null)

	useEffect(() => {
		try {
			if (!router.query.courseId) {
				return
			}
			setCourseId(router.query.courseId)

			const token = localStorage.getItem('jwt')
			if (!token) {
				return
			}

			// Set the authorization header
			const config = {
				params: {
					courseId: router.query.courseId,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			setLoading(true)
			axios
				.get("/api/learn/units", config)
				.then((response) => {
					if (response?.data?.units) {
						setCourseName(response.data.courseName)
						setUnits(response.data.units)
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
	}, [router.query.courseId])

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
						
						<p className="text-right text-lg cursor-pointer">
							<span
							className="hover:brightness-[0.8] transition-all duration-150"
							onClick={() => {
								router.push(`/courses`)
							}}>Courses</span>
							{courseName ? " / " : ""}
							<span
							onClick={() => {
							}}>{courseName}</span>
						</p>
					</div>
					<h1 className="text-3xl mt-8 mb-4">
						Unit Select
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
					{units.map((unit) => (
						<Unit
							key={unit._id}
							courseId={courseId}
							unitId={unit._id}
							unitName={unit.unitName}
							unitBadge={unit.unitBadge}
							tier={unit.tier}
						/>
					))}
				</div>
			</div>
		</div >
	)
}
