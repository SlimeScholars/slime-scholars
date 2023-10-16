import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Lesson from "../../../../models/lessonModel";
// Import lesson for populate
import "../../../../models/lessonModel";

/**
 * @desc    Update a course quiz
 * @route   PUT /api/admin/course-quiz/update-name
 * @access  Private - Admin
 * @param   {string} req.body.courseQuizId - Id of the unit you want to update the name of
 * @param   {string} req.body.courseQuizName - The name you want to update the unit's name to
 */
export default async function (req, res) {
  try {
    if (req.method !== "PUT") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apiKey)

    // Connect to database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a teacher
    checkUserType(user, 4);

    const { courseQuizId, courseQuizName } = req.body;

    if (!courseQuizId) {
      throw new Error("Please send a courseQuizId");
    }

    const courseQuizExists = Lesson.findById(courseQuizId);

    if (!courseQuizExists) {
      throw new Error("Could not find the lesson/courseQuiz to update");
    }

    await Lesson.findByIdAndUpdate(courseQuizId, {
      lessonName: courseQuizName,
      latestAuthor: `${user.firstName} ${user.lastName}`,
    });

    const courseQuiz = await Lesson.findById(courseQuizId);

    res.status(200).json({ courseQuiz });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
