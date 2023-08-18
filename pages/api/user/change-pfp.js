import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

/**
 * @desc    Buy item
 * @route   POST /api/user/buy-item
 * @access  Private - Students
 * @param   {string} req.body.pfpSlime - Name of the slime you want to set the pfp to
 * @param   {string} req.body.pfpBg - Name of the background you want to set the pfp to
 */
export default async function (req, res) {
	try {
		if (req.method !== 'POST') {
			throw new Error(`${req.method} is an invalid request method`)
		}

		// Connect to database
		await connectDB()

		// Authenticate and get user
		const user = await authenticate(req.headers.authorization)

		// Make sure user is a student
		checkUserType(user, 1)

		const { pfpSlime, pfpBg } = req.body
		// let cost = gameData.items[itemName].buyPrice

		let slimeIndex = -1
		for (let i in user.slimes) {
			if (slimes[i].slimeName === pfpSlime) {
				slimeIndex = i
				break
			}
		}

		// If user.slimes doesn't include a slime with name of pfpSlime
		if (slimeIndex === -1) {
			throw new Error(`You do not own the following slime: ${pfpSlime}`)
		}

		let itemIndex = -1
		for (let i in user.items) {
			if (item.itemName === pfpBg) {
				itemIndex = i
				break
			}
		}

		// If user.items doesn't include an item with name of pfpItem
		if (itemIndex === -1) {
			throw new Error(`You do not own the following item: ${pfpBg}`)
		}

		if (!user.items[itemIndex].pfp) {
			throw new Error(`The following item is not a background: ${pfpBg}`)
		}

		await User.findByIdAndUpdate(user._id, {
			pfpSlime,
			pfpBg,
		})

		res.status(200).json({ pfpSlime, pfpBg })

	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

