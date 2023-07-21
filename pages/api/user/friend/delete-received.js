import { mongoose } from 'mongoose'
import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import User from '../../../../models/userModel'

/**
 * @desc    Delete received friend request
 * @route   POST /api/user/friend/delete-received
 * @access  Private - Students
 * @param   {string} req.body.friendId - Account id of person you want delete the friend request of
 */
export default async function (req, res) {
  try {
    if(req.method !== 'POST') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a student
    checkUserType(user, 1)

    const { friendId } = req.body

    const friendIdObj = new mongoose.Types.ObjectId(friendId)

    const simpleUser = await User.findById(user._id, {password: 0})

    if(!simpleUser.receivedFriendRequests.includes(friendIdObj)) {
      throw new Error('You did not send a friend request of that id')
    }

    const friend = await User.findById(friendIdObj, {password: 0})
    if(!friend) {
      throw new Error('Cannot find user of that id')
    }

    // Delete friend request
    simpleUser.receivedFriendRequests = simpleUser.friends.filter((element) => element == friendIdObj)
    friend.sentFriendRequests = friend.friends.filter((element) => element == simpleUser._id)

    // Update database
    await User.findByIdAndUpdate(user._id, {
      receivedFriendRequests: simpleUser.receivedFriendRequests,
    })
    await User.findByIdAndUpdate(friendIdObj, {
      sentFriendRequests: friend.sentFriendRequests,
    })

    const newUser = await User.findById(user._id, {password: 0})
      .populate({
        path: 'parent',
        select: '_id userType firstName lastName honorific email',
      })
      // TODO: Add profile picture, badges, score, etc.
      .populate({
        path: 'friends',
        select: '_id userType username'
      })
      .populate({
        path: 'receivedFriendRequests',
        select: '_id userType username'
      })
      .populate({
        path: 'sentFriendRequests',
        select: '_id userType username'
      })
      .exec()

    res.status(200).json({
      user: newUser,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
