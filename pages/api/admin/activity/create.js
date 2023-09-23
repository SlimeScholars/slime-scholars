import { authenticate } from "../../../../utils/authenticate";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Unit from "../../../../models/unitModel";
import Lesson from "../../../../models/lessonModel";
import Activity from "../../../../models/activityModel";

/**
 * @desc    Create an activity
 * @route   POST /api/admin/activity/create
 * @access  Private - Admin
 * @param   {string} req.body.unitId
 * @param   {number} req.body.lessonNumber
 */
export default async function (req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method`);
    }

    // Connect to database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a teacher
    checkUserType(user, 4);

    const { lessonId, activityNumber } = req.body;

    if (!lessonId) {
      throw new Error("Missing lessonId");
    }
    if (activityNumber === undefined) {
      throw new Error("Missing activity number");
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      throw new Error("Could not find lesson");
    }

    const latestAuthor = `${user.firstName} ${user.lastName}`;

    const activity = await Activity.create({
      activityNumber,
      latestAuthor,
      pages: [],
    });

    lesson.activities.push(activity._id);

    await Lesson.findByIdAndUpdate(lessonId, {
      activities: lesson.activities,
      latestAuthor,
    });

    const newLesson = await Lesson.findById(lessonId).populate("activities");

    res.status(201).json({ lesson: newLesson });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
