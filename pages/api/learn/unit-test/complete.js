import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import User from '../../../../models/userModel'
import Unit from '../../../../models/unitModel'
import { calculateTestStars, getTestRewards } from '../../../../utils/stars'
import Course from "../../../../models/courseModel"
import { mongoose } from 'mongoose'

/**
 * @desc    Completion of unit test for rewards and exp
 * @route   POST /api/learn/unit-test/complete
 * @access  Private - Students
 * @param   {string} req.body.unitId - Id of unit completed
 * @param   {string} req.body.score - Score achieved on the unit test
 */
export default async function (req, res) {
	try {
		if (req.method !== 'POST') {
			throw new Error(`${req.method} is an invalid request method`)
		}

		// Connect to database
		await connectDB()

		// Authenticate and get user
		const user = await authenticate(req.headers.authorization)

		// Make sure user is a student
		checkUserType(user, 1)

		const { unitId, score } = req.body

		const unit = await Unit.findById(unitId, {
			createdAt: 0, updatedAt: 0, __v: 0
		})

		if (!unit) {
			throw new Error('Could not find unit')
		}

		let completedIndex = -1
		for (let i in user.completedUnits) {
			if (user.completedUnits[i].unit == unitId) {
				completedIndex = i
				break
			}
		}

		const stars = calculateTestStars(score)
		const newCompletedUnits = [...user.completedUnits]
		let newFlowers = user.flowers

		// Increase the user's exp according to quiz rewards (exp gain = flower gain from completing new test)
		const newExp = user.exp += getTestRewards(stars, undefined)

		// Has not started unit yet
		if (completedIndex === -1) {
			completedIndex = newCompletedUnits.length
			newFlowers += getTestRewards(stars, undefined)

			const newCompletedUnit = {
				unit: unitId,
				tier: 1,
				stars,
			}
			newCompletedUnits.push(newCompletedUnit)
		}
		// Started unit but has not completed unit test
		else if (user.completedUnits[completedIndex].stars === -1) {
			newFlowers += getTestRewards(stars, undefined)
			newCompletedUnits[completedIndex].stars = stars
		}
		// Completed unit test before
		else {
			newFlowers += getTestRewards(stars, newCompletedUnits[completedIndex].stars)
			newCompletedUnits[completedIndex].stars = stars
		}

		// Has started the unit, need to check if this new unit test makes it completed
		if (newCompletedUnits[completedIndex].tier === 1) {
			// Check if all lessons are completed
			let flag = true
			for (let i in unit.lessons) {
				// No need to do unit.lessons[i]._id since unit is not populated
				let smallFlag = false

				for (let j in user.completedLessons) {
					let curLessonId
					if (!user.completedLessons[j]._id) {
						curLessonId = new mongoose.Types.ObjectId(user.completedLessons[j].lesson)
					}

					if (
						(user.completedLessons[j].lesson._id && user.completedLessons[j].lesson._id.equals(unit.lessons[i])) ||
						(!user.completedLessons[j].lesson._id && curLessonId.equals(unit.lessons[i]))
					) {
						smallFlag = true
						break
					}
				}
				if (!smallFlag) {
					flag = false
					break
				}
			}
			// Up the unit tier if all lessons are completed
			if (flag) {
				newCompletedUnits[completedIndex].tier = 2
			}
		}

		if (newCompletedUnits[completedIndex].tier === 2) {
			// Check if all lessons are 3 starred
			let flag = false
			for (let i in user.completedLessons) {
				if (
					user.completedLessons[i].stars !== 3 &&
					unit.lessons.includes(user.completedLessons[i].lesson)
				) {
					flag = true
					break
				}
			}
			// Up the unit tier if all lessons are 3 starred and unit test is 3 starred
			if (!flag && newCompletedUnits[completedIndex].stars === 3) {
				newCompletedUnits[completedIndex].tier = 3
			}
		}

		// FIXME
		res.status(200).json({
			stars: stars,
			completedUnit: newCompletedUnits[completedIndex],
			flowers: newFlowers,
			exp: newExp,
			completedUnits: newCompletedUnits,
			//completedCourses: newCompletedCourses,
		})

	} catch (error) {
		console.log(error.message)
		res.status(400).json({ message: error.message })
	}
}

