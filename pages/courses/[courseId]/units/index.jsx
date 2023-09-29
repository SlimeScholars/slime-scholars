import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../../../utils/toast"
import axios from "axios"
import Unit from "../../../../components/learn/unit"
import Image from "next/image"

export default function Units({ user, loading, setLoading, setAxiosLoading, colorPalette }) {
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
		setLoading(true)
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
	}, [router.query.courseId])

	if(loading){return}
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
		</div>
		<div className="w-full h-[calc(100vh_-_5rem_-_2.5rem)] flex flex-col pl-[4rem] pr-[1rem] overflow-y-scroll">
			<div className="flex flex-row gap-4 pt-[1.5rem] pb-[1.5rem]">
				<div className="justify-self-center flex items-center justify-center border-2 rounded-full
				w-20 h-20"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.primary2,
				}}>
					<Image
					src="/assets/slimes/slime-static/blue-slime.png"
					alt="blue slime"
					width={200}
					height={200}
					className="w-16 h-16"/>
				</div>
				<section className="text-4xl font-bold flex flex-col gap-2"
				style={{
					color: !colorPalette ? "" : colorPalette.black
				}}>
					{courseName}
					<div className="flex flex-row">
						<span 
						className="brightness-[0.5] text-lg italic font-normal"
						style={{
						color: !colorPalette ? "" : colorPalette.primary1
						}}>135 lessons • 15 quizzes • 6,250</span>
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
				{units.map((unit) => (
					<Unit
					key={unit._id}
					unitId={unit._id}
					courseId={courseId}
					unitName={unit.unitName}
					unitNumber={unit.unitNumber}
					unitBadge={unit.unitBadge}
					colorPalette={colorPalette}
					tier={unit.tier}
					/>
				))}
			</div>
		</div>
		</div>
	)
}
