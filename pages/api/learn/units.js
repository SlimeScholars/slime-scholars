import { authenticate } from "../../../utils/authenticate";
import { verifyApiKey } from "../../../utils/verify";
import { checkUserType } from "../../../utils/checkUserType";
import connectDB from "../../../utils/connectDB";
import Course from "../../../models/courseModel";
import Unit from "../../../models/unitModel";
import Lesson from "../../../models/lessonModel";
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
      const unit = await Unit.findById(course.units[i]._id.valueOf())
        .select("unitName unitNumber lessons")
        .populate({
          path: "lessons",
          select: "_id lessonName lessonType",
        });
      const count = {
        lessons: 0,
        quizzes: 0,
        tests: 0,
      };
      for (let j of unit.lessons) {
        switch (j.lessonType) {
          case "lesson":
            count.lessons = count.lessons + 1;
            break;
          case "quiz":
            count.quizzes = count.quizzes + 1;
            break;
          case "test":
            count.tests = count.tests + 1;
            break;
          default:
            break;
        }
      }
      modifiedUnits.push({
        _id: course.units[i]._id,
        unitName: course.units[i].unitName,
        unitNumber: course.units[i].unitNumber,
        count: count,
        achievedPoints: unitProgress ? unitProgress.completion.achieved : 0,
        totalPoints:
          calculateTotalPoints(count.lessons, count.quizzes, count.tests),
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

const calculateTotalPoints = (lesson, quiz, test) => {
  let totalPoints =
    rewardData.quiz * quiz +
    rewardData.test * test +
    rewardData.lesson * lesson;
  return totalPoints || 0;
};
