import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import Lesson from "../../../../models/lessonModel"
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
 * @desc    Update the section content of a lesson
 * @route   PUT /api/admin/lesson/update-sections
 * @access  Private - Admin
 * @param   {string} req.body.lessonId - Id of lesson you want to update
 * @param   {string} req.body.sections - Sections you want to update lesson to 
 * @param   {string} req.body.quizSections - Quiz sections you want to update lesson to 
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

    const { lessonId, sections, quizSections, imageLength } = JSON.parse(data.fields.data)

    // Make sure there are only 4 questions on the quiz
    let maxScore = 0
    for (let i in quizSections) {
      if (quizSections[i].sectionType === 2 || quizSections[i].sectionType === 3) {
        maxScore++
      }
    }
    if (maxScore !== 4) {
      throw new Error(`There must be exactly 4 quiz questions. There are currently ${maxScore}.`)
    }

    // Make sure there is only one question max section number
    const sectionsOverlap = {}
    for (let i in sections) {
      if (sections.sectionType === 2 || sections.sectionType === 3) {
        if (sectionsOverlap[sections[i].sectionNumber]) {
          throw new Error(`There can only one question max per section number. On lesson section number ${sections[i].sectionNumber} there is an overlap.`)
        }
        sectionsOverlap[sections[i].sectionNumber] = true
      }
    }
    const quizSectionsOverlap = {}
    for (let i in quizSections) {
      if (quizSections.sectionType === 2 || quizSections.sectionType === 3) {
        if (quizSectionsOverlap[quizSections[i].sectionNumber]) {
          throw new Error(`There can only one question per section number. On quiz section number ${quizSections[i].sectionNumber} there is an overlap.`)
        }
        quizSectionsOverlap[quizSections[i].sectionNumber] = true
      }
    }

    const imageFiles = []
    for (let i = 0; i < imageLength; i++) {
      if (data.files && data.files[`image${i}`]) {
        imageFiles.push(data.files[`image${i}`])
      }
    }

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    })

    const uploadedImages = []

    for (const image of imageFiles) {
      // Upload the file to Cloudinary
      await cloudinary.uploader.upload(image.path, (error, result) => {
        if (error) {
          console.log(error)
          throw new Error(`Error uploading file: ${error}`);
        } else {
          uploadedImages.push(result.secure_url)
        }
      });
    }

    for (let i in sections) {
      if (sections[i].sectionType === 1 &&
        typeof sections[i].image !== 'string') {
        sections[i].image = uploadedImages[sections[i].image]
      }
    }
    for (let i in quizSections) {
      if (quizSections[i].sectionType === 1 &&
        typeof quizSections[i].image !== 'string') {
        quizSections[i].image = uploadedImages[quizSections[i].image]
      }
    }

    if (!lessonId) {
      throw new Error('Please send a lessonId')
    }

    const lessonExists = Lesson.findById(lessonId)

    if (!lessonExists) {
      throw new Error('Could not find the lesson to update')
    }

    const processedSections = []
    for (let section of sections) {
      if (!Number.isInteger(section.sectionNumber) || section.sectionNumber < 0) {
        throw new Error('Section numbers must all be positive integers (you may have left a section number blank).')
      }

      const processedSection = {
        index: section.index,
        sectionType: section.sectionType,
        sectionNumber: section.sectionNumber,
      }

      //text
      if (section.sectionType === 0) {
        const processedText = processMarkdown(section.text)
        if (!verifyNesting(processedText)) {
          throw new Error('Must close styles in correct order. eg. *b* bold *b* is correct, *b* bold *i* *b* *i* is not.')
        }
        processedSection.text = processedText
      }
      //img
      else if (section.sectionType === 1) {
        processedSection.image = section.image
      }
      //multiple choice
      else if (section.sectionType === 2) {
        processedSection.options = section.options
      }
      //fill in the blank
      else if (section.sectionType === 3) {
        processedSection.text = section.text
        processedSection.afterBlank = section.afterBlank
        const rawBlank = section.blank.split(',')
        processedSection.blank = rawBlank.map((str) => str.trim())
      }

      processedSections.push(processedSection)
    }

    const processedQuizSections = []
    for (let quizSection of quizSections) {
      if (!Number.isInteger(quizSection.sectionNumber) || quizSection.sectionNumber < 0) {
        throw new Error('Section numbers must all be positive integers (you may have left a section number blank).')
      }

      const processedQuizSection = {
        index: quizSection.index,
        sectionType: quizSection.sectionType,
        sectionNumber: quizSection.sectionNumber,
      }

      //text
      if (quizSection.sectionType === 0) {
        const processedText = processMarkdown(quizSection.text)
        if (!verifyNesting(processedText)) {
          throw new Error('Must close styles in correct order. eg. *b* bold *b* is correct, *b* bold *i* *b* *i* is not.')
        }
        processedQuizSection.text = processedText
      }
      //img
      else if (quizSection.sectionType === 1) {
        processedQuizSection.image = quizSection.image
      }
      //multiple choice
      else if (quizSection.sectionType === 2) {
        processedQuizSection.options = quizSection.options
      }
      //fill in the blank
      else if (quizSection.sectionType === 3) {
        processedQuizSection.text = quizSection.text
        processedQuizSection.afterBlank = quizSection.afterBlank
        const rawBlank = quizSection.blank.split(',')
        processedQuizSection.blank = rawBlank.map((str) => str.trim())
      }

      processedQuizSections.push(processedQuizSection)
    }

    await Lesson.findByIdAndUpdate(lessonId, {
      sections: processedSections,
      quizSections: processedQuizSections,
      latestAuthor: `${user.firstName} ${user.lastName}`,
    })

    const lesson = await Lesson.findById(lessonId)

    res.status(200).json({ lesson })

  } catch (error) {
    console.log(error.message)
    res.status(400).json({ message: error.message })
  }
}
