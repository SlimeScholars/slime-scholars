import { authenticate } from "../../../../utils/authenticate"
import { verifyApiKey } from "../../../../utils/verify"
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
 */

export default async function (req, res) {
  try {
    if (req.method !== "PUT") {
      throw new Error(`${req.method} is an invalid request method`);
    }
    verifyApiKey(req.headers.apikey)

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
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
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

    const { lessonId, problemSet, pageIndex, imageLength } = data.fields;

    //if no page index is specified... do nothing to the problemSet, only refresh by the array
    if (pageIndex === -1) {
      await Lesson.findByIdAndUpdate(lessonId, {
        problemSet: problemSet,
        latestAuthor: `${user.firstName} ${user.lastName} `,
      });

      const lesson = await Lesson.findById(lessonId);

      res.status(200).json({ lesson });
      return;
    }

    if (!lessonId) {
      throw new Error("Please send a lessonId");
    }

    const lessonExists = Lesson.findById(lessonId);

    if (!lessonExists) {
      throw new Error("Could not find the lesson to update");
    }

    if (!problemSet) {
      throw new Error("Please send problemSet");
    }
    if (imageLength === undefined) {
      throw new Error("Please send imageLength");
    }

    for (let i in problemSet) {
      if (Number(i) + 1 != problemSet[i].pageNumber) {
        throw new Error("Page numbers must be sequential");
      }
    }

    if (!problemSet[pageIndex]?.sections) {
      throw new Error(`Please send sections ${pageIndex}`);
    }

    const sections = problemSet[pageIndex].sections;
    const newPages = [...problemSet];
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

    await Lesson.findByIdAndUpdate(lessonId, {
      problemSet: submitPages,
      latestAuthor: `${user.firstName} ${user.lastName} `,
    });

    const lesson = await Lesson.findById(lessonId);

    res.status(200).json({ lesson });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}

// export default async function (req, res) {
//   try {
//     if (req.method !== 'PUT') {
//       throw new Error(`${req.method} is an invalid request method`)
//     }
//     verifyApiKey(req.headers.apikey)

//     // Connect to database
//     await connectDB()

//     // Authenticate and get user
//     const user = await authenticate(req.headers.authorization)

//     // Make sure user is a teacher
//     checkUserType(user, 4)

//     const form = new formidable.IncomingForm();
//     form.keepExtensions = true
//     const data = await new Promise((resolve, reject) => {
//       form.parse(req, (err, fields, files) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve({ fields, files });
//         }
//       });
//     });

//     const { lessonId, sections, quizQuestions, imageLength } = JSON.parse(data.fields.data)

//     if (!sections) {
//       throw new Error('Please send sections')
//     }
//     if (!quizQuestions) {
//       throw new Error('Please send quizQuestions')
//     }
//     if (imageLength === undefined) {
//       throw new Error('Please send imageLength')
//     }

//     // Make sure there are more than 4 questions on the quiz
//     if (quizQuestions.length < 4) {
//       throw new Error(`There must be more than 4 quiz questions. There are currently ${quizQuestions.length}.`)
//     }

//     // Make sure every quiz question has a question in it
//     for (let i in quizQuestions) {
//       let flag = true
//       for (let j in quizQuestions[i]) {
//         if (quizQuestions[i][j].sectionType === 2 || quizQuestions[i][j].sectionType === 3) {
//           if (!flag) {
//             throw new Error(`Every quiz question can only have one question in it. Question ${parseInt(i) + 1} does not.`)
//           }
//           flag = false
//         }
//       }
//       if (flag) {
//         throw new Error(`Every quiz question must have a question in it. Question ${parseInt(i) + 1} does not.`)
//       }
//     }

//     // Make sure there is only one question max section number
//     const sectionsOverlap = {}
//     for (let i in sections) {
//       if (sections.sectionType === 2 || sections.sectionType === 3) {
//         if (sectionsOverlap[sections[i].sectionNumber]) {
//           throw new Error(`There can only one question max per section number.On lesson section number ${sections[i].sectionNumber} there is an overlap.`)
//         }
//         sectionsOverlap[sections[i].sectionNumber] = true
//       }
//     }

//     for (let i in quizQuestions) {
//       const quizSectionsOverlap = {}
//       for (let j in quizQuestions[i]) {
//         if (quizQuestions[i][j].sectionType === 2 || quizQuestions[i][j].sectionType === 3) {
//           if (quizSectionsOverlap[quizQuestions[i][j].sectionNumber]) {
//             throw new Error(`There can only one question per section number.On quiz question number ${parseInt(i) + 1}, section ${quizQuestions[i][j].sectionNumber} there is an overlap.`)
//           }
//           quizSectionsOverlap[quizQuestions[i][j].sectionNumber] = true
//         }
//       }
//     }

//     const imageFiles = []
//     for (let i = 0; i < imageLength; i++) {
//       if (data.files && data.files[`image${i} `]) {
//         imageFiles.push(data.files[`image${i} `])
//       }
//     }

//     cloudinary.config({
//       cloud_name: process.env.CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_KEY,
//       api_secret: process.env.CLOUDINARY_SECRET,
//     })

//     const uploadedImages = []

//     for (const image of imageFiles) {
//       // Upload the file to Cloudinary
//       await cloudinary.uploader.upload(image.path, (error, result) => {
//         if (error) {
//           throw new Error(`Error uploading file: ${error} `);
//         } else {
//           uploadedImages.push(result.secure_url)
//         }
//       });
//     }

//     for (let i in sections) {
//       if (sections[i].sectionType === 1 &&
//         typeof sections[i].image !== 'string') {
//         sections[i].image = uploadedImages[sections[i].image]
//       }
//     }

//     for (let i in quizQuestions) {
//       for (let j in quizQuestions[i]) {
//         if (quizQuestions[i][j].sectionType === 1 &&
//           typeof quizQuestions[i][j].image !== 'string') {
//           quizQuestions[i][j].image = uploadedImages[quizQuestions[i][j].image]
//         }
//       }
//     }

//     if (!lessonId) {
//       throw new Error('Please send a lessonId')
//     }

//     const lessonExists = Lesson.findById(lessonId)

//     if (!lessonExists) {
//       throw new Error('Could not find the lesson to update')
//     }

//     const processedSections = []
//     for (let section of sections) {
//       if (!Number.isInteger(section.sectionNumber) || section.sectionNumber < 0) {
//         throw new Error('Section numbers must all be positive integers (you may have left a section number blank).')
//       }

//       const processedSection = {
//         index: section.index,
//         sectionType: section.sectionType,
//         sectionNumber: section.sectionNumber,
//       }

//       //text
//       if (section.sectionType === 0) {
//         const processedText = processMarkdown(section.text)
//         if (!verifyNesting(processedText)) {
//           throw new Error('Must close styles in correct order. eg. *b* bold *b* is correct, *b* bold *i* *b* *i* is not.')
//         }
//         processedSection.text = processedText
//       }
//       //img
//       else if (section.sectionType === 1) {
//         processedSection.image = section.image
//       }
//       //multiple choice
//       else if (section.sectionType === 2) {
//         processedSection.options = section.options
//         processedSection.explanation = section.explanation
//       }
//       //fill in the blank
//       else if (section.sectionType === 3) {
//         processedSection.text = section.text
//         processedSection.afterBlank = section.afterBlank
//         const rawBlank = section.blank.split(',')
//         processedSection.blank = rawBlank.map((str) => str.trim())
//         processedSection.explanation = section.explanation
//       }

//       processedSections.push(processedSection)
//     }

//     const processedQuizQuestions = []
//     for (const quizSections of quizQuestions) {
//       const processedQuizSections = []
//       for (let quizSection of quizSections) {
//         if (!Number.isInteger(quizSection.sectionNumber) || quizSection.sectionNumber < 0) {
//           throw new Error('Section numbers must all be positive integers (you may have left a section number blank).')
//         }

//         const processedQuizSection = {
//           index: quizSection.index,
//           sectionType: quizSection.sectionType,
//           sectionNumber: quizSection.sectionNumber,
//         }

//         //text
//         if (quizSection.sectionType === 0) {
//           const processedText = processMarkdown(quizSection.text)
//           if (!verifyNesting(processedText)) {
//             throw new Error('Must close styles in correct order. eg. *b* bold *b* is correct, *b* bold *i* *b* *i* is not.')
//           }
//           processedQuizSection.text = processedText
//         }
//         //img
//         else if (quizSection.sectionType === 1) {
//           processedQuizSection.image = quizSection.image
//         }
//         //multiple choice
//         else if (quizSection.sectionType === 2) {
//           processedQuizSection.options = quizSection.options
//           processedQuizSection.explanation = quizSection.explanation
//         }
//         //fill in the blank
//         else if (quizSection.sectionType === 3) {
//           processedQuizSection.text = quizSection.text
//           processedQuizSection.afterBlank = quizSection.afterBlank
//           const rawBlank = quizSection.blank.split(',')
//           processedQuizSection.blank = rawBlank.map((str) => str.trim())
//           processedQuizSection.explanation = quizSection.explanation
//         }

//         processedQuizSections.push(processedQuizSection)
//       }
//       processedQuizQuestions.push(processedQuizSections)
//     }

//     await Lesson.findByIdAndUpdate(lessonId, {
//       sections: processedSections,
//       quizQuestions: processedQuizQuestions,
//       latestAuthor: `${user.firstName} ${user.lastName} `,
//     })

//     const lesson = await Lesson.findById(lessonId)

//     res.status(200).json({ lesson })

//   } catch (error) {
//     console.log(error.message)
//     res.status(400).json({ message: error.message })
//   }
// }
