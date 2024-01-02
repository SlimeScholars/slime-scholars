import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Lesson from "../../../../models/lessonModel";
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

    const {
      unitId,
      newLessonsArray,
      lesson1id,
      lesson2id,
      lesson1n,
      lesson2n,
    } = data.fields;

    if (!unitId) {
      throw new Error("Please send a unitId");
    }

    const unitExists = Unit.findById(unitId);

    if (!unitExists) {
      throw new Error("Could not find the unit to update");
    }

    if (!newLessonsArray) {
      throw new Error("Please send newLessonsArray");
    }

    await Lesson.findByIdAndUpdate(lesson1id, {
      lessonNumber: lesson2n,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    await Lesson.findByIdAndUpdate(lesson2id, {
      lessonNumber: lesson1n,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    await Unit.findByIdAndUpdate(unitId, {
      units: newLessonsArray,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    const unit = await Unit.findById(unitId);

    res.status(200).json({ unit });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
