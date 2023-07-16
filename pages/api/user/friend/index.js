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
    
    // Instead of sending ids, send objects for friends and friend requests
    const receivedFriendRequests = await User.find({ _id: { $in: user.receivedFriendRequests} }, { password: 0})
    const sentFriendRequests = await User.find({ _id: { $in: user.sentFriendRequests} }, { password: 0})
    const friends = await User.find({ _id: { $in: user.friends} }, { password: 0})

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
