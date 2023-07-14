import { gameData } from "../../../data/gameData"
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Slime from '../../../models/slimeModel'

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
    for(let i in user.items) {
      if(user.items[i].itemName === itemName) {
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

    const slimeList = gameData.slimes[rarity]
    const chosenSlime = slimeList[Math.floor((Math.random() * slimeList.length))]

    const userSlimes = await Slime.find({userId: user._id})
    let slimeExists
    for(let userSlime of userSlimes) {
      if(userSlime.slimeName === chosenSlime) {
        slimeExists = userSlime

        // If the slime can earn stars
        if(slimeExists.starProgress !== undefined && slimeExists.starLevel !== slimeExists.maxStarLevel) {
          // Increase star progress
          slimeExists.starProgress += 1
          // If about to level up
          if(slimeExists.starProgress === slimeExists.maxStarProgress) {
            slimeExists.starLevel += 1

            // If slime reached max star
            if(slimeExists.starLevel === slimeExists.maxStarLevel) {
              slimeExists.starProgress = undefined
              slimeExists.maxStarProgress = undefined
            }

            // If slime not at max star
            else {
              slimeExists.starProgress = 0
              // Update maxStarProgress according to game data
              slimeExists.maxStarProgress = gameData.starProgress[slimeExists.rarity][slimeExists.starLevel]
            }
          }
        }
        // If not starable or reached maxed stars, just add a bonus level
        else {
          slimeExists.bonusLevel += 1
        }
      }
    }

    // Reduce the quantity of item by 1
    let newItems = user.items
    newItems[itemIndex].quantity -= 1
    if(user.items[itemIndex].quantity < 1) {
      newItems.splice(itemIndex, 1)
    }

    let slime

    // Create an array of the user's new slimes
		const newSlimes = user.slimes

    // If the slime is a duplicate, update the old slime
    if(slimeExists) {
      await slimeExists.save()
      slime = slimeExists
    }

    // If the slime is new, create a new slime

    // Create a starable slime
    else if(gameData.canStar.includes(rarity)) {
      slime = await Slime.create({
        userId: user._id,
        slimeName: chosenSlime,
        maxLevel: gameData.maxLevel[rarity],
        rarity,
        basePower: gameData.basePower[rarity][0],
        levelUpCost: gameData.levelUpCost[rarity][0],

        starLevel: 0,
        maxStarLevel: gameData.maxStarLevel[rarity],
        starProgress: 0,
        maxStarProgress: gameData.starProgress[rarity][0]
      })
      newSlimes.push(slime._id)
    }

    // Create a non-starable slime
    else {
      slime = await Slime.create({
        userId: user._id,
        slimeName: chosenSlime,
        maxLevel: gameData.maxLevel[rarity],
        rarity,
        basePower: gameData.basePower[rarity][0],
        levelUpCost: gameData.levelUpCost[rarity][0],
      })
      newSlimes.push(slime._id)
    }

    // Update user
    await User.findByIdAndUpdate(user._id, {
      slimes: newSlimes,
      items: newItems,
    })
    const newUser = await User.findById(user._id)
    res.status(200).json({
      slime,
      user: newUser,
    })
  } catch (error) {
    res.status(400).json({message: error.message}) 
  }
}
