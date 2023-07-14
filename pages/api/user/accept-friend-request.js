import { mongoose } from 'mongoose'
import { authenticate } from "../../../utils/authenticate"
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

/**
 * @desc    Add friend (only if you have already received a friend request)
 * @route   POST /api/user/accept-friend-request
 * @access  Private
 * @param   {string} req.body.friendId - Account id of person you want to friend
 */
const addFriend = asyncHandler(async (req, res) => {
  try {
    if(req.method !== 'POST') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    const { friendId } = req.body
    const friendIdObj = mongoose.Types.ObjectId(friendId)

    if(user._id.equals(friendIdObj)) {
      throw new Error('Cannot friend yourself')
    }

    const friend = await User.findById(friendIdObj)

    if(!friend) {
      throw new Error('Cannot find user of that id')
    }

    if(friend.userType !== 1) {
      throw new Error('Can only friends students')
    }

    if(user.friends.includes(friendIdObj)) {
      throw new Error('You are already friends')
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
    res.status(200).json({message: 'Successfully added friend'})
  } catch(error) {
    res.status(400).json({message: error.message})
  }
})
