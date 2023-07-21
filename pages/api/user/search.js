import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

/**
 * @desc    Search user's information by username
 * @route   GET /api/user/search?username=...
 * @access  Public
 * @param   {string} req.query.username - Max 15 characters long. Can only contain alphabetical characters.
 */
export default async function (req, res) {
  try {
    if(req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    const { username } = req.query

    if(!username) {
      throw new Error('Username cannot be empty')
    }

    // Search for user
    const usernameRegex = new RegExp(username, 'i')
    const user = await User.findOne({ username: { $regex: usernameRegex } }, {
      password: 0, createdAt: 0, updatedAt: 0, __v: 0
    })
      .populate({
        path: 'parent',
        select: '_id userType firstName lastName honorific email',
      })
      // TODO: Add profile picture, badges, score, etc.
      .populate({
        path: 'friends',
        select: '_id userType username',
      })
      .populate({
        path: 'receivedFriendRequests',
        select: '_id userType username',
      })
      .populate({
        path: 'sentFriendRequests',
        select: '_id userType username',
      })
      .populate({
        path: 'students',
        select: '_id userType username firstName lastName completed',
      })
      .populate({
        path: 'slimes',
        select: '-userId -createdAt -updatedAt -__v',
      })
      .exec()

    if(!user) {
      throw new Error(`Cannot find student "${username}"`)
    }

    res.status(200).json({user: user})

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
