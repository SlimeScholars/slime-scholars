import { authenticate } from "../../../utils/authenticate";
import { verifyApiKey } from "../../../utils/verify";
import { checkUserType } from "../../../utils/checkUserType";
import connectDB from "../../../utils/connectDB";
import Course from "../../../models/courseModel";
import Unit from "../../../models/unitModel";
import Lesson from "../../../models/lessonModel";
import { rewardData } from "../../../data/lessonData";

/**
 * @desc    Get courses for course selection
 * @route   GET /api/learn/courses
 * @access  Private - Students
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

    const courses = await Course.find({})
      .select("_id courseName units")
      .populate({
        path: "units",
        select: "_id unitName unitNumber lessons quizzes tests",
        populate: {
          path: "lessons",
          select: "_id lessonName lessonType activities",
        },
      });

    const modifiedCourses = [];
    // Check user for completed

    for (let i in courses) {
      const courseProgress = user.progress.find((course) => {
        return course.courseId === courses[i]._id.valueOf();
      });
      modifiedCourses.push({
        _id: courses[i]._id,
        courseName: courses[i].courseName,
        units: courses[i].units,
        achievedPoints: courseProgress ? courseProgress.completion : 0,
        totalPoints: calculateTotalPoints(courses[i].units),
        completed: false,
      });
    }

    res.json({ courses: modifiedCourses });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const calculateTotalPoints = (units) => {
  let totalPoints = 0;
  for (let i in units) {
    for (let lesson of units[i].lessons) {
      switch (lesson.lessonType) {
        case "lesson":
          totalPoints += rewardData.activity * lesson.activities.length;
          totalPoints += rewardData.lesson;
          break;
        case "quiz":
          totalPoints += rewardData.quiz;
          break;
        case "test":
          totalPoints += rewardData.test;
          break;
        default:
          break;
      }
    }
    if (units[i].quizzes) {
      totalPoints += rewardData.quiz * units[i].quizzes.length;
    }
  }
  return totalPoints;
};
