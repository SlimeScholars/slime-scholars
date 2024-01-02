import { authenticate } from "../../../utils/authenticate"
import { verifyApiKey } from "../../../utils/verify"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Class from '../../../models/classModel'

/**
 * @desc    Get information about all the classes a user is enrolled in
 * @route   GET /api/class/
 * @access  Private - Students and teachers
 */
export default async function (req, res) {
  try {
    if (req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }
    verifyApiKey(req.headers.apikey)

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 1, 3)

    // Send teacher objects instead of their ids
    const classes = []
    for (let classId of user.classes) {
      const newClass = await Class.findById(classId)
      const teachers = await User.find({ userType: 3, classes: classId }, { password: 0 })
      newClass.teachers = teachers
      classes.push(newClass)
    }

    res.status(200).json({
      classes,
    })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}


