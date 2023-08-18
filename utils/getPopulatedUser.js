import User from '../models/userModel'
import '../models/slimeModel'
import { getPopulatedRoster } from './getPopulatedRoster'

export const getPopulatedUser = async (userId) => {
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
      select: '_id',
      options: {
        sort: { exp: -1 }
      }
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

  modifiedUser.roster = await getPopulatedRoster(modifiedUser.roster)

  for (let i in modifiedUser.friends) {
    const populatedFriend = await getPopulatedPlayer(modifiedUser.friends[i]._id)
    modifiedUser.friends[i] = populatedFriend
  }

  for (let i in modifiedUser.receivedFriendRequests) {
    const populatedRequest = await getPopulatedPlayer(modifiedUser.receivedFriendRequests[i])
    modifiedUser.receivedFriendRequests[i] = populatedRequest
  }

  for (let i in modifiedUser.sentFriendRequests) {
    const populatedRequest = await getPopulatedPlayer(modifiedUser.sentFriendRequests[i])
    modifiedUser.sentFriendRequests[i] = populatedRequest
  }

  return modifiedUser
}

export const getPopulatedPlayer = async (userId) => {
  const user = await User.findById(userId)
    .select('_id username slimes roster exp pfpBg pfpSlime completedCourses completedLessons completedUnits')
    .populate({
      path: 'slimes',
      select: '-user -createdAt -updatedAt -__v',
    })
    .exec()

  // Duplicate user so that it can be editted
  const modifiedUser = {
    ...user.toJSON(),
  }

  modifiedUser.roster = await getPopulatedRoster(modifiedUser.roster)

  return modifiedUser
}