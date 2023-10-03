import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Course from "../../../models/courseModel"
import Unit from "../../../models/unitModel"
import Activity from "../../../models/activityModel"
// Import for the populate
import '../../../models/lessonModel'

/**
 * @desc    Get units for unit selection
 * @route   GET /api/learn/lessons
 * @access  Private - Students
 * @param   {string} req.query.courseId - Id of the course the lesson belongs to
 * @param   {string} req.query.unitId - Id of the unit the lesson belongs to
 */

const retrieve_activity = async (id) => {
  try {
    const response = await Activity.findById(id).exec()
    return response ? response : undefined
  }
  catch (err) {
    console.log(err)
  }
}

export default async function (req, res) {
  try {
    if (req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user with completed lessons, units, courses
    const user = await authenticate(req.headers.authorization, { lessons: 1, units: 1, courses: 1 })

    // Make sure user is a student
    checkUserType(user, 1)

    const { courseId, unitId } = req.query

    const course = await Course.findById(courseId)
      .select('courseName')

    const unit = await Unit.findById(unitId)
      .select('unitName unitNumber lessons')
      .populate({
        path: 'lessons',
        select: '_id lessonName lessonType activities',
      })

    const modifiedLessons = []
    // Check user for completed
    for (let i in unit.lessons) {
      modifiedLessons.push({
        ...unit.lessons[i]._doc,
        activities: unit.lessons[i].activities ?
          await Promise.all(unit.lessons[i].activities.map(retrieve_activity)) : [],
      })
      for (let j in user.completedLessons) {
        if (
          (user.completedLessons[j].lesson._id && user.completedLessons[j].lesson._id.equals(unit.lessons[i]._id)) ||
          user.completedLessons[j].lesson && user.completedLessons[j].lesson.equals(unit.lessons[i]._id)
        ) {
          modifiedLessons[i].stars = user.completedLessons[j].stars
          modifiedLessons[i].looted = user.completedLessons[j].looted
        }
      }
    }

    console.log(modifiedLessons)

    let unitTestStars = -1
    // Check for unit test completion
    for (let i in user.completedUnits) {
      if (user.completedUnits[i].unit == unitId) {
        unitTestStars = user.completedUnits[i].stars
        break
      }
    }

    res.json({
      courseName: course.courseName,
      unitName: unit.unitName,
      unitNumber: unit.unitNumber,
      lessons: modifiedLessons,
      unitTestStars,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

