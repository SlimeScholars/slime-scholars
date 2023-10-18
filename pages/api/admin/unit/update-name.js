import { authenticate } from "../../../../utils/authenticate"
import { verifyApiKey } from "../../../../utils/verify"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import Unit from "../../../../models/unitModel"
// Import lesson for populate
import '../../../../models/lessonModel'

/**
 * @desc    Update a unit
 * @route   PUT /api/admin/unit/update-name
 * @access  Private - Admin
 * @param   {string} req.body.unitId - Id of the unit you want to update the name of
 * @param   {string} req.body.unitName - The name you want to update the unit's name to
 */
export default async function (req, res) {
  try {
    if (req.method !== 'PUT') {
      throw new Error(`${req.method} is an invalid request method`)
    }
    verifyApiKey(req.headers.apikey)

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 4)

    const { unitId, unitName } = req.body

    if (!unitId) {
      throw new Error('Please send a unitId')
    }

    const unitExists = Unit.findById(unitId)

    if (!unitExists) {
      throw new Error('Could not find the unit to update')
    }

    await Unit.findByIdAndUpdate(unitId, {
      unitName,
      latestAuthor: `${user.firstName} ${user.lastName}`,
    })

    const unit = await Unit.findById(unitId)
      .populate('lessons')

    res.status(200).json({ unit })

  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message })
  }
}


