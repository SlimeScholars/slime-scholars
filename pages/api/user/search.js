import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import { getPopulatedPlayer } from "../../../utils/getPopulatedUser";

/**
 * @desc    Search for a player based on keywords in their username
 * @route   GET /api/user/search?username=...
 * @access  Public
 * @param   {string} req.query.username - Words included in the username of the user you want to find
 * @param   {string} req.query.userId - The id of the user doing the search
 */
export default async function (req, res) {
  try {
    if (req.method !== "GET") {
      throw new Error(`${req.method} is an invalid request method`);
    }

    // Connect to database
    await connectDB();

    const { username, userId } = req.query;

    if (!username) {
      res.status(200).json({ users: [] });
    }

    // Get rid of all characters except spaces, letters, and numbers
    const cleanedUsername = username.toLowerCase().replace(/[^a-z0-9\s]/g, "");

    // Make an array of keywords out of all space seperated words
    const keywords = cleanedUsername.split(" ");

    // Search for user
    const users = await User.find({
      $and: [
        { userType: 1 },
        {
          username: {
            $all: keywords.map((keyword) => new RegExp(keyword, "i")),
          },
          _id: {
            $ne: userId // Make sure the user performing the search is not sent back
          }
        },
      ],
    })
      .limit(20)
      .select("_id")
      .exec();

    // Populate the users
    const populatedPlayers = [];
    for (let i in users) {
      const populatedPlayer = await getPopulatedPlayer(users[i]._id);
      populatedPlayers.push(populatedPlayer);
    }

    /*
    const usernameRegex = new RegExp(`^${username}$`, 'i')
    const userId = (await User.findOne({ username: { $regex: usernameRegex } })
      .select('_id')
      .exec()
    )
    */

    res.status(200).json({ users: populatedPlayers });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
