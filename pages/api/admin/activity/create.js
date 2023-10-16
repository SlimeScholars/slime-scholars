import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Lesson from "../../../../models/lessonModel";
import Activity from "../../../../models/activityModel";

/**
 * @desc    Create an activity
 * @route   POST /api/admin/activity/create
 * @access  Private - Admin
 * @param   {string} req.body.lessonId
 * @param   {number} req.body.activityNumber
 */
export default async function (req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method`);
    }

    verifyApiKey(req.headers.apiKey);

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

    const element = {
      index: 0,
      elementType: "text",
      text: "this is a default text element",
    };
    const section = {
      sectionIndex: 1,
      elements: [element],
    };
    const page = {
      pageNumber: 1,
      sections: [section],
      latestAuthor,
    };

    const activity = await Activity.create({
      activityNumber,
      latestAuthor,
      pages: [page],
    });
    console.log(activity);

    lesson.activities.push(activity);

    await Lesson.findByIdAndUpdate(lessonId, {
      activities: lesson.activities,
      latestAuthor,
    });

    const newLesson = await Lesson.findById(lessonId).populate("activities");
    console.log(newLesson);

    res.status(201).json({ lesson: newLesson });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
