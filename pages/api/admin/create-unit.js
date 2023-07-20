import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Course from '../../../models/courseModel'
import Unit from "../../../models/unitModel"

/**
 * @desc    Create a course
 * @route   POST /api/admin/create-course
 * @access  Private - Admin
 * @param   {string} req.body.className - Max 60 characters long.
 */
export default async function (req, res) {
  try {
    if(req.method !== 'POST') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 4)

    const { courseId, unitNumber } = req.body

    if(!courseId) {
      throw new Error('Missing courseId')
    }
    if(unitNumber === undefined) {
      throw new Error('Missing unit number')
    }
    
    const course = await Course.findById(courseId)
    if(!course) {
      throw new Error('Could not find course')
    }

    const latestAuthor = `${user.firstName} ${user.lastName}`

    const unit = await Unit.create({
      unitNumber,
      latestAuthor,
    })

    course.units.push(unit._id)
    course.latestAuthor = latestAuthor

    await Course.findByIdAndUpdate(courseId, {
      units: course.units,
      latestAuthor,
    })

    const newCourse = await Course.findById(courseId)
      .populate('units')

    res.status(201).json({course: newCourse})

  } catch(error) {
    console.log(error.message)
    res.status(400).json({message: error.message})
  }
}

