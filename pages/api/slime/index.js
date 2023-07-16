import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Slime from "../../../models/slimeModel"

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
    
    // Instead of sending Ids, send objects for slimes
    const slimes = await Slime.find({userId: user._id})
    const roster = await Slime.find({_id: { $in: user.roster }})

    res.status(200).json({
      slimes,
      roster,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

