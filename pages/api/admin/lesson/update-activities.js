import { authenticate } from "../../../../utils/authenticate";
import { verifyApiKey } from "../../../../utils/verify";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
import Lesson from "../../../../models/lessonModel";
import Activity from "../../../../models/activityModel";
import {
  processMarkdown,
  verifyNesting,
} from "../../../../utils/processMarkdown";
// TODO: investigate the ts error
import formidable from "formidable-serverless";
import { v2 as cloudinary } from "cloudinary";

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

    const { lessonId, newActivitiesArray, act1id, act2id, act1n, act2n } =
      data.fields;

    if (!lessonId) {
      throw new Error("Please send a lessonId");
    }

    const lessonExists = Lesson.findById(lessonId);

    if (!lessonExists) {
      throw new Error("Could not find the lesson to update");
    }

    if (!newActivitiesArray) {
      throw new Error("Please send newActivitiesArray");
    }

    await Activity.findByIdAndUpdate(act1id, {
      activityNumber: act2n,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    await Activity.findByIdAndUpdate(act2id, {
      activityNumber: act1n,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    await Lesson.findByIdAndUpdate(lessonId, {
      activities: newActivitiesArray,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    const lesson = await Lesson.findById(lessonId);

    res.status(200).json({ lesson });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
