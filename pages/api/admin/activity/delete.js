import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import activities from "../../../../models/activitiesModel"
import Unit from "../../../../models/unitModel"
import { v2 as cloudinary } from 'cloudinary';
import User from "../../../../models/userModel"

/**
 * @desc    Delete a activities and handle the appropriate image deletes from cloudinary. Won't handle for processing things like unit tier (bronze, silver, gold, etc.)
 * @route   DELETE /api/admin/activities/update-sections
 * @access  Private - Admin
 * @param   {string} req.query.activitiesId - Id of activities you want to delete
 */
export default async function (req, res) {
	try {
		// TODO: Investigate why course select is broken
		if (req.method !== 'DELETE') {
			throw new Error(`${req.method} is an invalid request method`)
		}

		// Connect to database
		await connectDB()

		// Authenticate and get user
		const user = await authenticate(req.headers.authorization)

		// Make sure user is a teacher
		checkUserType(user, 4)

		const { activitiesId } = req.query

		if (!activitiesId) {
			throw new Error('activitiesId is required')
		}

		const activities = await activities.findById(activitiesId)

		if (!activities) {
			throw new Error('activities not found')
		}

		// Delete activities from units and users
		await Unit.findOneAndUpdate(
			{ activities: activitiesId }, //Find the unit with the activitiesId to modify
			{ $pull: { activities: activitiesId } },
		)

		await User.updateMany(
			{
				'completedactivities.activities': activitiesId,
			},
			{
				$pull: {
					completedactivities: {
						activities: activitiesId,
					}
				}
			}
		)

		// Delete the activities
		await activities.findByIdAndDelete(activitiesId)

		res.status(204).send()
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
