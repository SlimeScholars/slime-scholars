import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import { getPopulatedPlayer } from '../../../utils/getPopulatedUser'

/**
 * @desc    Search user's information by username
 * @route   GET /api/user/search?username=...
 * @access  Public
 * @param   {string} req.query.username - Max 15 characters long. Can only contain alphabetical characters.
 */
export default async function (req, res) {
  try {
    if (req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    const { username } = req.query

    if (!username) {
      throw new Error('Username cannot be empty')
    }

    // Search for user
    const usernameRegex = new RegExp(`^${username}$`, 'i')
    const userId = (await User.findOne({ username: { $regex: usernameRegex } })
      .select('_id')
      .exec()
    )

    if (!userId) {
      throw new Error(`Cannot find student "${username}"`)
    }

    const user = await getPopulatedPlayer(userId)

    res.status(200).json({ user: user })

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
