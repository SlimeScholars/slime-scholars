import { authenticate } from "../../../utils/authenticate"
import { calcSlimeGel } from "../../../utils/calcSlimeGel"
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

/**
 * @desc    Get user data of the person who is signed in
 * @route   GET /api/user/
 * @access  Private - Any logged in user
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
    const data = calcSlimeGel(user?.lastSlimeRewards, user?.roster)

    if(data){
      const update = await User.findById(user._id)
      update.lastSlimeRewards = data.newDate
      update.slimeGel += data.rewards
      await update.save()
      user.screen_display_notif = {
        intervals: data.intervals,
        currentDate: (new Date()).toISOString(),
        oldDate: data.oldDate,
        previousSlime: user.slimeGel,
        newSlime: user.slimeGel + data.rewards,
      }
    }
    else{
      user.screen_display_notif = null
    }

    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}