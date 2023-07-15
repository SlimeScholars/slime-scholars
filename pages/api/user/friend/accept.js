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

    const friend = await User.findById(friendIdObj)

    if(!friend) {
      throw new Error('Cannot find user of that id')
    }

    if(friend.userType !== 1) {
      throw new Error('You can only friend students')
    }

    if(user.friends.includes(friendIdObj)) {
      throw new Error(`You are already friends with ${friend.username}`)
    }

    if(!user.receivedFriendRequests.includes(friendIdObj)) {
      throw new Error(`Did not receive friend request from ${friend.username}`)
    }

    // Add to friends
    user.friends.push(friendIdObj)
    friend.friends.push(user._id)

    // Clear sent and received requests from both sides
    user.receivedFriendRequests = user.receivedFriendRequests.filter((element) => element == friendIdObj)

    friend.sentFriendRequests = friend.sentFriendRequests.filter((element) => element == user._id)

    // Update database
    await User.findByIdAndUpdate(user._id, {
      receivedFriendRequests: user.receivedFriendRequests,
      friends: user.friends,
    })
    await User.findByIdAndUpdate(friendIdObj, {
      sentFriendRequests: friend.sentFriendRequests,
      friends: friend.friends,
    })

    // Instead of sending Ids, send objects for received friend requests
    const receivedFriendRequests = []
    for(let friendId of user.receivedFriendRequests) {
      const receivedFriendRequest = await User.findById(friendId)
      receivedFriendRequest.password = undefined
      receivedFriendRequests.push(receivedFriendRequest)
    }
    // Instead of sending Ids, send objects for sent friend requests
    const sentFriendRequests = []
    for(let friendId of user.sentFriendRequests) {
      const sentFriendRequest = await User.findById(friendId)
      sentFriendRequest.password = undefined
      sentFriendRequests.push(sentFriendRequest)
    }
    // Instead of sending Ids, send objects for friends
    const friends = []
    for(let friendId of user.friends) {
      const foundFriend = await User.findById(friendId)
      foundFriend.password = undefined
      friends.push(foundFriend)
    }

    res.status(200).json({
      user,
      receivedFriendRequests,
      sentFriendRequests,
      friends
    })
  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
