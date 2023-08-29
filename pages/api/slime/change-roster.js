import { mongoose } from 'mongoose'
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Slime from '../../../models/slimeModel'

/**
 * @desc    Change user's roster
 * @route   PUT   /api/slime/change-roster
 * @access  Private - Students
 * @param   {[string | null]} req.body.roster - Array of the id's of the slime in an array, if no slime is equiped in a spot, it should be null. Example roser: [id, null, null, id]
 */
export default async function (req, res) {
	try {
		if (req.method !== 'PUT') {
			throw new Error(`${req.method} is an invalid request method`)
		}

		// Connect to database
		await connectDB()

		// Authenticate and get user
		const user = await authenticate(req.headers.authorization)

		// Make sure user is a student
		checkUserType(user, 1)

		const { roster } = req.body

		if (!roster || !Array.isArray(roster) || roster.length !== 4) {
			throw new Error('Invalid roster size')
		}

		const slimeNames = []
		for (let i in roster) {
			if (roster[i] === null) {
				continue
			}

			// Make sure all slimes on roster belong to user
			const slime = await Slime.findById(roster[i])
			if (!slime) {
				throw new Error('One of the slimes could not be found')
			}

			if (!slime.user.equals(user._id)) {
				throw new Error('One of the slimes does not belong to you')
			}

			// Make sure roster is composed of ObjectId
			roster[i] = new mongoose.Types.ObjectId(roster[i])
			slimeNames.push(slime.slimeName)
		}

		// Check if no slime appears more than once
		const set = new Set(slimeNames)
		if (set.size !== slimeNames.length) {
			throw new Error('Roster must have unique slimes')
		}

		const newUser = await User.findByIdAndUpdate(user._id, {
			roster: roster
		})
			.populate({
				path: 'roster',
				select: '-user -createdAt -updatedAt -__v',
				options: { retainNullValues: true },
			})

		res.status(200).json({
			roster: newUser.roster,
		})
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
}
