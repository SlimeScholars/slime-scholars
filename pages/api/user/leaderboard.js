import User from "../../../models/userModel";
import { authenticate } from "../../../utils/authenticate";
import { checkUserType } from "../../../utils/checkUserType";
import connectDB from "../../../utils/connectDB";
import { getPopulatedPlayer } from "../../../utils/getPopulatedUser";

/**
 * @desc    Get user data of the person who is signed in
 * @route   GET /api/user/leaderboard
 * @access  Private - Any logged-in student
 */
export default async function (req, res) {
  try {
    if (req.method !== "GET") {
      throw new Error(`${req.method} is an invalid request method`);
    }

    // Connect to the database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a student
    checkUserType(user, 1);

    // Find the top 10 users with the highest experience, sorted in descending order
    const leaderboard = await User.find({ userType: 1 })
      .sort({ exp: -1 })
      .select("_id");

    // Find the user's rank in the sorted leaderboard
    const userRank = leaderboard.findIndex(
      (leader) => leader._id.toString() === user._id.toString()
    );
    const actualUserRank = userRank + 1;

    const sortedLeaderboard = await User.find({ userType: 1 })
      .sort({ exp: -1 })
      .limit(10)
      .select("_id");
    const populatedLeaderboard = [];

    // Loop through the leaderboard and populate each player
    for (let i = 0; i < sortedLeaderboard.length; i++) {
      const populatedPlayer = await getPopulatedPlayer(
        sortedLeaderboard[i]._id
      );
      populatedLeaderboard.push(populatedPlayer);
    }

    // If the user is not in the top 10, populate the user's data and add it to the leaderboard
    if (actualUserRank >= 10) {
      const populatedPlayer = await getPopulatedPlayer(user._id);
      populatedLeaderboard.push(populatedPlayer);
    }

    res
      .status(200)
      .json({ leaderboard: populatedLeaderboard, userRank: actualUserRank });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
