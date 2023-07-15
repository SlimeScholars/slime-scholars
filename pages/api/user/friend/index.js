import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import User from '../../../../models/userModel'

/**
 * @desc    Get all friend requests and friends
 * @route   GET /api/user/friend/
 * @access  Private - Students
 */
export default async function (req, res) {
  try {
    if(req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a student
    checkUserType(user, 1)
    
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
