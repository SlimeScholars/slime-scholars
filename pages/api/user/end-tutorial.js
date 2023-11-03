import { authenticate } from "../../../utils/authenticate"
import { verifyApiKey } from "../../../utils/verify"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

/**
 * @desc    Change profile picture
 * @route   POST /api/user/change-pfp
 * @access  Private - Students
 */
export default async function (req, res) {
  try {
    if (req.method !== 'POST') {
      throw new Error(`${req.method} is an invalid request method`)
    }
    verifyApiKey(req.headers.apikey)

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a student
    checkUserType(user, 1)

    await User.findByIdAndUpdate(user._id, {
      tutorialActive: false,
    })

    res.status(200).json({ tutorialActive: false })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

