import connectDB from '../../../utils/connectDB'
import Course from '../../../models/courseModel'
import Unit from '../../../models/unitModel'

/**
 * @desc    Get information of all courses
 * @route   GET /api/course/
 * @access  Public
 */
export default async function (req, res) {
  try {
    if(req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Get all courses
    const courses = await Course.find({})
      .populate({
        path: 'units',
        populate: {
          path: 'lessons',
          model: 'Lesson', 
        },
      })

    res.status(200).json({ courses })
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}
