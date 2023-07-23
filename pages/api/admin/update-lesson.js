import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Lesson from "../../../models/lessonModel"

/**
 * @desc    Update a lesson
 * @route   POST /api/admin/update-lesson
 * @access  Private - Admin
 * @param   {string} req.body.className - Max 60 characters long.
 */
export default async function (req, res) {
  try {
    if(req.method !== 'PUT') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 4)

    const { lessonId, lessonName } = req.body

    if(!lessonId) {
      throw new Error('Please send a lessonId')
    }

    const lessonExists = Lesson.findById(lessonId)

    if(!lessonExists) {
      throw new Error('Could not find the lesson to update')
    }

    await Lesson.findByIdAndUpdate(lessonId, {
      lessonName,
      latestAuthor: `${user.firstName} ${user.lastName}`,
    })

    const lesson = await Lesson.findById(lessonId)

    res.status(200).json({lesson})

  } catch(error) {
    console.log(error.message)
    res.status(400).json({message: error.message})
  }
}



