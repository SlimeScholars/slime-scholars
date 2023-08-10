import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Course from '../../../models/courseModel'

/**
 * @desc    Get courses for course selection
 * @route   GET /api/learn/courses
 * @access  Private - Students
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

    const courses = await Course.find({})
      .select('_id courseName units')
      .populate({
        path: 'units',
        select: '_id unitName',
      })
    
    const modifiedCourses = []
    // Check user for completed
    for(let i in courses) {
      modifiedCourses.push({
        _id: courses[i]._id,
        courseName: courses[i].courseName,
        units: courses[i].units,
        tier: 0,
      })
      for(let j in user.completedCourses) {
        if(
          (user.completedCourses[j].course._id && user.completedCourses[j]._id.equals(courses[i]._id)) ||
          user.completedCourses[j].course.equals(courses[i]._id)
        ) {
          modifiedCourses[i].tier = user.completedCourses[j].tier
        }
      }
    }

    res.json({ courses: modifiedCourses })
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}


