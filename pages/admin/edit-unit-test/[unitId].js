import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TestPreview from "../../../components/admin/unitTest/preview";
import "react-toastify/dist/ReactToastify.css";
import { showToastError } from "../../../utils/toast";
import axios from "axios";

const sampleTest = {
	course: "Loading",
	name: "Loading",
	quizQuestions: [[]],
};

const emptyMC = [
	{
		option: "",
		correct: false,
	},
	{
		option: "",
		correct: false,
	},
	{
		option: "",
		correct: false,
	},
	{
		option: "",
		correct: false,
	},
];

export default function EditLesson({ user, loading, setLoading }) {
	// 0 is text, 1 is img, 2 is mc, 3 is fill in the blank
	const router = useRouter();
	const [unitId, setUnitId] = useState(router.query.unitId);
	const [test, setTest] = useState(sampleTest);

	// TODO: Make all isQuiz variables true
	const [text, setText] = useState("");
	const [mc, setMC] = useState(emptyMC);
	const [blank, setBlank] = useState({ text: "", afterBlank: "", blank: "" });
	const [image, setImage] = useState(null);

	const [maxQuizSectionNumbers, setMaxQuizSectionNumbers] = useState([]);

	const [curQuizQuestion, setCurQuizQuestion] = useState(0)

	const [mcExplanation, setMcExplanation] = useState('')
	const [fbExplanation, setFbExplanation] = useState('')

	useEffect(() => {
		if (loading) {
			return;
		}
		else if (!user || user.userType !== 4) {
			router.push("/");
		}
	}, [user, loading]);

	const [initialLoad, setInitialLoad] = useState(true);

	useEffect(() => {
		if (
			!loading &&
			test &&
			test.unit === sampleTest.unit &&
			test.name === sampleTest.name &&
			test.quizQuestions === sampleTest.quizQuestions
		) {
			setLoading(true);
		} else if (
			loading &&
			initialLoad &&
			test &&
			(test.course !== sampleTest.course ||
				test.name !== sampleTest.name ||
				test.quizQuestions !== sampleTest.quizQuestions)
		) {
			setInitialLoad(false);
			setLoading(false);
		}
	}, [test, loading, initialLoad]);

	useEffect(() => {
		if (!router.query.unitId) {
			return;
		}
		setUnitId(router.query.unitId);

		const config = {
			params: {
				unitId: router.query.unitId,
			}
		};

		axios
			.get("/api/admin/unit/unit-test", config)
			.then((response) => {
				const resUnit = response?.data?.unit
				if (!resUnit) {
					throw new Error("Unit not found")
				}
				const newUnit = {
					course: 'Course Name',
					name: resUnit.unitName,
					quizQuestions: resUnit.quizQuestions,
				}

				let newMax = 0

				const newMaxQuizSectionNumbers = []
				for (let i in resUnit.quizQuestions) {
					newMax = 0
					for (let section of resUnit.quizQuestions[i]) {
						if (section.sectionType === 3) {
							newUnit.quizQuestions[i][section.index] = {
								index: section.index,
								sectionType: section.sectionType,
								sectionNumber: section.sectionNumber,
								text: section.text,
								blank: section.blank.join(", "),
								afterBlank: section.afterBlank,
							}
						}

						if (section.sectionNumber > newMax) {
							newMax = section.sectionNumber
						}
					}
					newMaxQuizSectionNumbers.push(newMax)
				}
				setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)

				setTest(newUnit);
			})
			.catch((error) => {
				showToastError(error?.response?.data?.message || error.message)
				setLoading(false);
			});
	}, [router.query.unitId]);

	const addText = () => {
		let newText = {
			sectionType: 0,
			text: text,
		};
		let newTest = { ...test };
		newText.sectionNumber = maxQuizSectionNumbers[curQuizQuestion] + 1;
		newText.index = test.quizQuestions[curQuizQuestion].length;
		newTest.quizQuestions[curQuizQuestion].push(newText);
		const newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
		newMaxQuizSectionNumbers[curQuizQuestion] = maxQuizSectionNumbers[curQuizQuestion] + 1
		setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)
		setTest(newTest);
	};

	const addMC = () => {
		if (mc.every((option) => option.option.length === 0 || !option.correct)) {
			showToastError(
				"You must have at least one option and one correct option."
			);
			return;
		}
		if (!mcExplanation) {
			showToastError("You must have an explanation for the multiple choice answer(s).")
			return
		}
		let newMC = {
			sectionType: 2,
			options: [],
			explanation: mcExplanation,
		};
		for (let i in mc) {
			newMC.options.push({ ...mc[i] })
		}

		let newTest = { ...test };
		newMC.sectionNumber = maxQuizSectionNumbers[curQuizQuestion] + 1;
		newMC.index = test.quizQuestions[curQuizQuestion].length;
		newTest.quizQuestions[curQuizQuestion].push(newMC);
		let newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
		newMaxQuizSectionNumbers[curQuizQuestion] = maxQuizSectionNumbers[curQuizQuestion] + 1
		setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)
		setTest(newTest);
	};

	const onMCChange = (index, value) => {
		let newMC = [...mc];
		newMC[index] = {
			option: value,
			correct: false,
		};
		setMC(newMC);
	};

	const onMCClick = (event, index) => {
		event.preventDefault();
		if (mc[index].option.length === 0) {
			showToastError("Enter some text first.");
			return;
		}
		let newMC = [...mc];
		newMC[index].correct = !newMC[index].correct;
		setMC(newMC);
	}

	const addFB = () => {
		if (blank.blank.length === 0) {
			showToastError("Answer is required.");
			return;
		}
		if (!fbExplanation) {
			showToastError("You must have an explanation for the fill in the blank answer(s).")
			return
		}
		let newFB = {
			sectionType: 3,
			text: blank.text,
			blank: blank.blank,
			afterBlank: blank.afterBlank,
		};
		let newTest = { ...test };
		newFB.sectionNumber = maxQuizSectionNumbers[curQuizQuestion] + 1;
		newFB.index = test.quizQuestions[curQuizQuestion].length;
		newTest.quizQuestions[curQuizQuestion].push(newFB);
		let newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
		newMaxQuizSectionNumbers[curQuizQuestion] = maxQuizSectionNumbers[curQuizQuestion] + 1
		setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)
		setTest(newTest);
	};

	const addImage = () => {
		if (!image) {
			showToastError("Image is required.");
			return;
		}
		let newImage = {
			sectionType: 1,
			image: image,
		};
		let newTest = { ...test };
		newImage.sectionNumber = maxQuizSectionNumbers[curQuizQuestion] + 1;
		newImage.index = test.quizQuestions[curQuizQuestion].length;
		newTest.quizQuestions[curQuizQuestion].push(newImage);
		let newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
		newMaxQuizSectionNumbers[curQuizQuestion] = maxQuizSectionNumbers[curQuizQuestion] + 1
		setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)
		setTest(newTest);
	};

	const addQuizQuestion = () => {
		const newTest = { ...test };
		newTest.quizQuestions.push([]);
		setTest(newTest);
		setCurQuizQuestion(newTest.quizQuestions.length - 1)
		setMaxQuizSectionNumbers([...maxQuizSectionNumbers, 0])
	}

	const save = () => {
		try {
			// Make sure there are at least 10 questions
			if (test.quizQuestions.length < 10) {
				throw new Error(`There must be at least 10 quiz questions. There are currently ${test.quizQuestions.length}.`)
			}

			// Make sure there is only one question per quiz question
			for (let i in test.quizQuestions) {
				let flag = false
				for (let section in test.quizQuestions[i]) {
					if (section.sectionType === 2 || section.sectionType === 3) {
						if (flag) {
							throw new Error(`There can only one question per quiz question. On quiz question number ${j} there is are multiple questions.`)
						}
						flag = true
					}
				}
			}

			const token = localStorage.getItem("jwt");

			// Set the authorization header
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			};
			setLoading(true);

			const formData = new FormData();

			let newTest = { ...test };
			let imageFiles = [];

			for (let i in newTest.quizQuestions) {
				for (let section of newTest.quizQuestions[i]) {
					if (
						section.sectionType === 1 &&
						typeof section.image !== "string"
					) {
						imageFiles.push(section.image);
						section.image = imageFiles.length - 1;
					}
				}
			}

			formData.append(
				"data",
				JSON.stringify({
					unitId,
					quizQuestions: newTest.quizQuestions,
					imageLength: imageFiles.length,
				})
			);

			for (let i in imageFiles) {
				formData.append(`image${i}`, imageFiles[i]);
			}

			axios
				.put("/api/admin/unit/update-unit-test", formData, config)
				.then((response) => {
					if (response.data && response.data.unit) {
						const resUnit = response.data.unit
						const newUnit = {
							...test,
							quizQuestions: resUnit.quizQuestions,
						};

						let newMax = 0
						const newMaxQuizSectionNumbers = []
						for (let i in resUnit.quizQuestions) {
							newMax = 0
							for (let section of resUnit.quizQuestions[i]) {
								if (section.sectionType === 3) {
									newUnit.quizQuestions[i][section.index] = {
										index: section.index,
										sectionType: section.sectionType,
										sectionNumber: section.sectionNumber,
										text: section.text,
										blank: section.blank.join(", "),
										afterBlank: section.afterBlank,
									}
								}

								if (section.sectionNumber > newMax) {
									newMax = section.sectionNumber
								}
							}
							newMaxQuizSectionNumbers.push(newMax)
						}
						setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)

						setTest(newUnit);
						showToastError("Unit updated successfully.", true);
					}
					setLoading(false);
				})
				.catch((error) => {
					if (
						error &&
						error.response &&
						error.response.data &&
						error.response.data.message
					) {
						showToastError(error.response.data.message);
					} else {
						showToastError(error.message);
					}
					setLoading(false);
				});
		} catch (error) {
			setLoading(false);
			showToastError(error.message);
			return;
		}
	};

	return (
		<div className="w-full min-h-screen flex flex-row flex-nowrap">
			<div className="w-3/5 min-h-full p-10 pr-40 bg-purple-100 font-averia ">
				<h1 className="text-2xl font-black text-purple-500/70 mb-10">
					Edit unit {test.name}
				</h1>
				<div className="w-full flex flex-row items-center justify-start mt-10">
					<button
						className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
						onClick={addText}
					>
						Add text
					</button>
				</div>
				<textarea
					className="w-full bg-purple-50 p-3 mt-3"
					onChange={(e) => setText(e.target.value)}
					value={text}
					placeholder="Enter text here..."
				/>
				<div className="w-full flex flex-row items-center justify-start mt-10">
					<button
						className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
						onClick={addMC}
					>
						Add MC
					</button>
				</div>
				<div className="w-full grid grid-cols-2 gap-5 mt-5">
					{[1, 2, 3, 4].map((i) => (
						<input
							className={
								"w-full ring-2 rounded-lg p-3 " +
								(mc[i - 1].correct
									? "bg-green-200 text-green-800 ring-green-400 placeholder:text-green-600"
									: mc[i - 1].option.length > 0
										? "bg-purple-200 text-purple-800 ring-purple-400"
										: "bg-gray-200 ring-gray-400 placeholder:text-gray-400")
							}
							onChange={(e) => onMCChange(i - 1, e.target.value)}
							value={mc[i - 1].option}
							placeholder={`Option ${i}`}
							onContextMenu={(event) => onMCClick(event, i - 1)}
							key={i}
						/>
					))}
				</div>
				<div
					className="w-full mt-5 flex flex-col items-center"
				>
					<p>MC Explanation</p>
					<textarea
						className="w-full col-span-2 ring-2 ring-purple-200 rounded-lg p-3 mt-5"
						onChange={(e) => setMcExplanation(e.target.value)}
						value={mcExplanation}
						placeholder="Enter explanation for MC here..."
					/>
				</div>
				<div className="w-full flex flex-row items-center justify-start mt-10">
					<button
						className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
						onClick={addFB}
					>
						Add FB
					</button>
				</div>
				<div className="w-full grid grid-cols-5 gap-2 mt-1">
					<p className="text-base col-span-2 text-center">Before</p>
					<p className="text-base text-center">Answer(s)</p>
					<p className="text-base col-span-2 text-center">After</p>
					<textarea
						className="w-full col-span-2 ring-2 ring-purple-200 rounded-lg p-3"
						onChange={(e) => setBlank({ ...blank, text: e.target.value })}
						value={blank.text}
						placeholder="Enter text here..."
					/>
					<textarea
						className="w-full ring-2 ring-purple-200 rounded-lg p-3"
						onChange={(e) => setBlank({ ...blank, blank: e.target.value })}
						value={blank.blank}
						placeholder="Enter text here..."
					/>
					<textarea
						className="w-full col-span-2 ring-2 ring-purple-200 rounded-lg p-3"
						onChange={(e) => setBlank({ ...blank, afterBlank: e.target.value })}
						value={blank.afterBlank}
						placeholder="Enter text here..."
					/>
				</div>
				<div
					className="w-full mt-5 flex flex-col items-center"
				>
					<p>Fill in the Blank Explanation</p>
					<textarea
						className="w-full col-span-2 ring-2 ring-purple-200 rounded-lg p-3 mt-5"
						onChange={(e) => setFbExplanation(e.target.value)}
						value={fbExplanation}
						placeholder="Enter explanation for fill in the blank here..."
					/>
				</div>
				<div className="w-full flex flex-row items-center justify-start mt-10">
					<button
						className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
						onClick={addImage}
					>
						Add image
					</button>
					<input
						type="file"
						onChange={(event) => setImage(event.target.files[0])}
						className="w-1/2 ml-10"
						accept="image/gif, image/jpeg, image/png"
					/>
				</div>
				<div className="w-full flex flex-row items-center justify-start mt-10">
					<button
						className="bg-purple-400 hover:bg-purple-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md"
						onClick={addQuizQuestion}
					>
						Add Quiz Question
					</button>
				</div>

				<button
					className="bg-pink-400 hover:bg-pink-300 text-lg font-bold text-bg-light px-3 py-1 rounded-md mt-10"
					onClick={save}
				>
					Save
				</button>
			</div>
			<div className="w-2/5 h-full">
				<TestPreview
					test={test}
					setTest={setTest}
					maxQuizSectionNumbers={maxQuizSectionNumbers}
					setMaxQuizSectionNumbers={setMaxQuizSectionNumbers}
					curQuizQuestion={curQuizQuestion}
					setCurQuizQuestion={setCurQuizQuestion}
				/>
			</div>
		</div>
	);
}

