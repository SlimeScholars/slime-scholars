import { authenticate } from "../../../utils/authenticate";
import { verifyApiKey } from "../../../utils/verify";
import { checkUserType } from "../../../utils/checkUserType";
import connectDB from "../../../utils/connectDB";
import Course from "../../../models/courseModel";
import { rewardData } from "../../../data/lessonData";
// Import for the populate
import "../../../models/unitModel";

/**
 * @desc    Get units for unit selection
 * @route   GET /api/learn/units
 * @access  Private - Students
 * @param   {string} req.query.courseId - Id of the course the unit belongs to
 */
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

    const { courseId } = req.query;

    const course = await Course.findById(courseId)
      .select("courseName units totalPoints")
      .populate({
        path: "units",
        select: "_id unitName unitNumber totalPoints lessons quizzes tests",
      });

    const userProgress = user.progress.find((course) => {
      return course._id === courseId;
    });

    const modifiedUnits = [];
    // Check user for completed
    for (let i in course.units) {
      const unitProgress = userProgress
        ? userProgress.units.find((unit) => {
            return unit._id === course.units[i]._id.valueOf();
          })
        : undefined;
      modifiedUnits.push({
        _id: course.units[i]._id,
        unitName: course.units[i].unitName,
        unitNumber: course.units[i].unitNumber,
        count: {
          lessons: course.units[i].lessons ? course.units[i].lessons.length : 0,
          quizzes: course.units[i].quizzes ? course.units[i].quizzes.length : 0,
          tests: course.units[i].tests ? course.units[i].tests.length : 0,
        },
        achievedPoints: unitProgress ? unitProgress.completion.achieved : 0,
        totalPoints:
          course.units[i].totalPoints || calculateTotalPoints(course.units[i]),
      });
      for (let j in user.completedUnits) {
        if (
          (user.completedUnits[j].unit._id &&
            user.completedUnits[j].unit._id.equals(course.units[i]._id)) ||
          user.completedUnits[j].unit.equals(course.units[i]._id)
        ) {
          modifiedUnits[i].tier = true;
        }
      }
    }

    res.json({
      courseName: course.courseName,
      units: modifiedUnits,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const calculateTotalPoints = (unit) => {
  let totalPoints =
    unit.quizzes &&
    rewardData.quiz * unit.quizzes.length + unit.tests &&
    rewardData.test * unit.tests.length + unit.lessons &&
    rewardData.lesson * unit.lessons.length;
  return totalPoints || 0;
};
