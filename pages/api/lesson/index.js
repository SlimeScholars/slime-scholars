import connectDB from '../../../utils/connectDB'
import Lesson from '../../../models/lessonModel'

/**
 * @desc    Get information of all courses
 * @route   GET /api/lesson
 * @access  Public
 * @param   {string} req.query.lessonId - Id of lesson you want to get information of
 */
export default async function (req, res) {
  try {
    if(req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    const { lessonId } = req.query
    // Get lesson
    const lesson = await Lesson.findById(lessonId, {
      createdAt: 0, updatedAt: 0, __v: 0
    })

    res.status(200).json({ lesson })
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

