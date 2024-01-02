import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Subject from "../../../../models/subjectModel";

import { v2 as cloudinary } from "cloudinary";
import User from "../../../../models/userModel";

/**
 * @desc    Delete a subject
 * @route   DELETE /api/admin/subject/delete
 * @access  Private - Admin
 * @param   {string} req.query.unitId - Id of unit you want to delete
 */
export default async function (req, res) {
  try {
    // TODO: Investigate why subject select is broken
    if (req.method !== "DELETE") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apikey);

    // Connect to database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a teacher
    checkUserType(user, 4);

    const { subjectId } = req.query;

    if (!subjectId) {
      throw new Error("subjectId is required");
    }

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      throw new Error("Subject not found");
    }

    // Delete the subject
    await Subject.findByIdAndDelete(subjectId);

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
