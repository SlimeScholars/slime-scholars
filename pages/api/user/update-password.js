import { verifyApiKey, verifyPassword } from "../../../utils/verify"
import { authenticate } from "../../../utils/authenticate"
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
const bcrypt = require('bcryptjs')
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)

/**
 * @desc    Update user's password
 * @route   PUT /api/user/update-password
 * @access  Private - Any logged in user
 * @param   {string} req.body.oldPassword - Previous password (used to confirm it's the actual user)
 * @param   {string} req.body.newPassword - The password the user wants to change to. Min 8 characters long. Max 55 characters long. Must contain a capital, lowercase, and a number.
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

    const {
      oldPassword,
      newPassword,
    } = req.body

    if (!oldPassword || !newPassword) {
      throw new Error('Password cannot be left blank')
    }

    verifyPassword(newPassword)

    const correctPassword = (await User.findById(user._id)).password

    // Change hashedPassword only if the user updated the old password
    if (!(await bcrypt.compare(oldPassword, correctPassword))) {
      throw new Error('Incorrect old password')
    }

    // Update password only if new password is different
    if (oldPassword !== newPassword) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS)
      const hashedPassword = await bcrypt.hash(newPassword, salt)

      await User.findByIdAndUpdate(user._id, { password: hashedPassword })
    }

    res.status(200).end()

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
