import connectDB from '../../../../utils/connectDB'
import Unit from '../../../../models/unitModel'
import Course from '../../../../models/courseModel'

/**
 * @desc    Get information of a unit test (for student), randomly selecting 10 questions from the question bank
 * @route   GET /api/learn/unit
 * @access  Public
 * @param   {string} req.query.unitId - Id of unit you want to get information of
 */
export default async function (req, res) {
	try {
		if (req.method !== 'GET') {
			throw new Error(`${req.method} is an invalid request method`)
		}

		// Connect to database
		await connectDB()

		const { unitId, courseId } = req.query

		if (!unitId || !courseId) {
			throw new Error('Missing required ids')
		}

		// Get unit
		const unit = await Unit.findById(unitId, {
			createdAt: 0, updatedAt: 0, __v: 0, lessons: 0,
		})

		if (!unit) {
			throw new Error('Could not find unit')
		}

		if (!unit.quizQuestions || unit.quizQuestions.length < 10) {
			throw new Error('Unit does not have enough quiz questions')
		}
		// Pick 10 random questions from unit question bank
		const quizQuestionBank = [...unit.quizQuestions]
		const quizQuestions = []
		while (quizQuestions.length < 10) {
			const randomIndex = Math.floor(Math.random() * quizQuestionBank.length)
			const randomQuestion = quizQuestionBank.splice(randomIndex, 1)[0]
			quizQuestions.push(randomQuestion)
		}
		unit.quizQuestions = quizQuestions

		const course = (await Course.findById(courseId)
			.select('courseName')
		)

		res.status(200).json({
			unit: unit,
			courseName: course.courseName
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
