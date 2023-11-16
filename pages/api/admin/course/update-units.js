import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Course from "../../../../models/courseModel";
import Unit from "../../../../models/unitModel";

// TODO: investigate the ts error
import formidable from "formidable-serverless";

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * @desc    Update the section content of a activity
 * @route   PUT /api/admin/activity/update-sections
 * @access  Private - Admin
 */
export default async function (req, res) {
  try {
    if (req.method !== "PUT") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apikey);

    // Connect to database
    await connectDB();

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization);

    // Make sure user is a teacher
    checkUserType(user, 4);

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    const { courseId, newUnitsArray, unit1id, unit2id, unit1n, unit2n } =
      data.fields;

    if (!courseId) {
      throw new Error("Please send a courseId");
    }

    const courseExists = Course.findById(courseId);

    if (!courseExists) {
      throw new Error("Could not find the course to update");
    }

    if (!newUnitsArray) {
      throw new Error("Please send newUnitsArray");
    }

    await Unit.findByIdAndUpdate(unit1id, {
      unitNumber: unit2n,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    await Unit.findByIdAndUpdate(unit2id, {
      unitNumber: unit1n,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    await Course.findByIdAndUpdate(courseId, {
      units: newUnitsArray,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    const course = await Course.findById(courseId);

    res.status(200).json({ course });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
