const jwt = require('jsonwebtoken')
import { getPopulatedUser } from './getPopulatedUser'

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
      const user = await getPopulatedUser(decoded.id)

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
