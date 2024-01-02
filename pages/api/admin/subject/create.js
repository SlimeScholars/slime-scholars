import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Subject from "../../../../models/subjectModel";

/**
 * @desc    Create a subject
 * @route   POST /api/admin/course/create
 * @access  Private - Admin
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

    const subject = await Subject.create({
      latestAuthor: `${user.firstName} ${user.lastName}`,
    });
    // No need to populate because courses is empty

    res.status(201).json({ subject });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
