import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../../../../../../../../utils/toast"
import axios from "axios"
import { activityService } from "../../../../../../../../../services"
import { BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi"
import Section from "../../../../../../../../../components/activity/section"
import { FaStar, FaRegStar } from 'react-icons/fa'

const FRAMES = 6
const DELAY = 225

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

	const [loadState, setLoadState] = useState(-1)

    const [activityId, setActivityId] = useState(router.query.activityId)
    const [activity, setActivity] = useState(null)
	const [finishLoading, setFinishLoading] = useState(false)
    const [courseName, setCourseName] = useState(null)
    const [unitName, setUnitName] = useState(null)
    const [lessonName, setLessonName] = useState(null)
	const [lessonActivities, setLessonActivities] = useState([])

	const [page, setPage] = useState(0)
    const [open, setOpen] = useState(0)

    useEffect(() => {
        if(activity){
			if(page === null && activity.pages.length > 0){
				setPage(activity.pages.length-1)
			}
		}
    }, [activity])

    useEffect(() => {
        setOpen(0)
    }, [page])

    useEffect(() => {
        if(activityId){
			setLoadState(FRAMES)
			setTimeout(() => {
				fetch()
			}, 500)
		}
    }, [activityId])

	useEffect(() => {
		if(loadState >= 0){
			setTimeout(() => {
				setLoadState((prev) => prev-1)
			}, DELAY)
		}
	}, [loadState])

    const fetch = async() => {
        try{
            const response = await activityService.get(activityId)
            setActivity(response.data.activity[0])
            //console.log(response.data.activity[0])

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
				})
				.catch((error) => {
					if (error?.response?.data?.message) {
						showToastError(error.response.data.message)
					}
				})
			setFinishLoading(true)
        }
        catch(err){
            console.log(err)
        }
    }

	if (loading) { return }
	return (
		<>
		<div className={`absolute top-0 left-0 w-full h-full bg-black text-white 
		${(!activity || loadState > -1) ? "z-[500] opacity-1" : "z-0 opacity-0"} 
		flex flex-col gap-8 items-center justify-center text-4xl`}>
			<div className="flex flex-col gap-2 items-center">
				<span>Building Activity...</span>
				<span className="text-lg">(Temporary Loading Page)</span>
			</div>
			<div className="relative rounded-full w-[350px] h-[12px] bg-neutral-500 overflow-hidden z-[510]">
				<div className="absolute top-0 left-0 bg-pink-300/[0.8] z-[520] h-full transition-all duration-[0.2s] ease-in-out"
				style={{
					width: `${((loadState > -1 ? (250 * (FRAMES-loadState)/(FRAMES)) : 0) + 
					(100 * (activity ? 1 : 0))).toFixed(0)}px`
				}}/>
			</div>
		</div>
		<div
		className="relative"
		style={{
			backgroundColor: !colorPalette ? "" : colorPalette.primary2 + "50",
			display:"grid",
			gridTemplateColumns: "300px auto"
		}}>
			<div className="absolute w-full h-full"
			style={{
				backgroundColor: !colorPalette ? "" : colorPalette.primary1 + "60"
			}}/>
			<div className="absolute w-full h-full"
			style={{
				backgroundColor: !colorPalette ? "" : colorPalette.black + "A0"
			}}/>
			<div className="flex flex-col">
				<div className="w-full h-1"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.primary1 + "80"
				}}/>
				<div className="relative z-[1] w-full h-[calc(100vh_-_5rem)] flex flex-col py-8 pl-10 rounded-r-xl"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.black + "80",
					color: colorPalette.white
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
						<button className={`text-left text-sm italic ${item._id === activityId ? "font-black" : ""}`}
						onClick={() => {
							router.push(`/courses/${router.query.courseId}/units/
							${router.query.unitId}/lessons/
							${router.query.lessonId}/activity/${item._id}`)
						}}
						 key={key}>
							{item.activityName}
						</button>
					)})}
				</div> 
			</div>
			<div className="relative z-[1] w-full h-[calc(100vh_-_5rem)]">
               {activity && 
			   		<div className={`flex flex-col gap-4 w-full h-full transition-colors duration-300 p-5`}>
						<div className="w-full rounded-xl px-[calc(8vw_+_40px)] h-full"
						style={{
							display:"grid",
							gridTemplateRows:"92.5% 7.5%"
						}}>
							<section className="relative z-[5] rounded-t-xl p-4">
								<div className="absolute top-0 left-0 w-full h-full rounded-md"
								style={{
									backgroundColor: colorPalette.text1 + "C0" 
								}}/>
								<div className="relative pb-10 overflow-y-scroll h-full flex flex-col gap-3 z-[15]">
									{page < activity.pages.length ?
									activity.pages[page].sections.map((section, key) => 
										<Section section={section} colorPalette={colorPalette} key={key}/>
									) : 
									<div className="flex flex-col gap-2 relative rounded-md p-4 text-center text-sm" style={{
										backgroundColor: colorPalette.white
									}}>
										Congratulations! You have finished this activity!
										<span className="flex flex-row gap-2 items-center justify-center w-full text-md">
											<FaStar/>
											<FaStar/>
											<FaRegStar/>
										</span>
									</div>}
								</div>
							</section>
							<section className="relative z-[20] flex flex-row justify-between items-center rounded-b-xl shadow-lg px-5"
							style={{
								backgroundColor: colorPalette.primary1
							}}>
								<div className="absolute top-0 left-0 w-full h-full bg-white/[0.2] rounded-b-xl z-[21]"/>
								<section className="flex flex-row items-center gap-2 z-[22]">
									<div className="relative rounded-full w-[180px] h-[0.5rem]"
									style={{
										backgroundColor: colorPalette.text1 + "50"
									}}>
										<div className="absolute top-[0px] left-[0px] rounded-full h-[0.5rem] transition-all duration-150 ease-out"
										style={{
											backgroundColor: colorPalette.text1 + "A0",
											width: `${(180 * page)/activity.pages.length}px`
										}}/>
									</div>
									<span className="font-semibold text-sm" style={{color: colorPalette.text1}}>
										{`${(activity.pages && activity.pages.length > 0) ? ((100 * page)/activity.pages.length).toFixed(0) : 100}`}%
									</span>
								</section>
								<section className="flex flex-row gap-2 items-center text-xl origin-center scale-90 z-[22]">
									<button className="text-md" disabled={page === 0}
									onClick={() => {setPage((prev) => prev-1)}}>
										<BiSolidLeftArrow className={page === 0 ? "text-neutral-500 cursor-not-allowed" : 
										"text-neutral-400 hover:text-neutral-300"}/>
									</button>
									<input className="text-sm w-[5rem] text-center font-semibold rounded-md" 
									value={activity.pages ? page < activity.pages.length ? page+1 : "Done" : ""}
									disabled={true}
									style={{color:colorPalette.black, backgroundColor: colorPalette.white}}>
									</input>
									<button className="text-md" disabled={page === activity.pages.length}
									onClick={() => {setPage((prev) => prev+1)}}>
										<BiSolidRightArrow className={page === activity.pages.length ? "text-neutral-500 cursor-not-allowed" : 
										"text-neutral-400 hover:text-neutral-300"}/>
									</button>
								</section>
							</section>
						</div>
					</div>
			   }
			</div>
		</div>
		</>
    )
}