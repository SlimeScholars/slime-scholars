import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Class from '../../../models/classModel'

/**
 * @desc    Join a class
 * @route   POST /api/class/join
 * @access  Private - Students, teachers
 * @param   {string} req.body.classCode - Class code of the class you are trying to join.
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

    // Make sure user is a teacher
    checkUserType(user, 1, 3)

    const { classCode } = req.body

    if(!classCode) {
      throw new Error('Class code cannot be left empty')
    }

    const classExists = await Class.findOne({classCode})

    if(!classExists) {
      throw new Error(`Cannot find a class with code ${classCode}`)
    }

    if(user.userType === 1 && classExists.students.includes(user._id)) {
      throw new Error(`You are already in ${classExists.className}`)

    }
    if(user.userType === 3 && classExists.teachers.includes(user._id)) {
      throw new Error(`You are already in ${classExists.className}`)
    }

    if(user.userType === 1) {
      classExists.students.push(user._id)
      await Class.findByIdAndUpdate(classExists._id, {
        students: classExists.students
      })
    }
    else if(user.userType === 3) {
      classExists.teachers.push(user._id)
      await Class.findByIdAndUpdate(classExists._id, {
        teachers: classExists.teachers
      })
    }
    user.classes.push(classExists._id)
    await User.findByIdAndUpdate(user._id, {
      classes: user.classes,
    })

    res.status(200).json({
      class: classExists,
      user,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
