import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../../../../../../../../utils/toast"
import axios from "axios"
import { activityService } from "../../../../../../../../../services"
import { BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi"
import Section from "../../../../../../../../../components/activity/section"
import { FaStar, FaRegStar } from 'react-icons/fa'

const LOADIN_MAXFRAMES = 10
const LOADIN_DELAY = 150
const LOADIN_INCREMENT = 15

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
    const [courseName, setCourseName] = useState(null)
    const [unitName, setUnitName] = useState(null)
    const [lessonName, setLessonName] = useState(null)
	const [lessonActivities, setLessonActivities] = useState([])

	const [page, setPage] = useState(0)
    const [open, setOpen] = useState(0)
	const [maxPage, setMaxPage] = useState(0)
 
    useEffect(() => {
        if(activity){
			if(page === null && activity.pages.length > 0){
				setPage(activity.pages.length-1)
			}
		}
    }, [activity])

    useEffect(() => {
        setOpen(page < maxPage ? activity.pages[page].sections.length : 0)
		if(page < maxPage){
			var scrollContainer = document.getElementById("container-activity-index");
			setTimeout(() => {
				scrollContainer.scrollTo({
					top: scrollContainer.scrollHeight,
					behavior: "smooth"
				});
			}, 50)
		}
		setMaxPage(Math.max(maxPage, page))
    }, [page])

    useEffect(() => {
        if(activityId){
			setLoadState(LOADIN_MAXFRAMES)
			setTimeout(() => {
				fetch()
			}, 500)
		}
    }, [activityId])

	useEffect(() => {
		if(loadState >= 0){
			setTimeout(() => {
				setLoadState((prev) => prev-1)
			}, LOADIN_DELAY + loadState * LOADIN_INCREMENT)
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
        }
        catch(err){
            console.log(err)
        }
    }
	
	useEffect(() => {
		const arrows = {
			"ArrowLeft": 37,
			"ArrowUp": 38,
			"ArrowRight": 39,
			"ArrowDown": 40
		};
	
		const handleKeyDown = (e) => {
			if (e.code === "Enter" || e.keyCode === arrows["ArrowRight"]
				|| e.keyCode === arrows["ArrowUp"] || e.code === "Space") {
				setOpen((prev) => {
					var scrollContainer = document.getElementById("container-activity-index");
					setTimeout(() => {
						scrollContainer.scrollTo({
							top: scrollContainer.scrollHeight,
							behavior: "smooth"
						});
					}, 450)
					return prev + 1;
				});
			} else if (e.code === "Backspace" || e.keyCode === arrows["ArrowLeft"]
				|| e.keyCode === arrows["ArrowDown"]) {
				setOpen((prev) => (prev > 0 ? prev - 1 : prev));
				var scrollContainer = document.getElementById("container-activity-index");
				setTimeout(() => {
					scrollContainer.scrollTo({
						top: scrollContainer.scrollHeight,
						behavior: "smooth"
					});
				}, 450)
			}
		};
	
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [setOpen]);
	
	const fullLoad = () => activity && courseName && unitName && lessonName && lessonActivities && lessonActivities.length > 0

	if (loading) { return }
	return (
		<>
		<div className={`absolute top-0 left-0 w-full h-full bg-black text-white 
		${(!fullLoad() || loadState > -1) 
			? "z-[500] opacity-1" : "z-0 opacity-0"} 
		flex flex-col gap-8 items-center justify-center text-4xl`}>
			<div className="flex flex-col gap-2 items-center h-full">
				<img src="/assets/loading/club-penguin.gif" className="w-[400px] h-[400px]"/>
				<span>Building Activity...</span>
				<span className="text-lg">(Temporary Loading Page)</span>
				<div className="relative rounded-full w-[350px] h-[12px] bg-neutral-500 overflow-hidden z-[510]">
				<div className="absolute top-0 left-0 bg-pink-300/[0.8] z-[520] h-full transition-all duration-[0.18s] ease-in-out"
				style={{
					width: `${((loadState > -1 ? (170 * (LOADIN_MAXFRAMES-loadState)/(LOADIN_MAXFRAMES)) : 
					fullLoad() ? 170 : 0) + 
					(100 * (activity ? 1 : 0)) + (20 * (courseName ? 1 : 0)) + (20 * (unitName ? 1 : 0))
					+ (20 * (lessonName ? 1 : 0)) + (20 * (lessonActivities && lessonActivities.length > 0 ? 1 : 0))).toFixed(0)}px`
				}}/>
			</div>
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
				backgroundColor: !colorPalette ? "" : colorPalette.black + "90"
			}}/>
			<div className="flex flex-col">
				<div className="w-full h-1"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.primary1 + "80"
				}}/>
				<div className="relative z-[1] w-full h-[calc(100vh_-_5rem)] flex flex-col py-4 pl-8 pr-8 rounded-r-md"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.black + "80",
					color: colorPalette.white
				}}>
					<div className="text-sm mb-2 hover:text-blue-400 transition-all duration-150"
					onClick={() => {
						router.push(`/courses/${router.query.courseId}/units/
						${router.query.unitId}/lessons`)
					}}>
						{"<<"} Back to Lessons
					</div>
					<div className="text-2xl font-bold">
						{lessonName}
					</div>
					<div className="ml-2 italic">
						{courseName}
					</div>
					<div className="ml-2 italic">
						{unitName}
					</div>
					<div className="flex flex-col gap-4 mt-4 px-4 py-3 rounded-md"
					style={{
						backgroundColor: colorPalette.primary1 + "60"
					}}>
						{lessonActivities.map((item, key) => {
							return (
							<button className={`flex flex-row justify-between items-center`}
							onClick={() => {
								router.push(`/courses/${router.query.courseId}/units/
								${router.query.unitId}/lessons/
								${router.query.lessonId}/activity/${item._id}`)
							}}
							key={key}>
								<span className={`text-left text-md ${item._id === activityId ? "font-black" : ""}`}>
									{item.activityName}
								</span>
								{item._id !== activityId && 
								<div className={`relative transition-all duration-150 arrow-container px-1 py-1 
								arrow-container cursor-pointer`}>
									<div className="z-[40] transition-all duration-150 sub-arrow">
										<BiSolidRightArrow/>
									</div>
								</div>}
							</button>
						)})}
					</div>
				</div> 
			</div>
			<div className="relative z-[1] w-full h-[calc(100vh_-_5rem)]">
               {activity && 
			   		<div className={`flex flex-col gap-4 w-full h-full transition-colors duration-300 p-5`}>
						{activity.pages.length > 0 ?
						<div className="w-full rounded-md px-[calc(8vw_+_40px)] h-full"
						style={{
							display:"grid",
							gridTemplateRows:"92.5% 7.5%"
						}}>
							<section className="relative z-[5] rounded-t-md p-4">
								<div className="absolute top-0 left-0 w-full h-full rounded-t-md"
								style={{
									backgroundColor: colorPalette.text1 + "C0" 
								}}/>
								<div id="container-activity-index" className="relative pb-10 overflow-y-scroll h-full flex flex-col gap-3 z-[15]">
									{page < activity.pages.length && activity.pages[page].sections.length > 0 && 
									<div className="rounded-md text-center transition-all duration-150 
									origin-center animate-pulse" 
									style={{
										backgroundColor: colorPalette.white + "A0",
										color:colorPalette.black,
										transform: `scaleY(${open === 0 ? 1 : 0})`,
										height: open === 0 ? "auto" : "0px",
										paddingTop: open === 0 ? "0.25rem" : "0px"
									}}>
										<div className="text-xs activity-helper-text"
										style={{
											color: colorPalette.primary1
										}}>
											Press ENTER to continue
										</div>
									</div>}
									{page < activity.pages.length ?
									activity.pages[page].sections.map((section, key) => 
										<div key={key}>
											{open >= key ? <Section section={section} colorPalette={colorPalette}/> : <></>}
										</div>
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
							<section className="relative z-[20] flex flex-row justify-between items-center rounded-b-md shadow-lg px-5"
							style={{
								backgroundColor: colorPalette.primary1
							}}>
								<div className="absolute top-0 left-0 w-full h-full bg-white/[0.2] rounded-b-md z-[21]"/>
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
								<section className="flex flex-row gap-2 items-center text-md origin-center scale-90 z-[22]">
									<button className="text-md" disabled={page === 0}
									onClick={() => {setPage((prev) => prev-1)}}>
										<BiSolidLeftArrow className={page === 0 ? "text-neutral-400 cursor-not-allowed" : 
										"text-neutral-200 hover:text-neutral-50"}/>
									</button>
									<input className="text-md w-[4rem] text-center font-semibold rounded-md" 
									value={activity.pages ? page < activity.pages.length ? page+1 : "✓" : ""}
									disabled={true}
									style={{color:colorPalette.black, backgroundColor: colorPalette.white}}>
									</input>
									<button className="text-md" disabled={page === activity.pages.length}
									onClick={() => {setPage((prev) => prev+1)}}>
										<BiSolidRightArrow className={page === activity.pages.length ? "text-neutral-400 cursor-not-allowed" : 
										"text-neutral-200 hover:text-neutral-50"}/>
									</button>
								</section>
							</section>
						</div>
						:
						<div className="w-full rounded-md px-[calc(8vw_+_40px)] h-full">
							<section className="flex flex-col gap-2 items-center justify-center relative z-[5] 
							rounded-t-md p-4 h-full">
								<div className="absolute top-0 left-0 w-full h-full rounded-md"
								style={{
									backgroundColor: colorPalette.text1 + "C0" 
								}}/>
								<span className="text-black text-2xl z-[10]">
									This activity is empty!
								</span>
								<span className="text-black text-lg z-[10]">
									Someone must fill this up with pages and sections and elements...
								</span>
							</section>
						</div>
						}
					</div>
			   }
			</div>
		</div>
		</>
    )
}