import { mongoose } from 'mongoose'
import { authenticate } from "../../../utils/authenticate"
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

/**
 * @desc    Send a friend request
 * @route   POST /api/user/send-friend-request
 * @access  Private
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
    
    const { friendId } = req.body

    const friendIdObj = new mongoose.Types.ObjectId(friendId)

    if(user._id.equals(friendIdObj)) {
      throw new Error('Cannot friend yourself')
    }

    const friend = await User.findById(friendIdObj)

    if(!friend) {
      throw new Error(`Cannot find user`)
    }

    if(friend.userType !== 1) {
      throw new Error('Can only friends students')
    }

    if(user.friends.includes(friendIdObj)) {
      throw new Error('You are already friends')
    }

    if(user.sentFriendRequests.includes(friendIdObj)) {
      throw new Error('You already sent the friend request')
    }

    // If you are trying to friend request someone that already request you,
    // delete the request and become friends
    if(user.receivedFriendRequests.includes(friendIdObj)) {
      // Add to friends
      user.friends.push(friendIdObj)
      friend.friends.push(user._id)

      // Delete friend requests
      user.receivedFriendRequests = user.receivedFriendRequests.filter((element) => element == friendIdObj)
      friend.sentFriendRequests = friend.sentFriendRequests.filter((element) => element == user._id)

      // Update
      await User.findByIdAndUpdate(user._id, {
        receivedFriendRequests: user.receivedFriendRequests,
        friends: user.friends,
      })
      await User.findByIdAndUpdate(user._id, {
        sentFriendRequests: friend.sentFriendRequests,
        friends: friend.friends,
      })
      res.status(200).json({
        sentFriendRequests: user.sentFriendRequests,
        friends: user.friends
      })
      return
    }

    // If you haven't already requested, add the friend request to their received and your sent
    if(!user.sentFriendRequests.includes(friendIdObj)) {
      user.sentFriendRequests.push(friendIdObj)
    }
    if(!friend.receivedFriendRequests.includes(user._id)) {
      friend.receivedFriendRequests.push(user._id)
    }

    // Update friend requests
    await User.findByIdAndUpdate(user._id, {sentFriendRequests: user.sentFriendRequests})
    await User.findByIdAndUpdate(friendIdObj, {receivedFriendRequests: friend.receivedFriendRequests})

    res.status(200).json({
      sentFriendRequests: user.sentFriendRequests,
      friends: user.friends,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}