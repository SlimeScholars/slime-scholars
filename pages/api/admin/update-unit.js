import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Course from '../../../models/courseModel'
import Unit from "../../../models/unitModel"

/**
 * @desc    Update a unit
 * @route   POST /api/admin/update-unit
 * @access  Private - Admin
 * @param   {string} req.body.className - Max 60 characters long.
 */
export default async function (req, res) {
  try {
    if(req.method !== 'PUT') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 4)

    const { unitId, unitName } = req.body

    if(!unitId) {
      throw new Error('Please send a unitId')
    }

    const unitExists = Unit.findById(unitId)

    if(!unitExists) {
      throw new Error('Could not find the unit to update')
    }

    await Unit.findByIdAndUpdate(unitId, {
      unitName,
      latestAuthor: `${user.firstName} ${user.lastName}`,
    })

    const unit = await Unit.findById(unitId)

    res.status(200).json({unit})

  } catch(error) {
    console.log(error.message)
    res.status(400).json({message: error.message})
  }
}


