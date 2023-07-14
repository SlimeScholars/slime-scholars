import { gameData } from "../../../data/gameData"
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Slime from '../../../models/slimeModel'

// @desc    Level up a slime
// @route   POST   /api/slime/level-up
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

    const { slimeId } = req.body

		const slime = await Slime.findById(slimeId)

		if(!slime) {
			throw new Error('Slime not found')
		}

		if(!slime.userId.equals(user._id)) {
			throw new Error('This slime does not belong to you')
		}

		if(user.slimeGel < slime.levelUpCost) {
			throw new Error('Insufficient slime gel')
		}

    if(slime.level === slime.maxLevel) {
      throw new Error('Already at max level')
    }

		await Slime.findByIdAndUpdate(slimeId, {
			level: slime.level + 1,
			// Future slime.level - 1 as index to adjust from level to index
			levelUpCost: gameData.levelUpCost[slime.rarity][slime.level],
			basePower: gameData.basePower[slime.rarity][slime.level],
		})
		const newSlime = await Slime.findById(slimeId)

    await User.findByIdAndUpdate(user._id, {
      slimeGel: user.slimeGel - slime.levelUpCost
    })
		const newUser = await User.findById(user._id)

    res.status(200).json({
			slime: newSlime,
			user: newUser,
		})
  }
  catch (error) {
    res.status(400).json({message: error.message})
  }
}
