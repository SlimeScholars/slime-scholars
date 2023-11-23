import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { showToastError } from "../../../../../../../../../utils/toast"
import axios from "axios"
import { assessmentService } from "../../../../../../../../../services"
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi"
import { AiOutlineRedo } from "react-icons/ai"
import Section from "../../../../../../../../../components/activity/section"
import Image from "next/image"
import cookies from "../../../../../../../../../services/cookies/cookies"

const LOADIN_MAXFRAMES = 9
const LOADIN_DELAY = 150
const LOADIN_INCREMENT = 15

export default function Assessment({ user, loading, setLoading, colorPalette }) {
	const router = useRouter()

	useEffect(() => {
		setAssessmentId(router.query.assessmentId)
	}, [router.query.assessmentId])

	const [loadState, setLoadState] = useState(-1)

	const [assessmentId, setAssessmentId] = useState(router.query.assessmentId)
	const [assessment, setAssessment] = useState(null)
	const [courseName, setCourseName] = useState(null)
	const [unitName, setUnitName] = useState(null)
	const [unitLessons, setUnitLessons] = useState(null)
	const [lessonName, setLessonName] = useState(null)

	const [page, setPage] = useState(0)

	const isClient = typeof window === "object";

	useEffect(() => {
		if (assessment) {
			if (page === null && assessment.problemSet.length > 0) {
				setPage(0)
			}
		}
	}, [assessment])

	useEffect(() => {
		refetch()
		setPage(0)
		if (assessmentId) {
			setLoadState(LOADIN_MAXFRAMES)
			setTimeout(() => {

			}, 500)
		}
	}, [assessmentId])

	useEffect(() => {
		if (loadState >= 0) {
			setTimeout(() => {
				setLoadState((prev) => prev - 1)
			}, LOADIN_DELAY + loadState * LOADIN_INCREMENT)
		}
	}, [loadState])

	const refetch = async () => {
		try {
			const response = await assessmentService.get(assessmentId)
			setAssessment(response.data.lesson)
			//console.log(response.data.lesson)

			const token = cookies.get("slime-scholars-webapp-token")
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
					setUnitLessons(response.data.lessons)
					setLessonName(response.data.lessonName)
					setLessonActivities(response.data.activities)
				})
				.catch((error) => {
					if (error?.response?.data?.message) {
						showToastError(error.response.data.message)
					}
				})
		}
		catch (err) {
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
				setPage((prev) => {
					return prev + 1 > assessment.problemSet.length ? prev : prev + 1
				})
			} else if (e.code === "Backspace" || e.keyCode === arrows["ArrowLeft"]
				|| e.keyCode === arrows["ArrowDown"]) {
				setPage((prev) => {
					return prev - 1 < 0 ? prev : prev - 1
				})
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [assessment, page]);

	const fullLoad = () => assessment && courseName && unitName && lessonName
	const getType = () => assessment?.lessonType === "quiz" ? "Quiz" : assessment?.lessonType === "test" ? "Test" : "Assessment"

	if (loading) { return }
	return (
		<>
			<div className={`absolute top-[-6rem] left-0 w-full h-[calc(100vh_+_6rem)] bg-black text-white 
		${(!fullLoad() || loadState > -1)
					? "z-[500] opacity-1" : "z-[-1] opacity-0"} 
		flex flex-col gap-8 items-center justify-center text-4xl`}>
				<div className="flex flex-col gap-2 items-center justify-center font-galindo">
					<img src="/assets/misc/slime-loader.gif" className="mt-[-200px] w-[400px] h-[400px]" />
					<div className="flex flex-row gap-2">
						{!assessment ? "Fetching Assessment" : `Building ${getType()}`}
						<div id="loading-wave">
							<span className="dot bg-white"></span>
							<span className="dot bg-white"></span>
							<span className="dot bg-white"></span>
						</div>
					</div>
					<div className="relative rounded-full w-[350px] h-[12px] bg-neutral-500 overflow-hidden z-[510] mt-5">
						<div className="absolute top-0 left-0 z-[520] h-full transition-all duration-[0.18s] ease-in-out"
							style={{
								backgroundColor: colorPalette ? colorPalette.text1 : '',
								width: `${((loadState > -1 ? (170 * (LOADIN_MAXFRAMES - loadState) / (LOADIN_MAXFRAMES)) :
									fullLoad() ? 170 : 0) +
									(100 * (assessment ? 1 : 0)) + (25 * (courseName ? 1 : 0)) + (25 * (unitName ? 1 : 0))
									+ (25 * (lessonName ? 1 : 0))).toFixed(0)}px`
							}} />
					</div>
				</div>
			</div>
			<div
				className="relative"
				style={{
					backgroundColor: !colorPalette ? "" : colorPalette.primary2 + "50",
					display: "grid",
					gridTemplateColumns:
						(isClient && window.innerWidth > 1536) ? "300px auto" : "240px auto"
				}}>
				<div className="absolute w-full h-full"
					style={{
						backgroundColor: !colorPalette ? "" : colorPalette.primary1 + "60"
					}} />
				<div className="absolute w-full h-full"
					style={{
						backgroundColor: !colorPalette ? "" : colorPalette.black + "90"
					}} />
				<div className="flex flex-col">
					<div className="w-full h-1"
						style={{
							backgroundColor: !colorPalette ? "" : colorPalette.primary1 + "80"
						}} />
					<div className="relative z-[1] w-full h-[calc(100vh_-_5rem)] flex flex-col py-4 pl-8 pr-8 rounded-r-md"
						style={{
							backgroundColor: !colorPalette ? "" : colorPalette.black + "80",
							color: colorPalette ? colorPalette.white : ''
						}}>
						<div className="text-[0.8em] 2xl:text-sm mb-2 hover:text-blue-400 transition-all duration-150"
							onClick={() => {
								router.push(`/courses/${router.query.courseId}/units/
						${router.query.unitId}/lessons`)
							}}>
							&lt;&lt; Back to Lessons
						</div>
						<div className="text-lg 2xl:text-2xl font-bold">
							{lessonName}
						</div>
						<div className="text-sm 2xl:text-md ml-1 2xl:ml-2">
							{courseName}
						</div>
						<div className="text-sm 2xl:text-md ml-1 2xl:ml-2">
							{unitName}
						</div>
					</div>
				</div>
				<div className="relative z-[1] w-full h-[calc(100vh_-_5rem)]">
					{assessment &&
						<div className={`flex flex-col gap-4 w-full h-full transition-colors duration-300`}>
							{assessment.problemSet.length > 0 ?
								<div className="w-full px-[calc(1vw_+_16px)] xl:px-[calc(2vw_+_32px)] 3xl:px-[calc(3vw_+_48px)] h-full"
									style={{
										display: "grid",
										gridTemplateRows: "93% 7%"
									}}>
									<section className="relative z-[5] p-2">
										<div className="absolute top-0 left-0 w-full h-full"
											style={{
												backgroundColor: colorPalette ? colorPalette.text1 + "A0" : ''
											}} />
										<div id="container-assessment-index" className="relative overflow-y-scroll h-full flex flex-col gap-3 pb-10 z-[15]">
											{page < assessment.problemSet.length ?
												assessment.problemSet[page].sections.map((section, key) =>
													<div key={key}>
														<Section section={section} colorPalette={colorPalette} animate={false} />
													</div>
												) :
												<div className="relative flex items-center justify-center rounded-md p-4 text-center w-full h-full overflow-hidden"
													style={{
														backgroundColor: colorPalette ? colorPalette.white : '',
													}}>
													<div>
														<img
															src={"/assets/misc/minion-happy.gif"}
															className="absolute top-0 left-0 rounded-md fade-in-element"
															style={{
																height: "100%",
																width: "100%",
																objectFit: "cover"
															}}
														/>
													</div>
													<div className="z-[250] absolute top-[-35%] left-[20%]
										rounded-md rounded-l-full w-[80%] h-[170%] fade-in-right-index bg-gradient-to-r from-black/[0.55] to-black/[0.9]"
														style={{
															backgroundColor: colorPalette ? colorPalette.primary1 + "90" : ''
														}}>
													</div>
													<div className="z-[350] w-full fade-in-right-index">
														<div className="flex flex-row justify-end w-full px-8">
															<section className="flex flex-col gap-8 text-right fade-in-bottom-index text-white">
																<div className="flex flex-col gap-1">
																	<span className="text-4xl font-extrabold">{getType()} Complete!</span>
																	<span className="text-xl italic">{assessment.lessonName}</span>
																</div>
																<div className="flex flex-col gap-1">
																	<span className="text-lg">Rewards Claimed</span>
																	<span className="flex flex-row justify-end">
																		<Image
																			src="/assets/icons/flower.png"
																			alt="flowers"
																			height={0}
																			width={0}
																			sizes="100vw"
																			className="2xl:h-[1.7rem] 2xl:w-[1.7rem] h-[1.4rem] w-[1.4rem] 2xl:ml-1 mr-2 -mt-0.5"
																		/>
																		{user.flowers === null ? 0 : user.flowers} &rarr; {user.flowers === null ? 50 : user.flowers + 150}
																		<span className="ml-2 text-green-400">+150</span>
																	</span>
																</div>
																<div className="flex flex-col gap-1">
																	<div className="flex flex-row gap-1 items-center justify-end hover:text-blue-400 transition-all duration-200 text-right"
																		onClick={() => {
																			setPage(0)
																			setLoadState(LOADIN_MAXFRAMES)
																		}}>
																		<span>Retry This Assessment</span>
																		<AiOutlineRedo className="rotate-90" />
																	</div>
																	<span
																		onClick={() => {
																			router.push(`/courses/${router.query.courseId}/units/
																${router.query.unitId}/lessons`)
																		}}
																		className="hover:text-blue-400 transition-all duration-200">Back to Lessons &gt;&gt;
																	</span>
																</div>
															</section>
														</div>
													</div>
												</div>}
										</div>
									</section>
									<section className="relative z-[20] flex flex-row justify-between items-center shadow-lg px-5"
										style={{
											backgroundColor: colorPalette ? colorPalette.primary1 + "A0" : ''
										}}>
										<div className="absolute top-0 left-0 w-full h-full bg-white/[0.35] z-[21]" />
										<section className="flex flex-row items-center gap-2 z-[22]">
											<div className="relative rounded-full w-[200px] h-[0.5rem]"
												style={{
													backgroundColor: colorPalette ? colorPalette.text1 + "A0" : ''
												}}>
												<div className="absolute top-[0px] left-[0px] rounded-full h-[0.5rem] transition-all duration-150 ease-out"
													style={{
														backgroundColor: colorPalette ? colorPalette.text1 : '',
														width: `${(200 * page) / assessment.problemSet.length}px`
													}} />
											</div>
											<span className="font-semibold text-sm" style={{ color: colorPalette ? colorPalette.white : '' }}>
												{`${(assessment.problemSet && assessment.problemSet.length > 0) ? ((100 * page) / assessment.problemSet.length).toFixed(0) : 100}`}%
											</span>
										</section>
										<section className="flex flex-row gap-2 items-center text-md origin-center scale-90 z-[22]">
											<button className="text-md" disabled={page === 0}
												onClick={() => { setPage((prev) => prev - 1) }}>
												<BiSolidLeftArrow className={(page === 0 ? "text-neutral-400 cursor-not-allowed" :
													"text-neutral-100 hover:text-white") + " transition-all duration-150"} />
											</button>
											<input className="text-md w-[4rem] text-center font-semibold rounded-md"
												value={assessment.problemSet ? page < assessment.problemSet.length ? page + 1 : "✓" : ""}
												disabled={true}
												style={{
													color: colorPalette ? colorPalette.black : '',
													backgroundColor: colorPalette ? colorPalette.white : '',
												}}>
											</input>
											<button className="text-md" disabled={page === assessment.problemSet.length}
												onClick={() => { setPage((prev) => prev + 1) }}>
												<BiSolidRightArrow className={(page === assessment.problemSet.length ? "text-neutral-400 cursor-not-allowed" :
													"text-neutral-100 hover:text-white") + " transition-all duration-150"} />
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
												backgroundColor: colorPalette ? colorPalette.text1 + "C0" : '',
											}} />
										<span className="text-black text-2xl z-[10]">
											This assessment is empty!
										</span>
										<span className="text-black text-lg z-[10]">
											Someone must fill this up with problemSet, sections, elements, etc...
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