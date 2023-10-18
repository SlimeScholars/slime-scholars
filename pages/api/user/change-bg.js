import { authenticate } from "../../../utils/authenticate"
import { verifyApiKey } from "../../../utils/verify"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

/**
 * @desc    Change background img
 * @route   PUT /api/user/change-bg
 * @access  Private - Students
 * @param   {string} req.body.bg - Name of the background you want to change to
 */
export default async function (req, res) {
	try {
		if (req.method !== 'PUT') {
			throw new Error(`${req.method} is an invalid request method`)
		}
		verifyApiKey(req.headers.apikey)

		// Connect to database
		await connectDB()

		// Authenticate and get user
		const user = await authenticate(req.headers.authorization)

		// Make sure user is a student
		checkUserType(user, 1)

		const { bg } = req.body

		let itemIndex = -1
		for (let i in user.items) {
			if (user.items[i].itemName === bg) {
				itemIndex = i
				break
			}
		}

		// If user.items doesn't include an item with name of bg
		if (itemIndex === -1) {
			throw new Error(`You do not own the following item: ${bg}`)
		}

		if (!user.items[itemIndex].isBg) {
			throw new Error(`The following item is not a background: ${bg}`)
		}

		await User.findByIdAndUpdate(user._id, {
			bg,
		})

		res.status(200).json({ bg })

	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

