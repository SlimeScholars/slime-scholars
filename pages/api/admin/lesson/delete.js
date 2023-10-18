import { authenticate } from "../../../../utils/authenticate"
import { verifyApiKey } from "../../../../utils/verify"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import Lesson from "../../../../models/lessonModel"
import Unit from "../../../../models/unitModel"
import { v2 as cloudinary } from 'cloudinary';
import User from "../../../../models/userModel"

/**
 * @desc    Delete a lesson and handle the appropriate image deletes from cloudinary. Won't handle for processing things like unit tier (bronze, silver, gold, etc.)
 * @route   DELETE /api/admin/lesson/update-sections
 * @access  Private - Admin
 * @param   {string} req.query.lessonId - Id of lesson you want to delete
 */
export default async function (req, res) {
	try {
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

		const { lessonId } = req.query

		if (!lessonId) {
			throw new Error('lessonId is required')
		}

		const lesson = await Lesson.findById(lessonId)

		if (!lesson) {
			throw new Error('Lesson not found')
		}

		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.CLOUDINARY_KEY,
			api_secret: process.env.CLOUDINARY_SECRET,
		})

		// for (let i in lesson.quizQuestions) {
		// 	for (let j in lesson.quizQuestions[i]) {
		// 		const imageUrl = lesson.quizQuestions[i][j].image
		// 		const publicId = imageUrl.match(/v\d+\/(.+)\./)[1]
		// 		await cloudinary.uploader.destroy(publicId, (error, result) => {
		// 			if (error) {
		// 				throw new Error(`Error uploading file: ${error}`);
		// 			}
		// 		})
		// 	}
		// }

		// Delete lesson from units and users
		await Unit.findOneAndUpdate(
			{ lessons: lessonId }, //Find the unit with the lessonId to modify
			{ $pull: { lessons: lessonId } },
		)

		await User.updateMany(
			{
				'completedLessons.lesson': lessonId,
			},
			{
				$pull: {
					completedLessons: {
						lesson: lessonId,
					}
				}
			}
		)

		// Delete the lesson
		await Lesson.findByIdAndDelete(lessonId)

		res.status(204).send()
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
