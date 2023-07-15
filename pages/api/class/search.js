import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import Class from '../../../models/classModel'
import User from "../../../models/userModel"

/**
 * @desc    Get information about a specific class
 * @route   GET /api/class/search
 * @access  Private - Students and teachers that are in the class
 * @param   {string} req.query.classId - Id of class.
 */
export default async function (req, res) {
  try {
    if(req.method !== 'GET') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 1, 3)

    const { classId } = req.query

    if(!classId) {
      throw new Error('Class id cannot be empty')
    }

    const classExists = await Class.findById(classId)

    if(!classExists) {
      throw new Error('Cannot find class')
    }

    if(user.userType === 1 && !classExists.students.includes(user._id)) {
      throw new Error(`You are not in ${classExists.className}`)
    }
    else if(user.userType === 3 && !classExists.teachers.includes(user._id)) {
      throw new Error(`You are not in ${classExists.className}`)
    }

    // Instead of sending the ids of the students, send the actual object
    const students = []
    for(let studentId of classExists.students) {
      const student = await User.findById(studentId)
      students.push(student)
    }
    // Instead of sending the ids of the teachers, send the actual object
    const teachers = []
    for(let teacherId of classExists.teachers) {
      const teacher = await User.findById(teacherId)
      teachers.push(teacher)
    }
    classExists.students = students
    classExists.teachers = teachers

    res.status(200).json({
      class: classExists,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}

