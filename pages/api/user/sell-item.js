import { gameData } from "../../../data/gameData"
import { verifyApiKey } from "../../../utils/verify"
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import { getSortedItems } from "../../../utils/sort"

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
		verifyApiKey(req.headers.apikey)

		// Connect to database
		await connectDB()

		// Authenticate and get user
		const user = await authenticate(req.headers.authorization)

		// Make sure user is a student
		checkUserType(user, 1)

		const { itemName, quantity } = req.body

		if (!gameData.items[itemName]) {
			throw new Error(`The following item does not exist: ${itemName}`)
		}
		if (gameData.items[itemName].sellPrice === undefined) {
			throw new Error(`The following item cannot be sold: ${itemName}`)
		}

		// Make sure they buy at max one background
		if (quantity <= 0) {
			throw new Error('Quantity sold must be a positive integer')
		}

		let itemIndex = -1
		for (let i in user.items) {
			if (user.items[i].itemName === itemName) {
				if (user.items[i].quantity < quantity) {
					throw new Error(`You do not have enough of this item to sell: ${itemName}`)
				}
				itemIndex = i
				break
			}
		}
		if (itemIndex === -1) {
			throw new Error(`You don't have the following item in your inventory: ${itemName}`)
		}

		const item = gameData.items[itemName]
		const price = gameData.items[item.itemName].sellPrice * quantity

		const newUser = { ...user }
		newUser.items[itemIndex].quantity -= quantity
		if (newUser.items[itemIndex].quantity === 0) {
			newUser.items.splice(itemIndex, 1)
		}

		if (gameData.items[item.itemName].sellCurrency === 0) {
			newUser.slimeGel += price
		}
		else if (gameData.items[item.itemName].sellCurrency === 1) {
			newUser.flowers += price
		}

		await User.findByIdAndUpdate(user._id, {
			flowers: newUser.flowers,
			slimeGel: newUser.slimeGel,
			items: newUser.items,
		})

		newUser.items = getSortedItems(newUser.items)

		res.status(200).json({
			flowers: newUser.flowers,
			slimeGel: newUser.slimeGel,
			items: newUser.items,
			user: newUser
		})

	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}


