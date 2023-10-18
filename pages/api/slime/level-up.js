import { gameData } from "../../../data/gameData"
import { verifyApiKey } from "../../../utils/verify"
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Slime from '../../../models/slimeModel'
import { getSortedSlimes } from "../../../utils/sort"

/**
 * @desc    Level up a slime
 * @route   POST   /api/slime/level-up
 * @access  Private - Students
 * @param   {string} req.body.slimeId - Id of slime you want to level up
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

    const { slimeId } = req.body

    const slime = await Slime.findById(slimeId)

    if (!slime) {
      throw new Error('Slime not found')
    }

    if (!slime.user.equals(user._id)) {
      throw new Error('This slime does not belong to you')
    }

    if (user.slimeGel < slime.levelUpCost) {
      throw new Error('Insufficient slime gel')
    }

    if (slime.level === slime.maxLevel) {
      throw new Error('Already at max level')
    }

    await Slime.findByIdAndUpdate(slimeId, {
      level: slime.level + 1,
      // Future slime.level - 1 as index to adjust from level to index
      // Since the slime.level does not update yet, we don't need a slime.level - 1 for level up cost
      levelUpCost: gameData.levelUpCost[slime.rarity][slime.level],
      baseProduction: slime.baseProduction + gameData.baseLevelProduction[slime.rarity],
    })

    user.slimeGel -= slime.levelUpCost
    await User.findByIdAndUpdate(user._id, {
      slimeGel: user.slimeGel
    })

    const newSlime = await Slime.findById(slimeId, {
      user: 0, createdAt: 0, updatedAt: 0, __v: 0,
    })

    // Get the updated slimes
    const newUser = await User.findById(user._id)
      .select('slimes roster')
      .populate({
        path: 'slimes',
        select: '-user -createdAt -updatedAt -__v',
      })
      .populate({
        path: 'roster',
        select: '-user -createdAt -updatedAt -__v',
        retainNullValues: true,
      })
      .lean()
      .exec()

    newUser.slimes = getSortedSlimes(newUser.slimes)

    res.status(200).json({
      slime: newSlime,
      slimes: newUser.slimes,
      roster: newUser.roster,
      slimeGel: user.slimeGel,
    })
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
}
