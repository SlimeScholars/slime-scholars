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

    let parent = user.parent
    if(user.userType === 1 && parentEmail && (!parent || parentEmail.toLowerCase() !== user.parent.email)) {
      const lowercaseParentEmail = parentEmail.toLowerCase()
      const newParent = await User.findOne({ email: lowercaseParentEmail }, {password: 0})
      if(!newParent) {
        throw new Error('Could not find a user with that email')
      }
      if(newParent.userType !== 2) {
        throw new Error('The user with that email is not a parent')
      }
      parent = newParent
    }
    else if(!parentEmail) {
      parent = undefined
    }

    if(!email && !parentEmail) {
      throw new Error('Account must either have an email or parent email')
    }

    // This complex expression is used because if either user.parent
    // or parent is undefined, I can't do undefined.equals(something)
    if(
      (user.parent !== undefined && parent !== undefined && user.parent._id !== parent._id) ||
      (user.parent === undefined && parent !== undefined) ||
      (user.parent !== undefined && parent === undefined)
    ) {
      if(user.parent) {
        // Delete student from old parent's student list
        const oldParent = await User.findById(user.parent._id, {password: 0})
        if(oldParent) {
          const newStudents = oldParent.students.filter(item => !item.equals(user._id))
          await User.findByIdAndUpdate(user.parent._id, {students: newStudents})
        }
      }

      if(parent) {
        // Add student to new parent's student list
        const newParent = await User.findById(parent._id, {password: 0})
        if(newParent) {
          newParent.students.push(user)
          await User.findByIdAndUpdate(newParent._id, {students: newParent.students})
        }
      }
    }

    if(user.userType === 2 && user.userType === 3) {
      await User.findByIdAndUpdate(user._id, {
        firstName,
        lastName,
        email: newEmail,
      })

      const update = await User.findById(user._id)
      update.honorific = honorific ? honorific : undefined
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
      update.parent = parent
      await update.save()
    }

    const newUser = await User.findById(user._id, {password: 0})
        .populate({
          path: 'parent',
          select: '_id userType firstName lastName honorific email',
        })
        .exec()

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
