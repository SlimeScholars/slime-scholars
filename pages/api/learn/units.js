import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Course from '../../../models/courseModel'
// Import for the populate
import "../../../models/unitModel"

/**
 * @desc    Get units for unit selection
 * @route   GET /api/learn/units
 * @access  Private - Students
 * @param   {string} req.query.courseId - Id of the course the unit belongs to
 */
export default async function (req, res) {
  try {
    if(req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a student
    checkUserType(user, 1)

    const { courseId } = req.query

    const course = await Course.findById(courseId)
      .select('courseName units')
      .populate({
        path: 'units',
        select: '_id unitName',
      })
    
    const modifiedUnits = []
    // Check user for completed
    for(let i in course.units) {
      modifiedUnits.push({
        _id: course.units[i]._id,
        unitName: course.units[i].unitName,
        tier: 0,
      })
      for(let j in user.completedUnits) {
        if(
          (user.completedUnits[j].unit._id && user.completedUnits[j]._id.equals(course.units[i]._id)) ||
          user.completedUnits[j].unit.equals(course.units[i]._id)
        ) {
          modifiedUnits[i].tier = user.completedUnits[j].tier
        }
      }
    }

    res.json({
      courseName: course.courseName, 
      units: modifiedUnits,
    })
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
