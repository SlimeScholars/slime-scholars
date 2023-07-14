import Slime from '../../../models/slimeModel'

// @desc    Get the stats of a slime
// @route   GET   /api/slime?slimeId=...
// @access  Public
export default async function (req, res) {
  try {
    const { slimeId } = req.query
		const slime = await Slime.findById(slimeId)
    res.status(200).json(slime)
  }
  catch (error) {
    res.status(400).json({message: error.message})
  }
}
