import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Class from '../../../models/classModel'

/**
 * @desc    Delete a class
 * @route   DELETE /api/class/delete
 * @access  Private - Teachers
 * @param   {string} req.body.classId - Id of class.
 */
export default async function (req, res) {
  try {
    if(req.method !== 'DELETE') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 3)

    const { classId } = req.body

    if(!classId) {
      throw new Error('Class id cannot be empty')
    }

    const classExists = await Class.findById(classId)

    if(!classExists) {
      throw new Error('Cannot find class')
    }

    if(!classExists.teachers.includes(user._id)) {
      throw new Error(`You are not in ${classExists.className}`)
    }

    for(let studentId of classExists.students) {
      const student = await User.findById(studentId)
      const index = student.classes.indexOf(classExists._id)
      if (index !== -1) {
        student.classes.splice(index, 1)
      }
      await User.findByIdAndUpdate(studentId, {
        classes: student.classes
      })
    }

    await Class.findByIdAndDelete(classExists._id)
    const index = user.classes.indexOf(classExists._id)
    if (index !== -1) {
      user.classes.splice(index, 1)
    }
    await User.findByIdAndUpdate(user._id, {
      classes: user.classes,
    })

    res.status(204).json({
      user,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
