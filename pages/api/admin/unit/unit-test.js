import connectDB from '../../../../utils/connectDB'
import Unit from '../../../../models/unitModel'

/**
 * @desc    Get information of a unit test
 * @route   GET /api/admin/unit/unit-test
 * @access  Public
 * @param   {string} req.query.unitId - Id of lesson you want to get information of
 */
export default async function (req, res) {
	try {
		if (req.method !== 'GET') {
			throw new Error(`${req.method} is an invalid request method`)
		}

		// Connect to database
		await connectDB()

		const { unitId } = req.query

		if (!unitId) {
			throw new Error('Missing unitId')
		}

		// Get unit
		const unit = await Unit.findById(unitId, {
			createdAt: 0, updatedAt: 0, __v: 0
		})

		if (!unit) {
			throw new Error('Could not find unit')
		}

		res.status(200).json({
			unit,
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

