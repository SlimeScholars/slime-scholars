import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import User from "../../../../models/userModel";
import Lesson from "../../../../models/lessonModel";
import { calculateStars, getQuizRewards } from "../../../../utils/stars";
import { areDifferentDays } from "../../../../utils/areDifferentDays";
import Unit from "../../../../models/unitModel";
import Course from "../../../../models/courseModel";
import { rewardData } from "../../../../data/lessonData";
import { mongoose } from "mongoose";

/**
 * @desc    Completion of lesson for rewards and exp
 * @route   POST /api/learn/lesson/complete
 * @access  Private - Students
 * @param   {string} req.body.lessonId - Id of lesson completed
 * @param   {string} req.body.score - Score achieved on the quiz section of the lesson - should be decimal between 0 and 1
 */
export default async function (req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    console.log(req.body, req.headers);
    verifyApiKey(req.headers.apikey);

    // Connect to database
    await connectDB();

    // Authenticate and get user with completed lessons, units, courses
    const user = await authenticate(req.headers.Authorization, {
      lessons: 1,
      units: 1,
      courses: 1,
    });

    // Make sure user is a student
    checkUserType(user, 1);

    let { courseId, unitId } = req.body;

    if (!lesson) {
      throw new Error("Could not find lesson");
    }

    let progressCopy = [...user.progress];
    for (let i = 0; i < progressCopy.length; i++) {
      if (progressCopy[i].courseId === courseId) {
        for (let j = 0; j < progressCopy[i].units.length; j++) {
          if (progressCopy[i].units[j].unitId === unitId) {
            res.json({ message: "Unit already present" });
          }
        }
        progressCopy[i].units.push({
          unitId: unitId,
          lessons: [],
          quizzes: [],
          tests: [],
          activities: [],
          completion: 0,
        });
        break;
      }
    }

    await User.findByIdAndUpdate(user._id, {
      progress: progressCopy,
    });

    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
