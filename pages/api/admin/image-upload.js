import { authenticate } from "../../../utils/authenticate";
import { verifyApiKey } from "../../../utils/verify";
import { checkUserType } from "../../../utils/checkUserType";
import connectDB from "../../../utils/connectDB";
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

    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ files });
        }
      });
    });

    const image = data.files['image'];

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    // Upload the file to Cloudinary
    await cloudinary.uploader.upload(image.path, (error, result) => {
      if (error) {
        throw new Error(`Error uploading file: ${error} `);
      } else {
        res.status(200).json({ url: result.secure_url });
      }
    })
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}

