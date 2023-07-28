import { authenticate } from "../../../../utils/authenticate"
import { checkUserType } from '../../../../utils/checkUserType'
import connectDB from '../../../../utils/connectDB'
import Lesson from "../../../../models/lessonModel"

/**
 * @desc    Update the section content of a lesson
 * @route   PUT /api/admin/lesson/update-sections
 * @access  Private - Admin
 * @param   {string} req.body.lessonId - Id of lesson you want to update
 * @param   {string} req.body.sections - Sections you want to update lesson to 
 */
export default async function (req, res) {
  try {
    if(req.method !== 'PUT') {
      throw new Error(`${req.method} is an invalid request method`)
    }

    // Connect to database
    await connectDB()

    // Authenticate and get user
    const user = await authenticate(req.headers.authorization)

    // Make sure user is a teacher
    checkUserType(user, 4)

    const { lessonId, sections } = req.body

    if(!lessonId) {
      throw new Error('Please send a lessonId')
    }

    const lessonExists = Lesson.findById(lessonId)

    if(!lessonExists) {
      throw new Error('Could not find the lesson to update')
    }

    const processedSections = []
    for(let section of sections) {
      if(!Number.isInteger(section.sectionNumber) || section.sectionNumber < 0) {
        throw new Error('Section numbers must all be positive integers (you may have left a section number blank).')
      }

      const processedSection = {
        index: section.index,
        sectionType: section.sectionType,
        sectionNumber: section.sectionNumber,
      }

      //text
      if(section.sectionType === 0) {
        processedSection.text = section.text
      }
      //img
      else if(section.sectionType === 1) {
        // TODO: handle imgs
      }
      //multiple choice
      else if(section.sectionType === 2) {
        processedSection.options = section.options
      }
      //fill in the blank
      else if(section.sectionType === 3) {
        processedSection.text = section.text
        processedSection.afterBlank = section.afterBlank
        const rawBlank = section.blank.split(',')
        processedSection.blank = rawBlank.map((str) => str.trim())
      }
      processedSections.push(processedSection)
    }

    await Lesson.findByIdAndUpdate(lessonId, {
      sections: processedSections,
      latestAuthor: `${user.firstName} ${user.lastName}`,
    })

    const lesson = await Lesson.findById(lessonId)

    res.status(200).json({lesson})

  } catch(error) {
    console.log(error.message)
    res.status(400).json({message: error.message})
  }
}




