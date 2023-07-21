import { mongoose } from 'mongoose'
import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import User from '../../../../models/userModel'

/**
 * @desc    Add friend (only if you have already received a friend request)
 * @route   POST /api/user/friend/accept
 * @access  Private - Students
 * @param   {string} req.body.friendId - Account id of person you want to friend
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

    if(user._id.equals(friendIdObj)) {
      throw new Error('Cannot friend yourself')
    }

    const simpleUser = await User.findById(user._id, {password: 0})
    const friend = await User.findById(friendId, {password: 0})

    if(!friend) {
      throw new Error('Cannot find user of that id')
    }

    if(friend.userType !== 1) {
      throw new Error('You can only friend students')
    }

    if(simpleUser.friends.includes(friendIdObj)) {
      throw new Error(`You are already friends with ${friend.username}`)
    }

    if(!simpleUser.receivedFriendRequests.includes(friendIdObj)) {
      throw new Error(`Did not receive friend request from ${friend.username}`)
    }

    // Add to friends
    simpleUser.friends.push(friendIdObj)
    friend.friends.push(user._id)

    // Clear sent and received requests from both sides
    simpleUser.receivedFriendRequests = simpleUser.receivedFriendRequests.filter((element) => element == friendIdObj)

    friend.sentFriendRequests = friend.sentFriendRequests.filter((element) => element == user._id)

    // Update database
    await User.findByIdAndUpdate(user._id, {
      receivedFriendRequests: simpleUser.receivedFriendRequests,
      friends: simpleUser.friends,
    })
    await User.findByIdAndUpdate(friendIdObj, {
      sentFriendRequests: friend.sentFriendRequests,
      friends: friend.friends,
    })

    // Instead of sending ids, send objects for friends and friend requests
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
      user: newUser
    })
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
