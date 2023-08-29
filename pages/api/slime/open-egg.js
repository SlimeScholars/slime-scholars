import { gameData } from "../../../data/gameData"
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Slime from '../../../models/slimeModel'
import { getSortedSlimes } from "../../../utils/sort"

/**
 * @desc    Open egg to get slime
 * @route   POST /api/slime/open-egg
 * @access  Private - Students
 * @param   {string} itemName - Name of the egg you want to open
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

    const { itemName } = req.body
    let itemIndex = -1
    for (let i in user.items) {
      if (user.items[i].itemName === itemName) {
        itemIndex = i
      }
    }
    if (itemIndex === -1 || user.items[itemIndex].quantity < 1) {
      throw new Error(`Insufficient ${itemName.toLowerCase()}`)
    }
    // Check if item can be opened
    if (!gameData.openingOdds[itemName]) {
      throw new Error('Item cannot be opened')
    }
    let rarityList = []
    for (let i in gameData.openingOdds[itemName]) {
      rarityList.push(gameData.openingOdds[itemName][i])
      if (i != 0) {
        rarityList[i] += rarityList[i - 1]
      }
    }
    const randomRarity = Math.random()
    let rarity
    for (let i in rarityList) {
      if (randomRarity <= rarityList[i]) {
        rarity = gameData.rarities[i]
        break
      }
    }
    if (!rarity) {
      throw new Error('System error')
    }

    // Reduce the quantity of item by 1, will save this change at the end
    let newItems = user.items
    newItems[itemIndex].quantity -= 1
    if (user.items[itemIndex].quantity < 1) {
      newItems.splice(itemIndex, 1)
    }

    const slimeList = gameData.slimes[rarity]
    const chosenSlime = slimeList[Math.floor((Math.random() * slimeList.length))]

    const slimeExists = await Slime.findOne({ user: user._id, slimeName: chosenSlime.slimeName })
    const originSlimeObjects = new Array(); // for Roll page use 

    let slime
    // If the new slime is duplicate
    if (slimeExists) {
      originSlimeObjects.push(JSON.parse(JSON.stringify(slimeExists)));
      // If the slime can earn stars
      if (slimeExists.starProgress !== undefined && slimeExists.starLevel !== slimeExists.maxStarLevel) {
        // Increase star progress
        slimeExists.starProgress += 1
        // If about to star up
        if (slimeExists.starProgress === slimeExists.maxStarProgress) {
          slimeExists.starLevel += 1

          // If slime reached max star
          if (slimeExists.starLevel === slimeExists.maxStarLevel) {
            slimeExists.starProgress = undefined
            slimeExists.maxStarProgress = undefined
          }

          // If slime not at max star
          else {
            slimeExists.starProgress = 0
            // Update maxStarProgress according to game data
            slimeExists.maxStarProgress = gameData.starProgress[rarity][slimeExists.starLevel - 1]
          }
        }
      }
      // If not starable or reached maxed stars, just add a bonus level
      else {
        slimeExists.bonusLevel += 1
        // Update the slime's bonus production after adding the bonus level
        slimeExists.bonusProduction += gameData.bonusLevelProduction[rarity]
      }

      // Save changes to database
      await slimeExists.save()

      // Set an appropriate value for the return statement
      slime = slimeExists
      slime.user = undefined
      slime.createdAt = undefined
      slime.updatedAt = undefined
      slime.__v = undefined
    }

    // Create a starable slime if rarity is starable
    else if (gameData.canStar.includes(rarity)) {
      originSlimeObjects.push({});
      const slimeId = (await Slime.create({
        user: user._id,
        slimeName: chosenSlime.slimeName,
        rarity,
        // Override default max level if the slime has a custom one
        maxLevel: chosenSlime.maxLevel ? chosenSlime.maxLevel : gameData.maxLevel[rarity],
        // Override default base production if the slime has a custom one
        baseProduction: chosenSlime.baseProduction ? chosenSlime.baseProduction : gameData.baseProduction[rarity],
        // Bonus production is always 0 when creating a slime

        // Set level up cost to undefined if the slime cannot be leveled
        levelUpCost: chosenSlime.maxLevel === 1 ? undefined : gameData.levelUpCost[rarity][0],

        starLevel: 1,
        maxStarLevel: gameData.maxStarLevel[rarity],
        starProgress: 0,
        maxStarProgress: gameData.starProgress[rarity][0],

        abilityName: chosenSlime.abilityName,
        abilityDescriptions: chosenSlime.abilityDescriptions,
        // If a slime doesn't have effects, it will be undefined
        effects: chosenSlime.effects,
      }))._id

      slime = await Slime.findById(slimeId, {
        user: 0, createdAt: 0, updatedAt: 0, __v: 0,
      })

      user.slimes.push(slime)
    }

    // Create a non-starable slime
    else {
      originSlimeObjects.push({});
      const slimeId = (await Slime.create({
        user: user._id,
        slimeName: chosenSlime.slimeName,
        maxLevel: gameData.maxLevel[rarity],
        rarity,
        baseProduction: gameData.baseProduction[rarity],
        levelUpCost: gameData.levelUpCost[rarity][0],
      }))._id

      slime = await Slime.findById(slimeId, {
        user: 0, createdAt: 0, updatedAt: 0, __v: 0,
      })

      user.slimes.push(slime)
    }

    // Update user
    await User.findByIdAndUpdate(user._id, {
      slimes: user.slimes,
      items: newItems,
    })

    // Get the updated slimes
    const newUser = await User.findById(user._id)
      .select('slimes')
      .populate({
        path: 'slimes',
        select: '-user -createdAt -updatedAt -__v',
      })
      .lean()
      .exec()

    newUser.slimes = getSortedSlimes(newUser.slimes)

    res.status(200).json({
      slime,
      slimes: newUser.slimes,
      items: newItems,
      originSlimeObjects: originSlimeObjects
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
