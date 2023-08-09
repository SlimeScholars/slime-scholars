import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Lesson from '../../../models/lessonModel'
import { calculateStars, getQuizRewards } from '../../../utils/stars'
import { areDifferentDays } from '../../../utils/areDifferentDays'

/**
 * @desc    Completion of lesson
 * @route   POST /api/lesson/complete
 * @access  Private - Students
 * @param   {string} req.body.lessonId - Id of lesson completed
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
    // start of unit, completion of unit, perfection of unit
    // start of course, completion of course, perfection of course

    const newUser = await User.findById(user._id)
      .select('completedLessons lastRewards')

    res.status(400).json({
      stars: stars, // Most recent score
      completedLesson: newCompletedLesson, // Lesson with high score
      flowers: newFlowers,
      completedLessons: newUser.completedLessons,
      lastRewards: newUser.lastRewards,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

