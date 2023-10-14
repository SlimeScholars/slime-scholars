// TODO: change from lesson to lower sublevel activity
import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Lesson from "../../../../models/lessonModel";
import Activity from "../../../../models/activityModel";

/**
 * @desc    Update the name of a activty
 * @route   PUT /api/admin/activity/update-name
 * @access  Private - Admin
 * @param   {string} req.body.activityId - Id of activity you want to update
 * @param   {string} req.body.activityName - Activity name you want to update to
 */
export default async function (req, res) {
  try {
    if (req.method !== "PUT") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apiKey)

    // Connect to database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a teacher
    checkUserType(user, 4);

    const { activityId, activityName } = req.body;

    if (!activityId) {
      throw new Error("Please send a activityId");
    }

    const activityExists = Activity.findById(activityId);

    if (!activityExists) {
      throw new Error("Could not find the lesson to update");
    }

    await Activity.findByIdAndUpdate(activityId, {
      activityName,
      latestAuthor: `${user.firstName} ${user.lastName}`,
    });

    const activity = await Activity.findById(activityId);

    res.status(200).json({ activity });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
