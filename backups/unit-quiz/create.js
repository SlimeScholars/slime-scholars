import { authenticate } from "../../utils/authenticate";
import { checkUserType } from "../../utils/checkUserType";
import connectDB from "../../utils/connectDB";
import Unit from "../../models/unitModel";
import Lesson from "../../models/lessonModel";

/**
 * @desc    Create a course quiz
 * @route   POST /api/admin/quiz/create
 * @access  Private - Admin
 * @param   {string} req.body.courseId - Id of course you want to create a quiz under
 */
export default async function (req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method`);
    }

    // Connect to database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a teacher
    checkUserType(user, 4);

    const { unitId, quizNumber } = req.body;

    if (!unitId) {
      throw new Error("Missing unitId");
    }

    const unit = await Unit.findById(unitId);
    if (!unit) {
      throw new Error("Could not find unit");
    }

    const latestAuthor = `${user.firstName} ${user.lastName}`;

    const quiz = await Lesson.create({
      lessonNumber: quizNumber,
      latestAuthor,
    });

    unit.quizzes.push(quiz._id);

    await Unit.findByIdAndUpdate(unitId, {
      quizzes: unit.quizzes,
      latestAuthor,
    });

    const newUnit = await Unit.findById(unitId).populate("quizzes");

    res.status(201).json({ unit: newUnit });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
