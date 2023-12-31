import User from "../models/userModel";
import "../models/slimeModel";
import { getSortedItems, getSortedSlimes } from "./sort";

export const getPopulatedUser = async (
  userId,
  config = { lessons: 0, units: 0, courses: 0 }
) => {
  const modifiedConfig = {
    password: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  };

  const user = await User.findById(userId, modifiedConfig)
    .populate({
      path: "parent",
      select: "_id userType firstName lastName honorific email",
    })
    // TODO: Add profile picture, badges, score, etc.
    .populate({
      path: "friends",
      select: "_id",
      options: {
        sort: { exp: -1 },
      },
    })
    .populate({
      path: "students",
      select: "_id userType username firstName lastName progress",
    })
    .populate({
      path: "slimes",
      select: "-user -createdAt -updatedAt -__v",
    })
    .populate({
      path: "roster",
      select: "-user -createdAt -updatedAt -__v",
      options: { retainNullValues: true },
    })
    .lean()
    .exec();

  // Populating friends and friend requests

  for (let i in user.friends) {
    const populatedFriend = await getPopulatedPlayer(user.friends[i]._id);
    user.friends[i] = populatedFriend;
  }

  for (let i in user.receivedFriendRequests) {
    const populatedRequest = await getPopulatedPlayer(
      user.receivedFriendRequests[i]
    );
    user.receivedFriendRequests[i] = populatedRequest;
  }

  for (let i in user.sentFriendRequests) {
    const populatedRequest = await getPopulatedPlayer(
      user.sentFriendRequests[i]
    );
    user.sentFriendRequests[i] = populatedRequest;
  }
  //   debug later
  //   const friendUserIds = []
  //   for (let i in user.friends) {
  //     friendUserIds.push(user.friends[i]._id)
  //   }
  //   user.friends = batchGetPopulatedPlayer(friendUserIds)

  //   const receivedUserIds = []
  //   for (let i in user.receivedFriendRequests) {
  //     receivedUserIds.push(user.receivedFriendRequests[i])
  //   }
  //   user.receivedFriendRequests = batchGetPopulatedPlayer(receivedUserIds)

  //   const sentUserIds = []
  //   for (let i in user.sentFriendRequests) {
  //     sentUserIds.push(user.sentFriendRequests[i])
  //   }
  //   user.sentFriendRequests = batchGetPopulatedPlayer(sentUserIds)
  if (user.items && user.slimes) {
    user.items = getSortedItems(user.items);
    user.slimes = getSortedSlimes(user.slimes);
  }

  return user;
};

export const getPopulatedPlayer = async (userId) => {
  const user = await User.findById(userId)
    .select("_id username slimes roster exp pfpBg pfpSlime")
    .populate({
      path: "slimes",
      select: "-user -createdAt -updatedAt -__v",
    })
    .populate({
      path: "roster",
      select: "-user -createdAt -updatedAt -__v",
      options: { retainNullValues: true },
    })
    .lean()
    .exec();

  if (user.slimes) {
    user.slimes = getSortedSlimes(user.slimes);
  }

  return user;
};

export const batchGetPopulatedPlayer = async (userIds) => {
  try {
    const users = await User.find({ _id: { $in: userIds } })
      .select("_id username slimes roster exp pfpBg pfpSlime")
      .populate({
        path: "slimes",
        select: "-user -createdAt -updatedAt -__v",
      })
      .populate({
        path: "roster",
        select: "-user -createdAt -updatedAt -__v",
        options: { retainNullValues: true },
      })
      .sort({ exp: -1 })
      .lean()
      .exec();

    const populatedUsers = users.map((user) => {
      if (user.slimes) {
        user.slimes = getSortedSlimes(user.slimes);
      }
      return user;
    });

    return populatedUsers;
  } catch (error) {
    throw error;
  }
};
