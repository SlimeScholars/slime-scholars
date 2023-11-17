import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Course from "../../../../models/courseModel";
import Unit from "../../../../models/unitModel";
import Activity from "../../../../models/activityModel";
import Lesson from "../../../../models/lessonModel";
// Import for the populate

/**
 * @desc    Get units for unit selection
 * @route   GET /api/learn/activities
 * @access  Private - Students
 * @param   {string} req.query.courseId - Id of the course the activity belongs to
 * @param   {string} req.query.unitId - Id of the unit the activity belongs to
 * @param   {string} req.query.lessonId - Id of the lesson the activity belongs to
 */

const retrieve_activity = async (id) => {
  try {
    const response = await Activity.findById(id).exec();
    return response ? response : undefined;
  } catch (err) {
    console.log(err);
  }
};

export default async function (req, res) {
  try {
    if (req.method !== "GET") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apikey);

    // Connect to database
    await connectDB();

    // Authenticate and get user with completed lessons, units, courses
    const user = await authenticate(req.headers.authorization, {
      lessons: 1,
      units: 1,
      courses: 1,
    });

    // Make sure user is a student
    checkUserType(user, 1);

    const { courseId, unitId, lessonId } = req.query;

    const course = await Course.findById(courseId).select("courseName");

    const unit = await Unit.findById(unitId)
      .select("unitName unitNumber lessons")
      .populate({
        path: "lessons",
        select: "_id lessonName lessonType activities",
      });

    const lesson = await Lesson.findById(lessonId)
      .select("lessonName lessonType activities")
      .populate({
        path: "activities",
        select: "_id activityName",
      });

    const modifiedActivities = [];
    // Check user for completed
    for (let i in lesson.activities) {
      modifiedActivities.push({
        ...lesson.activities[i]._doc,
      });
      //perform operations
    }

    res.json({
      courseName: course.courseName,
      unitName: unit.unitName,
      unitNumber: unit.unitNumber,
      lessonName: lesson.lessonName,
      lessonType: lesson.lessonType,
      activities: modifiedActivities,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
