import { authenticate } from "../../../../utils/authenticate";
import { checkUserType } from "../../../../utils/checkUserType";
import connectDB from "../../../../utils/connectDB";
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

    const imageFiles = [];
    for (let i = 0; i < data.fields.imageLength; i++) {
      if (data.files && data.files[`image${i} `]) {
        imageFiles.push(data.files[`image${i} `]);
      }
    }

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const uploadedImages = [];

    for (const image of imageFiles) {
      // Upload the file to Cloudinary
      await cloudinary.uploader.upload(image.path, (error, result) => {
        if (error) {
          throw new Error(`Error uploading file: ${error} `);
        } else {
          uploadedImages.push(result.secure_url);
        }
      });
    }

    const { activityId, pages, pageIndex, imageLength } = data.fields;

    //if no page index is specified... do nothing to the pages, only refresh by the array
    if (pageIndex === -1) {
      await Activity.findByIdAndUpdate(activityId, {
        pages: pages,
        latestAuthor: `${user.firstName} ${user.lastName} `,
      });

      const activity = await Activity.findById(activityId);

      res.status(200).json({ activity });
      return;
    }

    if (!activityId) {
      throw new Error("Please send a activityId");
    }

    const activityExists = Activity.findById(activityId);

    if (!activityExists) {
      throw new Error("Could not find the activity to update");
    }

    if (!pages) {
      throw new Error("Please send pages");
    }
    if (imageLength === undefined) {
      throw new Error("Please send imageLength");
    }

    for (let i in pages) {
      if (Number(i) + 1 != pages[i].pageNumber) {
        throw new Error("Page numbers must be sequential");
      }
    }

    if (!pages[pageIndex]?.sections) {
      throw new Error(`Please send sections ${pageIndex}`);
    }

    const sections = pages[pageIndex].sections;
    const newPages = [...pages];
    const processedSections = [];

    for (let i in sections) {
      if (Number(i) + 1 !== sections[i].sectionIndex) {
        throw new Error("Section numbers must be sequential");
      }

      const section = { ...sections[i] };
      const processedElements = [];

      for (let j in section.elements) {
        const element = { ...section.elements[j] };
        if (
          !Number.isInteger(element.elementType) ||
          element.sectionNumber < 0 ||
          element.elementType > 3
        ) {
          throw new Error("Element type is invalid");
        }

        const processedElement = {
          index: element.index,
          elementType: element.elementType,
        };
        console.log(processedElement);
        // text
        if (element.elementType === 0) {
          const processedText = processMarkdown(element.text);
          if (!verifyNesting(processedText)) {
            throw new Error(
              "Must close styles in correct order. eg. *b* bold *b* is correct, *b* bold *i* *b* *i* is not."
            );
          }
          processedElement.text = processedText;
        }
        //img
        else if (element.elementType === 1) {
          processedElement.image = element.image;
          // check if image has size, border, and rounded properties
          if ((element.size === 0 || element.size) && (element.rounded === 0 || element.rounded)) {
            processedElement.size = element.size;
            processedElement.border = element.border ? element.border : false;
            processedElement.rounded = element.rounded;
          } else {
            throw new Error(
              "Image must have a size, border, and rounded styling"
            );
          }
        }
        //multiple choice
        else if (element.elementType === 2) {
          processedElement.text = element.text
          processedElement.options = element.options;
          processedElement.explanation = element.explanation;
        }
        //fill in the blank
        else if (element.elementType === 3) {
          processedElement.text = element.text;
          processedElement.afterBlank = element.afterBlank;
          processedElement.blank = element.blank.map((str) => str.trim());
          processedElement.explanation = element.explanation;
        }
        // put all the elements in a section
        processedElements.push(processedElement);
      }
      // put all sections into a page
      const newSection = { ...section, elements: [...processedElements] };
      processedSections.push(newSection);
    }
    const submitPages = newPages.map((page, num) => {
      if (num === pageIndex) {
        return { ...page, sections: [...processedSections] };
      }
      return page;
    });

    await Activity.findByIdAndUpdate(activityId, {
      pages: submitPages,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    const activity = await Activity.findById(activityId);

    res.status(200).json({ activity });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}
