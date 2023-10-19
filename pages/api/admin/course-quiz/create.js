import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Course from "../../../../models/courseModel";
import Lesson from "../../../../models/lessonModel";

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
    verifyApiKey(req.headers.apikey)

    // Connect to database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a teacher
    checkUserType(user, 4);

    const { courseId, quizNumber } = req.body;
    console.log(courseId, quizNumber);

    if (!courseId) {
      throw new Error("Missing courseId");
    }

    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Could not find course");
    }

    const latestAuthor = `${user.firstName} ${user.lastName}`;

    const quiz = await Lesson.create({
      lessonNumber: quizNumber,
      latestAuthor,
    });

    course.quizzes.push(quiz._id);

    await Course.findByIdAndUpdate(courseId, {
      lessonType: "quiz",
      quizzes: course.quizzes,
      latestAuthor,
    });

    const newCourse = await Course.findById(courseId)
      .populate("quizzes")
      .populate({
        path: "units",
        model: "Unit",
        populate: [
          {
            path: "lessons",
            model: "Lesson",
            populate: {
              path: "activities",
              model: "Activity",
            },
          },
          {
            path: "quizzes",
            model: "Lesson",
          },
        ],
      });

    console.log(newCourse);

    res.status(201).json({ course: newCourse });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
