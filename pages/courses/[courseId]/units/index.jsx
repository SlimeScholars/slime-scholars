import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../../../utils/toast"
import axios from "axios"
import Unit from "../../../../components/learn/unit"

export default function Units({ user, loading, setAxiosLoading, colorPalette }) {
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
	const [courseName, setCourseName] = useState('Loading...')

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
			setAxiosLoading(true)
			axios
				.get("/api/learn/units", config)
				.then((response) => {
					if (response?.data?.units) {
						setCourseName(response.data.courseName)
						setUnits(response.data.units)
						setAxiosLoading(false);
					}
				})
				.catch((error) => {
					if (error?.response?.data?.message) {
						showToastError(error.response.data.message)
					}
					setAxiosLoading(false);
				})

		} catch (error) {
			showToastError(error.message);
			return;
		}
	}, [router.query.courseId])

	return (
		<div className='w-full min-h-screen flex items-center justify-center' style={{
			backgroundImage:
				colorPalette === undefined ? "" : `url('/assets/backgrounds/${colorPalette.bg}')`,
			backgroundSize: "cover",
		}}>
			<div className='flex flex-col items-center justify-start w-[40rem] min-h-screen bg-purple-50'>
				<header className="w-full h-30 text-pink-400 flex items-center justify-start flex-col font-galindo">
					<div className="w-full h-15 flex items-center justify-between px-6 py-3 bg-pink-200">
						<p className="text-lg cursor-pointer"
							onClick={() => router.push('/courses')}
						>
							Back
						</p>
						<p className="text-lg text-right">
							{courseName}
						</p>
					</div>
					<h1 className="text-3xl mt-8 mb-4">
						Unit Select
					</h1>
					<div className="w-full h-[1px] bg-pink-200 mt-3">&nbsp;</div>
				</header>
				<div className="w-full h-full flex flex-col justify-start items-center bg-purple-50 pt-[8vh] pb-[20vh] font-galindo">
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
