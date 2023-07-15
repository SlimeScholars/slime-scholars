import { mongoose } from 'mongoose'
import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import User from '../../../../models/userModel'

/**
 * @desc    Delete sent friend request
 * @route   POST /api/user/friend/delete-sent
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

    if(!user.sentFriendRequests.includes(friendIdObj)) {
      throw new Error('You did not send a friend request of that id')
    }

    const friend = await User.findById(friendIdObj)
    if(!friend) {
      throw new Error('Cannot find user of that id')
    }

    // Delete friend request
    user.sentFriendRequests = user.friends.filter((element) => element == friendIdObj)
    friend.receivedFriendRequests = friend.friends.filter((element) => element == user._id)

    // Update database
    await User.findByIdAndUpdate(user._id, {
      sentFriendRequests: user.sentFriendRequests,
    })
    await User.findByIdAndUpdate(friendIdObj, {
      receivedFriendRequests: friend.receivedFriendRequests,
    })

    // Instead of sending Ids, send objects for received friend requests
    const receivedFriendRequests = []
    for(let friendId of user.receivedFriendRequests) {
      const receivedFriendRequest = await User.findById(friendId)
      receivedFriendRequest.password = undefined
      receivedFriendRequests.push(receivedFriendRequest)
    }
    user.receivedFriendRequests = receivedFriendRequests
    // Instead of sending Ids, send objects for sent friend requests
    const sentFriendRequests = []
    for(let friendId of user.sentFriendRequests) {
      const sentFriendRequest = await User.findById(friendId)
      sentFriendRequest.password = undefined
      sentFriendRequests.push(sentFriendRequest)
    }
    user.sentFriendRequests = sentFriendRequests
    // Instead of sending Ids, send objects for friends
    const friends = []
    for(let friendId of user.friends) {
      const foundFriend = await User.findById(friendId)
      foundFriend.password = undefined
      friends.push(foundFriend)
    }
    user.friends = friends

    res.status(200).json({user})

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
