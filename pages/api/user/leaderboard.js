import User from "../../../models/userModel"
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from "../../../utils/checkUserType"
import connectDB from '../../../utils/connectDB'
import { getPopulatedPlayer } from "../../../utils/getPopulatedUser"

/**
 * @desc    Get user data of the person who is signed in
 * @route   GET /api/user/leaderboard
 * @access  Private - Any logged in student
 */
export default async function (req, res) {
	try {
		if (req.method !== 'GET') {
			throw new Error(`${req.method} is an invalid request method`)
		}

		// Connect to database
		await connectDB()

		// Authenticate and get user
		const user = await authenticate(req.headers.authorization)

		// Make sure user is a student
		checkUserType(user, 1)

		const leaderboard = await User.find({ userType: 1 })
			.sort({ exp: -1 }) // Sort in descending order by exp
			// TODO: Make sure 20 is the number to show
			.limit(20) // How many users to find
			.select('_id')

		const populatedLeaderboard = []

		for (let i in leaderboard) {
			const populatedPlayer = await getPopulatedPlayer(leaderboard[i]._id)
			populatedLeaderboard.push(populatedPlayer)
		}

		res.status(200).json({ leaderboard: populatedLeaderboard })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
