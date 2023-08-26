import { mongoose } from "mongoose";
import { authenticate } from "../../../../utils/authenticate";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import User from "../../../../models/userModel";
import { getPopulatedPlayer } from "../../../../utils/getPopulatedUser";

/**
 * @desc    Look for a friend (based on their username)
 * @route   GET /api/user/friend/search
 * @access  Private - Students
 * @param   {string} req.query.username - Words included in the username of the friend
 */
export default async function (req, res) {
  try {
    if (req.method !== "GET") {
      throw new Error(`${req.method} is an invalid request method`);
    }

    // Connect to database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a student
    checkUserType(user, 1);

    const { username } = req.query;

    // Get rid of all characters except spaces, letters, and numbers
    const cleanedUsername = username
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim();

    // Make an array of keywords out of all space seperated words
    const keywords = cleanedUsername.split(" ");

    const matchingFriends = [];
    for (let i in user.friends) {
      for (let keyword of keywords) {
        if (user.friends[i].username.toLowerCase().includes(keyword)) {
          matchingFriends.push(user.friends[i]);
        }
      }
    }

    res.status(200).json({ matchingFriends });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
