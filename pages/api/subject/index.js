import connectDB from "../../../utils/connectDB";
import { verifyApiKey } from "../../../utils/verify";
import Subject from "../../../models/subjectModel";
// Import these to initialize the models for the populate
import "../../../models/courseModel";
import "../../../models/unitModel";
import "../../../models/lessonModel";
import "../../../models/activityModel";

/**
 * @desc    Get information of all subjects
 * @route   GET /api/course/
 * @access  Public
 */
export default async function (req, res) {
  try {
    if (req.method !== "GET") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apikey);

    // Connect to database
    await connectDB();

    // Get all subjects
    const subjects = await Subject.find({}).populate({
      path: "courses",
      model: "Course",
      populate: [
        {
          path: "units",
          model: "Unit",
          populate: [
            {
              path: "lessons",
              model: "Lesson",
              populate: {
                path: "activities",
                model: "Activity",
              },
            },
            {
              path: "quizzes",
              model: "Lesson",
            },
          ],
        },
        {
          path: "quizzes",
          model: "Lesson",
        },
      ],
    });

    res.status(200).json({ subjects });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
