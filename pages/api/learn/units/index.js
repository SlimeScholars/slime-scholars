import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Course from "../../../../models/courseModel";
import Unit from "../../../../models/unitModel";
import Lesson from "../../../../models/lessonModel";
import { rewardData } from "../../../../data/lessonData";
// Import for the populate
import "../../../../models/unitModel";

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
      .select("courseName units")
      .populate({
        path: "units",
        select: "_id unitName unitNumber lessons quizzes tests",
      });

    const userProgress = user.progress.find((c) => {
      return c.courseId === courseId;
    });

    const modifiedUnits = [];
    for (let i of course.units) {
      let userUnit = undefined;
      if (userProgress !== undefined) {
        userUnit = userProgress.units.find((u) => {
          return u.unitId === i._id.valueOf();
        });
      }

      const fullUnit = await Unit.findById(i._id).populate({
        path: "lessons",
        select: "lessonType activities",
      });
      const count = {
        lessons: 0,
        quizzes: 0,
        tests: 0,
        activities: 0,
      };
      for (let j of fullUnit.lessons) {
        switch (j.lessonType) {
          case "lesson":
            count.lessons = count.lessons + 1;
            count.activities = count.activities + j.activities.length;
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
        _id: i._id,
        unitName: i.unitName,
        unitNumber: i.unitNumber,
        count: count,
        achievedPoints: userUnit ? userUnit.completion : 0,
        totalPoints: calculateTotalPoints(count),
        attempted: !(userUnit === undefined),
      });
    }

    res.json({
      courseName: course.courseName,
      units: modifiedUnits,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const calculateTotalPoints = (count) => {
  let totalPoints =
    rewardData.quiz * count.quizzes +
    rewardData.test * count.tests +
    rewardData.lesson * count.lessons +
    rewardData.activity * count.activities;
  return totalPoints || 0;
};
