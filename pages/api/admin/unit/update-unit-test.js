import { authenticate } from "../../../../utils/authenticate"
import { verifyApiKey } from "../../../../utils/verify"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import Unit from "../../../../models/unitModel"
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
 * @param   {string} req.body.quizQuestions - Quiz sections you want to update lesson to 
 * @param   {string} req.body.imageLength - Number of images being uploaded
 */
export default async function (req, res) {
	try {
		if (req.method !== 'PUT') {
			throw new Error(`${req.method} is an invalid request method`)
		}
		verifyApiKey(req.headers.apikey)

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

		const { unitId, quizQuestions, imageLength } = JSON.parse(data.fields.data)

		if (!quizQuestions) {
			throw new Error('Please send quizQuestions')
		}
		if (imageLength === undefined) {
			throw new Error('Please send imageLength')
		}

		// Make sure there are more than 4 questions on the quiz
		if (quizQuestions.length < 10) {
			throw new Error(`There must be more than 10 questions. There are currently ${quizQuestions.length}.`)
		}

		if (!unitId) {
			throw new Error('Please send a unitId')
		}

		const unitExists = Unit.findById(unitId)

		if (!unitExists) {
			throw new Error('Could not find the lesson to update')
		}

		// Make sure every quiz question has a question in it
		for (let i in quizQuestions) {
			let flag = true
			for (let j in quizQuestions[i]) {
				if (quizQuestions[i][j].sectionType === 2 || quizQuestions[i][j].sectionType === 3) {
					if (!flag) {
						throw new Error(`Every quiz question can only have one question in it. Question ${parseInt(i) + 1} does not.`)
					}
					flag = false
				}
			}
			if (flag) {
				throw new Error(`Every quiz question must have a question in it. Question ${parseInt(i) + 1} does not.`)
			}
		}

		for (let i in quizQuestions) {
			const quizSectionsOverlap = {}
			for (let j in quizQuestions[i]) {
				if (quizQuestions[i][j].sectionType === 2 || quizQuestions[i][j].sectionType === 3) {
					if (quizSectionsOverlap[quizQuestions[i][j].sectionNumber]) {
						throw new Error(`There can only one question per section number.On quiz question number ${parseInt(i) + 1}, section ${quizQuestions[i][j].sectionNumber} there is an overlap.`)
					}
					quizSectionsOverlap[quizQuestions[i][j].sectionNumber] = true
				}
			}
		}

		const imageFiles = []
		for (let i = 0; i < imageLength; i++) {
			if (data.files && data.files[`image${i} `]) {
				imageFiles.push(data.files[`image${i} `])
			}
		}

		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.CLOUDINARY_KEY,
			api_secret: process.env.CLOUDINARY_SECRET,
		})

		const uploadedImages = []

		for (const image of imageFiles) {
			// Upload the file to Cloudinary
			await cloudinary.uploader.upload(image.path, (error, result) => {
				if (error) {
					throw new Error(`Error uploading file: ${error} `);
				} else {
					uploadedImages.push(result.secure_url)
				}
			});
		}

		for (let i in quizQuestions) {
			for (let j in quizQuestions[i]) {
				if (quizQuestions[i][j].sectionType === 1 &&
					typeof quizQuestions[i][j].image !== 'string') {
					quizQuestions[i][j].image = uploadedImages[quizQuestions[i][j].image]
				}
			}
		}

		const processedQuizQuestions = []
		for (const quizSections of quizQuestions) {
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
					processedQuizSection.explanation = quizSection.explanation
				}
				//fill in the blank
				else if (quizSection.sectionType === 3) {
					processedQuizSection.text = quizSection.text
					processedQuizSection.afterBlank = quizSection.afterBlank
					const rawBlank = quizSection.blank.split(',')
					processedQuizSection.blank = rawBlank.map((str) => str.trim())
					processedQuizSection.explanation = quizSection.explanation
				}

				processedQuizSections.push(processedQuizSection)
			}
			processedQuizQuestions.push(processedQuizSections)
		}

		await Unit.findByIdAndUpdate(unitId, {
			quizQuestions: processedQuizQuestions,
			latestAuthor: `${user.firstName} ${user.lastName} `,
		})

		const unit = await Unit.findById(unitId)

		res.status(200).json({ unit })

	} catch (error) {
		console.log(error.message)
		res.status(400).json({ message: error.message })
	}
}

