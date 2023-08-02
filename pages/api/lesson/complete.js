import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Lesson from '../../../models/lessonModel'
import { calculateStars, getQuizRewards } from '../../../utils/stars'
import { areDifferentDays } from '../../../utils/areDifferentDays'

/**
 * @desc    Completion 
 * @route   POST /api/user/friend/accept
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
    for(let i = 0; i < user.completed.length; i ++) {
      if(user.completed[i].lessonId.equals(lessonId)) {
        completedIndex = i
        break
      }
    }

    const stars = calculateStars(score)
    const newCompleted = [...user.completed]
    let newCompletedLesson
    let newSlimeGel = user.slimeGel

    // Has not completed lesson yet
    if(completedIndex === -1) {
      // Can loot lesson
      if(canLoot) {
        newSlime += getQuizRewards(stars, undefined)
        newCompletedLesson = {
          lessonId,
          stars,
          looted: true
        }
        newCompleted.push(newCompletedLesson)

        await User.findByIdAndUpdate(user._id, {
          slimeGel: newSlimeGel,
          completed: newCompleted,
          lastRewards: newLastRewards,
        })
      }
      // Cannot loot lesson
      else {
        newCompletedLesson = {
          lessonId,
          stars,
          looted: false
        }
        newCompleted.push(newCompletedLesson)

        await User.findByIdAndUpdate(user._id, {
          completed: newCompleted,
        })
      }
    }
    // Completed lesson and already looted
    else if(user.completed[completedIndex].looted) {
      if(stars > user.completed[completedIndex].stars) {
        newSlimeGel += getQuizRewards(stars, newCompleted[completedIndex].stars)
        newCompleted[completedIndex].stars = stars
        await User.findByIdAndUpdate(user._id, {
          slimeGel: newSlimeGel,
          completed: newCompleted,
        })
      }
    }
    // Completed lesson, but hasn't looted but can loot
    else if(canLoot) {
      newSlimeGel += getQuizRewards(stars, undefined)
      newCompleted[completedIndex].stars = stars
      newCompleted[completedIndex].looted = true
      await User.findByIdAndUpdate(user._id, {
        slimeGel: newSlimeGel,
        completed: newCompleted,
        lastRewards: newLastRewards,
      })
    }
    // Completed lesson, hasn't looted and cannot loot, but new high score
    else if(stars > newCompleted[completedIndex].stars) {
      newCompleted[completedIndex].stars = stars
      await User.findByIdAndUpdate(user._id, {
        completed: newCompleted,
      })
    }

    if(completedIndex !== -1) {
      newCompletedLesson = newCompleted[completedIndex]
    }

    const newUser = await User.findById(user._id)
      .select('completed lastRewards')

    res.status(400).json({
      stars: stars, // Most recent score
      completedLesson: newCompletedLesson, // Lesson with high score
      slimeGel: newSlimeGel,
      completed: newUser.completed,
      lastRewards: newUser.lastRewards,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

