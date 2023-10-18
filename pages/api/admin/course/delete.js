import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Course from "../../../../models/courseModel";
import Subject from "../../../../models/subjectModel";
import { v2 as cloudinary } from "cloudinary";
import User from "../../../../models/userModel";

/**
 * @desc    Delete a course
 * @route   DELETE /api/admin/course/delete
 * @access  Private - Admin
 * @param   {string} req.query.unitId - Id of unit you want to delete
 */
export default async function (req, res) {
  try {
    // TODO: Investigate why course select is broken
    if (req.method !== "DELETE") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apikey)

    // Connect to database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a teacher
    checkUserType(user, 4);

    const { courseId } = req.query;
    console.log(courseId);

    if (!courseId) {
      throw new Error("courseId is required");
    }

    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    // Delete course from subjects and users
    await Subject.findOneAndUpdate(
      { courses: courseId }, //Find the course with the unitId to modify
      { $pull: { courses: courseId } }
    );

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
