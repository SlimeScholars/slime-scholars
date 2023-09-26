import connectDB from '../../../utils/connectDB'
import Course from '../../../models/courseModel'
// Import these to initialize the models for the populate
import '../../../models/unitModel'
import '../../../models/lessonModel'
import '../../../models/activityModel'

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
        populate: {
          path: 'activities',
          model: 'Activity',
        },
      },
    });

    res.status(200).json({ courses })
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}
