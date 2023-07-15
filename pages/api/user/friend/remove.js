import { mongoose } from 'mongoose'
import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import User from '../../../../models/userModel'

/**
 * @desc    Remove friend
 * @route   POST /api/user/friend/remove
 * @access  Private - Students
 * @param   {string} req.body.friendId - Account id of friend you want delete
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

    if(!user.friends.includes(friendIdObj)) {
      throw new Error('You already were not friends with anyone of that id')
    }

    const friend = await User.findById(friendIdObj)

    // This shouldn't happen usually, but if a user gets deleted, it could happen
    if(!friend) {
      throw new Error('Could not find that friend')
    }

    user.friends = user.friends.filter((element) => element == friendIdObj)
    friend.friends = friend.friends.filter((element) => element == user._id)

    await User.findByIdAndUpdate(user._id, {
      friends: user.friends,
    })
    await User.findByIdAndUpdate(friendIdObj, {
      friends: friend.friends,
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
