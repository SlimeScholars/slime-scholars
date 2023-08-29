import connectDB from '../../../../utils/connectDB'
import Lesson from '../../../../models/lessonModel'
import Unit from '../../../../models/unitModel'
import Course from '../../../../models/courseModel'

/**
 * @desc    Get information of a lesson (for student), randomly selecting 4 quiz questions from the question bank
 * @route   GET /api/learn/lesson
 * @access  Public
 * @param   {string} req.query.lessonId - Id of lesson you want to get information of
 */
export default async function (req, res) {
  try {
    if (req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    const { lessonId, unitId, courseId } = req.query

    if (!lessonId || !unitId || !courseId) {
      throw new Error('Missing required ids')
    }

    // Get lesson
    const lesson = await Lesson.findById(lessonId, {
      createdAt: 0, updatedAt: 0, __v: 0
    })

    if (!lesson) {
      throw new Error('Could not find lesson')
    }

    if (!lesson.quizQuestions || lesson.quizQuestions.length < 4) {
      throw new Error('Lesson does not have enough quiz questions')
    }
    // Pick four random quiz questions from lesson
    const quizQuestionBank = [...lesson.quizQuestions]
    const quizQuestions = []
    while (quizQuestions.length < 4) {
      const randomIndex = Math.floor(Math.random() * quizQuestionBank.length)
      const randomQuestion = quizQuestionBank.splice(randomIndex, 1)[0]
      quizQuestions.push(randomQuestion)
    }
    lesson.quizQuestions = quizQuestions

    const unit = await Unit.findById(unitId)
      .select('unitName')

    const course = await Course.findById(courseId)
      .select('courseName')

    if (!lesson) {
      throw new Error('Could not find lesson')
    }

    res.status(200).json({
      lesson,
      unitName: unit.unitName,
      courseName: course.courseName
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
