import { mongoose } from 'mongoose'
import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import User from '../../../../models/userModel'

/**
 * @desc    Send a friend request
 * @route   POST /api/user/friend/send
 * @access  Private - Students
 * @param   {string} req.body.friendId - Account id of person you are trying to friend
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

    if(user._id.equals(friendIdObj)) {
      throw new Error('Cannot friend yourself')
    }

    const friend = await User.findById(friendIdObj, {password: 0})

    if(!friend) {
      throw new Error('Cannot find user of that id')
    }

    if(friend.userType !== 1) {
      throw new Error('You can only friend students')
    }

    if(simpleUser.friends.includes(friendIdObj)) {
      throw new Error(`You are already friends with ${friend.username}`)
    }

    if(simpleUser.sentFriendRequests.includes(friendIdObj)) {
      throw new Error(`You already sent a friend request to ${friend.username}`)
    }

    // If you are trying to friend request someone that already request you,
    // delete the request and become friends
    if(simpleUser.receivedFriendRequests.includes(friendIdObj)) {
      // Add to friends
      simpleUser.friends.push(friendIdObj)
      friend.friends.push(user._id)

      // Delete friend requests
      simpleUser.receivedFriendRequests = simpleUser.receivedFriendRequests.filter((element) => element == friendIdObj)
      friend.sentFriendRequests = friend.sentFriendRequests.filter((element) => element == simpleUser._id)

      // Update
      await User.findByIdAndUpdate(user._id, {
        receivedFriendRequests: simpleUser.receivedFriendRequests,
        friends: simpleUser.friends,
      })
      await User.findByIdAndUpdate(user._id, {
        sentFriendRequests: friend.sentFriendRequests,
        friends: friend.friends,
      })

    const newUser = await User.findById(user._id, {
      password: 0, createdAt: 0, updatedAt: 0, __v: 0
    })
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
      .populate({
        path: 'slimes',
        select: '-userId -createdAt -updatedAt -__v',
      })
      .exec()

      res.status(200).json({
        user: newUser,
      })
      return
    }

    // If you haven't already requested, add the friend request to their received and your sent
    if(!simpleUser.sentFriendRequests.includes(friendIdObj)) {
      simpleUser.sentFriendRequests.push(friendIdObj)
    }
    if(!friend.receivedFriendRequests.includes(user._id)) {
      friend.receivedFriendRequests.push(user._id)
    }

    // Update friend requests
    await User.findByIdAndUpdate(user._id, {sentFriendRequests: simpleUser.sentFriendRequests})
    await User.findByIdAndUpdate(friendIdObj, {receivedFriendRequests: friend.receivedFriendRequests})

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