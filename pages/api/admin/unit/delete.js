import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Unit from "../../../../models/unitModel";
import Course from "../../../../models/courseModel";
import { v2 as cloudinary } from "cloudinary";
import User from "../../../../models/userModel";

/**
 * @desc    Delete a unit and handle the appropriate image deletes from cloudinary. Won't handle for processing things like course tier (bronze, silver, gold, etc.)
 * @route   DELETE /api/admin/unit/update-sections
 * @access  Private - Admin
 * @param   {string} req.query.unitId - Id of unit you want to delete
 */
export default async function (req, res) {
  try {
    // TODO: Investigate why course select is broken
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

    const { unitId } = req.query;

    if (!unitId) {
      throw new Error("unitId is required");
    }

    const unit = await Unit.findById(unitId);

    if (!unit) {
      throw new Error("Unit not found");
    }

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    // Delete unit from courses and users
    await Course.findOneAndUpdate(
      { units: unitId }, //Find the course with the unitId to modify
      { $pull: { units: unitId } }
    );

    // Delete the unit
    await Unit.findByIdAndDelete(unitId);

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
