import React, { Fragment } from "react";
import TextSection from "../lesson/sections/text";
import MCSection from "../lesson/sections/mc";
import FBSection from "../lesson/sections/fb";
import ImgSection from "../lesson/sections/img";
import { showToastError } from "../../../utils/toast";

export default function TestPreview({
	test,
	setTest,
	maxQuizSectionNumbers,
	setMaxQuizSectionNumbers,

	curQuizQuestion,
	setCurQuizQuestion,
}) {
	// number refers to the ordered group number the section appears with
	const changeQuizSectionNumber = (index, number, questionIndex) => {
		if (parseInt(number) < 0) {
			showToastError("Cannot have a negative section number");
			return;
		}
		//
		let newQuizQuestions = [...test.quizQuestions]
		newQuizQuestions[questionIndex][index].sectionNumber = parseInt(number)

		// Update section number
		if (parseInt(number) > maxQuizSectionNumbers[questionIndex]) {
			const newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
			newMaxQuizSectionNumbers[questionIndex] = parseInt(number)
		}
		else if (test.quizQuestions[questionIndex][index].sectionNumber === maxQuizSectionNumbers[questionIndex]) {
			let newMax = 0
			for (let s of newQuizQuestions[questionIndex]) {
				if (s.sectionNumber > newMax) {
					newMax = s.sectionNumber
				}
			}
			const newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
			newMaxQuizSectionNumbers[questionIndex] = newMax
		}

		updateQuizQuestions(newQuizQuestions);
	};

	const deleteQuizSection = (index, questionIndex) => {
		const newQuizQuestions = [...test.quizQuestions];
		const newQuizSections = [...newQuizQuestions[questionIndex]]
		newQuizSections.splice(index, 1);

		// Update maxSectionNumber if needed
		if (test.quizQuestions[questionIndex][index].sectionNumber === maxQuizSectionNumbers[questionIndex]) {
			let newMax = 0;
			for (let s of newQuizSections) {
				if (s.sectionNumber > newMax) {
					newMax = s.sectionNumber;
				}
			}
			const newMaxQuizSectionNumbers = [...maxQuizSectionNumbers]
			newMaxQuizSectionNumbers[questionIndex] = newMax
			setMaxQuizSectionNumbers(newMaxQuizSectionNumbers)
		}
		newQuizQuestions[questionIndex] = newQuizSections
		updateQuizIndices(newQuizQuestions, questionIndex);
		updateQuizQuestions(newQuizQuestions);
	};

	const moveQuizSection = (index, direction, questionIndex) => {
		if (
			index + direction < 0 ||
			index + direction >= test.quizQuestions[questionIndex].length
		)
			return;


		const newQuizQuestions = [...test.quizQuestions];
		const newQuizSections = newQuizQuestions[questionIndex]
		let temp = newQuizSections[index];
		newQuizSections[index] = newQuizSections[index + direction];
		newQuizSections[index + direction] = temp;
		updateQuizIndices(newQuizQuestions, questionIndex);
		updateQuizQuestions(newQuizQuestions);
	};

	const updateQuizIndices = (newQuizQuestions, questionIndex) => {
		const newQuizSections = newQuizQuestions[questionIndex]
		for (let i = 0; i < newQuizSections.length; i++) {
			newQuizSections[i].index = i;
		}
		updateQuizQuestions(newQuizQuestions);
	};

	const updateQuizQuestions = (newQuizQuestions) => {
		let newTest = { ...test };
		newTest.quizQuestions = newQuizQuestions;
		setTest(newTest);
	};

	return (
		<div className="w-full h-full flex flex-col justify-start items-start bg-purple-50">
			<header className="w-full h-36 text-pink-400 flex items-center justify-start flex-col font-galindo">
				<div className="w-full h-12 flex items-center justify-between px-6 py-3 bg-pink-200">
					<p className="text-xl">{test.course}</p>
				</div>
				<h1 className="text-3xl mt-3 mb-1">{test.name}</h1>
				<div className="w-full h-[1px] bg-pink-200 mt-3" />
			</header>
			<div className="w-full h-full flex flex-col justify-start items-start bg-purple-50">
				{test.quizQuestions.map((quizQuestion, questionIndex) => (
					<Fragment
						key={`quiz-question-${questionIndex}`}
					>
						<div className={`w-full flex items-center justify-start flex-col font-galindo mt-10 ${curQuizQuestion === questionIndex ? 'text-pink-900' : 'text-pink-400'}`}>
							<div className="w-full h-[1px] bg-pink-200 mb-3" />
							<h3 className="text-2xl mt-2 mb-0.5 cursor-pointer"
								onClick={() => {
									setCurQuizQuestion(questionIndex)
								}}
							>
								Question {questionIndex + 1}.
							</h3>
						</div>
						{quizQuestion.map((quizSection, index) => {
							// 0 is text, 1 is img, 2 is mc, 3 is fill in the blank
							switch (quizSection.sectionType) {
								case 0:
									return (
										<TextSection
											key={`quiz-section-${questionIndex}-${index}`}
											text={quizSection.text}
											section={quizSection}
											changeSectionNumber={changeQuizSectionNumber}
											deleteSection={deleteQuizSection}
											moveSection={moveQuizSection}
											active={false}
											questionIndex={questionIndex}
										/>
									);
								case 1:
									return (
										<ImgSection
											key={`quiz-section-${questionIndex}-${index}`}
											image={quizSection.image}
											section={quizSection}
											changeSectionNumber={changeQuizSectionNumber}
											deleteSection={deleteQuizSection}
											moveSection={moveQuizSection}
											active={false}
											questionIndex={questionIndex}
										/>
									);
								case 2:
									return (
										<MCSection
											key={`quiz-section-${questionIndex}-${index}`}
											options={quizSection.options}
											section={quizSection}
											changeSectionNumber={changeQuizSectionNumber}
											deleteSection={deleteQuizSection}
											moveSection={moveQuizSection}
											active={false}
											questionIndex={questionIndex}
											explanation={quizSection.explanation}
										/>
									);
								case 3:
									return (
										<FBSection
											key={`quiz-section-${questionIndex}-${index}`}
											text={quizSection.text}
											afterBlank={quizSection.afterBlank}
											section={quizSection}
											changeSectionNumber={changeQuizSectionNumber}
											deleteSection={deleteQuizSection}
											moveSection={moveQuizSection}
											active={false}
											questionIndex={questionIndex}
											explanation={quizSection.explanation}
										/>
									);
								default:
									return <div key={index} />;
							}
						})}
					</Fragment>
				))}
			</div>
		</div>
	);
}

