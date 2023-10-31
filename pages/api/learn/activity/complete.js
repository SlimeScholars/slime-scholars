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
    res.status(200).json({ message: "Lesson completed" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
