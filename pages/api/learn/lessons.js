import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Course from "../../../models/courseModel"
import Unit from "../../../models/unitModel"
// Import for the populate
import '../../../models/lessonModel'

/**
 * @desc    Get units for unit selection
 * @route   GET /api/learn/lessons
 * @access  Private - Students
 * @param   {string} req.query.courseId - Id of the course the lesson belongs to
 * @param   {string} req.query.unitId - Id of the unit the lesson belongs to
 */
export default async function (req, res) {
  try {
    if (req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a student
    checkUserType(user, 1)

    const { courseId, unitId } = req.query

    const course = await Course.findById(courseId)
      .select('courseName')

    const unit = await Unit.findById(unitId)
      .select('unitName lessons')
      .populate({
        path: 'lessons',
        select: '_id lessonName',
      })

    const modifiedLessons = []
    // Check user for completed
    for (let i in unit.lessons) {
      modifiedLessons.push({
        _id: unit.lessons[i]._id,
        lessonName: unit.lessons[i].lessonName,
        stars: -1,
        looted: false,
      })
      for (let j in user.completedLessons) {
        if (
          (user.completedLessons[j].lesson._id && user.completedLessons[j]._id.equals(unit.lessons[i]._id)) ||
          user.completedLessons[j].unit.equals(unit.lessons[i]._id)
        ) {
          modifiedLessons[i].stars = user.completedLessons[j].stars
          modifiedLessons[i].looted = user.completedLessons[j].looted
        }
      }
    }

    res.json({
      courseName: course.courseName,
      unitName: unit.unitName,
      lessons: modifiedLessons,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

