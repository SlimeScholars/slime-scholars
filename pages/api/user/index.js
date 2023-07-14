import { authenticate } from "../../../utils/authenticate"
import connectDB from '../../../utils/connectDB'

/**
 * @desc    Get user data
 * @route   GET /api/user/
 * @access  Private
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

    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}