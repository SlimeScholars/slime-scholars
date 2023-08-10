import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Lesson from '../../../models/lessonModel'
import { calculateStars, getQuizRewards } from '../../../utils/stars'
import { areDifferentDays } from '../../../utils/areDifferentDays'
import Unit from "../../../models/unitModel"
import Course from "../../../models/courseModel"

/**
 * @desc    Completion of lesson
 * @route   POST /api/lesson/complete
 * @access  Private - Students
 * @param   {string} req.body.lessonId - Id of lesson completed
 * @param   {string} req.body.unitId - Id of unit completed
 * @param   {string} req.body.score - Score achieved on the quiz section of the lesson
 */
export default async function (req, res) {
  try {
    if(req.method !== 'POST') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a student
    checkUserType(user, 1)

    const { lessonId, score } = req.body

    const lesson = await Lesson.findById(lessonId, {
      createdAt: 0, updatedAt: 0, __v: 0
    })

    if(!lesson) {
      throw new Error('Could not find lesson')
    }

    let canLoot = false
    const today = new Date()
    const newLastRewards = [...user.lastRewards]
    for(let i = 0; i < user.lastRewards.length; i ++) {
      if(areDifferentDays(today, user.lastRewards[i])) {
        canLoot = true
        newLastRewards[i] = today
        break
      }
    }

    let completedIndex = -1
    for(let i = 0; i < user.completedLessons.length; i ++) {
      if(user.completedLessons[i].lesson.equals(lessonId)) {
        completedIndex = i
        break
      }
    }

    const stars = calculateStars(score)
    const newCompletedLessons = [...user.completedLessons]
    let newCompletedLesson
    let newFlowers = user.flowers

    // Has not completed lesson yet
    if(completedIndex === -1) {
      // Can loot lesson
      if(canLoot) {
        newFlowers += getQuizRewards(stars, undefined)
        newCompletedLesson = {
          lesson: lessonId,
          stars,
          looted: true
        }
        newCompletedLessons.push(newCompletedLesson)

        await User.findByIdAndUpdate(user._id, {
          flowers: newFlowers,
          completedLessons: newCompletedLessons,
          lastRewards: newLastRewards,
        })
      }
      // Cannot loot lesson
      else {
        newCompletedLesson = {
          lesson: lessonId,
          stars,
          looted: false
        }
        newCompletedLessons.push(newCompletedLesson)

        await User.findByIdAndUpdate(user._id, {
          completedLessons: newCompletedLessons,
        })
      }
    }
    // Completed lesson and already looted
    else if(user.completedLessons[completedIndex].looted) {
      if(stars > user.completedLessons[completedIndex].stars) {
        newFlowers += getQuizRewards(stars, newCompletedLessons[completedIndex].stars)
        newCompletedLessons[completedIndex].stars = stars
        await User.findByIdAndUpdate(user._id, {
          flowers: newFlowers,
          completedLessons: newCompletedLessons,
        })
      }
    }
    // Completed lesson, but hasn't looted but can loot
    else if(canLoot) {
      newFlowers += getQuizRewards(stars, undefined)
      newCompletedLessons[completedIndex].stars = stars
      newCompletedLessons[completedIndex].looted = true
      await User.findByIdAndUpdate(user._id, {
        flowers: newFlowers,
        completedLessons: newCompletedLessons,
        lastRewards: newLastRewards,
      })
    }
    // Completed lesson, hasn't looted and cannot loot, but new high score
    else if(stars > newCompletedLessons[completedIndex].stars) {
      newCompletedLessons[completedIndex].stars = stars
      await User.findByIdAndUpdate(user._id, {
        completedLessons: newCompletedLessons,
      })
    }

    if(completedIndex !== -1) {
      newCompletedLesson = newCompletedLessons[completedIndex]
    }

    // TODO: Handle unit awards, course awards, check for:
    // start of course, completion of course, perfection of course

    // Check unit tier
    let unit = await Unit.findOne({ lessons: lessonId })
      .select('_id lessons')
    if(!unit) {
      throw new Error('Could not find unit that the lesson belongs to')
    }

    const newCompletedUnits = [...user.completedUnits]
    let completedUnitIndex = -1
    for(let i in user.completedUnits) {
      if(
        user.completedUnits[i].unit.equals(unit._id) ||
        user.completedUnits[i].unit._id.equals(unit._id)
      ) {
        completedUnitIndex = i
      }
    }

    // Has not completed any lesson in this unit yet
    if(completedUnitIndex === -1) {
      const newCompletedUnit = {
        unit: unit._id,
        tier: 1,
      }
      newCompletedUnits.push(newCompletedUnit)
      // user.completedUnits.length did not increase, so no need to do a -1
      completedUnitIndex = user.completedUnits.length
    }

    // Has started the unit, need to check if this new lesson makes it completed
    if(newCompletedUnits[completedUnitIndex].tier === 1) {
      // Check if all lessons are completed
      let flag = false
      for(let i in unit.lessons) {
        // No need to do unit.lessons[i].lesson since unit is not populated
        let smallFlag = true
        for(let j in newCompletedLessons) {
          if(
            newCompletedLessons[j].lesson.equals(unit.lessons[i]) ||
            newCompletedLessons[j].lesson._id.equals(unit.lessons[i])
          ) {
            smallFlag = false
            break
          }
        }
        flag = smallFlag
      }
      // Up the unit tier if all lessons are completed
      if(!flag) {
        newCompletedUnits[completedUnitIndex].tier = 2
      }
    }

    // Has finished the unit, need to check if this lesson makes it so that all lessons are 3 starred
    if(newCompletedUnits[completedUnitIndex].tier === 2) {
      // Check if all lessons are 3 starred
      let flag = false
      for(let i in newCompletedLessons) {
        if(
          newCompletedLessons[i].stars !== 3 &&
          unit.lessons.includes(newCompletedLessons[i].lesson)
        ) {
          flag = true
        }
      }
      // Up the unit tier if all lessons are 3 starred
      if(!flag) {
        newCompletedUnits[completedUnitIndex].tier = 3
      }
    }

    // Check course tier
    let course = await Course.findOne({ units: unit._id })
      .select('_id units')
    if(!course) {
      throw new Error('Could not find course that the lesson belongs to')
    }

    const newCompletedCourses = [...user.completedCourses]
    let completedCourseIndex = -1
    for(let i in user.completedCourses) {
      if(
        user.completedCourses[i].course.equals(course._id) ||
        user.completedCourses[i].course._id.equals(course._id)
      ) {
        completedCourseIndex = i
      }
    }

    // Has not completed any unit in this course yet
    if(completedCourseIndex === -1) {
      const newCompletedCourse = {
        course: course._id,
        tier: 1,
      }
      newCompletedCourses.push(newCompletedCourse)
      // user.completedCourses.length did not increase, so no need to do a -1
      completedCourseIndex = user.completedCourses.length
    }

    // Has started the course, need to check if this new unit makes it completed
    if(newCompletedCourses[completedCourseIndex].tier === 1) {
      // Check if all lessons are completed
      let flag = false
      for(let i in course.units) {
        // No need to do course.units[i].unit since unit is not populated
        let smallFlag = true
        for(let j in newCompletedUnits) {
          if(
            newCompletedUnits[j].unit.equals(course.units[i]) ||
            newCompletedUnits[j].unit._id.equals(course.units[i])
          ) {
            smallFlag = false
            break
          }
        }
        flag = smallFlag
      }
      // Up the unit tier if all lessons are completed
      if(!flag) {
        newCompletedCourses[completedCourseIndex].tier = 2
      }
    }

    // Has finished the course, need to check if this unit makes it so that all unit are tier 3
    if(newCompletedCourses[completedCourseIndex].tier === 2) {
      // Check if all units are tier 3
      let flag = false
      for(let i in newCompletedUnits) {
        if(
          newCompletedUnits[i].tier !== 3 &&
          course.units.includes(newCompletedUnits[i].unit)
        ) {
          flag = true
        }
      }
      // Up the unit tier if all lessons are 3 starred
      if(!flag) {
        newCompletedCourses[completedCourseIndex].tier = 3
      }
    }

    // TODO: Update user collection with the newCompletedUnits and newCompletedCourses

    const newUser = await User.findById(user._id)
      .select('completedLessons lastRewards')
    // TODO: Populate

    res.status(400).json({
      stars: stars, // Most recent score
      completedLesson: newCompletedLesson, // Lesson with high score
      flowers: newFlowers,
      completedLessons: newUser.completedLessons,
      completedUnits: newCompletedUnits,
      completedCourses: newCompletedCourses,
      lastRewards: newUser.lastRewards,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

