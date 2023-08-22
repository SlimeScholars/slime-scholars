import { gameData } from "../../../data/gameData"
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

/**
 * @desc    Buy item
 * @route   POST /api/user/buy-item
 * @access  Private - Students
 * @param   {string} req.body.itemName - Name of item (must be the name of an item from gameData.json)
 * @param   {string} req.body.quantity - Number of that item you want to purchase
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
    if (gameData.items[itemName].buyPrice === undefined) {
      throw new Error('This item cannot be bought')
    }
    let cost = gameData.items[itemName].buyPrice
    let buyCurrency = gameData.items[itemName].buyCurrency
    let rarity = gameData.items[itemName].rarity
    let sellPrice = gameData.items[itemName].sellPrice
    let sellCurrency = gameData.items[itemName].sellCurrency
    cost *= quantity
    // Currency 0 is slimeGel, currency 1 is flower
    if (buyCurrency === 0) {
      if (cost <= user.slimeGel) {
        let newSlimeGel = user.slimeGel - cost
        let newItems = user.items
        // See if the user already has the item in inventory
        let itemIndex = -1
        for (let i in user.items) {
          if (user.items[i].itemName === itemName) {
            itemIndex = i
          }
        }
        // If the user doesn't have the item, add a new element to the user's items
        if (itemIndex === -1) {
          newItems.push({
            itemName: itemName,
            quantity: parseInt(quantity),
            rarity: rarity,
            sellPrice: sellPrice,
            sellCurrency: sellCurrency,
          })
        }
        // Otherwise, just increase the user's quantity
        else {
          newItems[itemIndex].quantity += parseInt(quantity)
        }
        await User.findByIdAndUpdate(user._id, {
          slimeGel: newSlimeGel,
          items: newItems,
        })

        const newUser = await User.findById(user._id)
          .select('items slimeGel')
          .exec()

        res.status(200).json({
          items: newUser.items,
          slimeGel: newUser.slimeGel,
        })
        return
      }
      else {
        throw new Error('Insufficient slime gel')
      }
    }

    // Buying with flowers
    else if (buyCurrency === 1) {
      if (cost <= user.flowers) {
        let newFlowers = user.flowers - cost
        let newItems = user.items
        // See if the user already has the item in inventory
        let itemIndex = -1
        for (let i in user.items) {
          if (user.items[i].itemName === itemName) {
            itemIndex = i
          }
        }
        // If the user doesn't have the item, add a new element to the user's items
        if (itemIndex === -1) {
          newItems.push({
            itemName: itemName,
            quantity: parseInt(quantity),
            rarity: rarity,
            sellPrice: sellPrice,
            sellCurrency: sellCurrency,
          })
        }
        // Otherwise, just increase the user's quantity
        else {
          newItems[itemIndex].quantity += parseInt(quantity)
        }

        await User.findByIdAndUpdate(user._id, {
          flowers: newFlowers,
          items: newItems,
        })

        const newUser = await User.findById(user._id)
          .select('items flowers')
          .exec()

        res.status(200).json({
          items: newUser.items,
          flowers: newUser.flowers,
        })
        return
      }
      else {
        throw new Error('Insufficient flowers')
      }
    }
    else {
      throw new Error('System error')
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

