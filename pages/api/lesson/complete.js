import { mongoose } from 'mongoose'
import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Lesson from '../../../models/lessonModel'
import { calculateStars } from '../../../utils/calculateStars'
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
    if(completedIndex === -1) {
      if(canLoot) {
        // TODO: Give rewards
        newCompleted.push({
          lessonId,
          stars,
          looted: true,
        })

        await User.findByIdAndUpdate(user._id, {
          completed: newCompleted,
          lastRewards: newLastRewards,
        })
      }
      else {
        newCompleted.push({
          lessonId,
          stars,
          looted: false,
        })

        await User.findByIdAndUpdate(user._id, {
          completed: newCompleted,
        })
      }

    }
    else if(stars > user.completed[completedIndex]) {
      if(user.completed[completedIndex].looted) {
        // TODO: Give rewards
        newCompleted[completedIndex].stars = stars
        await User.findByIdAndUpdate(user._id, {
          completed: newCompleted,
          lastRewards: newLastRewards,
        })
      }

    }


    const newUser = await User.findById(user._id)
      .select('completed lastRewards')

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

