import { authenticate } from "../../../../utils/authenticate"
import { verifyApiKey } from "../../../../utils/verify"
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
		verifyApiKey(req.headers.apiKey)

		// Connect to database
		await connectDB()

		// Authenticate and get user with completed lessons, units, courses
		const user = await authenticate(req.headers.authorization, { lessons: 1, units: 1, courses: 1 })

		// Make sure user is a student
		checkUserType(user, 1)

		const { unitId, score } = req.body

		const unit = await Unit.findById(unitId, {
			createdAt: 0, updatedAt: 0, __v: 0
		})

		if (!unit) {
			throw new Error('Could not find unit')
		}

		// TODO: Add new populating user method to get lessons units courses
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

		// Check course tier
		let course = await Course.findOne({ units: unitId })
			.select('_id units')
		if (!course) {
			throw new Error('Could not find course that the unit belongs to')
		}

		const newCompletedCourses = [...user.completedCourses]
		let completedCourseIndex = -1
		for (let i in user.completedCourses) {
			if (
				user.completedCourses[i].course.equals(course._id) ||
				user.completedCourses[i].course._id.equals(course._id)
			) {
				completedCourseIndex = i
			}
		}

		// Has not completed any unit in this course yet
		if (completedCourseIndex === -1) {
			const newCompletedCourse = {
				course: course._id,
				tier: 1,
			}
			newCompletedCourses.push(newCompletedCourse)
			// user.completedCourses.length did not increase, so no need to do a -1
			completedCourseIndex = user.completedCourses.length
		}

		// Has started the course, need to check if this new unit makes it completed
		if (newCompletedCourses[completedCourseIndex].tier === 1) {
			// Check if all units are completed
			let flag = true
			for (let i in course.units) {
				// No need to do course.units[i].unit since unit is not populated
				let smallFlag = false

				for (let j in newCompletedUnits) {
					let curUnitId
					if (!newCompletedUnits[j].unit._id) {
						curUnitId = new mongoose.Types.ObjectId(newCompletedUnits[j].unit)
					}

					if (
						(newCompletedUnits[j].unit._id && newCompletedUnits[j].unit._id.equals(course.units[i])) ||
						(!newCompletedUnits[j].unit._id && curUnitId.equals(course.units[i]))
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
			// Up the course tier if all units are completed
			if (flag) {
				newCompletedCourses[completedCourseIndex].tier = 2
			}
		}

		// Has finished the course, need to check if this unit makes it so that all unit are tier 3
		if (newCompletedCourses[completedCourseIndex].tier === 2) {
			// Check if all units are tier 3
			let flag = false
			for (let i in newCompletedUnits) {
				if (
					newCompletedUnits[i].tier !== 3 &&
					course.units.includes(newCompletedUnits[i].unit)
				) {
					flag = true
					break
				}
			}
			// Up the course tier if all units are tier 3
			if (!flag) {
				newCompletedCourses[completedCourseIndex].tier = 3
			}
		}

		// Update user
		await User.findByIdAndUpdate(user._id, {
			exp: newExp,
			flowers: newFlowers,
			completedUnits: newCompletedUnits,
			completedCourses: newCompletedCourses,
		})

		res.status(200).json({
			stars: stars,
			flowers: newFlowers,
			exp: newExp,
		})

	} catch (error) {
		console.log(error.message)
		res.status(400).json({ message: error.message })
	}
}

