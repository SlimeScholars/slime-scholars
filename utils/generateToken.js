const jwt = require('jsonwebtoken')
import { userData } from "../data/userData"

// Generate JWT
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: userData.jwtTokenExpiry,
  })
}