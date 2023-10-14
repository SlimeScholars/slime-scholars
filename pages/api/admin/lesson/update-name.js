import { authenticate } from "../../../../utils/authenticate"
import { verifyApiKey } from "../../../../utils/verify"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import Lesson from "../../../../models/lessonModel"

/**
 * @desc    Update the name of a lesson
 * @route   PUT /api/admin/lesson/update-name
 * @access  Private - Admin
 * @param   {string} req.body.lessonId - Id of lesson you want to update
 * @param   {string} req.body.lessonName - Lesson name you want to update to
 */
export default async function (req, res) {
  try {
    if (req.method !== 'PUT') {
      throw new Error(`${req.method} is an invalid request method`)
    }
    verifyApiKey(req.headers.apiKey)

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 4)

    const { lessonId, lessonName } = req.body

    if (!lessonId) {
      throw new Error('Please send a lessonId')
    }

    const lessonExists = Lesson.findById(lessonId)

    if (!lessonExists) {
      throw new Error('Could not find the lesson to update')
    }

    await Lesson.findByIdAndUpdate(lessonId, {
      lessonName,
      latestAuthor: `${user.firstName} ${user.lastName}`,
    })

    const lesson = await Lesson.findById(lessonId)

    res.status(200).json({ lesson })

  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message })
  }
}



