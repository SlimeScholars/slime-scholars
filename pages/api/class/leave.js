import { authenticate } from "../../../utils/authenticate"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Class from '../../../models/classModel'

/**
 * @desc    Leave a class
 * @route   POST /api/class/leave
 * @access  Private - Students, teachers
 * @param   {string} req.body.classId - Id of class you are trying to leave.
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

    const { classId } = req.body

    if(!classId) {
      throw new Error('Class id cannot be empty')
    }

    const classExists = await Class.findById(classId)

    if(!classExists) {
      throw new Error('Cannot find class')
    }

    if(user.userType === 1 && !classExists.students.includes(user._id)) {
      throw new Error(`You already are not in ${classExists.className}`)
    }
    if(user.userType === 3 && !classExists.teachers.includes(user._id)) {
      throw new Error(`You are already not in ${classExists.className}`)
    }

    // Delete the student from the class
    if(user.userType === 1) {
      const index = classExists.students.indexOf(user._id)
      if (index !== -1) {
        classExists.students.splice(index, 1)
      }
      await Class.findByIdAndUpdate(classExists._id, {
        students: classExists.students
      })
    }

    // Teachers
    else if(user.userType === 3) {
      // Do not allow teacher to leave if they are the last teacher in the class
      if(classExists.teachers.length === 1) {
        throw new Error(`You are the only teacher in ${classExists.className}, so you cannot leave the class. Either add another teacher before leaving or delete the class altogether.`)
      }

      // Delete teacher from the class
      const index = classExists.teachers.indexOf(user._id)
      if (index !== -1) {
        classExists.teachers.splice(index, 1)
      }
      await Class.findByIdAndUpdate(classExists._id, {
        teachers: classExists.teachers
      })
    }

    // Remove class from user's class list
    const index = user.classes.indexOf(classExists._id)
    if (index !== -1) {
      user.classes.splice(index, 1)
    }
    await User.findByIdAndUpdate(user._id, {
      classes: user.classes,
    })

    // Instead of sending the ids of the students, send the actual object
    const students = []
    for(let studentId of classExists.students) {
      const student = await User.findById(studentId)
      student.password = undefined
      students.push(student)
    }
    // Instead of sending the ids of the teachers, send the actual object
    const teachers = []
    for(let teacherId of classExists.teachers) {
      const teacher = await User.findById(teacherId)
      teacher.password = undefined
      teachers.push(teacher)
    }
    classExists.students = students
    classExists.teachers = teachers

    res.status(200).json({
      class: classExists,
      user,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
