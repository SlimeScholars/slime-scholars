import { verifyName, verifyUsername, verifyHonorific, verifyEmail } from "../../../utils/verify"
import { authenticate } from "../../../utils/authenticate"
import connectDB from '../../../utils/connectDB'
import User from '../../../models/userModel'

/**
 * @desc    Update user's account information, but not password
 * @route   PUT /api/user/update
 * @access  Private - Any logged in user
 * @param   {string} req.body.username - Min 2 characters long. Max 15 characters long. Can only contain alphabetical characters and numbers (no spaces).
 * @param   {string} req.body.firstName - Max 55 characters long. Can only contain alphabetical characters.
 * @param   {string} req.body.lastName - Max 55 characters long. Can only contain alphabetical characters.
 * @param   {string} req.body.honorific - Can be "Mr.", "Ms.", "Mrs.", "Dr.", "Jr.", or none.
 * @param   {string} req.body.email - Max 255 characters long.
 * @param   {string} req.body.parentEmail - Max 255 characters long.
 */
export default async function (req, res) {
  try {
    if(req.method !== 'PUT') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // If no changes made, the fields should have value equal to their previous value
    // If the user wants to remove their parente email, it should be empty
    const {
      username,
      firstName,
      lastName,
      honorific,
      email,
      parentEmail,
    } = req.body

    verifyName(firstName)
    verifyName(lastName)
    verifyHonorific(honorific)

    let newEmail = user.email
    // Only check if email is taken if the user is changing email
    if(email) {
      const lowercaseEmail = email.toLowerCase()

      // Check if email is being changed
      if(email.toLowerCase() !== newEmail) {
        verifyEmail(email)

        // Make sure the email is not taken
        const userExists = await User.findOne({ email: lowercaseEmail }, {password: 0})

        if (userExists) {
          throw new Error('Email is already in use')
        }
        newEmail = lowercaseEmail
      }
    }

    // If email is empty and the user is not a student, then throw error
    else if(user.userType === 2 || user.userType === 3) {
      throw new Error('Email cannot be empty')
    }

    // Change username only if the user updated the old username
    let newUsername = user.username
    if(user.userType === 1 && username && username !== user.username) {
      // Make sure username is not empty and valid
      verifyUsername(username)
      
      // Make sure username is not taken
      const usernameRegex = new RegExp(username, 'i')
      const userExists = await User.findOne({ username: { $regex: usernameRegex } }, {password: 0})

      // Allow user to change their username to different capitalization
      if (userExists && !userExists._id.equals(user._id)) {
        throw new Error('Username is taken')
      }
      newUsername = username
    }

    let parentId = user.parentId
    let newParentEmail = user.parentEmail
    if(user.userType === 1 && parentEmail && parentEmail.toLowerCase() !== user.parentEmail) {
      verifyEmail(parentEmail)

      const lowercaseParentEmail = parentEmail.toLowerCase()
      const parent = await User.findOne({ email: lowercaseParentEmail }, {password: 0})
      if(!parent) {
        throw new Error('Parent email not found')
      }
      if(parent.userType !== 2) {
        throw new Error('The user with that email is not a parent')
      }
      parentId = parent._id
      newParentEmail = lowercaseParentEmail
    }

    if(!email && !parentEmail) {
      throw new Error('Account must either have an email or parent email')
    }

    // This complex expression is used because if either user.parentId
    // or parentId is undefined, I can't do undefined.equals(something)
    if((user.parentId !== undefined && !user.parentId.equals(parentId)) ||
    (parentId !== undefined && !parentId.equals(user.parentId))) {
      if(user.parentId) {
        // Delete student from old parent's student list
        const parent = await User.findById(user.parentId, {password: 0})
        if(parent) {
          const newStudents = parent.students.filter(item => !item.equals(user._id))
          await User.findByIdAndUpdate(user.parentId, {students: newStudents})
        }
      }
      // Add student to new parent's student list
      const parent = await User.findById(parentId, {password: 0})
      if(parent) {
        parent.students.push(user._id)
        await User.findByIdAndUpdate(parentId, {students: parent.students})
      }
    }

    if(user.userType === 2 && user.userType === 3) {
      await User.findByIdAndUpdate(user._id, {
        firstName,
        lastName,
        email: newEmail,
      })

      const update = await User.findById(user._id)
      update.honorific = honorific
      await update.save()
    }

    else if(user.userType === 1) {
      await User.findByIdAndUpdate(user._id, {
        firstName,
        lastName,
        username: newUsername,
      })
      
      const update = await User.findById(user._id)
      update.email = newEmail
      update.parentEmail = newParentEmail
      update.parentId = parentId
      await update.save()
    }

    const newUser = await User.findById(user._id, {password: 0})

    if (newUser) {
      res.status(200).json({
        user: newUser,
      })
    } else {
      throw new Error('Failed to update user')
    }

  } catch (error) { 
    res.status(400).json({message: error.message})
  }
}
