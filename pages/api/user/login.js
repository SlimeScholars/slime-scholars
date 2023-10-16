import { generateToken } from '../../../utils/generateToken'
import { verifyApiKey } from '../../../utils/verify'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import { getPopulatedUser } from '../../../utils/getPopulatedUser'
const bcrypt = require('bcryptjs')

/**
 * @desc    Login a user and change their authorization token on local storage
 * @route   POST /api/user/login
 * @access  Public
 * @param   {string} req.body.accountIdentifier - Either email (students, parents, teachers) or username (students)
 * @param   {string} req.body.password - Password
 */
export default async function (req, res) {
  try {
    if (req.method !== 'POST') {
      throw new Error(`${req.method} is an invalid request method`)
    }
    verifyApiKey(req.headers.apiKey)

    // Connect to database
    await connectDB()

    const {
      accountIdentifier,
      password
    } = req.body

    let user
    if (accountIdentifier.includes('@')) {
      user = await User.findOne({ email: accountIdentifier })
    }
    else {
      // Search user by username
      const usernameRegex = new RegExp(`^${accountIdentifier}$`, 'i')
      user = await User.findOne({ username: { $regex: usernameRegex } })
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      user.password = undefined

      const populatedUser = await getPopulatedUser(user._id)

      res.status(200).json({
        token: generateToken(user._id),
        user: populatedUser,
      })
    } else {
      throw new Error('Invalid credentials')
    }

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
