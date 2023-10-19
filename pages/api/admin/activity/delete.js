import { authenticate } from "../../../../utils/authenticate"
import { verifyApiKey } from "../../../../utils/verify"
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
		console.log(req.query)
		// TODO: Investigate why course select is broken
		if (req.method !== 'DELETE') {
			throw new Error(`${req.method} is an invalid request method`)
		}
		verifyApiKey(req.headers.apikey)

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

		const activity = await Activity.findById(activityId)

		if (!activity) {
			throw new Error('activities not found')
		}

		for (let i in activity.pages) {
			for (let j in activity.pages[i]) {
				if (activity.pages[i].sections[j].sectionType === 1) {
					// If the section is a image, handle image delete on cloudinary
					const imageUrl = activity.pages[i].sections[j].image
					const publicId = imageUrl.match(/v\d+\/(.+)\./)[1]
					await cloudinary.uploader.destroy(publicId, (error, result) => {
						if (error) {
							throw new Error(`Error uploading file: ${error}`);
						}
					})
				}
			}
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
