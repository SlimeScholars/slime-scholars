import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

// @desc    Open egg to get slime
// @route   POST /api/slime/open-egg
// @access  Private
export default async function (req, res) {
  try {
    if(req.method !== 'POST') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a student
    checkUserType(user, 1)
    
    const { itemName } = req.body
    let itemIndex = -1
    for(let item of user.items) {
      if(item.itemName === itemName) {
        itemIndex = i
      }
    }
    if(itemIndex === -1 || user.items[itemIndex].quantity < 1) {
      throw new Error(`Insufficient ${itemName.toLowerCase()}`)
    }
    // Check if item can be opened
    if(!gameData.openingOdds[itemName]) {
      throw new Error('Item cannot be opened')
    }
    let rarityList = []
    for(let i in gameData.openingOdds[itemName]) {
      rarityList.push(gameData.openingOdds[itemName][i])
      if(i != 0) {
        rarityList[i] += rarityList[i - 1]
      }
    }
    const randomRarity = Math.random()
    let rarity
    for(let i in rarityList) {
      if(randomRarity <= rarityList[i]) {
        rarity = gameData.rarities[i]
        break
      }
    }
    if(!rarity) {
      throw new Error('System error')
    }
    // Generate slime
    let slimeIndexList = []
    for(let i in gameData.slimes) {
      if(gameData.slimes[i].rarity === rarity) {
        slimeIndexList.push(i)
      }
    }
    const chosenSlime = gameData.slimes[slimeIndexList[Math.floor((Math.random() * slimeIndexList.length))]]

    // Reduce the quantity of item by 1
    let newItems = user.items
    newItems[itemIndex].quantity -= 1
    if(user.items[itemIndex].quantity < 1) {
      newItems.splice(itemIndex, 1)
    }

    const slime = await Slime.create({
			userId: user._id,
      slimeName: chosenSlime.slimeName,
      maxLevel: chosenSlime.maxLevel,
      rarity: chosenSlime.rarity,
      sellPrice: chosenSlime.sellPrice,
      sellCurrency: chosenSlime.sellCurrency,
      basePower: gameData.basePowers[chosenSlime.rarity][0],
      levelUpCost: gameData.levelUpCosts[chosenSlime.rarity][0],
    })

		const newSlimes = user.slimes
		newSlimes.push(slime._id)

    // Update user
    await User.findByIdAndUpdate(user._id, {
      slimes: newSlimes,
      items: newItems,
    })
    const newUser = await User.findById(user._id)
    res.status(200).json({
      slime: {
        slimeName: chosenSlime.slimeName,
        rarity: chosenSlime.rarity,
      },
      user: newUser,
    })
  } catch (error) {
    res.status(400).json({message: error.message}) 
  }
}
