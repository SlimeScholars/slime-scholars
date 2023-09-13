import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Stars from "../../../../../components/learn/stars";
import { HiHome } from 'react-icons/hi'
import { TbReload } from 'react-icons/tb'
import { FaArrowRight } from 'react-icons/fa'

import axios from "axios";

import TextSection from "../../../../../components/admin/lesson/sections/text";
import ImgSection from "../../../../../components/admin/lesson/sections/img";
import MCSection from "../../../../../components/admin/lesson/sections/mc";
import FBSection from "../../../../../components/admin/lesson/sections/fb";
import { showToastError } from "../../../../../utils/toast";
import Modal from "../../../../../components/learn/modal";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function UnitTest({ user, setUser, loading, setLoading, colorPalette, refetchUser }) {
	const router = useRouter();
	const [unit, setUnit] = useState({});

	const [quizSectionNumber, setQuizSectionNumber] = useState(0)
	// TODO: change maxQuizSectionNumbers default value on lesson page as well
	const [maxQuizSectionNumbers, setMaxQuizSectionNumbers] = useState([])
	const [curQuizQuestion, setCurQuizQuestion] = useState(0)

	const [courseName, setCourseName] = useState('Loading...')

	useEffect(() => {
		if (loading) {
			return
		}
		if (!user || user.userType !== 1) {
			router.push('/')
		}
	}, [user, loading])

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		setLoading(true)
		if (router.query.unitId && token) {
			axios
				.get(
					"/api/learn/unit-test",
					{
						params: {
							unitId: router.query.unitId,
							courseId: router.query.courseId,
						},
					},
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((res) => {
					if (res.status === 200) {
						setUnit(res.data.unit);
						setCourseName(res.data.courseName)

						let newMax = 0
						const newMaxQuizSectionNumbers = []
						for (let i in res.data.unit.quizQuestions) {
							newMax = 0
							for (let section of res.data.unit.quizQuestions[i]) {
								if (section.sectionNumber > newMax) {
									newMax = section.sectionNumber
								}
							}
							newMaxQuizSectionNumbers.push(newMax)
						}
						setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)

						if (user) {
							setLoading(false);
						}
					} else {
						throw new Error("Failed to fetch unit test");
					}
				})
				.catch((err) => {
					showToastError(err.response.data.message)
					console.log(err);
				});
		}
	}, [router.query.unitId, router.query.courseId])

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth' // Use 'auto' for instant scrolling
		});
	}

	const [delayedIncrement, setDelayedIncrement] = useState(false)

	const clickIncrement = () => {
		if (curQuizQuestion === -1) {
			setCurQuizQuestion(0)
		}
		if (curQuizQuestion === unit.quizQuestions.length) {
			return
		}
		if (quizSectionNumber === maxQuizSectionNumbers[curQuizQuestion] + 1
			|| (quizSectionNumber === maxQuizSectionNumbers[curQuizQuestion] && delayedIncrement)
		) {
			setDelayedIncrement(false)
			setCurQuizQuestion(curQuizQuestion + 1)
			setQuizSectionNumber(0)
			return
		}
		if (delayedIncrement) {
			setDelayedIncrement(false)
			setQuizSectionNumber(quizSectionNumber + 1)
			return
		}
		else {
			const quizSections = unit.quizQuestions[curQuizQuestion]
			for (let i in quizSections) {
				if (
					quizSections[i].sectionNumber === quizSectionNumber &&
					(quizSections[i].sectionType === 2 || quizSections[i].sectionType === 3)
				) {
					return
				}
			}
			setQuizSectionNumber(quizSectionNumber + 1)
		}
	}

	useEffect(() => {
		scrollToBottom()
	}, [quizSectionNumber, curQuizQuestion])

	const quizQuestionIncrement = (questionSectionNumber) => {
		if (questionSectionNumber === quizSectionNumber) {
			setDelayedIncrement(true)
		}
	}

	const [quizScore, setQuizScore] = useState(0)
	const [initUser] = useState({...user})
	const [completed, setCompleted] = useState(false)

	const addScore = (points) => {
		setQuizScore(quizScore + points)
	}

	const [stars, setStars] = useState(0)

	const submitQuiz = (e) => {
		e.preventDefault()
		if (completed) {
			return
		}
		try {
			const token = localStorage.getItem('jwt')

			// Set the authorization header
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			setLoading(true)
			axios
				.post("/api/learn/unit-test/complete", { unitId: unit._id, score: quizScore }, config)
				.then((response) => {
					if (response.data) {
						setStars(response.data.stars)
						setCompleted(true)
					}
					refetchUser()
					setLoading(false);
				})
				.catch((error) => {
					if (error?.response?.data?.message) {
						showToastError(error.response.data.message)
					}
					setLoading(false);
				});

		} catch (error) {
			showToastError(error.message);
			return;
		}
	}

	return (
		<div className='w-full h-screen flex items-center justify-center overflow-y-scroll' style={{
			backgroundImage:
				colorPalette === undefined ? "" : `url('/assets/backgrounds/${colorPalette.bg}')`,
			backgroundSize: "cover",
		}}
			onClick={clickIncrement}
		>
			<Head></Head>
			{completed && !loading &&
				<div
					className='bg-bg-completed text-bg-light w-screen h-screen fixed inset-0 flex justify-center items-center'
				>
					<div className="font-galindo flex items-center flex-col">
						<h2 className="text-3xl">
							Unit Test Completed
						</h2>
						<Stars stars={stars} />
						<div className="text-xl my-2">
							{initUser.exp} Exp &nbsp;
							<FaArrowRight className="inline" /> &nbsp;
							{user.exp} Exp &nbsp;
							<Modal
								preview={
									<AiOutlineQuestionCircle className="text-xl" />
								}
								content={
									<div className="flex flex-col items-start justify-center">
										<p className="text-2xl mb-2 text-bg-completed">Earn Exp by scoring well on lesson quizes, unit tests, completing units, and completing courses.</p>
									</div>
								}
							/>
						</div>
						<div className="text-xl my-2">
							{initUser.flowers} F &nbsp;
							<FaArrowRight className="inline" /> &nbsp;
							{user.flowers} F &nbsp;
							<Modal
								preview={
									<AiOutlineQuestionCircle className="text-xl" />
								}
								content={
									<div className="flex flex-col items-start justify-center">
										<p className="text-2xl mb-2 text-bg-completed">Earn Flowers by scoring well on lesson quizzes two times a day, or by completing units and courses.</p>
									</div>
								}
							/>
						</div>

						<div className="mt-8 grid grid-cols-2 w-[22rem] gap-x-5">
							<button
								className="bg-bg-light text-bg-completed rounded-lg py-2 px-2 text-xl duration-300 hover:scale-110"
								onClick={() => {
									// TODO: Keep track of the latest lessons page that they were on so that they can go back to it
									router.push('/play')
								}}
							>
								Home
								<HiHome className="inline text-2xl -mt-1 ml-1" />
							</button>
							<button
								className="bg-bg-light text-bg-completed rounded-lg py-2 px-2 text-xl duration-300 hover:scale-110"
								onClick={() => {
									setLoading(true)
									window.location.reload()
								}}
							>
								Try Again
								<TbReload className="inline text-2xl ml-1" />
							</button>
						</div>
					</div>
				</div>
			}
			<form
				className={`flex flex-col items-center justify-start w-[60%] min-h-screen ${completed ? 'hidden' : ''}`}
				onSubmit={(e) => submitQuiz(e)}
				style={{
				backgroundColor:!colorPalette ? "" : colorPalette.primary1,
				color:!colorPalette ? "" : colorPalette.text1
				}}
			>
				<header className="w-full flex items-center justify-start flex-col font-galindo"
				style={{
				backgroundColor:!colorPalette ? "" : colorPalette.primary1
				}}>
				<div className="w-full h-20 flex items-center justify-between px-6 py-3"
				style={{
					backgroundColor:!colorPalette ? "" : colorPalette.black
				}}>
					<p className="text-lg cursor-pointer"
					onClick={(e) => {
						if (!completed) {
						e.stopPropagation()
						const confirmed = window.confirm('Are you sure you want to exit the unit test. Your question responses will NOT be saved.')
						if (confirmed) {
							router.push('/play')
						}
						}
						else {
						router.push('/play')
						}
					}}
					>
					Back
					</p>
					<p className="text-lg text-right">
					{courseName}
					</p>
				</div>
				<h1 className="text-3xl mt-3 mb-1">
					Unit Test
				</h1>
				<div className="w-full h-[1px] mt-3" 
				style={{
					backgroundColor:!colorPalette ? "" : colorPalette.primary2,
				}}/>
				</header>
				<div className="w-full h-full flex flex-col justify-start items-start pb-[20vh] max-h-[calc(100vh_-_10rem)] overflow-y-scroll"
				style={{
				backgroundColor:!colorPalette ? "" : colorPalette.primary1,
				color:!colorPalette ? "" : colorPalette.text1
				}}>
					{unit && unit.quizQuestions && unit.quizQuestions.map((quizQuestion, questionIndex) => (
						<Fragment key={`quiz-question-${questionIndex}`}>
							{curQuizQuestion >= questionIndex ?
								<div className='w-full flex items-center justify-start flex-col font-galindo mt-10'
								style={{
									color:!colorPalette ? "" : colorPalette.text1,
								}}>
									<h3 className="text-2xl mt-2 mb-0.5">
										Question {questionIndex + 1}.
									</h3>
								</div> : <></>
							}
							{quizQuestion.map((quizSection, index) => {
								// 0 is text, 1 is img, 2 is mc, 3 is fill in the blank
								switch (quizSection.sectionType) {
									case 0:
										return (
											<TextSection
												key={`quiz-section-${questionIndex}-${index}`}
												text={quizSection.text}
												section={quizSection}
												active={true}
												sectionNumber={quizSectionNumber}
												questionNumber={questionIndex}
												curQuizQuestion={curQuizQuestion}
												colorPalette={colorPalette}
											/>
										);
									case 1:
										return (
											<ImgSection
												key={`quiz-section-${questionIndex}-${index}`}
												image={quizSection.image}
												section={quizSection}
												active={true}
												sectionNumber={quizSectionNumber}
												questionNumber={questionIndex}
												curQuizQuestion={curQuizQuestion}
												colorPalette={colorPalette}
											/>
										);
									case 2:
										return (
											<MCSection
												key={`quiz-section-${questionIndex}-${index}`}
												options={quizSection.options}
												section={quizSection}
												active={true}
												sectionNumber={quizSectionNumber}
												increment={quizQuestionIncrement}
												isQuiz={true}
												addScore={addScore}
												questionNumber={questionIndex}
												curQuizQuestion={curQuizQuestion}
												explanation={quizSection.explanation}
												colorPalette={colorPalette}
											/>
										);
									case 3:
										return (
											<FBSection
												key={`quiz-section-${questionIndex}-${index}`}
												text={quizSection.text}
												afterBlank={quizSection.afterBlank}
												section={quizSection}
												active={true}
												sectionNumber={quizSectionNumber}
												increment={quizQuestionIncrement}
												isQuiz={true}
												addScore={addScore}
												questionNumber={questionIndex}
												curQuizQuestion={curQuizQuestion}
												explanation={quizSection.explanation}
												colorPalette={colorPalette}
											/>
										);
									default:
										return <div key={`quizSection-${index}`} />;
								}
							})}

						</Fragment>
					))}

					{
						unit && unit.quizQuestions && curQuizQuestion === unit.quizQuestions.length ?
							<div className="w-full flex justify-center mt-5 font-bold">
								 <button
								className="w-48 ring-2 rounded-lg py-2 px-4 font-averia"
								type='submit'
								style={{
									backgroundColor:!colorPalette ? "" : colorPalette.white,
									color:!colorPalette ? "" : colorPalette.black
								}}
								>
									Complete Unit Test
								</button>
							</div> : <></>
					}
				</div>
			</form>
		</div>
	);
}
