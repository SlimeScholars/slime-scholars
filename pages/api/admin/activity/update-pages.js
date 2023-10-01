import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import Activity from "../../../../models/activityModel"
import { processMarkdown, verifyNesting } from "../../../../utils/processMarkdown"
// TODO: investigate the ts error
import formidable from 'formidable-serverless';
import { v2 as cloudinary } from 'cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * @desc    Update the section content of a activity
 * @route   PUT /api/admin/activity/update-sections
 * @access  Private - Admin
 * @param   {string} req.body.activityId - Id of activity you want to update
 * @param   {string} req.body.sections - Sections you want to update activity to 
 * @param   {string} req.body.imageLength - Number of images being uploaded
 */
export default async function (req, res) {
  try {
    if (req.method !== 'PUT') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 4)

    const form = new formidable.IncomingForm();
    form.keepExtensions = true
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    const { activityId, pages, pageIndex, imageLength } = JSON.parse(data.fields.data)

    if (!pages) {
      throw new Error('Please send sections')
    }
    if (imageLength === undefined) {
      throw new Error('Please send imageLength')
    }

    for (let i in pages) {
      if (i + 1 !== pages[i].pageNumber) {
        throw new Error('Page numbers must be sequential')
      }
    }

    if (!pages[pageIndex]?.sections) {
      throw new Error('Please send sections')
    }
    const sections = pages[pageIndex].sections

    for (let i in sections) {
      if (i !== sections[i].sectionIndex) {
        throw new Error('Section numbers must be sequential')
      }

      const section = { ...sections[i] }

      const processedElements = []
      for (let j in section.elements) {
        const element = { ...section.elements[j] }
        if (!Number.isInteger(element.elementType) || element.sectionNumber < 0 || element.elementType > 3) {
          throw new Error('Element type is invalid')
        }

        const processedElement = {
          index: element.index,
          elementType: element.elementType,
        }

        // text
        if (element.elementType === 0) {
          const processedText = processMarkdown(element.text)
          if (!verifyNesting(processedText)) {
            throw new Error('Must close styles in correct order. eg. *b* bold *b* is correct, *b* bold *i* *b* *i* is not.')
          }
          processedElement.text = processedText
        }
      }

      // Make sure there is only one question max section number
      // const sectionsOverlap = {}
      // for (let i in sections) {
      //   if (sections.sectionType === 2 || sections.sectionType === 3) {
      //     if (sectionsOverlap[sections[i].sectionNumber]) {
      //       throw new Error(`There can only one question max per section number.On activity section number ${sections[i].sectionNumber} there is an overlap.`)
      //     }
      //     sectionsOverlap[sections[i].sectionNumber] = true
      //   }
      // }

      // const imageFiles = []
      // for (let i = 0; i < imageLength; i++) {
      //   if (data.files && data.files[`image${i} `]) {
      //     imageFiles.push(data.files[`image${i} `])
      //   }
      // }

      // cloudinary.config({
      //   cloud_name: process.env.CLOUD_NAME,
      //   api_key: process.env.API_KEY,
      //   api_secret: process.env.API_SECRET,
      // })

      // const uploadedImages = []

      // for (const image of imageFiles) {
      //   // Upload the file to Cloudinary
      //   await cloudinary.uploader.upload(image.path, (error, result) => {
      //     if (error) {
      //       throw new Error(`Error uploading file: ${error} `);
      //     } else {
      //       uploadedImages.push(result.secure_url)
      //     }
      //   });
      // }

      // for (let i in sections) {
      //   if (sections[i].sectionType === 1 &&
      //     typeof sections[i].image !== 'string') {
      //     sections[i].image = uploadedImages[sections[i].image]
      //   }
      // }

      // if (!activityId) {
      //   throw new Error('Please send a activityId')
      // }

      // const activityExists = Activity.findById(activityId)

      // if (!activityExists) {
      //   throw new Error('Could not find the activity to update')
      // }

      // const processedSections = []
      // for (let section of sections) {
      //   if (!Number.isInteger(section.sectionNumber) || section.sectionNumber < 0) {
      //     throw new Error('Section numbers must all be positive integers (you may have left a section number blank).')
      //   }

      //   const processedSection = {
      //     index: section.index,
      //     sectionType: section.sectionType,
      //     sectionNumber: section.sectionNumber,
      //   }

      //   //text
      //   if (section.sectionType === 0) {
      //     const processedText = processMarkdown(section.text)
      //     if (!verifyNesting(processedText)) {
      //       throw new Error('Must close styles in correct order. eg. *b* bold *b* is correct, *b* bold *i* *b* *i* is not.')
      //     }
      //     processedSection.text = processedText
      //   }
      //   //img
      //   else if (section.sectionType === 1) {
      //     processedSection.image = section.image
      //   }
      //   //multiple choice
      //   else if (section.sectionType === 2) {
      //     processedSection.options = section.options
      //     processedSection.explanation = section.explanation
      //   }
      //   //fill in the blank
      //   else if (section.sectionType === 3) {
      //     processedSection.text = section.text
      //     processedSection.afterBlank = section.afterBlank
      //     const rawBlank = section.blank.split(',')
      //     processedSection.blank = rawBlank.map((str) => str.trim())
      //     processedSection.explanation = section.explanation
      //   }

      //   processedSections.push(processedSection)
      // }


      // await Activity.findByIdAndUpdate(activityId, {
      //   sections: processedSections,
      //   latestAuthor: `${user.firstName} ${user.lastName} `,
      // })

      // const activity = await Activity.findById(activityId)

      // res.status(200).json({ activity })

    } catch (error) {
      console.log(error.message)
      res.status(400).json({ message: error.message })
    }
  }
