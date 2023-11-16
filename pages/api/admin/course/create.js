import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Course from "../../../../models/courseModel";
import Subject from "../../../../models/subjectModel";
/**
 * @desc    Create a course
 * @route   POST /api/admin/course/create
 * @access  Private - Admin
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

    const { subjectId, courseNumber } = req.body;

    if (!subjectId) {
      throw new Error("Missing subjectId");
    }
    if (courseNumber === undefined) {
      throw new Error("Missing course number");
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      throw new Error("Could not find subject");
    }

    const latestAuthor = `${user.firstName} ${user.lastName}`;

    const course = await Course.create({
      courseNumber,
      latestAuthor,
      //totalPoints: 100,
    });

    subject.courses.push(course._id);

    await Subject.findByIdAndUpdate(subjectId, {
      courses: subject.courses,
      latestAuthor,
    });

    const newSubject = await Subject.findById(subjectId).populate("courses");

    res.status(201).json({ newSubject });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
