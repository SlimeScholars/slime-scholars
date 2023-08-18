import User from "../../../models/userModel"
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from "../../../utils/checkUserType"
import connectDB from '../../../utils/connectDB'
import { getPopulatedRoster } from "../../../utils/getPopulatedRoster"

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

		const leaderboard = await User.find({})
			.sort({ exp: -1 }) // Sort in descending order by exp
			// TODO: Make sure 20 is the number to show
			.limit(20) // How many users to find
			.select('-password -createdAt -updatedAt -__v')
			.populate({
				path: 'parent',
				select: '_id userType firstName lastName honorific email',
			})
			// TODO: Add profile picture, badges, score, etc.
			.populate({
				path: 'friends',
				select: '_id userType username',
			})
			.populate({
				path: 'receivedFriendRequests',
				select: '_id userType username',
			})
			.populate({
				path: 'sentFriendRequests',
				select: '_id userType username',
			})
			.populate({
				path: 'students',
				select: '_id userType username firstName lastName completed',
			})
			.populate({
				path: 'slimes',
				select: '-user -createdAt -updatedAt -__v',
			})
			.exec()


		// Duplicate user so that it can be editted

		const modifiedLeaderboard = []

		for (let i in leaderboard) {
			const modifiedUser = {
				...leaderboard[i].toJSON(),
			}
			modifiedUser.roster = await getPopulatedRoster(modifiedUser.roster)
			modifiedLeaderboard.push(modifiedUser)
		}

		res.status(200).json({ leaderboard: modifiedLeaderboard })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
