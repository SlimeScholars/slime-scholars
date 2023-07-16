import { verifyClassName } from "../../../utils/verify"
import { generateClassCode } from "../../../utils/generateClassCode"
import { authenticate } from "../../../utils/authenticate"
import { userData } from "../../../data/userData"
import { checkUserType } from '../../../utils/checkUserType'
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'
import Class from '../../../models/classModel'

/**
 * @desc    Create a class
 * @route   POST /api/class/create
 * @access  Private - Teachers
 * @param   {string} req.body.className - Max 60 characters long.
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
    checkUserType(user, 3)

    const { className } = req.body

    verifyClassName(className)        

    let classCode = generateClassCode(userData.classCodeLength)
    let counter = 0
    let classExists = await Class.findOne({classCode})
    while(classExists && counter < 10) {
      classCode = generateClassCode(userData.classCodeLength)
      classExists = await Class.findOne({classCode})
    }

    const newClass = await Class.create({
      className,
      classCode,
      teachers: [user._id],
      students: [],
    })

    user.classes.push(newClass._id)
    await User.findByIdAndUpdate(user._id, {
      classes: user.classes
    })

    // Send back the class with the teacher as an object rather than id
    newClass.teachers = [user]

    res.status(201).json({
      class: newClass,
      user,
    })

  } catch(error) {
    res.status(400).json({message: error.message})
  }
}
