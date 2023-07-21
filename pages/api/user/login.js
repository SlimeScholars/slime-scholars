import { generateToken } from '../../../utils/generateToken'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
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
    if(req.method !== 'POST') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    const {
      accountIdentifier,
      password
    } = req.body

    let user
    if(accountIdentifier.includes('@')) {
      user = await User.findOne({ email: accountIdentifier }, {
        createdAt: 0, updatedAt: 0, __v: 0
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
    }
    else {
      // Search user by username
      const usernameRegex = new RegExp(accountIdentifier, 'i')
      user = await User.findOne({ username: { $regex: usernameRegex } }, {
        createdAt: 0, updatedAt: 0, __v: 0
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
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      user.password = undefined
      res.status(200).json({
        token: generateToken(user._id),
        user,
      })
    } else {
      throw new Error('Invalid credentials')
    }
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}
