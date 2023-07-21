const jwt = require('jsonwebtoken')
import User from '../models/userModel'
import '../models/slimeModel'

export const authenticate = async(authorization) => {
  // authorization is req.headers.authorization
  let token
  
  if (
    authorization &&
    authorization.startsWith('Bearer')
  ) {
    try {
      // Take out the 'Bearer' part
      token = authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      const user = await User.findById(decoded.id, {
        password: 0, createdAt: 0, updatedAt: 0, __v: 0
      })
        .populate({
          path: 'parent',
          select: '_id userType firstName lastName honorific email',
        })
        // TODO: Add profile picture, badges, score, etc.
        .populate({
          path: 'friends',
          select: '_id userType username',
        })
        .populate({
          path: 'receivedFriendRequests',
          select: '_id userType username',
        })
        .populate({
          path: 'sentFriendRequests',
          select: '_id userType username',
        })
        .populate({
          path: 'students',
          select: '_id userType username firstName lastName completed',
        })
        .populate({
          path: 'slimes',
          select: '-userId -createdAt -updatedAt -__v',
        })
        .exec()

      if(user) {
        return user
      }
      else {
        throw new Error('User not found')
      }
      
    } catch (error) {
      throw new Error(error.message)
    }
  }

  if (!token) {
    throw new Error('Not authorized, no token')
  }
}
