import { verifyApiKey } from "../../../utils/verify";
import connectDB from "../../../utils/connectDB";
import Activity from "../../../models/activityModel";

/**
 * @desc    Get information of all activity
 * @route   GET /api/activity/
 * @access  Public
 * @param
 * String id
 */
export default async function (req, res) {
  try {
    if (req.method !== "GET") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apikey);

    const { activityId } = req.query;

    // Connect to database
    await connectDB();

    // Get all activity
    const activity = await Activity.find(
      activityId ? { _id: activityId } : {}
    ).populate({
      path: "pages",
      model: "Page",
      populate: [
        {
          path: "sections",
          model: "Section",
          populate: [
            {
              path: "elements",
              model: "Element",
            },
          ],
        },
      ],
    });
    res.status(200).json({ activity });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
