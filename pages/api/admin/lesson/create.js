import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Unit from "../../../../models/unitModel";
import Lesson from "../../../../models/lessonModel";

/**
 * @desc    Create a lesson
 * @route   POST /api/admin/lesson/create
 * @access  Private - Admin
 * @param   {string} req.body.unitId
 * @param   {number} req.body.lessonNumber
 */
export default async function (req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apikey);

    // Connect to database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a teacher
    checkUserType(user, 4);

    const { unitId, lessonType, lessonNumber } = req.body;

    if (!unitId) {
      throw new Error("Missing unitId");
    }
    if (["lesson", "quiz", "test"].indexOf(lessonType) == -1) {
      throw new Error("Invalid lesson type");
    }
    if (lessonNumber === undefined) {
      throw new Error("Missing lesson number");
    }

    const unit = await Unit.findById(unitId);
    if (!unit) {
      throw new Error("Could not find unit");
    }

    const latestAuthor = `${user.firstName} ${user.lastName}`;

    const lesson = await Lesson.create({
      lessonNumber,
      lessonType,
      latestAuthor,
      quizQuestions: [[]],
      totalPoints:0,
    });

    unit.lessons.push(lesson._id);

    await Unit.findByIdAndUpdate(unitId, {
      lessons: unit.lessons,
      latestAuthor,
    });

    const newUnit = await Unit.findById(unitId)
      .populate("lessons")
      .populate("quizzes")
      .populate("tests");

    res.status(201).json({ unit: newUnit });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
