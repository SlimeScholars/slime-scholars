import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Course from '../../../models/courseModel'

/**
 * @desc    Create a course
 * @route   POST /api/admin/create-course
 * @access  Private - Admin
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

    const course = await Course.create({
      latestAuthor: `${user.firstName} ${user.lastName}`
    })
    // No need to populate because units is empty

    res.status(201).json({course})

  } catch(error) {
    console.log(error.message)
    res.status(400).json({message: error.message})
  }
}
