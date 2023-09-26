import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import Unit from "../../../../models/unitModel"
import User from "../../../../models/userModel"
import Activity from "../../../../models/activityModel";
import Lesson from "../../../../models/lessonModel";

/**
 * @desc    Delete a activities and handle the appropriate image deletes from cloudinary. Won't handle for processing things like unit tier (bronze, silver, gold, etc.)
 * @route   DELETE /api/admin/activities/update-sections
 * @access  Private - Admin
 * @param   {string} req.query.activityId - Id of activities you want to delete
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

		const { activityId } = req.query

		if (!activityId) {
			throw new Error('activityId is required')
		}

		const activities = await Activity.findById(activityId)

		if (!activities) {
			throw new Error('activities not found')
		}
        await Lesson.findOneAndUpdate(
			{ activities: activityId }, 
			{ $pull: { activities: activityId } },
		)
        await User.updateMany(
			{
				'completedActivities.activity': activityId,
			},
			{
				$pull: {
					completedActivities: {
						activity: activityId,
					}
				}
			}
		)
		await Activity.findByIdAndDelete(activityId)

		res.status(204).send()
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
