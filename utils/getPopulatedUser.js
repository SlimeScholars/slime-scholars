import User from '../models/userModel'
import Slime from '../models/slimeModel'

export const getPopulatedUser = async(userId) => {
  const user = await User.findById(userId, {
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
      select: '-user -createdAt -updatedAt -__v',
    })
    .exec()
  
  // Duplicate user so that it can be editted
  const modifiedUser = {
    ...user.toJSON(),
  }

  for(let i in modifiedUser.roster) {
    if(modifiedUser.roster[i]) {
      const slime = await Slime.findById(modifiedUser.roster[i], {
        user: 0, createdAt:0, updatedAt: 0, __v: 0,
      })
      modifiedUser.roster[i] = slime
    }
  }

  return modifiedUser
}