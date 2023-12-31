import { authenticate } from "../../../../utils/authenticate"
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import Course from '../../../../models/courseModel'
import '../../../../models/unitModel'
import '../../../../models/lessonModel'

/**
 * @desc    Update a course's name
 * @route   PUT /api/admin/course/update-name
 * @access  Private - Admin
 * @param   {string} req.body.courseId - Id of the course you want to update
 * @param   {string} req.body.courseName - The name you want to update the course to
 */
export default async function (req, res) {
  try {
    if (req.method !== 'PUT') {
      throw new Error(`${req.method} is an invalid request method`)
    }
    verifyApiKey(req.headers.apikey)

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 4)

    const { courseId, courseName } = req.body

    if (!courseId) {
      throw new Error('Please send a courseId')
    }

    const courseExists = Course.findById(courseId)

    if (!courseExists) {
      throw new Error('Could not find the course to update')
    }

    await Course.findByIdAndUpdate(courseId, {
      courseName,
      latestAuthor: `${user.firstName} ${user.lastName}`,
    })

    const course = await Course.findById(courseId)
      .populate({
        path: 'units',
        populate: {
          path: 'lessons',
          model: 'Lesson',
        },
      })

    res.status(200).json({ course })

  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message })
  }
}

