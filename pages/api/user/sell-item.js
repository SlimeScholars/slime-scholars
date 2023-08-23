import { gameData } from "../../../data/gameData"
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

/**
 * @desc    Sell item
 * @route   POST /api/user/sell-item
 * @access  Private - Students
 * @param   {string} req.body.itemName - Name of item (must be the name of an item from gameData)
 * @param   {string} req.body.quantity - Number of that item you want to sell
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

		const { itemName, quantity } = req.body

		if (!gameData.items[itemName]) {
			throw new Error(`The item ${itemName} does not exist`)
		}
		if (gameData.items[itemName].sellPrice === undefined) {
			throw new Error('This item cannot be bought')
		}

		// Make sure they buy at max one background
		if (quantity > 0) {
			throw new Error('Quantity sold must be a positive integer')
		}

		let flag = true
		for (let i in user.items) {
			if (user.items[i].itemName === itemName) {
				flag = false
				if (user.items[i].quantity < quantity) {
					throw new Error(`You do not have enough of this item to sell: ${itemName}`)
				}
			}
		}
		if (flag) {
			throw new Error(`You don't have the following item in your inventory: ${itemName}`)
		}

		const item = gameData.items[itemName]
		const price = gameData.items[sellPrice] * quantity

	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}


